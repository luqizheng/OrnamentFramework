/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="views/areas/membership/_moduleregister.js" />
	
	
	__webpack_require__(1)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="user/edit.js" />
	/// <reference path="user/index.js" />
	/// <reference path="../../../modules/nav.js" />
	
	var nav = __webpack_require__(2)
	
	nav.add(["/Membership/User", "/Membership/User/Index"], function () {
	
	    __webpack_require__.e/* nsure */(1, function ($index) {
	            console.log("load user index success.")
	        })
	});
	
	
	nav.add("/MemberShip/User/Edit/:id", function () {
	    __webpack_require__.e/* nsure */(2, function () {
	        console.log("load user edit success.")
	       __webpack_require__(7)
	    })
	})

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../views/areas/membership/user/index.js" />
	var $ = __webpack_require__(3)
	var page = __webpack_require__(4);
	
	
	var navContainser = [];
	
	function contentLoad(ctx,onEntry) {
	    var strUrl = ctx.path;
	    var loading = document.referrer == "" || location.pathname.toUpperCase() != strUrl.toUpperCase();
	    if (loading) {
	        $("#content").load(strUrl, function (responseText, textStatus, req) {
	            if (req.status != 200) {
	                $("#content").html(responseText);
	            }
	            else if ($.isFunction(onEntry)) {
	                onEntry();
	            }
	        });
	    }
	}
	
	
	function addPath(pathes, onEntry) {
	    if (!$.isArray(pathes)) {
	        page(pathes, function (ctx) {
	            contentLoad(ctx,onEntry);
	        });
	    } else {
	        $(pathes).each(function () {
	            page(this, function (ctx) {
	                contentLoad(ctx,onEntry);
	            });
	
	        })
	    }
	}
	addPath("/")
	page();
	
	module.exports = {
	    add: addPath
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;!function(e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.page=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	(function (process){
	  /* globals require, module */
	
	  'use strict';
	
	  /**
	   * Module dependencies.
	   */
	
	  var pathtoRegexp = require('path-to-regexp');
	
	  /**
	   * Module exports.
	   */
	
	  module.exports = page;
	
	  /**
	   * Detect click event
	   */
	  var clickEvent = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';
	
	  /**
	   * To work properly with the URL
	   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
	   */
	
	  var location = ('undefined' !== typeof window) && (window.history.location || window.location);
	
	  /**
	   * Perform initial dispatch.
	   */
	
	  var dispatch = true;
	
	
	  /**
	   * Decode URL components (query string, pathname, hash).
	   * Accommodates both regular percent encoding and x-www-form-urlencoded format.
	   */
	  var decodeURLComponents = true;
	
	  /**
	   * Base path.
	   */
	
	  var base = '';
	
	  /**
	   * Running flag.
	   */
	
	  var running;
	
	  /**
	   * HashBang option
	   */
	
	  var hashbang = false;
	
	  /**
	   * Previous context, for capturing
	   * page exit events.
	   */
	
	  var prevContext;
	
	  /**
	   * Register `path` with callback `fn()`,
	   * or route `path`, or redirection,
	   * or `page.start()`.
	   *
	   *   page(fn);
	   *   page('*', fn);
	   *   page('/user/:id', load, user);
	   *   page('/user/' + user.id, { some: 'thing' });
	   *   page('/user/' + user.id);
	   *   page('/from', '/to')
	   *   page();
	   *
	   * @param {string|!Function|!Object} path
	   * @param {Function=} fn
	   * @api public
	   */
	
	  function page(path, fn) {
	    // <callback>
	    if ('function' === typeof path) {
	      return page('*', path);
	    }
	
	    // route <path> to <callback ...>
	    if ('function' === typeof fn) {
	      var route = new Route(/** @type {string} */ (path));
	      for (var i = 1; i < arguments.length; ++i) {
	        page.callbacks.push(route.middleware(arguments[i]));
	      }
	      // show <path> with [state]
	    } else if ('string' === typeof path) {
	      page['string' === typeof fn ? 'redirect' : 'show'](path, fn);
	      // start [options]
	    } else {
	      page.start(path);
	    }
	  }
	
	  /**
	   * Callback functions.
	   */
	
	  page.callbacks = [];
	  page.exits = [];
	
	  /**
	   * Current path being processed
	   * @type {string}
	   */
	  page.current = '';
	
	  /**
	   * Number of pages navigated to.
	   * @type {number}
	   *
	   *     page.len == 0;
	   *     page('/login');
	   *     page.len == 1;
	   */
	
	  page.len = 0;
	
	  /**
	   * Get or set basepath to `path`.
	   *
	   * @param {string} path
	   * @api public
	   */
	
	  page.base = function(path) {
	    if (0 === arguments.length) return base;
	    base = path;
	  };
	
	  /**
	   * Bind with the given `options`.
	   *
	   * Options:
	   *
	   *    - `click` bind to click events [true]
	   *    - `popstate` bind to popstate [true]
	   *    - `dispatch` perform initial dispatch [true]
	   *
	   * @param {Object} options
	   * @api public
	   */
	
	  page.start = function(options) {
	    options = options || {};
	    if (running) return;
	    running = true;
	    if (false === options.dispatch) dispatch = false;
	    if (false === options.decodeURLComponents) decodeURLComponents = false;
	    if (false !== options.popstate) window.addEventListener('popstate', onpopstate, false);
	    if (false !== options.click) {
	      document.addEventListener(clickEvent, onclick, false);
	    }
	    if (true === options.hashbang) hashbang = true;
	    if (!dispatch) return;
	    var url = (hashbang && ~location.hash.indexOf('#!')) ? location.hash.substr(2) + location.search : location.pathname + location.search + location.hash;
	    page.replace(url, null, true, dispatch);
	  };
	
	  /**
	   * Unbind click and popstate event handlers.
	   *
	   * @api public
	   */
	
	  page.stop = function() {
	    if (!running) return;
	    page.current = '';
	    page.len = 0;
	    running = false;
	    document.removeEventListener(clickEvent, onclick, false);
	    window.removeEventListener('popstate', onpopstate, false);
	  };
	
	  /**
	   * Show `path` with optional `state` object.
	   *
	   * @param {string} path
	   * @param {Object=} state
	   * @param {boolean=} dispatch
	   * @param {boolean=} push
	   * @return {!Context}
	   * @api public
	   */
	
	  page.show = function(path, state, dispatch, push) {
	    var ctx = new Context(path, state);
	    page.current = ctx.path;
	    if (false !== dispatch) page.dispatch(ctx);
	    if (false !== ctx.handled && false !== push) ctx.pushState();
	    return ctx;
	  };
	
	  /**
	   * Goes back in the history
	   * Back should always let the current route push state and then go back.
	   *
	   * @param {string} path - fallback path to go back if no more history exists, if undefined defaults to page.base
	   * @param {Object=} state
	   * @api public
	   */
	
	  page.back = function(path, state) {
	    if (page.len > 0) {
	      // this may need more testing to see if all browsers
	      // wait for the next tick to go back in history
	      history.back();
	      page.len--;
	    } else if (path) {
	      setTimeout(function() {
	        page.show(path, state);
	      });
	    }else{
	      setTimeout(function() {
	        page.show(base, state);
	      });
	    }
	  };
	
	
	  /**
	   * Register route to redirect from one path to other
	   * or just redirect to another route
	   *
	   * @param {string} from - if param 'to' is undefined redirects to 'from'
	   * @param {string=} to
	   * @api public
	   */
	  page.redirect = function(from, to) {
	    // Define route from a path to another
	    if ('string' === typeof from && 'string' === typeof to) {
	      page(from, function(e) {
	        setTimeout(function() {
	          page.replace(/** @type {!string} */ (to));
	        }, 0);
	      });
	    }
	
	    // Wait for the push state and replace it with another
	    if ('string' === typeof from && 'undefined' === typeof to) {
	      setTimeout(function() {
	        page.replace(from);
	      }, 0);
	    }
	  };
	
	  /**
	   * Replace `path` with optional `state` object.
	   *
	   * @param {string} path
	   * @param {Object=} state
	   * @param {boolean=} init
	   * @param {boolean=} dispatch
	   * @return {!Context}
	   * @api public
	   */
	
	
	  page.replace = function(path, state, init, dispatch) {
	    var ctx = new Context(path, state);
	    page.current = ctx.path;
	    ctx.init = init;
	    ctx.save(); // save before dispatching, which may redirect
	    if (false !== dispatch) page.dispatch(ctx);
	    return ctx;
	  };
	
	  /**
	   * Dispatch the given `ctx`.
	   *
	   * @param {Context} ctx
	   * @api private
	   */
	  page.dispatch = function(ctx) {
	    var prev = prevContext,
	      i = 0,
	      j = 0;
	
	    prevContext = ctx;
	
	    function nextExit() {
	      var fn = page.exits[j++];
	      if (!fn) return nextEnter();
	      fn(prev, nextExit);
	    }
	
	    function nextEnter() {
	      var fn = page.callbacks[i++];
	
	      if (ctx.path !== page.current) {
	        ctx.handled = false;
	        return;
	      }
	      if (!fn) return unhandled(ctx);
	      fn(ctx, nextEnter);
	    }
	
	    if (prev) {
	      nextExit();
	    } else {
	      nextEnter();
	    }
	  };
	
	  /**
	   * Unhandled `ctx`. When it's not the initial
	   * popstate then redirect. If you wish to handle
	   * 404s on your own use `page('*', callback)`.
	   *
	   * @param {Context} ctx
	   * @api private
	   */
	  function unhandled(ctx) {
	    if (ctx.handled) return;
	    var current;
	
	    if (hashbang) {
	      current = base + location.hash.replace('#!', '');
	    } else {
	      current = location.pathname + location.search;
	    }
	
	    if (current === ctx.canonicalPath) return;
	    page.stop();
	    ctx.handled = false;
	    location.href = ctx.canonicalPath;
	  }
	
	  /**
	   * Register an exit route on `path` with
	   * callback `fn()`, which will be called
	   * on the previous context when a new
	   * page is visited.
	   */
	  page.exit = function(path, fn) {
	    if (typeof path === 'function') {
	      return page.exit('*', path);
	    }
	
	    var route = new Route(path);
	    for (var i = 1; i < arguments.length; ++i) {
	      page.exits.push(route.middleware(arguments[i]));
	    }
	  };
	
	  /**
	   * Remove URL encoding from the given `str`.
	   * Accommodates whitespace in both x-www-form-urlencoded
	   * and regular percent-encoded form.
	   *
	   * @param {string} val - URL component to decode
	   */
	  function decodeURLEncodedURIComponent(val) {
	    if (typeof val !== 'string') { return val; }
	    return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
	  }
	
	  /**
	   * Initialize a new "request" `Context`
	   * with the given `path` and optional initial `state`.
	   *
	   * @constructor
	   * @param {string} path
	   * @param {Object=} state
	   * @api public
	   */
	
	  function Context(path, state) {
	    if ('/' === path[0] && 0 !== path.indexOf(base)) path = base + (hashbang ? '#!' : '') + path;
	    var i = path.indexOf('?');
	
	    this.canonicalPath = path;
	    this.path = path.replace(base, '') || '/';
	    if (hashbang) this.path = this.path.replace('#!', '') || '/';
	
	    this.title = document.title;
	    this.state = state || {};
	    this.state.path = path;
	    this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
	    this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
	    this.params = {};
	
	    // fragment
	    this.hash = '';
	    if (!hashbang) {
	      if (!~this.path.indexOf('#')) return;
	      var parts = this.path.split('#');
	      this.path = parts[0];
	      this.hash = decodeURLEncodedURIComponent(parts[1]) || '';
	      this.querystring = this.querystring.split('#')[0];
	    }
	  }
	
	  /**
	   * Expose `Context`.
	   */
	
	  page.Context = Context;
	
	  /**
	   * Push state.
	   *
	   * @api private
	   */
	
	  Context.prototype.pushState = function() {
	    page.len++;
	    history.pushState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
	  };
	
	  /**
	   * Save the context state.
	   *
	   * @api public
	   */
	
	  Context.prototype.save = function() {
	    history.replaceState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
	  };
	
	  /**
	   * Initialize `Route` with the given HTTP `path`,
	   * and an array of `callbacks` and `options`.
	   *
	   * Options:
	   *
	   *   - `sensitive`    enable case-sensitive routes
	   *   - `strict`       enable strict matching for trailing slashes
	   *
	   * @constructor
	   * @param {string} path
	   * @param {Object=} options
	   * @api private
	   */
	
	  function Route(path, options) {
	    options = options || {};
	    this.path = (path === '*') ? '(.*)' : path;
	    this.method = 'GET';
	    this.regexp = pathtoRegexp(this.path,
	      this.keys = [],
	      options);
	  }
	
	  /**
	   * Expose `Route`.
	   */
	
	  page.Route = Route;
	
	  /**
	   * Return route middleware with
	   * the given callback `fn()`.
	   *
	   * @param {Function} fn
	   * @return {Function}
	   * @api public
	   */
	
	  Route.prototype.middleware = function(fn) {
	    var self = this;
	    return function(ctx, next) {
	      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
	      next();
	    };
	  };
	
	  /**
	   * Check if this route matches `path`, if so
	   * populate `params`.
	   *
	   * @param {string} path
	   * @param {Object} params
	   * @return {boolean}
	   * @api private
	   */
	
	  Route.prototype.match = function(path, params) {
	    var keys = this.keys,
	      qsIndex = path.indexOf('?'),
	      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
	      m = this.regexp.exec(decodeURIComponent(pathname));
	
	    if (!m) return false;
	
	    for (var i = 1, len = m.length; i < len; ++i) {
	      var key = keys[i - 1];
	      var val = decodeURLEncodedURIComponent(m[i]);
	      if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
	        params[key.name] = val;
	      }
	    }
	
	    return true;
	  };
	
	
	  /**
	   * Handle "populate" events.
	   */
	
	  var onpopstate = (function () {
	    var loaded = false;
	    if ('undefined' === typeof window) {
	      return;
	    }
	    if (document.readyState === 'complete') {
	      loaded = true;
	    } else {
	      window.addEventListener('load', function() {
	        setTimeout(function() {
	          loaded = true;
	        }, 0);
	      });
	    }
	    return function onpopstate(e) {
	      if (!loaded) return;
	      if (e.state) {
	        var path = e.state.path;
	        page.replace(path, e.state);
	      } else {
	        page.show(location.pathname + location.hash, undefined, undefined, false);
	      }
	    };
	  })();
	  /**
	   * Handle "click" events.
	   */
	
	  function onclick(e) {
	
	    if (1 !== which(e)) return;
	
	    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	    if (e.defaultPrevented) return;
	
	
	
	    // ensure link
	    // use shadow dom when available
	    var el = e.path ? e.path[0] : e.target;
	    while (el && 'A' !== el.nodeName) el = el.parentNode;
	    if (!el || 'A' !== el.nodeName) return;
	
	
	
	    // Ignore if tag has
	    // 1. "download" attribute
	    // 2. rel="external" attribute
	    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;
	
	    // ensure non-hash for the same path
	    var link = el.getAttribute('href');
	    if (!hashbang && el.pathname === location.pathname && (el.hash || '#' === link)) return;
	
	
	
	    // Check for mailto: in the href
	    if (link && link.indexOf('mailto:') > -1) return;
	
	    // check target
	    if (el.target) return;
	
	    // x-origin
	    if (!sameOrigin(el.href)) return;
	
	
	
	    // rebuild path
	    var path = el.pathname + el.search + (el.hash || '');
	
	    // strip leading "/[drive letter]:" on NW.js on Windows
	    if (typeof process !== 'undefined' && path.match(/^\/[a-zA-Z]:\//)) {
	      path = path.replace(/^\/[a-zA-Z]:\//, '/');
	    }
	
	    // same page
	    var orig = path;
	
	    if (path.indexOf(base) === 0) {
	      path = path.substr(base.length);
	    }
	
	    if (hashbang) path = path.replace('#!', '');
	
	    if (base && orig === path) return;
	
	    e.preventDefault();
	    page.show(orig);
	  }
	
	  /**
	   * Event button.
	   */
	
	  function which(e) {
	    e = e || window.event;
	    return null === e.which ? e.button : e.which;
	  }
	
	  /**
	   * Check if `href` is the same origin.
	   */
	
	  function sameOrigin(href) {
	    var origin = location.protocol + '//' + location.hostname;
	    if (location.port) origin += ':' + location.port;
	    return (href && (0 === href.indexOf(origin)));
	  }
	
	  page.sameOrigin = sameOrigin;
	
	}).call(this,require('_process'))
	},{"_process":2,"path-to-regexp":3}],2:[function(require,module,exports){
	// shim for using process in browser
	
	var process = module.exports = {};
	
	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canMutationObserver = typeof window !== 'undefined'
	    && window.MutationObserver;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;
	
	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }
	
	    var queue = [];
	
	    if (canMutationObserver) {
	        var hiddenDiv = document.createElement("div");
	        var observer = new MutationObserver(function () {
	            var queueList = queue.slice();
	            queue.length = 0;
	            queueList.forEach(function (fn) {
	                fn();
	            });
	        });
	
	        observer.observe(hiddenDiv, { attributes: true });
	
	        return function nextTick(fn) {
	            if (!queue.length) {
	                hiddenDiv.setAttribute('yes', 'no');
	            }
	            queue.push(fn);
	        };
	    }
	
	    if (canPost) {
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);
	
	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }
	
	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();
	
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	
	},{}],3:[function(require,module,exports){
	var isarray = require('isarray')
	
	/**
	 * Expose `pathToRegexp`.
	 */
	module.exports = pathToRegexp
	module.exports.parse = parse
	module.exports.compile = compile
	module.exports.tokensToFunction = tokensToFunction
	module.exports.tokensToRegExp = tokensToRegExp
	
	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g')
	
	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {String} str
	 * @return {Array}
	 */
	function parse (str) {
	  var tokens = []
	  var key = 0
	  var index = 0
	  var path = ''
	  var res
	
	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0]
	    var escaped = res[1]
	    var offset = res.index
	    path += str.slice(index, offset)
	    index = offset + m.length
	
	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1]
	      continue
	    }
	
	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path)
	      path = ''
	    }
	
	    var prefix = res[2]
	    var name = res[3]
	    var capture = res[4]
	    var group = res[5]
	    var suffix = res[6]
	    var asterisk = res[7]
	
	    var repeat = suffix === '+' || suffix === '*'
	    var optional = suffix === '?' || suffix === '*'
	    var delimiter = prefix || '/'
	    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')
	
	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      pattern: escapeGroup(pattern)
	    })
	  }
	
	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index)
	  }
	
	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path)
	  }
	
	  return tokens
	}
	
	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {String}   str
	 * @return {Function}
	 */
	function compile (str) {
	  return tokensToFunction(parse(str))
	}
	
	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length)
	
	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^' + tokens[i].pattern + '$')
	    }
	  }
	
	  return function (obj) {
	    var path = ''
	    var data = obj || {}
	
	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i]
	
	      if (typeof token === 'string') {
	        path += token
	
	        continue
	      }
	
	      var value = data[token.name]
	      var segment
	
	      if (value == null) {
	        if (token.optional) {
	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }
	
	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
	        }
	
	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }
	
	        for (var j = 0; j < value.length; j++) {
	          segment = encodeURIComponent(value[j])
	
	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	          }
	
	          path += (j === 0 ? token.prefix : token.delimiter) + segment
	        }
	
	        continue
	      }
	
	      segment = encodeURIComponent(value)
	
	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }
	
	      path += token.prefix + segment
	    }
	
	    return path
	  }
	}
	
	/**
	 * Escape a regular expression string.
	 *
	 * @param  {String} str
	 * @return {String}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
	}
	
	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {String} group
	 * @return {String}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}
	
	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {RegExp} re
	 * @param  {Array}  keys
	 * @return {RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys
	  return re
	}
	
	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {String}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}
	
	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {RegExp} path
	 * @param  {Array}  keys
	 * @return {RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g)
	
	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        pattern: null
	      })
	    }
	  }
	
	  return attachKeys(path, keys)
	}
	
	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {Array}  path
	 * @param  {Array}  keys
	 * @param  {Object} options
	 * @return {RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = []
	
	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source)
	  }
	
	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))
	
	  return attachKeys(regexp, keys)
	}
	
	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {String} path
	 * @param  {Array}  keys
	 * @param  {Object} options
	 * @return {RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  var tokens = parse(path)
	  var re = tokensToRegExp(tokens, options)
	
	  // Attach keys back to the regexp.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] !== 'string') {
	      keys.push(tokens[i])
	    }
	  }
	
	  return attachKeys(re, keys)
	}
	
	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {Array}  tokens
	 * @param  {Array}  keys
	 * @param  {Object} options
	 * @return {RegExp}
	 */
	function tokensToRegExp (tokens, options) {
	  options = options || {}
	
	  var strict = options.strict
	  var end = options.end !== false
	  var route = ''
	  var lastToken = tokens[tokens.length - 1]
	  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)
	
	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i]
	
	    if (typeof token === 'string') {
	      route += escapeString(token)
	    } else {
	      var prefix = escapeString(token.prefix)
	      var capture = token.pattern
	
	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*'
	      }
	
	      if (token.optional) {
	        if (prefix) {
	          capture = '(?:' + prefix + '(' + capture + '))?'
	        } else {
	          capture = '(' + capture + ')?'
	        }
	      } else {
	        capture = prefix + '(' + capture + ')'
	      }
	
	      route += capture
	    }
	  }
	
	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
	  }
	
	  if (end) {
	    route += '$'
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
	  }
	
	  return new RegExp('^' + route, flags(options))
	}
	
	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(String|RegExp|Array)} path
	 * @param  {Array}                 [keys]
	 * @param  {Object}                [options]
	 * @return {RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  keys = keys || []
	
	  if (!isarray(keys)) {
	    options = keys
	    keys = []
	  } else if (!options) {
	    options = {}
	  }
	
	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, keys, options)
	  }
	
	  if (isarray(path)) {
	    return arrayToRegexp(path, keys, options)
	  }
	
	  return stringToRegexp(path, keys, options)
	}
	
	},{"isarray":4}],4:[function(require,module,exports){
	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};
	
	},{}]},{},[1])(1)
	});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDNhYTBmNmZiMjhkYWE3MjMyYzAiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL3ZpZXdzL2FyZWFzL21lbWJlcnNoaXAvX3JlZ2lzdGVyLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvX3NyYy9qcy9tb2R1bGVzL25hdi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqUXVlcnlcIiIsIndlYnBhY2s6Ly8vLi93d3dyb290L2xpYi9wYWdlL3BhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDekZBOzs7QUFHQSx1Qjs7Ozs7O0FDSEE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLHlDQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsRUFBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsRUFBQyxDOzs7Ozs7QUNwQkQ7QUFDQTtBQUNB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QUFDLEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSBmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhjaHVua0lkcywgbW9yZU1vZHVsZXMpIHtcbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCBjYWxsYmFja3MgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKVxuIFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2guYXBwbHkoY2FsbGJhY2tzLCBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pO1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihjaHVua0lkcywgbW9yZU1vZHVsZXMpO1xuIFx0XHR3aGlsZShjYWxsYmFja3MubGVuZ3RoKVxuIFx0XHRcdGNhbGxiYWNrcy5zaGlmdCgpLmNhbGwobnVsbCwgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdH07XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyBcIjBcIiBtZWFucyBcImFscmVhZHkgbG9hZGVkXCJcbiBcdC8vIEFycmF5IG1lYW5zIFwibG9hZGluZ1wiLCBhcnJheSBjb250YWlucyBjYWxsYmFja3NcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdDA6MFxuIFx0fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCwgY2FsbGJhY2spIHtcbiBcdFx0Ly8gXCIwXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMClcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbChudWxsLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBhbiBhcnJheSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkKSB7XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdLnB1c2goY2FsbGJhY2spO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbY2FsbGJhY2tdO1xuIFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiBcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0c2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiBcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0c2NyaXB0LmFzeW5jID0gdHJ1ZTtcblxuIFx0XHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgKHt9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCI7XG4gXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDQzYWEwZjZmYjI4ZGFhNzIzMmMwXG4gKiovIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cInZpZXdzL2FyZWFzL21lbWJlcnNoaXAvX21vZHVsZXJlZ2lzdGVyLmpzXCIgLz5cclxuXHJcblxyXG5yZXF1aXJlKFwiLi92aWV3cy9hcmVhcy9tZW1iZXJzaGlwL19yZWdpc3Rlci5qc1wiKVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L19zcmMvanMvbWFpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ1c2VyL2VkaXQuanNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwidXNlci9pbmRleC5qc1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9tb2R1bGVzL25hdi5qc1wiIC8+XHJcblxyXG52YXIgbmF2ID0gcmVxdWlyZShcIi4uLy4uLy4uL21vZHVsZXMvbmF2LmpzXCIpXHJcblxyXG5uYXYuYWRkKFtcIi9NZW1iZXJzaGlwL1VzZXJcIiwgXCIvTWVtYmVyc2hpcC9Vc2VyL0luZGV4XCJdLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgcmVxdWlyZS5lbnN1cmUoWycuL3VzZXIvaW5kZXguanMnXSxcclxuICAgICAgICBmdW5jdGlvbiAoJGluZGV4KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9hZCB1c2VyIGluZGV4IHN1Y2Nlc3MuXCIpXHJcbiAgICAgICAgfSlcclxufSk7XHJcblxyXG5cclxubmF2LmFkZChcIi9NZW1iZXJTaGlwL1VzZXIvRWRpdC86aWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgcmVxdWlyZS5lbnN1cmUoW1wiLi91c2VyL2VkaXQuanNcIl0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImxvYWQgdXNlciBlZGl0IHN1Y2Nlc3MuXCIpXHJcbiAgICAgICByZXF1aXJlKFwiLi91c2VyL2VkaXQuanNcIilcclxuICAgIH0pXHJcbn0pXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvX3NyYy9qcy92aWV3cy9hcmVhcy9tZW1iZXJzaGlwL19yZWdpc3Rlci5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi92aWV3cy9hcmVhcy9tZW1iZXJzaGlwL3VzZXIvaW5kZXguanNcIiAvPlxyXG52YXIgJCA9IHJlcXVpcmUoJ2pxdWVyeScpXHJcbnZhciBwYWdlID0gcmVxdWlyZShcIi4uLy4uLy4uL2xpYi9wYWdlL3BhZ2UuanNcIik7XHJcblxyXG5cclxudmFyIG5hdkNvbnRhaW5zZXIgPSBbXTtcclxuXHJcbmZ1bmN0aW9uIGNvbnRlbnRMb2FkKGN0eCxvbkVudHJ5KSB7XHJcbiAgICB2YXIgc3RyVXJsID0gY3R4LnBhdGg7XHJcbiAgICB2YXIgbG9hZGluZyA9IGRvY3VtZW50LnJlZmVycmVyID09IFwiXCIgfHwgbG9jYXRpb24ucGF0aG5hbWUudG9VcHBlckNhc2UoKSAhPSBzdHJVcmwudG9VcHBlckNhc2UoKTtcclxuICAgIGlmIChsb2FkaW5nKSB7XHJcbiAgICAgICAgJChcIiNjb250ZW50XCIpLmxvYWQoc3RyVXJsLCBmdW5jdGlvbiAocmVzcG9uc2VUZXh0LCB0ZXh0U3RhdHVzLCByZXEpIHtcclxuICAgICAgICAgICAgaWYgKHJlcS5zdGF0dXMgIT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2NvbnRlbnRcIikuaHRtbChyZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCQuaXNGdW5jdGlvbihvbkVudHJ5KSkge1xyXG4gICAgICAgICAgICAgICAgb25FbnRyeSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBhZGRQYXRoKHBhdGhlcywgb25FbnRyeSkge1xyXG4gICAgaWYgKCEkLmlzQXJyYXkocGF0aGVzKSkge1xyXG4gICAgICAgIHBhZ2UocGF0aGVzLCBmdW5jdGlvbiAoY3R4KSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnRMb2FkKGN0eCxvbkVudHJ5KTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJChwYXRoZXMpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwYWdlKHRoaXMsIGZ1bmN0aW9uIChjdHgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRMb2FkKGN0eCxvbkVudHJ5KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuYWRkUGF0aChcIi9cIilcclxucGFnZSgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBhZGQ6IGFkZFBhdGhcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L19zcmMvanMvbW9kdWxlcy9uYXYuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwialF1ZXJ5XCJcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIhZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxlKTtlbHNle3ZhciBmO1widW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/Zj13aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9mPWdsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmKGY9c2VsZiksZi5wYWdlPWUoKX19KGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4oZnVuY3Rpb24gKHByb2Nlc3Mpe1xyXG4gIC8qIGdsb2JhbHMgcmVxdWlyZSwgbW9kdWxlICovXHJcblxyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgLyoqXHJcbiAgICogTW9kdWxlIGRlcGVuZGVuY2llcy5cclxuICAgKi9cclxuXHJcbiAgdmFyIHBhdGh0b1JlZ2V4cCA9IHJlcXVpcmUoJ3BhdGgtdG8tcmVnZXhwJyk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vZHVsZSBleHBvcnRzLlxyXG4gICAqL1xyXG5cclxuICBtb2R1bGUuZXhwb3J0cyA9IHBhZ2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIERldGVjdCBjbGljayBldmVudFxyXG4gICAqL1xyXG4gIHZhciBjbGlja0V2ZW50ID0gKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgZG9jdW1lbnQpICYmIGRvY3VtZW50Lm9udG91Y2hzdGFydCA/ICd0b3VjaHN0YXJ0JyA6ICdjbGljayc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvIHdvcmsgcHJvcGVybHkgd2l0aCB0aGUgVVJMXHJcbiAgICogaGlzdG9yeS5sb2NhdGlvbiBnZW5lcmF0ZWQgcG9seWZpbGwgaW4gaHR0cHM6Ly9naXRodWIuY29tL2Rldm90ZS9IVE1MNS1IaXN0b3J5LUFQSVxyXG4gICAqL1xyXG5cclxuICB2YXIgbG9jYXRpb24gPSAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiB3aW5kb3cpICYmICh3aW5kb3cuaGlzdG9yeS5sb2NhdGlvbiB8fCB3aW5kb3cubG9jYXRpb24pO1xyXG5cclxuICAvKipcclxuICAgKiBQZXJmb3JtIGluaXRpYWwgZGlzcGF0Y2guXHJcbiAgICovXHJcblxyXG4gIHZhciBkaXNwYXRjaCA9IHRydWU7XHJcblxyXG5cclxuICAvKipcclxuICAgKiBEZWNvZGUgVVJMIGNvbXBvbmVudHMgKHF1ZXJ5IHN0cmluZywgcGF0aG5hbWUsIGhhc2gpLlxyXG4gICAqIEFjY29tbW9kYXRlcyBib3RoIHJlZ3VsYXIgcGVyY2VudCBlbmNvZGluZyBhbmQgeC13d3ctZm9ybS11cmxlbmNvZGVkIGZvcm1hdC5cclxuICAgKi9cclxuICB2YXIgZGVjb2RlVVJMQ29tcG9uZW50cyA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIEJhc2UgcGF0aC5cclxuICAgKi9cclxuXHJcbiAgdmFyIGJhc2UgPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogUnVubmluZyBmbGFnLlxyXG4gICAqL1xyXG5cclxuICB2YXIgcnVubmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogSGFzaEJhbmcgb3B0aW9uXHJcbiAgICovXHJcblxyXG4gIHZhciBoYXNoYmFuZyA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBQcmV2aW91cyBjb250ZXh0LCBmb3IgY2FwdHVyaW5nXHJcbiAgICogcGFnZSBleGl0IGV2ZW50cy5cclxuICAgKi9cclxuXHJcbiAgdmFyIHByZXZDb250ZXh0O1xyXG5cclxuICAvKipcclxuICAgKiBSZWdpc3RlciBgcGF0aGAgd2l0aCBjYWxsYmFjayBgZm4oKWAsXHJcbiAgICogb3Igcm91dGUgYHBhdGhgLCBvciByZWRpcmVjdGlvbixcclxuICAgKiBvciBgcGFnZS5zdGFydCgpYC5cclxuICAgKlxyXG4gICAqICAgcGFnZShmbik7XHJcbiAgICogICBwYWdlKCcqJywgZm4pO1xyXG4gICAqICAgcGFnZSgnL3VzZXIvOmlkJywgbG9hZCwgdXNlcik7XHJcbiAgICogICBwYWdlKCcvdXNlci8nICsgdXNlci5pZCwgeyBzb21lOiAndGhpbmcnIH0pO1xyXG4gICAqICAgcGFnZSgnL3VzZXIvJyArIHVzZXIuaWQpO1xyXG4gICAqICAgcGFnZSgnL2Zyb20nLCAnL3RvJylcclxuICAgKiAgIHBhZ2UoKTtcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfCFGdW5jdGlvbnwhT2JqZWN0fSBwYXRoXHJcbiAgICogQHBhcmFtIHtGdW5jdGlvbj19IGZuXHJcbiAgICogQGFwaSBwdWJsaWNcclxuICAgKi9cclxuXHJcbiAgZnVuY3Rpb24gcGFnZShwYXRoLCBmbikge1xyXG4gICAgLy8gPGNhbGxiYWNrPlxyXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBwYXRoKSB7XHJcbiAgICAgIHJldHVybiBwYWdlKCcqJywgcGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcm91dGUgPHBhdGg+IHRvIDxjYWxsYmFjayAuLi4+XHJcbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZuKSB7XHJcbiAgICAgIHZhciByb3V0ZSA9IG5ldyBSb3V0ZSgvKiogQHR5cGUge3N0cmluZ30gKi8gKHBhdGgpKTtcclxuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBwYWdlLmNhbGxiYWNrcy5wdXNoKHJvdXRlLm1pZGRsZXdhcmUoYXJndW1lbnRzW2ldKSk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gc2hvdyA8cGF0aD4gd2l0aCBbc3RhdGVdXHJcbiAgICB9IGVsc2UgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgcGF0aCkge1xyXG4gICAgICBwYWdlWydzdHJpbmcnID09PSB0eXBlb2YgZm4gPyAncmVkaXJlY3QnIDogJ3Nob3cnXShwYXRoLCBmbik7XHJcbiAgICAgIC8vIHN0YXJ0IFtvcHRpb25zXVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGFnZS5zdGFydChwYXRoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGxiYWNrIGZ1bmN0aW9ucy5cclxuICAgKi9cclxuXHJcbiAgcGFnZS5jYWxsYmFja3MgPSBbXTtcclxuICBwYWdlLmV4aXRzID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgcGF0aCBiZWluZyBwcm9jZXNzZWRcclxuICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIHBhZ2UuY3VycmVudCA9ICcnO1xyXG5cclxuICAvKipcclxuICAgKiBOdW1iZXIgb2YgcGFnZXMgbmF2aWdhdGVkIHRvLlxyXG4gICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICpcclxuICAgKiAgICAgcGFnZS5sZW4gPT0gMDtcclxuICAgKiAgICAgcGFnZSgnL2xvZ2luJyk7XHJcbiAgICogICAgIHBhZ2UubGVuID09IDE7XHJcbiAgICovXHJcblxyXG4gIHBhZ2UubGVuID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IG9yIHNldCBiYXNlcGF0aCB0byBgcGF0aGAuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxyXG4gICAqIEBhcGkgcHVibGljXHJcbiAgICovXHJcblxyXG4gIHBhZ2UuYmFzZSA9IGZ1bmN0aW9uKHBhdGgpIHtcclxuICAgIGlmICgwID09PSBhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gYmFzZTtcclxuICAgIGJhc2UgPSBwYXRoO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEJpbmQgd2l0aCB0aGUgZ2l2ZW4gYG9wdGlvbnNgLlxyXG4gICAqXHJcbiAgICogT3B0aW9uczpcclxuICAgKlxyXG4gICAqICAgIC0gYGNsaWNrYCBiaW5kIHRvIGNsaWNrIGV2ZW50cyBbdHJ1ZV1cclxuICAgKiAgICAtIGBwb3BzdGF0ZWAgYmluZCB0byBwb3BzdGF0ZSBbdHJ1ZV1cclxuICAgKiAgICAtIGBkaXNwYXRjaGAgcGVyZm9ybSBpbml0aWFsIGRpc3BhdGNoIFt0cnVlXVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgKiBAYXBpIHB1YmxpY1xyXG4gICAqL1xyXG5cclxuICBwYWdlLnN0YXJ0ID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICBpZiAocnVubmluZykgcmV0dXJuO1xyXG4gICAgcnVubmluZyA9IHRydWU7XHJcbiAgICBpZiAoZmFsc2UgPT09IG9wdGlvbnMuZGlzcGF0Y2gpIGRpc3BhdGNoID0gZmFsc2U7XHJcbiAgICBpZiAoZmFsc2UgPT09IG9wdGlvbnMuZGVjb2RlVVJMQ29tcG9uZW50cykgZGVjb2RlVVJMQ29tcG9uZW50cyA9IGZhbHNlO1xyXG4gICAgaWYgKGZhbHNlICE9PSBvcHRpb25zLnBvcHN0YXRlKSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBvbnBvcHN0YXRlLCBmYWxzZSk7XHJcbiAgICBpZiAoZmFsc2UgIT09IG9wdGlvbnMuY2xpY2spIHtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihjbGlja0V2ZW50LCBvbmNsaWNrLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBpZiAodHJ1ZSA9PT0gb3B0aW9ucy5oYXNoYmFuZykgaGFzaGJhbmcgPSB0cnVlO1xyXG4gICAgaWYgKCFkaXNwYXRjaCkgcmV0dXJuO1xyXG4gICAgdmFyIHVybCA9IChoYXNoYmFuZyAmJiB+bG9jYXRpb24uaGFzaC5pbmRleE9mKCcjIScpKSA/IGxvY2F0aW9uLmhhc2guc3Vic3RyKDIpICsgbG9jYXRpb24uc2VhcmNoIDogbG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5zZWFyY2ggKyBsb2NhdGlvbi5oYXNoO1xyXG4gICAgcGFnZS5yZXBsYWNlKHVybCwgbnVsbCwgdHJ1ZSwgZGlzcGF0Y2gpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuYmluZCBjbGljayBhbmQgcG9wc3RhdGUgZXZlbnQgaGFuZGxlcnMuXHJcbiAgICpcclxuICAgKiBAYXBpIHB1YmxpY1xyXG4gICAqL1xyXG5cclxuICBwYWdlLnN0b3AgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmICghcnVubmluZykgcmV0dXJuO1xyXG4gICAgcGFnZS5jdXJyZW50ID0gJyc7XHJcbiAgICBwYWdlLmxlbiA9IDA7XHJcbiAgICBydW5uaW5nID0gZmFsc2U7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGNsaWNrRXZlbnQsIG9uY2xpY2ssIGZhbHNlKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIG9ucG9wc3RhdGUsIGZhbHNlKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBTaG93IGBwYXRoYCB3aXRoIG9wdGlvbmFsIGBzdGF0ZWAgb2JqZWN0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcclxuICAgKiBAcGFyYW0ge09iamVjdD19IHN0YXRlXHJcbiAgICogQHBhcmFtIHtib29sZWFuPX0gZGlzcGF0Y2hcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBwdXNoXHJcbiAgICogQHJldHVybiB7IUNvbnRleHR9XHJcbiAgICogQGFwaSBwdWJsaWNcclxuICAgKi9cclxuXHJcbiAgcGFnZS5zaG93ID0gZnVuY3Rpb24ocGF0aCwgc3RhdGUsIGRpc3BhdGNoLCBwdXNoKSB7XHJcbiAgICB2YXIgY3R4ID0gbmV3IENvbnRleHQocGF0aCwgc3RhdGUpO1xyXG4gICAgcGFnZS5jdXJyZW50ID0gY3R4LnBhdGg7XHJcbiAgICBpZiAoZmFsc2UgIT09IGRpc3BhdGNoKSBwYWdlLmRpc3BhdGNoKGN0eCk7XHJcbiAgICBpZiAoZmFsc2UgIT09IGN0eC5oYW5kbGVkICYmIGZhbHNlICE9PSBwdXNoKSBjdHgucHVzaFN0YXRlKCk7XHJcbiAgICByZXR1cm4gY3R4O1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEdvZXMgYmFjayBpbiB0aGUgaGlzdG9yeVxyXG4gICAqIEJhY2sgc2hvdWxkIGFsd2F5cyBsZXQgdGhlIGN1cnJlbnQgcm91dGUgcHVzaCBzdGF0ZSBhbmQgdGhlbiBnbyBiYWNrLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBmYWxsYmFjayBwYXRoIHRvIGdvIGJhY2sgaWYgbm8gbW9yZSBoaXN0b3J5IGV4aXN0cywgaWYgdW5kZWZpbmVkIGRlZmF1bHRzIHRvIHBhZ2UuYmFzZVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gc3RhdGVcclxuICAgKiBAYXBpIHB1YmxpY1xyXG4gICAqL1xyXG5cclxuICBwYWdlLmJhY2sgPSBmdW5jdGlvbihwYXRoLCBzdGF0ZSkge1xyXG4gICAgaWYgKHBhZ2UubGVuID4gMCkge1xyXG4gICAgICAvLyB0aGlzIG1heSBuZWVkIG1vcmUgdGVzdGluZyB0byBzZWUgaWYgYWxsIGJyb3dzZXJzXHJcbiAgICAgIC8vIHdhaXQgZm9yIHRoZSBuZXh0IHRpY2sgdG8gZ28gYmFjayBpbiBoaXN0b3J5XHJcbiAgICAgIGhpc3RvcnkuYmFjaygpO1xyXG4gICAgICBwYWdlLmxlbi0tO1xyXG4gICAgfSBlbHNlIGlmIChwYXRoKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcGFnZS5zaG93KHBhdGgsIHN0YXRlKTtcclxuICAgICAgfSk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBwYWdlLnNob3coYmFzZSwgc3RhdGUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXIgcm91dGUgdG8gcmVkaXJlY3QgZnJvbSBvbmUgcGF0aCB0byBvdGhlclxyXG4gICAqIG9yIGp1c3QgcmVkaXJlY3QgdG8gYW5vdGhlciByb3V0ZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZyb20gLSBpZiBwYXJhbSAndG8nIGlzIHVuZGVmaW5lZCByZWRpcmVjdHMgdG8gJ2Zyb20nXHJcbiAgICogQHBhcmFtIHtzdHJpbmc9fSB0b1xyXG4gICAqIEBhcGkgcHVibGljXHJcbiAgICovXHJcbiAgcGFnZS5yZWRpcmVjdCA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XHJcbiAgICAvLyBEZWZpbmUgcm91dGUgZnJvbSBhIHBhdGggdG8gYW5vdGhlclxyXG4gICAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgZnJvbSAmJiAnc3RyaW5nJyA9PT0gdHlwZW9mIHRvKSB7XHJcbiAgICAgIHBhZ2UoZnJvbSwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBwYWdlLnJlcGxhY2UoLyoqIEB0eXBlIHshc3RyaW5nfSAqLyAodG8pKTtcclxuICAgICAgICB9LCAwKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2FpdCBmb3IgdGhlIHB1c2ggc3RhdGUgYW5kIHJlcGxhY2UgaXQgd2l0aCBhbm90aGVyXHJcbiAgICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBmcm9tICYmICd1bmRlZmluZWQnID09PSB0eXBlb2YgdG8pIHtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBwYWdlLnJlcGxhY2UoZnJvbSk7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlcGxhY2UgYHBhdGhgIHdpdGggb3B0aW9uYWwgYHN0YXRlYCBvYmplY3QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gc3RhdGVcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBpbml0XHJcbiAgICogQHBhcmFtIHtib29sZWFuPX0gZGlzcGF0Y2hcclxuICAgKiBAcmV0dXJuIHshQ29udGV4dH1cclxuICAgKiBAYXBpIHB1YmxpY1xyXG4gICAqL1xyXG5cclxuXHJcbiAgcGFnZS5yZXBsYWNlID0gZnVuY3Rpb24ocGF0aCwgc3RhdGUsIGluaXQsIGRpc3BhdGNoKSB7XHJcbiAgICB2YXIgY3R4ID0gbmV3IENvbnRleHQocGF0aCwgc3RhdGUpO1xyXG4gICAgcGFnZS5jdXJyZW50ID0gY3R4LnBhdGg7XHJcbiAgICBjdHguaW5pdCA9IGluaXQ7XHJcbiAgICBjdHguc2F2ZSgpOyAvLyBzYXZlIGJlZm9yZSBkaXNwYXRjaGluZywgd2hpY2ggbWF5IHJlZGlyZWN0XHJcbiAgICBpZiAoZmFsc2UgIT09IGRpc3BhdGNoKSBwYWdlLmRpc3BhdGNoKGN0eCk7XHJcbiAgICByZXR1cm4gY3R4O1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc3BhdGNoIHRoZSBnaXZlbiBgY3R4YC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Q29udGV4dH0gY3R4XHJcbiAgICogQGFwaSBwcml2YXRlXHJcbiAgICovXHJcbiAgcGFnZS5kaXNwYXRjaCA9IGZ1bmN0aW9uKGN0eCkge1xyXG4gICAgdmFyIHByZXYgPSBwcmV2Q29udGV4dCxcclxuICAgICAgaSA9IDAsXHJcbiAgICAgIGogPSAwO1xyXG5cclxuICAgIHByZXZDb250ZXh0ID0gY3R4O1xyXG5cclxuICAgIGZ1bmN0aW9uIG5leHRFeGl0KCkge1xyXG4gICAgICB2YXIgZm4gPSBwYWdlLmV4aXRzW2orK107XHJcbiAgICAgIGlmICghZm4pIHJldHVybiBuZXh0RW50ZXIoKTtcclxuICAgICAgZm4ocHJldiwgbmV4dEV4aXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG5leHRFbnRlcigpIHtcclxuICAgICAgdmFyIGZuID0gcGFnZS5jYWxsYmFja3NbaSsrXTtcclxuXHJcbiAgICAgIGlmIChjdHgucGF0aCAhPT0gcGFnZS5jdXJyZW50KSB7XHJcbiAgICAgICAgY3R4LmhhbmRsZWQgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFmbikgcmV0dXJuIHVuaGFuZGxlZChjdHgpO1xyXG4gICAgICBmbihjdHgsIG5leHRFbnRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByZXYpIHtcclxuICAgICAgbmV4dEV4aXQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5leHRFbnRlcigpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuaGFuZGxlZCBgY3R4YC4gV2hlbiBpdCdzIG5vdCB0aGUgaW5pdGlhbFxyXG4gICAqIHBvcHN0YXRlIHRoZW4gcmVkaXJlY3QuIElmIHlvdSB3aXNoIHRvIGhhbmRsZVxyXG4gICAqIDQwNHMgb24geW91ciBvd24gdXNlIGBwYWdlKCcqJywgY2FsbGJhY2spYC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Q29udGV4dH0gY3R4XHJcbiAgICogQGFwaSBwcml2YXRlXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gdW5oYW5kbGVkKGN0eCkge1xyXG4gICAgaWYgKGN0eC5oYW5kbGVkKSByZXR1cm47XHJcbiAgICB2YXIgY3VycmVudDtcclxuXHJcbiAgICBpZiAoaGFzaGJhbmcpIHtcclxuICAgICAgY3VycmVudCA9IGJhc2UgKyBsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMhJywgJycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY3VycmVudCA9IGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjdXJyZW50ID09PSBjdHguY2Fub25pY2FsUGF0aCkgcmV0dXJuO1xyXG4gICAgcGFnZS5zdG9wKCk7XHJcbiAgICBjdHguaGFuZGxlZCA9IGZhbHNlO1xyXG4gICAgbG9jYXRpb24uaHJlZiA9IGN0eC5jYW5vbmljYWxQYXRoO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXIgYW4gZXhpdCByb3V0ZSBvbiBgcGF0aGAgd2l0aFxyXG4gICAqIGNhbGxiYWNrIGBmbigpYCwgd2hpY2ggd2lsbCBiZSBjYWxsZWRcclxuICAgKiBvbiB0aGUgcHJldmlvdXMgY29udGV4dCB3aGVuIGEgbmV3XHJcbiAgICogcGFnZSBpcyB2aXNpdGVkLlxyXG4gICAqL1xyXG4gIHBhZ2UuZXhpdCA9IGZ1bmN0aW9uKHBhdGgsIGZuKSB7XHJcbiAgICBpZiAodHlwZW9mIHBhdGggPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIHBhZ2UuZXhpdCgnKicsIHBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciByb3V0ZSA9IG5ldyBSb3V0ZShwYXRoKTtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgIHBhZ2UuZXhpdHMucHVzaChyb3V0ZS5taWRkbGV3YXJlKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBVUkwgZW5jb2RpbmcgZnJvbSB0aGUgZ2l2ZW4gYHN0cmAuXHJcbiAgICogQWNjb21tb2RhdGVzIHdoaXRlc3BhY2UgaW4gYm90aCB4LXd3dy1mb3JtLXVybGVuY29kZWRcclxuICAgKiBhbmQgcmVndWxhciBwZXJjZW50LWVuY29kZWQgZm9ybS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWwgLSBVUkwgY29tcG9uZW50IHRvIGRlY29kZVxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIGRlY29kZVVSTEVuY29kZWRVUklDb21wb25lbnQodmFsKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbCAhPT0gJ3N0cmluZycpIHsgcmV0dXJuIHZhbDsgfVxyXG4gICAgcmV0dXJuIGRlY29kZVVSTENvbXBvbmVudHMgPyBkZWNvZGVVUklDb21wb25lbnQodmFsLnJlcGxhY2UoL1xcKy9nLCAnICcpKSA6IHZhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgYSBuZXcgXCJyZXF1ZXN0XCIgYENvbnRleHRgXHJcbiAgICogd2l0aCB0aGUgZ2l2ZW4gYHBhdGhgIGFuZCBvcHRpb25hbCBpbml0aWFsIGBzdGF0ZWAuXHJcbiAgICpcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gc3RhdGVcclxuICAgKiBAYXBpIHB1YmxpY1xyXG4gICAqL1xyXG5cclxuICBmdW5jdGlvbiBDb250ZXh0KHBhdGgsIHN0YXRlKSB7XHJcbiAgICBpZiAoJy8nID09PSBwYXRoWzBdICYmIDAgIT09IHBhdGguaW5kZXhPZihiYXNlKSkgcGF0aCA9IGJhc2UgKyAoaGFzaGJhbmcgPyAnIyEnIDogJycpICsgcGF0aDtcclxuICAgIHZhciBpID0gcGF0aC5pbmRleE9mKCc/Jyk7XHJcblxyXG4gICAgdGhpcy5jYW5vbmljYWxQYXRoID0gcGF0aDtcclxuICAgIHRoaXMucGF0aCA9IHBhdGgucmVwbGFjZShiYXNlLCAnJykgfHwgJy8nO1xyXG4gICAgaWYgKGhhc2hiYW5nKSB0aGlzLnBhdGggPSB0aGlzLnBhdGgucmVwbGFjZSgnIyEnLCAnJykgfHwgJy8nO1xyXG5cclxuICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC50aXRsZTtcclxuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZSB8fCB7fTtcclxuICAgIHRoaXMuc3RhdGUucGF0aCA9IHBhdGg7XHJcbiAgICB0aGlzLnF1ZXJ5c3RyaW5nID0gfmkgPyBkZWNvZGVVUkxFbmNvZGVkVVJJQ29tcG9uZW50KHBhdGguc2xpY2UoaSArIDEpKSA6ICcnO1xyXG4gICAgdGhpcy5wYXRobmFtZSA9IGRlY29kZVVSTEVuY29kZWRVUklDb21wb25lbnQofmkgPyBwYXRoLnNsaWNlKDAsIGkpIDogcGF0aCk7XHJcbiAgICB0aGlzLnBhcmFtcyA9IHt9O1xyXG5cclxuICAgIC8vIGZyYWdtZW50XHJcbiAgICB0aGlzLmhhc2ggPSAnJztcclxuICAgIGlmICghaGFzaGJhbmcpIHtcclxuICAgICAgaWYgKCF+dGhpcy5wYXRoLmluZGV4T2YoJyMnKSkgcmV0dXJuO1xyXG4gICAgICB2YXIgcGFydHMgPSB0aGlzLnBhdGguc3BsaXQoJyMnKTtcclxuICAgICAgdGhpcy5wYXRoID0gcGFydHNbMF07XHJcbiAgICAgIHRoaXMuaGFzaCA9IGRlY29kZVVSTEVuY29kZWRVUklDb21wb25lbnQocGFydHNbMV0pIHx8ICcnO1xyXG4gICAgICB0aGlzLnF1ZXJ5c3RyaW5nID0gdGhpcy5xdWVyeXN0cmluZy5zcGxpdCgnIycpWzBdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhwb3NlIGBDb250ZXh0YC5cclxuICAgKi9cclxuXHJcbiAgcGFnZS5Db250ZXh0ID0gQ29udGV4dDtcclxuXHJcbiAgLyoqXHJcbiAgICogUHVzaCBzdGF0ZS5cclxuICAgKlxyXG4gICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAqL1xyXG5cclxuICBDb250ZXh0LnByb3RvdHlwZS5wdXNoU3RhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHBhZ2UubGVuKys7XHJcbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSh0aGlzLnN0YXRlLCB0aGlzLnRpdGxlLCBoYXNoYmFuZyAmJiB0aGlzLnBhdGggIT09ICcvJyA/ICcjIScgKyB0aGlzLnBhdGggOiB0aGlzLmNhbm9uaWNhbFBhdGgpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFNhdmUgdGhlIGNvbnRleHQgc3RhdGUuXHJcbiAgICpcclxuICAgKiBAYXBpIHB1YmxpY1xyXG4gICAqL1xyXG5cclxuICBDb250ZXh0LnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7XHJcbiAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZSh0aGlzLnN0YXRlLCB0aGlzLnRpdGxlLCBoYXNoYmFuZyAmJiB0aGlzLnBhdGggIT09ICcvJyA/ICcjIScgKyB0aGlzLnBhdGggOiB0aGlzLmNhbm9uaWNhbFBhdGgpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgYFJvdXRlYCB3aXRoIHRoZSBnaXZlbiBIVFRQIGBwYXRoYCxcclxuICAgKiBhbmQgYW4gYXJyYXkgb2YgYGNhbGxiYWNrc2AgYW5kIGBvcHRpb25zYC5cclxuICAgKlxyXG4gICAqIE9wdGlvbnM6XHJcbiAgICpcclxuICAgKiAgIC0gYHNlbnNpdGl2ZWAgICAgZW5hYmxlIGNhc2Utc2Vuc2l0aXZlIHJvdXRlc1xyXG4gICAqICAgLSBgc3RyaWN0YCAgICAgICBlbmFibGUgc3RyaWN0IG1hdGNoaW5nIGZvciB0cmFpbGluZyBzbGFzaGVzXHJcbiAgICpcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAqL1xyXG5cclxuICBmdW5jdGlvbiBSb3V0ZShwYXRoLCBvcHRpb25zKSB7XHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgIHRoaXMucGF0aCA9IChwYXRoID09PSAnKicpID8gJyguKiknIDogcGF0aDtcclxuICAgIHRoaXMubWV0aG9kID0gJ0dFVCc7XHJcbiAgICB0aGlzLnJlZ2V4cCA9IHBhdGh0b1JlZ2V4cCh0aGlzLnBhdGgsXHJcbiAgICAgIHRoaXMua2V5cyA9IFtdLFxyXG4gICAgICBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4cG9zZSBgUm91dGVgLlxyXG4gICAqL1xyXG5cclxuICBwYWdlLlJvdXRlID0gUm91dGU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiByb3V0ZSBtaWRkbGV3YXJlIHdpdGhcclxuICAgKiB0aGUgZ2l2ZW4gY2FsbGJhY2sgYGZuKClgLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICAgKiBAYXBpIHB1YmxpY1xyXG4gICAqL1xyXG5cclxuICBSb3V0ZS5wcm90b3R5cGUubWlkZGxld2FyZSA9IGZ1bmN0aW9uKGZuKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oY3R4LCBuZXh0KSB7XHJcbiAgICAgIGlmIChzZWxmLm1hdGNoKGN0eC5wYXRoLCBjdHgucGFyYW1zKSkgcmV0dXJuIGZuKGN0eCwgbmV4dCk7XHJcbiAgICAgIG5leHQoKTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgdGhpcyByb3V0ZSBtYXRjaGVzIGBwYXRoYCwgaWYgc29cclxuICAgKiBwb3B1bGF0ZSBgcGFyYW1zYC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICogQGFwaSBwcml2YXRlXHJcbiAgICovXHJcblxyXG4gIFJvdXRlLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uKHBhdGgsIHBhcmFtcykge1xyXG4gICAgdmFyIGtleXMgPSB0aGlzLmtleXMsXHJcbiAgICAgIHFzSW5kZXggPSBwYXRoLmluZGV4T2YoJz8nKSxcclxuICAgICAgcGF0aG5hbWUgPSB+cXNJbmRleCA/IHBhdGguc2xpY2UoMCwgcXNJbmRleCkgOiBwYXRoLFxyXG4gICAgICBtID0gdGhpcy5yZWdleHAuZXhlYyhkZWNvZGVVUklDb21wb25lbnQocGF0aG5hbWUpKTtcclxuXHJcbiAgICBpZiAoIW0pIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMSwgbGVuID0gbS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICB2YXIga2V5ID0ga2V5c1tpIC0gMV07XHJcbiAgICAgIHZhciB2YWwgPSBkZWNvZGVVUkxFbmNvZGVkVVJJQ29tcG9uZW50KG1baV0pO1xyXG4gICAgICBpZiAodmFsICE9PSB1bmRlZmluZWQgfHwgIShoYXNPd25Qcm9wZXJ0eS5jYWxsKHBhcmFtcywga2V5Lm5hbWUpKSkge1xyXG4gICAgICAgIHBhcmFtc1trZXkubmFtZV0gPSB2YWw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9O1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIFwicG9wdWxhdGVcIiBldmVudHMuXHJcbiAgICovXHJcblxyXG4gIHZhciBvbnBvcHN0YXRlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBsb2FkZWQgPSBmYWxzZTtcclxuICAgIGlmICgndW5kZWZpbmVkJyA9PT0gdHlwZW9mIHdpbmRvdykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xyXG4gICAgICBsb2FkZWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9LCAwKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gb25wb3BzdGF0ZShlKSB7XHJcbiAgICAgIGlmICghbG9hZGVkKSByZXR1cm47XHJcbiAgICAgIGlmIChlLnN0YXRlKSB7XHJcbiAgICAgICAgdmFyIHBhdGggPSBlLnN0YXRlLnBhdGg7XHJcbiAgICAgICAgcGFnZS5yZXBsYWNlKHBhdGgsIGUuc3RhdGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBhZ2Uuc2hvdyhsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLmhhc2gsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSkoKTtcclxuICAvKipcclxuICAgKiBIYW5kbGUgXCJjbGlja1wiIGV2ZW50cy5cclxuICAgKi9cclxuXHJcbiAgZnVuY3Rpb24gb25jbGljayhlKSB7XHJcblxyXG4gICAgaWYgKDEgIT09IHdoaWNoKGUpKSByZXR1cm47XHJcblxyXG4gICAgaWYgKGUubWV0YUtleSB8fCBlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSkgcmV0dXJuO1xyXG4gICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCkgcmV0dXJuO1xyXG5cclxuXHJcblxyXG4gICAgLy8gZW5zdXJlIGxpbmtcclxuICAgIC8vIHVzZSBzaGFkb3cgZG9tIHdoZW4gYXZhaWxhYmxlXHJcbiAgICB2YXIgZWwgPSBlLnBhdGggPyBlLnBhdGhbMF0gOiBlLnRhcmdldDtcclxuICAgIHdoaWxlIChlbCAmJiAnQScgIT09IGVsLm5vZGVOYW1lKSBlbCA9IGVsLnBhcmVudE5vZGU7XHJcbiAgICBpZiAoIWVsIHx8ICdBJyAhPT0gZWwubm9kZU5hbWUpIHJldHVybjtcclxuXHJcblxyXG5cclxuICAgIC8vIElnbm9yZSBpZiB0YWcgaGFzXHJcbiAgICAvLyAxLiBcImRvd25sb2FkXCIgYXR0cmlidXRlXHJcbiAgICAvLyAyLiByZWw9XCJleHRlcm5hbFwiIGF0dHJpYnV0ZVxyXG4gICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnZG93bmxvYWQnKSB8fCBlbC5nZXRBdHRyaWJ1dGUoJ3JlbCcpID09PSAnZXh0ZXJuYWwnKSByZXR1cm47XHJcblxyXG4gICAgLy8gZW5zdXJlIG5vbi1oYXNoIGZvciB0aGUgc2FtZSBwYXRoXHJcbiAgICB2YXIgbGluayA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG4gICAgaWYgKCFoYXNoYmFuZyAmJiBlbC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWUgJiYgKGVsLmhhc2ggfHwgJyMnID09PSBsaW5rKSkgcmV0dXJuO1xyXG5cclxuXHJcblxyXG4gICAgLy8gQ2hlY2sgZm9yIG1haWx0bzogaW4gdGhlIGhyZWZcclxuICAgIGlmIChsaW5rICYmIGxpbmsuaW5kZXhPZignbWFpbHRvOicpID4gLTEpIHJldHVybjtcclxuXHJcbiAgICAvLyBjaGVjayB0YXJnZXRcclxuICAgIGlmIChlbC50YXJnZXQpIHJldHVybjtcclxuXHJcbiAgICAvLyB4LW9yaWdpblxyXG4gICAgaWYgKCFzYW1lT3JpZ2luKGVsLmhyZWYpKSByZXR1cm47XHJcblxyXG5cclxuXHJcbiAgICAvLyByZWJ1aWxkIHBhdGhcclxuICAgIHZhciBwYXRoID0gZWwucGF0aG5hbWUgKyBlbC5zZWFyY2ggKyAoZWwuaGFzaCB8fCAnJyk7XHJcblxyXG4gICAgLy8gc3RyaXAgbGVhZGluZyBcIi9bZHJpdmUgbGV0dGVyXTpcIiBvbiBOVy5qcyBvbiBXaW5kb3dzXHJcbiAgICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHBhdGgubWF0Y2goL15cXC9bYS16QS1aXTpcXC8vKSkge1xyXG4gICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9eXFwvW2EtekEtWl06XFwvLywgJy8nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzYW1lIHBhZ2VcclxuICAgIHZhciBvcmlnID0gcGF0aDtcclxuXHJcbiAgICBpZiAocGF0aC5pbmRleE9mKGJhc2UpID09PSAwKSB7XHJcbiAgICAgIHBhdGggPSBwYXRoLnN1YnN0cihiYXNlLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGhhc2hiYW5nKSBwYXRoID0gcGF0aC5yZXBsYWNlKCcjIScsICcnKTtcclxuXHJcbiAgICBpZiAoYmFzZSAmJiBvcmlnID09PSBwYXRoKSByZXR1cm47XHJcblxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgcGFnZS5zaG93KG9yaWcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgYnV0dG9uLlxyXG4gICAqL1xyXG5cclxuICBmdW5jdGlvbiB3aGljaChlKSB7XHJcbiAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICByZXR1cm4gbnVsbCA9PT0gZS53aGljaCA/IGUuYnV0dG9uIDogZS53aGljaDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGBocmVmYCBpcyB0aGUgc2FtZSBvcmlnaW4uXHJcbiAgICovXHJcblxyXG4gIGZ1bmN0aW9uIHNhbWVPcmlnaW4oaHJlZikge1xyXG4gICAgdmFyIG9yaWdpbiA9IGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3RuYW1lO1xyXG4gICAgaWYgKGxvY2F0aW9uLnBvcnQpIG9yaWdpbiArPSAnOicgKyBsb2NhdGlvbi5wb3J0O1xyXG4gICAgcmV0dXJuIChocmVmICYmICgwID09PSBocmVmLmluZGV4T2Yob3JpZ2luKSkpO1xyXG4gIH1cclxuXHJcbiAgcGFnZS5zYW1lT3JpZ2luID0gc2FtZU9yaWdpbjtcclxuXHJcbn0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpKVxyXG59LHtcIl9wcm9jZXNzXCI6MixcInBhdGgtdG8tcmVnZXhwXCI6M31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcclxuXHJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcclxuXHJcbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXHJcbiAgICAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xyXG4gICAgdmFyIGNhbk11dGF0aW9uT2JzZXJ2ZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgJiYgd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXI7XHJcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXHJcbiAgICAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJcclxuICAgIDtcclxuXHJcbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHF1ZXVlID0gW107XHJcblxyXG4gICAgaWYgKGNhbk11dGF0aW9uT2JzZXJ2ZXIpIHtcclxuICAgICAgICB2YXIgaGlkZGVuRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBxdWV1ZUxpc3QgPSBxdWV1ZS5zbGljZSgpO1xyXG4gICAgICAgICAgICBxdWV1ZS5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICBxdWV1ZUxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGhpZGRlbkRpdiwgeyBhdHRyaWJ1dGVzOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcclxuICAgICAgICAgICAgaWYgKCFxdWV1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGhpZGRlbkRpdi5zZXRBdHRyaWJ1dGUoJ3llcycsICdubycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNhblBvc3QpIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xyXG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcclxuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0cnVlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XHJcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xyXG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xyXG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xyXG5wcm9jZXNzLmVudiA9IHt9O1xyXG5wcm9jZXNzLmFyZ3YgPSBbXTtcclxuXHJcbmZ1bmN0aW9uIG5vb3AoKSB7fVxyXG5cclxucHJvY2Vzcy5vbiA9IG5vb3A7XHJcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xyXG5wcm9jZXNzLm9uY2UgPSBub29wO1xyXG5wcm9jZXNzLm9mZiA9IG5vb3A7XHJcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xyXG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XHJcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XHJcblxyXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xyXG59O1xyXG5cclxuLy8gVE9ETyhzaHR5bG1hbilcclxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcclxucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XHJcbn07XHJcblxyXG59LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxudmFyIGlzYXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcclxuXHJcbi8qKlxyXG4gKiBFeHBvc2UgYHBhdGhUb1JlZ2V4cGAuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGhUb1JlZ2V4cFxyXG5tb2R1bGUuZXhwb3J0cy5wYXJzZSA9IHBhcnNlXHJcbm1vZHVsZS5leHBvcnRzLmNvbXBpbGUgPSBjb21waWxlXHJcbm1vZHVsZS5leHBvcnRzLnRva2Vuc1RvRnVuY3Rpb24gPSB0b2tlbnNUb0Z1bmN0aW9uXHJcbm1vZHVsZS5leHBvcnRzLnRva2Vuc1RvUmVnRXhwID0gdG9rZW5zVG9SZWdFeHBcclxuXHJcbi8qKlxyXG4gKiBUaGUgbWFpbiBwYXRoIG1hdGNoaW5nIHJlZ2V4cCB1dGlsaXR5LlxyXG4gKlxyXG4gKiBAdHlwZSB7UmVnRXhwfVxyXG4gKi9cclxudmFyIFBBVEhfUkVHRVhQID0gbmV3IFJlZ0V4cChbXHJcbiAgLy8gTWF0Y2ggZXNjYXBlZCBjaGFyYWN0ZXJzIHRoYXQgd291bGQgb3RoZXJ3aXNlIGFwcGVhciBpbiBmdXR1cmUgbWF0Y2hlcy5cclxuICAvLyBUaGlzIGFsbG93cyB0aGUgdXNlciB0byBlc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIHRoYXQgd29uJ3QgdHJhbnNmb3JtLlxyXG4gICcoXFxcXFxcXFwuKScsXHJcbiAgLy8gTWF0Y2ggRXhwcmVzcy1zdHlsZSBwYXJhbWV0ZXJzIGFuZCB1bi1uYW1lZCBwYXJhbWV0ZXJzIHdpdGggYSBwcmVmaXhcclxuICAvLyBhbmQgb3B0aW9uYWwgc3VmZml4ZXMuIE1hdGNoZXMgYXBwZWFyIGFzOlxyXG4gIC8vXHJcbiAgLy8gXCIvOnRlc3QoXFxcXGQrKT9cIiA9PiBbXCIvXCIsIFwidGVzdFwiLCBcIlxcZCtcIiwgdW5kZWZpbmVkLCBcIj9cIiwgdW5kZWZpbmVkXVxyXG4gIC8vIFwiL3JvdXRlKFxcXFxkKylcIiAgPT4gW3VuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiXFxkK1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1cclxuICAvLyBcIi8qXCIgICAgICAgICAgICA9PiBbXCIvXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgXCIqXCJdXHJcbiAgJyhbXFxcXC8uXSk/KD86KD86XFxcXDooXFxcXHcrKSg/OlxcXFwoKCg/OlxcXFxcXFxcLnxbXigpXSkrKVxcXFwpKT98XFxcXCgoKD86XFxcXFxcXFwufFteKCldKSspXFxcXCkpKFsrKj9dKT98KFxcXFwqKSknXHJcbl0uam9pbignfCcpLCAnZycpXHJcblxyXG4vKipcclxuICogUGFyc2UgYSBzdHJpbmcgZm9yIHRoZSByYXcgdG9rZW5zLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICovXHJcbmZ1bmN0aW9uIHBhcnNlIChzdHIpIHtcclxuICB2YXIgdG9rZW5zID0gW11cclxuICB2YXIga2V5ID0gMFxyXG4gIHZhciBpbmRleCA9IDBcclxuICB2YXIgcGF0aCA9ICcnXHJcbiAgdmFyIHJlc1xyXG5cclxuICB3aGlsZSAoKHJlcyA9IFBBVEhfUkVHRVhQLmV4ZWMoc3RyKSkgIT0gbnVsbCkge1xyXG4gICAgdmFyIG0gPSByZXNbMF1cclxuICAgIHZhciBlc2NhcGVkID0gcmVzWzFdXHJcbiAgICB2YXIgb2Zmc2V0ID0gcmVzLmluZGV4XHJcbiAgICBwYXRoICs9IHN0ci5zbGljZShpbmRleCwgb2Zmc2V0KVxyXG4gICAgaW5kZXggPSBvZmZzZXQgKyBtLmxlbmd0aFxyXG5cclxuICAgIC8vIElnbm9yZSBhbHJlYWR5IGVzY2FwZWQgc2VxdWVuY2VzLlxyXG4gICAgaWYgKGVzY2FwZWQpIHtcclxuICAgICAgcGF0aCArPSBlc2NhcGVkWzFdXHJcbiAgICAgIGNvbnRpbnVlXHJcbiAgICB9XHJcblxyXG4gICAgLy8gUHVzaCB0aGUgY3VycmVudCBwYXRoIG9udG8gdGhlIHRva2Vucy5cclxuICAgIGlmIChwYXRoKSB7XHJcbiAgICAgIHRva2Vucy5wdXNoKHBhdGgpXHJcbiAgICAgIHBhdGggPSAnJ1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBwcmVmaXggPSByZXNbMl1cclxuICAgIHZhciBuYW1lID0gcmVzWzNdXHJcbiAgICB2YXIgY2FwdHVyZSA9IHJlc1s0XVxyXG4gICAgdmFyIGdyb3VwID0gcmVzWzVdXHJcbiAgICB2YXIgc3VmZml4ID0gcmVzWzZdXHJcbiAgICB2YXIgYXN0ZXJpc2sgPSByZXNbN11cclxuXHJcbiAgICB2YXIgcmVwZWF0ID0gc3VmZml4ID09PSAnKycgfHwgc3VmZml4ID09PSAnKidcclxuICAgIHZhciBvcHRpb25hbCA9IHN1ZmZpeCA9PT0gJz8nIHx8IHN1ZmZpeCA9PT0gJyonXHJcbiAgICB2YXIgZGVsaW1pdGVyID0gcHJlZml4IHx8ICcvJ1xyXG4gICAgdmFyIHBhdHRlcm4gPSBjYXB0dXJlIHx8IGdyb3VwIHx8IChhc3RlcmlzayA/ICcuKicgOiAnW14nICsgZGVsaW1pdGVyICsgJ10rPycpXHJcblxyXG4gICAgdG9rZW5zLnB1c2goe1xyXG4gICAgICBuYW1lOiBuYW1lIHx8IGtleSsrLFxyXG4gICAgICBwcmVmaXg6IHByZWZpeCB8fCAnJyxcclxuICAgICAgZGVsaW1pdGVyOiBkZWxpbWl0ZXIsXHJcbiAgICAgIG9wdGlvbmFsOiBvcHRpb25hbCxcclxuICAgICAgcmVwZWF0OiByZXBlYXQsXHJcbiAgICAgIHBhdHRlcm46IGVzY2FwZUdyb3VwKHBhdHRlcm4pXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLy8gTWF0Y2ggYW55IGNoYXJhY3RlcnMgc3RpbGwgcmVtYWluaW5nLlxyXG4gIGlmIChpbmRleCA8IHN0ci5sZW5ndGgpIHtcclxuICAgIHBhdGggKz0gc3RyLnN1YnN0cihpbmRleClcclxuICB9XHJcblxyXG4gIC8vIElmIHRoZSBwYXRoIGV4aXN0cywgcHVzaCBpdCBvbnRvIHRoZSBlbmQuXHJcbiAgaWYgKHBhdGgpIHtcclxuICAgIHRva2Vucy5wdXNoKHBhdGgpXHJcbiAgfVxyXG5cclxuICByZXR1cm4gdG9rZW5zXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21waWxlIGEgc3RyaW5nIHRvIGEgdGVtcGxhdGUgZnVuY3Rpb24gZm9yIHRoZSBwYXRoLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgc3RyXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gKi9cclxuZnVuY3Rpb24gY29tcGlsZSAoc3RyKSB7XHJcbiAgcmV0dXJuIHRva2Vuc1RvRnVuY3Rpb24ocGFyc2Uoc3RyKSlcclxufVxyXG5cclxuLyoqXHJcbiAqIEV4cG9zZSBhIG1ldGhvZCBmb3IgdHJhbnNmb3JtaW5nIHRva2VucyBpbnRvIHRoZSBwYXRoIGZ1bmN0aW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gdG9rZW5zVG9GdW5jdGlvbiAodG9rZW5zKSB7XHJcbiAgLy8gQ29tcGlsZSBhbGwgdGhlIHRva2VucyBpbnRvIHJlZ2V4cHMuXHJcbiAgdmFyIG1hdGNoZXMgPSBuZXcgQXJyYXkodG9rZW5zLmxlbmd0aClcclxuXHJcbiAgLy8gQ29tcGlsZSBhbGwgdGhlIHBhdHRlcm5zIGJlZm9yZSBjb21waWxhdGlvbi5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKHR5cGVvZiB0b2tlbnNbaV0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIG1hdGNoZXNbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRva2Vuc1tpXS5wYXR0ZXJuICsgJyQnKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmopIHtcclxuICAgIHZhciBwYXRoID0gJydcclxuICAgIHZhciBkYXRhID0gb2JqIHx8IHt9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldXHJcblxyXG4gICAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHBhdGggKz0gdG9rZW5cclxuXHJcbiAgICAgICAgY29udGludWVcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHZhbHVlID0gZGF0YVt0b2tlbi5uYW1lXVxyXG4gICAgICB2YXIgc2VnbWVudFxyXG5cclxuICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcclxuICAgICAgICBpZiAodG9rZW4ub3B0aW9uYWwpIHtcclxuICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gYmUgZGVmaW5lZCcpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNhcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICBpZiAoIXRva2VuLnJlcGVhdCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBub3QgcmVwZWF0LCBidXQgcmVjZWl2ZWQgXCInICsgdmFsdWUgKyAnXCInKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG5vdCBiZSBlbXB0eScpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbHVlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICBzZWdtZW50ID0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlW2pdKVxyXG5cclxuICAgICAgICAgIGlmICghbWF0Y2hlc1tpXS50ZXN0KHNlZ21lbnQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGFsbCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG1hdGNoIFwiJyArIHRva2VuLnBhdHRlcm4gKyAnXCIsIGJ1dCByZWNlaXZlZCBcIicgKyBzZWdtZW50ICsgJ1wiJylcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBwYXRoICs9IChqID09PSAwID8gdG9rZW4ucHJlZml4IDogdG9rZW4uZGVsaW1pdGVyKSArIHNlZ21lbnRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnRpbnVlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNlZ21lbnQgPSBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpXHJcblxyXG4gICAgICBpZiAoIW1hdGNoZXNbaV0udGVzdChzZWdtZW50KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbWF0Y2ggXCInICsgdG9rZW4ucGF0dGVybiArICdcIiwgYnV0IHJlY2VpdmVkIFwiJyArIHNlZ21lbnQgKyAnXCInKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBwYXRoICs9IHRva2VuLnByZWZpeCArIHNlZ21lbnRcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGF0aFxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEVzY2FwZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBzdHJpbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIGVzY2FwZVN0cmluZyAoc3RyKSB7XHJcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oWy4rKj89XiE6JHt9KClbXFxdfFxcL10pL2csICdcXFxcJDEnKVxyXG59XHJcblxyXG4vKipcclxuICogRXNjYXBlIHRoZSBjYXB0dXJpbmcgZ3JvdXAgYnkgZXNjYXBpbmcgc3BlY2lhbCBjaGFyYWN0ZXJzIGFuZCBtZWFuaW5nLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGdyb3VwXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIGVzY2FwZUdyb3VwIChncm91cCkge1xyXG4gIHJldHVybiBncm91cC5yZXBsYWNlKC8oWz0hOiRcXC8oKV0pL2csICdcXFxcJDEnKVxyXG59XHJcblxyXG4vKipcclxuICogQXR0YWNoIHRoZSBrZXlzIGFzIGEgcHJvcGVydHkgb2YgdGhlIHJlZ2V4cC5cclxuICpcclxuICogQHBhcmFtICB7UmVnRXhwfSByZVxyXG4gKiBAcGFyYW0gIHtBcnJheX0gIGtleXNcclxuICogQHJldHVybiB7UmVnRXhwfVxyXG4gKi9cclxuZnVuY3Rpb24gYXR0YWNoS2V5cyAocmUsIGtleXMpIHtcclxuICByZS5rZXlzID0ga2V5c1xyXG4gIHJldHVybiByZVxyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBmbGFncyBmb3IgYSByZWdleHAgZnJvbSB0aGUgb3B0aW9ucy5cclxuICpcclxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIGZsYWdzIChvcHRpb25zKSB7XHJcbiAgcmV0dXJuIG9wdGlvbnMuc2Vuc2l0aXZlID8gJycgOiAnaSdcclxufVxyXG5cclxuLyoqXHJcbiAqIFB1bGwgb3V0IGtleXMgZnJvbSBhIHJlZ2V4cC5cclxuICpcclxuICogQHBhcmFtICB7UmVnRXhwfSBwYXRoXHJcbiAqIEBwYXJhbSAge0FycmF5fSAga2V5c1xyXG4gKiBAcmV0dXJuIHtSZWdFeHB9XHJcbiAqL1xyXG5mdW5jdGlvbiByZWdleHBUb1JlZ2V4cCAocGF0aCwga2V5cykge1xyXG4gIC8vIFVzZSBhIG5lZ2F0aXZlIGxvb2thaGVhZCB0byBtYXRjaCBvbmx5IGNhcHR1cmluZyBncm91cHMuXHJcbiAgdmFyIGdyb3VwcyA9IHBhdGguc291cmNlLm1hdGNoKC9cXCgoPyFcXD8pL2cpXHJcblxyXG4gIGlmIChncm91cHMpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGtleXMucHVzaCh7XHJcbiAgICAgICAgbmFtZTogaSxcclxuICAgICAgICBwcmVmaXg6IG51bGwsXHJcbiAgICAgICAgZGVsaW1pdGVyOiBudWxsLFxyXG4gICAgICAgIG9wdGlvbmFsOiBmYWxzZSxcclxuICAgICAgICByZXBlYXQ6IGZhbHNlLFxyXG4gICAgICAgIHBhdHRlcm46IG51bGxcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBhdHRhY2hLZXlzKHBhdGgsIGtleXMpXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcmFuc2Zvcm0gYW4gYXJyYXkgaW50byBhIHJlZ2V4cC5cclxuICpcclxuICogQHBhcmFtICB7QXJyYXl9ICBwYXRoXHJcbiAqIEBwYXJhbSAge0FycmF5fSAga2V5c1xyXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnNcclxuICogQHJldHVybiB7UmVnRXhwfVxyXG4gKi9cclxuZnVuY3Rpb24gYXJyYXlUb1JlZ2V4cCAocGF0aCwga2V5cywgb3B0aW9ucykge1xyXG4gIHZhciBwYXJ0cyA9IFtdXHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xyXG4gICAgcGFydHMucHVzaChwYXRoVG9SZWdleHAocGF0aFtpXSwga2V5cywgb3B0aW9ucykuc291cmNlKVxyXG4gIH1cclxuXHJcbiAgdmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAoJyg/OicgKyBwYXJ0cy5qb2luKCd8JykgKyAnKScsIGZsYWdzKG9wdGlvbnMpKVxyXG5cclxuICByZXR1cm4gYXR0YWNoS2V5cyhyZWdleHAsIGtleXMpXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBwYXRoIHJlZ2V4cCBmcm9tIHN0cmluZyBpbnB1dC5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSBwYXRoXHJcbiAqIEBwYXJhbSAge0FycmF5fSAga2V5c1xyXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnNcclxuICogQHJldHVybiB7UmVnRXhwfVxyXG4gKi9cclxuZnVuY3Rpb24gc3RyaW5nVG9SZWdleHAgKHBhdGgsIGtleXMsIG9wdGlvbnMpIHtcclxuICB2YXIgdG9rZW5zID0gcGFyc2UocGF0aClcclxuICB2YXIgcmUgPSB0b2tlbnNUb1JlZ0V4cCh0b2tlbnMsIG9wdGlvbnMpXHJcblxyXG4gIC8vIEF0dGFjaCBrZXlzIGJhY2sgdG8gdGhlIHJlZ2V4cC5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKHR5cGVvZiB0b2tlbnNbaV0gIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGtleXMucHVzaCh0b2tlbnNbaV0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYXR0YWNoS2V5cyhyZSwga2V5cylcclxufVxyXG5cclxuLyoqXHJcbiAqIEV4cG9zZSBhIGZ1bmN0aW9uIGZvciB0YWtpbmcgdG9rZW5zIGFuZCByZXR1cm5pbmcgYSBSZWdFeHAuXHJcbiAqXHJcbiAqIEBwYXJhbSAge0FycmF5fSAgdG9rZW5zXHJcbiAqIEBwYXJhbSAge0FycmF5fSAga2V5c1xyXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnNcclxuICogQHJldHVybiB7UmVnRXhwfVxyXG4gKi9cclxuZnVuY3Rpb24gdG9rZW5zVG9SZWdFeHAgKHRva2Vucywgb3B0aW9ucykge1xyXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XHJcblxyXG4gIHZhciBzdHJpY3QgPSBvcHRpb25zLnN0cmljdFxyXG4gIHZhciBlbmQgPSBvcHRpb25zLmVuZCAhPT0gZmFsc2VcclxuICB2YXIgcm91dGUgPSAnJ1xyXG4gIHZhciBsYXN0VG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdXHJcbiAgdmFyIGVuZHNXaXRoU2xhc2ggPSB0eXBlb2YgbGFzdFRva2VuID09PSAnc3RyaW5nJyAmJiAvXFwvJC8udGVzdChsYXN0VG9rZW4pXHJcblxyXG4gIC8vIEl0ZXJhdGUgb3ZlciB0aGUgdG9rZW5zIGFuZCBjcmVhdGUgb3VyIHJlZ2V4cCBzdHJpbmcuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXVxyXG5cclxuICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJvdXRlICs9IGVzY2FwZVN0cmluZyh0b2tlbilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBwcmVmaXggPSBlc2NhcGVTdHJpbmcodG9rZW4ucHJlZml4KVxyXG4gICAgICB2YXIgY2FwdHVyZSA9IHRva2VuLnBhdHRlcm5cclxuXHJcbiAgICAgIGlmICh0b2tlbi5yZXBlYXQpIHtcclxuICAgICAgICBjYXB0dXJlICs9ICcoPzonICsgcHJlZml4ICsgY2FwdHVyZSArICcpKidcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XHJcbiAgICAgICAgaWYgKHByZWZpeCkge1xyXG4gICAgICAgICAgY2FwdHVyZSA9ICcoPzonICsgcHJlZml4ICsgJygnICsgY2FwdHVyZSArICcpKT8nXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNhcHR1cmUgPSAnKCcgKyBjYXB0dXJlICsgJyk/J1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjYXB0dXJlID0gcHJlZml4ICsgJygnICsgY2FwdHVyZSArICcpJ1xyXG4gICAgICB9XHJcblxyXG4gICAgICByb3V0ZSArPSBjYXB0dXJlXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBJbiBub24tc3RyaWN0IG1vZGUgd2UgYWxsb3cgYSBzbGFzaCBhdCB0aGUgZW5kIG9mIG1hdGNoLiBJZiB0aGUgcGF0aCB0b1xyXG4gIC8vIG1hdGNoIGFscmVhZHkgZW5kcyB3aXRoIGEgc2xhc2gsIHdlIHJlbW92ZSBpdCBmb3IgY29uc2lzdGVuY3kuIFRoZSBzbGFzaFxyXG4gIC8vIGlzIHZhbGlkIGF0IHRoZSBlbmQgb2YgYSBwYXRoIG1hdGNoLCBub3QgaW4gdGhlIG1pZGRsZS4gVGhpcyBpcyBpbXBvcnRhbnRcclxuICAvLyBpbiBub24tZW5kaW5nIG1vZGUsIHdoZXJlIFwiL3Rlc3QvXCIgc2hvdWxkbid0IG1hdGNoIFwiL3Rlc3QvL3JvdXRlXCIuXHJcbiAgaWYgKCFzdHJpY3QpIHtcclxuICAgIHJvdXRlID0gKGVuZHNXaXRoU2xhc2ggPyByb3V0ZS5zbGljZSgwLCAtMikgOiByb3V0ZSkgKyAnKD86XFxcXC8oPz0kKSk/J1xyXG4gIH1cclxuXHJcbiAgaWYgKGVuZCkge1xyXG4gICAgcm91dGUgKz0gJyQnXHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIEluIG5vbi1lbmRpbmcgbW9kZSwgd2UgbmVlZCB0aGUgY2FwdHVyaW5nIGdyb3VwcyB0byBtYXRjaCBhcyBtdWNoIGFzXHJcbiAgICAvLyBwb3NzaWJsZSBieSB1c2luZyBhIHBvc2l0aXZlIGxvb2thaGVhZCB0byB0aGUgZW5kIG9yIG5leHQgcGF0aCBzZWdtZW50LlxyXG4gICAgcm91dGUgKz0gc3RyaWN0ICYmIGVuZHNXaXRoU2xhc2ggPyAnJyA6ICcoPz1cXFxcL3wkKSdcclxuICB9XHJcblxyXG4gIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHJvdXRlLCBmbGFncyhvcHRpb25zKSlcclxufVxyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZSB0aGUgZ2l2ZW4gcGF0aCBzdHJpbmcsIHJldHVybmluZyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cclxuICpcclxuICogQW4gZW1wdHkgYXJyYXkgY2FuIGJlIHBhc3NlZCBpbiBmb3IgdGhlIGtleXMsIHdoaWNoIHdpbGwgaG9sZCB0aGVcclxuICogcGxhY2Vob2xkZXIga2V5IGRlc2NyaXB0aW9ucy4gRm9yIGV4YW1wbGUsIHVzaW5nIGAvdXNlci86aWRgLCBga2V5c2Agd2lsbFxyXG4gKiBjb250YWluIGBbeyBuYW1lOiAnaWQnLCBkZWxpbWl0ZXI6ICcvJywgb3B0aW9uYWw6IGZhbHNlLCByZXBlYXQ6IGZhbHNlIH1dYC5cclxuICpcclxuICogQHBhcmFtICB7KFN0cmluZ3xSZWdFeHB8QXJyYXkpfSBwYXRoXHJcbiAqIEBwYXJhbSAge0FycmF5fSAgICAgICAgICAgICAgICAgW2tleXNdXHJcbiAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICAgICAgICAgW29wdGlvbnNdXHJcbiAqIEByZXR1cm4ge1JlZ0V4cH1cclxuICovXHJcbmZ1bmN0aW9uIHBhdGhUb1JlZ2V4cCAocGF0aCwga2V5cywgb3B0aW9ucykge1xyXG4gIGtleXMgPSBrZXlzIHx8IFtdXHJcblxyXG4gIGlmICghaXNhcnJheShrZXlzKSkge1xyXG4gICAgb3B0aW9ucyA9IGtleXNcclxuICAgIGtleXMgPSBbXVxyXG4gIH0gZWxzZSBpZiAoIW9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSB7fVxyXG4gIH1cclxuXHJcbiAgaWYgKHBhdGggaW5zdGFuY2VvZiBSZWdFeHApIHtcclxuICAgIHJldHVybiByZWdleHBUb1JlZ2V4cChwYXRoLCBrZXlzLCBvcHRpb25zKVxyXG4gIH1cclxuXHJcbiAgaWYgKGlzYXJyYXkocGF0aCkpIHtcclxuICAgIHJldHVybiBhcnJheVRvUmVnZXhwKHBhdGgsIGtleXMsIG9wdGlvbnMpXHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3RyaW5nVG9SZWdleHAocGF0aCwga2V5cywgb3B0aW9ucylcclxufVxyXG5cclxufSx7XCJpc2FycmF5XCI6NH1dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xyXG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xyXG59O1xyXG5cclxufSx7fV19LHt9LFsxXSkoMSlcclxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvbGliL3BhZ2UvcGFnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=