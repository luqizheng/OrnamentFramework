webpackJsonp([2],{

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery Form Plugin
	 * version: 3.46.0-2013.11.21
	 * Requires jQuery v1.5 or later
	 * Copyright (c) 2013 M. Alsup
	 * Examples and documentation at: http://malsup.com/jquery/form/
	 * Project repository: https://github.com/malsup/form
	 * Dual licensed under the MIT and GPL licenses.
	 * https://github.com/malsup/form#copyright-and-license
	 */
	/*global ActiveXObject */
	
	// AMD support
	(function (factory) {
	    if (true) {
	        // using AMD; register as anon module
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        // no AMD; invoke directly
	        factory( (typeof(jQuery) != 'undefined') ? jQuery : window.Zepto );
	    }
	}
	
	(function($) {
	"use strict";
	
	/*
	    Usage Note:
	    -----------
	    Do not use both ajaxSubmit and ajaxForm on the same form.  These
	    functions are mutually exclusive.  Use ajaxSubmit if you want
	    to bind your own submit handler to the form.  For example,
	
	    $(document).ready(function() {
	        $('#myForm').on('submit', function(e) {
	            e.preventDefault(); // <-- important
	            $(this).ajaxSubmit({
	                target: '#output'
	            });
	        });
	    });
	
	    Use ajaxForm when you want the plugin to manage all the event binding
	    for you.  For example,
	
	    $(document).ready(function() {
	        $('#myForm').ajaxForm({
	            target: '#output'
	        });
	    });
	
	    You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
	    form does not have to exist when you invoke ajaxForm:
	
	    $('#myForm').ajaxForm({
	        delegation: true,
	        target: '#output'
	    });
	
	    When using ajaxForm, the ajaxSubmit function will be invoked for you
	    at the appropriate time.
	*/
	
	/**
	 * Feature detection
	 */
	var feature = {};
	feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
	feature.formdata = window.FormData !== undefined;
	
	var hasProp = !!$.fn.prop;
	
	// attr2 uses prop when it can but checks the return type for
	// an expected string.  this accounts for the case where a form 
	// contains inputs with names like "action" or "method"; in those
	// cases "prop" returns the element
	$.fn.attr2 = function() {
	    if ( ! hasProp )
	        return this.attr.apply(this, arguments);
	    var val = this.prop.apply(this, arguments);
	    if ( ( val && val.jquery ) || typeof val === 'string' )
	        return val;
	    return this.attr.apply(this, arguments);
	};
	
	/**
	 * ajaxSubmit() provides a mechanism for immediately submitting
	 * an HTML form using AJAX.
	 */
	$.fn.ajaxSubmit = function(options) {
	    /*jshint scripturl:true */
	
	    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
	    if (!this.length) {
	        log('ajaxSubmit: skipping submit process - no element selected');
	        return this;
	    }
	
	    var method, action, url, $form = this;
	
	    if (typeof options == 'function') {
	        options = { success: options };
	    }
	    else if ( options === undefined ) {
	        options = {};
	    }
	
	    method = options.type || this.attr2('method');
	    action = options.url  || this.attr2('action');
	
	    url = (typeof action === 'string') ? $.trim(action) : '';
	    url = url || window.location.href || '';
	    if (url) {
	        // clean url (don't include hash vaue)
	        url = (url.match(/^([^#]+)/)||[])[1];
	    }
	
	    options = $.extend(true, {
	        url:  url,
	        success: $.ajaxSettings.success,
	        type: method || $.ajaxSettings.type,
	        iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
	    }, options);
	
	    // hook for manipulating the form data before it is extracted;
	    // convenient for use with rich editors like tinyMCE or FCKEditor
	    var veto = {};
	    this.trigger('form-pre-serialize', [this, options, veto]);
	    if (veto.veto) {
	        log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
	        return this;
	    }
	
	    // provide opportunity to alter form data before it is serialized
	    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
	        log('ajaxSubmit: submit aborted via beforeSerialize callback');
	        return this;
	    }
	
	    var traditional = options.traditional;
	    if ( traditional === undefined ) {
	        traditional = $.ajaxSettings.traditional;
	    }
	
	    var elements = [];
	    var qx, a = this.formToArray(options.semantic, elements);
	    if (options.data) {
	        options.extraData = options.data;
	        qx = $.param(options.data, traditional);
	    }
	
	    // give pre-submit callback an opportunity to abort the submit
	    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
	        log('ajaxSubmit: submit aborted via beforeSubmit callback');
	        return this;
	    }
	
	    // fire vetoable 'validate' event
	    this.trigger('form-submit-validate', [a, this, options, veto]);
	    if (veto.veto) {
	        log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
	        return this;
	    }
	
	    var q = $.param(a, traditional);
	    if (qx) {
	        q = ( q ? (q + '&' + qx) : qx );
	    }
	    if (options.type.toUpperCase() == 'GET') {
	        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
	        options.data = null;  // data is null for 'get'
	    }
	    else {
	        options.data = q; // data is the query string for 'post'
	    }
	
	    var callbacks = [];
	    if (options.resetForm) {
	        callbacks.push(function() { $form.resetForm(); });
	    }
	    if (options.clearForm) {
	        callbacks.push(function() { $form.clearForm(options.includeHidden); });
	    }
	
	    // perform a load on the target only if dataType is not provided
	    if (!options.dataType && options.target) {
	        var oldSuccess = options.success || function(){};
	        callbacks.push(function(data) {
	            var fn = options.replaceTarget ? 'replaceWith' : 'html';
	            $(options.target)[fn](data).each(oldSuccess, arguments);
	        });
	    }
	    else if (options.success) {
	        callbacks.push(options.success);
	    }
	
	    options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
	        var context = options.context || this ;    // jQuery 1.4+ supports scope context
	        for (var i=0, max=callbacks.length; i < max; i++) {
	            callbacks[i].apply(context, [data, status, xhr || $form, $form]);
	        }
	    };
	
	    if (options.error) {
	        var oldError = options.error;
	        options.error = function(xhr, status, error) {
	            var context = options.context || this;
	            oldError.apply(context, [xhr, status, error, $form]);
	        };
	    }
	
	     if (options.complete) {
	        var oldComplete = options.complete;
	        options.complete = function(xhr, status) {
	            var context = options.context || this;
	            oldComplete.apply(context, [xhr, status, $form]);
	        };
	    }
	
	    // are there files to upload?
	
	    // [value] (issue #113), also see comment:
	    // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
	    var fileInputs = $('input[type=file]:enabled', this).filter(function() { return $(this).val() !== ''; });
	
	    var hasFileInputs = fileInputs.length > 0;
	    var mp = 'multipart/form-data';
	    var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);
	
	    var fileAPI = feature.fileapi && feature.formdata;
	    log("fileAPI :" + fileAPI);
	    var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;
	
	    var jqxhr;
	
	    // options.iframe allows user to force iframe mode
	    // 06-NOV-09: now defaulting to iframe mode if file input is detected
	    if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
	        // hack to fix Safari hang (thanks to Tim Molendijk for this)
	        // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
	        if (options.closeKeepAlive) {
	            $.get(options.closeKeepAlive, function() {
	                jqxhr = fileUploadIframe(a);
	            });
	        }
	        else {
	            jqxhr = fileUploadIframe(a);
	        }
	    }
	    else if ((hasFileInputs || multipart) && fileAPI) {
	        jqxhr = fileUploadXhr(a);
	    }
	    else {
	        jqxhr = $.ajax(options);
	    }
	
	    $form.removeData('jqxhr').data('jqxhr', jqxhr);
	
	    // clear element array
	    for (var k=0; k < elements.length; k++)
	        elements[k] = null;
	
	    // fire 'notify' event
	    this.trigger('form-submit-notify', [this, options]);
	    return this;
	
	    // utility fn for deep serialization
	    function deepSerialize(extraData){
	        var serialized = $.param(extraData, options.traditional).split('&');
	        var len = serialized.length;
	        var result = [];
	        var i, part;
	        for (i=0; i < len; i++) {
	            // #252; undo param space replacement
	            serialized[i] = serialized[i].replace(/\+/g,' ');
	            part = serialized[i].split('=');
	            // #278; use array instead of object storage, favoring array serializations
	            result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
	        }
	        return result;
	    }
	
	     // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
	    function fileUploadXhr(a) {
	        var formdata = new FormData();
	
	        for (var i=0; i < a.length; i++) {
	            formdata.append(a[i].name, a[i].value);
	        }
	
	        if (options.extraData) {
	            var serializedData = deepSerialize(options.extraData);
	            for (i=0; i < serializedData.length; i++)
	                if (serializedData[i])
	                    formdata.append(serializedData[i][0], serializedData[i][1]);
	        }
	
	        options.data = null;
	
	        var s = $.extend(true, {}, $.ajaxSettings, options, {
	            contentType: false,
	            processData: false,
	            cache: false,
	            type: method || 'POST'
	        });
	
	        if (options.uploadProgress) {
	            // workaround because jqXHR does not expose upload property
	            s.xhr = function() {
	                var xhr = $.ajaxSettings.xhr();
	                if (xhr.upload) {
	                    xhr.upload.addEventListener('progress', function(event) {
	                        var percent = 0;
	                        var position = event.loaded || event.position; /*event.position is deprecated*/
	                        var total = event.total;
	                        if (event.lengthComputable) {
	                            percent = Math.ceil(position / total * 100);
	                        }
	                        options.uploadProgress(event, position, total, percent);
	                    }, false);
	                }
	                return xhr;
	            };
	        }
	
	        s.data = null;
	        var beforeSend = s.beforeSend;
	        s.beforeSend = function(xhr, o) {
	            //Send FormData() provided by user
	            if (options.formData)
	                o.data = options.formData;
	            else
	                o.data = formdata;
	            if(beforeSend)
	                beforeSend.call(this, xhr, o);
	        };
	        return $.ajax(s);
	    }
	
	    // private function for handling file uploads (hat tip to YAHOO!)
	    function fileUploadIframe(a) {
	        var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
	        var deferred = $.Deferred();
	
	        // #341
	        deferred.abort = function(status) {
	            xhr.abort(status);
	        };
	
	        if (a) {
	            // ensure that every serialized input is still enabled
	            for (i=0; i < elements.length; i++) {
	                el = $(elements[i]);
	                if ( hasProp )
	                    el.prop('disabled', false);
	                else
	                    el.removeAttr('disabled');
	            }
	        }
	
	        s = $.extend(true, {}, $.ajaxSettings, options);
	        s.context = s.context || s;
	        id = 'jqFormIO' + (new Date().getTime());
	        if (s.iframeTarget) {
	            $io = $(s.iframeTarget);
	            n = $io.attr2('name');
	            if (!n)
	                 $io.attr2('name', id);
	            else
	                id = n;
	        }
	        else {
	            $io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
	            $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
	        }
	        io = $io[0];
	
	
	        xhr = { // mock object
	            aborted: 0,
	            responseText: null,
	            responseXML: null,
	            status: 0,
	            statusText: 'n/a',
	            getAllResponseHeaders: function() {},
	            getResponseHeader: function() {},
	            setRequestHeader: function() {},
	            abort: function(status) {
	                var e = (status === 'timeout' ? 'timeout' : 'aborted');
	                log('aborting upload... ' + e);
	                this.aborted = 1;
	
	                try { // #214, #257
	                    if (io.contentWindow.document.execCommand) {
	                        io.contentWindow.document.execCommand('Stop');
	                    }
	                }
	                catch(ignore) {}
	
	                $io.attr('src', s.iframeSrc); // abort op in progress
	                xhr.error = e;
	                if (s.error)
	                    s.error.call(s.context, xhr, e, status);
	                if (g)
	                    $.event.trigger("ajaxError", [xhr, s, e]);
	                if (s.complete)
	                    s.complete.call(s.context, xhr, e);
	            }
	        };
	
	        g = s.global;
	        // trigger ajax global events so that activity/block indicators work like normal
	        if (g && 0 === $.active++) {
	            $.event.trigger("ajaxStart");
	        }
	        if (g) {
	            $.event.trigger("ajaxSend", [xhr, s]);
	        }
	
	        if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
	            if (s.global) {
	                $.active--;
	            }
	            deferred.reject();
	            return deferred;
	        }
	        if (xhr.aborted) {
	            deferred.reject();
	            return deferred;
	        }
	
	        // add submitting element to data if we know it
	        sub = form.clk;
	        if (sub) {
	            n = sub.name;
	            if (n && !sub.disabled) {
	                s.extraData = s.extraData || {};
	                s.extraData[n] = sub.value;
	                if (sub.type == "image") {
	                    s.extraData[n+'.x'] = form.clk_x;
	                    s.extraData[n+'.y'] = form.clk_y;
	                }
	            }
	        }
	
	        var CLIENT_TIMEOUT_ABORT = 1;
	        var SERVER_ABORT = 2;
	                
	        function getDoc(frame) {
	            /* it looks like contentWindow or contentDocument do not
	             * carry the protocol property in ie8, when running under ssl
	             * frame.document is the only valid response document, since
	             * the protocol is know but not on the other two objects. strange?
	             * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
	             */
	            
	            var doc = null;
	            
	            // IE8 cascading access check
	            try {
	                if (frame.contentWindow) {
	                    doc = frame.contentWindow.document;
	                }
	            } catch(err) {
	                // IE8 access denied under ssl & missing protocol
	                log('cannot get iframe.contentWindow document: ' + err);
	            }
	
	            if (doc) { // successful getting content
	                return doc;
	            }
	
	            try { // simply checking may throw in ie8 under ssl or mismatched protocol
	                doc = frame.contentDocument ? frame.contentDocument : frame.document;
	            } catch(err) {
	                // last attempt
	                log('cannot get iframe.contentDocument: ' + err);
	                doc = frame.document;
	            }
	            return doc;
	        }
	
	        // Rails CSRF hack (thanks to Yvan Barthelemy)
	        var csrf_token = $('meta[name=csrf-token]').attr('content');
	        var csrf_param = $('meta[name=csrf-param]').attr('content');
	        if (csrf_param && csrf_token) {
	            s.extraData = s.extraData || {};
	            s.extraData[csrf_param] = csrf_token;
	        }
	
	        // take a breath so that pending repaints get some cpu time before the upload starts
	        function doSubmit() {
	            // make sure form attrs are set
	            var t = $form.attr2('target'), a = $form.attr2('action');
	
	            // update form attrs in IE friendly way
	            form.setAttribute('target',id);
	            if (!method || /post/i.test(method) ) {
	                form.setAttribute('method', 'POST');
	            }
	            if (a != s.url) {
	                form.setAttribute('action', s.url);
	            }
	
	            // ie borks in some cases when setting encoding
	            if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
	                $form.attr({
	                    encoding: 'multipart/form-data',
	                    enctype:  'multipart/form-data'
	                });
	            }
	
	            // support timout
	            if (s.timeout) {
	                timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
	            }
	
	            // look for server aborts
	            function checkState() {
	                try {
	                    var state = getDoc(io).readyState;
	                    log('state = ' + state);
	                    if (state && state.toLowerCase() == 'uninitialized')
	                        setTimeout(checkState,50);
	                }
	                catch(e) {
	                    log('Server abort: ' , e, ' (', e.name, ')');
	                    cb(SERVER_ABORT);
	                    if (timeoutHandle)
	                        clearTimeout(timeoutHandle);
	                    timeoutHandle = undefined;
	                }
	            }
	
	            // add "extra" data to form if provided in options
	            var extraInputs = [];
	            try {
	                if (s.extraData) {
	                    for (var n in s.extraData) {
	                        if (s.extraData.hasOwnProperty(n)) {
	                           // if using the $.param format that allows for multiple values with the same name
	                           if($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
	                               extraInputs.push(
	                               $('<input type="hidden" name="'+s.extraData[n].name+'">').val(s.extraData[n].value)
	                                   .appendTo(form)[0]);
	                           } else {
	                               extraInputs.push(
	                               $('<input type="hidden" name="'+n+'">').val(s.extraData[n])
	                                   .appendTo(form)[0]);
	                           }
	                        }
	                    }
	                }
	
	                if (!s.iframeTarget) {
	                    // add iframe to doc and submit the form
	                    $io.appendTo('body');
	                }
	                if (io.attachEvent)
	                    io.attachEvent('onload', cb);
	                else
	                    io.addEventListener('load', cb, false);
	                setTimeout(checkState,15);
	
	                try {
	                    form.submit();
	                } catch(err) {
	                    // just in case form has element with name/id of 'submit'
	                    var submitFn = document.createElement('form').submit;
	                    submitFn.apply(form);
	                }
	            }
	            finally {
	                // reset attrs and remove "extra" input elements
	                form.setAttribute('action',a);
	                if(t) {
	                    form.setAttribute('target', t);
	                } else {
	                    $form.removeAttr('target');
	                }
	                $(extraInputs).remove();
	            }
	        }
	
	        if (s.forceSync) {
	            doSubmit();
	        }
	        else {
	            setTimeout(doSubmit, 10); // this lets dom updates render
	        }
	
	        var data, doc, domCheckCount = 50, callbackProcessed;
	
	        function cb(e) {
	            if (xhr.aborted || callbackProcessed) {
	                return;
	            }
	            
	            doc = getDoc(io);
	            if(!doc) {
	                log('cannot access response document');
	                e = SERVER_ABORT;
	            }
	            if (e === CLIENT_TIMEOUT_ABORT && xhr) {
	                xhr.abort('timeout');
	                deferred.reject(xhr, 'timeout');
	                return;
	            }
	            else if (e == SERVER_ABORT && xhr) {
	                xhr.abort('server abort');
	                deferred.reject(xhr, 'error', 'server abort');
	                return;
	            }
	
	            if (!doc || doc.location.href == s.iframeSrc) {
	                // response not received yet
	                if (!timedOut)
	                    return;
	            }
	            if (io.detachEvent)
	                io.detachEvent('onload', cb);
	            else
	                io.removeEventListener('load', cb, false);
	
	            var status = 'success', errMsg;
	            try {
	                if (timedOut) {
	                    throw 'timeout';
	                }
	
	                var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
	                log('isXml='+isXml);
	                if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
	                    if (--domCheckCount) {
	                        // in some browsers (Opera) the iframe DOM is not always traversable when
	                        // the onload callback fires, so we loop a bit to accommodate
	                        log('requeing onLoad callback, DOM not available');
	                        setTimeout(cb, 250);
	                        return;
	                    }
	                    // let this fall through because server response could be an empty document
	                    //log('Could not access iframe DOM after mutiple tries.');
	                    //throw 'DOMException: not available';
	                }
	
	                //log('response detected');
	                var docRoot = doc.body ? doc.body : doc.documentElement;
	                xhr.responseText = docRoot ? docRoot.innerHTML : null;
	                xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
	                if (isXml)
	                    s.dataType = 'xml';
	                xhr.getResponseHeader = function(header){
	                    var headers = {'content-type': s.dataType};
	                    return headers[header.toLowerCase()];
	                };
	                // support for XHR 'status' & 'statusText' emulation :
	                if (docRoot) {
	                    xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
	                    xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
	                }
	
	                var dt = (s.dataType || '').toLowerCase();
	                var scr = /(json|script|text)/.test(dt);
	                if (scr || s.textarea) {
	                    // see if user embedded response in textarea
	                    var ta = doc.getElementsByTagName('textarea')[0];
	                    if (ta) {
	                        xhr.responseText = ta.value;
	                        // support for XHR 'status' & 'statusText' emulation :
	                        xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
	                        xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
	                    }
	                    else if (scr) {
	                        // account for browsers injecting pre around json response
	                        var pre = doc.getElementsByTagName('pre')[0];
	                        var b = doc.getElementsByTagName('body')[0];
	                        if (pre) {
	                            xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
	                        }
	                        else if (b) {
	                            xhr.responseText = b.textContent ? b.textContent : b.innerText;
	                        }
	                    }
	                }
	                else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
	                    xhr.responseXML = toXml(xhr.responseText);
	                }
	
	                try {
	                    data = httpData(xhr, dt, s);
	                }
	                catch (err) {
	                    status = 'parsererror';
	                    xhr.error = errMsg = (err || status);
	                }
	            }
	            catch (err) {
	                log('error caught: ',err);
	                status = 'error';
	                xhr.error = errMsg = (err || status);
	            }
	
	            if (xhr.aborted) {
	                log('upload aborted');
	                status = null;
	            }
	
	            if (xhr.status) { // we've set xhr.status
	                status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
	            }
	
	            // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
	            if (status === 'success') {
	                if (s.success)
	                    s.success.call(s.context, data, 'success', xhr);
	                deferred.resolve(xhr.responseText, 'success', xhr);
	                if (g)
	                    $.event.trigger("ajaxSuccess", [xhr, s]);
	            }
	            else if (status) {
	                if (errMsg === undefined)
	                    errMsg = xhr.statusText;
	                if (s.error)
	                    s.error.call(s.context, xhr, status, errMsg);
	                deferred.reject(xhr, 'error', errMsg);
	                if (g)
	                    $.event.trigger("ajaxError", [xhr, s, errMsg]);
	            }
	
	            if (g)
	                $.event.trigger("ajaxComplete", [xhr, s]);
	
	            if (g && ! --$.active) {
	                $.event.trigger("ajaxStop");
	            }
	
	            if (s.complete)
	                s.complete.call(s.context, xhr, status);
	
	            callbackProcessed = true;
	            if (s.timeout)
	                clearTimeout(timeoutHandle);
	
	            // clean up
	            setTimeout(function() {
	                if (!s.iframeTarget)
	                    $io.remove();
	                else  //adding else to clean up existing iframe response.
	                    $io.attr('src', s.iframeSrc);
	                xhr.responseXML = null;
	            }, 100);
	        }
	
	        var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
	            if (window.ActiveXObject) {
	                doc = new ActiveXObject('Microsoft.XMLDOM');
	                doc.async = 'false';
	                doc.loadXML(s);
	            }
	            else {
	                doc = (new DOMParser()).parseFromString(s, 'text/xml');
	            }
	            return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
	        };
	        var parseJSON = $.parseJSON || function(s) {
	            /*jslint evil:true */
	            return window['eval']('(' + s + ')');
	        };
	
	        var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4
	
	            var ct = xhr.getResponseHeader('content-type') || '',
	                xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
	                data = xml ? xhr.responseXML : xhr.responseText;
	
	            if (xml && data.documentElement.nodeName === 'parsererror') {
	                if ($.error)
	                    $.error('parsererror');
	            }
	            if (s && s.dataFilter) {
	                data = s.dataFilter(data, type);
	            }
	            if (typeof data === 'string') {
	                if (type === 'json' || !type && ct.indexOf('json') >= 0) {
	                    data = parseJSON(data);
	                } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
	                    $.globalEval(data);
	                }
	            }
	            return data;
	        };
	
	        return deferred;
	    }
	};
	
	/**
	 * ajaxForm() provides a mechanism for fully automating form submission.
	 *
	 * The advantages of using this method instead of ajaxSubmit() are:
	 *
	 * 1: This method will include coordinates for <input type="image" /> elements (if the element
	 *    is used to submit the form).
	 * 2. This method will include the submit element's name/value data (for the element that was
	 *    used to submit the form).
	 * 3. This method binds the submit() method to the form for you.
	 *
	 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
	 * passes the options argument along after properly binding events for submit elements and
	 * the form itself.
	 */
	$.fn.ajaxForm = function(options) {
	    options = options || {};
	    options.delegation = options.delegation && $.isFunction($.fn.on);
	
	    // in jQuery 1.3+ we can fix mistakes with the ready state
	    if (!options.delegation && this.length === 0) {
	        var o = { s: this.selector, c: this.context };
	        if (!$.isReady && o.s) {
	            log('DOM not ready, queuing ajaxForm');
	            $(function() {
	                $(o.s,o.c).ajaxForm(options);
	            });
	            return this;
	        }
	        // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
	        log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
	        return this;
	    }
	
	    if ( options.delegation ) {
	        $(document)
	            .off('submit.form-plugin', this.selector, doAjaxSubmit)
	            .off('click.form-plugin', this.selector, captureSubmittingElement)
	            .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
	            .on('click.form-plugin', this.selector, options, captureSubmittingElement);
	        return this;
	    }
	
	    return this.ajaxFormUnbind()
	        .bind('submit.form-plugin', options, doAjaxSubmit)
	        .bind('click.form-plugin', options, captureSubmittingElement);
	};
	
	// private event handlers
	function doAjaxSubmit(e) {
	    /*jshint validthis:true */
	    var options = e.data;
	    if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
	        e.preventDefault();
	        $(e.target).ajaxSubmit(options); // #365
	    }
	}
	
	function captureSubmittingElement(e) {
	    /*jshint validthis:true */
	    var target = e.target;
	    var $el = $(target);
	    if (!($el.is("[type=submit],[type=image]"))) {
	        // is this a child element of the submit el?  (ex: a span within a button)
	        var t = $el.closest('[type=submit]');
	        if (t.length === 0) {
	            return;
	        }
	        target = t[0];
	    }
	    var form = this;
	    form.clk = target;
	    if (target.type == 'image') {
	        if (e.offsetX !== undefined) {
	            form.clk_x = e.offsetX;
	            form.clk_y = e.offsetY;
	        } else if (typeof $.fn.offset == 'function') {
	            var offset = $el.offset();
	            form.clk_x = e.pageX - offset.left;
	            form.clk_y = e.pageY - offset.top;
	        } else {
	            form.clk_x = e.pageX - target.offsetLeft;
	            form.clk_y = e.pageY - target.offsetTop;
	        }
	    }
	    // clear form vars
	    setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
	}
	
	
	// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
	$.fn.ajaxFormUnbind = function() {
	    return this.unbind('submit.form-plugin click.form-plugin');
	};
	
	/**
	 * formToArray() gathers form element data into an array of objects that can
	 * be passed to any of the following ajax functions: $.get, $.post, or load.
	 * Each object in the array has both a 'name' and 'value' property.  An example of
	 * an array for a simple login form might be:
	 *
	 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
	 *
	 * It is this array that is passed to pre-submit callback functions provided to the
	 * ajaxSubmit() and ajaxForm() methods.
	 */
	$.fn.formToArray = function(semantic, elements) {
	    var a = [];
	    if (this.length === 0) {
	        return a;
	    }
	
	    var form = this[0];
	    var els = semantic ? form.getElementsByTagName('*') : form.elements;
	    if (!els) {
	        return a;
	    }
	
	    var i,j,n,v,el,max,jmax;
	    for(i=0, max=els.length; i < max; i++) {
	        el = els[i];
	        n = el.name;
	        if (!n || el.disabled) {
	            continue;
	        }
	
	        if (semantic && form.clk && el.type == "image") {
	            // handle image inputs on the fly when semantic == true
	            if(form.clk == el) {
	                a.push({name: n, value: $(el).val(), type: el.type });
	                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
	            }
	            continue;
	        }
	
	        v = $.fieldValue(el, true);
	        if (v && v.constructor == Array) {
	            if (elements)
	                elements.push(el);
	            for(j=0, jmax=v.length; j < jmax; j++) {
	                a.push({name: n, value: v[j]});
	            }
	        }
	        else if (feature.fileapi && el.type == 'file') {
	            if (elements)
	                elements.push(el);
	            var files = el.files;
	            if (files.length) {
	                for (j=0; j < files.length; j++) {
	                    a.push({name: n, value: files[j], type: el.type});
	                }
	            }
	            else {
	                // #180
	                a.push({ name: n, value: '', type: el.type });
	            }
	        }
	        else if (v !== null && typeof v != 'undefined') {
	            if (elements)
	                elements.push(el);
	            a.push({name: n, value: v, type: el.type, required: el.required});
	        }
	    }
	
	    if (!semantic && form.clk) {
	        // input type=='image' are not found in elements array! handle it here
	        var $input = $(form.clk), input = $input[0];
	        n = input.name;
	        if (n && !input.disabled && input.type == 'image') {
	            a.push({name: n, value: $input.val()});
	            a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
	        }
	    }
	    return a;
	};
	
	/**
	 * Serializes form data into a 'submittable' string. This method will return a string
	 * in the format: name1=value1&amp;name2=value2
	 */
	$.fn.formSerialize = function(semantic) {
	    //hand off to jQuery.param for proper encoding
	    return $.param(this.formToArray(semantic));
	};
	
	/**
	 * Serializes all field elements in the jQuery object into a query string.
	 * This method will return a string in the format: name1=value1&amp;name2=value2
	 */
	$.fn.fieldSerialize = function(successful) {
	    var a = [];
	    this.each(function() {
	        var n = this.name;
	        if (!n) {
	            return;
	        }
	        var v = $.fieldValue(this, successful);
	        if (v && v.constructor == Array) {
	            for (var i=0,max=v.length; i < max; i++) {
	                a.push({name: n, value: v[i]});
	            }
	        }
	        else if (v !== null && typeof v != 'undefined') {
	            a.push({name: this.name, value: v});
	        }
	    });
	    //hand off to jQuery.param for proper encoding
	    return $.param(a);
	};
	
	/**
	 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
	 *
	 *  <form><fieldset>
	 *      <input name="A" type="text" />
	 *      <input name="A" type="text" />
	 *      <input name="B" type="checkbox" value="B1" />
	 *      <input name="B" type="checkbox" value="B2"/>
	 *      <input name="C" type="radio" value="C1" />
	 *      <input name="C" type="radio" value="C2" />
	 *  </fieldset></form>
	 *
	 *  var v = $('input[type=text]').fieldValue();
	 *  // if no values are entered into the text inputs
	 *  v == ['','']
	 *  // if values entered into the text inputs are 'foo' and 'bar'
	 *  v == ['foo','bar']
	 *
	 *  var v = $('input[type=checkbox]').fieldValue();
	 *  // if neither checkbox is checked
	 *  v === undefined
	 *  // if both checkboxes are checked
	 *  v == ['B1', 'B2']
	 *
	 *  var v = $('input[type=radio]').fieldValue();
	 *  // if neither radio is checked
	 *  v === undefined
	 *  // if first radio is checked
	 *  v == ['C1']
	 *
	 * The successful argument controls whether or not the field element must be 'successful'
	 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
	 * The default value of the successful argument is true.  If this value is false the value(s)
	 * for each element is returned.
	 *
	 * Note: This method *always* returns an array.  If no valid value can be determined the
	 *    array will be empty, otherwise it will contain one or more values.
	 */
	$.fn.fieldValue = function(successful) {
	    for (var val=[], i=0, max=this.length; i < max; i++) {
	        var el = this[i];
	        var v = $.fieldValue(el, successful);
	        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
	            continue;
	        }
	        if (v.constructor == Array)
	            $.merge(val, v);
	        else
	            val.push(v);
	    }
	    return val;
	};
	
	/**
	 * Returns the value of the field element.
	 */
	$.fieldValue = function(el, successful) {
	    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
	    if (successful === undefined) {
	        successful = true;
	    }
	
	    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
	        (t == 'checkbox' || t == 'radio') && !el.checked ||
	        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
	        tag == 'select' && el.selectedIndex == -1)) {
	            return null;
	    }
	
	    if (tag == 'select') {
	        var index = el.selectedIndex;
	        if (index < 0) {
	            return null;
	        }
	        var a = [], ops = el.options;
	        var one = (t == 'select-one');
	        var max = (one ? index+1 : ops.length);
	        for(var i=(one ? index : 0); i < max; i++) {
	            var op = ops[i];
	            if (op.selected) {
	                var v = op.value;
	                if (!v) { // extra pain for IE...
	                    v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
	                }
	                if (one) {
	                    return v;
	                }
	                a.push(v);
	            }
	        }
	        return a;
	    }
	    return $(el).val();
	};
	
	/**
	 * Clears the form data.  Takes the following actions on the form's input fields:
	 *  - input text fields will have their 'value' property set to the empty string
	 *  - select elements will have their 'selectedIndex' property set to -1
	 *  - checkbox and radio inputs will have their 'checked' property set to false
	 *  - inputs of type submit, button, reset, and hidden will *not* be effected
	 *  - button elements will *not* be effected
	 */
	$.fn.clearForm = function(includeHidden) {
	    return this.each(function() {
	        $('input,select,textarea', this).clearFields(includeHidden);
	    });
	};
	
	/**
	 * Clears the selected form elements.
	 */
	$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
	    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
	    return this.each(function() {
	        var t = this.type, tag = this.tagName.toLowerCase();
	        if (re.test(t) || tag == 'textarea') {
	            this.value = '';
	        }
	        else if (t == 'checkbox' || t == 'radio') {
	            this.checked = false;
	        }
	        else if (tag == 'select') {
	            this.selectedIndex = -1;
	        }
			else if (t == "file") {
				if (/MSIE/.test(navigator.userAgent)) {
					$(this).replaceWith($(this).clone(true));
				} else {
					$(this).val('');
				}
			}
	        else if (includeHidden) {
	            // includeHidden can be the value true, or it can be a selector string
	            // indicating a special test; for example:
	            //  $('#myForm').clearForm('.special:hidden')
	            // the above would clean hidden inputs that have the class of 'special'
	            if ( (includeHidden === true && /hidden/.test(t)) ||
	                 (typeof includeHidden == 'string' && $(this).is(includeHidden)) )
	                this.value = '';
	        }
	    });
	};
	
	/**
	 * Resets the form data.  Causes all form elements to be reset to their original value.
	 */
	$.fn.resetForm = function() {
	    return this.each(function() {
	        // guard against an input with the name of 'reset'
	        // note that IE reports the reset function as an 'object'
	        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
	            this.reset();
	        }
	    });
	};
	
	/**
	 * Enables or disables any matching elements.
	 */
	$.fn.enable = function(b) {
	    if (b === undefined) {
	        b = true;
	    }
	    return this.each(function() {
	        this.disabled = !b;
	    });
	};
	
	/**
	 * Checks/unchecks any matching checkboxes or radio buttons and
	 * selects/deselects and matching option elements.
	 */
	$.fn.selected = function(select) {
	    if (select === undefined) {
	        select = true;
	    }
	    return this.each(function() {
	        var t = this.type;
	        if (t == 'checkbox' || t == 'radio') {
	            this.checked = select;
	        }
	        else if (this.tagName.toLowerCase() == 'option') {
	            var $sel = $(this).parent('select');
	            if (select && $sel[0] && $sel[0].type == 'select-one') {
	                // deselect all other options
	                $sel.find('option').selected(false);
	            }
	            this.selected = select;
	        }
	    });
	};
	
	// expose debug var
	$.fn.ajaxSubmit.debug = false;
	
	// helper fn for console logging
	function log() {
	    if (!$.fn.ajaxSubmit.debug)
	        return;
	    var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
	    if (window.console && window.console.log) {
	        window.console.log(msg);
	    }
	    else if (window.opera && window.opera.postError) {
	        window.opera.postError(msg);
	    }
	}
	
	}));
	


/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93d3dyb290L2xpYi9qcXVlcnktZm9ybS9qcXVlcnkuZm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0EsTUFBSztBQUNMLG1CQUFrQjtBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdDQUErQjtBQUMvQjtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7QUFDVCxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHlEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxvQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQSx3REFBdUQsaUJBQWlCLDBCQUEwQixFQUFFO0FBQ3BHOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQztBQUNyQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCQUE2QjtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7O0FBRUEscURBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0RBQWlEOztBQUVqRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQztBQUNsQztBQUNB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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFDIiwiZmlsZSI6IjIuMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxyXG4gKiBqUXVlcnkgRm9ybSBQbHVnaW5cclxuICogdmVyc2lvbjogMy40Ni4wLTIwMTMuMTEuMjFcclxuICogUmVxdWlyZXMgalF1ZXJ5IHYxLjUgb3IgbGF0ZXJcclxuICogQ29weXJpZ2h0IChjKSAyMDEzIE0uIEFsc3VwXHJcbiAqIEV4YW1wbGVzIGFuZCBkb2N1bWVudGF0aW9uIGF0OiBodHRwOi8vbWFsc3VwLmNvbS9qcXVlcnkvZm9ybS9cclxuICogUHJvamVjdCByZXBvc2l0b3J5OiBodHRwczovL2dpdGh1Yi5jb20vbWFsc3VwL2Zvcm1cclxuICogRHVhbCBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGFuZCBHUEwgbGljZW5zZXMuXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYWxzdXAvZm9ybSNjb3B5cmlnaHQtYW5kLWxpY2Vuc2VcclxuICovXHJcbi8qZ2xvYmFsIEFjdGl2ZVhPYmplY3QgKi9cclxuXHJcbi8vIEFNRCBzdXBwb3J0XHJcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xyXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgICAgIC8vIHVzaW5nIEFNRDsgcmVnaXN0ZXIgYXMgYW5vbiBtb2R1bGVcclxuICAgICAgICBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIG5vIEFNRDsgaW52b2tlIGRpcmVjdGx5XHJcbiAgICAgICAgZmFjdG9yeSggKHR5cGVvZihqUXVlcnkpICE9ICd1bmRlZmluZWQnKSA/IGpRdWVyeSA6IHdpbmRvdy5aZXB0byApO1xyXG4gICAgfVxyXG59XHJcblxyXG4oZnVuY3Rpb24oJCkge1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qXHJcbiAgICBVc2FnZSBOb3RlOlxyXG4gICAgLS0tLS0tLS0tLS1cclxuICAgIERvIG5vdCB1c2UgYm90aCBhamF4U3VibWl0IGFuZCBhamF4Rm9ybSBvbiB0aGUgc2FtZSBmb3JtLiAgVGhlc2VcclxuICAgIGZ1bmN0aW9ucyBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlLiAgVXNlIGFqYXhTdWJtaXQgaWYgeW91IHdhbnRcclxuICAgIHRvIGJpbmQgeW91ciBvd24gc3VibWl0IGhhbmRsZXIgdG8gdGhlIGZvcm0uICBGb3IgZXhhbXBsZSxcclxuXHJcbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjbXlGb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyA8LS0gaW1wb3J0YW50XHJcbiAgICAgICAgICAgICQodGhpcykuYWpheFN1Ym1pdCh7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQ6ICcjb3V0cHV0J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIFVzZSBhamF4Rm9ybSB3aGVuIHlvdSB3YW50IHRoZSBwbHVnaW4gdG8gbWFuYWdlIGFsbCB0aGUgZXZlbnQgYmluZGluZ1xyXG4gICAgZm9yIHlvdS4gIEZvciBleGFtcGxlLFxyXG5cclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyNteUZvcm0nKS5hamF4Rm9ybSh7XHJcbiAgICAgICAgICAgIHRhcmdldDogJyNvdXRwdXQnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBZb3UgY2FuIGFsc28gdXNlIGFqYXhGb3JtIHdpdGggZGVsZWdhdGlvbiAocmVxdWlyZXMgalF1ZXJ5IHYxLjcrKSwgc28gdGhlXHJcbiAgICBmb3JtIGRvZXMgbm90IGhhdmUgdG8gZXhpc3Qgd2hlbiB5b3UgaW52b2tlIGFqYXhGb3JtOlxyXG5cclxuICAgICQoJyNteUZvcm0nKS5hamF4Rm9ybSh7XHJcbiAgICAgICAgZGVsZWdhdGlvbjogdHJ1ZSxcclxuICAgICAgICB0YXJnZXQ6ICcjb3V0cHV0J1xyXG4gICAgfSk7XHJcblxyXG4gICAgV2hlbiB1c2luZyBhamF4Rm9ybSwgdGhlIGFqYXhTdWJtaXQgZnVuY3Rpb24gd2lsbCBiZSBpbnZva2VkIGZvciB5b3VcclxuICAgIGF0IHRoZSBhcHByb3ByaWF0ZSB0aW1lLlxyXG4qL1xyXG5cclxuLyoqXHJcbiAqIEZlYXR1cmUgZGV0ZWN0aW9uXHJcbiAqL1xyXG52YXIgZmVhdHVyZSA9IHt9O1xyXG5mZWF0dXJlLmZpbGVhcGkgPSAkKFwiPGlucHV0IHR5cGU9J2ZpbGUnLz5cIikuZ2V0KDApLmZpbGVzICE9PSB1bmRlZmluZWQ7XHJcbmZlYXR1cmUuZm9ybWRhdGEgPSB3aW5kb3cuRm9ybURhdGEgIT09IHVuZGVmaW5lZDtcclxuXHJcbnZhciBoYXNQcm9wID0gISEkLmZuLnByb3A7XHJcblxyXG4vLyBhdHRyMiB1c2VzIHByb3Agd2hlbiBpdCBjYW4gYnV0IGNoZWNrcyB0aGUgcmV0dXJuIHR5cGUgZm9yXHJcbi8vIGFuIGV4cGVjdGVkIHN0cmluZy4gIHRoaXMgYWNjb3VudHMgZm9yIHRoZSBjYXNlIHdoZXJlIGEgZm9ybSBcclxuLy8gY29udGFpbnMgaW5wdXRzIHdpdGggbmFtZXMgbGlrZSBcImFjdGlvblwiIG9yIFwibWV0aG9kXCI7IGluIHRob3NlXHJcbi8vIGNhc2VzIFwicHJvcFwiIHJldHVybnMgdGhlIGVsZW1lbnRcclxuJC5mbi5hdHRyMiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCAhIGhhc1Byb3AgKVxyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIHZhciB2YWwgPSB0aGlzLnByb3AuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIGlmICggKCB2YWwgJiYgdmFsLmpxdWVyeSApIHx8IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnIClcclxuICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgcmV0dXJuIHRoaXMuYXR0ci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGFqYXhTdWJtaXQoKSBwcm92aWRlcyBhIG1lY2hhbmlzbSBmb3IgaW1tZWRpYXRlbHkgc3VibWl0dGluZ1xyXG4gKiBhbiBIVE1MIGZvcm0gdXNpbmcgQUpBWC5cclxuICovXHJcbiQuZm4uYWpheFN1Ym1pdCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgIC8qanNoaW50IHNjcmlwdHVybDp0cnVlICovXHJcblxyXG4gICAgLy8gZmFzdCBmYWlsIGlmIG5vdGhpbmcgc2VsZWN0ZWQgKGh0dHA6Ly9kZXYuanF1ZXJ5LmNvbS90aWNrZXQvMjc1MilcclxuICAgIGlmICghdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICBsb2coJ2FqYXhTdWJtaXQ6IHNraXBwaW5nIHN1Ym1pdCBwcm9jZXNzIC0gbm8gZWxlbWVudCBzZWxlY3RlZCcpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBtZXRob2QsIGFjdGlvbiwgdXJsLCAkZm9ybSA9IHRoaXM7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBvcHRpb25zID0geyBzdWNjZXNzOiBvcHRpb25zIH07XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICggb3B0aW9ucyA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgIG9wdGlvbnMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2QgPSBvcHRpb25zLnR5cGUgfHwgdGhpcy5hdHRyMignbWV0aG9kJyk7XHJcbiAgICBhY3Rpb24gPSBvcHRpb25zLnVybCAgfHwgdGhpcy5hdHRyMignYWN0aW9uJyk7XHJcblxyXG4gICAgdXJsID0gKHR5cGVvZiBhY3Rpb24gPT09ICdzdHJpbmcnKSA/ICQudHJpbShhY3Rpb24pIDogJyc7XHJcbiAgICB1cmwgPSB1cmwgfHwgd2luZG93LmxvY2F0aW9uLmhyZWYgfHwgJyc7XHJcbiAgICBpZiAodXJsKSB7XHJcbiAgICAgICAgLy8gY2xlYW4gdXJsIChkb24ndCBpbmNsdWRlIGhhc2ggdmF1ZSlcclxuICAgICAgICB1cmwgPSAodXJsLm1hdGNoKC9eKFteI10rKS8pfHxbXSlbMV07XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHtcclxuICAgICAgICB1cmw6ICB1cmwsXHJcbiAgICAgICAgc3VjY2VzczogJC5hamF4U2V0dGluZ3Muc3VjY2VzcyxcclxuICAgICAgICB0eXBlOiBtZXRob2QgfHwgJC5hamF4U2V0dGluZ3MudHlwZSxcclxuICAgICAgICBpZnJhbWVTcmM6IC9eaHR0cHMvaS50ZXN0KHdpbmRvdy5sb2NhdGlvbi5ocmVmIHx8ICcnKSA/ICdqYXZhc2NyaXB0OmZhbHNlJyA6ICdhYm91dDpibGFuaydcclxuICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgIC8vIGhvb2sgZm9yIG1hbmlwdWxhdGluZyB0aGUgZm9ybSBkYXRhIGJlZm9yZSBpdCBpcyBleHRyYWN0ZWQ7XHJcbiAgICAvLyBjb252ZW5pZW50IGZvciB1c2Ugd2l0aCByaWNoIGVkaXRvcnMgbGlrZSB0aW55TUNFIG9yIEZDS0VkaXRvclxyXG4gICAgdmFyIHZldG8gPSB7fTtcclxuICAgIHRoaXMudHJpZ2dlcignZm9ybS1wcmUtc2VyaWFsaXplJywgW3RoaXMsIG9wdGlvbnMsIHZldG9dKTtcclxuICAgIGlmICh2ZXRvLnZldG8pIHtcclxuICAgICAgICBsb2coJ2FqYXhTdWJtaXQ6IHN1Ym1pdCB2ZXRvZWQgdmlhIGZvcm0tcHJlLXNlcmlhbGl6ZSB0cmlnZ2VyJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJvdmlkZSBvcHBvcnR1bml0eSB0byBhbHRlciBmb3JtIGRhdGEgYmVmb3JlIGl0IGlzIHNlcmlhbGl6ZWRcclxuICAgIGlmIChvcHRpb25zLmJlZm9yZVNlcmlhbGl6ZSAmJiBvcHRpb25zLmJlZm9yZVNlcmlhbGl6ZSh0aGlzLCBvcHRpb25zKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBsb2coJ2FqYXhTdWJtaXQ6IHN1Ym1pdCBhYm9ydGVkIHZpYSBiZWZvcmVTZXJpYWxpemUgY2FsbGJhY2snKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdHJhZGl0aW9uYWwgPSBvcHRpb25zLnRyYWRpdGlvbmFsO1xyXG4gICAgaWYgKCB0cmFkaXRpb25hbCA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgIHRyYWRpdGlvbmFsID0gJC5hamF4U2V0dGluZ3MudHJhZGl0aW9uYWw7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGVsZW1lbnRzID0gW107XHJcbiAgICB2YXIgcXgsIGEgPSB0aGlzLmZvcm1Ub0FycmF5KG9wdGlvbnMuc2VtYW50aWMsIGVsZW1lbnRzKTtcclxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcclxuICAgICAgICBvcHRpb25zLmV4dHJhRGF0YSA9IG9wdGlvbnMuZGF0YTtcclxuICAgICAgICBxeCA9ICQucGFyYW0ob3B0aW9ucy5kYXRhLCB0cmFkaXRpb25hbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2l2ZSBwcmUtc3VibWl0IGNhbGxiYWNrIGFuIG9wcG9ydHVuaXR5IHRvIGFib3J0IHRoZSBzdWJtaXRcclxuICAgIGlmIChvcHRpb25zLmJlZm9yZVN1Ym1pdCAmJiBvcHRpb25zLmJlZm9yZVN1Ym1pdChhLCB0aGlzLCBvcHRpb25zKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBsb2coJ2FqYXhTdWJtaXQ6IHN1Ym1pdCBhYm9ydGVkIHZpYSBiZWZvcmVTdWJtaXQgY2FsbGJhY2snKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvLyBmaXJlIHZldG9hYmxlICd2YWxpZGF0ZScgZXZlbnRcclxuICAgIHRoaXMudHJpZ2dlcignZm9ybS1zdWJtaXQtdmFsaWRhdGUnLCBbYSwgdGhpcywgb3B0aW9ucywgdmV0b10pO1xyXG4gICAgaWYgKHZldG8udmV0bykge1xyXG4gICAgICAgIGxvZygnYWpheFN1Ym1pdDogc3VibWl0IHZldG9lZCB2aWEgZm9ybS1zdWJtaXQtdmFsaWRhdGUgdHJpZ2dlcicpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBxID0gJC5wYXJhbShhLCB0cmFkaXRpb25hbCk7XHJcbiAgICBpZiAocXgpIHtcclxuICAgICAgICBxID0gKCBxID8gKHEgKyAnJicgKyBxeCkgOiBxeCApO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMudHlwZS50b1VwcGVyQ2FzZSgpID09ICdHRVQnKSB7XHJcbiAgICAgICAgb3B0aW9ucy51cmwgKz0gKG9wdGlvbnMudXJsLmluZGV4T2YoJz8nKSA+PSAwID8gJyYnIDogJz8nKSArIHE7XHJcbiAgICAgICAgb3B0aW9ucy5kYXRhID0gbnVsbDsgIC8vIGRhdGEgaXMgbnVsbCBmb3IgJ2dldCdcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG9wdGlvbnMuZGF0YSA9IHE7IC8vIGRhdGEgaXMgdGhlIHF1ZXJ5IHN0cmluZyBmb3IgJ3Bvc3QnXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNhbGxiYWNrcyA9IFtdO1xyXG4gICAgaWYgKG9wdGlvbnMucmVzZXRGb3JtKSB7XHJcbiAgICAgICAgY2FsbGJhY2tzLnB1c2goZnVuY3Rpb24oKSB7ICRmb3JtLnJlc2V0Rm9ybSgpOyB9KTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmNsZWFyRm9ybSkge1xyXG4gICAgICAgIGNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uKCkgeyAkZm9ybS5jbGVhckZvcm0ob3B0aW9ucy5pbmNsdWRlSGlkZGVuKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcGVyZm9ybSBhIGxvYWQgb24gdGhlIHRhcmdldCBvbmx5IGlmIGRhdGFUeXBlIGlzIG5vdCBwcm92aWRlZFxyXG4gICAgaWYgKCFvcHRpb25zLmRhdGFUeXBlICYmIG9wdGlvbnMudGFyZ2V0KSB7XHJcbiAgICAgICAgdmFyIG9sZFN1Y2Nlc3MgPSBvcHRpb25zLnN1Y2Nlc3MgfHwgZnVuY3Rpb24oKXt9O1xyXG4gICAgICAgIGNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGZuID0gb3B0aW9ucy5yZXBsYWNlVGFyZ2V0ID8gJ3JlcGxhY2VXaXRoJyA6ICdodG1sJztcclxuICAgICAgICAgICAgJChvcHRpb25zLnRhcmdldClbZm5dKGRhdGEpLmVhY2gob2xkU3VjY2VzcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG9wdGlvbnMuc3VjY2Vzcykge1xyXG4gICAgICAgIGNhbGxiYWNrcy5wdXNoKG9wdGlvbnMuc3VjY2Vzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW9ucy5zdWNjZXNzID0gZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCB4aHIpIHsgLy8galF1ZXJ5IDEuNCsgcGFzc2VzIHhociBhcyAzcmQgYXJnXHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSBvcHRpb25zLmNvbnRleHQgfHwgdGhpcyA7ICAgIC8vIGpRdWVyeSAxLjQrIHN1cHBvcnRzIHNjb3BlIGNvbnRleHRcclxuICAgICAgICBmb3IgKHZhciBpPTAsIG1heD1jYWxsYmFja3MubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KGNvbnRleHQsIFtkYXRhLCBzdGF0dXMsIHhociB8fCAkZm9ybSwgJGZvcm1dKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChvcHRpb25zLmVycm9yKSB7XHJcbiAgICAgICAgdmFyIG9sZEVycm9yID0gb3B0aW9ucy5lcnJvcjtcclxuICAgICAgICBvcHRpb25zLmVycm9yID0gZnVuY3Rpb24oeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0IHx8IHRoaXM7XHJcbiAgICAgICAgICAgIG9sZEVycm9yLmFwcGx5KGNvbnRleHQsIFt4aHIsIHN0YXR1cywgZXJyb3IsICRmb3JtXSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAgaWYgKG9wdGlvbnMuY29tcGxldGUpIHtcclxuICAgICAgICB2YXIgb2xkQ29tcGxldGUgPSBvcHRpb25zLmNvbXBsZXRlO1xyXG4gICAgICAgIG9wdGlvbnMuY29tcGxldGUgPSBmdW5jdGlvbih4aHIsIHN0YXR1cykge1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IG9wdGlvbnMuY29udGV4dCB8fCB0aGlzO1xyXG4gICAgICAgICAgICBvbGRDb21wbGV0ZS5hcHBseShjb250ZXh0LCBbeGhyLCBzdGF0dXMsICRmb3JtXSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcmUgdGhlcmUgZmlsZXMgdG8gdXBsb2FkP1xyXG5cclxuICAgIC8vIFt2YWx1ZV0gKGlzc3VlICMxMTMpLCBhbHNvIHNlZSBjb21tZW50OlxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hbHN1cC9mb3JtL2NvbW1pdC81ODgzMDZhZWRiYTFkZTAxMzg4MDMyZDVmNDJhNjAxNTllZWE5MjI4I2NvbW1pdGNvbW1lbnQtMjE4MDIxOVxyXG4gICAgdmFyIGZpbGVJbnB1dHMgPSAkKCdpbnB1dFt0eXBlPWZpbGVdOmVuYWJsZWQnLCB0aGlzKS5maWx0ZXIoZnVuY3Rpb24oKSB7IHJldHVybiAkKHRoaXMpLnZhbCgpICE9PSAnJzsgfSk7XHJcblxyXG4gICAgdmFyIGhhc0ZpbGVJbnB1dHMgPSBmaWxlSW5wdXRzLmxlbmd0aCA+IDA7XHJcbiAgICB2YXIgbXAgPSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSc7XHJcbiAgICB2YXIgbXVsdGlwYXJ0ID0gKCRmb3JtLmF0dHIoJ2VuY3R5cGUnKSA9PSBtcCB8fCAkZm9ybS5hdHRyKCdlbmNvZGluZycpID09IG1wKTtcclxuXHJcbiAgICB2YXIgZmlsZUFQSSA9IGZlYXR1cmUuZmlsZWFwaSAmJiBmZWF0dXJlLmZvcm1kYXRhO1xyXG4gICAgbG9nKFwiZmlsZUFQSSA6XCIgKyBmaWxlQVBJKTtcclxuICAgIHZhciBzaG91bGRVc2VGcmFtZSA9IChoYXNGaWxlSW5wdXRzIHx8IG11bHRpcGFydCkgJiYgIWZpbGVBUEk7XHJcblxyXG4gICAgdmFyIGpxeGhyO1xyXG5cclxuICAgIC8vIG9wdGlvbnMuaWZyYW1lIGFsbG93cyB1c2VyIHRvIGZvcmNlIGlmcmFtZSBtb2RlXHJcbiAgICAvLyAwNi1OT1YtMDk6IG5vdyBkZWZhdWx0aW5nIHRvIGlmcmFtZSBtb2RlIGlmIGZpbGUgaW5wdXQgaXMgZGV0ZWN0ZWRcclxuICAgIGlmIChvcHRpb25zLmlmcmFtZSAhPT0gZmFsc2UgJiYgKG9wdGlvbnMuaWZyYW1lIHx8IHNob3VsZFVzZUZyYW1lKSkge1xyXG4gICAgICAgIC8vIGhhY2sgdG8gZml4IFNhZmFyaSBoYW5nICh0aGFua3MgdG8gVGltIE1vbGVuZGlqayBmb3IgdGhpcylcclxuICAgICAgICAvLyBzZWU6ICBodHRwOi8vZ3JvdXBzLmdvb2dsZS5jb20vZ3JvdXAvanF1ZXJ5LWRldi9icm93c2VfdGhyZWFkL3RocmVhZC8zNjM5NWI3YWI1MTBkZDVkXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuY2xvc2VLZWVwQWxpdmUpIHtcclxuICAgICAgICAgICAgJC5nZXQob3B0aW9ucy5jbG9zZUtlZXBBbGl2ZSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBqcXhociA9IGZpbGVVcGxvYWRJZnJhbWUoYSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAganF4aHIgPSBmaWxlVXBsb2FkSWZyYW1lKGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKChoYXNGaWxlSW5wdXRzIHx8IG11bHRpcGFydCkgJiYgZmlsZUFQSSkge1xyXG4gICAgICAgIGpxeGhyID0gZmlsZVVwbG9hZFhocihhKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGpxeGhyID0gJC5hamF4KG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgICRmb3JtLnJlbW92ZURhdGEoJ2pxeGhyJykuZGF0YSgnanF4aHInLCBqcXhocik7XHJcblxyXG4gICAgLy8gY2xlYXIgZWxlbWVudCBhcnJheVxyXG4gICAgZm9yICh2YXIgaz0wOyBrIDwgZWxlbWVudHMubGVuZ3RoOyBrKyspXHJcbiAgICAgICAgZWxlbWVudHNba10gPSBudWxsO1xyXG5cclxuICAgIC8vIGZpcmUgJ25vdGlmeScgZXZlbnRcclxuICAgIHRoaXMudHJpZ2dlcignZm9ybS1zdWJtaXQtbm90aWZ5JywgW3RoaXMsIG9wdGlvbnNdKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIC8vIHV0aWxpdHkgZm4gZm9yIGRlZXAgc2VyaWFsaXphdGlvblxyXG4gICAgZnVuY3Rpb24gZGVlcFNlcmlhbGl6ZShleHRyYURhdGEpe1xyXG4gICAgICAgIHZhciBzZXJpYWxpemVkID0gJC5wYXJhbShleHRyYURhdGEsIG9wdGlvbnMudHJhZGl0aW9uYWwpLnNwbGl0KCcmJyk7XHJcbiAgICAgICAgdmFyIGxlbiA9IHNlcmlhbGl6ZWQubGVuZ3RoO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICB2YXIgaSwgcGFydDtcclxuICAgICAgICBmb3IgKGk9MDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vICMyNTI7IHVuZG8gcGFyYW0gc3BhY2UgcmVwbGFjZW1lbnRcclxuICAgICAgICAgICAgc2VyaWFsaXplZFtpXSA9IHNlcmlhbGl6ZWRbaV0ucmVwbGFjZSgvXFwrL2csJyAnKTtcclxuICAgICAgICAgICAgcGFydCA9IHNlcmlhbGl6ZWRbaV0uc3BsaXQoJz0nKTtcclxuICAgICAgICAgICAgLy8gIzI3ODsgdXNlIGFycmF5IGluc3RlYWQgb2Ygb2JqZWN0IHN0b3JhZ2UsIGZhdm9yaW5nIGFycmF5IHNlcmlhbGl6YXRpb25zXHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtkZWNvZGVVUklDb21wb25lbnQocGFydFswXSksIGRlY29kZVVSSUNvbXBvbmVudChwYXJ0WzFdKV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgICAvLyBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyIGZpbGUgdXBsb2FkcyAoYmlnIGhhdCB0aXAgdG8gZnJhbmNvaXMybWV0eilcclxuICAgIGZ1bmN0aW9uIGZpbGVVcGxvYWRYaHIoYSkge1xyXG4gICAgICAgIHZhciBmb3JtZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpPTA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcm1kYXRhLmFwcGVuZChhW2ldLm5hbWUsIGFbaV0udmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuZXh0cmFEYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXJpYWxpemVkRGF0YSA9IGRlZXBTZXJpYWxpemUob3B0aW9ucy5leHRyYURhdGEpO1xyXG4gICAgICAgICAgICBmb3IgKGk9MDsgaSA8IHNlcmlhbGl6ZWREYXRhLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgaWYgKHNlcmlhbGl6ZWREYXRhW2ldKVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1kYXRhLmFwcGVuZChzZXJpYWxpemVkRGF0YVtpXVswXSwgc2VyaWFsaXplZERhdGFbaV1bMV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3B0aW9ucy5kYXRhID0gbnVsbDtcclxuXHJcbiAgICAgICAgdmFyIHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgJC5hamF4U2V0dGluZ3MsIG9wdGlvbnMsIHtcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgdHlwZTogbWV0aG9kIHx8ICdQT1NUJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy51cGxvYWRQcm9ncmVzcykge1xyXG4gICAgICAgICAgICAvLyB3b3JrYXJvdW5kIGJlY2F1c2UganFYSFIgZG9lcyBub3QgZXhwb3NlIHVwbG9hZCBwcm9wZXJ0eVxyXG4gICAgICAgICAgICBzLnhociA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHhociA9ICQuYWpheFNldHRpbmdzLnhocigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHhoci51cGxvYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBldmVudC5sb2FkZWQgfHwgZXZlbnQucG9zaXRpb247IC8qZXZlbnQucG9zaXRpb24gaXMgZGVwcmVjYXRlZCovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b3RhbCA9IGV2ZW50LnRvdGFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQubGVuZ3RoQ29tcHV0YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudCA9IE1hdGguY2VpbChwb3NpdGlvbiAvIHRvdGFsICogMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnVwbG9hZFByb2dyZXNzKGV2ZW50LCBwb3NpdGlvbiwgdG90YWwsIHBlcmNlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB4aHI7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzLmRhdGEgPSBudWxsO1xyXG4gICAgICAgIHZhciBiZWZvcmVTZW5kID0gcy5iZWZvcmVTZW5kO1xyXG4gICAgICAgIHMuYmVmb3JlU2VuZCA9IGZ1bmN0aW9uKHhociwgbykge1xyXG4gICAgICAgICAgICAvL1NlbmQgRm9ybURhdGEoKSBwcm92aWRlZCBieSB1c2VyXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmZvcm1EYXRhKVxyXG4gICAgICAgICAgICAgICAgby5kYXRhID0gb3B0aW9ucy5mb3JtRGF0YTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgby5kYXRhID0gZm9ybWRhdGE7XHJcbiAgICAgICAgICAgIGlmKGJlZm9yZVNlbmQpXHJcbiAgICAgICAgICAgICAgICBiZWZvcmVTZW5kLmNhbGwodGhpcywgeGhyLCBvKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiAkLmFqYXgocyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJpdmF0ZSBmdW5jdGlvbiBmb3IgaGFuZGxpbmcgZmlsZSB1cGxvYWRzIChoYXQgdGlwIHRvIFlBSE9PISlcclxuICAgIGZ1bmN0aW9uIGZpbGVVcGxvYWRJZnJhbWUoYSkge1xyXG4gICAgICAgIHZhciBmb3JtID0gJGZvcm1bMF0sIGVsLCBpLCBzLCBnLCBpZCwgJGlvLCBpbywgeGhyLCBzdWIsIG4sIHRpbWVkT3V0LCB0aW1lb3V0SGFuZGxlO1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgLy8gIzM0MVxyXG4gICAgICAgIGRlZmVycmVkLmFib3J0ID0gZnVuY3Rpb24oc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHhoci5hYm9ydChzdGF0dXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChhKSB7XHJcbiAgICAgICAgICAgIC8vIGVuc3VyZSB0aGF0IGV2ZXJ5IHNlcmlhbGl6ZWQgaW5wdXQgaXMgc3RpbGwgZW5hYmxlZFxyXG4gICAgICAgICAgICBmb3IgKGk9MDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBlbCA9ICQoZWxlbWVudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBoYXNQcm9wIClcclxuICAgICAgICAgICAgICAgICAgICBlbC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzID0gJC5leHRlbmQodHJ1ZSwge30sICQuYWpheFNldHRpbmdzLCBvcHRpb25zKTtcclxuICAgICAgICBzLmNvbnRleHQgPSBzLmNvbnRleHQgfHwgcztcclxuICAgICAgICBpZCA9ICdqcUZvcm1JTycgKyAobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xyXG4gICAgICAgIGlmIChzLmlmcmFtZVRhcmdldCkge1xyXG4gICAgICAgICAgICAkaW8gPSAkKHMuaWZyYW1lVGFyZ2V0KTtcclxuICAgICAgICAgICAgbiA9ICRpby5hdHRyMignbmFtZScpO1xyXG4gICAgICAgICAgICBpZiAoIW4pXHJcbiAgICAgICAgICAgICAgICAgJGlvLmF0dHIyKCduYW1lJywgaWQpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBpZCA9IG47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkaW8gPSAkKCc8aWZyYW1lIG5hbWU9XCInICsgaWQgKyAnXCIgc3JjPVwiJysgcy5pZnJhbWVTcmMgKydcIiAvPicpO1xyXG4gICAgICAgICAgICAkaW8uY3NzKHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJy0xMDAwcHgnLCBsZWZ0OiAnLTEwMDBweCcgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlvID0gJGlvWzBdO1xyXG5cclxuXHJcbiAgICAgICAgeGhyID0geyAvLyBtb2NrIG9iamVjdFxyXG4gICAgICAgICAgICBhYm9ydGVkOiAwLFxyXG4gICAgICAgICAgICByZXNwb25zZVRleHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlWE1MOiBudWxsLFxyXG4gICAgICAgICAgICBzdGF0dXM6IDAsXHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQ6ICduL2EnLFxyXG4gICAgICAgICAgICBnZXRBbGxSZXNwb25zZUhlYWRlcnM6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgIGdldFJlc3BvbnNlSGVhZGVyOiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICBzZXRSZXF1ZXN0SGVhZGVyOiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICBhYm9ydDogZnVuY3Rpb24oc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZSA9IChzdGF0dXMgPT09ICd0aW1lb3V0JyA/ICd0aW1lb3V0JyA6ICdhYm9ydGVkJyk7XHJcbiAgICAgICAgICAgICAgICBsb2coJ2Fib3J0aW5nIHVwbG9hZC4uLiAnICsgZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFib3J0ZWQgPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7IC8vICMyMTQsICMyNTdcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW8uY29udGVudFdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpby5jb250ZW50V2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdTdG9wJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2goaWdub3JlKSB7fVxyXG5cclxuICAgICAgICAgICAgICAgICRpby5hdHRyKCdzcmMnLCBzLmlmcmFtZVNyYyk7IC8vIGFib3J0IG9wIGluIHByb2dyZXNzXHJcbiAgICAgICAgICAgICAgICB4aHIuZXJyb3IgPSBlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHMuZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgcy5lcnJvci5jYWxsKHMuY29udGV4dCwgeGhyLCBlLCBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGcpXHJcbiAgICAgICAgICAgICAgICAgICAgJC5ldmVudC50cmlnZ2VyKFwiYWpheEVycm9yXCIsIFt4aHIsIHMsIGVdKTtcclxuICAgICAgICAgICAgICAgIGlmIChzLmNvbXBsZXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHMuY29tcGxldGUuY2FsbChzLmNvbnRleHQsIHhociwgZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBnID0gcy5nbG9iYWw7XHJcbiAgICAgICAgLy8gdHJpZ2dlciBhamF4IGdsb2JhbCBldmVudHMgc28gdGhhdCBhY3Rpdml0eS9ibG9jayBpbmRpY2F0b3JzIHdvcmsgbGlrZSBub3JtYWxcclxuICAgICAgICBpZiAoZyAmJiAwID09PSAkLmFjdGl2ZSsrKSB7XHJcbiAgICAgICAgICAgICQuZXZlbnQudHJpZ2dlcihcImFqYXhTdGFydFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGcpIHtcclxuICAgICAgICAgICAgJC5ldmVudC50cmlnZ2VyKFwiYWpheFNlbmRcIiwgW3hociwgc10pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHMuYmVmb3JlU2VuZCAmJiBzLmJlZm9yZVNlbmQuY2FsbChzLmNvbnRleHQsIHhociwgcykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmIChzLmdsb2JhbCkge1xyXG4gICAgICAgICAgICAgICAgJC5hY3RpdmUtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeGhyLmFib3J0ZWQpIHtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGFkZCBzdWJtaXR0aW5nIGVsZW1lbnQgdG8gZGF0YSBpZiB3ZSBrbm93IGl0XHJcbiAgICAgICAgc3ViID0gZm9ybS5jbGs7XHJcbiAgICAgICAgaWYgKHN1Yikge1xyXG4gICAgICAgICAgICBuID0gc3ViLm5hbWU7XHJcbiAgICAgICAgICAgIGlmIChuICYmICFzdWIuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIHMuZXh0cmFEYXRhID0gcy5leHRyYURhdGEgfHwge307XHJcbiAgICAgICAgICAgICAgICBzLmV4dHJhRGF0YVtuXSA9IHN1Yi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChzdWIudHlwZSA9PSBcImltYWdlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzLmV4dHJhRGF0YVtuKycueCddID0gZm9ybS5jbGtfeDtcclxuICAgICAgICAgICAgICAgICAgICBzLmV4dHJhRGF0YVtuKycueSddID0gZm9ybS5jbGtfeTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIENMSUVOVF9USU1FT1VUX0FCT1JUID0gMTtcclxuICAgICAgICB2YXIgU0VSVkVSX0FCT1JUID0gMjtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERvYyhmcmFtZSkge1xyXG4gICAgICAgICAgICAvKiBpdCBsb29rcyBsaWtlIGNvbnRlbnRXaW5kb3cgb3IgY29udGVudERvY3VtZW50IGRvIG5vdFxyXG4gICAgICAgICAgICAgKiBjYXJyeSB0aGUgcHJvdG9jb2wgcHJvcGVydHkgaW4gaWU4LCB3aGVuIHJ1bm5pbmcgdW5kZXIgc3NsXHJcbiAgICAgICAgICAgICAqIGZyYW1lLmRvY3VtZW50IGlzIHRoZSBvbmx5IHZhbGlkIHJlc3BvbnNlIGRvY3VtZW50LCBzaW5jZVxyXG4gICAgICAgICAgICAgKiB0aGUgcHJvdG9jb2wgaXMga25vdyBidXQgbm90IG9uIHRoZSBvdGhlciB0d28gb2JqZWN0cy4gc3RyYW5nZT9cclxuICAgICAgICAgICAgICogXCJTYW1lIG9yaWdpbiBwb2xpY3lcIiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NhbWVfb3JpZ2luX3BvbGljeVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBkb2MgPSBudWxsO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gSUU4IGNhc2NhZGluZyBhY2Nlc3MgY2hlY2tcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChmcmFtZS5jb250ZW50V2luZG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jID0gZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICAgICAgICAgIC8vIElFOCBhY2Nlc3MgZGVuaWVkIHVuZGVyIHNzbCAmIG1pc3NpbmcgcHJvdG9jb2xcclxuICAgICAgICAgICAgICAgIGxvZygnY2Fubm90IGdldCBpZnJhbWUuY29udGVudFdpbmRvdyBkb2N1bWVudDogJyArIGVycik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkb2MpIHsgLy8gc3VjY2Vzc2Z1bCBnZXR0aW5nIGNvbnRlbnRcclxuICAgICAgICAgICAgICAgIHJldHVybiBkb2M7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRyeSB7IC8vIHNpbXBseSBjaGVja2luZyBtYXkgdGhyb3cgaW4gaWU4IHVuZGVyIHNzbCBvciBtaXNtYXRjaGVkIHByb3RvY29sXHJcbiAgICAgICAgICAgICAgICBkb2MgPSBmcmFtZS5jb250ZW50RG9jdW1lbnQgPyBmcmFtZS5jb250ZW50RG9jdW1lbnQgOiBmcmFtZS5kb2N1bWVudDtcclxuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICAgICAgICAgIC8vIGxhc3QgYXR0ZW1wdFxyXG4gICAgICAgICAgICAgICAgbG9nKCdjYW5ub3QgZ2V0IGlmcmFtZS5jb250ZW50RG9jdW1lbnQ6ICcgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgZG9jID0gZnJhbWUuZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRvYztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJhaWxzIENTUkYgaGFjayAodGhhbmtzIHRvIFl2YW4gQmFydGhlbGVteSlcclxuICAgICAgICB2YXIgY3NyZl90b2tlbiA9ICQoJ21ldGFbbmFtZT1jc3JmLXRva2VuXScpLmF0dHIoJ2NvbnRlbnQnKTtcclxuICAgICAgICB2YXIgY3NyZl9wYXJhbSA9ICQoJ21ldGFbbmFtZT1jc3JmLXBhcmFtXScpLmF0dHIoJ2NvbnRlbnQnKTtcclxuICAgICAgICBpZiAoY3NyZl9wYXJhbSAmJiBjc3JmX3Rva2VuKSB7XHJcbiAgICAgICAgICAgIHMuZXh0cmFEYXRhID0gcy5leHRyYURhdGEgfHwge307XHJcbiAgICAgICAgICAgIHMuZXh0cmFEYXRhW2NzcmZfcGFyYW1dID0gY3NyZl90b2tlbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRha2UgYSBicmVhdGggc28gdGhhdCBwZW5kaW5nIHJlcGFpbnRzIGdldCBzb21lIGNwdSB0aW1lIGJlZm9yZSB0aGUgdXBsb2FkIHN0YXJ0c1xyXG4gICAgICAgIGZ1bmN0aW9uIGRvU3VibWl0KCkge1xyXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgZm9ybSBhdHRycyBhcmUgc2V0XHJcbiAgICAgICAgICAgIHZhciB0ID0gJGZvcm0uYXR0cjIoJ3RhcmdldCcpLCBhID0gJGZvcm0uYXR0cjIoJ2FjdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlIGZvcm0gYXR0cnMgaW4gSUUgZnJpZW5kbHkgd2F5XHJcbiAgICAgICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCd0YXJnZXQnLGlkKTtcclxuICAgICAgICAgICAgaWYgKCFtZXRob2QgfHwgL3Bvc3QvaS50ZXN0KG1ldGhvZCkgKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgJ1BPU1QnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYSAhPSBzLnVybCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicsIHMudXJsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWUgYm9ya3MgaW4gc29tZSBjYXNlcyB3aGVuIHNldHRpbmcgZW5jb2RpbmdcclxuICAgICAgICAgICAgaWYgKCEgcy5za2lwRW5jb2RpbmdPdmVycmlkZSAmJiAoIW1ldGhvZCB8fCAvcG9zdC9pLnRlc3QobWV0aG9kKSkpIHtcclxuICAgICAgICAgICAgICAgICRmb3JtLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuY29kaW5nOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5jdHlwZTogICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHN1cHBvcnQgdGltb3V0XHJcbiAgICAgICAgICAgIGlmIChzLnRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIHRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0aW1lZE91dCA9IHRydWU7IGNiKENMSUVOVF9USU1FT1VUX0FCT1JUKTsgfSwgcy50aW1lb3V0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gbG9vayBmb3Igc2VydmVyIGFib3J0c1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja1N0YXRlKCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBnZXREb2MoaW8pLnJlYWR5U3RhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nKCdzdGF0ZSA9ICcgKyBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlICYmIHN0YXRlLnRvTG93ZXJDYXNlKCkgPT0gJ3VuaW5pdGlhbGl6ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrU3RhdGUsNTApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZygnU2VydmVyIGFib3J0OiAnICwgZSwgJyAoJywgZS5uYW1lLCAnKScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNiKFNFUlZFUl9BQk9SVCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVvdXRIYW5kbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SGFuZGxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0SGFuZGxlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgXCJleHRyYVwiIGRhdGEgdG8gZm9ybSBpZiBwcm92aWRlZCBpbiBvcHRpb25zXHJcbiAgICAgICAgICAgIHZhciBleHRyYUlucHV0cyA9IFtdO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHMuZXh0cmFEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbiBpbiBzLmV4dHJhRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5leHRyYURhdGEuaGFzT3duUHJvcGVydHkobikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdXNpbmcgdGhlICQucGFyYW0gZm9ybWF0IHRoYXQgYWxsb3dzIGZvciBtdWx0aXBsZSB2YWx1ZXMgd2l0aCB0aGUgc2FtZSBuYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCQuaXNQbGFpbk9iamVjdChzLmV4dHJhRGF0YVtuXSkgJiYgcy5leHRyYURhdGFbbl0uaGFzT3duUHJvcGVydHkoJ25hbWUnKSAmJiBzLmV4dHJhRGF0YVtuXS5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFJbnB1dHMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIicrcy5leHRyYURhdGFbbl0ubmFtZSsnXCI+JykudmFsKHMuZXh0cmFEYXRhW25dLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhmb3JtKVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYUlucHV0cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiJytuKydcIj4nKS52YWwocy5leHRyYURhdGFbbl0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKGZvcm0pWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghcy5pZnJhbWVUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgaWZyYW1lIHRvIGRvYyBhbmQgc3VibWl0IHRoZSBmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgJGlvLmFwcGVuZFRvKCdib2R5Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaW8uYXR0YWNoRXZlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgaW8uYXR0YWNoRXZlbnQoJ29ubG9hZCcsIGNiKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBpby5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgY2IsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tTdGF0ZSwxNSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBqdXN0IGluIGNhc2UgZm9ybSBoYXMgZWxlbWVudCB3aXRoIG5hbWUvaWQgb2YgJ3N1Ym1pdCdcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VibWl0Rm4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJykuc3VibWl0O1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pdEZuLmFwcGx5KGZvcm0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgYXR0cnMgYW5kIHJlbW92ZSBcImV4dHJhXCIgaW5wdXQgZWxlbWVudHNcclxuICAgICAgICAgICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCdhY3Rpb24nLGEpO1xyXG4gICAgICAgICAgICAgICAgaWYodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCd0YXJnZXQnLCB0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGZvcm0ucmVtb3ZlQXR0cigndGFyZ2V0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkKGV4dHJhSW5wdXRzKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHMuZm9yY2VTeW5jKSB7XHJcbiAgICAgICAgICAgIGRvU3VibWl0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGRvU3VibWl0LCAxMCk7IC8vIHRoaXMgbGV0cyBkb20gdXBkYXRlcyByZW5kZXJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBkYXRhLCBkb2MsIGRvbUNoZWNrQ291bnQgPSA1MCwgY2FsbGJhY2tQcm9jZXNzZWQ7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNiKGUpIHtcclxuICAgICAgICAgICAgaWYgKHhoci5hYm9ydGVkIHx8IGNhbGxiYWNrUHJvY2Vzc2VkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRvYyA9IGdldERvYyhpbyk7XHJcbiAgICAgICAgICAgIGlmKCFkb2MpIHtcclxuICAgICAgICAgICAgICAgIGxvZygnY2Fubm90IGFjY2VzcyByZXNwb25zZSBkb2N1bWVudCcpO1xyXG4gICAgICAgICAgICAgICAgZSA9IFNFUlZFUl9BQk9SVDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZSA9PT0gQ0xJRU5UX1RJTUVPVVRfQUJPUlQgJiYgeGhyKSB7XHJcbiAgICAgICAgICAgICAgICB4aHIuYWJvcnQoJ3RpbWVvdXQnKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh4aHIsICd0aW1lb3V0Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZSA9PSBTRVJWRVJfQUJPUlQgJiYgeGhyKSB7XHJcbiAgICAgICAgICAgICAgICB4aHIuYWJvcnQoJ3NlcnZlciBhYm9ydCcpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHhociwgJ2Vycm9yJywgJ3NlcnZlciBhYm9ydCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWRvYyB8fCBkb2MubG9jYXRpb24uaHJlZiA9PSBzLmlmcmFtZVNyYykge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVzcG9uc2Ugbm90IHJlY2VpdmVkIHlldFxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aW1lZE91dClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlvLmRldGFjaEV2ZW50KVxyXG4gICAgICAgICAgICAgICAgaW8uZGV0YWNoRXZlbnQoJ29ubG9hZCcsIGNiKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgaW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIGNiLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gJ3N1Y2Nlc3MnLCBlcnJNc2c7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGltZWRPdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyAndGltZW91dCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlzWG1sID0gcy5kYXRhVHlwZSA9PSAneG1sJyB8fCBkb2MuWE1MRG9jdW1lbnQgfHwgJC5pc1hNTERvYyhkb2MpO1xyXG4gICAgICAgICAgICAgICAgbG9nKCdpc1htbD0nK2lzWG1sKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNYbWwgJiYgd2luZG93Lm9wZXJhICYmIChkb2MuYm9keSA9PT0gbnVsbCB8fCAhZG9jLmJvZHkuaW5uZXJIVE1MKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgtLWRvbUNoZWNrQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW4gc29tZSBicm93c2VycyAoT3BlcmEpIHRoZSBpZnJhbWUgRE9NIGlzIG5vdCBhbHdheXMgdHJhdmVyc2FibGUgd2hlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgb25sb2FkIGNhbGxiYWNrIGZpcmVzLCBzbyB3ZSBsb29wIGEgYml0IHRvIGFjY29tbW9kYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZygncmVxdWVpbmcgb25Mb2FkIGNhbGxiYWNrLCBET00gbm90IGF2YWlsYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNiLCAyNTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCB0aGlzIGZhbGwgdGhyb3VnaCBiZWNhdXNlIHNlcnZlciByZXNwb25zZSBjb3VsZCBiZSBhbiBlbXB0eSBkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbG9nKCdDb3VsZCBub3QgYWNjZXNzIGlmcmFtZSBET00gYWZ0ZXIgbXV0aXBsZSB0cmllcy4nKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3Rocm93ICdET01FeGNlcHRpb246IG5vdCBhdmFpbGFibGUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vbG9nKCdyZXNwb25zZSBkZXRlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRvY1Jvb3QgPSBkb2MuYm9keSA/IGRvYy5ib2R5IDogZG9jLmRvY3VtZW50RWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHhoci5yZXNwb25zZVRleHQgPSBkb2NSb290ID8gZG9jUm9vdC5pbm5lckhUTUwgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlWE1MID0gZG9jLlhNTERvY3VtZW50ID8gZG9jLlhNTERvY3VtZW50IDogZG9jO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzWG1sKVxyXG4gICAgICAgICAgICAgICAgICAgIHMuZGF0YVR5cGUgPSAneG1sJztcclxuICAgICAgICAgICAgICAgIHhoci5nZXRSZXNwb25zZUhlYWRlciA9IGZ1bmN0aW9uKGhlYWRlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhlYWRlcnMgPSB7J2NvbnRlbnQtdHlwZSc6IHMuZGF0YVR5cGV9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoZWFkZXJzW2hlYWRlci50b0xvd2VyQ2FzZSgpXTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvLyBzdXBwb3J0IGZvciBYSFIgJ3N0YXR1cycgJiAnc3RhdHVzVGV4dCcgZW11bGF0aW9uIDpcclxuICAgICAgICAgICAgICAgIGlmIChkb2NSb290KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeGhyLnN0YXR1cyA9IE51bWJlciggZG9jUm9vdC5nZXRBdHRyaWJ1dGUoJ3N0YXR1cycpICkgfHwgeGhyLnN0YXR1cztcclxuICAgICAgICAgICAgICAgICAgICB4aHIuc3RhdHVzVGV4dCA9IGRvY1Jvb3QuZ2V0QXR0cmlidXRlKCdzdGF0dXNUZXh0JykgfHwgeGhyLnN0YXR1c1RleHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGR0ID0gKHMuZGF0YVR5cGUgfHwgJycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2NyID0gLyhqc29ufHNjcmlwdHx0ZXh0KS8udGVzdChkdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2NyIHx8IHMudGV4dGFyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZWUgaWYgdXNlciBlbWJlZGRlZCByZXNwb25zZSBpbiB0ZXh0YXJlYVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YSA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGV4dGFyZWEnKVswXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVGV4dCA9IHRhLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdXBwb3J0IGZvciBYSFIgJ3N0YXR1cycgJiAnc3RhdHVzVGV4dCcgZW11bGF0aW9uIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnN0YXR1cyA9IE51bWJlciggdGEuZ2V0QXR0cmlidXRlKCdzdGF0dXMnKSApIHx8IHhoci5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zdGF0dXNUZXh0ID0gdGEuZ2V0QXR0cmlidXRlKCdzdGF0dXNUZXh0JykgfHwgeGhyLnN0YXR1c1RleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhY2NvdW50IGZvciBicm93c2VycyBpbmplY3RpbmcgcHJlIGFyb3VuZCBqc29uIHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmUgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3ByZScpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYiA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIucmVzcG9uc2VUZXh0ID0gcHJlLnRleHRDb250ZW50ID8gcHJlLnRleHRDb250ZW50IDogcHJlLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIucmVzcG9uc2VUZXh0ID0gYi50ZXh0Q29udGVudCA/IGIudGV4dENvbnRlbnQgOiBiLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGR0ID09ICd4bWwnICYmICF4aHIucmVzcG9uc2VYTUwgJiYgeGhyLnJlc3BvbnNlVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHhoci5yZXNwb25zZVhNTCA9IHRvWG1sKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGh0dHBEYXRhKHhociwgZHQsIHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9ICdwYXJzZXJlcnJvcic7XHJcbiAgICAgICAgICAgICAgICAgICAgeGhyLmVycm9yID0gZXJyTXNnID0gKGVyciB8fCBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGxvZygnZXJyb3IgY2F1Z2h0OiAnLGVycik7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSAnZXJyb3InO1xyXG4gICAgICAgICAgICAgICAgeGhyLmVycm9yID0gZXJyTXNnID0gKGVyciB8fCBzdGF0dXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoeGhyLmFib3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGxvZygndXBsb2FkIGFib3J0ZWQnKTtcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzKSB7IC8vIHdlJ3ZlIHNldCB4aHIuc3RhdHVzXHJcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCB8fCB4aHIuc3RhdHVzID09PSAzMDQpID8gJ3N1Y2Nlc3MnIDogJ2Vycm9yJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gb3JkZXJpbmcgb2YgdGhlc2UgY2FsbGJhY2tzL3RyaWdnZXJzIGlzIG9kZCwgYnV0IHRoYXQncyBob3cgJC5hamF4IGRvZXMgaXRcclxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocy5zdWNjZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIHMuc3VjY2Vzcy5jYWxsKHMuY29udGV4dCwgZGF0YSwgJ3N1Y2Nlc3MnLCB4aHIpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0LCAnc3VjY2VzcycsIHhocik7XHJcbiAgICAgICAgICAgICAgICBpZiAoZylcclxuICAgICAgICAgICAgICAgICAgICAkLmV2ZW50LnRyaWdnZXIoXCJhamF4U3VjY2Vzc1wiLCBbeGhyLCBzXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyTXNnID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyTXNnID0geGhyLnN0YXR1c1RleHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAocy5lcnJvcilcclxuICAgICAgICAgICAgICAgICAgICBzLmVycm9yLmNhbGwocy5jb250ZXh0LCB4aHIsIHN0YXR1cywgZXJyTXNnKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh4aHIsICdlcnJvcicsIGVyck1zZyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZylcclxuICAgICAgICAgICAgICAgICAgICAkLmV2ZW50LnRyaWdnZXIoXCJhamF4RXJyb3JcIiwgW3hociwgcywgZXJyTXNnXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChnKVxyXG4gICAgICAgICAgICAgICAgJC5ldmVudC50cmlnZ2VyKFwiYWpheENvbXBsZXRlXCIsIFt4aHIsIHNdKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChnICYmICEgLS0kLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgJC5ldmVudC50cmlnZ2VyKFwiYWpheFN0b3BcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzLmNvbXBsZXRlKVxyXG4gICAgICAgICAgICAgICAgcy5jb21wbGV0ZS5jYWxsKHMuY29udGV4dCwgeGhyLCBzdGF0dXMpO1xyXG5cclxuICAgICAgICAgICAgY2FsbGJhY2tQcm9jZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAocy50aW1lb3V0KVxyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRIYW5kbGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gY2xlYW4gdXBcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICghcy5pZnJhbWVUYXJnZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgJGlvLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSAgLy9hZGRpbmcgZWxzZSB0byBjbGVhbiB1cCBleGlzdGluZyBpZnJhbWUgcmVzcG9uc2UuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlvLmF0dHIoJ3NyYycsIHMuaWZyYW1lU3JjKTtcclxuICAgICAgICAgICAgICAgIHhoci5yZXNwb25zZVhNTCA9IG51bGw7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdG9YbWwgPSAkLnBhcnNlWE1MIHx8IGZ1bmN0aW9uKHMsIGRvYykgeyAvLyB1c2UgcGFyc2VYTUwgaWYgYXZhaWxhYmxlIChqUXVlcnkgMS41KylcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5BY3RpdmVYT2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBkb2MgPSBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTERPTScpO1xyXG4gICAgICAgICAgICAgICAgZG9jLmFzeW5jID0gJ2ZhbHNlJztcclxuICAgICAgICAgICAgICAgIGRvYy5sb2FkWE1MKHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZG9jID0gKG5ldyBET01QYXJzZXIoKSkucGFyc2VGcm9tU3RyaW5nKHMsICd0ZXh0L3htbCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAoZG9jICYmIGRvYy5kb2N1bWVudEVsZW1lbnQgJiYgZG9jLmRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSAhPSAncGFyc2VyZXJyb3InKSA/IGRvYyA6IG51bGw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgcGFyc2VKU09OID0gJC5wYXJzZUpTT04gfHwgZnVuY3Rpb24ocykge1xyXG4gICAgICAgICAgICAvKmpzbGludCBldmlsOnRydWUgKi9cclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvd1snZXZhbCddKCcoJyArIHMgKyAnKScpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBodHRwRGF0YSA9IGZ1bmN0aW9uKCB4aHIsIHR5cGUsIHMgKSB7IC8vIG1vc3RseSBsaWZ0ZWQgZnJvbSBqcTEuNC40XHJcblxyXG4gICAgICAgICAgICB2YXIgY3QgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ2NvbnRlbnQtdHlwZScpIHx8ICcnLFxyXG4gICAgICAgICAgICAgICAgeG1sID0gdHlwZSA9PT0gJ3htbCcgfHwgIXR5cGUgJiYgY3QuaW5kZXhPZigneG1sJykgPj0gMCxcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB4bWwgPyB4aHIucmVzcG9uc2VYTUwgOiB4aHIucmVzcG9uc2VUZXh0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHhtbCAmJiBkYXRhLmRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSA9PT0gJ3BhcnNlcmVycm9yJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQuZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgJC5lcnJvcigncGFyc2VyZXJyb3InKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocyAmJiBzLmRhdGFGaWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBzLmRhdGFGaWx0ZXIoZGF0YSwgdHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdqc29uJyB8fCAhdHlwZSAmJiBjdC5pbmRleE9mKCdqc29uJykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBwYXJzZUpTT04oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwic2NyaXB0XCIgfHwgIXR5cGUgJiYgY3QuaW5kZXhPZihcImphdmFzY3JpcHRcIikgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuZ2xvYmFsRXZhbChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogYWpheEZvcm0oKSBwcm92aWRlcyBhIG1lY2hhbmlzbSBmb3IgZnVsbHkgYXV0b21hdGluZyBmb3JtIHN1Ym1pc3Npb24uXHJcbiAqXHJcbiAqIFRoZSBhZHZhbnRhZ2VzIG9mIHVzaW5nIHRoaXMgbWV0aG9kIGluc3RlYWQgb2YgYWpheFN1Ym1pdCgpIGFyZTpcclxuICpcclxuICogMTogVGhpcyBtZXRob2Qgd2lsbCBpbmNsdWRlIGNvb3JkaW5hdGVzIGZvciA8aW5wdXQgdHlwZT1cImltYWdlXCIgLz4gZWxlbWVudHMgKGlmIHRoZSBlbGVtZW50XHJcbiAqICAgIGlzIHVzZWQgdG8gc3VibWl0IHRoZSBmb3JtKS5cclxuICogMi4gVGhpcyBtZXRob2Qgd2lsbCBpbmNsdWRlIHRoZSBzdWJtaXQgZWxlbWVudCdzIG5hbWUvdmFsdWUgZGF0YSAoZm9yIHRoZSBlbGVtZW50IHRoYXQgd2FzXHJcbiAqICAgIHVzZWQgdG8gc3VibWl0IHRoZSBmb3JtKS5cclxuICogMy4gVGhpcyBtZXRob2QgYmluZHMgdGhlIHN1Ym1pdCgpIG1ldGhvZCB0byB0aGUgZm9ybSBmb3IgeW91LlxyXG4gKlxyXG4gKiBUaGUgb3B0aW9ucyBhcmd1bWVudCBmb3IgYWpheEZvcm0gd29ya3MgZXhhY3RseSBhcyBpdCBkb2VzIGZvciBhamF4U3VibWl0LiAgYWpheEZvcm0gbWVyZWx5XHJcbiAqIHBhc3NlcyB0aGUgb3B0aW9ucyBhcmd1bWVudCBhbG9uZyBhZnRlciBwcm9wZXJseSBiaW5kaW5nIGV2ZW50cyBmb3Igc3VibWl0IGVsZW1lbnRzIGFuZFxyXG4gKiB0aGUgZm9ybSBpdHNlbGYuXHJcbiAqL1xyXG4kLmZuLmFqYXhGb3JtID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICBvcHRpb25zLmRlbGVnYXRpb24gPSBvcHRpb25zLmRlbGVnYXRpb24gJiYgJC5pc0Z1bmN0aW9uKCQuZm4ub24pO1xyXG5cclxuICAgIC8vIGluIGpRdWVyeSAxLjMrIHdlIGNhbiBmaXggbWlzdGFrZXMgd2l0aCB0aGUgcmVhZHkgc3RhdGVcclxuICAgIGlmICghb3B0aW9ucy5kZWxlZ2F0aW9uICYmIHRoaXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgdmFyIG8gPSB7IHM6IHRoaXMuc2VsZWN0b3IsIGM6IHRoaXMuY29udGV4dCB9O1xyXG4gICAgICAgIGlmICghJC5pc1JlYWR5ICYmIG8ucykge1xyXG4gICAgICAgICAgICBsb2coJ0RPTSBub3QgcmVhZHksIHF1ZXVpbmcgYWpheEZvcm0nKTtcclxuICAgICAgICAgICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQoby5zLG8uYykuYWpheEZvcm0ob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaXMgeW91ciBET00gcmVhZHk/ICBodHRwOi8vZG9jcy5qcXVlcnkuY29tL1R1dG9yaWFsczpJbnRyb2R1Y2luZ18kKGRvY3VtZW50KS5yZWFkeSgpXHJcbiAgICAgICAgbG9nKCd0ZXJtaW5hdGluZzsgemVybyBlbGVtZW50cyBmb3VuZCBieSBzZWxlY3RvcicgKyAoJC5pc1JlYWR5ID8gJycgOiAnIChET00gbm90IHJlYWR5KScpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIG9wdGlvbnMuZGVsZWdhdGlvbiApIHtcclxuICAgICAgICAkKGRvY3VtZW50KVxyXG4gICAgICAgICAgICAub2ZmKCdzdWJtaXQuZm9ybS1wbHVnaW4nLCB0aGlzLnNlbGVjdG9yLCBkb0FqYXhTdWJtaXQpXHJcbiAgICAgICAgICAgIC5vZmYoJ2NsaWNrLmZvcm0tcGx1Z2luJywgdGhpcy5zZWxlY3RvciwgY2FwdHVyZVN1Ym1pdHRpbmdFbGVtZW50KVxyXG4gICAgICAgICAgICAub24oJ3N1Ym1pdC5mb3JtLXBsdWdpbicsIHRoaXMuc2VsZWN0b3IsIG9wdGlvbnMsIGRvQWpheFN1Ym1pdClcclxuICAgICAgICAgICAgLm9uKCdjbGljay5mb3JtLXBsdWdpbicsIHRoaXMuc2VsZWN0b3IsIG9wdGlvbnMsIGNhcHR1cmVTdWJtaXR0aW5nRWxlbWVudCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuYWpheEZvcm1VbmJpbmQoKVxyXG4gICAgICAgIC5iaW5kKCdzdWJtaXQuZm9ybS1wbHVnaW4nLCBvcHRpb25zLCBkb0FqYXhTdWJtaXQpXHJcbiAgICAgICAgLmJpbmQoJ2NsaWNrLmZvcm0tcGx1Z2luJywgb3B0aW9ucywgY2FwdHVyZVN1Ym1pdHRpbmdFbGVtZW50KTtcclxufTtcclxuXHJcbi8vIHByaXZhdGUgZXZlbnQgaGFuZGxlcnNcclxuZnVuY3Rpb24gZG9BamF4U3VibWl0KGUpIHtcclxuICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXHJcbiAgICB2YXIgb3B0aW9ucyA9IGUuZGF0YTtcclxuICAgIGlmICghZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgeyAvLyBpZiBldmVudCBoYXMgYmVlbiBjYW5jZWxlZCwgZG9uJ3QgcHJvY2VlZFxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKGUudGFyZ2V0KS5hamF4U3VibWl0KG9wdGlvbnMpOyAvLyAjMzY1XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhcHR1cmVTdWJtaXR0aW5nRWxlbWVudChlKSB7XHJcbiAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xyXG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG4gICAgdmFyICRlbCA9ICQodGFyZ2V0KTtcclxuICAgIGlmICghKCRlbC5pcyhcIlt0eXBlPXN1Ym1pdF0sW3R5cGU9aW1hZ2VdXCIpKSkge1xyXG4gICAgICAgIC8vIGlzIHRoaXMgYSBjaGlsZCBlbGVtZW50IG9mIHRoZSBzdWJtaXQgZWw/ICAoZXg6IGEgc3BhbiB3aXRoaW4gYSBidXR0b24pXHJcbiAgICAgICAgdmFyIHQgPSAkZWwuY2xvc2VzdCgnW3R5cGU9c3VibWl0XScpO1xyXG4gICAgICAgIGlmICh0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhcmdldCA9IHRbMF07XHJcbiAgICB9XHJcbiAgICB2YXIgZm9ybSA9IHRoaXM7XHJcbiAgICBmb3JtLmNsayA9IHRhcmdldDtcclxuICAgIGlmICh0YXJnZXQudHlwZSA9PSAnaW1hZ2UnKSB7XHJcbiAgICAgICAgaWYgKGUub2Zmc2V0WCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGZvcm0uY2xrX3ggPSBlLm9mZnNldFg7XHJcbiAgICAgICAgICAgIGZvcm0uY2xrX3kgPSBlLm9mZnNldFk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgJC5mbi5vZmZzZXQgPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gJGVsLm9mZnNldCgpO1xyXG4gICAgICAgICAgICBmb3JtLmNsa194ID0gZS5wYWdlWCAtIG9mZnNldC5sZWZ0O1xyXG4gICAgICAgICAgICBmb3JtLmNsa195ID0gZS5wYWdlWSAtIG9mZnNldC50b3A7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9ybS5jbGtfeCA9IGUucGFnZVggLSB0YXJnZXQub2Zmc2V0TGVmdDtcclxuICAgICAgICAgICAgZm9ybS5jbGtfeSA9IGUucGFnZVkgLSB0YXJnZXQub2Zmc2V0VG9wO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGNsZWFyIGZvcm0gdmFyc1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgZm9ybS5jbGsgPSBmb3JtLmNsa194ID0gZm9ybS5jbGtfeSA9IG51bGw7IH0sIDEwMCk7XHJcbn1cclxuXHJcblxyXG4vLyBhamF4Rm9ybVVuYmluZCB1bmJpbmRzIHRoZSBldmVudCBoYW5kbGVycyB0aGF0IHdlcmUgYm91bmQgYnkgYWpheEZvcm1cclxuJC5mbi5hamF4Rm9ybVVuYmluZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudW5iaW5kKCdzdWJtaXQuZm9ybS1wbHVnaW4gY2xpY2suZm9ybS1wbHVnaW4nKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBmb3JtVG9BcnJheSgpIGdhdGhlcnMgZm9ybSBlbGVtZW50IGRhdGEgaW50byBhbiBhcnJheSBvZiBvYmplY3RzIHRoYXQgY2FuXHJcbiAqIGJlIHBhc3NlZCB0byBhbnkgb2YgdGhlIGZvbGxvd2luZyBhamF4IGZ1bmN0aW9uczogJC5nZXQsICQucG9zdCwgb3IgbG9hZC5cclxuICogRWFjaCBvYmplY3QgaW4gdGhlIGFycmF5IGhhcyBib3RoIGEgJ25hbWUnIGFuZCAndmFsdWUnIHByb3BlcnR5LiAgQW4gZXhhbXBsZSBvZlxyXG4gKiBhbiBhcnJheSBmb3IgYSBzaW1wbGUgbG9naW4gZm9ybSBtaWdodCBiZTpcclxuICpcclxuICogWyB7IG5hbWU6ICd1c2VybmFtZScsIHZhbHVlOiAnanJlc2lnJyB9LCB7IG5hbWU6ICdwYXNzd29yZCcsIHZhbHVlOiAnc2VjcmV0JyB9IF1cclxuICpcclxuICogSXQgaXMgdGhpcyBhcnJheSB0aGF0IGlzIHBhc3NlZCB0byBwcmUtc3VibWl0IGNhbGxiYWNrIGZ1bmN0aW9ucyBwcm92aWRlZCB0byB0aGVcclxuICogYWpheFN1Ym1pdCgpIGFuZCBhamF4Rm9ybSgpIG1ldGhvZHMuXHJcbiAqL1xyXG4kLmZuLmZvcm1Ub0FycmF5ID0gZnVuY3Rpb24oc2VtYW50aWMsIGVsZW1lbnRzKSB7XHJcbiAgICB2YXIgYSA9IFtdO1xyXG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGZvcm0gPSB0aGlzWzBdO1xyXG4gICAgdmFyIGVscyA9IHNlbWFudGljID8gZm9ybS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpIDogZm9ybS5lbGVtZW50cztcclxuICAgIGlmICghZWxzKSB7XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGksaixuLHYsZWwsbWF4LGptYXg7XHJcbiAgICBmb3IoaT0wLCBtYXg9ZWxzLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XHJcbiAgICAgICAgZWwgPSBlbHNbaV07XHJcbiAgICAgICAgbiA9IGVsLm5hbWU7XHJcbiAgICAgICAgaWYgKCFuIHx8IGVsLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlbWFudGljICYmIGZvcm0uY2xrICYmIGVsLnR5cGUgPT0gXCJpbWFnZVwiKSB7XHJcbiAgICAgICAgICAgIC8vIGhhbmRsZSBpbWFnZSBpbnB1dHMgb24gdGhlIGZseSB3aGVuIHNlbWFudGljID09IHRydWVcclxuICAgICAgICAgICAgaWYoZm9ybS5jbGsgPT0gZWwpIHtcclxuICAgICAgICAgICAgICAgIGEucHVzaCh7bmFtZTogbiwgdmFsdWU6ICQoZWwpLnZhbCgpLCB0eXBlOiBlbC50eXBlIH0pO1xyXG4gICAgICAgICAgICAgICAgYS5wdXNoKHtuYW1lOiBuKycueCcsIHZhbHVlOiBmb3JtLmNsa194fSwge25hbWU6IG4rJy55JywgdmFsdWU6IGZvcm0uY2xrX3l9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHYgPSAkLmZpZWxkVmFsdWUoZWwsIHRydWUpO1xyXG4gICAgICAgIGlmICh2ICYmIHYuY29uc3RydWN0b3IgPT0gQXJyYXkpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRzKVxyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChlbCk7XHJcbiAgICAgICAgICAgIGZvcihqPTAsIGptYXg9di5sZW5ndGg7IGogPCBqbWF4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGEucHVzaCh7bmFtZTogbiwgdmFsdWU6IHZbal19KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChmZWF0dXJlLmZpbGVhcGkgJiYgZWwudHlwZSA9PSAnZmlsZScpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRzKVxyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChlbCk7XHJcbiAgICAgICAgICAgIHZhciBmaWxlcyA9IGVsLmZpbGVzO1xyXG4gICAgICAgICAgICBpZiAoZmlsZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGo9MDsgaiA8IGZpbGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYS5wdXNoKHtuYW1lOiBuLCB2YWx1ZTogZmlsZXNbal0sIHR5cGU6IGVsLnR5cGV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICMxODBcclxuICAgICAgICAgICAgICAgIGEucHVzaCh7IG5hbWU6IG4sIHZhbHVlOiAnJywgdHlwZTogZWwudHlwZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh2ICE9PSBudWxsICYmIHR5cGVvZiB2ICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50cylcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZWwpO1xyXG4gICAgICAgICAgICBhLnB1c2goe25hbWU6IG4sIHZhbHVlOiB2LCB0eXBlOiBlbC50eXBlLCByZXF1aXJlZDogZWwucmVxdWlyZWR9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzZW1hbnRpYyAmJiBmb3JtLmNsaykge1xyXG4gICAgICAgIC8vIGlucHV0IHR5cGU9PSdpbWFnZScgYXJlIG5vdCBmb3VuZCBpbiBlbGVtZW50cyBhcnJheSEgaGFuZGxlIGl0IGhlcmVcclxuICAgICAgICB2YXIgJGlucHV0ID0gJChmb3JtLmNsayksIGlucHV0ID0gJGlucHV0WzBdO1xyXG4gICAgICAgIG4gPSBpbnB1dC5uYW1lO1xyXG4gICAgICAgIGlmIChuICYmICFpbnB1dC5kaXNhYmxlZCAmJiBpbnB1dC50eXBlID09ICdpbWFnZScpIHtcclxuICAgICAgICAgICAgYS5wdXNoKHtuYW1lOiBuLCB2YWx1ZTogJGlucHV0LnZhbCgpfSk7XHJcbiAgICAgICAgICAgIGEucHVzaCh7bmFtZTogbisnLngnLCB2YWx1ZTogZm9ybS5jbGtfeH0sIHtuYW1lOiBuKycueScsIHZhbHVlOiBmb3JtLmNsa195fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGE7XHJcbn07XHJcblxyXG4vKipcclxuICogU2VyaWFsaXplcyBmb3JtIGRhdGEgaW50byBhICdzdWJtaXR0YWJsZScgc3RyaW5nLiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBhIHN0cmluZ1xyXG4gKiBpbiB0aGUgZm9ybWF0OiBuYW1lMT12YWx1ZTEmYW1wO25hbWUyPXZhbHVlMlxyXG4gKi9cclxuJC5mbi5mb3JtU2VyaWFsaXplID0gZnVuY3Rpb24oc2VtYW50aWMpIHtcclxuICAgIC8vaGFuZCBvZmYgdG8galF1ZXJ5LnBhcmFtIGZvciBwcm9wZXIgZW5jb2RpbmdcclxuICAgIHJldHVybiAkLnBhcmFtKHRoaXMuZm9ybVRvQXJyYXkoc2VtYW50aWMpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXJpYWxpemVzIGFsbCBmaWVsZCBlbGVtZW50cyBpbiB0aGUgalF1ZXJ5IG9iamVjdCBpbnRvIGEgcXVlcnkgc3RyaW5nLlxyXG4gKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBhIHN0cmluZyBpbiB0aGUgZm9ybWF0OiBuYW1lMT12YWx1ZTEmYW1wO25hbWUyPXZhbHVlMlxyXG4gKi9cclxuJC5mbi5maWVsZFNlcmlhbGl6ZSA9IGZ1bmN0aW9uKHN1Y2Nlc3NmdWwpIHtcclxuICAgIHZhciBhID0gW107XHJcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIG4gPSB0aGlzLm5hbWU7XHJcbiAgICAgICAgaWYgKCFuKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHYgPSAkLmZpZWxkVmFsdWUodGhpcywgc3VjY2Vzc2Z1bCk7XHJcbiAgICAgICAgaWYgKHYgJiYgdi5jb25zdHJ1Y3RvciA9PSBBcnJheSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpPTAsbWF4PXYubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGEucHVzaCh7bmFtZTogbiwgdmFsdWU6IHZbaV19KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh2ICE9PSBudWxsICYmIHR5cGVvZiB2ICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGEucHVzaCh7bmFtZTogdGhpcy5uYW1lLCB2YWx1ZTogdn0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy9oYW5kIG9mZiB0byBqUXVlcnkucGFyYW0gZm9yIHByb3BlciBlbmNvZGluZ1xyXG4gICAgcmV0dXJuICQucGFyYW0oYSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgdmFsdWUocykgb2YgdGhlIGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgc2V0LiAgRm9yIGV4YW1wbGUsIGNvbnNpZGVyIHRoZSBmb2xsb3dpbmcgZm9ybTpcclxuICpcclxuICogIDxmb3JtPjxmaWVsZHNldD5cclxuICogICAgICA8aW5wdXQgbmFtZT1cIkFcIiB0eXBlPVwidGV4dFwiIC8+XHJcbiAqICAgICAgPGlucHV0IG5hbWU9XCJBXCIgdHlwZT1cInRleHRcIiAvPlxyXG4gKiAgICAgIDxpbnB1dCBuYW1lPVwiQlwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiQjFcIiAvPlxyXG4gKiAgICAgIDxpbnB1dCBuYW1lPVwiQlwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiQjJcIi8+XHJcbiAqICAgICAgPGlucHV0IG5hbWU9XCJDXCIgdHlwZT1cInJhZGlvXCIgdmFsdWU9XCJDMVwiIC8+XHJcbiAqICAgICAgPGlucHV0IG5hbWU9XCJDXCIgdHlwZT1cInJhZGlvXCIgdmFsdWU9XCJDMlwiIC8+XHJcbiAqICA8L2ZpZWxkc2V0PjwvZm9ybT5cclxuICpcclxuICogIHZhciB2ID0gJCgnaW5wdXRbdHlwZT10ZXh0XScpLmZpZWxkVmFsdWUoKTtcclxuICogIC8vIGlmIG5vIHZhbHVlcyBhcmUgZW50ZXJlZCBpbnRvIHRoZSB0ZXh0IGlucHV0c1xyXG4gKiAgdiA9PSBbJycsJyddXHJcbiAqICAvLyBpZiB2YWx1ZXMgZW50ZXJlZCBpbnRvIHRoZSB0ZXh0IGlucHV0cyBhcmUgJ2ZvbycgYW5kICdiYXInXHJcbiAqICB2ID09IFsnZm9vJywnYmFyJ11cclxuICpcclxuICogIHZhciB2ID0gJCgnaW5wdXRbdHlwZT1jaGVja2JveF0nKS5maWVsZFZhbHVlKCk7XHJcbiAqICAvLyBpZiBuZWl0aGVyIGNoZWNrYm94IGlzIGNoZWNrZWRcclxuICogIHYgPT09IHVuZGVmaW5lZFxyXG4gKiAgLy8gaWYgYm90aCBjaGVja2JveGVzIGFyZSBjaGVja2VkXHJcbiAqICB2ID09IFsnQjEnLCAnQjInXVxyXG4gKlxyXG4gKiAgdmFyIHYgPSAkKCdpbnB1dFt0eXBlPXJhZGlvXScpLmZpZWxkVmFsdWUoKTtcclxuICogIC8vIGlmIG5laXRoZXIgcmFkaW8gaXMgY2hlY2tlZFxyXG4gKiAgdiA9PT0gdW5kZWZpbmVkXHJcbiAqICAvLyBpZiBmaXJzdCByYWRpbyBpcyBjaGVja2VkXHJcbiAqICB2ID09IFsnQzEnXVxyXG4gKlxyXG4gKiBUaGUgc3VjY2Vzc2Z1bCBhcmd1bWVudCBjb250cm9scyB3aGV0aGVyIG9yIG5vdCB0aGUgZmllbGQgZWxlbWVudCBtdXN0IGJlICdzdWNjZXNzZnVsJ1xyXG4gKiAocGVyIGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw0L2ludGVyYWN0L2Zvcm1zLmh0bWwjc3VjY2Vzc2Z1bC1jb250cm9scykuXHJcbiAqIFRoZSBkZWZhdWx0IHZhbHVlIG9mIHRoZSBzdWNjZXNzZnVsIGFyZ3VtZW50IGlzIHRydWUuICBJZiB0aGlzIHZhbHVlIGlzIGZhbHNlIHRoZSB2YWx1ZShzKVxyXG4gKiBmb3IgZWFjaCBlbGVtZW50IGlzIHJldHVybmVkLlxyXG4gKlxyXG4gKiBOb3RlOiBUaGlzIG1ldGhvZCAqYWx3YXlzKiByZXR1cm5zIGFuIGFycmF5LiAgSWYgbm8gdmFsaWQgdmFsdWUgY2FuIGJlIGRldGVybWluZWQgdGhlXHJcbiAqICAgIGFycmF5IHdpbGwgYmUgZW1wdHksIG90aGVyd2lzZSBpdCB3aWxsIGNvbnRhaW4gb25lIG9yIG1vcmUgdmFsdWVzLlxyXG4gKi9cclxuJC5mbi5maWVsZFZhbHVlID0gZnVuY3Rpb24oc3VjY2Vzc2Z1bCkge1xyXG4gICAgZm9yICh2YXIgdmFsPVtdLCBpPTAsIG1heD10aGlzLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGVsID0gdGhpc1tpXTtcclxuICAgICAgICB2YXIgdiA9ICQuZmllbGRWYWx1ZShlbCwgc3VjY2Vzc2Z1bCk7XHJcbiAgICAgICAgaWYgKHYgPT09IG51bGwgfHwgdHlwZW9mIHYgPT0gJ3VuZGVmaW5lZCcgfHwgKHYuY29uc3RydWN0b3IgPT0gQXJyYXkgJiYgIXYubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHYuY29uc3RydWN0b3IgPT0gQXJyYXkpXHJcbiAgICAgICAgICAgICQubWVyZ2UodmFsLCB2KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHZhbC5wdXNoKHYpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZmllbGQgZWxlbWVudC5cclxuICovXHJcbiQuZmllbGRWYWx1ZSA9IGZ1bmN0aW9uKGVsLCBzdWNjZXNzZnVsKSB7XHJcbiAgICB2YXIgbiA9IGVsLm5hbWUsIHQgPSBlbC50eXBlLCB0YWcgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAoc3VjY2Vzc2Z1bCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3VjY2Vzc2Z1bCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN1Y2Nlc3NmdWwgJiYgKCFuIHx8IGVsLmRpc2FibGVkIHx8IHQgPT0gJ3Jlc2V0JyB8fCB0ID09ICdidXR0b24nIHx8XHJcbiAgICAgICAgKHQgPT0gJ2NoZWNrYm94JyB8fCB0ID09ICdyYWRpbycpICYmICFlbC5jaGVja2VkIHx8XHJcbiAgICAgICAgKHQgPT0gJ3N1Ym1pdCcgfHwgdCA9PSAnaW1hZ2UnKSAmJiBlbC5mb3JtICYmIGVsLmZvcm0uY2xrICE9IGVsIHx8XHJcbiAgICAgICAgdGFnID09ICdzZWxlY3QnICYmIGVsLnNlbGVjdGVkSW5kZXggPT0gLTEpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0YWcgPT0gJ3NlbGVjdCcpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSBlbC5zZWxlY3RlZEluZGV4O1xyXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBhID0gW10sIG9wcyA9IGVsLm9wdGlvbnM7XHJcbiAgICAgICAgdmFyIG9uZSA9ICh0ID09ICdzZWxlY3Qtb25lJyk7XHJcbiAgICAgICAgdmFyIG1heCA9IChvbmUgPyBpbmRleCsxIDogb3BzLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yKHZhciBpPShvbmUgPyBpbmRleCA6IDApOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG9wID0gb3BzW2ldO1xyXG4gICAgICAgICAgICBpZiAob3Auc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2ID0gb3AudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXYpIHsgLy8gZXh0cmEgcGFpbiBmb3IgSUUuLi5cclxuICAgICAgICAgICAgICAgICAgICB2ID0gKG9wLmF0dHJpYnV0ZXMgJiYgb3AuYXR0cmlidXRlc1sndmFsdWUnXSAmJiAhKG9wLmF0dHJpYnV0ZXNbJ3ZhbHVlJ10uc3BlY2lmaWVkKSkgPyBvcC50ZXh0IDogb3AudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhLnB1c2godik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJChlbCkudmFsKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2xlYXJzIHRoZSBmb3JtIGRhdGEuICBUYWtlcyB0aGUgZm9sbG93aW5nIGFjdGlvbnMgb24gdGhlIGZvcm0ncyBpbnB1dCBmaWVsZHM6XHJcbiAqICAtIGlucHV0IHRleHQgZmllbGRzIHdpbGwgaGF2ZSB0aGVpciAndmFsdWUnIHByb3BlcnR5IHNldCB0byB0aGUgZW1wdHkgc3RyaW5nXHJcbiAqICAtIHNlbGVjdCBlbGVtZW50cyB3aWxsIGhhdmUgdGhlaXIgJ3NlbGVjdGVkSW5kZXgnIHByb3BlcnR5IHNldCB0byAtMVxyXG4gKiAgLSBjaGVja2JveCBhbmQgcmFkaW8gaW5wdXRzIHdpbGwgaGF2ZSB0aGVpciAnY2hlY2tlZCcgcHJvcGVydHkgc2V0IHRvIGZhbHNlXHJcbiAqICAtIGlucHV0cyBvZiB0eXBlIHN1Ym1pdCwgYnV0dG9uLCByZXNldCwgYW5kIGhpZGRlbiB3aWxsICpub3QqIGJlIGVmZmVjdGVkXHJcbiAqICAtIGJ1dHRvbiBlbGVtZW50cyB3aWxsICpub3QqIGJlIGVmZmVjdGVkXHJcbiAqL1xyXG4kLmZuLmNsZWFyRm9ybSA9IGZ1bmN0aW9uKGluY2x1ZGVIaWRkZW4pIHtcclxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnaW5wdXQsc2VsZWN0LHRleHRhcmVhJywgdGhpcykuY2xlYXJGaWVsZHMoaW5jbHVkZUhpZGRlbik7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDbGVhcnMgdGhlIHNlbGVjdGVkIGZvcm0gZWxlbWVudHMuXHJcbiAqL1xyXG4kLmZuLmNsZWFyRmllbGRzID0gJC5mbi5jbGVhcklucHV0cyA9IGZ1bmN0aW9uKGluY2x1ZGVIaWRkZW4pIHtcclxuICAgIHZhciByZSA9IC9eKD86Y29sb3J8ZGF0ZXxkYXRldGltZXxlbWFpbHxtb250aHxudW1iZXJ8cGFzc3dvcmR8cmFuZ2V8c2VhcmNofHRlbHx0ZXh0fHRpbWV8dXJsfHdlZWspJC9pOyAvLyAnaGlkZGVuJyBpcyBub3QgaW4gdGhpcyBsaXN0XHJcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0ID0gdGhpcy50eXBlLCB0YWcgPSB0aGlzLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAocmUudGVzdCh0KSB8fCB0YWcgPT0gJ3RleHRhcmVhJykge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHQgPT0gJ2NoZWNrYm94JyB8fCB0ID09ICdyYWRpbycpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRhZyA9PSAnc2VsZWN0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICB9XHJcblx0XHRlbHNlIGlmICh0ID09IFwiZmlsZVwiKSB7XHJcblx0XHRcdGlmICgvTVNJRS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xyXG5cdFx0XHRcdCQodGhpcykucmVwbGFjZVdpdGgoJCh0aGlzKS5jbG9uZSh0cnVlKSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzKS52YWwoJycpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5jbHVkZUhpZGRlbikge1xyXG4gICAgICAgICAgICAvLyBpbmNsdWRlSGlkZGVuIGNhbiBiZSB0aGUgdmFsdWUgdHJ1ZSwgb3IgaXQgY2FuIGJlIGEgc2VsZWN0b3Igc3RyaW5nXHJcbiAgICAgICAgICAgIC8vIGluZGljYXRpbmcgYSBzcGVjaWFsIHRlc3Q7IGZvciBleGFtcGxlOlxyXG4gICAgICAgICAgICAvLyAgJCgnI215Rm9ybScpLmNsZWFyRm9ybSgnLnNwZWNpYWw6aGlkZGVuJylcclxuICAgICAgICAgICAgLy8gdGhlIGFib3ZlIHdvdWxkIGNsZWFuIGhpZGRlbiBpbnB1dHMgdGhhdCBoYXZlIHRoZSBjbGFzcyBvZiAnc3BlY2lhbCdcclxuICAgICAgICAgICAgaWYgKCAoaW5jbHVkZUhpZGRlbiA9PT0gdHJ1ZSAmJiAvaGlkZGVuLy50ZXN0KHQpKSB8fFxyXG4gICAgICAgICAgICAgICAgICh0eXBlb2YgaW5jbHVkZUhpZGRlbiA9PSAnc3RyaW5nJyAmJiAkKHRoaXMpLmlzKGluY2x1ZGVIaWRkZW4pKSApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVzZXRzIHRoZSBmb3JtIGRhdGEuICBDYXVzZXMgYWxsIGZvcm0gZWxlbWVudHMgdG8gYmUgcmVzZXQgdG8gdGhlaXIgb3JpZ2luYWwgdmFsdWUuXHJcbiAqL1xyXG4kLmZuLnJlc2V0Rm9ybSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBndWFyZCBhZ2FpbnN0IGFuIGlucHV0IHdpdGggdGhlIG5hbWUgb2YgJ3Jlc2V0J1xyXG4gICAgICAgIC8vIG5vdGUgdGhhdCBJRSByZXBvcnRzIHRoZSByZXNldCBmdW5jdGlvbiBhcyBhbiAnb2JqZWN0J1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5yZXNldCA9PSAnZnVuY3Rpb24nIHx8ICh0eXBlb2YgdGhpcy5yZXNldCA9PSAnb2JqZWN0JyAmJiAhdGhpcy5yZXNldC5ub2RlVHlwZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVuYWJsZXMgb3IgZGlzYWJsZXMgYW55IG1hdGNoaW5nIGVsZW1lbnRzLlxyXG4gKi9cclxuJC5mbi5lbmFibGUgPSBmdW5jdGlvbihiKSB7XHJcbiAgICBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgYiA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSAhYjtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrcy91bmNoZWNrcyBhbnkgbWF0Y2hpbmcgY2hlY2tib3hlcyBvciByYWRpbyBidXR0b25zIGFuZFxyXG4gKiBzZWxlY3RzL2Rlc2VsZWN0cyBhbmQgbWF0Y2hpbmcgb3B0aW9uIGVsZW1lbnRzLlxyXG4gKi9cclxuJC5mbi5zZWxlY3RlZCA9IGZ1bmN0aW9uKHNlbGVjdCkge1xyXG4gICAgaWYgKHNlbGVjdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc2VsZWN0ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHQgPSB0aGlzLnR5cGU7XHJcbiAgICAgICAgaWYgKHQgPT0gJ2NoZWNrYm94JyB8fCB0ID09ICdyYWRpbycpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gc2VsZWN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSAnb3B0aW9uJykge1xyXG4gICAgICAgICAgICB2YXIgJHNlbCA9ICQodGhpcykucGFyZW50KCdzZWxlY3QnKTtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdCAmJiAkc2VsWzBdICYmICRzZWxbMF0udHlwZSA9PSAnc2VsZWN0LW9uZScpIHtcclxuICAgICAgICAgICAgICAgIC8vIGRlc2VsZWN0IGFsbCBvdGhlciBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICAkc2VsLmZpbmQoJ29wdGlvbicpLnNlbGVjdGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy8gZXhwb3NlIGRlYnVnIHZhclxyXG4kLmZuLmFqYXhTdWJtaXQuZGVidWcgPSBmYWxzZTtcclxuXHJcbi8vIGhlbHBlciBmbiBmb3IgY29uc29sZSBsb2dnaW5nXHJcbmZ1bmN0aW9uIGxvZygpIHtcclxuICAgIGlmICghJC5mbi5hamF4U3VibWl0LmRlYnVnKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIHZhciBtc2cgPSAnW2pxdWVyeS5mb3JtXSAnICsgQXJyYXkucHJvdG90eXBlLmpvaW4uY2FsbChhcmd1bWVudHMsJycpO1xyXG4gICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLmxvZykge1xyXG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAod2luZG93Lm9wZXJhICYmIHdpbmRvdy5vcGVyYS5wb3N0RXJyb3IpIHtcclxuICAgICAgICB3aW5kb3cub3BlcmEucG9zdEVycm9yKG1zZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbn0pKTtcclxuXHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L2xpYi9qcXVlcnktZm9ybS9qcXVlcnkuZm9ybS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDJcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9