webpackJsonp([2],{

/***/ 8:
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
	


/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery Validation Plugin v1.15.0
	 *
	 * http://jqueryvalidation.org/
	 *
	 * Copyright (c) 2016 Jörn Zaefferer
	 * Released under the MIT license
	 */
	(function( factory ) {
		if ( true ) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module === "object" && module.exports) {
			module.exports = factory( require( "jquery" ) );
		} else {
			factory( jQuery );
		}
	}(function( $ ) {
	
	$.extend( $.fn, {
	
		// http://jqueryvalidation.org/validate/
		validate: function( options ) {
	
			// If nothing is selected, return nothing; can't chain anyway
			if ( !this.length ) {
				if ( options && options.debug && window.console ) {
					console.warn( "Nothing selected, can't validate, returning nothing." );
				}
				return;
			}
	
			// Check if a validator for this form was already created
			var validator = $.data( this[ 0 ], "validator" );
			if ( validator ) {
				return validator;
			}
	
			// Add novalidate tag if HTML5.
			this.attr( "novalidate", "novalidate" );
	
			validator = new $.validator( options, this[ 0 ] );
			$.data( this[ 0 ], "validator", validator );
	
			if ( validator.settings.onsubmit ) {
	
				this.on( "click.validate", ":submit", function( event ) {
					if ( validator.settings.submitHandler ) {
						validator.submitButton = event.target;
					}
	
					// Allow suppressing validation by adding a cancel class to the submit button
					if ( $( this ).hasClass( "cancel" ) ) {
						validator.cancelSubmit = true;
					}
	
					// Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
					if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
						validator.cancelSubmit = true;
					}
				} );
	
				// Validate the form on submit
				this.on( "submit.validate", function( event ) {
					if ( validator.settings.debug ) {
	
						// Prevent form submit to be able to see console output
						event.preventDefault();
					}
					function handle() {
						var hidden, result;
						if ( validator.settings.submitHandler ) {
							if ( validator.submitButton ) {
	
								// Insert a hidden input as a replacement for the missing submit button
								hidden = $( "<input type='hidden'/>" )
									.attr( "name", validator.submitButton.name )
									.val( $( validator.submitButton ).val() )
									.appendTo( validator.currentForm );
							}
							result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
							if ( validator.submitButton ) {
	
								// And clean up afterwards; thanks to no-block-scope, hidden can be referenced
								hidden.remove();
							}
							if ( result !== undefined ) {
								return result;
							}
							return false;
						}
						return true;
					}
	
					// Prevent submit for invalid forms or custom submit handlers
					if ( validator.cancelSubmit ) {
						validator.cancelSubmit = false;
						return handle();
					}
					if ( validator.form() ) {
						if ( validator.pendingRequest ) {
							validator.formSubmitted = true;
							return false;
						}
						return handle();
					} else {
						validator.focusInvalid();
						return false;
					}
				} );
			}
	
			return validator;
		},
	
		// http://jqueryvalidation.org/valid/
		valid: function() {
			var valid, validator, errorList;
	
			if ( $( this[ 0 ] ).is( "form" ) ) {
				valid = this.validate().form();
			} else {
				errorList = [];
				valid = true;
				validator = $( this[ 0 ].form ).validate();
				this.each( function() {
					valid = validator.element( this ) && valid;
					if ( !valid ) {
						errorList = errorList.concat( validator.errorList );
					}
				} );
				validator.errorList = errorList;
			}
			return valid;
		},
	
		// http://jqueryvalidation.org/rules/
		rules: function( command, argument ) {
	
			// If nothing is selected, return nothing; can't chain anyway
			if ( !this.length ) {
				return;
			}
	
			var element = this[ 0 ],
				settings, staticRules, existingRules, data, param, filtered;
	
			if ( command ) {
				settings = $.data( element.form, "validator" ).settings;
				staticRules = settings.rules;
				existingRules = $.validator.staticRules( element );
				switch ( command ) {
				case "add":
					$.extend( existingRules, $.validator.normalizeRule( argument ) );
	
					// Remove messages from rules, but allow them to be set separately
					delete existingRules.messages;
					staticRules[ element.name ] = existingRules;
					if ( argument.messages ) {
						settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
					}
					break;
				case "remove":
					if ( !argument ) {
						delete staticRules[ element.name ];
						return existingRules;
					}
					filtered = {};
					$.each( argument.split( /\s/ ), function( index, method ) {
						filtered[ method ] = existingRules[ method ];
						delete existingRules[ method ];
						if ( method === "required" ) {
							$( element ).removeAttr( "aria-required" );
						}
					} );
					return filtered;
				}
			}
	
			data = $.validator.normalizeRules(
			$.extend(
				{},
				$.validator.classRules( element ),
				$.validator.attributeRules( element ),
				$.validator.dataRules( element ),
				$.validator.staticRules( element )
			), element );
	
			// Make sure required is at front
			if ( data.required ) {
				param = data.required;
				delete data.required;
				data = $.extend( { required: param }, data );
				$( element ).attr( "aria-required", "true" );
			}
	
			// Make sure remote is at back
			if ( data.remote ) {
				param = data.remote;
				delete data.remote;
				data = $.extend( data, { remote: param } );
			}
	
			return data;
		}
	} );
	
	// Custom selectors
	$.extend( $.expr[ ":" ], {
	
		// http://jqueryvalidation.org/blank-selector/
		blank: function( a ) {
			return !$.trim( "" + $( a ).val() );
		},
	
		// http://jqueryvalidation.org/filled-selector/
		filled: function( a ) {
			var val = $( a ).val();
			return val !== null && !!$.trim( "" + val );
		},
	
		// http://jqueryvalidation.org/unchecked-selector/
		unchecked: function( a ) {
			return !$( a ).prop( "checked" );
		}
	} );
	
	// Constructor for validator
	$.validator = function( options, form ) {
		this.settings = $.extend( true, {}, $.validator.defaults, options );
		this.currentForm = form;
		this.init();
	};
	
	// http://jqueryvalidation.org/jQuery.validator.format/
	$.validator.format = function( source, params ) {
		if ( arguments.length === 1 ) {
			return function() {
				var args = $.makeArray( arguments );
				args.unshift( source );
				return $.validator.format.apply( this, args );
			};
		}
		if ( params === undefined ) {
			return source;
		}
		if ( arguments.length > 2 && params.constructor !== Array  ) {
			params = $.makeArray( arguments ).slice( 1 );
		}
		if ( params.constructor !== Array ) {
			params = [ params ];
		}
		$.each( params, function( i, n ) {
			source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
				return n;
			} );
		} );
		return source;
	};
	
	$.extend( $.validator, {
	
		defaults: {
			messages: {},
			groups: {},
			rules: {},
			errorClass: "error",
			pendingClass: "pending",
			validClass: "valid",
			errorElement: "label",
			focusCleanup: false,
			focusInvalid: true,
			errorContainer: $( [] ),
			errorLabelContainer: $( [] ),
			onsubmit: true,
			ignore: ":hidden",
			ignoreTitle: false,
			onfocusin: function( element ) {
				this.lastActive = element;
	
				// Hide error label and remove error class on focus if enabled
				if ( this.settings.focusCleanup ) {
					if ( this.settings.unhighlight ) {
						this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
					}
					this.hideThese( this.errorsFor( element ) );
				}
			},
			onfocusout: function( element ) {
				if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
					this.element( element );
				}
			},
			onkeyup: function( element, event ) {
	
				// Avoid revalidate the field when pressing one of the following keys
				// Shift       => 16
				// Ctrl        => 17
				// Alt         => 18
				// Caps lock   => 20
				// End         => 35
				// Home        => 36
				// Left arrow  => 37
				// Up arrow    => 38
				// Right arrow => 39
				// Down arrow  => 40
				// Insert      => 45
				// Num lock    => 144
				// AltGr key   => 225
				var excludedKeys = [
					16, 17, 18, 20, 35, 36, 37,
					38, 39, 40, 45, 144, 225
				];
	
				if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
					return;
				} else if ( element.name in this.submitted || element.name in this.invalid ) {
					this.element( element );
				}
			},
			onclick: function( element ) {
	
				// Click on selects, radiobuttons and checkboxes
				if ( element.name in this.submitted ) {
					this.element( element );
	
				// Or option elements, check parent select in that case
				} else if ( element.parentNode.name in this.submitted ) {
					this.element( element.parentNode );
				}
			},
			highlight: function( element, errorClass, validClass ) {
				if ( element.type === "radio" ) {
					this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
				} else {
					$( element ).addClass( errorClass ).removeClass( validClass );
				}
			},
			unhighlight: function( element, errorClass, validClass ) {
				if ( element.type === "radio" ) {
					this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
				} else {
					$( element ).removeClass( errorClass ).addClass( validClass );
				}
			}
		},
	
		// http://jqueryvalidation.org/jQuery.validator.setDefaults/
		setDefaults: function( settings ) {
			$.extend( $.validator.defaults, settings );
		},
	
		messages: {
			required: "This field is required.",
			remote: "Please fix this field.",
			email: "Please enter a valid email address.",
			url: "Please enter a valid URL.",
			date: "Please enter a valid date.",
			dateISO: "Please enter a valid date ( ISO ).",
			number: "Please enter a valid number.",
			digits: "Please enter only digits.",
			equalTo: "Please enter the same value again.",
			maxlength: $.validator.format( "Please enter no more than {0} characters." ),
			minlength: $.validator.format( "Please enter at least {0} characters." ),
			rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
			range: $.validator.format( "Please enter a value between {0} and {1}." ),
			max: $.validator.format( "Please enter a value less than or equal to {0}." ),
			min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
			step: $.validator.format( "Please enter a multiple of {0}." )
		},
	
		autoCreateRanges: false,
	
		prototype: {
	
			init: function() {
				this.labelContainer = $( this.settings.errorLabelContainer );
				this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
				this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
				this.submitted = {};
				this.valueCache = {};
				this.pendingRequest = 0;
				this.pending = {};
				this.invalid = {};
				this.reset();
	
				var groups = ( this.groups = {} ),
					rules;
				$.each( this.settings.groups, function( key, value ) {
					if ( typeof value === "string" ) {
						value = value.split( /\s/ );
					}
					$.each( value, function( index, name ) {
						groups[ name ] = key;
					} );
				} );
				rules = this.settings.rules;
				$.each( rules, function( key, value ) {
					rules[ key ] = $.validator.normalizeRule( value );
				} );
	
				function delegate( event ) {
					var validator = $.data( this.form, "validator" ),
						eventType = "on" + event.type.replace( /^validate/, "" ),
						settings = validator.settings;
					if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
						settings[ eventType ].call( validator, this, event );
					}
				}
	
				$( this.currentForm )
					.on( "focusin.validate focusout.validate keyup.validate",
						":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
						"[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
						"[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
						"[type='radio'], [type='checkbox'], [contenteditable]", delegate )
	
					// Support: Chrome, oldIE
					// "select" is provided as event.target when clicking a option
					.on( "click.validate", "select, option, [type='radio'], [type='checkbox']", delegate );
	
				if ( this.settings.invalidHandler ) {
					$( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
				}
	
				// Add aria-required to any Static/Data/Class required fields before first validation
				// Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
				$( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
			},
	
			// http://jqueryvalidation.org/Validator.form/
			form: function() {
				this.checkForm();
				$.extend( this.submitted, this.errorMap );
				this.invalid = $.extend( {}, this.errorMap );
				if ( !this.valid() ) {
					$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
				}
				this.showErrors();
				return this.valid();
			},
	
			checkForm: function() {
				this.prepareForm();
				for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
					this.check( elements[ i ] );
				}
				return this.valid();
			},
	
			// http://jqueryvalidation.org/Validator.element/
			element: function( element ) {
				var cleanElement = this.clean( element ),
					checkElement = this.validationTargetFor( cleanElement ),
					v = this,
					result = true,
					rs, group;
	
				if ( checkElement === undefined ) {
					delete this.invalid[ cleanElement.name ];
				} else {
					this.prepareElement( checkElement );
					this.currentElements = $( checkElement );
	
					// If this element is grouped, then validate all group elements already
					// containing a value
					group = this.groups[ checkElement.name ];
					if ( group ) {
						$.each( this.groups, function( name, testgroup ) {
							if ( testgroup === group && name !== checkElement.name ) {
								cleanElement = v.validationTargetFor( v.clean( v.findByName( name ) ) );
								if ( cleanElement && cleanElement.name in v.invalid ) {
									v.currentElements.push( cleanElement );
									result = result && v.check( cleanElement );
								}
							}
						} );
					}
	
					rs = this.check( checkElement ) !== false;
					result = result && rs;
					if ( rs ) {
						this.invalid[ checkElement.name ] = false;
					} else {
						this.invalid[ checkElement.name ] = true;
					}
	
					if ( !this.numberOfInvalids() ) {
	
						// Hide error containers on last error
						this.toHide = this.toHide.add( this.containers );
					}
					this.showErrors();
	
					// Add aria-invalid status for screen readers
					$( element ).attr( "aria-invalid", !rs );
				}
	
				return result;
			},
	
			// http://jqueryvalidation.org/Validator.showErrors/
			showErrors: function( errors ) {
				if ( errors ) {
					var validator = this;
	
					// Add items to error list and map
					$.extend( this.errorMap, errors );
					this.errorList = $.map( this.errorMap, function( message, name ) {
						return {
							message: message,
							element: validator.findByName( name )[ 0 ]
						};
					} );
	
					// Remove items from success list
					this.successList = $.grep( this.successList, function( element ) {
						return !( element.name in errors );
					} );
				}
				if ( this.settings.showErrors ) {
					this.settings.showErrors.call( this, this.errorMap, this.errorList );
				} else {
					this.defaultShowErrors();
				}
			},
	
			// http://jqueryvalidation.org/Validator.resetForm/
			resetForm: function() {
				if ( $.fn.resetForm ) {
					$( this.currentForm ).resetForm();
				}
				this.invalid = {};
				this.submitted = {};
				this.prepareForm();
				this.hideErrors();
				var elements = this.elements()
					.removeData( "previousValue" )
					.removeAttr( "aria-invalid" );
	
				this.resetElements( elements );
			},
	
			resetElements: function( elements ) {
				var i;
	
				if ( this.settings.unhighlight ) {
					for ( i = 0; elements[ i ]; i++ ) {
						this.settings.unhighlight.call( this, elements[ i ],
							this.settings.errorClass, "" );
						this.findByName( elements[ i ].name ).removeClass( this.settings.validClass );
					}
				} else {
					elements
						.removeClass( this.settings.errorClass )
						.removeClass( this.settings.validClass );
				}
			},
	
			numberOfInvalids: function() {
				return this.objectLength( this.invalid );
			},
	
			objectLength: function( obj ) {
				/* jshint unused: false */
				var count = 0,
					i;
				for ( i in obj ) {
					if ( obj[ i ] ) {
						count++;
					}
				}
				return count;
			},
	
			hideErrors: function() {
				this.hideThese( this.toHide );
			},
	
			hideThese: function( errors ) {
				errors.not( this.containers ).text( "" );
				this.addWrapper( errors ).hide();
			},
	
			valid: function() {
				return this.size() === 0;
			},
	
			size: function() {
				return this.errorList.length;
			},
	
			focusInvalid: function() {
				if ( this.settings.focusInvalid ) {
					try {
						$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [] )
						.filter( ":visible" )
						.focus()
	
						// Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
						.trigger( "focusin" );
					} catch ( e ) {
	
						// Ignore IE throwing errors when focusing hidden elements
					}
				}
			},
	
			findLastActive: function() {
				var lastActive = this.lastActive;
				return lastActive && $.grep( this.errorList, function( n ) {
					return n.element.name === lastActive.name;
				} ).length === 1 && lastActive;
			},
	
			elements: function() {
				var validator = this,
					rulesCache = {};
	
				// Select all valid inputs inside the form (no submit or reset buttons)
				return $( this.currentForm )
				.find( "input, select, textarea, [contenteditable]" )
				.not( ":submit, :reset, :image, :disabled" )
				.not( this.settings.ignore )
				.filter( function() {
					var name = this.name || $( this ).attr( "name" ); // For contenteditable
					if ( !name && validator.settings.debug && window.console ) {
						console.error( "%o has no name assigned", this );
					}
	
					// Set form expando on contenteditable
					if ( this.hasAttribute( "contenteditable" ) ) {
						this.form = $( this ).closest( "form" )[ 0 ];
					}
	
					// Select only the first element for each name, and only those with rules specified
					if ( name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
						return false;
					}
	
					rulesCache[ name ] = true;
					return true;
				} );
			},
	
			clean: function( selector ) {
				return $( selector )[ 0 ];
			},
	
			errors: function() {
				var errorClass = this.settings.errorClass.split( " " ).join( "." );
				return $( this.settings.errorElement + "." + errorClass, this.errorContext );
			},
	
			resetInternals: function() {
				this.successList = [];
				this.errorList = [];
				this.errorMap = {};
				this.toShow = $( [] );
				this.toHide = $( [] );
			},
	
			reset: function() {
				this.resetInternals();
				this.currentElements = $( [] );
			},
	
			prepareForm: function() {
				this.reset();
				this.toHide = this.errors().add( this.containers );
			},
	
			prepareElement: function( element ) {
				this.reset();
				this.toHide = this.errorsFor( element );
			},
	
			elementValue: function( element ) {
				var $element = $( element ),
					type = element.type,
					val, idx;
	
				if ( type === "radio" || type === "checkbox" ) {
					return this.findByName( element.name ).filter( ":checked" ).val();
				} else if ( type === "number" && typeof element.validity !== "undefined" ) {
					return element.validity.badInput ? "NaN" : $element.val();
				}
	
				if ( element.hasAttribute( "contenteditable" ) ) {
					val = $element.text();
				} else {
					val = $element.val();
				}
	
				if ( type === "file" ) {
	
					// Modern browser (chrome & safari)
					if ( val.substr( 0, 12 ) === "C:\\fakepath\\" ) {
						return val.substr( 12 );
					}
	
					// Legacy browsers
					// Unix-based path
					idx = val.lastIndexOf( "/" );
					if ( idx >= 0 ) {
						return val.substr( idx + 1 );
					}
	
					// Windows-based path
					idx = val.lastIndexOf( "\\" );
					if ( idx >= 0 ) {
						return val.substr( idx + 1 );
					}
	
					// Just the file name
					return val;
				}
	
				if ( typeof val === "string" ) {
					return val.replace( /\r/g, "" );
				}
				return val;
			},
	
			check: function( element ) {
				element = this.validationTargetFor( this.clean( element ) );
	
				var rules = $( element ).rules(),
					rulesCount = $.map( rules, function( n, i ) {
						return i;
					} ).length,
					dependencyMismatch = false,
					val = this.elementValue( element ),
					result, method, rule;
	
				// If a normalizer is defined for this element, then
				// call it to retreive the changed value instead
				// of using the real one.
				// Note that `this` in the normalizer is `element`.
				if ( typeof rules.normalizer === "function" ) {
					val = rules.normalizer.call( element, val );
	
					if ( typeof val !== "string" ) {
						throw new TypeError( "The normalizer should return a string value." );
					}
	
					// Delete the normalizer from rules to avoid treating
					// it as a pre-defined method.
					delete rules.normalizer;
				}
	
				for ( method in rules ) {
					rule = { method: method, parameters: rules[ method ] };
					try {
						result = $.validator.methods[ method ].call( this, val, element, rule.parameters );
	
						// If a method indicates that the field is optional and therefore valid,
						// don't mark it as valid when there are no other rules
						if ( result === "dependency-mismatch" && rulesCount === 1 ) {
							dependencyMismatch = true;
							continue;
						}
						dependencyMismatch = false;
	
						if ( result === "pending" ) {
							this.toHide = this.toHide.not( this.errorsFor( element ) );
							return;
						}
	
						if ( !result ) {
							this.formatAndAdd( element, rule );
							return false;
						}
					} catch ( e ) {
						if ( this.settings.debug && window.console ) {
							console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
						}
						if ( e instanceof TypeError ) {
							e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
						}
	
						throw e;
					}
				}
				if ( dependencyMismatch ) {
					return;
				}
				if ( this.objectLength( rules ) ) {
					this.successList.push( element );
				}
				return true;
			},
	
			// Return the custom message for the given element and validation method
			// specified in the element's HTML5 data attribute
			// return the generic message if present and no method specific message is present
			customDataMessage: function( element, method ) {
				return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
					method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
			},
	
			// Return the custom message for the given element name and validation method
			customMessage: function( name, method ) {
				var m = this.settings.messages[ name ];
				return m && ( m.constructor === String ? m : m[ method ] );
			},
	
			// Return the first defined argument, allowing empty strings
			findDefined: function() {
				for ( var i = 0; i < arguments.length; i++ ) {
					if ( arguments[ i ] !== undefined ) {
						return arguments[ i ];
					}
				}
				return undefined;
			},
	
			defaultMessage: function( element, rule ) {
				var message = this.findDefined(
						this.customMessage( element.name, rule.method ),
						this.customDataMessage( element, rule.method ),
	
						// 'title' is never undefined, so handle empty string as undefined
						!this.settings.ignoreTitle && element.title || undefined,
						$.validator.messages[ rule.method ],
						"<strong>Warning: No message defined for " + element.name + "</strong>"
					),
					theregex = /\$?\{(\d+)\}/g;
				if ( typeof message === "function" ) {
					message = message.call( this, rule.parameters, element );
				} else if ( theregex.test( message ) ) {
					message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
				}
	
				return message;
			},
	
			formatAndAdd: function( element, rule ) {
				var message = this.defaultMessage( element, rule );
	
				this.errorList.push( {
					message: message,
					element: element,
					method: rule.method
				} );
	
				this.errorMap[ element.name ] = message;
				this.submitted[ element.name ] = message;
			},
	
			addWrapper: function( toToggle ) {
				if ( this.settings.wrapper ) {
					toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
				}
				return toToggle;
			},
	
			defaultShowErrors: function() {
				var i, elements, error;
				for ( i = 0; this.errorList[ i ]; i++ ) {
					error = this.errorList[ i ];
					if ( this.settings.highlight ) {
						this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
					}
					this.showLabel( error.element, error.message );
				}
				if ( this.errorList.length ) {
					this.toShow = this.toShow.add( this.containers );
				}
				if ( this.settings.success ) {
					for ( i = 0; this.successList[ i ]; i++ ) {
						this.showLabel( this.successList[ i ] );
					}
				}
				if ( this.settings.unhighlight ) {
					for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
						this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
					}
				}
				this.toHide = this.toHide.not( this.toShow );
				this.hideErrors();
				this.addWrapper( this.toShow ).show();
			},
	
			validElements: function() {
				return this.currentElements.not( this.invalidElements() );
			},
	
			invalidElements: function() {
				return $( this.errorList ).map( function() {
					return this.element;
				} );
			},
	
			showLabel: function( element, message ) {
				var place, group, errorID, v,
					error = this.errorsFor( element ),
					elementID = this.idOrName( element ),
					describedBy = $( element ).attr( "aria-describedby" );
	
				if ( error.length ) {
	
					// Refresh error/success class
					error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
	
					// Replace message on existing label
					error.html( message );
				} else {
	
					// Create error element
					error = $( "<" + this.settings.errorElement + ">" )
						.attr( "id", elementID + "-error" )
						.addClass( this.settings.errorClass )
						.html( message || "" );
	
					// Maintain reference to the element to be placed into the DOM
					place = error;
					if ( this.settings.wrapper ) {
	
						// Make sure the element is visible, even in IE
						// actually showing the wrapped element is handled elsewhere
						place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
					}
					if ( this.labelContainer.length ) {
						this.labelContainer.append( place );
					} else if ( this.settings.errorPlacement ) {
						this.settings.errorPlacement( place, $( element ) );
					} else {
						place.insertAfter( element );
					}
	
					// Link error back to the element
					if ( error.is( "label" ) ) {
	
						// If the error is a label, then associate using 'for'
						error.attr( "for", elementID );
	
						// If the element is not a child of an associated label, then it's necessary
						// to explicitly apply aria-describedby
					} else if ( error.parents( "label[for='" + this.escapeCssMeta( elementID ) + "']" ).length === 0 ) {
						errorID = error.attr( "id" );
	
						// Respect existing non-error aria-describedby
						if ( !describedBy ) {
							describedBy = errorID;
						} else if ( !describedBy.match( new RegExp( "\\b" + this.escapeCssMeta( errorID ) + "\\b" ) ) ) {
	
							// Add to end of list if not already present
							describedBy += " " + errorID;
						}
						$( element ).attr( "aria-describedby", describedBy );
	
						// If this element is grouped, then assign to all elements in the same group
						group = this.groups[ element.name ];
						if ( group ) {
							v = this;
							$.each( v.groups, function( name, testgroup ) {
								if ( testgroup === group ) {
									$( "[name='" + v.escapeCssMeta( name ) + "']", v.currentForm )
										.attr( "aria-describedby", error.attr( "id" ) );
								}
							} );
						}
					}
				}
				if ( !message && this.settings.success ) {
					error.text( "" );
					if ( typeof this.settings.success === "string" ) {
						error.addClass( this.settings.success );
					} else {
						this.settings.success( error, element );
					}
				}
				this.toShow = this.toShow.add( error );
			},
	
			errorsFor: function( element ) {
				var name = this.escapeCssMeta( this.idOrName( element ) ),
					describer = $( element ).attr( "aria-describedby" ),
					selector = "label[for='" + name + "'], label[for='" + name + "'] *";
	
				// 'aria-describedby' should directly reference the error element
				if ( describer ) {
					selector = selector + ", #" + this.escapeCssMeta( describer )
						.replace( /\s+/g, ", #" );
				}
	
				return this
					.errors()
					.filter( selector );
			},
	
			// See https://api.jquery.com/category/selectors/, for CSS
			// meta-characters that should be escaped in order to be used with JQuery
			// as a literal part of a name/id or any selector.
			escapeCssMeta: function( string ) {
				return string.replace( /([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1" );
			},
	
			idOrName: function( element ) {
				return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
			},
	
			validationTargetFor: function( element ) {
	
				// If radio/checkbox, validate first element in group instead
				if ( this.checkable( element ) ) {
					element = this.findByName( element.name );
				}
	
				// Always apply ignore filter
				return $( element ).not( this.settings.ignore )[ 0 ];
			},
	
			checkable: function( element ) {
				return ( /radio|checkbox/i ).test( element.type );
			},
	
			findByName: function( name ) {
				return $( this.currentForm ).find( "[name='" + this.escapeCssMeta( name ) + "']" );
			},
	
			getLength: function( value, element ) {
				switch ( element.nodeName.toLowerCase() ) {
				case "select":
					return $( "option:selected", element ).length;
				case "input":
					if ( this.checkable( element ) ) {
						return this.findByName( element.name ).filter( ":checked" ).length;
					}
				}
				return value.length;
			},
	
			depend: function( param, element ) {
				return this.dependTypes[ typeof param ] ? this.dependTypes[ typeof param ]( param, element ) : true;
			},
	
			dependTypes: {
				"boolean": function( param ) {
					return param;
				},
				"string": function( param, element ) {
					return !!$( param, element.form ).length;
				},
				"function": function( param, element ) {
					return param( element );
				}
			},
	
			optional: function( element ) {
				var val = this.elementValue( element );
				return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
			},
	
			startRequest: function( element ) {
				if ( !this.pending[ element.name ] ) {
					this.pendingRequest++;
					$( element ).addClass( this.settings.pendingClass );
					this.pending[ element.name ] = true;
				}
			},
	
			stopRequest: function( element, valid ) {
				this.pendingRequest--;
	
				// Sometimes synchronization fails, make sure pendingRequest is never < 0
				if ( this.pendingRequest < 0 ) {
					this.pendingRequest = 0;
				}
				delete this.pending[ element.name ];
				$( element ).removeClass( this.settings.pendingClass );
				if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
					$( this.currentForm ).submit();
					this.formSubmitted = false;
				} else if ( !valid && this.pendingRequest === 0 && this.formSubmitted ) {
					$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
					this.formSubmitted = false;
				}
			},
	
			previousValue: function( element, method ) {
				return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
					old: null,
					valid: true,
					message: this.defaultMessage( element, { method: method } )
				} );
			},
	
			// Cleans up all forms and elements, removes validator-specific events
			destroy: function() {
				this.resetForm();
	
				$( this.currentForm )
					.off( ".validate" )
					.removeData( "validator" )
					.find( ".validate-equalTo-blur" )
						.off( ".validate-equalTo" )
						.removeClass( "validate-equalTo-blur" );
			}
	
		},
	
		classRuleSettings: {
			required: { required: true },
			email: { email: true },
			url: { url: true },
			date: { date: true },
			dateISO: { dateISO: true },
			number: { number: true },
			digits: { digits: true },
			creditcard: { creditcard: true }
		},
	
		addClassRules: function( className, rules ) {
			if ( className.constructor === String ) {
				this.classRuleSettings[ className ] = rules;
			} else {
				$.extend( this.classRuleSettings, className );
			}
		},
	
		classRules: function( element ) {
			var rules = {},
				classes = $( element ).attr( "class" );
	
			if ( classes ) {
				$.each( classes.split( " " ), function() {
					if ( this in $.validator.classRuleSettings ) {
						$.extend( rules, $.validator.classRuleSettings[ this ] );
					}
				} );
			}
			return rules;
		},
	
		normalizeAttributeRule: function( rules, type, method, value ) {
	
			// Convert the value to a number for number inputs, and for text for backwards compability
			// allows type="date" and others to be compared as strings
			if ( /min|max|step/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
				value = Number( value );
	
				// Support Opera Mini, which returns NaN for undefined minlength
				if ( isNaN( value ) ) {
					value = undefined;
				}
			}
	
			if ( value || value === 0 ) {
				rules[ method ] = value;
			} else if ( type === method && type !== "range" ) {
	
				// Exception: the jquery validate 'range' method
				// does not test for the html5 'range' type
				rules[ method ] = true;
			}
		},
	
		attributeRules: function( element ) {
			var rules = {},
				$element = $( element ),
				type = element.getAttribute( "type" ),
				method, value;
	
			for ( method in $.validator.methods ) {
	
				// Support for <input required> in both html5 and older browsers
				if ( method === "required" ) {
					value = element.getAttribute( method );
	
					// Some browsers return an empty string for the required attribute
					// and non-HTML5 browsers might have required="" markup
					if ( value === "" ) {
						value = true;
					}
	
					// Force non-HTML5 browsers to return bool
					value = !!value;
				} else {
					value = $element.attr( method );
				}
	
				this.normalizeAttributeRule( rules, type, method, value );
			}
	
			// 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
			if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
				delete rules.maxlength;
			}
	
			return rules;
		},
	
		dataRules: function( element ) {
			var rules = {},
				$element = $( element ),
				type = element.getAttribute( "type" ),
				method, value;
	
			for ( method in $.validator.methods ) {
				value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
				this.normalizeAttributeRule( rules, type, method, value );
			}
			return rules;
		},
	
		staticRules: function( element ) {
			var rules = {},
				validator = $.data( element.form, "validator" );
	
			if ( validator.settings.rules ) {
				rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
			}
			return rules;
		},
	
		normalizeRules: function( rules, element ) {
	
			// Handle dependency check
			$.each( rules, function( prop, val ) {
	
				// Ignore rule when param is explicitly false, eg. required:false
				if ( val === false ) {
					delete rules[ prop ];
					return;
				}
				if ( val.param || val.depends ) {
					var keepRule = true;
					switch ( typeof val.depends ) {
					case "string":
						keepRule = !!$( val.depends, element.form ).length;
						break;
					case "function":
						keepRule = val.depends.call( element, element );
						break;
					}
					if ( keepRule ) {
						rules[ prop ] = val.param !== undefined ? val.param : true;
					} else {
						$.data( element.form, "validator" ).resetElements( $( element ) );
						delete rules[ prop ];
					}
				}
			} );
	
			// Evaluate parameters
			$.each( rules, function( rule, parameter ) {
				rules[ rule ] = $.isFunction( parameter ) && rule !== "normalizer" ? parameter( element ) : parameter;
			} );
	
			// Clean number parameters
			$.each( [ "minlength", "maxlength" ], function() {
				if ( rules[ this ] ) {
					rules[ this ] = Number( rules[ this ] );
				}
			} );
			$.each( [ "rangelength", "range" ], function() {
				var parts;
				if ( rules[ this ] ) {
					if ( $.isArray( rules[ this ] ) ) {
						rules[ this ] = [ Number( rules[ this ][ 0 ] ), Number( rules[ this ][ 1 ] ) ];
					} else if ( typeof rules[ this ] === "string" ) {
						parts = rules[ this ].replace( /[\[\]]/g, "" ).split( /[\s,]+/ );
						rules[ this ] = [ Number( parts[ 0 ] ), Number( parts[ 1 ] ) ];
					}
				}
			} );
	
			if ( $.validator.autoCreateRanges ) {
	
				// Auto-create ranges
				if ( rules.min != null && rules.max != null ) {
					rules.range = [ rules.min, rules.max ];
					delete rules.min;
					delete rules.max;
				}
				if ( rules.minlength != null && rules.maxlength != null ) {
					rules.rangelength = [ rules.minlength, rules.maxlength ];
					delete rules.minlength;
					delete rules.maxlength;
				}
			}
	
			return rules;
		},
	
		// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
		normalizeRule: function( data ) {
			if ( typeof data === "string" ) {
				var transformed = {};
				$.each( data.split( /\s/ ), function() {
					transformed[ this ] = true;
				} );
				data = transformed;
			}
			return data;
		},
	
		// http://jqueryvalidation.org/jQuery.validator.addMethod/
		addMethod: function( name, method, message ) {
			$.validator.methods[ name ] = method;
			$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
			if ( method.length < 3 ) {
				$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
			}
		},
	
		// http://jqueryvalidation.org/jQuery.validator.methods/
		methods: {
	
			// http://jqueryvalidation.org/required-method/
			required: function( value, element, param ) {
	
				// Check if dependency is met
				if ( !this.depend( param, element ) ) {
					return "dependency-mismatch";
				}
				if ( element.nodeName.toLowerCase() === "select" ) {
	
					// Could be an array for select-multiple or a string, both are fine this way
					var val = $( element ).val();
					return val && val.length > 0;
				}
				if ( this.checkable( element ) ) {
					return this.getLength( value, element ) > 0;
				}
				return value.length > 0;
			},
	
			// http://jqueryvalidation.org/email-method/
			email: function( value, element ) {
	
				// From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
				// Retrieved 2014-01-14
				// If you have a problem with this implementation, report a bug against the above spec
				// Or use custom methods to implement your own email validation
				return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
			},
	
			// http://jqueryvalidation.org/url-method/
			url: function( value, element ) {
	
				// Copyright (c) 2010-2013 Diego Perini, MIT licensed
				// https://gist.github.com/dperini/729294
				// see also https://mathiasbynens.be/demo/url-regex
				// modified to allow protocol-relative URLs
				return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
			},
	
			// http://jqueryvalidation.org/date-method/
			date: function( value, element ) {
				return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
			},
	
			// http://jqueryvalidation.org/dateISO-method/
			dateISO: function( value, element ) {
				return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
			},
	
			// http://jqueryvalidation.org/number-method/
			number: function( value, element ) {
				return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
			},
	
			// http://jqueryvalidation.org/digits-method/
			digits: function( value, element ) {
				return this.optional( element ) || /^\d+$/.test( value );
			},
	
			// http://jqueryvalidation.org/minlength-method/
			minlength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength( value, element );
				return this.optional( element ) || length >= param;
			},
	
			// http://jqueryvalidation.org/maxlength-method/
			maxlength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength( value, element );
				return this.optional( element ) || length <= param;
			},
	
			// http://jqueryvalidation.org/rangelength-method/
			rangelength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength( value, element );
				return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
			},
	
			// http://jqueryvalidation.org/min-method/
			min: function( value, element, param ) {
				return this.optional( element ) || value >= param;
			},
	
			// http://jqueryvalidation.org/max-method/
			max: function( value, element, param ) {
				return this.optional( element ) || value <= param;
			},
	
			// http://jqueryvalidation.org/range-method/
			range: function( value, element, param ) {
				return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
			},
	
			// http://jqueryvalidation.org/step-method/
			step: function( value, element, param ) {
				var type = $( element ).attr( "type" ),
					errorMessage = "Step attribute on input type " + type + " is not supported.",
					supportedTypes = [ "text", "number", "range" ],
					re = new RegExp( "\\b" + type + "\\b" ),
					notSupported = type && !re.test( supportedTypes.join() );
	
				// Works only for text, number and range input types
				// TODO find a way to support input types date, datetime, datetime-local, month, time and week
				if ( notSupported ) {
					throw new Error( errorMessage );
				}
				return this.optional( element ) || ( value % param === 0 );
			},
	
			// http://jqueryvalidation.org/equalTo-method/
			equalTo: function( value, element, param ) {
	
				// Bind to the blur event of the target in order to revalidate whenever the target field is updated
				var target = $( param );
				if ( this.settings.onfocusout && target.not( ".validate-equalTo-blur" ).length ) {
					target.addClass( "validate-equalTo-blur" ).on( "blur.validate-equalTo", function() {
						$( element ).valid();
					} );
				}
				return value === target.val();
			},
	
			// http://jqueryvalidation.org/remote-method/
			remote: function( value, element, param, method ) {
				if ( this.optional( element ) ) {
					return "dependency-mismatch";
				}
	
				method = typeof method === "string" && method || "remote";
	
				var previous = this.previousValue( element, method ),
					validator, data, optionDataString;
	
				if ( !this.settings.messages[ element.name ] ) {
					this.settings.messages[ element.name ] = {};
				}
				previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
				this.settings.messages[ element.name ][ method ] = previous.message;
	
				param = typeof param === "string" && { url: param } || param;
				optionDataString = $.param( $.extend( { data: value }, param.data ) );
				if ( previous.old === optionDataString ) {
					return previous.valid;
				}
	
				previous.old = optionDataString;
				validator = this;
				this.startRequest( element );
				data = {};
				data[ element.name ] = value;
				$.ajax( $.extend( true, {
					mode: "abort",
					port: "validate" + element.name,
					dataType: "json",
					data: data,
					context: validator.currentForm,
					success: function( response ) {
						var valid = response === true || response === "true",
							errors, message, submitted;
	
						validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
						if ( valid ) {
							submitted = validator.formSubmitted;
							validator.resetInternals();
							validator.toHide = validator.errorsFor( element );
							validator.formSubmitted = submitted;
							validator.successList.push( element );
							validator.invalid[ element.name ] = false;
							validator.showErrors();
						} else {
							errors = {};
							message = response || validator.defaultMessage( element, { method: method, parameters: value } );
							errors[ element.name ] = previous.message = message;
							validator.invalid[ element.name ] = true;
							validator.showErrors( errors );
						}
						previous.valid = valid;
						validator.stopRequest( element, valid );
					}
				}, param ) );
				return "pending";
			}
		}
	
	} );
	
	// Ajax mode: abort
	// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
	// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
	
	var pendingRequests = {},
		ajax;
	
	// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) {
		$.ajaxPrefilter( function( settings, _, xhr ) {
			var port = settings.port;
			if ( settings.mode === "abort" ) {
				if ( pendingRequests[ port ] ) {
					pendingRequests[ port ].abort();
				}
				pendingRequests[ port ] = xhr;
			}
		} );
	} else {
	
		// Proxy ajax
		ajax = $.ajax;
		$.ajax = function( settings ) {
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if ( mode === "abort" ) {
				if ( pendingRequests[ port ] ) {
					pendingRequests[ port ].abort();
				}
				pendingRequests[ port ] = ajax.apply( this, arguments );
				return pendingRequests[ port ];
			}
			return ajax.apply( this, arguments );
		};
	}
	
	}));

/***/ },

/***/ 10:
/***/ function(module, exports) {

	/*!
	** Unobtrusive validation support library for jQuery and jQuery Validate
	** Copyright (C) Microsoft Corporation. All rights reserved.
	*/
	
	/*jslint white: true, browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: false */
	/*global document: false, jQuery: false */
	
	(function ($) {
	    var $jQval = $.validator,
	        adapters,
	        data_validation = "unobtrusiveValidation";
	
	    function setValidationValues(options, ruleName, value) {
	        options.rules[ruleName] = value;
	        if (options.message) {
	            options.messages[ruleName] = options.message;
	        }
	    }
	
	    function splitAndTrim(value) {
	        return value.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g);
	    }
	
	    function escapeAttributeValue(value) {
	        // As mentioned on http://api.jquery.com/category/selectors/
	        return value.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1");
	    }
	
	    function getModelPrefix(fieldName) {
	        return fieldName.substr(0, fieldName.lastIndexOf(".") + 1);
	    }
	
	    function appendModelPrefix(value, prefix) {
	        if (value.indexOf("*.") === 0) {
	            value = value.replace("*.", prefix);
	        }
	        return value;
	    }
	
	    function onError(error, inputElement) {  // 'this' is the form element
	        var container = $(this).find("[data-valmsg-for='" + escapeAttributeValue(inputElement[0].name) + "']"),
	            replaceAttrValue = container.attr("data-valmsg-replace"),
	            replace = replaceAttrValue ? $.parseJSON(replaceAttrValue) !== false : null;
	
	        container.removeClass("field-validation-valid").addClass("field-validation-error");
	        error.data("unobtrusiveContainer", container);
	
	        if (replace) {
	            container.empty();
	            error.removeClass("input-validation-error").appendTo(container);
	        }
	        else {
	            error.hide();
	        }
	    }
	
	    function onErrors(event, validator) {  // 'this' is the form element
	        var container = $(this).find("[data-valmsg-summary=true]"),
	            list = container.find("ul");
	
	        if (list && list.length && validator.errorList.length) {
	            list.empty();
	            container.addClass("validation-summary-errors").removeClass("validation-summary-valid");
	
	            $.each(validator.errorList, function () {
	                $("<li />").html(this.message).appendTo(list);
	            });
	        }
	    }
	
	    function onSuccess(error) {  // 'this' is the form element
	        var container = error.data("unobtrusiveContainer");
	
	        if (container) {
	            var replaceAttrValue = container.attr("data-valmsg-replace"),
	                replace = replaceAttrValue ? $.parseJSON(replaceAttrValue) : null;
	
	            container.addClass("field-validation-valid").removeClass("field-validation-error");
	            error.removeData("unobtrusiveContainer");
	
	            if (replace) {
	                container.empty();
	            }
	        }
	    }
	
	    function onReset(event) {  // 'this' is the form element
	        var $form = $(this),
	            key = '__jquery_unobtrusive_validation_form_reset';
	        if ($form.data(key)) {
	            return;
	        }
	        // Set a flag that indicates we're currently resetting the form.
	        $form.data(key, true);
	        try {
	            $form.data("validator").resetForm();
	        } finally {
	            $form.removeData(key);
	        }
	
	        $form.find(".validation-summary-errors")
	            .addClass("validation-summary-valid")
	            .removeClass("validation-summary-errors");
	        $form.find(".field-validation-error")
	            .addClass("field-validation-valid")
	            .removeClass("field-validation-error")
	            .removeData("unobtrusiveContainer")
	            .find(">*")  // If we were using valmsg-replace, get the underlying error
	                .removeData("unobtrusiveContainer");
	    }
	
	    function validationInfo(form) {
	        var $form = $(form),
	            result = $form.data(data_validation),
	            onResetProxy = $.proxy(onReset, form),
	            defaultOptions = $jQval.unobtrusive.options || {},
	            execInContext = function (name, args) {
	                var func = defaultOptions[name];
	                func && $.isFunction(func) && func.apply(form, args);
	            }
	
	        if (!result) {
	            result = {
	                options: {  // options structure passed to jQuery Validate's validate() method
	                    errorClass: defaultOptions.errorClass || "input-validation-error",
	                    errorElement: defaultOptions.errorElement || "span",
	                    errorPlacement: function () {
	                        onError.apply(form, arguments);
	                        execInContext("errorPlacement", arguments);
	                    },
	                    invalidHandler: function () {
	                        onErrors.apply(form, arguments);
	                        execInContext("invalidHandler", arguments);
	                    },
	                    messages: {},
	                    rules: {},
	                    success: function () {
	                        onSuccess.apply(form, arguments);
	                        execInContext("success", arguments);
	                    }
	                },
	                attachValidation: function () {
	                    $form
	                        .off("reset." + data_validation, onResetProxy)
	                        .on("reset." + data_validation, onResetProxy)
	                        .validate(this.options);
	                },
	                validate: function () {  // a validation function that is called by unobtrusive Ajax
	                    $form.validate();
	                    return $form.valid();
	                }
	            };
	            $form.data(data_validation, result);
	        }
	
	        return result;
	    }
	
	    $jQval.unobtrusive = {
	        adapters: [],
	
	        parseElement: function (element, skipAttach) {
	            /// <summary>
	            /// Parses a single HTML element for unobtrusive validation attributes.
	            /// </summary>
	            /// <param name="element" domElement="true">The HTML element to be parsed.</param>
	            /// <param name="skipAttach" type="Boolean">[Optional] true to skip attaching the
	            /// validation to the form. If parsing just this single element, you should specify true.
	            /// If parsing several elements, you should specify false, and manually attach the validation
	            /// to the form when you are finished. The default is false.</param>
	            var $element = $(element),
	                form = $element.parents("form")[0],
	                valInfo, rules, messages;
	
	            if (!form) {  // Cannot do client-side validation without a form
	                return;
	            }
	
	            valInfo = validationInfo(form);
	            valInfo.options.rules[element.name] = rules = {};
	            valInfo.options.messages[element.name] = messages = {};
	
	            $.each(this.adapters, function () {
	                var prefix = "data-val-" + this.name,
	                    message = $element.attr(prefix),
	                    paramValues = {};
	
	                if (message !== undefined) {  // Compare against undefined, because an empty message is legal (and falsy)
	                    prefix += "-";
	
	                    $.each(this.params, function () {
	                        paramValues[this] = $element.attr(prefix + this);
	                    });
	
	                    this.adapt({
	                        element: element,
	                        form: form,
	                        message: message,
	                        params: paramValues,
	                        rules: rules,
	                        messages: messages
	                    });
	                }
	            });
	
	            $.extend(rules, { "__dummy__": true });
	
	            if (!skipAttach) {
	                valInfo.attachValidation();
	            }
	        },
	
	        parse: function (selector) {
	            /// <summary>
	            /// Parses all the HTML elements in the specified selector. It looks for input elements decorated
	            /// with the [data-val=true] attribute value and enables validation according to the data-val-*
	            /// attribute values.
	            /// </summary>
	            /// <param name="selector" type="String">Any valid jQuery selector.</param>
	
	            // $forms includes all forms in selector's DOM hierarchy (parent, children and self) that have at least one
	            // element with data-val=true
	            var $selector = $(selector),
	                $forms = $selector.parents()
	                                  .addBack()
	                                  .filter("form")
	                                  .add($selector.find("form"))
	                                  .has("[data-val=true]");
	
	            $selector.find("[data-val=true]").each(function () {
	                $jQval.unobtrusive.parseElement(this, true);
	            });
	
	            $forms.each(function () {
	                var info = validationInfo(this);
	                if (info) {
	                    info.attachValidation();
	                }
	            });
	        }
	    };
	
	    adapters = $jQval.unobtrusive.adapters;
	
	    adapters.add = function (adapterName, params, fn) {
	        /// <summary>Adds a new adapter to convert unobtrusive HTML into a jQuery Validate validation.</summary>
	        /// <param name="adapterName" type="String">The name of the adapter to be added. This matches the name used
	        /// in the data-val-nnnn HTML attribute (where nnnn is the adapter name).</param>
	        /// <param name="params" type="Array" optional="true">[Optional] An array of parameter names (strings) that will
	        /// be extracted from the data-val-nnnn-mmmm HTML attributes (where nnnn is the adapter name, and
	        /// mmmm is the parameter name).</param>
	        /// <param name="fn" type="Function">The function to call, which adapts the values from the HTML
	        /// attributes into jQuery Validate rules and/or messages.</param>
	        /// <returns type="jQuery.validator.unobtrusive.adapters" />
	        if (!fn) {  // Called with no params, just a function
	            fn = params;
	            params = [];
	        }
	        this.push({ name: adapterName, params: params, adapt: fn });
	        return this;
	    };
	
	    adapters.addBool = function (adapterName, ruleName) {
	        /// <summary>Adds a new adapter to convert unobtrusive HTML into a jQuery Validate validation, where
	        /// the jQuery Validate validation rule has no parameter values.</summary>
	        /// <param name="adapterName" type="String">The name of the adapter to be added. This matches the name used
	        /// in the data-val-nnnn HTML attribute (where nnnn is the adapter name).</param>
	        /// <param name="ruleName" type="String" optional="true">[Optional] The name of the jQuery Validate rule. If not provided, the value
	        /// of adapterName will be used instead.</param>
	        /// <returns type="jQuery.validator.unobtrusive.adapters" />
	        return this.add(adapterName, function (options) {
	            setValidationValues(options, ruleName || adapterName, true);
	        });
	    };
	
	    adapters.addMinMax = function (adapterName, minRuleName, maxRuleName, minMaxRuleName, minAttribute, maxAttribute) {
	        /// <summary>Adds a new adapter to convert unobtrusive HTML into a jQuery Validate validation, where
	        /// the jQuery Validate validation has three potential rules (one for min-only, one for max-only, and
	        /// one for min-and-max). The HTML parameters are expected to be named -min and -max.</summary>
	        /// <param name="adapterName" type="String">The name of the adapter to be added. This matches the name used
	        /// in the data-val-nnnn HTML attribute (where nnnn is the adapter name).</param>
	        /// <param name="minRuleName" type="String">The name of the jQuery Validate rule to be used when you only
	        /// have a minimum value.</param>
	        /// <param name="maxRuleName" type="String">The name of the jQuery Validate rule to be used when you only
	        /// have a maximum value.</param>
	        /// <param name="minMaxRuleName" type="String">The name of the jQuery Validate rule to be used when you
	        /// have both a minimum and maximum value.</param>
	        /// <param name="minAttribute" type="String" optional="true">[Optional] The name of the HTML attribute that
	        /// contains the minimum value. The default is "min".</param>
	        /// <param name="maxAttribute" type="String" optional="true">[Optional] The name of the HTML attribute that
	        /// contains the maximum value. The default is "max".</param>
	        /// <returns type="jQuery.validator.unobtrusive.adapters" />
	        return this.add(adapterName, [minAttribute || "min", maxAttribute || "max"], function (options) {
	            var min = options.params.min,
	                max = options.params.max;
	
	            if (min && max) {
	                setValidationValues(options, minMaxRuleName, [min, max]);
	            }
	            else if (min) {
	                setValidationValues(options, minRuleName, min);
	            }
	            else if (max) {
	                setValidationValues(options, maxRuleName, max);
	            }
	        });
	    };
	
	    adapters.addSingleVal = function (adapterName, attribute, ruleName) {
	        /// <summary>Adds a new adapter to convert unobtrusive HTML into a jQuery Validate validation, where
	        /// the jQuery Validate validation rule has a single value.</summary>
	        /// <param name="adapterName" type="String">The name of the adapter to be added. This matches the name used
	        /// in the data-val-nnnn HTML attribute(where nnnn is the adapter name).</param>
	        /// <param name="attribute" type="String">[Optional] The name of the HTML attribute that contains the value.
	        /// The default is "val".</param>
	        /// <param name="ruleName" type="String" optional="true">[Optional] The name of the jQuery Validate rule. If not provided, the value
	        /// of adapterName will be used instead.</param>
	        /// <returns type="jQuery.validator.unobtrusive.adapters" />
	        return this.add(adapterName, [attribute || "val"], function (options) {
	            setValidationValues(options, ruleName || adapterName, options.params[attribute]);
	        });
	    };
	
	    $jQval.addMethod("__dummy__", function (value, element, params) {
	        return true;
	    });
	
	    $jQval.addMethod("regex", function (value, element, params) {
	        var match;
	        if (this.optional(element)) {
	            return true;
	        }
	
	        match = new RegExp(params).exec(value);
	        return (match && (match.index === 0) && (match[0].length === value.length));
	    });
	
	    $jQval.addMethod("nonalphamin", function (value, element, nonalphamin) {
	        var match;
	        if (nonalphamin) {
	            match = value.match(/\W/g);
	            match = match && match.length >= nonalphamin;
	        }
	        return match;
	    });
	
	    if ($jQval.methods.extension) {
	        adapters.addSingleVal("accept", "mimtype");
	        adapters.addSingleVal("extension", "extension");
	    } else {
	        // for backward compatibility, when the 'extension' validation method does not exist, such as with versions
	        // of JQuery Validation plugin prior to 1.10, we should use the 'accept' method for
	        // validating the extension, and ignore mime-type validations as they are not supported.
	        adapters.addSingleVal("extension", "extension", "accept");
	    }
	
	    adapters.addSingleVal("regex", "pattern");
	    adapters.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");
	    adapters.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range");
	    adapters.addMinMax("minlength", "minlength").addMinMax("maxlength", "minlength", "maxlength");
	    adapters.add("equalto", ["other"], function (options) {
	        var prefix = getModelPrefix(options.element.name),
	            other = options.params.other,
	            fullOtherName = appendModelPrefix(other, prefix),
	            element = $(options.form).find(":input").filter("[name='" + escapeAttributeValue(fullOtherName) + "']")[0];
	
	        setValidationValues(options, "equalTo", element);
	    });
	    adapters.add("required", function (options) {
	        // jQuery Validate equates "required" with "mandatory" for checkbox elements
	        if (options.element.tagName.toUpperCase() !== "INPUT" || options.element.type.toUpperCase() !== "CHECKBOX") {
	            setValidationValues(options, "required", true);
	        }
	    });
	    adapters.add("remote", ["url", "type", "additionalfields"], function (options) {
	        var value = {
	            url: options.params.url,
	            type: options.params.type || "GET",
	            data: {}
	        },
	            prefix = getModelPrefix(options.element.name);
	
	        $.each(splitAndTrim(options.params.additionalfields || options.element.name), function (i, fieldName) {
	            var paramName = appendModelPrefix(fieldName, prefix);
	            value.data[paramName] = function () {
	                var field = $(options.form).find(":input").filter("[name='" + escapeAttributeValue(paramName) + "']");
	                // For checkboxes and radio buttons, only pick up values from checked fields.
	                if (field.is(":checkbox")) {
	                    return field.filter(":checked").val() || field.filter(":hidden").val() || '';
	                }
	                else if (field.is(":radio")) {
	                    return field.filter(":checked").val() || '';
	                }
	                return field.val();
	            };
	        });
	
	        setValidationValues(options, "remote", value);
	    });
	    adapters.add("password", ["min", "nonalphamin", "regex"], function (options) {
	        if (options.params.min) {
	            setValidationValues(options, "minlength", options.params.min);
	        }
	        if (options.params.nonalphamin) {
	            setValidationValues(options, "nonalphamin", options.params.nonalphamin);
	        }
	        if (options.params.regex) {
	            setValidationValues(options, "regex", options.params.regex);
	        }
	    });
	
	    $(function () {
	        $jQval.unobtrusive.parse(document);
	    });
	}(jQuery));

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93d3dyb290L2xpYi9qcXVlcnktZm9ybS9qcXVlcnkuZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi93d3dyb290L2xpYi9qcXVlcnktdmFsaWRhdGlvbi9kaXN0L2pxdWVyeS52YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi93d3dyb290L2xpYi9qcXVlcnktdmFsaWRhdGlvbi11bm9idHJ1c2l2ZS9qcXVlcnkudmFsaWRhdGUudW5vYnRydXNpdmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBLE1BQUs7QUFDTCxtQkFBa0I7QUFDbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQ0FBK0I7QUFDL0I7QUFDQTtBQUNBLGNBQWE7QUFDYixVQUFTO0FBQ1QsTUFBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx5REFBd0Q7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esb0JBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4QkFBNkI7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiOztBQUVBLHFEQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtEQUFpRDs7QUFFakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBQzs7Ozs7Ozs7O0FDL3JDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxFQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7O0FBRUEsNkNBQTRDO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsZ0JBQWdCO0FBQzNDOztBQUVBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQSxvQ0FBbUM7QUFDbkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTJDLFlBQVk7QUFDdkQ7QUFDQSxJQUFH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Q0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdDQUF1QztBQUN2QztBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixJQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBcUQ7QUFDckQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0osSUFBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0Esb0JBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCLE9BQU87QUFDNUI7QUFDQTtBQUNBLEtBQUk7QUFDSixnRUFBK0QsR0FBRztBQUNsRTs7QUFFQTtBQUNBLElBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLGdCQUFlLHFCQUFxQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQix1QkFBdUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBaUQsZUFBZTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQStDLFlBQVksRUFBRTtBQUM3RCxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDLGlCQUFpQjtBQUM3RCxLQUFJO0FBQ0osSUFBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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b0JBQW9COztBQUVqRDtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQiwrQ0FBK0M7QUFDbEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsRUFBQyxVIiwiZmlsZSI6IjIuMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxyXG4gKiBqUXVlcnkgRm9ybSBQbHVnaW5cclxuICogdmVyc2lvbjogMy40Ni4wLTIwMTMuMTEuMjFcclxuICogUmVxdWlyZXMgalF1ZXJ5IHYxLjUgb3IgbGF0ZXJcclxuICogQ29weXJpZ2h0IChjKSAyMDEzIE0uIEFsc3VwXHJcbiAqIEV4YW1wbGVzIGFuZCBkb2N1bWVudGF0aW9uIGF0OiBodHRwOi8vbWFsc3VwLmNvbS9qcXVlcnkvZm9ybS9cclxuICogUHJvamVjdCByZXBvc2l0b3J5OiBodHRwczovL2dpdGh1Yi5jb20vbWFsc3VwL2Zvcm1cclxuICogRHVhbCBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGFuZCBHUEwgbGljZW5zZXMuXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYWxzdXAvZm9ybSNjb3B5cmlnaHQtYW5kLWxpY2Vuc2VcclxuICovXHJcbi8qZ2xvYmFsIEFjdGl2ZVhPYmplY3QgKi9cclxuXHJcbi8vIEFNRCBzdXBwb3J0XHJcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xyXG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgICAgIC8vIHVzaW5nIEFNRDsgcmVnaXN0ZXIgYXMgYW5vbiBtb2R1bGVcclxuICAgICAgICBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIG5vIEFNRDsgaW52b2tlIGRpcmVjdGx5XHJcbiAgICAgICAgZmFjdG9yeSggKHR5cGVvZihqUXVlcnkpICE9ICd1bmRlZmluZWQnKSA/IGpRdWVyeSA6IHdpbmRvdy5aZXB0byApO1xyXG4gICAgfVxyXG59XHJcblxyXG4oZnVuY3Rpb24oJCkge1xyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qXHJcbiAgICBVc2FnZSBOb3RlOlxyXG4gICAgLS0tLS0tLS0tLS1cclxuICAgIERvIG5vdCB1c2UgYm90aCBhamF4U3VibWl0IGFuZCBhamF4Rm9ybSBvbiB0aGUgc2FtZSBmb3JtLiAgVGhlc2VcclxuICAgIGZ1bmN0aW9ucyBhcmUgbXV0dWFsbHkgZXhjbHVzaXZlLiAgVXNlIGFqYXhTdWJtaXQgaWYgeW91IHdhbnRcclxuICAgIHRvIGJpbmQgeW91ciBvd24gc3VibWl0IGhhbmRsZXIgdG8gdGhlIGZvcm0uICBGb3IgZXhhbXBsZSxcclxuXHJcbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjbXlGb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyA8LS0gaW1wb3J0YW50XHJcbiAgICAgICAgICAgICQodGhpcykuYWpheFN1Ym1pdCh7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQ6ICcjb3V0cHV0J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIFVzZSBhamF4Rm9ybSB3aGVuIHlvdSB3YW50IHRoZSBwbHVnaW4gdG8gbWFuYWdlIGFsbCB0aGUgZXZlbnQgYmluZGluZ1xyXG4gICAgZm9yIHlvdS4gIEZvciBleGFtcGxlLFxyXG5cclxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoJyNteUZvcm0nKS5hamF4Rm9ybSh7XHJcbiAgICAgICAgICAgIHRhcmdldDogJyNvdXRwdXQnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBZb3UgY2FuIGFsc28gdXNlIGFqYXhGb3JtIHdpdGggZGVsZWdhdGlvbiAocmVxdWlyZXMgalF1ZXJ5IHYxLjcrKSwgc28gdGhlXHJcbiAgICBmb3JtIGRvZXMgbm90IGhhdmUgdG8gZXhpc3Qgd2hlbiB5b3UgaW52b2tlIGFqYXhGb3JtOlxyXG5cclxuICAgICQoJyNteUZvcm0nKS5hamF4Rm9ybSh7XHJcbiAgICAgICAgZGVsZWdhdGlvbjogdHJ1ZSxcclxuICAgICAgICB0YXJnZXQ6ICcjb3V0cHV0J1xyXG4gICAgfSk7XHJcblxyXG4gICAgV2hlbiB1c2luZyBhamF4Rm9ybSwgdGhlIGFqYXhTdWJtaXQgZnVuY3Rpb24gd2lsbCBiZSBpbnZva2VkIGZvciB5b3VcclxuICAgIGF0IHRoZSBhcHByb3ByaWF0ZSB0aW1lLlxyXG4qL1xyXG5cclxuLyoqXHJcbiAqIEZlYXR1cmUgZGV0ZWN0aW9uXHJcbiAqL1xyXG52YXIgZmVhdHVyZSA9IHt9O1xyXG5mZWF0dXJlLmZpbGVhcGkgPSAkKFwiPGlucHV0IHR5cGU9J2ZpbGUnLz5cIikuZ2V0KDApLmZpbGVzICE9PSB1bmRlZmluZWQ7XHJcbmZlYXR1cmUuZm9ybWRhdGEgPSB3aW5kb3cuRm9ybURhdGEgIT09IHVuZGVmaW5lZDtcclxuXHJcbnZhciBoYXNQcm9wID0gISEkLmZuLnByb3A7XHJcblxyXG4vLyBhdHRyMiB1c2VzIHByb3Agd2hlbiBpdCBjYW4gYnV0IGNoZWNrcyB0aGUgcmV0dXJuIHR5cGUgZm9yXHJcbi8vIGFuIGV4cGVjdGVkIHN0cmluZy4gIHRoaXMgYWNjb3VudHMgZm9yIHRoZSBjYXNlIHdoZXJlIGEgZm9ybSBcclxuLy8gY29udGFpbnMgaW5wdXRzIHdpdGggbmFtZXMgbGlrZSBcImFjdGlvblwiIG9yIFwibWV0aG9kXCI7IGluIHRob3NlXHJcbi8vIGNhc2VzIFwicHJvcFwiIHJldHVybnMgdGhlIGVsZW1lbnRcclxuJC5mbi5hdHRyMiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKCAhIGhhc1Byb3AgKVxyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIHZhciB2YWwgPSB0aGlzLnByb3AuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIGlmICggKCB2YWwgJiYgdmFsLmpxdWVyeSApIHx8IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnIClcclxuICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgcmV0dXJuIHRoaXMuYXR0ci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIGFqYXhTdWJtaXQoKSBwcm92aWRlcyBhIG1lY2hhbmlzbSBmb3IgaW1tZWRpYXRlbHkgc3VibWl0dGluZ1xyXG4gKiBhbiBIVE1MIGZvcm0gdXNpbmcgQUpBWC5cclxuICovXHJcbiQuZm4uYWpheFN1Ym1pdCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgIC8qanNoaW50IHNjcmlwdHVybDp0cnVlICovXHJcblxyXG4gICAgLy8gZmFzdCBmYWlsIGlmIG5vdGhpbmcgc2VsZWN0ZWQgKGh0dHA6Ly9kZXYuanF1ZXJ5LmNvbS90aWNrZXQvMjc1MilcclxuICAgIGlmICghdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICBsb2coJ2FqYXhTdWJtaXQ6IHNraXBwaW5nIHN1Ym1pdCBwcm9jZXNzIC0gbm8gZWxlbWVudCBzZWxlY3RlZCcpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBtZXRob2QsIGFjdGlvbiwgdXJsLCAkZm9ybSA9IHRoaXM7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBvcHRpb25zID0geyBzdWNjZXNzOiBvcHRpb25zIH07XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICggb3B0aW9ucyA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgIG9wdGlvbnMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2QgPSBvcHRpb25zLnR5cGUgfHwgdGhpcy5hdHRyMignbWV0aG9kJyk7XHJcbiAgICBhY3Rpb24gPSBvcHRpb25zLnVybCAgfHwgdGhpcy5hdHRyMignYWN0aW9uJyk7XHJcblxyXG4gICAgdXJsID0gKHR5cGVvZiBhY3Rpb24gPT09ICdzdHJpbmcnKSA/ICQudHJpbShhY3Rpb24pIDogJyc7XHJcbiAgICB1cmwgPSB1cmwgfHwgd2luZG93LmxvY2F0aW9uLmhyZWYgfHwgJyc7XHJcbiAgICBpZiAodXJsKSB7XHJcbiAgICAgICAgLy8gY2xlYW4gdXJsIChkb24ndCBpbmNsdWRlIGhhc2ggdmF1ZSlcclxuICAgICAgICB1cmwgPSAodXJsLm1hdGNoKC9eKFteI10rKS8pfHxbXSlbMV07XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHtcclxuICAgICAgICB1cmw6ICB1cmwsXHJcbiAgICAgICAgc3VjY2VzczogJC5hamF4U2V0dGluZ3Muc3VjY2VzcyxcclxuICAgICAgICB0eXBlOiBtZXRob2QgfHwgJC5hamF4U2V0dGluZ3MudHlwZSxcclxuICAgICAgICBpZnJhbWVTcmM6IC9eaHR0cHMvaS50ZXN0KHdpbmRvdy5sb2NhdGlvbi5ocmVmIHx8ICcnKSA/ICdqYXZhc2NyaXB0OmZhbHNlJyA6ICdhYm91dDpibGFuaydcclxuICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgIC8vIGhvb2sgZm9yIG1hbmlwdWxhdGluZyB0aGUgZm9ybSBkYXRhIGJlZm9yZSBpdCBpcyBleHRyYWN0ZWQ7XHJcbiAgICAvLyBjb252ZW5pZW50IGZvciB1c2Ugd2l0aCByaWNoIGVkaXRvcnMgbGlrZSB0aW55TUNFIG9yIEZDS0VkaXRvclxyXG4gICAgdmFyIHZldG8gPSB7fTtcclxuICAgIHRoaXMudHJpZ2dlcignZm9ybS1wcmUtc2VyaWFsaXplJywgW3RoaXMsIG9wdGlvbnMsIHZldG9dKTtcclxuICAgIGlmICh2ZXRvLnZldG8pIHtcclxuICAgICAgICBsb2coJ2FqYXhTdWJtaXQ6IHN1Ym1pdCB2ZXRvZWQgdmlhIGZvcm0tcHJlLXNlcmlhbGl6ZSB0cmlnZ2VyJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJvdmlkZSBvcHBvcnR1bml0eSB0byBhbHRlciBmb3JtIGRhdGEgYmVmb3JlIGl0IGlzIHNlcmlhbGl6ZWRcclxuICAgIGlmIChvcHRpb25zLmJlZm9yZVNlcmlhbGl6ZSAmJiBvcHRpb25zLmJlZm9yZVNlcmlhbGl6ZSh0aGlzLCBvcHRpb25zKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBsb2coJ2FqYXhTdWJtaXQ6IHN1Ym1pdCBhYm9ydGVkIHZpYSBiZWZvcmVTZXJpYWxpemUgY2FsbGJhY2snKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdHJhZGl0aW9uYWwgPSBvcHRpb25zLnRyYWRpdGlvbmFsO1xyXG4gICAgaWYgKCB0cmFkaXRpb25hbCA9PT0gdW5kZWZpbmVkICkge1xyXG4gICAgICAgIHRyYWRpdGlvbmFsID0gJC5hamF4U2V0dGluZ3MudHJhZGl0aW9uYWw7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGVsZW1lbnRzID0gW107XHJcbiAgICB2YXIgcXgsIGEgPSB0aGlzLmZvcm1Ub0FycmF5KG9wdGlvbnMuc2VtYW50aWMsIGVsZW1lbnRzKTtcclxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcclxuICAgICAgICBvcHRpb25zLmV4dHJhRGF0YSA9IG9wdGlvbnMuZGF0YTtcclxuICAgICAgICBxeCA9ICQucGFyYW0ob3B0aW9ucy5kYXRhLCB0cmFkaXRpb25hbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2l2ZSBwcmUtc3VibWl0IGNhbGxiYWNrIGFuIG9wcG9ydHVuaXR5IHRvIGFib3J0IHRoZSBzdWJtaXRcclxuICAgIGlmIChvcHRpb25zLmJlZm9yZVN1Ym1pdCAmJiBvcHRpb25zLmJlZm9yZVN1Ym1pdChhLCB0aGlzLCBvcHRpb25zKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICBsb2coJ2FqYXhTdWJtaXQ6IHN1Ym1pdCBhYm9ydGVkIHZpYSBiZWZvcmVTdWJtaXQgY2FsbGJhY2snKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvLyBmaXJlIHZldG9hYmxlICd2YWxpZGF0ZScgZXZlbnRcclxuICAgIHRoaXMudHJpZ2dlcignZm9ybS1zdWJtaXQtdmFsaWRhdGUnLCBbYSwgdGhpcywgb3B0aW9ucywgdmV0b10pO1xyXG4gICAgaWYgKHZldG8udmV0bykge1xyXG4gICAgICAgIGxvZygnYWpheFN1Ym1pdDogc3VibWl0IHZldG9lZCB2aWEgZm9ybS1zdWJtaXQtdmFsaWRhdGUgdHJpZ2dlcicpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBxID0gJC5wYXJhbShhLCB0cmFkaXRpb25hbCk7XHJcbiAgICBpZiAocXgpIHtcclxuICAgICAgICBxID0gKCBxID8gKHEgKyAnJicgKyBxeCkgOiBxeCApO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMudHlwZS50b1VwcGVyQ2FzZSgpID09ICdHRVQnKSB7XHJcbiAgICAgICAgb3B0aW9ucy51cmwgKz0gKG9wdGlvbnMudXJsLmluZGV4T2YoJz8nKSA+PSAwID8gJyYnIDogJz8nKSArIHE7XHJcbiAgICAgICAgb3B0aW9ucy5kYXRhID0gbnVsbDsgIC8vIGRhdGEgaXMgbnVsbCBmb3IgJ2dldCdcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG9wdGlvbnMuZGF0YSA9IHE7IC8vIGRhdGEgaXMgdGhlIHF1ZXJ5IHN0cmluZyBmb3IgJ3Bvc3QnXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNhbGxiYWNrcyA9IFtdO1xyXG4gICAgaWYgKG9wdGlvbnMucmVzZXRGb3JtKSB7XHJcbiAgICAgICAgY2FsbGJhY2tzLnB1c2goZnVuY3Rpb24oKSB7ICRmb3JtLnJlc2V0Rm9ybSgpOyB9KTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmNsZWFyRm9ybSkge1xyXG4gICAgICAgIGNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uKCkgeyAkZm9ybS5jbGVhckZvcm0ob3B0aW9ucy5pbmNsdWRlSGlkZGVuKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcGVyZm9ybSBhIGxvYWQgb24gdGhlIHRhcmdldCBvbmx5IGlmIGRhdGFUeXBlIGlzIG5vdCBwcm92aWRlZFxyXG4gICAgaWYgKCFvcHRpb25zLmRhdGFUeXBlICYmIG9wdGlvbnMudGFyZ2V0KSB7XHJcbiAgICAgICAgdmFyIG9sZFN1Y2Nlc3MgPSBvcHRpb25zLnN1Y2Nlc3MgfHwgZnVuY3Rpb24oKXt9O1xyXG4gICAgICAgIGNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGZuID0gb3B0aW9ucy5yZXBsYWNlVGFyZ2V0ID8gJ3JlcGxhY2VXaXRoJyA6ICdodG1sJztcclxuICAgICAgICAgICAgJChvcHRpb25zLnRhcmdldClbZm5dKGRhdGEpLmVhY2gob2xkU3VjY2VzcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG9wdGlvbnMuc3VjY2Vzcykge1xyXG4gICAgICAgIGNhbGxiYWNrcy5wdXNoKG9wdGlvbnMuc3VjY2Vzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb3B0aW9ucy5zdWNjZXNzID0gZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCB4aHIpIHsgLy8galF1ZXJ5IDEuNCsgcGFzc2VzIHhociBhcyAzcmQgYXJnXHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSBvcHRpb25zLmNvbnRleHQgfHwgdGhpcyA7ICAgIC8vIGpRdWVyeSAxLjQrIHN1cHBvcnRzIHNjb3BlIGNvbnRleHRcclxuICAgICAgICBmb3IgKHZhciBpPTAsIG1heD1jYWxsYmFja3MubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KGNvbnRleHQsIFtkYXRhLCBzdGF0dXMsIHhociB8fCAkZm9ybSwgJGZvcm1dKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChvcHRpb25zLmVycm9yKSB7XHJcbiAgICAgICAgdmFyIG9sZEVycm9yID0gb3B0aW9ucy5lcnJvcjtcclxuICAgICAgICBvcHRpb25zLmVycm9yID0gZnVuY3Rpb24oeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0IHx8IHRoaXM7XHJcbiAgICAgICAgICAgIG9sZEVycm9yLmFwcGx5KGNvbnRleHQsIFt4aHIsIHN0YXR1cywgZXJyb3IsICRmb3JtXSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAgaWYgKG9wdGlvbnMuY29tcGxldGUpIHtcclxuICAgICAgICB2YXIgb2xkQ29tcGxldGUgPSBvcHRpb25zLmNvbXBsZXRlO1xyXG4gICAgICAgIG9wdGlvbnMuY29tcGxldGUgPSBmdW5jdGlvbih4aHIsIHN0YXR1cykge1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IG9wdGlvbnMuY29udGV4dCB8fCB0aGlzO1xyXG4gICAgICAgICAgICBvbGRDb21wbGV0ZS5hcHBseShjb250ZXh0LCBbeGhyLCBzdGF0dXMsICRmb3JtXSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcmUgdGhlcmUgZmlsZXMgdG8gdXBsb2FkP1xyXG5cclxuICAgIC8vIFt2YWx1ZV0gKGlzc3VlICMxMTMpLCBhbHNvIHNlZSBjb21tZW50OlxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hbHN1cC9mb3JtL2NvbW1pdC81ODgzMDZhZWRiYTFkZTAxMzg4MDMyZDVmNDJhNjAxNTllZWE5MjI4I2NvbW1pdGNvbW1lbnQtMjE4MDIxOVxyXG4gICAgdmFyIGZpbGVJbnB1dHMgPSAkKCdpbnB1dFt0eXBlPWZpbGVdOmVuYWJsZWQnLCB0aGlzKS5maWx0ZXIoZnVuY3Rpb24oKSB7IHJldHVybiAkKHRoaXMpLnZhbCgpICE9PSAnJzsgfSk7XHJcblxyXG4gICAgdmFyIGhhc0ZpbGVJbnB1dHMgPSBmaWxlSW5wdXRzLmxlbmd0aCA+IDA7XHJcbiAgICB2YXIgbXAgPSAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSc7XHJcbiAgICB2YXIgbXVsdGlwYXJ0ID0gKCRmb3JtLmF0dHIoJ2VuY3R5cGUnKSA9PSBtcCB8fCAkZm9ybS5hdHRyKCdlbmNvZGluZycpID09IG1wKTtcclxuXHJcbiAgICB2YXIgZmlsZUFQSSA9IGZlYXR1cmUuZmlsZWFwaSAmJiBmZWF0dXJlLmZvcm1kYXRhO1xyXG4gICAgbG9nKFwiZmlsZUFQSSA6XCIgKyBmaWxlQVBJKTtcclxuICAgIHZhciBzaG91bGRVc2VGcmFtZSA9IChoYXNGaWxlSW5wdXRzIHx8IG11bHRpcGFydCkgJiYgIWZpbGVBUEk7XHJcblxyXG4gICAgdmFyIGpxeGhyO1xyXG5cclxuICAgIC8vIG9wdGlvbnMuaWZyYW1lIGFsbG93cyB1c2VyIHRvIGZvcmNlIGlmcmFtZSBtb2RlXHJcbiAgICAvLyAwNi1OT1YtMDk6IG5vdyBkZWZhdWx0aW5nIHRvIGlmcmFtZSBtb2RlIGlmIGZpbGUgaW5wdXQgaXMgZGV0ZWN0ZWRcclxuICAgIGlmIChvcHRpb25zLmlmcmFtZSAhPT0gZmFsc2UgJiYgKG9wdGlvbnMuaWZyYW1lIHx8IHNob3VsZFVzZUZyYW1lKSkge1xyXG4gICAgICAgIC8vIGhhY2sgdG8gZml4IFNhZmFyaSBoYW5nICh0aGFua3MgdG8gVGltIE1vbGVuZGlqayBmb3IgdGhpcylcclxuICAgICAgICAvLyBzZWU6ICBodHRwOi8vZ3JvdXBzLmdvb2dsZS5jb20vZ3JvdXAvanF1ZXJ5LWRldi9icm93c2VfdGhyZWFkL3RocmVhZC8zNjM5NWI3YWI1MTBkZDVkXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuY2xvc2VLZWVwQWxpdmUpIHtcclxuICAgICAgICAgICAgJC5nZXQob3B0aW9ucy5jbG9zZUtlZXBBbGl2ZSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBqcXhociA9IGZpbGVVcGxvYWRJZnJhbWUoYSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAganF4aHIgPSBmaWxlVXBsb2FkSWZyYW1lKGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKChoYXNGaWxlSW5wdXRzIHx8IG11bHRpcGFydCkgJiYgZmlsZUFQSSkge1xyXG4gICAgICAgIGpxeGhyID0gZmlsZVVwbG9hZFhocihhKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGpxeGhyID0gJC5hamF4KG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgICRmb3JtLnJlbW92ZURhdGEoJ2pxeGhyJykuZGF0YSgnanF4aHInLCBqcXhocik7XHJcblxyXG4gICAgLy8gY2xlYXIgZWxlbWVudCBhcnJheVxyXG4gICAgZm9yICh2YXIgaz0wOyBrIDwgZWxlbWVudHMubGVuZ3RoOyBrKyspXHJcbiAgICAgICAgZWxlbWVudHNba10gPSBudWxsO1xyXG5cclxuICAgIC8vIGZpcmUgJ25vdGlmeScgZXZlbnRcclxuICAgIHRoaXMudHJpZ2dlcignZm9ybS1zdWJtaXQtbm90aWZ5JywgW3RoaXMsIG9wdGlvbnNdKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIC8vIHV0aWxpdHkgZm4gZm9yIGRlZXAgc2VyaWFsaXphdGlvblxyXG4gICAgZnVuY3Rpb24gZGVlcFNlcmlhbGl6ZShleHRyYURhdGEpe1xyXG4gICAgICAgIHZhciBzZXJpYWxpemVkID0gJC5wYXJhbShleHRyYURhdGEsIG9wdGlvbnMudHJhZGl0aW9uYWwpLnNwbGl0KCcmJyk7XHJcbiAgICAgICAgdmFyIGxlbiA9IHNlcmlhbGl6ZWQubGVuZ3RoO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICB2YXIgaSwgcGFydDtcclxuICAgICAgICBmb3IgKGk9MDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vICMyNTI7IHVuZG8gcGFyYW0gc3BhY2UgcmVwbGFjZW1lbnRcclxuICAgICAgICAgICAgc2VyaWFsaXplZFtpXSA9IHNlcmlhbGl6ZWRbaV0ucmVwbGFjZSgvXFwrL2csJyAnKTtcclxuICAgICAgICAgICAgcGFydCA9IHNlcmlhbGl6ZWRbaV0uc3BsaXQoJz0nKTtcclxuICAgICAgICAgICAgLy8gIzI3ODsgdXNlIGFycmF5IGluc3RlYWQgb2Ygb2JqZWN0IHN0b3JhZ2UsIGZhdm9yaW5nIGFycmF5IHNlcmlhbGl6YXRpb25zXHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtkZWNvZGVVUklDb21wb25lbnQocGFydFswXSksIGRlY29kZVVSSUNvbXBvbmVudChwYXJ0WzFdKV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgICAvLyBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyIGZpbGUgdXBsb2FkcyAoYmlnIGhhdCB0aXAgdG8gZnJhbmNvaXMybWV0eilcclxuICAgIGZ1bmN0aW9uIGZpbGVVcGxvYWRYaHIoYSkge1xyXG4gICAgICAgIHZhciBmb3JtZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpPTA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvcm1kYXRhLmFwcGVuZChhW2ldLm5hbWUsIGFbaV0udmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuZXh0cmFEYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXJpYWxpemVkRGF0YSA9IGRlZXBTZXJpYWxpemUob3B0aW9ucy5leHRyYURhdGEpO1xyXG4gICAgICAgICAgICBmb3IgKGk9MDsgaSA8IHNlcmlhbGl6ZWREYXRhLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgaWYgKHNlcmlhbGl6ZWREYXRhW2ldKVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1kYXRhLmFwcGVuZChzZXJpYWxpemVkRGF0YVtpXVswXSwgc2VyaWFsaXplZERhdGFbaV1bMV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3B0aW9ucy5kYXRhID0gbnVsbDtcclxuXHJcbiAgICAgICAgdmFyIHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgJC5hamF4U2V0dGluZ3MsIG9wdGlvbnMsIHtcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgdHlwZTogbWV0aG9kIHx8ICdQT1NUJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy51cGxvYWRQcm9ncmVzcykge1xyXG4gICAgICAgICAgICAvLyB3b3JrYXJvdW5kIGJlY2F1c2UganFYSFIgZG9lcyBub3QgZXhwb3NlIHVwbG9hZCBwcm9wZXJ0eVxyXG4gICAgICAgICAgICBzLnhociA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHhociA9ICQuYWpheFNldHRpbmdzLnhocigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHhoci51cGxvYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBldmVudC5sb2FkZWQgfHwgZXZlbnQucG9zaXRpb247IC8qZXZlbnQucG9zaXRpb24gaXMgZGVwcmVjYXRlZCovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b3RhbCA9IGV2ZW50LnRvdGFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQubGVuZ3RoQ29tcHV0YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyY2VudCA9IE1hdGguY2VpbChwb3NpdGlvbiAvIHRvdGFsICogMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnVwbG9hZFByb2dyZXNzKGV2ZW50LCBwb3NpdGlvbiwgdG90YWwsIHBlcmNlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB4aHI7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzLmRhdGEgPSBudWxsO1xyXG4gICAgICAgIHZhciBiZWZvcmVTZW5kID0gcy5iZWZvcmVTZW5kO1xyXG4gICAgICAgIHMuYmVmb3JlU2VuZCA9IGZ1bmN0aW9uKHhociwgbykge1xyXG4gICAgICAgICAgICAvL1NlbmQgRm9ybURhdGEoKSBwcm92aWRlZCBieSB1c2VyXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmZvcm1EYXRhKVxyXG4gICAgICAgICAgICAgICAgby5kYXRhID0gb3B0aW9ucy5mb3JtRGF0YTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgby5kYXRhID0gZm9ybWRhdGE7XHJcbiAgICAgICAgICAgIGlmKGJlZm9yZVNlbmQpXHJcbiAgICAgICAgICAgICAgICBiZWZvcmVTZW5kLmNhbGwodGhpcywgeGhyLCBvKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiAkLmFqYXgocyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJpdmF0ZSBmdW5jdGlvbiBmb3IgaGFuZGxpbmcgZmlsZSB1cGxvYWRzIChoYXQgdGlwIHRvIFlBSE9PISlcclxuICAgIGZ1bmN0aW9uIGZpbGVVcGxvYWRJZnJhbWUoYSkge1xyXG4gICAgICAgIHZhciBmb3JtID0gJGZvcm1bMF0sIGVsLCBpLCBzLCBnLCBpZCwgJGlvLCBpbywgeGhyLCBzdWIsIG4sIHRpbWVkT3V0LCB0aW1lb3V0SGFuZGxlO1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgLy8gIzM0MVxyXG4gICAgICAgIGRlZmVycmVkLmFib3J0ID0gZnVuY3Rpb24oc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHhoci5hYm9ydChzdGF0dXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChhKSB7XHJcbiAgICAgICAgICAgIC8vIGVuc3VyZSB0aGF0IGV2ZXJ5IHNlcmlhbGl6ZWQgaW5wdXQgaXMgc3RpbGwgZW5hYmxlZFxyXG4gICAgICAgICAgICBmb3IgKGk9MDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBlbCA9ICQoZWxlbWVudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCBoYXNQcm9wIClcclxuICAgICAgICAgICAgICAgICAgICBlbC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzID0gJC5leHRlbmQodHJ1ZSwge30sICQuYWpheFNldHRpbmdzLCBvcHRpb25zKTtcclxuICAgICAgICBzLmNvbnRleHQgPSBzLmNvbnRleHQgfHwgcztcclxuICAgICAgICBpZCA9ICdqcUZvcm1JTycgKyAobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xyXG4gICAgICAgIGlmIChzLmlmcmFtZVRhcmdldCkge1xyXG4gICAgICAgICAgICAkaW8gPSAkKHMuaWZyYW1lVGFyZ2V0KTtcclxuICAgICAgICAgICAgbiA9ICRpby5hdHRyMignbmFtZScpO1xyXG4gICAgICAgICAgICBpZiAoIW4pXHJcbiAgICAgICAgICAgICAgICAgJGlvLmF0dHIyKCduYW1lJywgaWQpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBpZCA9IG47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkaW8gPSAkKCc8aWZyYW1lIG5hbWU9XCInICsgaWQgKyAnXCIgc3JjPVwiJysgcy5pZnJhbWVTcmMgKydcIiAvPicpO1xyXG4gICAgICAgICAgICAkaW8uY3NzKHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJy0xMDAwcHgnLCBsZWZ0OiAnLTEwMDBweCcgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlvID0gJGlvWzBdO1xyXG5cclxuXHJcbiAgICAgICAgeGhyID0geyAvLyBtb2NrIG9iamVjdFxyXG4gICAgICAgICAgICBhYm9ydGVkOiAwLFxyXG4gICAgICAgICAgICByZXNwb25zZVRleHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlWE1MOiBudWxsLFxyXG4gICAgICAgICAgICBzdGF0dXM6IDAsXHJcbiAgICAgICAgICAgIHN0YXR1c1RleHQ6ICduL2EnLFxyXG4gICAgICAgICAgICBnZXRBbGxSZXNwb25zZUhlYWRlcnM6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgIGdldFJlc3BvbnNlSGVhZGVyOiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICBzZXRSZXF1ZXN0SGVhZGVyOiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICBhYm9ydDogZnVuY3Rpb24oc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZSA9IChzdGF0dXMgPT09ICd0aW1lb3V0JyA/ICd0aW1lb3V0JyA6ICdhYm9ydGVkJyk7XHJcbiAgICAgICAgICAgICAgICBsb2coJ2Fib3J0aW5nIHVwbG9hZC4uLiAnICsgZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFib3J0ZWQgPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7IC8vICMyMTQsICMyNTdcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW8uY29udGVudFdpbmRvdy5kb2N1bWVudC5leGVjQ29tbWFuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpby5jb250ZW50V2luZG93LmRvY3VtZW50LmV4ZWNDb21tYW5kKCdTdG9wJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2goaWdub3JlKSB7fVxyXG5cclxuICAgICAgICAgICAgICAgICRpby5hdHRyKCdzcmMnLCBzLmlmcmFtZVNyYyk7IC8vIGFib3J0IG9wIGluIHByb2dyZXNzXHJcbiAgICAgICAgICAgICAgICB4aHIuZXJyb3IgPSBlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHMuZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgcy5lcnJvci5jYWxsKHMuY29udGV4dCwgeGhyLCBlLCBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGcpXHJcbiAgICAgICAgICAgICAgICAgICAgJC5ldmVudC50cmlnZ2VyKFwiYWpheEVycm9yXCIsIFt4aHIsIHMsIGVdKTtcclxuICAgICAgICAgICAgICAgIGlmIChzLmNvbXBsZXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIHMuY29tcGxldGUuY2FsbChzLmNvbnRleHQsIHhociwgZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBnID0gcy5nbG9iYWw7XHJcbiAgICAgICAgLy8gdHJpZ2dlciBhamF4IGdsb2JhbCBldmVudHMgc28gdGhhdCBhY3Rpdml0eS9ibG9jayBpbmRpY2F0b3JzIHdvcmsgbGlrZSBub3JtYWxcclxuICAgICAgICBpZiAoZyAmJiAwID09PSAkLmFjdGl2ZSsrKSB7XHJcbiAgICAgICAgICAgICQuZXZlbnQudHJpZ2dlcihcImFqYXhTdGFydFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGcpIHtcclxuICAgICAgICAgICAgJC5ldmVudC50cmlnZ2VyKFwiYWpheFNlbmRcIiwgW3hociwgc10pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHMuYmVmb3JlU2VuZCAmJiBzLmJlZm9yZVNlbmQuY2FsbChzLmNvbnRleHQsIHhociwgcykgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGlmIChzLmdsb2JhbCkge1xyXG4gICAgICAgICAgICAgICAgJC5hY3RpdmUtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeGhyLmFib3J0ZWQpIHtcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGFkZCBzdWJtaXR0aW5nIGVsZW1lbnQgdG8gZGF0YSBpZiB3ZSBrbm93IGl0XHJcbiAgICAgICAgc3ViID0gZm9ybS5jbGs7XHJcbiAgICAgICAgaWYgKHN1Yikge1xyXG4gICAgICAgICAgICBuID0gc3ViLm5hbWU7XHJcbiAgICAgICAgICAgIGlmIChuICYmICFzdWIuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIHMuZXh0cmFEYXRhID0gcy5leHRyYURhdGEgfHwge307XHJcbiAgICAgICAgICAgICAgICBzLmV4dHJhRGF0YVtuXSA9IHN1Yi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChzdWIudHlwZSA9PSBcImltYWdlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzLmV4dHJhRGF0YVtuKycueCddID0gZm9ybS5jbGtfeDtcclxuICAgICAgICAgICAgICAgICAgICBzLmV4dHJhRGF0YVtuKycueSddID0gZm9ybS5jbGtfeTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIENMSUVOVF9USU1FT1VUX0FCT1JUID0gMTtcclxuICAgICAgICB2YXIgU0VSVkVSX0FCT1JUID0gMjtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERvYyhmcmFtZSkge1xyXG4gICAgICAgICAgICAvKiBpdCBsb29rcyBsaWtlIGNvbnRlbnRXaW5kb3cgb3IgY29udGVudERvY3VtZW50IGRvIG5vdFxyXG4gICAgICAgICAgICAgKiBjYXJyeSB0aGUgcHJvdG9jb2wgcHJvcGVydHkgaW4gaWU4LCB3aGVuIHJ1bm5pbmcgdW5kZXIgc3NsXHJcbiAgICAgICAgICAgICAqIGZyYW1lLmRvY3VtZW50IGlzIHRoZSBvbmx5IHZhbGlkIHJlc3BvbnNlIGRvY3VtZW50LCBzaW5jZVxyXG4gICAgICAgICAgICAgKiB0aGUgcHJvdG9jb2wgaXMga25vdyBidXQgbm90IG9uIHRoZSBvdGhlciB0d28gb2JqZWN0cy4gc3RyYW5nZT9cclxuICAgICAgICAgICAgICogXCJTYW1lIG9yaWdpbiBwb2xpY3lcIiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NhbWVfb3JpZ2luX3BvbGljeVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBkb2MgPSBudWxsO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gSUU4IGNhc2NhZGluZyBhY2Nlc3MgY2hlY2tcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChmcmFtZS5jb250ZW50V2luZG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jID0gZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICAgICAgICAgIC8vIElFOCBhY2Nlc3MgZGVuaWVkIHVuZGVyIHNzbCAmIG1pc3NpbmcgcHJvdG9jb2xcclxuICAgICAgICAgICAgICAgIGxvZygnY2Fubm90IGdldCBpZnJhbWUuY29udGVudFdpbmRvdyBkb2N1bWVudDogJyArIGVycik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkb2MpIHsgLy8gc3VjY2Vzc2Z1bCBnZXR0aW5nIGNvbnRlbnRcclxuICAgICAgICAgICAgICAgIHJldHVybiBkb2M7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRyeSB7IC8vIHNpbXBseSBjaGVja2luZyBtYXkgdGhyb3cgaW4gaWU4IHVuZGVyIHNzbCBvciBtaXNtYXRjaGVkIHByb3RvY29sXHJcbiAgICAgICAgICAgICAgICBkb2MgPSBmcmFtZS5jb250ZW50RG9jdW1lbnQgPyBmcmFtZS5jb250ZW50RG9jdW1lbnQgOiBmcmFtZS5kb2N1bWVudDtcclxuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICAgICAgICAgIC8vIGxhc3QgYXR0ZW1wdFxyXG4gICAgICAgICAgICAgICAgbG9nKCdjYW5ub3QgZ2V0IGlmcmFtZS5jb250ZW50RG9jdW1lbnQ6ICcgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgZG9jID0gZnJhbWUuZG9jdW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRvYztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJhaWxzIENTUkYgaGFjayAodGhhbmtzIHRvIFl2YW4gQmFydGhlbGVteSlcclxuICAgICAgICB2YXIgY3NyZl90b2tlbiA9ICQoJ21ldGFbbmFtZT1jc3JmLXRva2VuXScpLmF0dHIoJ2NvbnRlbnQnKTtcclxuICAgICAgICB2YXIgY3NyZl9wYXJhbSA9ICQoJ21ldGFbbmFtZT1jc3JmLXBhcmFtXScpLmF0dHIoJ2NvbnRlbnQnKTtcclxuICAgICAgICBpZiAoY3NyZl9wYXJhbSAmJiBjc3JmX3Rva2VuKSB7XHJcbiAgICAgICAgICAgIHMuZXh0cmFEYXRhID0gcy5leHRyYURhdGEgfHwge307XHJcbiAgICAgICAgICAgIHMuZXh0cmFEYXRhW2NzcmZfcGFyYW1dID0gY3NyZl90b2tlbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRha2UgYSBicmVhdGggc28gdGhhdCBwZW5kaW5nIHJlcGFpbnRzIGdldCBzb21lIGNwdSB0aW1lIGJlZm9yZSB0aGUgdXBsb2FkIHN0YXJ0c1xyXG4gICAgICAgIGZ1bmN0aW9uIGRvU3VibWl0KCkge1xyXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgZm9ybSBhdHRycyBhcmUgc2V0XHJcbiAgICAgICAgICAgIHZhciB0ID0gJGZvcm0uYXR0cjIoJ3RhcmdldCcpLCBhID0gJGZvcm0uYXR0cjIoJ2FjdGlvbicpO1xyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlIGZvcm0gYXR0cnMgaW4gSUUgZnJpZW5kbHkgd2F5XHJcbiAgICAgICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCd0YXJnZXQnLGlkKTtcclxuICAgICAgICAgICAgaWYgKCFtZXRob2QgfHwgL3Bvc3QvaS50ZXN0KG1ldGhvZCkgKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywgJ1BPU1QnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYSAhPSBzLnVybCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicsIHMudXJsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWUgYm9ya3MgaW4gc29tZSBjYXNlcyB3aGVuIHNldHRpbmcgZW5jb2RpbmdcclxuICAgICAgICAgICAgaWYgKCEgcy5za2lwRW5jb2RpbmdPdmVycmlkZSAmJiAoIW1ldGhvZCB8fCAvcG9zdC9pLnRlc3QobWV0aG9kKSkpIHtcclxuICAgICAgICAgICAgICAgICRmb3JtLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuY29kaW5nOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5jdHlwZTogICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHN1cHBvcnQgdGltb3V0XHJcbiAgICAgICAgICAgIGlmIChzLnRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIHRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0aW1lZE91dCA9IHRydWU7IGNiKENMSUVOVF9USU1FT1VUX0FCT1JUKTsgfSwgcy50aW1lb3V0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gbG9vayBmb3Igc2VydmVyIGFib3J0c1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja1N0YXRlKCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBnZXREb2MoaW8pLnJlYWR5U3RhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nKCdzdGF0ZSA9ICcgKyBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlICYmIHN0YXRlLnRvTG93ZXJDYXNlKCkgPT0gJ3VuaW5pdGlhbGl6ZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNoZWNrU3RhdGUsNTApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZygnU2VydmVyIGFib3J0OiAnICwgZSwgJyAoJywgZS5uYW1lLCAnKScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNiKFNFUlZFUl9BQk9SVCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWVvdXRIYW5kbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SGFuZGxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0SGFuZGxlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgXCJleHRyYVwiIGRhdGEgdG8gZm9ybSBpZiBwcm92aWRlZCBpbiBvcHRpb25zXHJcbiAgICAgICAgICAgIHZhciBleHRyYUlucHV0cyA9IFtdO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHMuZXh0cmFEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbiBpbiBzLmV4dHJhRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5leHRyYURhdGEuaGFzT3duUHJvcGVydHkobikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdXNpbmcgdGhlICQucGFyYW0gZm9ybWF0IHRoYXQgYWxsb3dzIGZvciBtdWx0aXBsZSB2YWx1ZXMgd2l0aCB0aGUgc2FtZSBuYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCQuaXNQbGFpbk9iamVjdChzLmV4dHJhRGF0YVtuXSkgJiYgcy5leHRyYURhdGFbbl0uaGFzT3duUHJvcGVydHkoJ25hbWUnKSAmJiBzLmV4dHJhRGF0YVtuXS5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFJbnB1dHMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIicrcy5leHRyYURhdGFbbl0ubmFtZSsnXCI+JykudmFsKHMuZXh0cmFEYXRhW25dLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhmb3JtKVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYUlucHV0cy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiJytuKydcIj4nKS52YWwocy5leHRyYURhdGFbbl0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKGZvcm0pWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghcy5pZnJhbWVUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgaWZyYW1lIHRvIGRvYyBhbmQgc3VibWl0IHRoZSBmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgJGlvLmFwcGVuZFRvKCdib2R5Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaW8uYXR0YWNoRXZlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgaW8uYXR0YWNoRXZlbnQoJ29ubG9hZCcsIGNiKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBpby5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgY2IsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2hlY2tTdGF0ZSwxNSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBqdXN0IGluIGNhc2UgZm9ybSBoYXMgZWxlbWVudCB3aXRoIG5hbWUvaWQgb2YgJ3N1Ym1pdCdcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VibWl0Rm4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJykuc3VibWl0O1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pdEZuLmFwcGx5KGZvcm0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgYXR0cnMgYW5kIHJlbW92ZSBcImV4dHJhXCIgaW5wdXQgZWxlbWVudHNcclxuICAgICAgICAgICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCdhY3Rpb24nLGEpO1xyXG4gICAgICAgICAgICAgICAgaWYodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCd0YXJnZXQnLCB0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGZvcm0ucmVtb3ZlQXR0cigndGFyZ2V0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkKGV4dHJhSW5wdXRzKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHMuZm9yY2VTeW5jKSB7XHJcbiAgICAgICAgICAgIGRvU3VibWl0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGRvU3VibWl0LCAxMCk7IC8vIHRoaXMgbGV0cyBkb20gdXBkYXRlcyByZW5kZXJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBkYXRhLCBkb2MsIGRvbUNoZWNrQ291bnQgPSA1MCwgY2FsbGJhY2tQcm9jZXNzZWQ7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNiKGUpIHtcclxuICAgICAgICAgICAgaWYgKHhoci5hYm9ydGVkIHx8IGNhbGxiYWNrUHJvY2Vzc2VkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRvYyA9IGdldERvYyhpbyk7XHJcbiAgICAgICAgICAgIGlmKCFkb2MpIHtcclxuICAgICAgICAgICAgICAgIGxvZygnY2Fubm90IGFjY2VzcyByZXNwb25zZSBkb2N1bWVudCcpO1xyXG4gICAgICAgICAgICAgICAgZSA9IFNFUlZFUl9BQk9SVDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZSA9PT0gQ0xJRU5UX1RJTUVPVVRfQUJPUlQgJiYgeGhyKSB7XHJcbiAgICAgICAgICAgICAgICB4aHIuYWJvcnQoJ3RpbWVvdXQnKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh4aHIsICd0aW1lb3V0Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZSA9PSBTRVJWRVJfQUJPUlQgJiYgeGhyKSB7XHJcbiAgICAgICAgICAgICAgICB4aHIuYWJvcnQoJ3NlcnZlciBhYm9ydCcpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHhociwgJ2Vycm9yJywgJ3NlcnZlciBhYm9ydCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWRvYyB8fCBkb2MubG9jYXRpb24uaHJlZiA9PSBzLmlmcmFtZVNyYykge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVzcG9uc2Ugbm90IHJlY2VpdmVkIHlldFxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aW1lZE91dClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlvLmRldGFjaEV2ZW50KVxyXG4gICAgICAgICAgICAgICAgaW8uZGV0YWNoRXZlbnQoJ29ubG9hZCcsIGNiKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgaW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIGNiLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc3RhdHVzID0gJ3N1Y2Nlc3MnLCBlcnJNc2c7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGltZWRPdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyAndGltZW91dCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGlzWG1sID0gcy5kYXRhVHlwZSA9PSAneG1sJyB8fCBkb2MuWE1MRG9jdW1lbnQgfHwgJC5pc1hNTERvYyhkb2MpO1xyXG4gICAgICAgICAgICAgICAgbG9nKCdpc1htbD0nK2lzWG1sKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNYbWwgJiYgd2luZG93Lm9wZXJhICYmIChkb2MuYm9keSA9PT0gbnVsbCB8fCAhZG9jLmJvZHkuaW5uZXJIVE1MKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgtLWRvbUNoZWNrQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW4gc29tZSBicm93c2VycyAoT3BlcmEpIHRoZSBpZnJhbWUgRE9NIGlzIG5vdCBhbHdheXMgdHJhdmVyc2FibGUgd2hlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgb25sb2FkIGNhbGxiYWNrIGZpcmVzLCBzbyB3ZSBsb29wIGEgYml0IHRvIGFjY29tbW9kYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZygncmVxdWVpbmcgb25Mb2FkIGNhbGxiYWNrLCBET00gbm90IGF2YWlsYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNiLCAyNTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCB0aGlzIGZhbGwgdGhyb3VnaCBiZWNhdXNlIHNlcnZlciByZXNwb25zZSBjb3VsZCBiZSBhbiBlbXB0eSBkb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbG9nKCdDb3VsZCBub3QgYWNjZXNzIGlmcmFtZSBET00gYWZ0ZXIgbXV0aXBsZSB0cmllcy4nKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3Rocm93ICdET01FeGNlcHRpb246IG5vdCBhdmFpbGFibGUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vbG9nKCdyZXNwb25zZSBkZXRlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRvY1Jvb3QgPSBkb2MuYm9keSA/IGRvYy5ib2R5IDogZG9jLmRvY3VtZW50RWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHhoci5yZXNwb25zZVRleHQgPSBkb2NSb290ID8gZG9jUm9vdC5pbm5lckhUTUwgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlWE1MID0gZG9jLlhNTERvY3VtZW50ID8gZG9jLlhNTERvY3VtZW50IDogZG9jO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzWG1sKVxyXG4gICAgICAgICAgICAgICAgICAgIHMuZGF0YVR5cGUgPSAneG1sJztcclxuICAgICAgICAgICAgICAgIHhoci5nZXRSZXNwb25zZUhlYWRlciA9IGZ1bmN0aW9uKGhlYWRlcil7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhlYWRlcnMgPSB7J2NvbnRlbnQtdHlwZSc6IHMuZGF0YVR5cGV9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoZWFkZXJzW2hlYWRlci50b0xvd2VyQ2FzZSgpXTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvLyBzdXBwb3J0IGZvciBYSFIgJ3N0YXR1cycgJiAnc3RhdHVzVGV4dCcgZW11bGF0aW9uIDpcclxuICAgICAgICAgICAgICAgIGlmIChkb2NSb290KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeGhyLnN0YXR1cyA9IE51bWJlciggZG9jUm9vdC5nZXRBdHRyaWJ1dGUoJ3N0YXR1cycpICkgfHwgeGhyLnN0YXR1cztcclxuICAgICAgICAgICAgICAgICAgICB4aHIuc3RhdHVzVGV4dCA9IGRvY1Jvb3QuZ2V0QXR0cmlidXRlKCdzdGF0dXNUZXh0JykgfHwgeGhyLnN0YXR1c1RleHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGR0ID0gKHMuZGF0YVR5cGUgfHwgJycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2NyID0gLyhqc29ufHNjcmlwdHx0ZXh0KS8udGVzdChkdCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2NyIHx8IHMudGV4dGFyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZWUgaWYgdXNlciBlbWJlZGRlZCByZXNwb25zZSBpbiB0ZXh0YXJlYVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YSA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGV4dGFyZWEnKVswXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVGV4dCA9IHRhLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdXBwb3J0IGZvciBYSFIgJ3N0YXR1cycgJiAnc3RhdHVzVGV4dCcgZW11bGF0aW9uIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnN0YXR1cyA9IE51bWJlciggdGEuZ2V0QXR0cmlidXRlKCdzdGF0dXMnKSApIHx8IHhoci5zdGF0dXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zdGF0dXNUZXh0ID0gdGEuZ2V0QXR0cmlidXRlKCdzdGF0dXNUZXh0JykgfHwgeGhyLnN0YXR1c1RleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhY2NvdW50IGZvciBicm93c2VycyBpbmplY3RpbmcgcHJlIGFyb3VuZCBqc29uIHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmUgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3ByZScpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYiA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIucmVzcG9uc2VUZXh0ID0gcHJlLnRleHRDb250ZW50ID8gcHJlLnRleHRDb250ZW50IDogcHJlLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIucmVzcG9uc2VUZXh0ID0gYi50ZXh0Q29udGVudCA/IGIudGV4dENvbnRlbnQgOiBiLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGR0ID09ICd4bWwnICYmICF4aHIucmVzcG9uc2VYTUwgJiYgeGhyLnJlc3BvbnNlVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHhoci5yZXNwb25zZVhNTCA9IHRvWG1sKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGh0dHBEYXRhKHhociwgZHQsIHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1cyA9ICdwYXJzZXJlcnJvcic7XHJcbiAgICAgICAgICAgICAgICAgICAgeGhyLmVycm9yID0gZXJyTXNnID0gKGVyciB8fCBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGxvZygnZXJyb3IgY2F1Z2h0OiAnLGVycik7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSAnZXJyb3InO1xyXG4gICAgICAgICAgICAgICAgeGhyLmVycm9yID0gZXJyTXNnID0gKGVyciB8fCBzdGF0dXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoeGhyLmFib3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGxvZygndXBsb2FkIGFib3J0ZWQnKTtcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzKSB7IC8vIHdlJ3ZlIHNldCB4aHIuc3RhdHVzXHJcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCB8fCB4aHIuc3RhdHVzID09PSAzMDQpID8gJ3N1Y2Nlc3MnIDogJ2Vycm9yJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gb3JkZXJpbmcgb2YgdGhlc2UgY2FsbGJhY2tzL3RyaWdnZXJzIGlzIG9kZCwgYnV0IHRoYXQncyBob3cgJC5hamF4IGRvZXMgaXRcclxuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocy5zdWNjZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgIHMuc3VjY2Vzcy5jYWxsKHMuY29udGV4dCwgZGF0YSwgJ3N1Y2Nlc3MnLCB4aHIpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0LCAnc3VjY2VzcycsIHhocik7XHJcbiAgICAgICAgICAgICAgICBpZiAoZylcclxuICAgICAgICAgICAgICAgICAgICAkLmV2ZW50LnRyaWdnZXIoXCJhamF4U3VjY2Vzc1wiLCBbeGhyLCBzXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyTXNnID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyTXNnID0geGhyLnN0YXR1c1RleHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAocy5lcnJvcilcclxuICAgICAgICAgICAgICAgICAgICBzLmVycm9yLmNhbGwocy5jb250ZXh0LCB4aHIsIHN0YXR1cywgZXJyTXNnKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh4aHIsICdlcnJvcicsIGVyck1zZyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZylcclxuICAgICAgICAgICAgICAgICAgICAkLmV2ZW50LnRyaWdnZXIoXCJhamF4RXJyb3JcIiwgW3hociwgcywgZXJyTXNnXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChnKVxyXG4gICAgICAgICAgICAgICAgJC5ldmVudC50cmlnZ2VyKFwiYWpheENvbXBsZXRlXCIsIFt4aHIsIHNdKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChnICYmICEgLS0kLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgJC5ldmVudC50cmlnZ2VyKFwiYWpheFN0b3BcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzLmNvbXBsZXRlKVxyXG4gICAgICAgICAgICAgICAgcy5jb21wbGV0ZS5jYWxsKHMuY29udGV4dCwgeGhyLCBzdGF0dXMpO1xyXG5cclxuICAgICAgICAgICAgY2FsbGJhY2tQcm9jZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAocy50aW1lb3V0KVxyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRIYW5kbGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gY2xlYW4gdXBcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICghcy5pZnJhbWVUYXJnZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgJGlvLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSAgLy9hZGRpbmcgZWxzZSB0byBjbGVhbiB1cCBleGlzdGluZyBpZnJhbWUgcmVzcG9uc2UuXHJcbiAgICAgICAgICAgICAgICAgICAgJGlvLmF0dHIoJ3NyYycsIHMuaWZyYW1lU3JjKTtcclxuICAgICAgICAgICAgICAgIHhoci5yZXNwb25zZVhNTCA9IG51bGw7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdG9YbWwgPSAkLnBhcnNlWE1MIHx8IGZ1bmN0aW9uKHMsIGRvYykgeyAvLyB1c2UgcGFyc2VYTUwgaWYgYXZhaWxhYmxlIChqUXVlcnkgMS41KylcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5BY3RpdmVYT2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBkb2MgPSBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTERPTScpO1xyXG4gICAgICAgICAgICAgICAgZG9jLmFzeW5jID0gJ2ZhbHNlJztcclxuICAgICAgICAgICAgICAgIGRvYy5sb2FkWE1MKHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZG9jID0gKG5ldyBET01QYXJzZXIoKSkucGFyc2VGcm9tU3RyaW5nKHMsICd0ZXh0L3htbCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAoZG9jICYmIGRvYy5kb2N1bWVudEVsZW1lbnQgJiYgZG9jLmRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSAhPSAncGFyc2VyZXJyb3InKSA/IGRvYyA6IG51bGw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgcGFyc2VKU09OID0gJC5wYXJzZUpTT04gfHwgZnVuY3Rpb24ocykge1xyXG4gICAgICAgICAgICAvKmpzbGludCBldmlsOnRydWUgKi9cclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvd1snZXZhbCddKCcoJyArIHMgKyAnKScpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBodHRwRGF0YSA9IGZ1bmN0aW9uKCB4aHIsIHR5cGUsIHMgKSB7IC8vIG1vc3RseSBsaWZ0ZWQgZnJvbSBqcTEuNC40XHJcblxyXG4gICAgICAgICAgICB2YXIgY3QgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ2NvbnRlbnQtdHlwZScpIHx8ICcnLFxyXG4gICAgICAgICAgICAgICAgeG1sID0gdHlwZSA9PT0gJ3htbCcgfHwgIXR5cGUgJiYgY3QuaW5kZXhPZigneG1sJykgPj0gMCxcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB4bWwgPyB4aHIucmVzcG9uc2VYTUwgOiB4aHIucmVzcG9uc2VUZXh0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHhtbCAmJiBkYXRhLmRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSA9PT0gJ3BhcnNlcmVycm9yJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQuZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgJC5lcnJvcigncGFyc2VyZXJyb3InKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocyAmJiBzLmRhdGFGaWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBzLmRhdGFGaWx0ZXIoZGF0YSwgdHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdqc29uJyB8fCAhdHlwZSAmJiBjdC5pbmRleE9mKCdqc29uJykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBwYXJzZUpTT04oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwic2NyaXB0XCIgfHwgIXR5cGUgJiYgY3QuaW5kZXhPZihcImphdmFzY3JpcHRcIikgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQuZ2xvYmFsRXZhbChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogYWpheEZvcm0oKSBwcm92aWRlcyBhIG1lY2hhbmlzbSBmb3IgZnVsbHkgYXV0b21hdGluZyBmb3JtIHN1Ym1pc3Npb24uXHJcbiAqXHJcbiAqIFRoZSBhZHZhbnRhZ2VzIG9mIHVzaW5nIHRoaXMgbWV0aG9kIGluc3RlYWQgb2YgYWpheFN1Ym1pdCgpIGFyZTpcclxuICpcclxuICogMTogVGhpcyBtZXRob2Qgd2lsbCBpbmNsdWRlIGNvb3JkaW5hdGVzIGZvciA8aW5wdXQgdHlwZT1cImltYWdlXCIgLz4gZWxlbWVudHMgKGlmIHRoZSBlbGVtZW50XHJcbiAqICAgIGlzIHVzZWQgdG8gc3VibWl0IHRoZSBmb3JtKS5cclxuICogMi4gVGhpcyBtZXRob2Qgd2lsbCBpbmNsdWRlIHRoZSBzdWJtaXQgZWxlbWVudCdzIG5hbWUvdmFsdWUgZGF0YSAoZm9yIHRoZSBlbGVtZW50IHRoYXQgd2FzXHJcbiAqICAgIHVzZWQgdG8gc3VibWl0IHRoZSBmb3JtKS5cclxuICogMy4gVGhpcyBtZXRob2QgYmluZHMgdGhlIHN1Ym1pdCgpIG1ldGhvZCB0byB0aGUgZm9ybSBmb3IgeW91LlxyXG4gKlxyXG4gKiBUaGUgb3B0aW9ucyBhcmd1bWVudCBmb3IgYWpheEZvcm0gd29ya3MgZXhhY3RseSBhcyBpdCBkb2VzIGZvciBhamF4U3VibWl0LiAgYWpheEZvcm0gbWVyZWx5XHJcbiAqIHBhc3NlcyB0aGUgb3B0aW9ucyBhcmd1bWVudCBhbG9uZyBhZnRlciBwcm9wZXJseSBiaW5kaW5nIGV2ZW50cyBmb3Igc3VibWl0IGVsZW1lbnRzIGFuZFxyXG4gKiB0aGUgZm9ybSBpdHNlbGYuXHJcbiAqL1xyXG4kLmZuLmFqYXhGb3JtID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICBvcHRpb25zLmRlbGVnYXRpb24gPSBvcHRpb25zLmRlbGVnYXRpb24gJiYgJC5pc0Z1bmN0aW9uKCQuZm4ub24pO1xyXG5cclxuICAgIC8vIGluIGpRdWVyeSAxLjMrIHdlIGNhbiBmaXggbWlzdGFrZXMgd2l0aCB0aGUgcmVhZHkgc3RhdGVcclxuICAgIGlmICghb3B0aW9ucy5kZWxlZ2F0aW9uICYmIHRoaXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgdmFyIG8gPSB7IHM6IHRoaXMuc2VsZWN0b3IsIGM6IHRoaXMuY29udGV4dCB9O1xyXG4gICAgICAgIGlmICghJC5pc1JlYWR5ICYmIG8ucykge1xyXG4gICAgICAgICAgICBsb2coJ0RPTSBub3QgcmVhZHksIHF1ZXVpbmcgYWpheEZvcm0nKTtcclxuICAgICAgICAgICAgJChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQoby5zLG8uYykuYWpheEZvcm0ob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaXMgeW91ciBET00gcmVhZHk/ICBodHRwOi8vZG9jcy5qcXVlcnkuY29tL1R1dG9yaWFsczpJbnRyb2R1Y2luZ18kKGRvY3VtZW50KS5yZWFkeSgpXHJcbiAgICAgICAgbG9nKCd0ZXJtaW5hdGluZzsgemVybyBlbGVtZW50cyBmb3VuZCBieSBzZWxlY3RvcicgKyAoJC5pc1JlYWR5ID8gJycgOiAnIChET00gbm90IHJlYWR5KScpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIG9wdGlvbnMuZGVsZWdhdGlvbiApIHtcclxuICAgICAgICAkKGRvY3VtZW50KVxyXG4gICAgICAgICAgICAub2ZmKCdzdWJtaXQuZm9ybS1wbHVnaW4nLCB0aGlzLnNlbGVjdG9yLCBkb0FqYXhTdWJtaXQpXHJcbiAgICAgICAgICAgIC5vZmYoJ2NsaWNrLmZvcm0tcGx1Z2luJywgdGhpcy5zZWxlY3RvciwgY2FwdHVyZVN1Ym1pdHRpbmdFbGVtZW50KVxyXG4gICAgICAgICAgICAub24oJ3N1Ym1pdC5mb3JtLXBsdWdpbicsIHRoaXMuc2VsZWN0b3IsIG9wdGlvbnMsIGRvQWpheFN1Ym1pdClcclxuICAgICAgICAgICAgLm9uKCdjbGljay5mb3JtLXBsdWdpbicsIHRoaXMuc2VsZWN0b3IsIG9wdGlvbnMsIGNhcHR1cmVTdWJtaXR0aW5nRWxlbWVudCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuYWpheEZvcm1VbmJpbmQoKVxyXG4gICAgICAgIC5iaW5kKCdzdWJtaXQuZm9ybS1wbHVnaW4nLCBvcHRpb25zLCBkb0FqYXhTdWJtaXQpXHJcbiAgICAgICAgLmJpbmQoJ2NsaWNrLmZvcm0tcGx1Z2luJywgb3B0aW9ucywgY2FwdHVyZVN1Ym1pdHRpbmdFbGVtZW50KTtcclxufTtcclxuXHJcbi8vIHByaXZhdGUgZXZlbnQgaGFuZGxlcnNcclxuZnVuY3Rpb24gZG9BamF4U3VibWl0KGUpIHtcclxuICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXHJcbiAgICB2YXIgb3B0aW9ucyA9IGUuZGF0YTtcclxuICAgIGlmICghZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgeyAvLyBpZiBldmVudCBoYXMgYmVlbiBjYW5jZWxlZCwgZG9uJ3QgcHJvY2VlZFxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkKGUudGFyZ2V0KS5hamF4U3VibWl0KG9wdGlvbnMpOyAvLyAjMzY1XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhcHR1cmVTdWJtaXR0aW5nRWxlbWVudChlKSB7XHJcbiAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xyXG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG4gICAgdmFyICRlbCA9ICQodGFyZ2V0KTtcclxuICAgIGlmICghKCRlbC5pcyhcIlt0eXBlPXN1Ym1pdF0sW3R5cGU9aW1hZ2VdXCIpKSkge1xyXG4gICAgICAgIC8vIGlzIHRoaXMgYSBjaGlsZCBlbGVtZW50IG9mIHRoZSBzdWJtaXQgZWw/ICAoZXg6IGEgc3BhbiB3aXRoaW4gYSBidXR0b24pXHJcbiAgICAgICAgdmFyIHQgPSAkZWwuY2xvc2VzdCgnW3R5cGU9c3VibWl0XScpO1xyXG4gICAgICAgIGlmICh0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhcmdldCA9IHRbMF07XHJcbiAgICB9XHJcbiAgICB2YXIgZm9ybSA9IHRoaXM7XHJcbiAgICBmb3JtLmNsayA9IHRhcmdldDtcclxuICAgIGlmICh0YXJnZXQudHlwZSA9PSAnaW1hZ2UnKSB7XHJcbiAgICAgICAgaWYgKGUub2Zmc2V0WCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGZvcm0uY2xrX3ggPSBlLm9mZnNldFg7XHJcbiAgICAgICAgICAgIGZvcm0uY2xrX3kgPSBlLm9mZnNldFk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgJC5mbi5vZmZzZXQgPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gJGVsLm9mZnNldCgpO1xyXG4gICAgICAgICAgICBmb3JtLmNsa194ID0gZS5wYWdlWCAtIG9mZnNldC5sZWZ0O1xyXG4gICAgICAgICAgICBmb3JtLmNsa195ID0gZS5wYWdlWSAtIG9mZnNldC50b3A7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9ybS5jbGtfeCA9IGUucGFnZVggLSB0YXJnZXQub2Zmc2V0TGVmdDtcclxuICAgICAgICAgICAgZm9ybS5jbGtfeSA9IGUucGFnZVkgLSB0YXJnZXQub2Zmc2V0VG9wO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGNsZWFyIGZvcm0gdmFyc1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgZm9ybS5jbGsgPSBmb3JtLmNsa194ID0gZm9ybS5jbGtfeSA9IG51bGw7IH0sIDEwMCk7XHJcbn1cclxuXHJcblxyXG4vLyBhamF4Rm9ybVVuYmluZCB1bmJpbmRzIHRoZSBldmVudCBoYW5kbGVycyB0aGF0IHdlcmUgYm91bmQgYnkgYWpheEZvcm1cclxuJC5mbi5hamF4Rm9ybVVuYmluZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudW5iaW5kKCdzdWJtaXQuZm9ybS1wbHVnaW4gY2xpY2suZm9ybS1wbHVnaW4nKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBmb3JtVG9BcnJheSgpIGdhdGhlcnMgZm9ybSBlbGVtZW50IGRhdGEgaW50byBhbiBhcnJheSBvZiBvYmplY3RzIHRoYXQgY2FuXHJcbiAqIGJlIHBhc3NlZCB0byBhbnkgb2YgdGhlIGZvbGxvd2luZyBhamF4IGZ1bmN0aW9uczogJC5nZXQsICQucG9zdCwgb3IgbG9hZC5cclxuICogRWFjaCBvYmplY3QgaW4gdGhlIGFycmF5IGhhcyBib3RoIGEgJ25hbWUnIGFuZCAndmFsdWUnIHByb3BlcnR5LiAgQW4gZXhhbXBsZSBvZlxyXG4gKiBhbiBhcnJheSBmb3IgYSBzaW1wbGUgbG9naW4gZm9ybSBtaWdodCBiZTpcclxuICpcclxuICogWyB7IG5hbWU6ICd1c2VybmFtZScsIHZhbHVlOiAnanJlc2lnJyB9LCB7IG5hbWU6ICdwYXNzd29yZCcsIHZhbHVlOiAnc2VjcmV0JyB9IF1cclxuICpcclxuICogSXQgaXMgdGhpcyBhcnJheSB0aGF0IGlzIHBhc3NlZCB0byBwcmUtc3VibWl0IGNhbGxiYWNrIGZ1bmN0aW9ucyBwcm92aWRlZCB0byB0aGVcclxuICogYWpheFN1Ym1pdCgpIGFuZCBhamF4Rm9ybSgpIG1ldGhvZHMuXHJcbiAqL1xyXG4kLmZuLmZvcm1Ub0FycmF5ID0gZnVuY3Rpb24oc2VtYW50aWMsIGVsZW1lbnRzKSB7XHJcbiAgICB2YXIgYSA9IFtdO1xyXG4gICAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGZvcm0gPSB0aGlzWzBdO1xyXG4gICAgdmFyIGVscyA9IHNlbWFudGljID8gZm9ybS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpIDogZm9ybS5lbGVtZW50cztcclxuICAgIGlmICghZWxzKSB7XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGksaixuLHYsZWwsbWF4LGptYXg7XHJcbiAgICBmb3IoaT0wLCBtYXg9ZWxzLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XHJcbiAgICAgICAgZWwgPSBlbHNbaV07XHJcbiAgICAgICAgbiA9IGVsLm5hbWU7XHJcbiAgICAgICAgaWYgKCFuIHx8IGVsLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlbWFudGljICYmIGZvcm0uY2xrICYmIGVsLnR5cGUgPT0gXCJpbWFnZVwiKSB7XHJcbiAgICAgICAgICAgIC8vIGhhbmRsZSBpbWFnZSBpbnB1dHMgb24gdGhlIGZseSB3aGVuIHNlbWFudGljID09IHRydWVcclxuICAgICAgICAgICAgaWYoZm9ybS5jbGsgPT0gZWwpIHtcclxuICAgICAgICAgICAgICAgIGEucHVzaCh7bmFtZTogbiwgdmFsdWU6ICQoZWwpLnZhbCgpLCB0eXBlOiBlbC50eXBlIH0pO1xyXG4gICAgICAgICAgICAgICAgYS5wdXNoKHtuYW1lOiBuKycueCcsIHZhbHVlOiBmb3JtLmNsa194fSwge25hbWU6IG4rJy55JywgdmFsdWU6IGZvcm0uY2xrX3l9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHYgPSAkLmZpZWxkVmFsdWUoZWwsIHRydWUpO1xyXG4gICAgICAgIGlmICh2ICYmIHYuY29uc3RydWN0b3IgPT0gQXJyYXkpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRzKVxyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChlbCk7XHJcbiAgICAgICAgICAgIGZvcihqPTAsIGptYXg9di5sZW5ndGg7IGogPCBqbWF4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGEucHVzaCh7bmFtZTogbiwgdmFsdWU6IHZbal19KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChmZWF0dXJlLmZpbGVhcGkgJiYgZWwudHlwZSA9PSAnZmlsZScpIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnRzKVxyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChlbCk7XHJcbiAgICAgICAgICAgIHZhciBmaWxlcyA9IGVsLmZpbGVzO1xyXG4gICAgICAgICAgICBpZiAoZmlsZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGo9MDsgaiA8IGZpbGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYS5wdXNoKHtuYW1lOiBuLCB2YWx1ZTogZmlsZXNbal0sIHR5cGU6IGVsLnR5cGV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICMxODBcclxuICAgICAgICAgICAgICAgIGEucHVzaCh7IG5hbWU6IG4sIHZhbHVlOiAnJywgdHlwZTogZWwudHlwZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh2ICE9PSBudWxsICYmIHR5cGVvZiB2ICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50cylcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZWwpO1xyXG4gICAgICAgICAgICBhLnB1c2goe25hbWU6IG4sIHZhbHVlOiB2LCB0eXBlOiBlbC50eXBlLCByZXF1aXJlZDogZWwucmVxdWlyZWR9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzZW1hbnRpYyAmJiBmb3JtLmNsaykge1xyXG4gICAgICAgIC8vIGlucHV0IHR5cGU9PSdpbWFnZScgYXJlIG5vdCBmb3VuZCBpbiBlbGVtZW50cyBhcnJheSEgaGFuZGxlIGl0IGhlcmVcclxuICAgICAgICB2YXIgJGlucHV0ID0gJChmb3JtLmNsayksIGlucHV0ID0gJGlucHV0WzBdO1xyXG4gICAgICAgIG4gPSBpbnB1dC5uYW1lO1xyXG4gICAgICAgIGlmIChuICYmICFpbnB1dC5kaXNhYmxlZCAmJiBpbnB1dC50eXBlID09ICdpbWFnZScpIHtcclxuICAgICAgICAgICAgYS5wdXNoKHtuYW1lOiBuLCB2YWx1ZTogJGlucHV0LnZhbCgpfSk7XHJcbiAgICAgICAgICAgIGEucHVzaCh7bmFtZTogbisnLngnLCB2YWx1ZTogZm9ybS5jbGtfeH0sIHtuYW1lOiBuKycueScsIHZhbHVlOiBmb3JtLmNsa195fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGE7XHJcbn07XHJcblxyXG4vKipcclxuICogU2VyaWFsaXplcyBmb3JtIGRhdGEgaW50byBhICdzdWJtaXR0YWJsZScgc3RyaW5nLiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBhIHN0cmluZ1xyXG4gKiBpbiB0aGUgZm9ybWF0OiBuYW1lMT12YWx1ZTEmYW1wO25hbWUyPXZhbHVlMlxyXG4gKi9cclxuJC5mbi5mb3JtU2VyaWFsaXplID0gZnVuY3Rpb24oc2VtYW50aWMpIHtcclxuICAgIC8vaGFuZCBvZmYgdG8galF1ZXJ5LnBhcmFtIGZvciBwcm9wZXIgZW5jb2RpbmdcclxuICAgIHJldHVybiAkLnBhcmFtKHRoaXMuZm9ybVRvQXJyYXkoc2VtYW50aWMpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXJpYWxpemVzIGFsbCBmaWVsZCBlbGVtZW50cyBpbiB0aGUgalF1ZXJ5IG9iamVjdCBpbnRvIGEgcXVlcnkgc3RyaW5nLlxyXG4gKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBhIHN0cmluZyBpbiB0aGUgZm9ybWF0OiBuYW1lMT12YWx1ZTEmYW1wO25hbWUyPXZhbHVlMlxyXG4gKi9cclxuJC5mbi5maWVsZFNlcmlhbGl6ZSA9IGZ1bmN0aW9uKHN1Y2Nlc3NmdWwpIHtcclxuICAgIHZhciBhID0gW107XHJcbiAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIG4gPSB0aGlzLm5hbWU7XHJcbiAgICAgICAgaWYgKCFuKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHYgPSAkLmZpZWxkVmFsdWUodGhpcywgc3VjY2Vzc2Z1bCk7XHJcbiAgICAgICAgaWYgKHYgJiYgdi5jb25zdHJ1Y3RvciA9PSBBcnJheSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpPTAsbWF4PXYubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGEucHVzaCh7bmFtZTogbiwgdmFsdWU6IHZbaV19KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh2ICE9PSBudWxsICYmIHR5cGVvZiB2ICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGEucHVzaCh7bmFtZTogdGhpcy5uYW1lLCB2YWx1ZTogdn0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy9oYW5kIG9mZiB0byBqUXVlcnkucGFyYW0gZm9yIHByb3BlciBlbmNvZGluZ1xyXG4gICAgcmV0dXJuICQucGFyYW0oYSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgdmFsdWUocykgb2YgdGhlIGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgc2V0LiAgRm9yIGV4YW1wbGUsIGNvbnNpZGVyIHRoZSBmb2xsb3dpbmcgZm9ybTpcclxuICpcclxuICogIDxmb3JtPjxmaWVsZHNldD5cclxuICogICAgICA8aW5wdXQgbmFtZT1cIkFcIiB0eXBlPVwidGV4dFwiIC8+XHJcbiAqICAgICAgPGlucHV0IG5hbWU9XCJBXCIgdHlwZT1cInRleHRcIiAvPlxyXG4gKiAgICAgIDxpbnB1dCBuYW1lPVwiQlwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiQjFcIiAvPlxyXG4gKiAgICAgIDxpbnB1dCBuYW1lPVwiQlwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiQjJcIi8+XHJcbiAqICAgICAgPGlucHV0IG5hbWU9XCJDXCIgdHlwZT1cInJhZGlvXCIgdmFsdWU9XCJDMVwiIC8+XHJcbiAqICAgICAgPGlucHV0IG5hbWU9XCJDXCIgdHlwZT1cInJhZGlvXCIgdmFsdWU9XCJDMlwiIC8+XHJcbiAqICA8L2ZpZWxkc2V0PjwvZm9ybT5cclxuICpcclxuICogIHZhciB2ID0gJCgnaW5wdXRbdHlwZT10ZXh0XScpLmZpZWxkVmFsdWUoKTtcclxuICogIC8vIGlmIG5vIHZhbHVlcyBhcmUgZW50ZXJlZCBpbnRvIHRoZSB0ZXh0IGlucHV0c1xyXG4gKiAgdiA9PSBbJycsJyddXHJcbiAqICAvLyBpZiB2YWx1ZXMgZW50ZXJlZCBpbnRvIHRoZSB0ZXh0IGlucHV0cyBhcmUgJ2ZvbycgYW5kICdiYXInXHJcbiAqICB2ID09IFsnZm9vJywnYmFyJ11cclxuICpcclxuICogIHZhciB2ID0gJCgnaW5wdXRbdHlwZT1jaGVja2JveF0nKS5maWVsZFZhbHVlKCk7XHJcbiAqICAvLyBpZiBuZWl0aGVyIGNoZWNrYm94IGlzIGNoZWNrZWRcclxuICogIHYgPT09IHVuZGVmaW5lZFxyXG4gKiAgLy8gaWYgYm90aCBjaGVja2JveGVzIGFyZSBjaGVja2VkXHJcbiAqICB2ID09IFsnQjEnLCAnQjInXVxyXG4gKlxyXG4gKiAgdmFyIHYgPSAkKCdpbnB1dFt0eXBlPXJhZGlvXScpLmZpZWxkVmFsdWUoKTtcclxuICogIC8vIGlmIG5laXRoZXIgcmFkaW8gaXMgY2hlY2tlZFxyXG4gKiAgdiA9PT0gdW5kZWZpbmVkXHJcbiAqICAvLyBpZiBmaXJzdCByYWRpbyBpcyBjaGVja2VkXHJcbiAqICB2ID09IFsnQzEnXVxyXG4gKlxyXG4gKiBUaGUgc3VjY2Vzc2Z1bCBhcmd1bWVudCBjb250cm9scyB3aGV0aGVyIG9yIG5vdCB0aGUgZmllbGQgZWxlbWVudCBtdXN0IGJlICdzdWNjZXNzZnVsJ1xyXG4gKiAocGVyIGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw0L2ludGVyYWN0L2Zvcm1zLmh0bWwjc3VjY2Vzc2Z1bC1jb250cm9scykuXHJcbiAqIFRoZSBkZWZhdWx0IHZhbHVlIG9mIHRoZSBzdWNjZXNzZnVsIGFyZ3VtZW50IGlzIHRydWUuICBJZiB0aGlzIHZhbHVlIGlzIGZhbHNlIHRoZSB2YWx1ZShzKVxyXG4gKiBmb3IgZWFjaCBlbGVtZW50IGlzIHJldHVybmVkLlxyXG4gKlxyXG4gKiBOb3RlOiBUaGlzIG1ldGhvZCAqYWx3YXlzKiByZXR1cm5zIGFuIGFycmF5LiAgSWYgbm8gdmFsaWQgdmFsdWUgY2FuIGJlIGRldGVybWluZWQgdGhlXHJcbiAqICAgIGFycmF5IHdpbGwgYmUgZW1wdHksIG90aGVyd2lzZSBpdCB3aWxsIGNvbnRhaW4gb25lIG9yIG1vcmUgdmFsdWVzLlxyXG4gKi9cclxuJC5mbi5maWVsZFZhbHVlID0gZnVuY3Rpb24oc3VjY2Vzc2Z1bCkge1xyXG4gICAgZm9yICh2YXIgdmFsPVtdLCBpPTAsIG1heD10aGlzLmxlbmd0aDsgaSA8IG1heDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGVsID0gdGhpc1tpXTtcclxuICAgICAgICB2YXIgdiA9ICQuZmllbGRWYWx1ZShlbCwgc3VjY2Vzc2Z1bCk7XHJcbiAgICAgICAgaWYgKHYgPT09IG51bGwgfHwgdHlwZW9mIHYgPT0gJ3VuZGVmaW5lZCcgfHwgKHYuY29uc3RydWN0b3IgPT0gQXJyYXkgJiYgIXYubGVuZ3RoKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHYuY29uc3RydWN0b3IgPT0gQXJyYXkpXHJcbiAgICAgICAgICAgICQubWVyZ2UodmFsLCB2KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHZhbC5wdXNoKHYpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZmllbGQgZWxlbWVudC5cclxuICovXHJcbiQuZmllbGRWYWx1ZSA9IGZ1bmN0aW9uKGVsLCBzdWNjZXNzZnVsKSB7XHJcbiAgICB2YXIgbiA9IGVsLm5hbWUsIHQgPSBlbC50eXBlLCB0YWcgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAoc3VjY2Vzc2Z1bCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3VjY2Vzc2Z1bCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN1Y2Nlc3NmdWwgJiYgKCFuIHx8IGVsLmRpc2FibGVkIHx8IHQgPT0gJ3Jlc2V0JyB8fCB0ID09ICdidXR0b24nIHx8XHJcbiAgICAgICAgKHQgPT0gJ2NoZWNrYm94JyB8fCB0ID09ICdyYWRpbycpICYmICFlbC5jaGVja2VkIHx8XHJcbiAgICAgICAgKHQgPT0gJ3N1Ym1pdCcgfHwgdCA9PSAnaW1hZ2UnKSAmJiBlbC5mb3JtICYmIGVsLmZvcm0uY2xrICE9IGVsIHx8XHJcbiAgICAgICAgdGFnID09ICdzZWxlY3QnICYmIGVsLnNlbGVjdGVkSW5kZXggPT0gLTEpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0YWcgPT0gJ3NlbGVjdCcpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSBlbC5zZWxlY3RlZEluZGV4O1xyXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBhID0gW10sIG9wcyA9IGVsLm9wdGlvbnM7XHJcbiAgICAgICAgdmFyIG9uZSA9ICh0ID09ICdzZWxlY3Qtb25lJyk7XHJcbiAgICAgICAgdmFyIG1heCA9IChvbmUgPyBpbmRleCsxIDogb3BzLmxlbmd0aCk7XHJcbiAgICAgICAgZm9yKHZhciBpPShvbmUgPyBpbmRleCA6IDApOyBpIDwgbWF4OyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG9wID0gb3BzW2ldO1xyXG4gICAgICAgICAgICBpZiAob3Auc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2ID0gb3AudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXYpIHsgLy8gZXh0cmEgcGFpbiBmb3IgSUUuLi5cclxuICAgICAgICAgICAgICAgICAgICB2ID0gKG9wLmF0dHJpYnV0ZXMgJiYgb3AuYXR0cmlidXRlc1sndmFsdWUnXSAmJiAhKG9wLmF0dHJpYnV0ZXNbJ3ZhbHVlJ10uc3BlY2lmaWVkKSkgPyBvcC50ZXh0IDogb3AudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhLnB1c2godik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJChlbCkudmFsKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2xlYXJzIHRoZSBmb3JtIGRhdGEuICBUYWtlcyB0aGUgZm9sbG93aW5nIGFjdGlvbnMgb24gdGhlIGZvcm0ncyBpbnB1dCBmaWVsZHM6XHJcbiAqICAtIGlucHV0IHRleHQgZmllbGRzIHdpbGwgaGF2ZSB0aGVpciAndmFsdWUnIHByb3BlcnR5IHNldCB0byB0aGUgZW1wdHkgc3RyaW5nXHJcbiAqICAtIHNlbGVjdCBlbGVtZW50cyB3aWxsIGhhdmUgdGhlaXIgJ3NlbGVjdGVkSW5kZXgnIHByb3BlcnR5IHNldCB0byAtMVxyXG4gKiAgLSBjaGVja2JveCBhbmQgcmFkaW8gaW5wdXRzIHdpbGwgaGF2ZSB0aGVpciAnY2hlY2tlZCcgcHJvcGVydHkgc2V0IHRvIGZhbHNlXHJcbiAqICAtIGlucHV0cyBvZiB0eXBlIHN1Ym1pdCwgYnV0dG9uLCByZXNldCwgYW5kIGhpZGRlbiB3aWxsICpub3QqIGJlIGVmZmVjdGVkXHJcbiAqICAtIGJ1dHRvbiBlbGVtZW50cyB3aWxsICpub3QqIGJlIGVmZmVjdGVkXHJcbiAqL1xyXG4kLmZuLmNsZWFyRm9ybSA9IGZ1bmN0aW9uKGluY2x1ZGVIaWRkZW4pIHtcclxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnaW5wdXQsc2VsZWN0LHRleHRhcmVhJywgdGhpcykuY2xlYXJGaWVsZHMoaW5jbHVkZUhpZGRlbik7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDbGVhcnMgdGhlIHNlbGVjdGVkIGZvcm0gZWxlbWVudHMuXHJcbiAqL1xyXG4kLmZuLmNsZWFyRmllbGRzID0gJC5mbi5jbGVhcklucHV0cyA9IGZ1bmN0aW9uKGluY2x1ZGVIaWRkZW4pIHtcclxuICAgIHZhciByZSA9IC9eKD86Y29sb3J8ZGF0ZXxkYXRldGltZXxlbWFpbHxtb250aHxudW1iZXJ8cGFzc3dvcmR8cmFuZ2V8c2VhcmNofHRlbHx0ZXh0fHRpbWV8dXJsfHdlZWspJC9pOyAvLyAnaGlkZGVuJyBpcyBub3QgaW4gdGhpcyBsaXN0XHJcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0ID0gdGhpcy50eXBlLCB0YWcgPSB0aGlzLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAocmUudGVzdCh0KSB8fCB0YWcgPT0gJ3RleHRhcmVhJykge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHQgPT0gJ2NoZWNrYm94JyB8fCB0ID09ICdyYWRpbycpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRhZyA9PSAnc2VsZWN0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICB9XHJcblx0XHRlbHNlIGlmICh0ID09IFwiZmlsZVwiKSB7XHJcblx0XHRcdGlmICgvTVNJRS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xyXG5cdFx0XHRcdCQodGhpcykucmVwbGFjZVdpdGgoJCh0aGlzKS5jbG9uZSh0cnVlKSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0JCh0aGlzKS52YWwoJycpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5jbHVkZUhpZGRlbikge1xyXG4gICAgICAgICAgICAvLyBpbmNsdWRlSGlkZGVuIGNhbiBiZSB0aGUgdmFsdWUgdHJ1ZSwgb3IgaXQgY2FuIGJlIGEgc2VsZWN0b3Igc3RyaW5nXHJcbiAgICAgICAgICAgIC8vIGluZGljYXRpbmcgYSBzcGVjaWFsIHRlc3Q7IGZvciBleGFtcGxlOlxyXG4gICAgICAgICAgICAvLyAgJCgnI215Rm9ybScpLmNsZWFyRm9ybSgnLnNwZWNpYWw6aGlkZGVuJylcclxuICAgICAgICAgICAgLy8gdGhlIGFib3ZlIHdvdWxkIGNsZWFuIGhpZGRlbiBpbnB1dHMgdGhhdCBoYXZlIHRoZSBjbGFzcyBvZiAnc3BlY2lhbCdcclxuICAgICAgICAgICAgaWYgKCAoaW5jbHVkZUhpZGRlbiA9PT0gdHJ1ZSAmJiAvaGlkZGVuLy50ZXN0KHQpKSB8fFxyXG4gICAgICAgICAgICAgICAgICh0eXBlb2YgaW5jbHVkZUhpZGRlbiA9PSAnc3RyaW5nJyAmJiAkKHRoaXMpLmlzKGluY2x1ZGVIaWRkZW4pKSApXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVzZXRzIHRoZSBmb3JtIGRhdGEuICBDYXVzZXMgYWxsIGZvcm0gZWxlbWVudHMgdG8gYmUgcmVzZXQgdG8gdGhlaXIgb3JpZ2luYWwgdmFsdWUuXHJcbiAqL1xyXG4kLmZuLnJlc2V0Rm9ybSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBndWFyZCBhZ2FpbnN0IGFuIGlucHV0IHdpdGggdGhlIG5hbWUgb2YgJ3Jlc2V0J1xyXG4gICAgICAgIC8vIG5vdGUgdGhhdCBJRSByZXBvcnRzIHRoZSByZXNldCBmdW5jdGlvbiBhcyBhbiAnb2JqZWN0J1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5yZXNldCA9PSAnZnVuY3Rpb24nIHx8ICh0eXBlb2YgdGhpcy5yZXNldCA9PSAnb2JqZWN0JyAmJiAhdGhpcy5yZXNldC5ub2RlVHlwZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVuYWJsZXMgb3IgZGlzYWJsZXMgYW55IG1hdGNoaW5nIGVsZW1lbnRzLlxyXG4gKi9cclxuJC5mbi5lbmFibGUgPSBmdW5jdGlvbihiKSB7XHJcbiAgICBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgYiA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSAhYjtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrcy91bmNoZWNrcyBhbnkgbWF0Y2hpbmcgY2hlY2tib3hlcyBvciByYWRpbyBidXR0b25zIGFuZFxyXG4gKiBzZWxlY3RzL2Rlc2VsZWN0cyBhbmQgbWF0Y2hpbmcgb3B0aW9uIGVsZW1lbnRzLlxyXG4gKi9cclxuJC5mbi5zZWxlY3RlZCA9IGZ1bmN0aW9uKHNlbGVjdCkge1xyXG4gICAgaWYgKHNlbGVjdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc2VsZWN0ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHQgPSB0aGlzLnR5cGU7XHJcbiAgICAgICAgaWYgKHQgPT0gJ2NoZWNrYm94JyB8fCB0ID09ICdyYWRpbycpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gc2VsZWN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSAnb3B0aW9uJykge1xyXG4gICAgICAgICAgICB2YXIgJHNlbCA9ICQodGhpcykucGFyZW50KCdzZWxlY3QnKTtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdCAmJiAkc2VsWzBdICYmICRzZWxbMF0udHlwZSA9PSAnc2VsZWN0LW9uZScpIHtcclxuICAgICAgICAgICAgICAgIC8vIGRlc2VsZWN0IGFsbCBvdGhlciBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICAkc2VsLmZpbmQoJ29wdGlvbicpLnNlbGVjdGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy8gZXhwb3NlIGRlYnVnIHZhclxyXG4kLmZuLmFqYXhTdWJtaXQuZGVidWcgPSBmYWxzZTtcclxuXHJcbi8vIGhlbHBlciBmbiBmb3IgY29uc29sZSBsb2dnaW5nXHJcbmZ1bmN0aW9uIGxvZygpIHtcclxuICAgIGlmICghJC5mbi5hamF4U3VibWl0LmRlYnVnKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIHZhciBtc2cgPSAnW2pxdWVyeS5mb3JtXSAnICsgQXJyYXkucHJvdG90eXBlLmpvaW4uY2FsbChhcmd1bWVudHMsJycpO1xyXG4gICAgaWYgKHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLmxvZykge1xyXG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhtc2cpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAod2luZG93Lm9wZXJhICYmIHdpbmRvdy5vcGVyYS5wb3N0RXJyb3IpIHtcclxuICAgICAgICB3aW5kb3cub3BlcmEucG9zdEVycm9yKG1zZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbn0pKTtcclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vd3d3cm9vdC9saWIvanF1ZXJ5LWZvcm0vanF1ZXJ5LmZvcm0uanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiLyohXG4gKiBqUXVlcnkgVmFsaWRhdGlvbiBQbHVnaW4gdjEuMTUuMFxuICpcbiAqIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgSsO2cm4gWmFlZmZlcmVyXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuKGZ1bmN0aW9uKCBmYWN0b3J5ICkge1xuXHRpZiAoIHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kICkge1xuXHRcdGRlZmluZSggW1wianF1ZXJ5XCJdLCBmYWN0b3J5ICk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSggcmVxdWlyZSggXCJqcXVlcnlcIiApICk7XG5cdH0gZWxzZSB7XG5cdFx0ZmFjdG9yeSggalF1ZXJ5ICk7XG5cdH1cbn0oZnVuY3Rpb24oICQgKSB7XG5cbiQuZXh0ZW5kKCAkLmZuLCB7XG5cblx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3ZhbGlkYXRlL1xuXHR2YWxpZGF0ZTogZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cblx0XHQvLyBJZiBub3RoaW5nIGlzIHNlbGVjdGVkLCByZXR1cm4gbm90aGluZzsgY2FuJ3QgY2hhaW4gYW55d2F5XG5cdFx0aWYgKCAhdGhpcy5sZW5ndGggKSB7XG5cdFx0XHRpZiAoIG9wdGlvbnMgJiYgb3B0aW9ucy5kZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSApIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKCBcIk5vdGhpbmcgc2VsZWN0ZWQsIGNhbid0IHZhbGlkYXRlLCByZXR1cm5pbmcgbm90aGluZy5cIiApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIENoZWNrIGlmIGEgdmFsaWRhdG9yIGZvciB0aGlzIGZvcm0gd2FzIGFscmVhZHkgY3JlYXRlZFxuXHRcdHZhciB2YWxpZGF0b3IgPSAkLmRhdGEoIHRoaXNbIDAgXSwgXCJ2YWxpZGF0b3JcIiApO1xuXHRcdGlmICggdmFsaWRhdG9yICkge1xuXHRcdFx0cmV0dXJuIHZhbGlkYXRvcjtcblx0XHR9XG5cblx0XHQvLyBBZGQgbm92YWxpZGF0ZSB0YWcgaWYgSFRNTDUuXG5cdFx0dGhpcy5hdHRyKCBcIm5vdmFsaWRhdGVcIiwgXCJub3ZhbGlkYXRlXCIgKTtcblxuXHRcdHZhbGlkYXRvciA9IG5ldyAkLnZhbGlkYXRvciggb3B0aW9ucywgdGhpc1sgMCBdICk7XG5cdFx0JC5kYXRhKCB0aGlzWyAwIF0sIFwidmFsaWRhdG9yXCIsIHZhbGlkYXRvciApO1xuXG5cdFx0aWYgKCB2YWxpZGF0b3Iuc2V0dGluZ3Mub25zdWJtaXQgKSB7XG5cblx0XHRcdHRoaXMub24oIFwiY2xpY2sudmFsaWRhdGVcIiwgXCI6c3VibWl0XCIsIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0aWYgKCB2YWxpZGF0b3Iuc2V0dGluZ3Muc3VibWl0SGFuZGxlciApIHtcblx0XHRcdFx0XHR2YWxpZGF0b3Iuc3VibWl0QnV0dG9uID0gZXZlbnQudGFyZ2V0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQWxsb3cgc3VwcHJlc3NpbmcgdmFsaWRhdGlvbiBieSBhZGRpbmcgYSBjYW5jZWwgY2xhc3MgdG8gdGhlIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0aWYgKCAkKCB0aGlzICkuaGFzQ2xhc3MoIFwiY2FuY2VsXCIgKSApIHtcblx0XHRcdFx0XHR2YWxpZGF0b3IuY2FuY2VsU3VibWl0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFsbG93IHN1cHByZXNzaW5nIHZhbGlkYXRpb24gYnkgYWRkaW5nIHRoZSBodG1sNSBmb3Jtbm92YWxpZGF0ZSBhdHRyaWJ1dGUgdG8gdGhlIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0aWYgKCAkKCB0aGlzICkuYXR0ciggXCJmb3Jtbm92YWxpZGF0ZVwiICkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHR2YWxpZGF0b3IuY2FuY2VsU3VibWl0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXG5cdFx0XHQvLyBWYWxpZGF0ZSB0aGUgZm9ybSBvbiBzdWJtaXRcblx0XHRcdHRoaXMub24oIFwic3VibWl0LnZhbGlkYXRlXCIsIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0aWYgKCB2YWxpZGF0b3Iuc2V0dGluZ3MuZGVidWcgKSB7XG5cblx0XHRcdFx0XHQvLyBQcmV2ZW50IGZvcm0gc3VibWl0IHRvIGJlIGFibGUgdG8gc2VlIGNvbnNvbGUgb3V0cHV0XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmdW5jdGlvbiBoYW5kbGUoKSB7XG5cdFx0XHRcdFx0dmFyIGhpZGRlbiwgcmVzdWx0O1xuXHRcdFx0XHRcdGlmICggdmFsaWRhdG9yLnNldHRpbmdzLnN1Ym1pdEhhbmRsZXIgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHZhbGlkYXRvci5zdWJtaXRCdXR0b24gKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gSW5zZXJ0IGEgaGlkZGVuIGlucHV0IGFzIGEgcmVwbGFjZW1lbnQgZm9yIHRoZSBtaXNzaW5nIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0XHRcdFx0aGlkZGVuID0gJCggXCI8aW5wdXQgdHlwZT0naGlkZGVuJy8+XCIgKVxuXHRcdFx0XHRcdFx0XHRcdC5hdHRyKCBcIm5hbWVcIiwgdmFsaWRhdG9yLnN1Ym1pdEJ1dHRvbi5uYW1lIClcblx0XHRcdFx0XHRcdFx0XHQudmFsKCAkKCB2YWxpZGF0b3Iuc3VibWl0QnV0dG9uICkudmFsKCkgKVxuXHRcdFx0XHRcdFx0XHRcdC5hcHBlbmRUbyggdmFsaWRhdG9yLmN1cnJlbnRGb3JtICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB2YWxpZGF0b3Iuc2V0dGluZ3Muc3VibWl0SGFuZGxlci5jYWxsKCB2YWxpZGF0b3IsIHZhbGlkYXRvci5jdXJyZW50Rm9ybSwgZXZlbnQgKTtcblx0XHRcdFx0XHRcdGlmICggdmFsaWRhdG9yLnN1Ym1pdEJ1dHRvbiApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBBbmQgY2xlYW4gdXAgYWZ0ZXJ3YXJkczsgdGhhbmtzIHRvIG5vLWJsb2NrLXNjb3BlLCBoaWRkZW4gY2FuIGJlIHJlZmVyZW5jZWRcblx0XHRcdFx0XHRcdFx0aGlkZGVuLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCByZXN1bHQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBQcmV2ZW50IHN1Ym1pdCBmb3IgaW52YWxpZCBmb3JtcyBvciBjdXN0b20gc3VibWl0IGhhbmRsZXJzXG5cdFx0XHRcdGlmICggdmFsaWRhdG9yLmNhbmNlbFN1Ym1pdCApIHtcblx0XHRcdFx0XHR2YWxpZGF0b3IuY2FuY2VsU3VibWl0ID0gZmFsc2U7XG5cdFx0XHRcdFx0cmV0dXJuIGhhbmRsZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggdmFsaWRhdG9yLmZvcm0oKSApIHtcblx0XHRcdFx0XHRpZiAoIHZhbGlkYXRvci5wZW5kaW5nUmVxdWVzdCApIHtcblx0XHRcdFx0XHRcdHZhbGlkYXRvci5mb3JtU3VibWl0dGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGhhbmRsZSgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbGlkYXRvci5mb2N1c0ludmFsaWQoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsaWRhdG9yO1xuXHR9LFxuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy92YWxpZC9cblx0dmFsaWQ6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciB2YWxpZCwgdmFsaWRhdG9yLCBlcnJvckxpc3Q7XG5cblx0XHRpZiAoICQoIHRoaXNbIDAgXSApLmlzKCBcImZvcm1cIiApICkge1xuXHRcdFx0dmFsaWQgPSB0aGlzLnZhbGlkYXRlKCkuZm9ybSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlcnJvckxpc3QgPSBbXTtcblx0XHRcdHZhbGlkID0gdHJ1ZTtcblx0XHRcdHZhbGlkYXRvciA9ICQoIHRoaXNbIDAgXS5mb3JtICkudmFsaWRhdGUoKTtcblx0XHRcdHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhbGlkID0gdmFsaWRhdG9yLmVsZW1lbnQoIHRoaXMgKSAmJiB2YWxpZDtcblx0XHRcdFx0aWYgKCAhdmFsaWQgKSB7XG5cdFx0XHRcdFx0ZXJyb3JMaXN0ID0gZXJyb3JMaXN0LmNvbmNhdCggdmFsaWRhdG9yLmVycm9yTGlzdCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdFx0XHR2YWxpZGF0b3IuZXJyb3JMaXN0ID0gZXJyb3JMaXN0O1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsaWQ7XG5cdH0sXG5cblx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3J1bGVzL1xuXHRydWxlczogZnVuY3Rpb24oIGNvbW1hbmQsIGFyZ3VtZW50ICkge1xuXG5cdFx0Ly8gSWYgbm90aGluZyBpcyBzZWxlY3RlZCwgcmV0dXJuIG5vdGhpbmc7IGNhbid0IGNoYWluIGFueXdheVxuXHRcdGlmICggIXRoaXMubGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBlbGVtZW50ID0gdGhpc1sgMCBdLFxuXHRcdFx0c2V0dGluZ3MsIHN0YXRpY1J1bGVzLCBleGlzdGluZ1J1bGVzLCBkYXRhLCBwYXJhbSwgZmlsdGVyZWQ7XG5cblx0XHRpZiAoIGNvbW1hbmQgKSB7XG5cdFx0XHRzZXR0aW5ncyA9ICQuZGF0YSggZWxlbWVudC5mb3JtLCBcInZhbGlkYXRvclwiICkuc2V0dGluZ3M7XG5cdFx0XHRzdGF0aWNSdWxlcyA9IHNldHRpbmdzLnJ1bGVzO1xuXHRcdFx0ZXhpc3RpbmdSdWxlcyA9ICQudmFsaWRhdG9yLnN0YXRpY1J1bGVzKCBlbGVtZW50ICk7XG5cdFx0XHRzd2l0Y2ggKCBjb21tYW5kICkge1xuXHRcdFx0Y2FzZSBcImFkZFwiOlxuXHRcdFx0XHQkLmV4dGVuZCggZXhpc3RpbmdSdWxlcywgJC52YWxpZGF0b3Iubm9ybWFsaXplUnVsZSggYXJndW1lbnQgKSApO1xuXG5cdFx0XHRcdC8vIFJlbW92ZSBtZXNzYWdlcyBmcm9tIHJ1bGVzLCBidXQgYWxsb3cgdGhlbSB0byBiZSBzZXQgc2VwYXJhdGVseVxuXHRcdFx0XHRkZWxldGUgZXhpc3RpbmdSdWxlcy5tZXNzYWdlcztcblx0XHRcdFx0c3RhdGljUnVsZXNbIGVsZW1lbnQubmFtZSBdID0gZXhpc3RpbmdSdWxlcztcblx0XHRcdFx0aWYgKCBhcmd1bWVudC5tZXNzYWdlcyApIHtcblx0XHRcdFx0XHRzZXR0aW5ncy5tZXNzYWdlc1sgZWxlbWVudC5uYW1lIF0gPSAkLmV4dGVuZCggc2V0dGluZ3MubWVzc2FnZXNbIGVsZW1lbnQubmFtZSBdLCBhcmd1bWVudC5tZXNzYWdlcyApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInJlbW92ZVwiOlxuXHRcdFx0XHRpZiAoICFhcmd1bWVudCApIHtcblx0XHRcdFx0XHRkZWxldGUgc3RhdGljUnVsZXNbIGVsZW1lbnQubmFtZSBdO1xuXHRcdFx0XHRcdHJldHVybiBleGlzdGluZ1J1bGVzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGZpbHRlcmVkID0ge307XG5cdFx0XHRcdCQuZWFjaCggYXJndW1lbnQuc3BsaXQoIC9cXHMvICksIGZ1bmN0aW9uKCBpbmRleCwgbWV0aG9kICkge1xuXHRcdFx0XHRcdGZpbHRlcmVkWyBtZXRob2QgXSA9IGV4aXN0aW5nUnVsZXNbIG1ldGhvZCBdO1xuXHRcdFx0XHRcdGRlbGV0ZSBleGlzdGluZ1J1bGVzWyBtZXRob2QgXTtcblx0XHRcdFx0XHRpZiAoIG1ldGhvZCA9PT0gXCJyZXF1aXJlZFwiICkge1xuXHRcdFx0XHRcdFx0JCggZWxlbWVudCApLnJlbW92ZUF0dHIoIFwiYXJpYS1yZXF1aXJlZFwiICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cdFx0XHRcdHJldHVybiBmaWx0ZXJlZDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRkYXRhID0gJC52YWxpZGF0b3Iubm9ybWFsaXplUnVsZXMoXG5cdFx0JC5leHRlbmQoXG5cdFx0XHR7fSxcblx0XHRcdCQudmFsaWRhdG9yLmNsYXNzUnVsZXMoIGVsZW1lbnQgKSxcblx0XHRcdCQudmFsaWRhdG9yLmF0dHJpYnV0ZVJ1bGVzKCBlbGVtZW50ICksXG5cdFx0XHQkLnZhbGlkYXRvci5kYXRhUnVsZXMoIGVsZW1lbnQgKSxcblx0XHRcdCQudmFsaWRhdG9yLnN0YXRpY1J1bGVzKCBlbGVtZW50IClcblx0XHQpLCBlbGVtZW50ICk7XG5cblx0XHQvLyBNYWtlIHN1cmUgcmVxdWlyZWQgaXMgYXQgZnJvbnRcblx0XHRpZiAoIGRhdGEucmVxdWlyZWQgKSB7XG5cdFx0XHRwYXJhbSA9IGRhdGEucmVxdWlyZWQ7XG5cdFx0XHRkZWxldGUgZGF0YS5yZXF1aXJlZDtcblx0XHRcdGRhdGEgPSAkLmV4dGVuZCggeyByZXF1aXJlZDogcGFyYW0gfSwgZGF0YSApO1xuXHRcdFx0JCggZWxlbWVudCApLmF0dHIoIFwiYXJpYS1yZXF1aXJlZFwiLCBcInRydWVcIiApO1xuXHRcdH1cblxuXHRcdC8vIE1ha2Ugc3VyZSByZW1vdGUgaXMgYXQgYmFja1xuXHRcdGlmICggZGF0YS5yZW1vdGUgKSB7XG5cdFx0XHRwYXJhbSA9IGRhdGEucmVtb3RlO1xuXHRcdFx0ZGVsZXRlIGRhdGEucmVtb3RlO1xuXHRcdFx0ZGF0YSA9ICQuZXh0ZW5kKCBkYXRhLCB7IHJlbW90ZTogcGFyYW0gfSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG59ICk7XG5cbi8vIEN1c3RvbSBzZWxlY3RvcnNcbiQuZXh0ZW5kKCAkLmV4cHJbIFwiOlwiIF0sIHtcblxuXHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvYmxhbmstc2VsZWN0b3IvXG5cdGJsYW5rOiBmdW5jdGlvbiggYSApIHtcblx0XHRyZXR1cm4gISQudHJpbSggXCJcIiArICQoIGEgKS52YWwoKSApO1xuXHR9LFxuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9maWxsZWQtc2VsZWN0b3IvXG5cdGZpbGxlZDogZnVuY3Rpb24oIGEgKSB7XG5cdFx0dmFyIHZhbCA9ICQoIGEgKS52YWwoKTtcblx0XHRyZXR1cm4gdmFsICE9PSBudWxsICYmICEhJC50cmltKCBcIlwiICsgdmFsICk7XG5cdH0sXG5cblx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3VuY2hlY2tlZC1zZWxlY3Rvci9cblx0dW5jaGVja2VkOiBmdW5jdGlvbiggYSApIHtcblx0XHRyZXR1cm4gISQoIGEgKS5wcm9wKCBcImNoZWNrZWRcIiApO1xuXHR9XG59ICk7XG5cbi8vIENvbnN0cnVjdG9yIGZvciB2YWxpZGF0b3JcbiQudmFsaWRhdG9yID0gZnVuY3Rpb24oIG9wdGlvbnMsIGZvcm0gKSB7XG5cdHRoaXMuc2V0dGluZ3MgPSAkLmV4dGVuZCggdHJ1ZSwge30sICQudmFsaWRhdG9yLmRlZmF1bHRzLCBvcHRpb25zICk7XG5cdHRoaXMuY3VycmVudEZvcm0gPSBmb3JtO1xuXHR0aGlzLmluaXQoKTtcbn07XG5cbi8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9qUXVlcnkudmFsaWRhdG9yLmZvcm1hdC9cbiQudmFsaWRhdG9yLmZvcm1hdCA9IGZ1bmN0aW9uKCBzb3VyY2UsIHBhcmFtcyApIHtcblx0aWYgKCBhcmd1bWVudHMubGVuZ3RoID09PSAxICkge1xuXHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBhcmdzID0gJC5tYWtlQXJyYXkoIGFyZ3VtZW50cyApO1xuXHRcdFx0YXJncy51bnNoaWZ0KCBzb3VyY2UgKTtcblx0XHRcdHJldHVybiAkLnZhbGlkYXRvci5mb3JtYXQuYXBwbHkoIHRoaXMsIGFyZ3MgKTtcblx0XHR9O1xuXHR9XG5cdGlmICggcGFyYW1zID09PSB1bmRlZmluZWQgKSB7XG5cdFx0cmV0dXJuIHNvdXJjZTtcblx0fVxuXHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIHBhcmFtcy5jb25zdHJ1Y3RvciAhPT0gQXJyYXkgICkge1xuXHRcdHBhcmFtcyA9ICQubWFrZUFycmF5KCBhcmd1bWVudHMgKS5zbGljZSggMSApO1xuXHR9XG5cdGlmICggcGFyYW1zLmNvbnN0cnVjdG9yICE9PSBBcnJheSApIHtcblx0XHRwYXJhbXMgPSBbIHBhcmFtcyBdO1xuXHR9XG5cdCQuZWFjaCggcGFyYW1zLCBmdW5jdGlvbiggaSwgbiApIHtcblx0XHRzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSggbmV3IFJlZ0V4cCggXCJcXFxce1wiICsgaSArIFwiXFxcXH1cIiwgXCJnXCIgKSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gbjtcblx0XHR9ICk7XG5cdH0gKTtcblx0cmV0dXJuIHNvdXJjZTtcbn07XG5cbiQuZXh0ZW5kKCAkLnZhbGlkYXRvciwge1xuXG5cdGRlZmF1bHRzOiB7XG5cdFx0bWVzc2FnZXM6IHt9LFxuXHRcdGdyb3Vwczoge30sXG5cdFx0cnVsZXM6IHt9LFxuXHRcdGVycm9yQ2xhc3M6IFwiZXJyb3JcIixcblx0XHRwZW5kaW5nQ2xhc3M6IFwicGVuZGluZ1wiLFxuXHRcdHZhbGlkQ2xhc3M6IFwidmFsaWRcIixcblx0XHRlcnJvckVsZW1lbnQ6IFwibGFiZWxcIixcblx0XHRmb2N1c0NsZWFudXA6IGZhbHNlLFxuXHRcdGZvY3VzSW52YWxpZDogdHJ1ZSxcblx0XHRlcnJvckNvbnRhaW5lcjogJCggW10gKSxcblx0XHRlcnJvckxhYmVsQ29udGFpbmVyOiAkKCBbXSApLFxuXHRcdG9uc3VibWl0OiB0cnVlLFxuXHRcdGlnbm9yZTogXCI6aGlkZGVuXCIsXG5cdFx0aWdub3JlVGl0bGU6IGZhbHNlLFxuXHRcdG9uZm9jdXNpbjogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHR0aGlzLmxhc3RBY3RpdmUgPSBlbGVtZW50O1xuXG5cdFx0XHQvLyBIaWRlIGVycm9yIGxhYmVsIGFuZCByZW1vdmUgZXJyb3IgY2xhc3Mgb24gZm9jdXMgaWYgZW5hYmxlZFxuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLmZvY3VzQ2xlYW51cCApIHtcblx0XHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLnVuaGlnaGxpZ2h0ICkge1xuXHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MudW5oaWdobGlnaHQuY2FsbCggdGhpcywgZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzLCB0aGlzLnNldHRpbmdzLnZhbGlkQ2xhc3MgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmhpZGVUaGVzZSggdGhpcy5lcnJvcnNGb3IoIGVsZW1lbnQgKSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0b25mb2N1c291dDogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHRpZiAoICF0aGlzLmNoZWNrYWJsZSggZWxlbWVudCApICYmICggZWxlbWVudC5uYW1lIGluIHRoaXMuc3VibWl0dGVkIHx8ICF0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgKSApIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50KCBlbGVtZW50ICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRvbmtleXVwOiBmdW5jdGlvbiggZWxlbWVudCwgZXZlbnQgKSB7XG5cblx0XHRcdC8vIEF2b2lkIHJldmFsaWRhdGUgdGhlIGZpZWxkIHdoZW4gcHJlc3Npbmcgb25lIG9mIHRoZSBmb2xsb3dpbmcga2V5c1xuXHRcdFx0Ly8gU2hpZnQgICAgICAgPT4gMTZcblx0XHRcdC8vIEN0cmwgICAgICAgID0+IDE3XG5cdFx0XHQvLyBBbHQgICAgICAgICA9PiAxOFxuXHRcdFx0Ly8gQ2FwcyBsb2NrICAgPT4gMjBcblx0XHRcdC8vIEVuZCAgICAgICAgID0+IDM1XG5cdFx0XHQvLyBIb21lICAgICAgICA9PiAzNlxuXHRcdFx0Ly8gTGVmdCBhcnJvdyAgPT4gMzdcblx0XHRcdC8vIFVwIGFycm93ICAgID0+IDM4XG5cdFx0XHQvLyBSaWdodCBhcnJvdyA9PiAzOVxuXHRcdFx0Ly8gRG93biBhcnJvdyAgPT4gNDBcblx0XHRcdC8vIEluc2VydCAgICAgID0+IDQ1XG5cdFx0XHQvLyBOdW0gbG9jayAgICA9PiAxNDRcblx0XHRcdC8vIEFsdEdyIGtleSAgID0+IDIyNVxuXHRcdFx0dmFyIGV4Y2x1ZGVkS2V5cyA9IFtcblx0XHRcdFx0MTYsIDE3LCAxOCwgMjAsIDM1LCAzNiwgMzcsXG5cdFx0XHRcdDM4LCAzOSwgNDAsIDQ1LCAxNDQsIDIyNVxuXHRcdFx0XTtcblxuXHRcdFx0aWYgKCBldmVudC53aGljaCA9PT0gOSAmJiB0aGlzLmVsZW1lbnRWYWx1ZSggZWxlbWVudCApID09PSBcIlwiIHx8ICQuaW5BcnJheSggZXZlbnQua2V5Q29kZSwgZXhjbHVkZWRLZXlzICkgIT09IC0xICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9IGVsc2UgaWYgKCBlbGVtZW50Lm5hbWUgaW4gdGhpcy5zdWJtaXR0ZWQgfHwgZWxlbWVudC5uYW1lIGluIHRoaXMuaW52YWxpZCApIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50KCBlbGVtZW50ICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRvbmNsaWNrOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblxuXHRcdFx0Ly8gQ2xpY2sgb24gc2VsZWN0cywgcmFkaW9idXR0b25zIGFuZCBjaGVja2JveGVzXG5cdFx0XHRpZiAoIGVsZW1lbnQubmFtZSBpbiB0aGlzLnN1Ym1pdHRlZCApIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50KCBlbGVtZW50ICk7XG5cblx0XHRcdC8vIE9yIG9wdGlvbiBlbGVtZW50cywgY2hlY2sgcGFyZW50IHNlbGVjdCBpbiB0aGF0IGNhc2Vcblx0XHRcdH0gZWxzZSBpZiAoIGVsZW1lbnQucGFyZW50Tm9kZS5uYW1lIGluIHRoaXMuc3VibWl0dGVkICkge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQoIGVsZW1lbnQucGFyZW50Tm9kZSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0aGlnaGxpZ2h0OiBmdW5jdGlvbiggZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcyApIHtcblx0XHRcdGlmICggZWxlbWVudC50eXBlID09PSBcInJhZGlvXCIgKSB7XG5cdFx0XHRcdHRoaXMuZmluZEJ5TmFtZSggZWxlbWVudC5uYW1lICkuYWRkQ2xhc3MoIGVycm9yQ2xhc3MgKS5yZW1vdmVDbGFzcyggdmFsaWRDbGFzcyApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCggZWxlbWVudCApLmFkZENsYXNzKCBlcnJvckNsYXNzICkucmVtb3ZlQ2xhc3MoIHZhbGlkQ2xhc3MgKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHVuaGlnaGxpZ2h0OiBmdW5jdGlvbiggZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcyApIHtcblx0XHRcdGlmICggZWxlbWVudC50eXBlID09PSBcInJhZGlvXCIgKSB7XG5cdFx0XHRcdHRoaXMuZmluZEJ5TmFtZSggZWxlbWVudC5uYW1lICkucmVtb3ZlQ2xhc3MoIGVycm9yQ2xhc3MgKS5hZGRDbGFzcyggdmFsaWRDbGFzcyApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCggZWxlbWVudCApLnJlbW92ZUNsYXNzKCBlcnJvckNsYXNzICkuYWRkQ2xhc3MoIHZhbGlkQ2xhc3MgKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL2pRdWVyeS52YWxpZGF0b3Iuc2V0RGVmYXVsdHMvXG5cdHNldERlZmF1bHRzOiBmdW5jdGlvbiggc2V0dGluZ3MgKSB7XG5cdFx0JC5leHRlbmQoICQudmFsaWRhdG9yLmRlZmF1bHRzLCBzZXR0aW5ncyApO1xuXHR9LFxuXG5cdG1lc3NhZ2VzOiB7XG5cdFx0cmVxdWlyZWQ6IFwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZC5cIixcblx0XHRyZW1vdGU6IFwiUGxlYXNlIGZpeCB0aGlzIGZpZWxkLlwiLFxuXHRcdGVtYWlsOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuXCIsXG5cdFx0dXJsOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIFVSTC5cIixcblx0XHRkYXRlOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGRhdGUuXCIsXG5cdFx0ZGF0ZUlTTzogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXRlICggSVNPICkuXCIsXG5cdFx0bnVtYmVyOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIG51bWJlci5cIixcblx0XHRkaWdpdHM6IFwiUGxlYXNlIGVudGVyIG9ubHkgZGlnaXRzLlwiLFxuXHRcdGVxdWFsVG86IFwiUGxlYXNlIGVudGVyIHRoZSBzYW1lIHZhbHVlIGFnYWluLlwiLFxuXHRcdG1heGxlbmd0aDogJC52YWxpZGF0b3IuZm9ybWF0KCBcIlBsZWFzZSBlbnRlciBubyBtb3JlIHRoYW4gezB9IGNoYXJhY3RlcnMuXCIgKSxcblx0XHRtaW5sZW5ndGg6ICQudmFsaWRhdG9yLmZvcm1hdCggXCJQbGVhc2UgZW50ZXIgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIgKSxcblx0XHRyYW5nZWxlbmd0aDogJC52YWxpZGF0b3IuZm9ybWF0KCBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGJldHdlZW4gezB9IGFuZCB7MX0gY2hhcmFjdGVycyBsb25nLlwiICksXG5cdFx0cmFuZ2U6ICQudmFsaWRhdG9yLmZvcm1hdCggXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBiZXR3ZWVuIHswfSBhbmQgezF9LlwiICksXG5cdFx0bWF4OiAkLnZhbGlkYXRvci5mb3JtYXQoIFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHswfS5cIiApLFxuXHRcdG1pbjogJC52YWxpZGF0b3IuZm9ybWF0KCBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB7MH0uXCIgKSxcblx0XHRzdGVwOiAkLnZhbGlkYXRvci5mb3JtYXQoIFwiUGxlYXNlIGVudGVyIGEgbXVsdGlwbGUgb2YgezB9LlwiIClcblx0fSxcblxuXHRhdXRvQ3JlYXRlUmFuZ2VzOiBmYWxzZSxcblxuXHRwcm90b3R5cGU6IHtcblxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5sYWJlbENvbnRhaW5lciA9ICQoIHRoaXMuc2V0dGluZ3MuZXJyb3JMYWJlbENvbnRhaW5lciApO1xuXHRcdFx0dGhpcy5lcnJvckNvbnRleHQgPSB0aGlzLmxhYmVsQ29udGFpbmVyLmxlbmd0aCAmJiB0aGlzLmxhYmVsQ29udGFpbmVyIHx8ICQoIHRoaXMuY3VycmVudEZvcm0gKTtcblx0XHRcdHRoaXMuY29udGFpbmVycyA9ICQoIHRoaXMuc2V0dGluZ3MuZXJyb3JDb250YWluZXIgKS5hZGQoIHRoaXMuc2V0dGluZ3MuZXJyb3JMYWJlbENvbnRhaW5lciApO1xuXHRcdFx0dGhpcy5zdWJtaXR0ZWQgPSB7fTtcblx0XHRcdHRoaXMudmFsdWVDYWNoZSA9IHt9O1xuXHRcdFx0dGhpcy5wZW5kaW5nUmVxdWVzdCA9IDA7XG5cdFx0XHR0aGlzLnBlbmRpbmcgPSB7fTtcblx0XHRcdHRoaXMuaW52YWxpZCA9IHt9O1xuXHRcdFx0dGhpcy5yZXNldCgpO1xuXG5cdFx0XHR2YXIgZ3JvdXBzID0gKCB0aGlzLmdyb3VwcyA9IHt9ICksXG5cdFx0XHRcdHJ1bGVzO1xuXHRcdFx0JC5lYWNoKCB0aGlzLnNldHRpbmdzLmdyb3VwcywgZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XG5cdFx0XHRcdGlmICggdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWUuc3BsaXQoIC9cXHMvICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JC5lYWNoKCB2YWx1ZSwgZnVuY3Rpb24oIGluZGV4LCBuYW1lICkge1xuXHRcdFx0XHRcdGdyb3Vwc1sgbmFtZSBdID0ga2V5O1xuXHRcdFx0XHR9ICk7XG5cdFx0XHR9ICk7XG5cdFx0XHRydWxlcyA9IHRoaXMuc2V0dGluZ3MucnVsZXM7XG5cdFx0XHQkLmVhY2goIHJ1bGVzLCBmdW5jdGlvbigga2V5LCB2YWx1ZSApIHtcblx0XHRcdFx0cnVsZXNbIGtleSBdID0gJC52YWxpZGF0b3Iubm9ybWFsaXplUnVsZSggdmFsdWUgKTtcblx0XHRcdH0gKTtcblxuXHRcdFx0ZnVuY3Rpb24gZGVsZWdhdGUoIGV2ZW50ICkge1xuXHRcdFx0XHR2YXIgdmFsaWRhdG9yID0gJC5kYXRhKCB0aGlzLmZvcm0sIFwidmFsaWRhdG9yXCIgKSxcblx0XHRcdFx0XHRldmVudFR5cGUgPSBcIm9uXCIgKyBldmVudC50eXBlLnJlcGxhY2UoIC9edmFsaWRhdGUvLCBcIlwiICksXG5cdFx0XHRcdFx0c2V0dGluZ3MgPSB2YWxpZGF0b3Iuc2V0dGluZ3M7XG5cdFx0XHRcdGlmICggc2V0dGluZ3NbIGV2ZW50VHlwZSBdICYmICEkKCB0aGlzICkuaXMoIHNldHRpbmdzLmlnbm9yZSApICkge1xuXHRcdFx0XHRcdHNldHRpbmdzWyBldmVudFR5cGUgXS5jYWxsKCB2YWxpZGF0b3IsIHRoaXMsIGV2ZW50ICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0JCggdGhpcy5jdXJyZW50Rm9ybSApXG5cdFx0XHRcdC5vbiggXCJmb2N1c2luLnZhbGlkYXRlIGZvY3Vzb3V0LnZhbGlkYXRlIGtleXVwLnZhbGlkYXRlXCIsXG5cdFx0XHRcdFx0XCI6dGV4dCwgW3R5cGU9J3Bhc3N3b3JkJ10sIFt0eXBlPSdmaWxlJ10sIHNlbGVjdCwgdGV4dGFyZWEsIFt0eXBlPSdudW1iZXInXSwgW3R5cGU9J3NlYXJjaCddLCBcIiArXG5cdFx0XHRcdFx0XCJbdHlwZT0ndGVsJ10sIFt0eXBlPSd1cmwnXSwgW3R5cGU9J2VtYWlsJ10sIFt0eXBlPSdkYXRldGltZSddLCBbdHlwZT0nZGF0ZSddLCBbdHlwZT0nbW9udGgnXSwgXCIgK1xuXHRcdFx0XHRcdFwiW3R5cGU9J3dlZWsnXSwgW3R5cGU9J3RpbWUnXSwgW3R5cGU9J2RhdGV0aW1lLWxvY2FsJ10sIFt0eXBlPSdyYW5nZSddLCBbdHlwZT0nY29sb3InXSwgXCIgK1xuXHRcdFx0XHRcdFwiW3R5cGU9J3JhZGlvJ10sIFt0eXBlPSdjaGVja2JveCddLCBbY29udGVudGVkaXRhYmxlXVwiLCBkZWxlZ2F0ZSApXG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lLCBvbGRJRVxuXHRcdFx0XHQvLyBcInNlbGVjdFwiIGlzIHByb3ZpZGVkIGFzIGV2ZW50LnRhcmdldCB3aGVuIGNsaWNraW5nIGEgb3B0aW9uXG5cdFx0XHRcdC5vbiggXCJjbGljay52YWxpZGF0ZVwiLCBcInNlbGVjdCwgb3B0aW9uLCBbdHlwZT0ncmFkaW8nXSwgW3R5cGU9J2NoZWNrYm94J11cIiwgZGVsZWdhdGUgKTtcblxuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLmludmFsaWRIYW5kbGVyICkge1xuXHRcdFx0XHQkKCB0aGlzLmN1cnJlbnRGb3JtICkub24oIFwiaW52YWxpZC1mb3JtLnZhbGlkYXRlXCIsIHRoaXMuc2V0dGluZ3MuaW52YWxpZEhhbmRsZXIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIGFyaWEtcmVxdWlyZWQgdG8gYW55IFN0YXRpYy9EYXRhL0NsYXNzIHJlcXVpcmVkIGZpZWxkcyBiZWZvcmUgZmlyc3QgdmFsaWRhdGlvblxuXHRcdFx0Ly8gU2NyZWVuIHJlYWRlcnMgcmVxdWlyZSB0aGlzIGF0dHJpYnV0ZSB0byBiZSBwcmVzZW50IGJlZm9yZSB0aGUgaW5pdGlhbCBzdWJtaXNzaW9uIGh0dHA6Ly93d3cudzMub3JnL1RSL1dDQUctVEVDSFMvQVJJQTIuaHRtbFxuXHRcdFx0JCggdGhpcy5jdXJyZW50Rm9ybSApLmZpbmQoIFwiW3JlcXVpcmVkXSwgW2RhdGEtcnVsZS1yZXF1aXJlZF0sIC5yZXF1aXJlZFwiICkuYXR0ciggXCJhcmlhLXJlcXVpcmVkXCIsIFwidHJ1ZVwiICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9WYWxpZGF0b3IuZm9ybS9cblx0XHRmb3JtOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuY2hlY2tGb3JtKCk7XG5cdFx0XHQkLmV4dGVuZCggdGhpcy5zdWJtaXR0ZWQsIHRoaXMuZXJyb3JNYXAgKTtcblx0XHRcdHRoaXMuaW52YWxpZCA9ICQuZXh0ZW5kKCB7fSwgdGhpcy5lcnJvck1hcCApO1xuXHRcdFx0aWYgKCAhdGhpcy52YWxpZCgpICkge1xuXHRcdFx0XHQkKCB0aGlzLmN1cnJlbnRGb3JtICkudHJpZ2dlckhhbmRsZXIoIFwiaW52YWxpZC1mb3JtXCIsIFsgdGhpcyBdICk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNob3dFcnJvcnMoKTtcblx0XHRcdHJldHVybiB0aGlzLnZhbGlkKCk7XG5cdFx0fSxcblxuXHRcdGNoZWNrRm9ybTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnByZXBhcmVGb3JtKCk7XG5cdFx0XHRmb3IgKCB2YXIgaSA9IDAsIGVsZW1lbnRzID0gKCB0aGlzLmN1cnJlbnRFbGVtZW50cyA9IHRoaXMuZWxlbWVudHMoKSApOyBlbGVtZW50c1sgaSBdOyBpKysgKSB7XG5cdFx0XHRcdHRoaXMuY2hlY2soIGVsZW1lbnRzWyBpIF0gKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLnZhbGlkKCk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9WYWxpZGF0b3IuZWxlbWVudC9cblx0XHRlbGVtZW50OiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdHZhciBjbGVhbkVsZW1lbnQgPSB0aGlzLmNsZWFuKCBlbGVtZW50ICksXG5cdFx0XHRcdGNoZWNrRWxlbWVudCA9IHRoaXMudmFsaWRhdGlvblRhcmdldEZvciggY2xlYW5FbGVtZW50ICksXG5cdFx0XHRcdHYgPSB0aGlzLFxuXHRcdFx0XHRyZXN1bHQgPSB0cnVlLFxuXHRcdFx0XHRycywgZ3JvdXA7XG5cblx0XHRcdGlmICggY2hlY2tFbGVtZW50ID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmludmFsaWRbIGNsZWFuRWxlbWVudC5uYW1lIF07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnByZXBhcmVFbGVtZW50KCBjaGVja0VsZW1lbnQgKTtcblx0XHRcdFx0dGhpcy5jdXJyZW50RWxlbWVudHMgPSAkKCBjaGVja0VsZW1lbnQgKTtcblxuXHRcdFx0XHQvLyBJZiB0aGlzIGVsZW1lbnQgaXMgZ3JvdXBlZCwgdGhlbiB2YWxpZGF0ZSBhbGwgZ3JvdXAgZWxlbWVudHMgYWxyZWFkeVxuXHRcdFx0XHQvLyBjb250YWluaW5nIGEgdmFsdWVcblx0XHRcdFx0Z3JvdXAgPSB0aGlzLmdyb3Vwc1sgY2hlY2tFbGVtZW50Lm5hbWUgXTtcblx0XHRcdFx0aWYgKCBncm91cCApIHtcblx0XHRcdFx0XHQkLmVhY2goIHRoaXMuZ3JvdXBzLCBmdW5jdGlvbiggbmFtZSwgdGVzdGdyb3VwICkge1xuXHRcdFx0XHRcdFx0aWYgKCB0ZXN0Z3JvdXAgPT09IGdyb3VwICYmIG5hbWUgIT09IGNoZWNrRWxlbWVudC5uYW1lICkge1xuXHRcdFx0XHRcdFx0XHRjbGVhbkVsZW1lbnQgPSB2LnZhbGlkYXRpb25UYXJnZXRGb3IoIHYuY2xlYW4oIHYuZmluZEJ5TmFtZSggbmFtZSApICkgKTtcblx0XHRcdFx0XHRcdFx0aWYgKCBjbGVhbkVsZW1lbnQgJiYgY2xlYW5FbGVtZW50Lm5hbWUgaW4gdi5pbnZhbGlkICkge1xuXHRcdFx0XHRcdFx0XHRcdHYuY3VycmVudEVsZW1lbnRzLnB1c2goIGNsZWFuRWxlbWVudCApO1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdCAmJiB2LmNoZWNrKCBjbGVhbkVsZW1lbnQgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJzID0gdGhpcy5jaGVjayggY2hlY2tFbGVtZW50ICkgIT09IGZhbHNlO1xuXHRcdFx0XHRyZXN1bHQgPSByZXN1bHQgJiYgcnM7XG5cdFx0XHRcdGlmICggcnMgKSB7XG5cdFx0XHRcdFx0dGhpcy5pbnZhbGlkWyBjaGVja0VsZW1lbnQubmFtZSBdID0gZmFsc2U7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5pbnZhbGlkWyBjaGVja0VsZW1lbnQubmFtZSBdID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggIXRoaXMubnVtYmVyT2ZJbnZhbGlkcygpICkge1xuXG5cdFx0XHRcdFx0Ly8gSGlkZSBlcnJvciBjb250YWluZXJzIG9uIGxhc3QgZXJyb3Jcblx0XHRcdFx0XHR0aGlzLnRvSGlkZSA9IHRoaXMudG9IaWRlLmFkZCggdGhpcy5jb250YWluZXJzICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5zaG93RXJyb3JzKCk7XG5cblx0XHRcdFx0Ly8gQWRkIGFyaWEtaW52YWxpZCBzdGF0dXMgZm9yIHNjcmVlbiByZWFkZXJzXG5cdFx0XHRcdCQoIGVsZW1lbnQgKS5hdHRyKCBcImFyaWEtaW52YWxpZFwiLCAhcnMgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL1ZhbGlkYXRvci5zaG93RXJyb3JzL1xuXHRcdHNob3dFcnJvcnM6IGZ1bmN0aW9uKCBlcnJvcnMgKSB7XG5cdFx0XHRpZiAoIGVycm9ycyApIHtcblx0XHRcdFx0dmFyIHZhbGlkYXRvciA9IHRoaXM7XG5cblx0XHRcdFx0Ly8gQWRkIGl0ZW1zIHRvIGVycm9yIGxpc3QgYW5kIG1hcFxuXHRcdFx0XHQkLmV4dGVuZCggdGhpcy5lcnJvck1hcCwgZXJyb3JzICk7XG5cdFx0XHRcdHRoaXMuZXJyb3JMaXN0ID0gJC5tYXAoIHRoaXMuZXJyb3JNYXAsIGZ1bmN0aW9uKCBtZXNzYWdlLCBuYW1lICkge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBtZXNzYWdlLFxuXHRcdFx0XHRcdFx0ZWxlbWVudDogdmFsaWRhdG9yLmZpbmRCeU5hbWUoIG5hbWUgKVsgMCBdXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSApO1xuXG5cdFx0XHRcdC8vIFJlbW92ZSBpdGVtcyBmcm9tIHN1Y2Nlc3MgbGlzdFxuXHRcdFx0XHR0aGlzLnN1Y2Nlc3NMaXN0ID0gJC5ncmVwKCB0aGlzLnN1Y2Nlc3NMaXN0LCBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdFx0XHRyZXR1cm4gISggZWxlbWVudC5uYW1lIGluIGVycm9ycyApO1xuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHRoaXMuc2V0dGluZ3Muc2hvd0Vycm9ycyApIHtcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5zaG93RXJyb3JzLmNhbGwoIHRoaXMsIHRoaXMuZXJyb3JNYXAsIHRoaXMuZXJyb3JMaXN0ICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmF1bHRTaG93RXJyb3JzKCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9WYWxpZGF0b3IucmVzZXRGb3JtL1xuXHRcdHJlc2V0Rm9ybTogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoICQuZm4ucmVzZXRGb3JtICkge1xuXHRcdFx0XHQkKCB0aGlzLmN1cnJlbnRGb3JtICkucmVzZXRGb3JtKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmludmFsaWQgPSB7fTtcblx0XHRcdHRoaXMuc3VibWl0dGVkID0ge307XG5cdFx0XHR0aGlzLnByZXBhcmVGb3JtKCk7XG5cdFx0XHR0aGlzLmhpZGVFcnJvcnMoKTtcblx0XHRcdHZhciBlbGVtZW50cyA9IHRoaXMuZWxlbWVudHMoKVxuXHRcdFx0XHQucmVtb3ZlRGF0YSggXCJwcmV2aW91c1ZhbHVlXCIgKVxuXHRcdFx0XHQucmVtb3ZlQXR0ciggXCJhcmlhLWludmFsaWRcIiApO1xuXG5cdFx0XHR0aGlzLnJlc2V0RWxlbWVudHMoIGVsZW1lbnRzICk7XG5cdFx0fSxcblxuXHRcdHJlc2V0RWxlbWVudHM6IGZ1bmN0aW9uKCBlbGVtZW50cyApIHtcblx0XHRcdHZhciBpO1xuXG5cdFx0XHRpZiAoIHRoaXMuc2V0dGluZ3MudW5oaWdobGlnaHQgKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwOyBlbGVtZW50c1sgaSBdOyBpKysgKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy51bmhpZ2hsaWdodC5jYWxsKCB0aGlzLCBlbGVtZW50c1sgaSBdLFxuXHRcdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzLCBcIlwiICk7XG5cdFx0XHRcdFx0dGhpcy5maW5kQnlOYW1lKCBlbGVtZW50c1sgaSBdLm5hbWUgKS5yZW1vdmVDbGFzcyggdGhpcy5zZXR0aW5ncy52YWxpZENsYXNzICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnRzXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCB0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MgKVxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcyggdGhpcy5zZXR0aW5ncy52YWxpZENsYXNzICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdG51bWJlck9mSW52YWxpZHM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMub2JqZWN0TGVuZ3RoKCB0aGlzLmludmFsaWQgKTtcblx0XHR9LFxuXG5cdFx0b2JqZWN0TGVuZ3RoOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdFx0LyoganNoaW50IHVudXNlZDogZmFsc2UgKi9cblx0XHRcdHZhciBjb3VudCA9IDAsXG5cdFx0XHRcdGk7XG5cdFx0XHRmb3IgKCBpIGluIG9iaiApIHtcblx0XHRcdFx0aWYgKCBvYmpbIGkgXSApIHtcblx0XHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY291bnQ7XG5cdFx0fSxcblxuXHRcdGhpZGVFcnJvcnM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5oaWRlVGhlc2UoIHRoaXMudG9IaWRlICk7XG5cdFx0fSxcblxuXHRcdGhpZGVUaGVzZTogZnVuY3Rpb24oIGVycm9ycyApIHtcblx0XHRcdGVycm9ycy5ub3QoIHRoaXMuY29udGFpbmVycyApLnRleHQoIFwiXCIgKTtcblx0XHRcdHRoaXMuYWRkV3JhcHBlciggZXJyb3JzICkuaGlkZSgpO1xuXHRcdH0sXG5cblx0XHR2YWxpZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zaXplKCkgPT09IDA7XG5cdFx0fSxcblxuXHRcdHNpemU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZXJyb3JMaXN0Lmxlbmd0aDtcblx0XHR9LFxuXG5cdFx0Zm9jdXNJbnZhbGlkOiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy5mb2N1c0ludmFsaWQgKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0JCggdGhpcy5maW5kTGFzdEFjdGl2ZSgpIHx8IHRoaXMuZXJyb3JMaXN0Lmxlbmd0aCAmJiB0aGlzLmVycm9yTGlzdFsgMCBdLmVsZW1lbnQgfHwgW10gKVxuXHRcdFx0XHRcdC5maWx0ZXIoIFwiOnZpc2libGVcIiApXG5cdFx0XHRcdFx0LmZvY3VzKClcblxuXHRcdFx0XHRcdC8vIE1hbnVhbGx5IHRyaWdnZXIgZm9jdXNpbiBldmVudDsgd2l0aG91dCBpdCwgZm9jdXNpbiBoYW5kbGVyIGlzbid0IGNhbGxlZCwgZmluZExhc3RBY3RpdmUgd29uJ3QgaGF2ZSBhbnl0aGluZyB0byBmaW5kXG5cdFx0XHRcdFx0LnRyaWdnZXIoIFwiZm9jdXNpblwiICk7XG5cdFx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRcdFx0Ly8gSWdub3JlIElFIHRocm93aW5nIGVycm9ycyB3aGVuIGZvY3VzaW5nIGhpZGRlbiBlbGVtZW50c1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGZpbmRMYXN0QWN0aXZlOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBsYXN0QWN0aXZlID0gdGhpcy5sYXN0QWN0aXZlO1xuXHRcdFx0cmV0dXJuIGxhc3RBY3RpdmUgJiYgJC5ncmVwKCB0aGlzLmVycm9yTGlzdCwgZnVuY3Rpb24oIG4gKSB7XG5cdFx0XHRcdHJldHVybiBuLmVsZW1lbnQubmFtZSA9PT0gbGFzdEFjdGl2ZS5uYW1lO1xuXHRcdFx0fSApLmxlbmd0aCA9PT0gMSAmJiBsYXN0QWN0aXZlO1xuXHRcdH0sXG5cblx0XHRlbGVtZW50czogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdmFsaWRhdG9yID0gdGhpcyxcblx0XHRcdFx0cnVsZXNDYWNoZSA9IHt9O1xuXG5cdFx0XHQvLyBTZWxlY3QgYWxsIHZhbGlkIGlucHV0cyBpbnNpZGUgdGhlIGZvcm0gKG5vIHN1Ym1pdCBvciByZXNldCBidXR0b25zKVxuXHRcdFx0cmV0dXJuICQoIHRoaXMuY3VycmVudEZvcm0gKVxuXHRcdFx0LmZpbmQoIFwiaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIFtjb250ZW50ZWRpdGFibGVdXCIgKVxuXHRcdFx0Lm5vdCggXCI6c3VibWl0LCA6cmVzZXQsIDppbWFnZSwgOmRpc2FibGVkXCIgKVxuXHRcdFx0Lm5vdCggdGhpcy5zZXR0aW5ncy5pZ25vcmUgKVxuXHRcdFx0LmZpbHRlciggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBuYW1lID0gdGhpcy5uYW1lIHx8ICQoIHRoaXMgKS5hdHRyKCBcIm5hbWVcIiApOyAvLyBGb3IgY29udGVudGVkaXRhYmxlXG5cdFx0XHRcdGlmICggIW5hbWUgJiYgdmFsaWRhdG9yLnNldHRpbmdzLmRlYnVnICYmIHdpbmRvdy5jb25zb2xlICkge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoIFwiJW8gaGFzIG5vIG5hbWUgYXNzaWduZWRcIiwgdGhpcyApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU2V0IGZvcm0gZXhwYW5kbyBvbiBjb250ZW50ZWRpdGFibGVcblx0XHRcdFx0aWYgKCB0aGlzLmhhc0F0dHJpYnV0ZSggXCJjb250ZW50ZWRpdGFibGVcIiApICkge1xuXHRcdFx0XHRcdHRoaXMuZm9ybSA9ICQoIHRoaXMgKS5jbG9zZXN0KCBcImZvcm1cIiApWyAwIF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTZWxlY3Qgb25seSB0aGUgZmlyc3QgZWxlbWVudCBmb3IgZWFjaCBuYW1lLCBhbmQgb25seSB0aG9zZSB3aXRoIHJ1bGVzIHNwZWNpZmllZFxuXHRcdFx0XHRpZiAoIG5hbWUgaW4gcnVsZXNDYWNoZSB8fCAhdmFsaWRhdG9yLm9iamVjdExlbmd0aCggJCggdGhpcyApLnJ1bGVzKCkgKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRydWxlc0NhY2hlWyBuYW1lIF0gPSB0cnVlO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0gKTtcblx0XHR9LFxuXG5cdFx0Y2xlYW46IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRcdHJldHVybiAkKCBzZWxlY3RvciApWyAwIF07XG5cdFx0fSxcblxuXHRcdGVycm9yczogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZXJyb3JDbGFzcyA9IHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcy5zcGxpdCggXCIgXCIgKS5qb2luKCBcIi5cIiApO1xuXHRcdFx0cmV0dXJuICQoIHRoaXMuc2V0dGluZ3MuZXJyb3JFbGVtZW50ICsgXCIuXCIgKyBlcnJvckNsYXNzLCB0aGlzLmVycm9yQ29udGV4dCApO1xuXHRcdH0sXG5cblx0XHRyZXNldEludGVybmFsczogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnN1Y2Nlc3NMaXN0ID0gW107XG5cdFx0XHR0aGlzLmVycm9yTGlzdCA9IFtdO1xuXHRcdFx0dGhpcy5lcnJvck1hcCA9IHt9O1xuXHRcdFx0dGhpcy50b1Nob3cgPSAkKCBbXSApO1xuXHRcdFx0dGhpcy50b0hpZGUgPSAkKCBbXSApO1xuXHRcdH0sXG5cblx0XHRyZXNldDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnJlc2V0SW50ZXJuYWxzKCk7XG5cdFx0XHR0aGlzLmN1cnJlbnRFbGVtZW50cyA9ICQoIFtdICk7XG5cdFx0fSxcblxuXHRcdHByZXBhcmVGb3JtOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMucmVzZXQoKTtcblx0XHRcdHRoaXMudG9IaWRlID0gdGhpcy5lcnJvcnMoKS5hZGQoIHRoaXMuY29udGFpbmVycyApO1xuXHRcdH0sXG5cblx0XHRwcmVwYXJlRWxlbWVudDogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHR0aGlzLnJlc2V0KCk7XG5cdFx0XHR0aGlzLnRvSGlkZSA9IHRoaXMuZXJyb3JzRm9yKCBlbGVtZW50ICk7XG5cdFx0fSxcblxuXHRcdGVsZW1lbnRWYWx1ZTogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHR2YXIgJGVsZW1lbnQgPSAkKCBlbGVtZW50ICksXG5cdFx0XHRcdHR5cGUgPSBlbGVtZW50LnR5cGUsXG5cdFx0XHRcdHZhbCwgaWR4O1xuXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwicmFkaW9cIiB8fCB0eXBlID09PSBcImNoZWNrYm94XCIgKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmZpbmRCeU5hbWUoIGVsZW1lbnQubmFtZSApLmZpbHRlciggXCI6Y2hlY2tlZFwiICkudmFsKCk7XG5cdFx0XHR9IGVsc2UgaWYgKCB0eXBlID09PSBcIm51bWJlclwiICYmIHR5cGVvZiBlbGVtZW50LnZhbGlkaXR5ICE9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbWVudC52YWxpZGl0eS5iYWRJbnB1dCA/IFwiTmFOXCIgOiAkZWxlbWVudC52YWwoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBlbGVtZW50Lmhhc0F0dHJpYnV0ZSggXCJjb250ZW50ZWRpdGFibGVcIiApICkge1xuXHRcdFx0XHR2YWwgPSAkZWxlbWVudC50ZXh0KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YWwgPSAkZWxlbWVudC52YWwoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCB0eXBlID09PSBcImZpbGVcIiApIHtcblxuXHRcdFx0XHQvLyBNb2Rlcm4gYnJvd3NlciAoY2hyb21lICYgc2FmYXJpKVxuXHRcdFx0XHRpZiAoIHZhbC5zdWJzdHIoIDAsIDEyICkgPT09IFwiQzpcXFxcZmFrZXBhdGhcXFxcXCIgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbC5zdWJzdHIoIDEyICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBMZWdhY3kgYnJvd3NlcnNcblx0XHRcdFx0Ly8gVW5peC1iYXNlZCBwYXRoXG5cdFx0XHRcdGlkeCA9IHZhbC5sYXN0SW5kZXhPZiggXCIvXCIgKTtcblx0XHRcdFx0aWYgKCBpZHggPj0gMCApIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsLnN1YnN0ciggaWR4ICsgMSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gV2luZG93cy1iYXNlZCBwYXRoXG5cdFx0XHRcdGlkeCA9IHZhbC5sYXN0SW5kZXhPZiggXCJcXFxcXCIgKTtcblx0XHRcdFx0aWYgKCBpZHggPj0gMCApIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsLnN1YnN0ciggaWR4ICsgMSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSnVzdCB0aGUgZmlsZSBuYW1lXG5cdFx0XHRcdHJldHVybiB2YWw7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggdHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdFx0cmV0dXJuIHZhbC5yZXBsYWNlKCAvXFxyL2csIFwiXCIgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB2YWw7XG5cdFx0fSxcblxuXHRcdGNoZWNrOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdGVsZW1lbnQgPSB0aGlzLnZhbGlkYXRpb25UYXJnZXRGb3IoIHRoaXMuY2xlYW4oIGVsZW1lbnQgKSApO1xuXG5cdFx0XHR2YXIgcnVsZXMgPSAkKCBlbGVtZW50ICkucnVsZXMoKSxcblx0XHRcdFx0cnVsZXNDb3VudCA9ICQubWFwKCBydWxlcywgZnVuY3Rpb24oIG4sIGkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHRcdH0gKS5sZW5ndGgsXG5cdFx0XHRcdGRlcGVuZGVuY3lNaXNtYXRjaCA9IGZhbHNlLFxuXHRcdFx0XHR2YWwgPSB0aGlzLmVsZW1lbnRWYWx1ZSggZWxlbWVudCApLFxuXHRcdFx0XHRyZXN1bHQsIG1ldGhvZCwgcnVsZTtcblxuXHRcdFx0Ly8gSWYgYSBub3JtYWxpemVyIGlzIGRlZmluZWQgZm9yIHRoaXMgZWxlbWVudCwgdGhlblxuXHRcdFx0Ly8gY2FsbCBpdCB0byByZXRyZWl2ZSB0aGUgY2hhbmdlZCB2YWx1ZSBpbnN0ZWFkXG5cdFx0XHQvLyBvZiB1c2luZyB0aGUgcmVhbCBvbmUuXG5cdFx0XHQvLyBOb3RlIHRoYXQgYHRoaXNgIGluIHRoZSBub3JtYWxpemVyIGlzIGBlbGVtZW50YC5cblx0XHRcdGlmICggdHlwZW9mIHJ1bGVzLm5vcm1hbGl6ZXIgPT09IFwiZnVuY3Rpb25cIiApIHtcblx0XHRcdFx0dmFsID0gcnVsZXMubm9ybWFsaXplci5jYWxsKCBlbGVtZW50LCB2YWwgKTtcblxuXHRcdFx0XHRpZiAoIHR5cGVvZiB2YWwgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggXCJUaGUgbm9ybWFsaXplciBzaG91bGQgcmV0dXJuIGEgc3RyaW5nIHZhbHVlLlwiICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBEZWxldGUgdGhlIG5vcm1hbGl6ZXIgZnJvbSBydWxlcyB0byBhdm9pZCB0cmVhdGluZ1xuXHRcdFx0XHQvLyBpdCBhcyBhIHByZS1kZWZpbmVkIG1ldGhvZC5cblx0XHRcdFx0ZGVsZXRlIHJ1bGVzLm5vcm1hbGl6ZXI7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoIG1ldGhvZCBpbiBydWxlcyApIHtcblx0XHRcdFx0cnVsZSA9IHsgbWV0aG9kOiBtZXRob2QsIHBhcmFtZXRlcnM6IHJ1bGVzWyBtZXRob2QgXSB9O1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJlc3VsdCA9ICQudmFsaWRhdG9yLm1ldGhvZHNbIG1ldGhvZCBdLmNhbGwoIHRoaXMsIHZhbCwgZWxlbWVudCwgcnVsZS5wYXJhbWV0ZXJzICk7XG5cblx0XHRcdFx0XHQvLyBJZiBhIG1ldGhvZCBpbmRpY2F0ZXMgdGhhdCB0aGUgZmllbGQgaXMgb3B0aW9uYWwgYW5kIHRoZXJlZm9yZSB2YWxpZCxcblx0XHRcdFx0XHQvLyBkb24ndCBtYXJrIGl0IGFzIHZhbGlkIHdoZW4gdGhlcmUgYXJlIG5vIG90aGVyIHJ1bGVzXG5cdFx0XHRcdFx0aWYgKCByZXN1bHQgPT09IFwiZGVwZW5kZW5jeS1taXNtYXRjaFwiICYmIHJ1bGVzQ291bnQgPT09IDEgKSB7XG5cdFx0XHRcdFx0XHRkZXBlbmRlbmN5TWlzbWF0Y2ggPSB0cnVlO1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRlcGVuZGVuY3lNaXNtYXRjaCA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKCByZXN1bHQgPT09IFwicGVuZGluZ1wiICkge1xuXHRcdFx0XHRcdFx0dGhpcy50b0hpZGUgPSB0aGlzLnRvSGlkZS5ub3QoIHRoaXMuZXJyb3JzRm9yKCBlbGVtZW50ICkgKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoICFyZXN1bHQgKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmZvcm1hdEFuZEFkZCggZWxlbWVudCwgcnVsZSApO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLmRlYnVnICYmIHdpbmRvdy5jb25zb2xlICkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coIFwiRXhjZXB0aW9uIG9jY3VycmVkIHdoZW4gY2hlY2tpbmcgZWxlbWVudCBcIiArIGVsZW1lbnQuaWQgKyBcIiwgY2hlY2sgdGhlICdcIiArIHJ1bGUubWV0aG9kICsgXCInIG1ldGhvZC5cIiwgZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIGUgaW5zdGFuY2VvZiBUeXBlRXJyb3IgKSB7XG5cdFx0XHRcdFx0XHRlLm1lc3NhZ2UgKz0gXCIuICBFeGNlcHRpb24gb2NjdXJyZWQgd2hlbiBjaGVja2luZyBlbGVtZW50IFwiICsgZWxlbWVudC5pZCArIFwiLCBjaGVjayB0aGUgJ1wiICsgcnVsZS5tZXRob2QgKyBcIicgbWV0aG9kLlwiO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRocm93IGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICggZGVwZW5kZW5jeU1pc21hdGNoICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHRoaXMub2JqZWN0TGVuZ3RoKCBydWxlcyApICkge1xuXHRcdFx0XHR0aGlzLnN1Y2Nlc3NMaXN0LnB1c2goIGVsZW1lbnQgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm4gdGhlIGN1c3RvbSBtZXNzYWdlIGZvciB0aGUgZ2l2ZW4gZWxlbWVudCBhbmQgdmFsaWRhdGlvbiBtZXRob2Rcblx0XHQvLyBzcGVjaWZpZWQgaW4gdGhlIGVsZW1lbnQncyBIVE1MNSBkYXRhIGF0dHJpYnV0ZVxuXHRcdC8vIHJldHVybiB0aGUgZ2VuZXJpYyBtZXNzYWdlIGlmIHByZXNlbnQgYW5kIG5vIG1ldGhvZCBzcGVjaWZpYyBtZXNzYWdlIGlzIHByZXNlbnRcblx0XHRjdXN0b21EYXRhTWVzc2FnZTogZnVuY3Rpb24oIGVsZW1lbnQsIG1ldGhvZCApIHtcblx0XHRcdHJldHVybiAkKCBlbGVtZW50ICkuZGF0YSggXCJtc2dcIiArIG1ldGhvZC5jaGFyQXQoIDAgKS50b1VwcGVyQ2FzZSgpICtcblx0XHRcdFx0bWV0aG9kLnN1YnN0cmluZyggMSApLnRvTG93ZXJDYXNlKCkgKSB8fCAkKCBlbGVtZW50ICkuZGF0YSggXCJtc2dcIiApO1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm4gdGhlIGN1c3RvbSBtZXNzYWdlIGZvciB0aGUgZ2l2ZW4gZWxlbWVudCBuYW1lIGFuZCB2YWxpZGF0aW9uIG1ldGhvZFxuXHRcdGN1c3RvbU1lc3NhZ2U6IGZ1bmN0aW9uKCBuYW1lLCBtZXRob2QgKSB7XG5cdFx0XHR2YXIgbSA9IHRoaXMuc2V0dGluZ3MubWVzc2FnZXNbIG5hbWUgXTtcblx0XHRcdHJldHVybiBtICYmICggbS5jb25zdHJ1Y3RvciA9PT0gU3RyaW5nID8gbSA6IG1bIG1ldGhvZCBdICk7XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybiB0aGUgZmlyc3QgZGVmaW5lZCBhcmd1bWVudCwgYWxsb3dpbmcgZW1wdHkgc3RyaW5nc1xuXHRcdGZpbmREZWZpbmVkOiBmdW5jdGlvbigpIHtcblx0XHRcdGZvciAoIHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBhcmd1bWVudHNbIGkgXSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHJldHVybiBhcmd1bWVudHNbIGkgXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9LFxuXG5cdFx0ZGVmYXVsdE1lc3NhZ2U6IGZ1bmN0aW9uKCBlbGVtZW50LCBydWxlICkge1xuXHRcdFx0dmFyIG1lc3NhZ2UgPSB0aGlzLmZpbmREZWZpbmVkKFxuXHRcdFx0XHRcdHRoaXMuY3VzdG9tTWVzc2FnZSggZWxlbWVudC5uYW1lLCBydWxlLm1ldGhvZCApLFxuXHRcdFx0XHRcdHRoaXMuY3VzdG9tRGF0YU1lc3NhZ2UoIGVsZW1lbnQsIHJ1bGUubWV0aG9kICksXG5cblx0XHRcdFx0XHQvLyAndGl0bGUnIGlzIG5ldmVyIHVuZGVmaW5lZCwgc28gaGFuZGxlIGVtcHR5IHN0cmluZyBhcyB1bmRlZmluZWRcblx0XHRcdFx0XHQhdGhpcy5zZXR0aW5ncy5pZ25vcmVUaXRsZSAmJiBlbGVtZW50LnRpdGxlIHx8IHVuZGVmaW5lZCxcblx0XHRcdFx0XHQkLnZhbGlkYXRvci5tZXNzYWdlc1sgcnVsZS5tZXRob2QgXSxcblx0XHRcdFx0XHRcIjxzdHJvbmc+V2FybmluZzogTm8gbWVzc2FnZSBkZWZpbmVkIGZvciBcIiArIGVsZW1lbnQubmFtZSArIFwiPC9zdHJvbmc+XCJcblx0XHRcdFx0KSxcblx0XHRcdFx0dGhlcmVnZXggPSAvXFwkP1xceyhcXGQrKVxcfS9nO1xuXHRcdFx0aWYgKCB0eXBlb2YgbWVzc2FnZSA9PT0gXCJmdW5jdGlvblwiICkge1xuXHRcdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5jYWxsKCB0aGlzLCBydWxlLnBhcmFtZXRlcnMsIGVsZW1lbnQgKTtcblx0XHRcdH0gZWxzZSBpZiAoIHRoZXJlZ2V4LnRlc3QoIG1lc3NhZ2UgKSApIHtcblx0XHRcdFx0bWVzc2FnZSA9ICQudmFsaWRhdG9yLmZvcm1hdCggbWVzc2FnZS5yZXBsYWNlKCB0aGVyZWdleCwgXCJ7JDF9XCIgKSwgcnVsZS5wYXJhbWV0ZXJzICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBtZXNzYWdlO1xuXHRcdH0sXG5cblx0XHRmb3JtYXRBbmRBZGQ6IGZ1bmN0aW9uKCBlbGVtZW50LCBydWxlICkge1xuXHRcdFx0dmFyIG1lc3NhZ2UgPSB0aGlzLmRlZmF1bHRNZXNzYWdlKCBlbGVtZW50LCBydWxlICk7XG5cblx0XHRcdHRoaXMuZXJyb3JMaXN0LnB1c2goIHtcblx0XHRcdFx0bWVzc2FnZTogbWVzc2FnZSxcblx0XHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdFx0bWV0aG9kOiBydWxlLm1ldGhvZFxuXHRcdFx0fSApO1xuXG5cdFx0XHR0aGlzLmVycm9yTWFwWyBlbGVtZW50Lm5hbWUgXSA9IG1lc3NhZ2U7XG5cdFx0XHR0aGlzLnN1Ym1pdHRlZFsgZWxlbWVudC5uYW1lIF0gPSBtZXNzYWdlO1xuXHRcdH0sXG5cblx0XHRhZGRXcmFwcGVyOiBmdW5jdGlvbiggdG9Ub2dnbGUgKSB7XG5cdFx0XHRpZiAoIHRoaXMuc2V0dGluZ3Mud3JhcHBlciApIHtcblx0XHRcdFx0dG9Ub2dnbGUgPSB0b1RvZ2dsZS5hZGQoIHRvVG9nZ2xlLnBhcmVudCggdGhpcy5zZXR0aW5ncy53cmFwcGVyICkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0b1RvZ2dsZTtcblx0XHR9LFxuXG5cdFx0ZGVmYXVsdFNob3dFcnJvcnM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGksIGVsZW1lbnRzLCBlcnJvcjtcblx0XHRcdGZvciAoIGkgPSAwOyB0aGlzLmVycm9yTGlzdFsgaSBdOyBpKysgKSB7XG5cdFx0XHRcdGVycm9yID0gdGhpcy5lcnJvckxpc3RbIGkgXTtcblx0XHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLmhpZ2hsaWdodCApIHtcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLmhpZ2hsaWdodC5jYWxsKCB0aGlzLCBlcnJvci5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MsIHRoaXMuc2V0dGluZ3MudmFsaWRDbGFzcyApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2hvd0xhYmVsKCBlcnJvci5lbGVtZW50LCBlcnJvci5tZXNzYWdlICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHRoaXMuZXJyb3JMaXN0Lmxlbmd0aCApIHtcblx0XHRcdFx0dGhpcy50b1Nob3cgPSB0aGlzLnRvU2hvdy5hZGQoIHRoaXMuY29udGFpbmVycyApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLnN1Y2Nlc3MgKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwOyB0aGlzLnN1Y2Nlc3NMaXN0WyBpIF07IGkrKyApIHtcblx0XHRcdFx0XHR0aGlzLnNob3dMYWJlbCggdGhpcy5zdWNjZXNzTGlzdFsgaSBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy51bmhpZ2hsaWdodCApIHtcblx0XHRcdFx0Zm9yICggaSA9IDAsIGVsZW1lbnRzID0gdGhpcy52YWxpZEVsZW1lbnRzKCk7IGVsZW1lbnRzWyBpIF07IGkrKyApIHtcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLnVuaGlnaGxpZ2h0LmNhbGwoIHRoaXMsIGVsZW1lbnRzWyBpIF0sIHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcywgdGhpcy5zZXR0aW5ncy52YWxpZENsYXNzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMudG9IaWRlID0gdGhpcy50b0hpZGUubm90KCB0aGlzLnRvU2hvdyApO1xuXHRcdFx0dGhpcy5oaWRlRXJyb3JzKCk7XG5cdFx0XHR0aGlzLmFkZFdyYXBwZXIoIHRoaXMudG9TaG93ICkuc2hvdygpO1xuXHRcdH0sXG5cblx0XHR2YWxpZEVsZW1lbnRzOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmN1cnJlbnRFbGVtZW50cy5ub3QoIHRoaXMuaW52YWxpZEVsZW1lbnRzKCkgKTtcblx0XHR9LFxuXG5cdFx0aW52YWxpZEVsZW1lbnRzOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiAkKCB0aGlzLmVycm9yTGlzdCApLm1hcCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQ7XG5cdFx0XHR9ICk7XG5cdFx0fSxcblxuXHRcdHNob3dMYWJlbDogZnVuY3Rpb24oIGVsZW1lbnQsIG1lc3NhZ2UgKSB7XG5cdFx0XHR2YXIgcGxhY2UsIGdyb3VwLCBlcnJvcklELCB2LFxuXHRcdFx0XHRlcnJvciA9IHRoaXMuZXJyb3JzRm9yKCBlbGVtZW50ICksXG5cdFx0XHRcdGVsZW1lbnRJRCA9IHRoaXMuaWRPck5hbWUoIGVsZW1lbnQgKSxcblx0XHRcdFx0ZGVzY3JpYmVkQnkgPSAkKCBlbGVtZW50ICkuYXR0ciggXCJhcmlhLWRlc2NyaWJlZGJ5XCIgKTtcblxuXHRcdFx0aWYgKCBlcnJvci5sZW5ndGggKSB7XG5cblx0XHRcdFx0Ly8gUmVmcmVzaCBlcnJvci9zdWNjZXNzIGNsYXNzXG5cdFx0XHRcdGVycm9yLnJlbW92ZUNsYXNzKCB0aGlzLnNldHRpbmdzLnZhbGlkQ2xhc3MgKS5hZGRDbGFzcyggdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzICk7XG5cblx0XHRcdFx0Ly8gUmVwbGFjZSBtZXNzYWdlIG9uIGV4aXN0aW5nIGxhYmVsXG5cdFx0XHRcdGVycm9yLmh0bWwoIG1lc3NhZ2UgKTtcblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gQ3JlYXRlIGVycm9yIGVsZW1lbnRcblx0XHRcdFx0ZXJyb3IgPSAkKCBcIjxcIiArIHRoaXMuc2V0dGluZ3MuZXJyb3JFbGVtZW50ICsgXCI+XCIgKVxuXHRcdFx0XHRcdC5hdHRyKCBcImlkXCIsIGVsZW1lbnRJRCArIFwiLWVycm9yXCIgKVxuXHRcdFx0XHRcdC5hZGRDbGFzcyggdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzIClcblx0XHRcdFx0XHQuaHRtbCggbWVzc2FnZSB8fCBcIlwiICk7XG5cblx0XHRcdFx0Ly8gTWFpbnRhaW4gcmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50IHRvIGJlIHBsYWNlZCBpbnRvIHRoZSBET01cblx0XHRcdFx0cGxhY2UgPSBlcnJvcjtcblx0XHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLndyYXBwZXIgKSB7XG5cblx0XHRcdFx0XHQvLyBNYWtlIHN1cmUgdGhlIGVsZW1lbnQgaXMgdmlzaWJsZSwgZXZlbiBpbiBJRVxuXHRcdFx0XHRcdC8vIGFjdHVhbGx5IHNob3dpbmcgdGhlIHdyYXBwZWQgZWxlbWVudCBpcyBoYW5kbGVkIGVsc2V3aGVyZVxuXHRcdFx0XHRcdHBsYWNlID0gZXJyb3IuaGlkZSgpLnNob3coKS53cmFwKCBcIjxcIiArIHRoaXMuc2V0dGluZ3Mud3JhcHBlciArIFwiLz5cIiApLnBhcmVudCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggdGhpcy5sYWJlbENvbnRhaW5lci5sZW5ndGggKSB7XG5cdFx0XHRcdFx0dGhpcy5sYWJlbENvbnRhaW5lci5hcHBlbmQoIHBsYWNlICk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHRoaXMuc2V0dGluZ3MuZXJyb3JQbGFjZW1lbnQgKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5lcnJvclBsYWNlbWVudCggcGxhY2UsICQoIGVsZW1lbnQgKSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHBsYWNlLmluc2VydEFmdGVyKCBlbGVtZW50ICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBMaW5rIGVycm9yIGJhY2sgdG8gdGhlIGVsZW1lbnRcblx0XHRcdFx0aWYgKCBlcnJvci5pcyggXCJsYWJlbFwiICkgKSB7XG5cblx0XHRcdFx0XHQvLyBJZiB0aGUgZXJyb3IgaXMgYSBsYWJlbCwgdGhlbiBhc3NvY2lhdGUgdXNpbmcgJ2Zvcidcblx0XHRcdFx0XHRlcnJvci5hdHRyKCBcImZvclwiLCBlbGVtZW50SUQgKTtcblxuXHRcdFx0XHRcdC8vIElmIHRoZSBlbGVtZW50IGlzIG5vdCBhIGNoaWxkIG9mIGFuIGFzc29jaWF0ZWQgbGFiZWwsIHRoZW4gaXQncyBuZWNlc3Nhcnlcblx0XHRcdFx0XHQvLyB0byBleHBsaWNpdGx5IGFwcGx5IGFyaWEtZGVzY3JpYmVkYnlcblx0XHRcdFx0fSBlbHNlIGlmICggZXJyb3IucGFyZW50cyggXCJsYWJlbFtmb3I9J1wiICsgdGhpcy5lc2NhcGVDc3NNZXRhKCBlbGVtZW50SUQgKSArIFwiJ11cIiApLmxlbmd0aCA9PT0gMCApIHtcblx0XHRcdFx0XHRlcnJvcklEID0gZXJyb3IuYXR0ciggXCJpZFwiICk7XG5cblx0XHRcdFx0XHQvLyBSZXNwZWN0IGV4aXN0aW5nIG5vbi1lcnJvciBhcmlhLWRlc2NyaWJlZGJ5XG5cdFx0XHRcdFx0aWYgKCAhZGVzY3JpYmVkQnkgKSB7XG5cdFx0XHRcdFx0XHRkZXNjcmliZWRCeSA9IGVycm9ySUQ7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICggIWRlc2NyaWJlZEJ5Lm1hdGNoKCBuZXcgUmVnRXhwKCBcIlxcXFxiXCIgKyB0aGlzLmVzY2FwZUNzc01ldGEoIGVycm9ySUQgKSArIFwiXFxcXGJcIiApICkgKSB7XG5cblx0XHRcdFx0XHRcdC8vIEFkZCB0byBlbmQgb2YgbGlzdCBpZiBub3QgYWxyZWFkeSBwcmVzZW50XG5cdFx0XHRcdFx0XHRkZXNjcmliZWRCeSArPSBcIiBcIiArIGVycm9ySUQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCQoIGVsZW1lbnQgKS5hdHRyKCBcImFyaWEtZGVzY3JpYmVkYnlcIiwgZGVzY3JpYmVkQnkgKTtcblxuXHRcdFx0XHRcdC8vIElmIHRoaXMgZWxlbWVudCBpcyBncm91cGVkLCB0aGVuIGFzc2lnbiB0byBhbGwgZWxlbWVudHMgaW4gdGhlIHNhbWUgZ3JvdXBcblx0XHRcdFx0XHRncm91cCA9IHRoaXMuZ3JvdXBzWyBlbGVtZW50Lm5hbWUgXTtcblx0XHRcdFx0XHRpZiAoIGdyb3VwICkge1xuXHRcdFx0XHRcdFx0diA9IHRoaXM7XG5cdFx0XHRcdFx0XHQkLmVhY2goIHYuZ3JvdXBzLCBmdW5jdGlvbiggbmFtZSwgdGVzdGdyb3VwICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIHRlc3Rncm91cCA9PT0gZ3JvdXAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0JCggXCJbbmFtZT0nXCIgKyB2LmVzY2FwZUNzc01ldGEoIG5hbWUgKSArIFwiJ11cIiwgdi5jdXJyZW50Rm9ybSApXG5cdFx0XHRcdFx0XHRcdFx0XHQuYXR0ciggXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIGVycm9yLmF0dHIoIFwiaWRcIiApICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICggIW1lc3NhZ2UgJiYgdGhpcy5zZXR0aW5ncy5zdWNjZXNzICkge1xuXHRcdFx0XHRlcnJvci50ZXh0KCBcIlwiICk7XG5cdFx0XHRcdGlmICggdHlwZW9mIHRoaXMuc2V0dGluZ3Muc3VjY2VzcyA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdFx0XHRlcnJvci5hZGRDbGFzcyggdGhpcy5zZXR0aW5ncy5zdWNjZXNzICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5zdWNjZXNzKCBlcnJvciwgZWxlbWVudCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnRvU2hvdyA9IHRoaXMudG9TaG93LmFkZCggZXJyb3IgKTtcblx0XHR9LFxuXG5cdFx0ZXJyb3JzRm9yOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdHZhciBuYW1lID0gdGhpcy5lc2NhcGVDc3NNZXRhKCB0aGlzLmlkT3JOYW1lKCBlbGVtZW50ICkgKSxcblx0XHRcdFx0ZGVzY3JpYmVyID0gJCggZWxlbWVudCApLmF0dHIoIFwiYXJpYS1kZXNjcmliZWRieVwiICksXG5cdFx0XHRcdHNlbGVjdG9yID0gXCJsYWJlbFtmb3I9J1wiICsgbmFtZSArIFwiJ10sIGxhYmVsW2Zvcj0nXCIgKyBuYW1lICsgXCInXSAqXCI7XG5cblx0XHRcdC8vICdhcmlhLWRlc2NyaWJlZGJ5JyBzaG91bGQgZGlyZWN0bHkgcmVmZXJlbmNlIHRoZSBlcnJvciBlbGVtZW50XG5cdFx0XHRpZiAoIGRlc2NyaWJlciApIHtcblx0XHRcdFx0c2VsZWN0b3IgPSBzZWxlY3RvciArIFwiLCAjXCIgKyB0aGlzLmVzY2FwZUNzc01ldGEoIGRlc2NyaWJlciApXG5cdFx0XHRcdFx0LnJlcGxhY2UoIC9cXHMrL2csIFwiLCAjXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRcdFx0LmVycm9ycygpXG5cdFx0XHRcdC5maWx0ZXIoIHNlbGVjdG9yICk7XG5cdFx0fSxcblxuXHRcdC8vIFNlZSBodHRwczovL2FwaS5qcXVlcnkuY29tL2NhdGVnb3J5L3NlbGVjdG9ycy8sIGZvciBDU1Ncblx0XHQvLyBtZXRhLWNoYXJhY3RlcnMgdGhhdCBzaG91bGQgYmUgZXNjYXBlZCBpbiBvcmRlciB0byBiZSB1c2VkIHdpdGggSlF1ZXJ5XG5cdFx0Ly8gYXMgYSBsaXRlcmFsIHBhcnQgb2YgYSBuYW1lL2lkIG9yIGFueSBzZWxlY3Rvci5cblx0XHRlc2NhcGVDc3NNZXRhOiBmdW5jdGlvbiggc3RyaW5nICkge1xuXHRcdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKCAvKFtcXFxcIVwiIyQlJicoKSorLC4vOjs8PT4/QFxcW1xcXV5ge3x9fl0pL2csIFwiXFxcXCQxXCIgKTtcblx0XHR9LFxuXG5cdFx0aWRPck5hbWU6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ3JvdXBzWyBlbGVtZW50Lm5hbWUgXSB8fCAoIHRoaXMuY2hlY2thYmxlKCBlbGVtZW50ICkgPyBlbGVtZW50Lm5hbWUgOiBlbGVtZW50LmlkIHx8IGVsZW1lbnQubmFtZSApO1xuXHRcdH0sXG5cblx0XHR2YWxpZGF0aW9uVGFyZ2V0Rm9yOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblxuXHRcdFx0Ly8gSWYgcmFkaW8vY2hlY2tib3gsIHZhbGlkYXRlIGZpcnN0IGVsZW1lbnQgaW4gZ3JvdXAgaW5zdGVhZFxuXHRcdFx0aWYgKCB0aGlzLmNoZWNrYWJsZSggZWxlbWVudCApICkge1xuXHRcdFx0XHRlbGVtZW50ID0gdGhpcy5maW5kQnlOYW1lKCBlbGVtZW50Lm5hbWUgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWx3YXlzIGFwcGx5IGlnbm9yZSBmaWx0ZXJcblx0XHRcdHJldHVybiAkKCBlbGVtZW50ICkubm90KCB0aGlzLnNldHRpbmdzLmlnbm9yZSApWyAwIF07XG5cdFx0fSxcblxuXHRcdGNoZWNrYWJsZTogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gKCAvcmFkaW98Y2hlY2tib3gvaSApLnRlc3QoIGVsZW1lbnQudHlwZSApO1xuXHRcdH0sXG5cblx0XHRmaW5kQnlOYW1lOiBmdW5jdGlvbiggbmFtZSApIHtcblx0XHRcdHJldHVybiAkKCB0aGlzLmN1cnJlbnRGb3JtICkuZmluZCggXCJbbmFtZT0nXCIgKyB0aGlzLmVzY2FwZUNzc01ldGEoIG5hbWUgKSArIFwiJ11cIiApO1xuXHRcdH0sXG5cblx0XHRnZXRMZW5ndGg6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCApIHtcblx0XHRcdHN3aXRjaCAoIGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSApIHtcblx0XHRcdGNhc2UgXCJzZWxlY3RcIjpcblx0XHRcdFx0cmV0dXJuICQoIFwib3B0aW9uOnNlbGVjdGVkXCIsIGVsZW1lbnQgKS5sZW5ndGg7XG5cdFx0XHRjYXNlIFwiaW5wdXRcIjpcblx0XHRcdFx0aWYgKCB0aGlzLmNoZWNrYWJsZSggZWxlbWVudCApICkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmZpbmRCeU5hbWUoIGVsZW1lbnQubmFtZSApLmZpbHRlciggXCI6Y2hlY2tlZFwiICkubGVuZ3RoO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoO1xuXHRcdH0sXG5cblx0XHRkZXBlbmQ6IGZ1bmN0aW9uKCBwYXJhbSwgZWxlbWVudCApIHtcblx0XHRcdHJldHVybiB0aGlzLmRlcGVuZFR5cGVzWyB0eXBlb2YgcGFyYW0gXSA/IHRoaXMuZGVwZW5kVHlwZXNbIHR5cGVvZiBwYXJhbSBdKCBwYXJhbSwgZWxlbWVudCApIDogdHJ1ZTtcblx0XHR9LFxuXG5cdFx0ZGVwZW5kVHlwZXM6IHtcblx0XHRcdFwiYm9vbGVhblwiOiBmdW5jdGlvbiggcGFyYW0gKSB7XG5cdFx0XHRcdHJldHVybiBwYXJhbTtcblx0XHRcdH0sXG5cdFx0XHRcInN0cmluZ1wiOiBmdW5jdGlvbiggcGFyYW0sIGVsZW1lbnQgKSB7XG5cdFx0XHRcdHJldHVybiAhISQoIHBhcmFtLCBlbGVtZW50LmZvcm0gKS5sZW5ndGg7XG5cdFx0XHR9LFxuXHRcdFx0XCJmdW5jdGlvblwiOiBmdW5jdGlvbiggcGFyYW0sIGVsZW1lbnQgKSB7XG5cdFx0XHRcdHJldHVybiBwYXJhbSggZWxlbWVudCApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRvcHRpb25hbDogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHR2YXIgdmFsID0gdGhpcy5lbGVtZW50VmFsdWUoIGVsZW1lbnQgKTtcblx0XHRcdHJldHVybiAhJC52YWxpZGF0b3IubWV0aG9kcy5yZXF1aXJlZC5jYWxsKCB0aGlzLCB2YWwsIGVsZW1lbnQgKSAmJiBcImRlcGVuZGVuY3ktbWlzbWF0Y2hcIjtcblx0XHR9LFxuXG5cdFx0c3RhcnRSZXF1ZXN0OiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdGlmICggIXRoaXMucGVuZGluZ1sgZWxlbWVudC5uYW1lIF0gKSB7XG5cdFx0XHRcdHRoaXMucGVuZGluZ1JlcXVlc3QrKztcblx0XHRcdFx0JCggZWxlbWVudCApLmFkZENsYXNzKCB0aGlzLnNldHRpbmdzLnBlbmRpbmdDbGFzcyApO1xuXHRcdFx0XHR0aGlzLnBlbmRpbmdbIGVsZW1lbnQubmFtZSBdID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0c3RvcFJlcXVlc3Q6IGZ1bmN0aW9uKCBlbGVtZW50LCB2YWxpZCApIHtcblx0XHRcdHRoaXMucGVuZGluZ1JlcXVlc3QtLTtcblxuXHRcdFx0Ly8gU29tZXRpbWVzIHN5bmNocm9uaXphdGlvbiBmYWlscywgbWFrZSBzdXJlIHBlbmRpbmdSZXF1ZXN0IGlzIG5ldmVyIDwgMFxuXHRcdFx0aWYgKCB0aGlzLnBlbmRpbmdSZXF1ZXN0IDwgMCApIHtcblx0XHRcdFx0dGhpcy5wZW5kaW5nUmVxdWVzdCA9IDA7XG5cdFx0XHR9XG5cdFx0XHRkZWxldGUgdGhpcy5wZW5kaW5nWyBlbGVtZW50Lm5hbWUgXTtcblx0XHRcdCQoIGVsZW1lbnQgKS5yZW1vdmVDbGFzcyggdGhpcy5zZXR0aW5ncy5wZW5kaW5nQ2xhc3MgKTtcblx0XHRcdGlmICggdmFsaWQgJiYgdGhpcy5wZW5kaW5nUmVxdWVzdCA9PT0gMCAmJiB0aGlzLmZvcm1TdWJtaXR0ZWQgJiYgdGhpcy5mb3JtKCkgKSB7XG5cdFx0XHRcdCQoIHRoaXMuY3VycmVudEZvcm0gKS5zdWJtaXQoKTtcblx0XHRcdFx0dGhpcy5mb3JtU3VibWl0dGVkID0gZmFsc2U7XG5cdFx0XHR9IGVsc2UgaWYgKCAhdmFsaWQgJiYgdGhpcy5wZW5kaW5nUmVxdWVzdCA9PT0gMCAmJiB0aGlzLmZvcm1TdWJtaXR0ZWQgKSB7XG5cdFx0XHRcdCQoIHRoaXMuY3VycmVudEZvcm0gKS50cmlnZ2VySGFuZGxlciggXCJpbnZhbGlkLWZvcm1cIiwgWyB0aGlzIF0gKTtcblx0XHRcdFx0dGhpcy5mb3JtU3VibWl0dGVkID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHByZXZpb3VzVmFsdWU6IGZ1bmN0aW9uKCBlbGVtZW50LCBtZXRob2QgKSB7XG5cdFx0XHRyZXR1cm4gJC5kYXRhKCBlbGVtZW50LCBcInByZXZpb3VzVmFsdWVcIiApIHx8ICQuZGF0YSggZWxlbWVudCwgXCJwcmV2aW91c1ZhbHVlXCIsIHtcblx0XHRcdFx0b2xkOiBudWxsLFxuXHRcdFx0XHR2YWxpZDogdHJ1ZSxcblx0XHRcdFx0bWVzc2FnZTogdGhpcy5kZWZhdWx0TWVzc2FnZSggZWxlbWVudCwgeyBtZXRob2Q6IG1ldGhvZCB9IClcblx0XHRcdH0gKTtcblx0XHR9LFxuXG5cdFx0Ly8gQ2xlYW5zIHVwIGFsbCBmb3JtcyBhbmQgZWxlbWVudHMsIHJlbW92ZXMgdmFsaWRhdG9yLXNwZWNpZmljIGV2ZW50c1xuXHRcdGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5yZXNldEZvcm0oKTtcblxuXHRcdFx0JCggdGhpcy5jdXJyZW50Rm9ybSApXG5cdFx0XHRcdC5vZmYoIFwiLnZhbGlkYXRlXCIgKVxuXHRcdFx0XHQucmVtb3ZlRGF0YSggXCJ2YWxpZGF0b3JcIiApXG5cdFx0XHRcdC5maW5kKCBcIi52YWxpZGF0ZS1lcXVhbFRvLWJsdXJcIiApXG5cdFx0XHRcdFx0Lm9mZiggXCIudmFsaWRhdGUtZXF1YWxUb1wiIClcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoIFwidmFsaWRhdGUtZXF1YWxUby1ibHVyXCIgKTtcblx0XHR9XG5cblx0fSxcblxuXHRjbGFzc1J1bGVTZXR0aW5nczoge1xuXHRcdHJlcXVpcmVkOiB7IHJlcXVpcmVkOiB0cnVlIH0sXG5cdFx0ZW1haWw6IHsgZW1haWw6IHRydWUgfSxcblx0XHR1cmw6IHsgdXJsOiB0cnVlIH0sXG5cdFx0ZGF0ZTogeyBkYXRlOiB0cnVlIH0sXG5cdFx0ZGF0ZUlTTzogeyBkYXRlSVNPOiB0cnVlIH0sXG5cdFx0bnVtYmVyOiB7IG51bWJlcjogdHJ1ZSB9LFxuXHRcdGRpZ2l0czogeyBkaWdpdHM6IHRydWUgfSxcblx0XHRjcmVkaXRjYXJkOiB7IGNyZWRpdGNhcmQ6IHRydWUgfVxuXHR9LFxuXG5cdGFkZENsYXNzUnVsZXM6IGZ1bmN0aW9uKCBjbGFzc05hbWUsIHJ1bGVzICkge1xuXHRcdGlmICggY2xhc3NOYW1lLmNvbnN0cnVjdG9yID09PSBTdHJpbmcgKSB7XG5cdFx0XHR0aGlzLmNsYXNzUnVsZVNldHRpbmdzWyBjbGFzc05hbWUgXSA9IHJ1bGVzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkLmV4dGVuZCggdGhpcy5jbGFzc1J1bGVTZXR0aW5ncywgY2xhc3NOYW1lICk7XG5cdFx0fVxuXHR9LFxuXG5cdGNsYXNzUnVsZXM6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdHZhciBydWxlcyA9IHt9LFxuXHRcdFx0Y2xhc3NlcyA9ICQoIGVsZW1lbnQgKS5hdHRyKCBcImNsYXNzXCIgKTtcblxuXHRcdGlmICggY2xhc3NlcyApIHtcblx0XHRcdCQuZWFjaCggY2xhc3Nlcy5zcGxpdCggXCIgXCIgKSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggdGhpcyBpbiAkLnZhbGlkYXRvci5jbGFzc1J1bGVTZXR0aW5ncyApIHtcblx0XHRcdFx0XHQkLmV4dGVuZCggcnVsZXMsICQudmFsaWRhdG9yLmNsYXNzUnVsZVNldHRpbmdzWyB0aGlzIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXHRcdH1cblx0XHRyZXR1cm4gcnVsZXM7XG5cdH0sXG5cblx0bm9ybWFsaXplQXR0cmlidXRlUnVsZTogZnVuY3Rpb24oIHJ1bGVzLCB0eXBlLCBtZXRob2QsIHZhbHVlICkge1xuXG5cdFx0Ly8gQ29udmVydCB0aGUgdmFsdWUgdG8gYSBudW1iZXIgZm9yIG51bWJlciBpbnB1dHMsIGFuZCBmb3IgdGV4dCBmb3IgYmFja3dhcmRzIGNvbXBhYmlsaXR5XG5cdFx0Ly8gYWxsb3dzIHR5cGU9XCJkYXRlXCIgYW5kIG90aGVycyB0byBiZSBjb21wYXJlZCBhcyBzdHJpbmdzXG5cdFx0aWYgKCAvbWlufG1heHxzdGVwLy50ZXN0KCBtZXRob2QgKSAmJiAoIHR5cGUgPT09IG51bGwgfHwgL251bWJlcnxyYW5nZXx0ZXh0Ly50ZXN0KCB0eXBlICkgKSApIHtcblx0XHRcdHZhbHVlID0gTnVtYmVyKCB2YWx1ZSApO1xuXG5cdFx0XHQvLyBTdXBwb3J0IE9wZXJhIE1pbmksIHdoaWNoIHJldHVybnMgTmFOIGZvciB1bmRlZmluZWQgbWlubGVuZ3RoXG5cdFx0XHRpZiAoIGlzTmFOKCB2YWx1ZSApICkge1xuXHRcdFx0XHR2YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIHZhbHVlIHx8IHZhbHVlID09PSAwICkge1xuXHRcdFx0cnVsZXNbIG1ldGhvZCBdID0gdmFsdWU7XG5cdFx0fSBlbHNlIGlmICggdHlwZSA9PT0gbWV0aG9kICYmIHR5cGUgIT09IFwicmFuZ2VcIiApIHtcblxuXHRcdFx0Ly8gRXhjZXB0aW9uOiB0aGUganF1ZXJ5IHZhbGlkYXRlICdyYW5nZScgbWV0aG9kXG5cdFx0XHQvLyBkb2VzIG5vdCB0ZXN0IGZvciB0aGUgaHRtbDUgJ3JhbmdlJyB0eXBlXG5cdFx0XHRydWxlc1sgbWV0aG9kIF0gPSB0cnVlO1xuXHRcdH1cblx0fSxcblxuXHRhdHRyaWJ1dGVSdWxlczogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0dmFyIHJ1bGVzID0ge30sXG5cdFx0XHQkZWxlbWVudCA9ICQoIGVsZW1lbnQgKSxcblx0XHRcdHR5cGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSggXCJ0eXBlXCIgKSxcblx0XHRcdG1ldGhvZCwgdmFsdWU7XG5cblx0XHRmb3IgKCBtZXRob2QgaW4gJC52YWxpZGF0b3IubWV0aG9kcyApIHtcblxuXHRcdFx0Ly8gU3VwcG9ydCBmb3IgPGlucHV0IHJlcXVpcmVkPiBpbiBib3RoIGh0bWw1IGFuZCBvbGRlciBicm93c2Vyc1xuXHRcdFx0aWYgKCBtZXRob2QgPT09IFwicmVxdWlyZWRcIiApIHtcblx0XHRcdFx0dmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSggbWV0aG9kICk7XG5cblx0XHRcdFx0Ly8gU29tZSBicm93c2VycyByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIGZvciB0aGUgcmVxdWlyZWQgYXR0cmlidXRlXG5cdFx0XHRcdC8vIGFuZCBub24tSFRNTDUgYnJvd3NlcnMgbWlnaHQgaGF2ZSByZXF1aXJlZD1cIlwiIG1hcmt1cFxuXHRcdFx0XHRpZiAoIHZhbHVlID09PSBcIlwiICkge1xuXHRcdFx0XHRcdHZhbHVlID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZvcmNlIG5vbi1IVE1MNSBicm93c2VycyB0byByZXR1cm4gYm9vbFxuXHRcdFx0XHR2YWx1ZSA9ICEhdmFsdWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YWx1ZSA9ICRlbGVtZW50LmF0dHIoIG1ldGhvZCApO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLm5vcm1hbGl6ZUF0dHJpYnV0ZVJ1bGUoIHJ1bGVzLCB0eXBlLCBtZXRob2QsIHZhbHVlICk7XG5cdFx0fVxuXG5cdFx0Ly8gJ21heGxlbmd0aCcgbWF5IGJlIHJldHVybmVkIGFzIC0xLCAyMTQ3NDgzNjQ3ICggSUUgKSBhbmQgNTI0Mjg4ICggc2FmYXJpICkgZm9yIHRleHQgaW5wdXRzXG5cdFx0aWYgKCBydWxlcy5tYXhsZW5ndGggJiYgLy0xfDIxNDc0ODM2NDd8NTI0Mjg4Ly50ZXN0KCBydWxlcy5tYXhsZW5ndGggKSApIHtcblx0XHRcdGRlbGV0ZSBydWxlcy5tYXhsZW5ndGg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJ1bGVzO1xuXHR9LFxuXG5cdGRhdGFSdWxlczogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0dmFyIHJ1bGVzID0ge30sXG5cdFx0XHQkZWxlbWVudCA9ICQoIGVsZW1lbnQgKSxcblx0XHRcdHR5cGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSggXCJ0eXBlXCIgKSxcblx0XHRcdG1ldGhvZCwgdmFsdWU7XG5cblx0XHRmb3IgKCBtZXRob2QgaW4gJC52YWxpZGF0b3IubWV0aG9kcyApIHtcblx0XHRcdHZhbHVlID0gJGVsZW1lbnQuZGF0YSggXCJydWxlXCIgKyBtZXRob2QuY2hhckF0KCAwICkudG9VcHBlckNhc2UoKSArIG1ldGhvZC5zdWJzdHJpbmcoIDEgKS50b0xvd2VyQ2FzZSgpICk7XG5cdFx0XHR0aGlzLm5vcm1hbGl6ZUF0dHJpYnV0ZVJ1bGUoIHJ1bGVzLCB0eXBlLCBtZXRob2QsIHZhbHVlICk7XG5cdFx0fVxuXHRcdHJldHVybiBydWxlcztcblx0fSxcblxuXHRzdGF0aWNSdWxlczogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0dmFyIHJ1bGVzID0ge30sXG5cdFx0XHR2YWxpZGF0b3IgPSAkLmRhdGEoIGVsZW1lbnQuZm9ybSwgXCJ2YWxpZGF0b3JcIiApO1xuXG5cdFx0aWYgKCB2YWxpZGF0b3Iuc2V0dGluZ3MucnVsZXMgKSB7XG5cdFx0XHRydWxlcyA9ICQudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGUoIHZhbGlkYXRvci5zZXR0aW5ncy5ydWxlc1sgZWxlbWVudC5uYW1lIF0gKSB8fCB7fTtcblx0XHR9XG5cdFx0cmV0dXJuIHJ1bGVzO1xuXHR9LFxuXG5cdG5vcm1hbGl6ZVJ1bGVzOiBmdW5jdGlvbiggcnVsZXMsIGVsZW1lbnQgKSB7XG5cblx0XHQvLyBIYW5kbGUgZGVwZW5kZW5jeSBjaGVja1xuXHRcdCQuZWFjaCggcnVsZXMsIGZ1bmN0aW9uKCBwcm9wLCB2YWwgKSB7XG5cblx0XHRcdC8vIElnbm9yZSBydWxlIHdoZW4gcGFyYW0gaXMgZXhwbGljaXRseSBmYWxzZSwgZWcuIHJlcXVpcmVkOmZhbHNlXG5cdFx0XHRpZiAoIHZhbCA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdGRlbGV0ZSBydWxlc1sgcHJvcCBdO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHZhbC5wYXJhbSB8fCB2YWwuZGVwZW5kcyApIHtcblx0XHRcdFx0dmFyIGtlZXBSdWxlID0gdHJ1ZTtcblx0XHRcdFx0c3dpdGNoICggdHlwZW9mIHZhbC5kZXBlbmRzICkge1xuXHRcdFx0XHRjYXNlIFwic3RyaW5nXCI6XG5cdFx0XHRcdFx0a2VlcFJ1bGUgPSAhISQoIHZhbC5kZXBlbmRzLCBlbGVtZW50LmZvcm0gKS5sZW5ndGg7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJmdW5jdGlvblwiOlxuXHRcdFx0XHRcdGtlZXBSdWxlID0gdmFsLmRlcGVuZHMuY2FsbCggZWxlbWVudCwgZWxlbWVudCApO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICgga2VlcFJ1bGUgKSB7XG5cdFx0XHRcdFx0cnVsZXNbIHByb3AgXSA9IHZhbC5wYXJhbSAhPT0gdW5kZWZpbmVkID8gdmFsLnBhcmFtIDogdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkLmRhdGEoIGVsZW1lbnQuZm9ybSwgXCJ2YWxpZGF0b3JcIiApLnJlc2V0RWxlbWVudHMoICQoIGVsZW1lbnQgKSApO1xuXHRcdFx0XHRcdGRlbGV0ZSBydWxlc1sgcHJvcCBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXG5cdFx0Ly8gRXZhbHVhdGUgcGFyYW1ldGVyc1xuXHRcdCQuZWFjaCggcnVsZXMsIGZ1bmN0aW9uKCBydWxlLCBwYXJhbWV0ZXIgKSB7XG5cdFx0XHRydWxlc1sgcnVsZSBdID0gJC5pc0Z1bmN0aW9uKCBwYXJhbWV0ZXIgKSAmJiBydWxlICE9PSBcIm5vcm1hbGl6ZXJcIiA/IHBhcmFtZXRlciggZWxlbWVudCApIDogcGFyYW1ldGVyO1xuXHRcdH0gKTtcblxuXHRcdC8vIENsZWFuIG51bWJlciBwYXJhbWV0ZXJzXG5cdFx0JC5lYWNoKCBbIFwibWlubGVuZ3RoXCIsIFwibWF4bGVuZ3RoXCIgXSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIHJ1bGVzWyB0aGlzIF0gKSB7XG5cdFx0XHRcdHJ1bGVzWyB0aGlzIF0gPSBOdW1iZXIoIHJ1bGVzWyB0aGlzIF0gKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdFx0JC5lYWNoKCBbIFwicmFuZ2VsZW5ndGhcIiwgXCJyYW5nZVwiIF0sIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHBhcnRzO1xuXHRcdFx0aWYgKCBydWxlc1sgdGhpcyBdICkge1xuXHRcdFx0XHRpZiAoICQuaXNBcnJheSggcnVsZXNbIHRoaXMgXSApICkge1xuXHRcdFx0XHRcdHJ1bGVzWyB0aGlzIF0gPSBbIE51bWJlciggcnVsZXNbIHRoaXMgXVsgMCBdICksIE51bWJlciggcnVsZXNbIHRoaXMgXVsgMSBdICkgXTtcblx0XHRcdFx0fSBlbHNlIGlmICggdHlwZW9mIHJ1bGVzWyB0aGlzIF0gPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdFx0cGFydHMgPSBydWxlc1sgdGhpcyBdLnJlcGxhY2UoIC9bXFxbXFxdXS9nLCBcIlwiICkuc3BsaXQoIC9bXFxzLF0rLyApO1xuXHRcdFx0XHRcdHJ1bGVzWyB0aGlzIF0gPSBbIE51bWJlciggcGFydHNbIDAgXSApLCBOdW1iZXIoIHBhcnRzWyAxIF0gKSBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXG5cdFx0aWYgKCAkLnZhbGlkYXRvci5hdXRvQ3JlYXRlUmFuZ2VzICkge1xuXG5cdFx0XHQvLyBBdXRvLWNyZWF0ZSByYW5nZXNcblx0XHRcdGlmICggcnVsZXMubWluICE9IG51bGwgJiYgcnVsZXMubWF4ICE9IG51bGwgKSB7XG5cdFx0XHRcdHJ1bGVzLnJhbmdlID0gWyBydWxlcy5taW4sIHJ1bGVzLm1heCBdO1xuXHRcdFx0XHRkZWxldGUgcnVsZXMubWluO1xuXHRcdFx0XHRkZWxldGUgcnVsZXMubWF4O1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBydWxlcy5taW5sZW5ndGggIT0gbnVsbCAmJiBydWxlcy5tYXhsZW5ndGggIT0gbnVsbCApIHtcblx0XHRcdFx0cnVsZXMucmFuZ2VsZW5ndGggPSBbIHJ1bGVzLm1pbmxlbmd0aCwgcnVsZXMubWF4bGVuZ3RoIF07XG5cdFx0XHRcdGRlbGV0ZSBydWxlcy5taW5sZW5ndGg7XG5cdFx0XHRcdGRlbGV0ZSBydWxlcy5tYXhsZW5ndGg7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJ1bGVzO1xuXHR9LFxuXG5cdC8vIENvbnZlcnRzIGEgc2ltcGxlIHN0cmluZyB0byBhIHtzdHJpbmc6IHRydWV9IHJ1bGUsIGUuZy4sIFwicmVxdWlyZWRcIiB0byB7cmVxdWlyZWQ6dHJ1ZX1cblx0bm9ybWFsaXplUnVsZTogZnVuY3Rpb24oIGRhdGEgKSB7XG5cdFx0aWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHZhciB0cmFuc2Zvcm1lZCA9IHt9O1xuXHRcdFx0JC5lYWNoKCBkYXRhLnNwbGl0KCAvXFxzLyApLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0dHJhbnNmb3JtZWRbIHRoaXMgXSA9IHRydWU7XG5cdFx0XHR9ICk7XG5cdFx0XHRkYXRhID0gdHJhbnNmb3JtZWQ7XG5cdFx0fVxuXHRcdHJldHVybiBkYXRhO1xuXHR9LFxuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9qUXVlcnkudmFsaWRhdG9yLmFkZE1ldGhvZC9cblx0YWRkTWV0aG9kOiBmdW5jdGlvbiggbmFtZSwgbWV0aG9kLCBtZXNzYWdlICkge1xuXHRcdCQudmFsaWRhdG9yLm1ldGhvZHNbIG5hbWUgXSA9IG1ldGhvZDtcblx0XHQkLnZhbGlkYXRvci5tZXNzYWdlc1sgbmFtZSBdID0gbWVzc2FnZSAhPT0gdW5kZWZpbmVkID8gbWVzc2FnZSA6ICQudmFsaWRhdG9yLm1lc3NhZ2VzWyBuYW1lIF07XG5cdFx0aWYgKCBtZXRob2QubGVuZ3RoIDwgMyApIHtcblx0XHRcdCQudmFsaWRhdG9yLmFkZENsYXNzUnVsZXMoIG5hbWUsICQudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGUoIG5hbWUgKSApO1xuXHRcdH1cblx0fSxcblxuXHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvalF1ZXJ5LnZhbGlkYXRvci5tZXRob2RzL1xuXHRtZXRob2RzOiB7XG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvcmVxdWlyZWQtbWV0aG9kL1xuXHRcdHJlcXVpcmVkOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXG5cdFx0XHQvLyBDaGVjayBpZiBkZXBlbmRlbmN5IGlzIG1ldFxuXHRcdFx0aWYgKCAhdGhpcy5kZXBlbmQoIHBhcmFtLCBlbGVtZW50ICkgKSB7XG5cdFx0XHRcdHJldHVybiBcImRlcGVuZGVuY3ktbWlzbWF0Y2hcIjtcblx0XHRcdH1cblx0XHRcdGlmICggZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInNlbGVjdFwiICkge1xuXG5cdFx0XHRcdC8vIENvdWxkIGJlIGFuIGFycmF5IGZvciBzZWxlY3QtbXVsdGlwbGUgb3IgYSBzdHJpbmcsIGJvdGggYXJlIGZpbmUgdGhpcyB3YXlcblx0XHRcdFx0dmFyIHZhbCA9ICQoIGVsZW1lbnQgKS52YWwoKTtcblx0XHRcdFx0cmV0dXJuIHZhbCAmJiB2YWwubGVuZ3RoID4gMDtcblx0XHRcdH1cblx0XHRcdGlmICggdGhpcy5jaGVja2FibGUoIGVsZW1lbnQgKSApIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0TGVuZ3RoKCB2YWx1ZSwgZWxlbWVudCApID4gMDtcblx0XHRcdH1cblx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggPiAwO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvZW1haWwtbWV0aG9kL1xuXHRcdGVtYWlsOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQgKSB7XG5cblx0XHRcdC8vIEZyb20gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCN2YWxpZC1lLW1haWwtYWRkcmVzc1xuXHRcdFx0Ly8gUmV0cmlldmVkIDIwMTQtMDEtMTRcblx0XHRcdC8vIElmIHlvdSBoYXZlIGEgcHJvYmxlbSB3aXRoIHRoaXMgaW1wbGVtZW50YXRpb24sIHJlcG9ydCBhIGJ1ZyBhZ2FpbnN0IHRoZSBhYm92ZSBzcGVjXG5cdFx0XHQvLyBPciB1c2UgY3VzdG9tIG1ldGhvZHMgdG8gaW1wbGVtZW50IHlvdXIgb3duIGVtYWlsIHZhbGlkYXRpb25cblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgL15bYS16QS1aMC05LiEjJCUmJyorXFwvPT9eX2B7fH1+LV0rQFthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPyg/OlxcLlthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPykqJC8udGVzdCggdmFsdWUgKTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3VybC1tZXRob2QvXG5cdFx0dXJsOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQgKSB7XG5cblx0XHRcdC8vIENvcHlyaWdodCAoYykgMjAxMC0yMDEzIERpZWdvIFBlcmluaSwgTUlUIGxpY2Vuc2VkXG5cdFx0XHQvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9kcGVyaW5pLzcyOTI5NFxuXHRcdFx0Ly8gc2VlIGFsc28gaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL2RlbW8vdXJsLXJlZ2V4XG5cdFx0XHQvLyBtb2RpZmllZCB0byBhbGxvdyBwcm90b2NvbC1yZWxhdGl2ZSBVUkxzXG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8IC9eKD86KD86KD86aHR0cHM/fGZ0cCk6KT9cXC9cXC8pKD86XFxTKyg/OjpcXFMqKT9AKT8oPzooPyEoPzoxMHwxMjcpKD86XFwuXFxkezEsM30pezN9KSg/ISg/OjE2OVxcLjI1NHwxOTJcXC4xNjgpKD86XFwuXFxkezEsM30pezJ9KSg/ITE3MlxcLig/OjFbNi05XXwyXFxkfDNbMC0xXSkoPzpcXC5cXGR7MSwzfSl7Mn0pKD86WzEtOV1cXGQ/fDFcXGRcXGR8MlswMV1cXGR8MjJbMC0zXSkoPzpcXC4oPzoxP1xcZHsxLDJ9fDJbMC00XVxcZHwyNVswLTVdKSl7Mn0oPzpcXC4oPzpbMS05XVxcZD98MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC00XSkpfCg/Oig/OlthLXpcXHUwMGExLVxcdWZmZmYwLTldLSopKlthLXpcXHUwMGExLVxcdWZmZmYwLTldKykoPzpcXC4oPzpbYS16XFx1MDBhMS1cXHVmZmZmMC05XS0qKSpbYS16XFx1MDBhMS1cXHVmZmZmMC05XSspKig/OlxcLig/OlthLXpcXHUwMGExLVxcdWZmZmZdezIsfSkpLj8pKD86OlxcZHsyLDV9KT8oPzpbLz8jXVxcUyopPyQvaS50ZXN0KCB2YWx1ZSApO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvZGF0ZS1tZXRob2QvXG5cdFx0ZGF0ZTogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50ICkge1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCAhL0ludmFsaWR8TmFOLy50ZXN0KCBuZXcgRGF0ZSggdmFsdWUgKS50b1N0cmluZygpICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9kYXRlSVNPLW1ldGhvZC9cblx0XHRkYXRlSVNPOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8IC9eXFxkezR9W1xcL1xcLV0oMD9bMS05XXwxWzAxMl0pW1xcL1xcLV0oMD9bMS05XXxbMTJdWzAtOV18M1swMV0pJC8udGVzdCggdmFsdWUgKTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL251bWJlci1tZXRob2QvXG5cdFx0bnVtYmVyOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8IC9eKD86LT9cXGQrfC0/XFxkezEsM30oPzosXFxkezN9KSspPyg/OlxcLlxcZCspPyQvLnRlc3QoIHZhbHVlICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9kaWdpdHMtbWV0aG9kL1xuXHRcdGRpZ2l0czogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50ICkge1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCAvXlxcZCskLy50ZXN0KCB2YWx1ZSApO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvbWlubGVuZ3RoLW1ldGhvZC9cblx0XHRtaW5sZW5ndGg6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCwgcGFyYW0gKSB7XG5cdFx0XHR2YXIgbGVuZ3RoID0gJC5pc0FycmF5KCB2YWx1ZSApID8gdmFsdWUubGVuZ3RoIDogdGhpcy5nZXRMZW5ndGgoIHZhbHVlLCBlbGVtZW50ICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8IGxlbmd0aCA+PSBwYXJhbTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL21heGxlbmd0aC1tZXRob2QvXG5cdFx0bWF4bGVuZ3RoOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXHRcdFx0dmFyIGxlbmd0aCA9ICQuaXNBcnJheSggdmFsdWUgKSA/IHZhbHVlLmxlbmd0aCA6IHRoaXMuZ2V0TGVuZ3RoKCB2YWx1ZSwgZWxlbWVudCApO1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCBsZW5ndGggPD0gcGFyYW07XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9yYW5nZWxlbmd0aC1tZXRob2QvXG5cdFx0cmFuZ2VsZW5ndGg6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCwgcGFyYW0gKSB7XG5cdFx0XHR2YXIgbGVuZ3RoID0gJC5pc0FycmF5KCB2YWx1ZSApID8gdmFsdWUubGVuZ3RoIDogdGhpcy5nZXRMZW5ndGgoIHZhbHVlLCBlbGVtZW50ICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8ICggbGVuZ3RoID49IHBhcmFtWyAwIF0gJiYgbGVuZ3RoIDw9IHBhcmFtWyAxIF0gKTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL21pbi1tZXRob2QvXG5cdFx0bWluOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCB2YWx1ZSA+PSBwYXJhbTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL21heC1tZXRob2QvXG5cdFx0bWF4OiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCB2YWx1ZSA8PSBwYXJhbTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3JhbmdlLW1ldGhvZC9cblx0XHRyYW5nZTogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50LCBwYXJhbSApIHtcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgKCB2YWx1ZSA+PSBwYXJhbVsgMCBdICYmIHZhbHVlIDw9IHBhcmFtWyAxIF0gKTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3N0ZXAtbWV0aG9kL1xuXHRcdHN0ZXA6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCwgcGFyYW0gKSB7XG5cdFx0XHR2YXIgdHlwZSA9ICQoIGVsZW1lbnQgKS5hdHRyKCBcInR5cGVcIiApLFxuXHRcdFx0XHRlcnJvck1lc3NhZ2UgPSBcIlN0ZXAgYXR0cmlidXRlIG9uIGlucHV0IHR5cGUgXCIgKyB0eXBlICsgXCIgaXMgbm90IHN1cHBvcnRlZC5cIixcblx0XHRcdFx0c3VwcG9ydGVkVHlwZXMgPSBbIFwidGV4dFwiLCBcIm51bWJlclwiLCBcInJhbmdlXCIgXSxcblx0XHRcdFx0cmUgPSBuZXcgUmVnRXhwKCBcIlxcXFxiXCIgKyB0eXBlICsgXCJcXFxcYlwiICksXG5cdFx0XHRcdG5vdFN1cHBvcnRlZCA9IHR5cGUgJiYgIXJlLnRlc3QoIHN1cHBvcnRlZFR5cGVzLmpvaW4oKSApO1xuXG5cdFx0XHQvLyBXb3JrcyBvbmx5IGZvciB0ZXh0LCBudW1iZXIgYW5kIHJhbmdlIGlucHV0IHR5cGVzXG5cdFx0XHQvLyBUT0RPIGZpbmQgYSB3YXkgdG8gc3VwcG9ydCBpbnB1dCB0eXBlcyBkYXRlLCBkYXRldGltZSwgZGF0ZXRpbWUtbG9jYWwsIG1vbnRoLCB0aW1lIGFuZCB3ZWVrXG5cdFx0XHRpZiAoIG5vdFN1cHBvcnRlZCApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBlcnJvck1lc3NhZ2UgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgKCB2YWx1ZSAlIHBhcmFtID09PSAwICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9lcXVhbFRvLW1ldGhvZC9cblx0XHRlcXVhbFRvOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXG5cdFx0XHQvLyBCaW5kIHRvIHRoZSBibHVyIGV2ZW50IG9mIHRoZSB0YXJnZXQgaW4gb3JkZXIgdG8gcmV2YWxpZGF0ZSB3aGVuZXZlciB0aGUgdGFyZ2V0IGZpZWxkIGlzIHVwZGF0ZWRcblx0XHRcdHZhciB0YXJnZXQgPSAkKCBwYXJhbSApO1xuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLm9uZm9jdXNvdXQgJiYgdGFyZ2V0Lm5vdCggXCIudmFsaWRhdGUtZXF1YWxUby1ibHVyXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHRhcmdldC5hZGRDbGFzcyggXCJ2YWxpZGF0ZS1lcXVhbFRvLWJsdXJcIiApLm9uKCBcImJsdXIudmFsaWRhdGUtZXF1YWxUb1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQkKCBlbGVtZW50ICkudmFsaWQoKTtcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHZhbHVlID09PSB0YXJnZXQudmFsKCk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9yZW1vdGUtbWV0aG9kL1xuXHRcdHJlbW90ZTogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50LCBwYXJhbSwgbWV0aG9kICkge1xuXHRcdFx0aWYgKCB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgKSB7XG5cdFx0XHRcdHJldHVybiBcImRlcGVuZGVuY3ktbWlzbWF0Y2hcIjtcblx0XHRcdH1cblxuXHRcdFx0bWV0aG9kID0gdHlwZW9mIG1ldGhvZCA9PT0gXCJzdHJpbmdcIiAmJiBtZXRob2QgfHwgXCJyZW1vdGVcIjtcblxuXHRcdFx0dmFyIHByZXZpb3VzID0gdGhpcy5wcmV2aW91c1ZhbHVlKCBlbGVtZW50LCBtZXRob2QgKSxcblx0XHRcdFx0dmFsaWRhdG9yLCBkYXRhLCBvcHRpb25EYXRhU3RyaW5nO1xuXG5cdFx0XHRpZiAoICF0aGlzLnNldHRpbmdzLm1lc3NhZ2VzWyBlbGVtZW50Lm5hbWUgXSApIHtcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5tZXNzYWdlc1sgZWxlbWVudC5uYW1lIF0gPSB7fTtcblx0XHRcdH1cblx0XHRcdHByZXZpb3VzLm9yaWdpbmFsTWVzc2FnZSA9IHByZXZpb3VzLm9yaWdpbmFsTWVzc2FnZSB8fCB0aGlzLnNldHRpbmdzLm1lc3NhZ2VzWyBlbGVtZW50Lm5hbWUgXVsgbWV0aG9kIF07XG5cdFx0XHR0aGlzLnNldHRpbmdzLm1lc3NhZ2VzWyBlbGVtZW50Lm5hbWUgXVsgbWV0aG9kIF0gPSBwcmV2aW91cy5tZXNzYWdlO1xuXG5cdFx0XHRwYXJhbSA9IHR5cGVvZiBwYXJhbSA9PT0gXCJzdHJpbmdcIiAmJiB7IHVybDogcGFyYW0gfSB8fCBwYXJhbTtcblx0XHRcdG9wdGlvbkRhdGFTdHJpbmcgPSAkLnBhcmFtKCAkLmV4dGVuZCggeyBkYXRhOiB2YWx1ZSB9LCBwYXJhbS5kYXRhICkgKTtcblx0XHRcdGlmICggcHJldmlvdXMub2xkID09PSBvcHRpb25EYXRhU3RyaW5nICkge1xuXHRcdFx0XHRyZXR1cm4gcHJldmlvdXMudmFsaWQ7XG5cdFx0XHR9XG5cblx0XHRcdHByZXZpb3VzLm9sZCA9IG9wdGlvbkRhdGFTdHJpbmc7XG5cdFx0XHR2YWxpZGF0b3IgPSB0aGlzO1xuXHRcdFx0dGhpcy5zdGFydFJlcXVlc3QoIGVsZW1lbnQgKTtcblx0XHRcdGRhdGEgPSB7fTtcblx0XHRcdGRhdGFbIGVsZW1lbnQubmFtZSBdID0gdmFsdWU7XG5cdFx0XHQkLmFqYXgoICQuZXh0ZW5kKCB0cnVlLCB7XG5cdFx0XHRcdG1vZGU6IFwiYWJvcnRcIixcblx0XHRcdFx0cG9ydDogXCJ2YWxpZGF0ZVwiICsgZWxlbWVudC5uYW1lLFxuXHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdGNvbnRleHQ6IHZhbGlkYXRvci5jdXJyZW50Rm9ybSxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oIHJlc3BvbnNlICkge1xuXHRcdFx0XHRcdHZhciB2YWxpZCA9IHJlc3BvbnNlID09PSB0cnVlIHx8IHJlc3BvbnNlID09PSBcInRydWVcIixcblx0XHRcdFx0XHRcdGVycm9ycywgbWVzc2FnZSwgc3VibWl0dGVkO1xuXG5cdFx0XHRcdFx0dmFsaWRhdG9yLnNldHRpbmdzLm1lc3NhZ2VzWyBlbGVtZW50Lm5hbWUgXVsgbWV0aG9kIF0gPSBwcmV2aW91cy5vcmlnaW5hbE1lc3NhZ2U7XG5cdFx0XHRcdFx0aWYgKCB2YWxpZCApIHtcblx0XHRcdFx0XHRcdHN1Ym1pdHRlZCA9IHZhbGlkYXRvci5mb3JtU3VibWl0dGVkO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLnJlc2V0SW50ZXJuYWxzKCk7XG5cdFx0XHRcdFx0XHR2YWxpZGF0b3IudG9IaWRlID0gdmFsaWRhdG9yLmVycm9yc0ZvciggZWxlbWVudCApO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLmZvcm1TdWJtaXR0ZWQgPSBzdWJtaXR0ZWQ7XG5cdFx0XHRcdFx0XHR2YWxpZGF0b3Iuc3VjY2Vzc0xpc3QucHVzaCggZWxlbWVudCApO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLmludmFsaWRbIGVsZW1lbnQubmFtZSBdID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR2YWxpZGF0b3Iuc2hvd0Vycm9ycygpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlcnJvcnMgPSB7fTtcblx0XHRcdFx0XHRcdG1lc3NhZ2UgPSByZXNwb25zZSB8fCB2YWxpZGF0b3IuZGVmYXVsdE1lc3NhZ2UoIGVsZW1lbnQsIHsgbWV0aG9kOiBtZXRob2QsIHBhcmFtZXRlcnM6IHZhbHVlIH0gKTtcblx0XHRcdFx0XHRcdGVycm9yc1sgZWxlbWVudC5uYW1lIF0gPSBwcmV2aW91cy5tZXNzYWdlID0gbWVzc2FnZTtcblx0XHRcdFx0XHRcdHZhbGlkYXRvci5pbnZhbGlkWyBlbGVtZW50Lm5hbWUgXSA9IHRydWU7XG5cdFx0XHRcdFx0XHR2YWxpZGF0b3Iuc2hvd0Vycm9ycyggZXJyb3JzICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHByZXZpb3VzLnZhbGlkID0gdmFsaWQ7XG5cdFx0XHRcdFx0dmFsaWRhdG9yLnN0b3BSZXF1ZXN0KCBlbGVtZW50LCB2YWxpZCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCBwYXJhbSApICk7XG5cdFx0XHRyZXR1cm4gXCJwZW5kaW5nXCI7XG5cdFx0fVxuXHR9XG5cbn0gKTtcblxuLy8gQWpheCBtb2RlOiBhYm9ydFxuLy8gdXNhZ2U6ICQuYWpheCh7IG1vZGU6IFwiYWJvcnRcIlssIHBvcnQ6IFwidW5pcXVlcG9ydFwiXX0pO1xuLy8gaWYgbW9kZTpcImFib3J0XCIgaXMgdXNlZCwgdGhlIHByZXZpb3VzIHJlcXVlc3Qgb24gdGhhdCBwb3J0IChwb3J0IGNhbiBiZSB1bmRlZmluZWQpIGlzIGFib3J0ZWQgdmlhIFhNTEh0dHBSZXF1ZXN0LmFib3J0KClcblxudmFyIHBlbmRpbmdSZXF1ZXN0cyA9IHt9LFxuXHRhamF4O1xuXG4vLyBVc2UgYSBwcmVmaWx0ZXIgaWYgYXZhaWxhYmxlICgxLjUrKVxuaWYgKCAkLmFqYXhQcmVmaWx0ZXIgKSB7XG5cdCQuYWpheFByZWZpbHRlciggZnVuY3Rpb24oIHNldHRpbmdzLCBfLCB4aHIgKSB7XG5cdFx0dmFyIHBvcnQgPSBzZXR0aW5ncy5wb3J0O1xuXHRcdGlmICggc2V0dGluZ3MubW9kZSA9PT0gXCJhYm9ydFwiICkge1xuXHRcdFx0aWYgKCBwZW5kaW5nUmVxdWVzdHNbIHBvcnQgXSApIHtcblx0XHRcdFx0cGVuZGluZ1JlcXVlc3RzWyBwb3J0IF0uYWJvcnQoKTtcblx0XHRcdH1cblx0XHRcdHBlbmRpbmdSZXF1ZXN0c1sgcG9ydCBdID0geGhyO1xuXHRcdH1cblx0fSApO1xufSBlbHNlIHtcblxuXHQvLyBQcm94eSBhamF4XG5cdGFqYXggPSAkLmFqYXg7XG5cdCQuYWpheCA9IGZ1bmN0aW9uKCBzZXR0aW5ncyApIHtcblx0XHR2YXIgbW9kZSA9ICggXCJtb2RlXCIgaW4gc2V0dGluZ3MgPyBzZXR0aW5ncyA6ICQuYWpheFNldHRpbmdzICkubW9kZSxcblx0XHRcdHBvcnQgPSAoIFwicG9ydFwiIGluIHNldHRpbmdzID8gc2V0dGluZ3MgOiAkLmFqYXhTZXR0aW5ncyApLnBvcnQ7XG5cdFx0aWYgKCBtb2RlID09PSBcImFib3J0XCIgKSB7XG5cdFx0XHRpZiAoIHBlbmRpbmdSZXF1ZXN0c1sgcG9ydCBdICkge1xuXHRcdFx0XHRwZW5kaW5nUmVxdWVzdHNbIHBvcnQgXS5hYm9ydCgpO1xuXHRcdFx0fVxuXHRcdFx0cGVuZGluZ1JlcXVlc3RzWyBwb3J0IF0gPSBhamF4LmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdHJldHVybiBwZW5kaW5nUmVxdWVzdHNbIHBvcnQgXTtcblx0XHR9XG5cdFx0cmV0dXJuIGFqYXguYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHR9O1xufVxuXG59KSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi93d3dyb290L2xpYi9qcXVlcnktdmFsaWRhdGlvbi9kaXN0L2pxdWVyeS52YWxpZGF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIvKiFcclxuKiogVW5vYnRydXNpdmUgdmFsaWRhdGlvbiBzdXBwb3J0IGxpYnJhcnkgZm9yIGpRdWVyeSBhbmQgalF1ZXJ5IFZhbGlkYXRlXHJcbioqIENvcHlyaWdodCAoQykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4qL1xyXG5cclxuLypqc2xpbnQgd2hpdGU6IHRydWUsIGJyb3dzZXI6IHRydWUsIG9uZXZhcjogdHJ1ZSwgdW5kZWY6IHRydWUsIG5vbWVuOiB0cnVlLCBlcWVxZXE6IHRydWUsIHBsdXNwbHVzOiB0cnVlLCBiaXR3aXNlOiB0cnVlLCByZWdleHA6IHRydWUsIG5ld2NhcDogdHJ1ZSwgaW1tZWQ6IHRydWUsIHN0cmljdDogZmFsc2UgKi9cclxuLypnbG9iYWwgZG9jdW1lbnQ6IGZhbHNlLCBqUXVlcnk6IGZhbHNlICovXHJcblxyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgIHZhciAkalF2YWwgPSAkLnZhbGlkYXRvcixcclxuICAgICAgICBhZGFwdGVycyxcclxuICAgICAgICBkYXRhX3ZhbGlkYXRpb24gPSBcInVub2J0cnVzaXZlVmFsaWRhdGlvblwiO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldFZhbGlkYXRpb25WYWx1ZXMob3B0aW9ucywgcnVsZU5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgb3B0aW9ucy5ydWxlc1tydWxlTmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICBpZiAob3B0aW9ucy5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMubWVzc2FnZXNbcnVsZU5hbWVdID0gb3B0aW9ucy5tZXNzYWdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzcGxpdEFuZFRyaW0odmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIikuc3BsaXQoL1xccyosXFxzKi9nKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBlc2NhcGVBdHRyaWJ1dGVWYWx1ZSh2YWx1ZSkge1xyXG4gICAgICAgIC8vIEFzIG1lbnRpb25lZCBvbiBodHRwOi8vYXBpLmpxdWVyeS5jb20vY2F0ZWdvcnkvc2VsZWN0b3JzL1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC8oWyFcIiMkJSYnKCkqKywuLzo7PD0+P0BcXFtcXFxcXFxdXmB7fH1+XSkvZywgXCJcXFxcJDFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TW9kZWxQcmVmaXgoZmllbGROYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpZWxkTmFtZS5zdWJzdHIoMCwgZmllbGROYW1lLmxhc3RJbmRleE9mKFwiLlwiKSArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFwcGVuZE1vZGVsUHJlZml4KHZhbHVlLCBwcmVmaXgpIHtcclxuICAgICAgICBpZiAodmFsdWUuaW5kZXhPZihcIiouXCIpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcIiouXCIsIHByZWZpeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvbkVycm9yKGVycm9yLCBpbnB1dEVsZW1lbnQpIHsgIC8vICd0aGlzJyBpcyB0aGUgZm9ybSBlbGVtZW50XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQodGhpcykuZmluZChcIltkYXRhLXZhbG1zZy1mb3I9J1wiICsgZXNjYXBlQXR0cmlidXRlVmFsdWUoaW5wdXRFbGVtZW50WzBdLm5hbWUpICsgXCInXVwiKSxcclxuICAgICAgICAgICAgcmVwbGFjZUF0dHJWYWx1ZSA9IGNvbnRhaW5lci5hdHRyKFwiZGF0YS12YWxtc2ctcmVwbGFjZVwiKSxcclxuICAgICAgICAgICAgcmVwbGFjZSA9IHJlcGxhY2VBdHRyVmFsdWUgPyAkLnBhcnNlSlNPTihyZXBsYWNlQXR0clZhbHVlKSAhPT0gZmFsc2UgOiBudWxsO1xyXG5cclxuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoXCJmaWVsZC12YWxpZGF0aW9uLXZhbGlkXCIpLmFkZENsYXNzKFwiZmllbGQtdmFsaWRhdGlvbi1lcnJvclwiKTtcclxuICAgICAgICBlcnJvci5kYXRhKFwidW5vYnRydXNpdmVDb250YWluZXJcIiwgY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgaWYgKHJlcGxhY2UpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmVtcHR5KCk7XHJcbiAgICAgICAgICAgIGVycm9yLnJlbW92ZUNsYXNzKFwiaW5wdXQtdmFsaWRhdGlvbi1lcnJvclwiKS5hcHBlbmRUbyhjb250YWluZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZXJyb3IuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvbkVycm9ycyhldmVudCwgdmFsaWRhdG9yKSB7ICAvLyAndGhpcycgaXMgdGhlIGZvcm0gZWxlbWVudFxyXG4gICAgICAgIHZhciBjb250YWluZXIgPSAkKHRoaXMpLmZpbmQoXCJbZGF0YS12YWxtc2ctc3VtbWFyeT10cnVlXVwiKSxcclxuICAgICAgICAgICAgbGlzdCA9IGNvbnRhaW5lci5maW5kKFwidWxcIik7XHJcblxyXG4gICAgICAgIGlmIChsaXN0ICYmIGxpc3QubGVuZ3RoICYmIHZhbGlkYXRvci5lcnJvckxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxpc3QuZW1wdHkoKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKFwidmFsaWRhdGlvbi1zdW1tYXJ5LWVycm9yc1wiKS5yZW1vdmVDbGFzcyhcInZhbGlkYXRpb24tc3VtbWFyeS12YWxpZFwiKTtcclxuXHJcbiAgICAgICAgICAgICQuZWFjaCh2YWxpZGF0b3IuZXJyb3JMaXN0LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiPGxpIC8+XCIpLmh0bWwodGhpcy5tZXNzYWdlKS5hcHBlbmRUbyhsaXN0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9uU3VjY2VzcyhlcnJvcikgeyAgLy8gJ3RoaXMnIGlzIHRoZSBmb3JtIGVsZW1lbnRcclxuICAgICAgICB2YXIgY29udGFpbmVyID0gZXJyb3IuZGF0YShcInVub2J0cnVzaXZlQ29udGFpbmVyXCIpO1xyXG5cclxuICAgICAgICBpZiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHZhciByZXBsYWNlQXR0clZhbHVlID0gY29udGFpbmVyLmF0dHIoXCJkYXRhLXZhbG1zZy1yZXBsYWNlXCIpLFxyXG4gICAgICAgICAgICAgICAgcmVwbGFjZSA9IHJlcGxhY2VBdHRyVmFsdWUgPyAkLnBhcnNlSlNPTihyZXBsYWNlQXR0clZhbHVlKSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoXCJmaWVsZC12YWxpZGF0aW9uLXZhbGlkXCIpLnJlbW92ZUNsYXNzKFwiZmllbGQtdmFsaWRhdGlvbi1lcnJvclwiKTtcclxuICAgICAgICAgICAgZXJyb3IucmVtb3ZlRGF0YShcInVub2J0cnVzaXZlQ29udGFpbmVyXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlcGxhY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9uUmVzZXQoZXZlbnQpIHsgIC8vICd0aGlzJyBpcyB0aGUgZm9ybSBlbGVtZW50XHJcbiAgICAgICAgdmFyICRmb3JtID0gJCh0aGlzKSxcclxuICAgICAgICAgICAga2V5ID0gJ19fanF1ZXJ5X3Vub2J0cnVzaXZlX3ZhbGlkYXRpb25fZm9ybV9yZXNldCc7XHJcbiAgICAgICAgaWYgKCRmb3JtLmRhdGEoa2V5KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNldCBhIGZsYWcgdGhhdCBpbmRpY2F0ZXMgd2UncmUgY3VycmVudGx5IHJlc2V0dGluZyB0aGUgZm9ybS5cclxuICAgICAgICAkZm9ybS5kYXRhKGtleSwgdHJ1ZSk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgJGZvcm0uZGF0YShcInZhbGlkYXRvclwiKS5yZXNldEZvcm0oKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAkZm9ybS5yZW1vdmVEYXRhKGtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkZm9ybS5maW5kKFwiLnZhbGlkYXRpb24tc3VtbWFyeS1lcnJvcnNcIilcclxuICAgICAgICAgICAgLmFkZENsYXNzKFwidmFsaWRhdGlvbi1zdW1tYXJ5LXZhbGlkXCIpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcInZhbGlkYXRpb24tc3VtbWFyeS1lcnJvcnNcIik7XHJcbiAgICAgICAgJGZvcm0uZmluZChcIi5maWVsZC12YWxpZGF0aW9uLWVycm9yXCIpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcImZpZWxkLXZhbGlkYXRpb24tdmFsaWRcIilcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiZmllbGQtdmFsaWRhdGlvbi1lcnJvclwiKVxyXG4gICAgICAgICAgICAucmVtb3ZlRGF0YShcInVub2J0cnVzaXZlQ29udGFpbmVyXCIpXHJcbiAgICAgICAgICAgIC5maW5kKFwiPipcIikgIC8vIElmIHdlIHdlcmUgdXNpbmcgdmFsbXNnLXJlcGxhY2UsIGdldCB0aGUgdW5kZXJseWluZyBlcnJvclxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZURhdGEoXCJ1bm9idHJ1c2l2ZUNvbnRhaW5lclwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0aW9uSW5mbyhmb3JtKSB7XHJcbiAgICAgICAgdmFyICRmb3JtID0gJChmb3JtKSxcclxuICAgICAgICAgICAgcmVzdWx0ID0gJGZvcm0uZGF0YShkYXRhX3ZhbGlkYXRpb24pLFxyXG4gICAgICAgICAgICBvblJlc2V0UHJveHkgPSAkLnByb3h5KG9uUmVzZXQsIGZvcm0pLFxyXG4gICAgICAgICAgICBkZWZhdWx0T3B0aW9ucyA9ICRqUXZhbC51bm9idHJ1c2l2ZS5vcHRpb25zIHx8IHt9LFxyXG4gICAgICAgICAgICBleGVjSW5Db250ZXh0ID0gZnVuY3Rpb24gKG5hbWUsIGFyZ3MpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmdW5jID0gZGVmYXVsdE9wdGlvbnNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICBmdW5jICYmICQuaXNGdW5jdGlvbihmdW5jKSAmJiBmdW5jLmFwcGx5KGZvcm0sIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHsgIC8vIG9wdGlvbnMgc3RydWN0dXJlIHBhc3NlZCB0byBqUXVlcnkgVmFsaWRhdGUncyB2YWxpZGF0ZSgpIG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yQ2xhc3M6IGRlZmF1bHRPcHRpb25zLmVycm9yQ2xhc3MgfHwgXCJpbnB1dC12YWxpZGF0aW9uLWVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JFbGVtZW50OiBkZWZhdWx0T3B0aW9ucy5lcnJvckVsZW1lbnQgfHwgXCJzcGFuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JQbGFjZW1lbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25FcnJvci5hcHBseShmb3JtLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBleGVjSW5Db250ZXh0KFwiZXJyb3JQbGFjZW1lbnRcIiwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGludmFsaWRIYW5kbGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRXJyb3JzLmFwcGx5KGZvcm0sIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4ZWNJbkNvbnRleHQoXCJpbnZhbGlkSGFuZGxlclwiLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IHt9LFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bGVzOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VjY2Vzcy5hcHBseShmb3JtLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBleGVjSW5Db250ZXh0KFwic3VjY2Vzc1wiLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhdHRhY2hWYWxpZGF0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGZvcm1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9mZihcInJlc2V0LlwiICsgZGF0YV92YWxpZGF0aW9uLCBvblJlc2V0UHJveHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcInJlc2V0LlwiICsgZGF0YV92YWxpZGF0aW9uLCBvblJlc2V0UHJveHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC52YWxpZGF0ZSh0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAoKSB7ICAvLyBhIHZhbGlkYXRpb24gZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgYnkgdW5vYnRydXNpdmUgQWpheFxyXG4gICAgICAgICAgICAgICAgICAgICRmb3JtLnZhbGlkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRmb3JtLnZhbGlkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICRmb3JtLmRhdGEoZGF0YV92YWxpZGF0aW9uLCByZXN1bHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAkalF2YWwudW5vYnRydXNpdmUgPSB7XHJcbiAgICAgICAgYWRhcHRlcnM6IFtdLFxyXG5cclxuICAgICAgICBwYXJzZUVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50LCBza2lwQXR0YWNoKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIFBhcnNlcyBhIHNpbmdsZSBIVE1MIGVsZW1lbnQgZm9yIHVub2J0cnVzaXZlIHZhbGlkYXRpb24gYXR0cmlidXRlcy5cclxuICAgICAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZWxlbWVudFwiIGRvbUVsZW1lbnQ9XCJ0cnVlXCI+VGhlIEhUTUwgZWxlbWVudCB0byBiZSBwYXJzZWQuPC9wYXJhbT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2tpcEF0dGFjaFwiIHR5cGU9XCJCb29sZWFuXCI+W09wdGlvbmFsXSB0cnVlIHRvIHNraXAgYXR0YWNoaW5nIHRoZVxyXG4gICAgICAgICAgICAvLy8gdmFsaWRhdGlvbiB0byB0aGUgZm9ybS4gSWYgcGFyc2luZyBqdXN0IHRoaXMgc2luZ2xlIGVsZW1lbnQsIHlvdSBzaG91bGQgc3BlY2lmeSB0cnVlLlxyXG4gICAgICAgICAgICAvLy8gSWYgcGFyc2luZyBzZXZlcmFsIGVsZW1lbnRzLCB5b3Ugc2hvdWxkIHNwZWNpZnkgZmFsc2UsIGFuZCBtYW51YWxseSBhdHRhY2ggdGhlIHZhbGlkYXRpb25cclxuICAgICAgICAgICAgLy8vIHRvIHRoZSBmb3JtIHdoZW4geW91IGFyZSBmaW5pc2hlZC4gVGhlIGRlZmF1bHQgaXMgZmFsc2UuPC9wYXJhbT5cclxuICAgICAgICAgICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KSxcclxuICAgICAgICAgICAgICAgIGZvcm0gPSAkZWxlbWVudC5wYXJlbnRzKFwiZm9ybVwiKVswXSxcclxuICAgICAgICAgICAgICAgIHZhbEluZm8sIHJ1bGVzLCBtZXNzYWdlcztcclxuXHJcbiAgICAgICAgICAgIGlmICghZm9ybSkgeyAgLy8gQ2Fubm90IGRvIGNsaWVudC1zaWRlIHZhbGlkYXRpb24gd2l0aG91dCBhIGZvcm1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFsSW5mbyA9IHZhbGlkYXRpb25JbmZvKGZvcm0pO1xyXG4gICAgICAgICAgICB2YWxJbmZvLm9wdGlvbnMucnVsZXNbZWxlbWVudC5uYW1lXSA9IHJ1bGVzID0ge307XHJcbiAgICAgICAgICAgIHZhbEluZm8ub3B0aW9ucy5tZXNzYWdlc1tlbGVtZW50Lm5hbWVdID0gbWVzc2FnZXMgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICQuZWFjaCh0aGlzLmFkYXB0ZXJzLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJlZml4ID0gXCJkYXRhLXZhbC1cIiArIHRoaXMubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJGVsZW1lbnQuYXR0cihwcmVmaXgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtVmFsdWVzID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UgIT09IHVuZGVmaW5lZCkgeyAgLy8gQ29tcGFyZSBhZ2FpbnN0IHVuZGVmaW5lZCwgYmVjYXVzZSBhbiBlbXB0eSBtZXNzYWdlIGlzIGxlZ2FsIChhbmQgZmFsc3kpXHJcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4ICs9IFwiLVwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2godGhpcy5wYXJhbXMsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1WYWx1ZXNbdGhpc10gPSAkZWxlbWVudC5hdHRyKHByZWZpeCArIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYXB0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBwYXJhbVZhbHVlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVsZXM6IHJ1bGVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogbWVzc2FnZXNcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkLmV4dGVuZChydWxlcywgeyBcIl9fZHVtbXlfX1wiOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFza2lwQXR0YWNoKSB7XHJcbiAgICAgICAgICAgICAgICB2YWxJbmZvLmF0dGFjaFZhbGlkYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gUGFyc2VzIGFsbCB0aGUgSFRNTCBlbGVtZW50cyBpbiB0aGUgc3BlY2lmaWVkIHNlbGVjdG9yLiBJdCBsb29rcyBmb3IgaW5wdXQgZWxlbWVudHMgZGVjb3JhdGVkXHJcbiAgICAgICAgICAgIC8vLyB3aXRoIHRoZSBbZGF0YS12YWw9dHJ1ZV0gYXR0cmlidXRlIHZhbHVlIGFuZCBlbmFibGVzIHZhbGlkYXRpb24gYWNjb3JkaW5nIHRvIHRoZSBkYXRhLXZhbC0qXHJcbiAgICAgICAgICAgIC8vLyBhdHRyaWJ1dGUgdmFsdWVzLlxyXG4gICAgICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzZWxlY3RvclwiIHR5cGU9XCJTdHJpbmdcIj5BbnkgdmFsaWQgalF1ZXJ5IHNlbGVjdG9yLjwvcGFyYW0+XHJcblxyXG4gICAgICAgICAgICAvLyAkZm9ybXMgaW5jbHVkZXMgYWxsIGZvcm1zIGluIHNlbGVjdG9yJ3MgRE9NIGhpZXJhcmNoeSAocGFyZW50LCBjaGlsZHJlbiBhbmQgc2VsZikgdGhhdCBoYXZlIGF0IGxlYXN0IG9uZVxyXG4gICAgICAgICAgICAvLyBlbGVtZW50IHdpdGggZGF0YS12YWw9dHJ1ZVxyXG4gICAgICAgICAgICB2YXIgJHNlbGVjdG9yID0gJChzZWxlY3RvciksXHJcbiAgICAgICAgICAgICAgICAkZm9ybXMgPSAkc2VsZWN0b3IucGFyZW50cygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQmFjaygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKFwiZm9ybVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZCgkc2VsZWN0b3IuZmluZChcImZvcm1cIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaGFzKFwiW2RhdGEtdmFsPXRydWVdXCIpO1xyXG5cclxuICAgICAgICAgICAgJHNlbGVjdG9yLmZpbmQoXCJbZGF0YS12YWw9dHJ1ZV1cIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkalF2YWwudW5vYnRydXNpdmUucGFyc2VFbGVtZW50KHRoaXMsIHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRmb3Jtcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmZvID0gdmFsaWRhdGlvbkluZm8odGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZm8uYXR0YWNoVmFsaWRhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGFkYXB0ZXJzID0gJGpRdmFsLnVub2J0cnVzaXZlLmFkYXB0ZXJzO1xyXG5cclxuICAgIGFkYXB0ZXJzLmFkZCA9IGZ1bmN0aW9uIChhZGFwdGVyTmFtZSwgcGFyYW1zLCBmbikge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5BZGRzIGEgbmV3IGFkYXB0ZXIgdG8gY29udmVydCB1bm9idHJ1c2l2ZSBIVE1MIGludG8gYSBqUXVlcnkgVmFsaWRhdGUgdmFsaWRhdGlvbi48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYWRhcHRlck5hbWVcIiB0eXBlPVwiU3RyaW5nXCI+VGhlIG5hbWUgb2YgdGhlIGFkYXB0ZXIgdG8gYmUgYWRkZWQuIFRoaXMgbWF0Y2hlcyB0aGUgbmFtZSB1c2VkXHJcbiAgICAgICAgLy8vIGluIHRoZSBkYXRhLXZhbC1ubm5uIEhUTUwgYXR0cmlidXRlICh3aGVyZSBubm5uIGlzIHRoZSBhZGFwdGVyIG5hbWUpLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGFyYW1zXCIgdHlwZT1cIkFycmF5XCIgb3B0aW9uYWw9XCJ0cnVlXCI+W09wdGlvbmFsXSBBbiBhcnJheSBvZiBwYXJhbWV0ZXIgbmFtZXMgKHN0cmluZ3MpIHRoYXQgd2lsbFxyXG4gICAgICAgIC8vLyBiZSBleHRyYWN0ZWQgZnJvbSB0aGUgZGF0YS12YWwtbm5ubi1tbW1tIEhUTUwgYXR0cmlidXRlcyAod2hlcmUgbm5ubiBpcyB0aGUgYWRhcHRlciBuYW1lLCBhbmRcclxuICAgICAgICAvLy8gbW1tbSBpcyB0aGUgcGFyYW1ldGVyIG5hbWUpLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZm5cIiB0eXBlPVwiRnVuY3Rpb25cIj5UaGUgZnVuY3Rpb24gdG8gY2FsbCwgd2hpY2ggYWRhcHRzIHRoZSB2YWx1ZXMgZnJvbSB0aGUgSFRNTFxyXG4gICAgICAgIC8vLyBhdHRyaWJ1dGVzIGludG8galF1ZXJ5IFZhbGlkYXRlIHJ1bGVzIGFuZC9vciBtZXNzYWdlcy48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucyB0eXBlPVwialF1ZXJ5LnZhbGlkYXRvci51bm9idHJ1c2l2ZS5hZGFwdGVyc1wiIC8+XHJcbiAgICAgICAgaWYgKCFmbikgeyAgLy8gQ2FsbGVkIHdpdGggbm8gcGFyYW1zLCBqdXN0IGEgZnVuY3Rpb25cclxuICAgICAgICAgICAgZm4gPSBwYXJhbXM7XHJcbiAgICAgICAgICAgIHBhcmFtcyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnB1c2goeyBuYW1lOiBhZGFwdGVyTmFtZSwgcGFyYW1zOiBwYXJhbXMsIGFkYXB0OiBmbiB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgYWRhcHRlcnMuYWRkQm9vbCA9IGZ1bmN0aW9uIChhZGFwdGVyTmFtZSwgcnVsZU5hbWUpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+QWRkcyBhIG5ldyBhZGFwdGVyIHRvIGNvbnZlcnQgdW5vYnRydXNpdmUgSFRNTCBpbnRvIGEgalF1ZXJ5IFZhbGlkYXRlIHZhbGlkYXRpb24sIHdoZXJlXHJcbiAgICAgICAgLy8vIHRoZSBqUXVlcnkgVmFsaWRhdGUgdmFsaWRhdGlvbiBydWxlIGhhcyBubyBwYXJhbWV0ZXIgdmFsdWVzLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhZGFwdGVyTmFtZVwiIHR5cGU9XCJTdHJpbmdcIj5UaGUgbmFtZSBvZiB0aGUgYWRhcHRlciB0byBiZSBhZGRlZC4gVGhpcyBtYXRjaGVzIHRoZSBuYW1lIHVzZWRcclxuICAgICAgICAvLy8gaW4gdGhlIGRhdGEtdmFsLW5ubm4gSFRNTCBhdHRyaWJ1dGUgKHdoZXJlIG5ubm4gaXMgdGhlIGFkYXB0ZXIgbmFtZSkuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJydWxlTmFtZVwiIHR5cGU9XCJTdHJpbmdcIiBvcHRpb25hbD1cInRydWVcIj5bT3B0aW9uYWxdIFRoZSBuYW1lIG9mIHRoZSBqUXVlcnkgVmFsaWRhdGUgcnVsZS4gSWYgbm90IHByb3ZpZGVkLCB0aGUgdmFsdWVcclxuICAgICAgICAvLy8gb2YgYWRhcHRlck5hbWUgd2lsbCBiZSB1c2VkIGluc3RlYWQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnMgdHlwZT1cImpRdWVyeS52YWxpZGF0b3IudW5vYnRydXNpdmUuYWRhcHRlcnNcIiAvPlxyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZChhZGFwdGVyTmFtZSwgZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgc2V0VmFsaWRhdGlvblZhbHVlcyhvcHRpb25zLCBydWxlTmFtZSB8fCBhZGFwdGVyTmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkYXB0ZXJzLmFkZE1pbk1heCA9IGZ1bmN0aW9uIChhZGFwdGVyTmFtZSwgbWluUnVsZU5hbWUsIG1heFJ1bGVOYW1lLCBtaW5NYXhSdWxlTmFtZSwgbWluQXR0cmlidXRlLCBtYXhBdHRyaWJ1dGUpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+QWRkcyBhIG5ldyBhZGFwdGVyIHRvIGNvbnZlcnQgdW5vYnRydXNpdmUgSFRNTCBpbnRvIGEgalF1ZXJ5IFZhbGlkYXRlIHZhbGlkYXRpb24sIHdoZXJlXHJcbiAgICAgICAgLy8vIHRoZSBqUXVlcnkgVmFsaWRhdGUgdmFsaWRhdGlvbiBoYXMgdGhyZWUgcG90ZW50aWFsIHJ1bGVzIChvbmUgZm9yIG1pbi1vbmx5LCBvbmUgZm9yIG1heC1vbmx5LCBhbmRcclxuICAgICAgICAvLy8gb25lIGZvciBtaW4tYW5kLW1heCkuIFRoZSBIVE1MIHBhcmFtZXRlcnMgYXJlIGV4cGVjdGVkIHRvIGJlIG5hbWVkIC1taW4gYW5kIC1tYXguPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFkYXB0ZXJOYW1lXCIgdHlwZT1cIlN0cmluZ1wiPlRoZSBuYW1lIG9mIHRoZSBhZGFwdGVyIHRvIGJlIGFkZGVkLiBUaGlzIG1hdGNoZXMgdGhlIG5hbWUgdXNlZFxyXG4gICAgICAgIC8vLyBpbiB0aGUgZGF0YS12YWwtbm5ubiBIVE1MIGF0dHJpYnV0ZSAod2hlcmUgbm5ubiBpcyB0aGUgYWRhcHRlciBuYW1lKS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1pblJ1bGVOYW1lXCIgdHlwZT1cIlN0cmluZ1wiPlRoZSBuYW1lIG9mIHRoZSBqUXVlcnkgVmFsaWRhdGUgcnVsZSB0byBiZSB1c2VkIHdoZW4geW91IG9ubHlcclxuICAgICAgICAvLy8gaGF2ZSBhIG1pbmltdW0gdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtYXhSdWxlTmFtZVwiIHR5cGU9XCJTdHJpbmdcIj5UaGUgbmFtZSBvZiB0aGUgalF1ZXJ5IFZhbGlkYXRlIHJ1bGUgdG8gYmUgdXNlZCB3aGVuIHlvdSBvbmx5XHJcbiAgICAgICAgLy8vIGhhdmUgYSBtYXhpbXVtIHZhbHVlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibWluTWF4UnVsZU5hbWVcIiB0eXBlPVwiU3RyaW5nXCI+VGhlIG5hbWUgb2YgdGhlIGpRdWVyeSBWYWxpZGF0ZSBydWxlIHRvIGJlIHVzZWQgd2hlbiB5b3VcclxuICAgICAgICAvLy8gaGF2ZSBib3RoIGEgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1pbkF0dHJpYnV0ZVwiIHR5cGU9XCJTdHJpbmdcIiBvcHRpb25hbD1cInRydWVcIj5bT3B0aW9uYWxdIFRoZSBuYW1lIG9mIHRoZSBIVE1MIGF0dHJpYnV0ZSB0aGF0XHJcbiAgICAgICAgLy8vIGNvbnRhaW5zIHRoZSBtaW5pbXVtIHZhbHVlLiBUaGUgZGVmYXVsdCBpcyBcIm1pblwiLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibWF4QXR0cmlidXRlXCIgdHlwZT1cIlN0cmluZ1wiIG9wdGlvbmFsPVwidHJ1ZVwiPltPcHRpb25hbF0gVGhlIG5hbWUgb2YgdGhlIEhUTUwgYXR0cmlidXRlIHRoYXRcclxuICAgICAgICAvLy8gY29udGFpbnMgdGhlIG1heGltdW0gdmFsdWUuIFRoZSBkZWZhdWx0IGlzIFwibWF4XCIuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnMgdHlwZT1cImpRdWVyeS52YWxpZGF0b3IudW5vYnRydXNpdmUuYWRhcHRlcnNcIiAvPlxyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZChhZGFwdGVyTmFtZSwgW21pbkF0dHJpYnV0ZSB8fCBcIm1pblwiLCBtYXhBdHRyaWJ1dGUgfHwgXCJtYXhcIl0sIGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciBtaW4gPSBvcHRpb25zLnBhcmFtcy5taW4sXHJcbiAgICAgICAgICAgICAgICBtYXggPSBvcHRpb25zLnBhcmFtcy5tYXg7XHJcblxyXG4gICAgICAgICAgICBpZiAobWluICYmIG1heCkge1xyXG4gICAgICAgICAgICAgICAgc2V0VmFsaWRhdGlvblZhbHVlcyhvcHRpb25zLCBtaW5NYXhSdWxlTmFtZSwgW21pbiwgbWF4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobWluKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRWYWxpZGF0aW9uVmFsdWVzKG9wdGlvbnMsIG1pblJ1bGVOYW1lLCBtaW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1heCkge1xyXG4gICAgICAgICAgICAgICAgc2V0VmFsaWRhdGlvblZhbHVlcyhvcHRpb25zLCBtYXhSdWxlTmFtZSwgbWF4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBhZGFwdGVycy5hZGRTaW5nbGVWYWwgPSBmdW5jdGlvbiAoYWRhcHRlck5hbWUsIGF0dHJpYnV0ZSwgcnVsZU5hbWUpIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+QWRkcyBhIG5ldyBhZGFwdGVyIHRvIGNvbnZlcnQgdW5vYnRydXNpdmUgSFRNTCBpbnRvIGEgalF1ZXJ5IFZhbGlkYXRlIHZhbGlkYXRpb24sIHdoZXJlXHJcbiAgICAgICAgLy8vIHRoZSBqUXVlcnkgVmFsaWRhdGUgdmFsaWRhdGlvbiBydWxlIGhhcyBhIHNpbmdsZSB2YWx1ZS48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYWRhcHRlck5hbWVcIiB0eXBlPVwiU3RyaW5nXCI+VGhlIG5hbWUgb2YgdGhlIGFkYXB0ZXIgdG8gYmUgYWRkZWQuIFRoaXMgbWF0Y2hlcyB0aGUgbmFtZSB1c2VkXHJcbiAgICAgICAgLy8vIGluIHRoZSBkYXRhLXZhbC1ubm5uIEhUTUwgYXR0cmlidXRlKHdoZXJlIG5ubm4gaXMgdGhlIGFkYXB0ZXIgbmFtZSkuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhdHRyaWJ1dGVcIiB0eXBlPVwiU3RyaW5nXCI+W09wdGlvbmFsXSBUaGUgbmFtZSBvZiB0aGUgSFRNTCBhdHRyaWJ1dGUgdGhhdCBjb250YWlucyB0aGUgdmFsdWUuXHJcbiAgICAgICAgLy8vIFRoZSBkZWZhdWx0IGlzIFwidmFsXCIuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJydWxlTmFtZVwiIHR5cGU9XCJTdHJpbmdcIiBvcHRpb25hbD1cInRydWVcIj5bT3B0aW9uYWxdIFRoZSBuYW1lIG9mIHRoZSBqUXVlcnkgVmFsaWRhdGUgcnVsZS4gSWYgbm90IHByb3ZpZGVkLCB0aGUgdmFsdWVcclxuICAgICAgICAvLy8gb2YgYWRhcHRlck5hbWUgd2lsbCBiZSB1c2VkIGluc3RlYWQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnMgdHlwZT1cImpRdWVyeS52YWxpZGF0b3IudW5vYnRydXNpdmUuYWRhcHRlcnNcIiAvPlxyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZChhZGFwdGVyTmFtZSwgW2F0dHJpYnV0ZSB8fCBcInZhbFwiXSwgZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgc2V0VmFsaWRhdGlvblZhbHVlcyhvcHRpb25zLCBydWxlTmFtZSB8fCBhZGFwdGVyTmFtZSwgb3B0aW9ucy5wYXJhbXNbYXR0cmlidXRlXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgICRqUXZhbC5hZGRNZXRob2QoXCJfX2R1bW15X19cIiwgZnVuY3Rpb24gKHZhbHVlLCBlbGVtZW50LCBwYXJhbXMpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgICRqUXZhbC5hZGRNZXRob2QoXCJyZWdleFwiLCBmdW5jdGlvbiAodmFsdWUsIGVsZW1lbnQsIHBhcmFtcykge1xyXG4gICAgICAgIHZhciBtYXRjaDtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25hbChlbGVtZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1hdGNoID0gbmV3IFJlZ0V4cChwYXJhbXMpLmV4ZWModmFsdWUpO1xyXG4gICAgICAgIHJldHVybiAobWF0Y2ggJiYgKG1hdGNoLmluZGV4ID09PSAwKSAmJiAobWF0Y2hbMF0ubGVuZ3RoID09PSB2YWx1ZS5sZW5ndGgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICRqUXZhbC5hZGRNZXRob2QoXCJub25hbHBoYW1pblwiLCBmdW5jdGlvbiAodmFsdWUsIGVsZW1lbnQsIG5vbmFscGhhbWluKSB7XHJcbiAgICAgICAgdmFyIG1hdGNoO1xyXG4gICAgICAgIGlmIChub25hbHBoYW1pbikge1xyXG4gICAgICAgICAgICBtYXRjaCA9IHZhbHVlLm1hdGNoKC9cXFcvZyk7XHJcbiAgICAgICAgICAgIG1hdGNoID0gbWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID49IG5vbmFscGhhbWluO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoJGpRdmFsLm1ldGhvZHMuZXh0ZW5zaW9uKSB7XHJcbiAgICAgICAgYWRhcHRlcnMuYWRkU2luZ2xlVmFsKFwiYWNjZXB0XCIsIFwibWltdHlwZVwiKTtcclxuICAgICAgICBhZGFwdGVycy5hZGRTaW5nbGVWYWwoXCJleHRlbnNpb25cIiwgXCJleHRlbnNpb25cIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCB3aGVuIHRoZSAnZXh0ZW5zaW9uJyB2YWxpZGF0aW9uIG1ldGhvZCBkb2VzIG5vdCBleGlzdCwgc3VjaCBhcyB3aXRoIHZlcnNpb25zXHJcbiAgICAgICAgLy8gb2YgSlF1ZXJ5IFZhbGlkYXRpb24gcGx1Z2luIHByaW9yIHRvIDEuMTAsIHdlIHNob3VsZCB1c2UgdGhlICdhY2NlcHQnIG1ldGhvZCBmb3JcclxuICAgICAgICAvLyB2YWxpZGF0aW5nIHRoZSBleHRlbnNpb24sIGFuZCBpZ25vcmUgbWltZS10eXBlIHZhbGlkYXRpb25zIGFzIHRoZXkgYXJlIG5vdCBzdXBwb3J0ZWQuXHJcbiAgICAgICAgYWRhcHRlcnMuYWRkU2luZ2xlVmFsKFwiZXh0ZW5zaW9uXCIsIFwiZXh0ZW5zaW9uXCIsIFwiYWNjZXB0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkYXB0ZXJzLmFkZFNpbmdsZVZhbChcInJlZ2V4XCIsIFwicGF0dGVyblwiKTtcclxuICAgIGFkYXB0ZXJzLmFkZEJvb2woXCJjcmVkaXRjYXJkXCIpLmFkZEJvb2woXCJkYXRlXCIpLmFkZEJvb2woXCJkaWdpdHNcIikuYWRkQm9vbChcImVtYWlsXCIpLmFkZEJvb2woXCJudW1iZXJcIikuYWRkQm9vbChcInVybFwiKTtcclxuICAgIGFkYXB0ZXJzLmFkZE1pbk1heChcImxlbmd0aFwiLCBcIm1pbmxlbmd0aFwiLCBcIm1heGxlbmd0aFwiLCBcInJhbmdlbGVuZ3RoXCIpLmFkZE1pbk1heChcInJhbmdlXCIsIFwibWluXCIsIFwibWF4XCIsIFwicmFuZ2VcIik7XHJcbiAgICBhZGFwdGVycy5hZGRNaW5NYXgoXCJtaW5sZW5ndGhcIiwgXCJtaW5sZW5ndGhcIikuYWRkTWluTWF4KFwibWF4bGVuZ3RoXCIsIFwibWlubGVuZ3RoXCIsIFwibWF4bGVuZ3RoXCIpO1xyXG4gICAgYWRhcHRlcnMuYWRkKFwiZXF1YWx0b1wiLCBbXCJvdGhlclwiXSwgZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgcHJlZml4ID0gZ2V0TW9kZWxQcmVmaXgob3B0aW9ucy5lbGVtZW50Lm5hbWUpLFxyXG4gICAgICAgICAgICBvdGhlciA9IG9wdGlvbnMucGFyYW1zLm90aGVyLFxyXG4gICAgICAgICAgICBmdWxsT3RoZXJOYW1lID0gYXBwZW5kTW9kZWxQcmVmaXgob3RoZXIsIHByZWZpeCksXHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSAkKG9wdGlvbnMuZm9ybSkuZmluZChcIjppbnB1dFwiKS5maWx0ZXIoXCJbbmFtZT0nXCIgKyBlc2NhcGVBdHRyaWJ1dGVWYWx1ZShmdWxsT3RoZXJOYW1lKSArIFwiJ11cIilbMF07XHJcblxyXG4gICAgICAgIHNldFZhbGlkYXRpb25WYWx1ZXMob3B0aW9ucywgXCJlcXVhbFRvXCIsIGVsZW1lbnQpO1xyXG4gICAgfSk7XHJcbiAgICBhZGFwdGVycy5hZGQoXCJyZXF1aXJlZFwiLCBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgIC8vIGpRdWVyeSBWYWxpZGF0ZSBlcXVhdGVzIFwicmVxdWlyZWRcIiB3aXRoIFwibWFuZGF0b3J5XCIgZm9yIGNoZWNrYm94IGVsZW1lbnRzXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuZWxlbWVudC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgIT09IFwiSU5QVVRcIiB8fCBvcHRpb25zLmVsZW1lbnQudHlwZS50b1VwcGVyQ2FzZSgpICE9PSBcIkNIRUNLQk9YXCIpIHtcclxuICAgICAgICAgICAgc2V0VmFsaWRhdGlvblZhbHVlcyhvcHRpb25zLCBcInJlcXVpcmVkXCIsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgYWRhcHRlcnMuYWRkKFwicmVtb3RlXCIsIFtcInVybFwiLCBcInR5cGVcIiwgXCJhZGRpdGlvbmFsZmllbGRzXCJdLCBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHtcclxuICAgICAgICAgICAgdXJsOiBvcHRpb25zLnBhcmFtcy51cmwsXHJcbiAgICAgICAgICAgIHR5cGU6IG9wdGlvbnMucGFyYW1zLnR5cGUgfHwgXCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YToge31cclxuICAgICAgICB9LFxyXG4gICAgICAgICAgICBwcmVmaXggPSBnZXRNb2RlbFByZWZpeChvcHRpb25zLmVsZW1lbnQubmFtZSk7XHJcblxyXG4gICAgICAgICQuZWFjaChzcGxpdEFuZFRyaW0ob3B0aW9ucy5wYXJhbXMuYWRkaXRpb25hbGZpZWxkcyB8fCBvcHRpb25zLmVsZW1lbnQubmFtZSksIGZ1bmN0aW9uIChpLCBmaWVsZE5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtTmFtZSA9IGFwcGVuZE1vZGVsUHJlZml4KGZpZWxkTmFtZSwgcHJlZml4KTtcclxuICAgICAgICAgICAgdmFsdWUuZGF0YVtwYXJhbU5hbWVdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gJChvcHRpb25zLmZvcm0pLmZpbmQoXCI6aW5wdXRcIikuZmlsdGVyKFwiW25hbWU9J1wiICsgZXNjYXBlQXR0cmlidXRlVmFsdWUocGFyYW1OYW1lKSArIFwiJ11cIik7XHJcbiAgICAgICAgICAgICAgICAvLyBGb3IgY2hlY2tib3hlcyBhbmQgcmFkaW8gYnV0dG9ucywgb25seSBwaWNrIHVwIHZhbHVlcyBmcm9tIGNoZWNrZWQgZmllbGRzLlxyXG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkLmlzKFwiOmNoZWNrYm94XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpZWxkLmZpbHRlcihcIjpjaGVja2VkXCIpLnZhbCgpIHx8IGZpZWxkLmZpbHRlcihcIjpoaWRkZW5cIikudmFsKCkgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChmaWVsZC5pcyhcIjpyYWRpb1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZC5maWx0ZXIoXCI6Y2hlY2tlZFwiKS52YWwoKSB8fCAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZC52YWwoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0VmFsaWRhdGlvblZhbHVlcyhvcHRpb25zLCBcInJlbW90ZVwiLCB2YWx1ZSk7XHJcbiAgICB9KTtcclxuICAgIGFkYXB0ZXJzLmFkZChcInBhc3N3b3JkXCIsIFtcIm1pblwiLCBcIm5vbmFscGhhbWluXCIsIFwicmVnZXhcIl0sIGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMucGFyYW1zLm1pbikge1xyXG4gICAgICAgICAgICBzZXRWYWxpZGF0aW9uVmFsdWVzKG9wdGlvbnMsIFwibWlubGVuZ3RoXCIsIG9wdGlvbnMucGFyYW1zLm1pbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHRpb25zLnBhcmFtcy5ub25hbHBoYW1pbikge1xyXG4gICAgICAgICAgICBzZXRWYWxpZGF0aW9uVmFsdWVzKG9wdGlvbnMsIFwibm9uYWxwaGFtaW5cIiwgb3B0aW9ucy5wYXJhbXMubm9uYWxwaGFtaW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy5wYXJhbXMucmVnZXgpIHtcclxuICAgICAgICAgICAgc2V0VmFsaWRhdGlvblZhbHVlcyhvcHRpb25zLCBcInJlZ2V4XCIsIG9wdGlvbnMucGFyYW1zLnJlZ2V4KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkalF2YWwudW5vYnRydXNpdmUucGFyc2UoZG9jdW1lbnQpO1xyXG4gICAgfSk7XHJcbn0oalF1ZXJ5KSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi93d3dyb290L2xpYi9qcXVlcnktdmFsaWRhdGlvbi11bm9idHJ1c2l2ZS9qcXVlcnkudmFsaWRhdGUudW5vYnRydXNpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMiJdLCJzb3VyY2VSb290IjoiIn0=