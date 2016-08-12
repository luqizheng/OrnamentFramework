/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2)

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(3)
	var page = __webpack_require__(4);
	
	page('/', contentLoad);
	page('/Membership/User/Index', contentLoad);
	page('/Membership/User', contentLoad);
	page('/membership/user/edit/:id', contentLoad);
	page('/Membership/Role', contentLoad);
	page();
	
	function contentLoad(ctx) {
	
	    var strUrl = ctx.path;
	    var loading = document.referrer == "" || location.pathname.toUpperCase() != strUrl.toUpperCase();
	    if (loading)
	        $("#content").load(strUrl, function (responseText, textStatus, req) {
	            if (req.status != 200) {
	                $("#content").html(responseText);
	            }      
	        });
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var avalon = __webpack_require__(6);
	


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = avalon;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjY5OGQ1ZGNlMTY4NGIyNGFlODQiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvbmF2LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImpRdWVyeVwiIiwid2VicGFjazovLy8uL3d3d3Jvb3QvbGliL3BhZ2UvcGFnZS5qcyIsIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvdmlld3MvYXJlYXMvbWVtYmVyc2hpcC91c2VyL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF2YWxvblwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN0Q0EsdUI7Ozs7OztBQ0FBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGM7QUFDQSxVQUFTO0FBQ1QsRTs7Ozs7O0FDcEJBLHlCOzs7Ozs7YUNBQSx5QkFBYSwyQkFBMkUsMkRBQTJELEtBQUssTUFBTSx1SEFBdUgsWUFBWSwwQkFBMEIsMEJBQTBCLGdCQUFnQixVQUFVLFVBQVUsMENBQTBDLDhCQUF3QixvQkFBb0IsOENBQThDLGtDQUFrQyxZQUFZLFlBQVksbUNBQW1DLGlCQUFpQixnQkFBZ0Isc0JBQXNCLG9CQUFvQiwwQ0FBMEMsWUFBWSxXQUFXLFlBQVksU0FBUyxHQUFHO0FBQzl2QjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBaUMsZ0JBQWdCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSx5QkFBeUI7QUFDdEMsY0FBYSxVQUFVO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXVDLE9BQU87QUFDOUMsc0JBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFhLFFBQVE7QUFDckIsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsU0FBUztBQUN0QixlQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFhLFFBQVE7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0MsUUFBUTtBQUMxQyxVQUFTO0FBQ1QsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsUUFBUTtBQUNyQixjQUFhLFNBQVM7QUFDdEIsY0FBYSxTQUFTO0FBQ3RCLGVBQWM7QUFDZDtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBLG1DQUFrQyxZQUFZO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFhLFFBQVE7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFhLFFBQVE7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixlQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEIsZUFBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvQ0FBbUMsU0FBUztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7OztBQUlBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFDO0FBQ0QsRUFBQyxFQUFFLGdDQUFnQztBQUNuQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQTZCO0FBQzdCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7O0FBRVQsc0NBQXFDLG1CQUFtQjs7QUFFeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBLEVBQUMsR0FBRztBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQVksT0FBTztBQUNuQixhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLE9BQU87QUFDbkIsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9CQUFtQixtQkFBbUI7QUFDdEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLHdCQUF1QixrQkFBa0I7QUFDekM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBWSxPQUFPO0FBQ25CLGFBQVk7QUFDWjtBQUNBO0FBQ0Esb0NBQW1DO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQVksT0FBTztBQUNuQixhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBWSxPQUFPO0FBQ25CLGFBQVksTUFBTTtBQUNsQixhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLE9BQU87QUFDbkIsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQVksT0FBTztBQUNuQixhQUFZLE1BQU07QUFDbEIsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBWSxNQUFNO0FBQ2xCLGFBQVksTUFBTTtBQUNsQixhQUFZLE9BQU87QUFDbkIsYUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQSxrQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLE9BQU87QUFDbkIsYUFBWSxNQUFNO0FBQ2xCLGFBQVksT0FBTztBQUNuQixhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBWSxNQUFNO0FBQ2xCLGFBQVksTUFBTTtBQUNsQixhQUFZLE9BQU87QUFDbkIsYUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWlCLG1CQUFtQjtBQUNwQzs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYyw2REFBNkQ7QUFDM0U7QUFDQSxhQUFZLHNCQUFzQjtBQUNsQyxhQUFZLE1BQU07QUFDbEIsYUFBWSxPQUFPO0FBQ25CLGFBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEVBQUMsRUFBRSxZQUFZO0FBQ2Y7QUFDQTtBQUNBOztBQUVBLEVBQUMsR0FBRyxFQUFFLEdBQUc7QUFDVCxFQUFDLEU7Ozs7OztBQ3hsQ0Q7Ozs7Ozs7O0FDQUEseUIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMjY5OGQ1ZGNlMTY4NGIyNGFlODRcbiAqKi8iLCJyZXF1aXJlKFwiLi9tb2R1bGVzL25hdi5qc1wiKVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L19zcmMvanMvbWFpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkID0gcmVxdWlyZSgnanF1ZXJ5JylcclxudmFyIHBhZ2UgPSByZXF1aXJlKFwiLi4vLi4vLi4vbGliL3BhZ2UvcGFnZS5qc1wiKTtcclxuXHJcbnBhZ2UoJy8nLCBjb250ZW50TG9hZCk7XHJcbnBhZ2UoJy9NZW1iZXJzaGlwL1VzZXIvSW5kZXgnLCBjb250ZW50TG9hZCk7XHJcbnBhZ2UoJy9NZW1iZXJzaGlwL1VzZXInLCBjb250ZW50TG9hZCk7XHJcbnBhZ2UoJy9tZW1iZXJzaGlwL3VzZXIvZWRpdC86aWQnLCBjb250ZW50TG9hZCk7XHJcbnBhZ2UoJy9NZW1iZXJzaGlwL1JvbGUnLCBjb250ZW50TG9hZCk7XHJcbnBhZ2UoKTtcclxuXHJcbmZ1bmN0aW9uIGNvbnRlbnRMb2FkKGN0eCkge1xyXG5cclxuICAgIHZhciBzdHJVcmwgPSBjdHgucGF0aDtcclxuICAgIHZhciBsb2FkaW5nID0gZG9jdW1lbnQucmVmZXJyZXIgPT0gXCJcIiB8fCBsb2NhdGlvbi5wYXRobmFtZS50b1VwcGVyQ2FzZSgpICE9IHN0clVybC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgaWYgKGxvYWRpbmcpXHJcbiAgICAgICAgJChcIiNjb250ZW50XCIpLmxvYWQoc3RyVXJsLCBmdW5jdGlvbiAocmVzcG9uc2VUZXh0LCB0ZXh0U3RhdHVzLCByZXEpIHtcclxuICAgICAgICAgICAgaWYgKHJlcS5zdGF0dXMgIT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2NvbnRlbnRcIikuaHRtbChyZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB9ICAgICAgXHJcbiAgICAgICAgfSk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvbmF2LmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBqUXVlcnk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImpRdWVyeVwiXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiIWZ1bmN0aW9uKGUpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPWUoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sZSk7ZWxzZXt2YXIgZjtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P2Y9d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Zj1nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJihmPXNlbGYpLGYucGFnZT1lKCl9fShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuKGZ1bmN0aW9uIChwcm9jZXNzKXtcclxuICAvKiBnbG9iYWxzIHJlcXVpcmUsIG1vZHVsZSAqL1xyXG5cclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAgICovXHJcblxyXG4gIHZhciBwYXRodG9SZWdleHAgPSByZXF1aXJlKCdwYXRoLXRvLXJlZ2V4cCcpO1xyXG5cclxuICAvKipcclxuICAgKiBNb2R1bGUgZXhwb3J0cy5cclxuICAgKi9cclxuXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBwYWdlO1xyXG5cclxuICAvKipcclxuICAgKiBEZXRlY3QgY2xpY2sgZXZlbnRcclxuICAgKi9cclxuICB2YXIgY2xpY2tFdmVudCA9ICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIGRvY3VtZW50KSAmJiBkb2N1bWVudC5vbnRvdWNoc3RhcnQgPyAndG91Y2hzdGFydCcgOiAnY2xpY2snO1xyXG5cclxuICAvKipcclxuICAgKiBUbyB3b3JrIHByb3Blcmx5IHdpdGggdGhlIFVSTFxyXG4gICAqIGhpc3RvcnkubG9jYXRpb24gZ2VuZXJhdGVkIHBvbHlmaWxsIGluIGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZvdGUvSFRNTDUtSGlzdG9yeS1BUElcclxuICAgKi9cclxuXHJcbiAgdmFyIGxvY2F0aW9uID0gKCd1bmRlZmluZWQnICE9PSB0eXBlb2Ygd2luZG93KSAmJiAod2luZG93Lmhpc3RvcnkubG9jYXRpb24gfHwgd2luZG93LmxvY2F0aW9uKTtcclxuXHJcbiAgLyoqXHJcbiAgICogUGVyZm9ybSBpbml0aWFsIGRpc3BhdGNoLlxyXG4gICAqL1xyXG5cclxuICB2YXIgZGlzcGF0Y2ggPSB0cnVlO1xyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogRGVjb2RlIFVSTCBjb21wb25lbnRzIChxdWVyeSBzdHJpbmcsIHBhdGhuYW1lLCBoYXNoKS5cclxuICAgKiBBY2NvbW1vZGF0ZXMgYm90aCByZWd1bGFyIHBlcmNlbnQgZW5jb2RpbmcgYW5kIHgtd3d3LWZvcm0tdXJsZW5jb2RlZCBmb3JtYXQuXHJcbiAgICovXHJcbiAgdmFyIGRlY29kZVVSTENvbXBvbmVudHMgPSB0cnVlO1xyXG5cclxuICAvKipcclxuICAgKiBCYXNlIHBhdGguXHJcbiAgICovXHJcblxyXG4gIHZhciBiYXNlID0gJyc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJ1bm5pbmcgZmxhZy5cclxuICAgKi9cclxuXHJcbiAgdmFyIHJ1bm5pbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhc2hCYW5nIG9wdGlvblxyXG4gICAqL1xyXG5cclxuICB2YXIgaGFzaGJhbmcgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogUHJldmlvdXMgY29udGV4dCwgZm9yIGNhcHR1cmluZ1xyXG4gICAqIHBhZ2UgZXhpdCBldmVudHMuXHJcbiAgICovXHJcblxyXG4gIHZhciBwcmV2Q29udGV4dDtcclxuXHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXIgYHBhdGhgIHdpdGggY2FsbGJhY2sgYGZuKClgLFxyXG4gICAqIG9yIHJvdXRlIGBwYXRoYCwgb3IgcmVkaXJlY3Rpb24sXHJcbiAgICogb3IgYHBhZ2Uuc3RhcnQoKWAuXHJcbiAgICpcclxuICAgKiAgIHBhZ2UoZm4pO1xyXG4gICAqICAgcGFnZSgnKicsIGZuKTtcclxuICAgKiAgIHBhZ2UoJy91c2VyLzppZCcsIGxvYWQsIHVzZXIpO1xyXG4gICAqICAgcGFnZSgnL3VzZXIvJyArIHVzZXIuaWQsIHsgc29tZTogJ3RoaW5nJyB9KTtcclxuICAgKiAgIHBhZ2UoJy91c2VyLycgKyB1c2VyLmlkKTtcclxuICAgKiAgIHBhZ2UoJy9mcm9tJywgJy90bycpXHJcbiAgICogICBwYWdlKCk7XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ3whRnVuY3Rpb258IU9iamVjdH0gcGF0aFxyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb249fSBmblxyXG4gICAqIEBhcGkgcHVibGljXHJcbiAgICovXHJcblxyXG4gIGZ1bmN0aW9uIHBhZ2UocGF0aCwgZm4pIHtcclxuICAgIC8vIDxjYWxsYmFjaz5cclxuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgcGF0aCkge1xyXG4gICAgICByZXR1cm4gcGFnZSgnKicsIHBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJvdXRlIDxwYXRoPiB0byA8Y2FsbGJhY2sgLi4uPlxyXG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmbikge1xyXG4gICAgICB2YXIgcm91dGUgPSBuZXcgUm91dGUoLyoqIEB0eXBlIHtzdHJpbmd9ICovIChwYXRoKSk7XHJcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgcGFnZS5jYWxsYmFja3MucHVzaChyb3V0ZS5taWRkbGV3YXJlKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHNob3cgPHBhdGg+IHdpdGggW3N0YXRlXVxyXG4gICAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHBhdGgpIHtcclxuICAgICAgcGFnZVsnc3RyaW5nJyA9PT0gdHlwZW9mIGZuID8gJ3JlZGlyZWN0JyA6ICdzaG93J10ocGF0aCwgZm4pO1xyXG4gICAgICAvLyBzdGFydCBbb3B0aW9uc11cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBhZ2Uuc3RhcnQocGF0aCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxsYmFjayBmdW5jdGlvbnMuXHJcbiAgICovXHJcblxyXG4gIHBhZ2UuY2FsbGJhY2tzID0gW107XHJcbiAgcGFnZS5leGl0cyA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBDdXJyZW50IHBhdGggYmVpbmcgcHJvY2Vzc2VkXHJcbiAgICogQHR5cGUge3N0cmluZ31cclxuICAgKi9cclxuICBwYWdlLmN1cnJlbnQgPSAnJztcclxuXHJcbiAgLyoqXHJcbiAgICogTnVtYmVyIG9mIHBhZ2VzIG5hdmlnYXRlZCB0by5cclxuICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAqXHJcbiAgICogICAgIHBhZ2UubGVuID09IDA7XHJcbiAgICogICAgIHBhZ2UoJy9sb2dpbicpO1xyXG4gICAqICAgICBwYWdlLmxlbiA9PSAxO1xyXG4gICAqL1xyXG5cclxuICBwYWdlLmxlbiA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBvciBzZXQgYmFzZXBhdGggdG8gYHBhdGhgLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcclxuICAgKiBAYXBpIHB1YmxpY1xyXG4gICAqL1xyXG5cclxuICBwYWdlLmJhc2UgPSBmdW5jdGlvbihwYXRoKSB7XHJcbiAgICBpZiAoMCA9PT0gYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGJhc2U7XHJcbiAgICBiYXNlID0gcGF0aDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBCaW5kIHdpdGggdGhlIGdpdmVuIGBvcHRpb25zYC5cclxuICAgKlxyXG4gICAqIE9wdGlvbnM6XHJcbiAgICpcclxuICAgKiAgICAtIGBjbGlja2AgYmluZCB0byBjbGljayBldmVudHMgW3RydWVdXHJcbiAgICogICAgLSBgcG9wc3RhdGVgIGJpbmQgdG8gcG9wc3RhdGUgW3RydWVdXHJcbiAgICogICAgLSBgZGlzcGF0Y2hgIHBlcmZvcm0gaW5pdGlhbCBkaXNwYXRjaCBbdHJ1ZV1cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICogQGFwaSBwdWJsaWNcclxuICAgKi9cclxuXHJcbiAgcGFnZS5zdGFydCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgaWYgKHJ1bm5pbmcpIHJldHVybjtcclxuICAgIHJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgaWYgKGZhbHNlID09PSBvcHRpb25zLmRpc3BhdGNoKSBkaXNwYXRjaCA9IGZhbHNlO1xyXG4gICAgaWYgKGZhbHNlID09PSBvcHRpb25zLmRlY29kZVVSTENvbXBvbmVudHMpIGRlY29kZVVSTENvbXBvbmVudHMgPSBmYWxzZTtcclxuICAgIGlmIChmYWxzZSAhPT0gb3B0aW9ucy5wb3BzdGF0ZSkgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgb25wb3BzdGF0ZSwgZmFsc2UpO1xyXG4gICAgaWYgKGZhbHNlICE9PSBvcHRpb25zLmNsaWNrKSB7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoY2xpY2tFdmVudCwgb25jbGljaywgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRydWUgPT09IG9wdGlvbnMuaGFzaGJhbmcpIGhhc2hiYW5nID0gdHJ1ZTtcclxuICAgIGlmICghZGlzcGF0Y2gpIHJldHVybjtcclxuICAgIHZhciB1cmwgPSAoaGFzaGJhbmcgJiYgfmxvY2F0aW9uLmhhc2guaW5kZXhPZignIyEnKSkgPyBsb2NhdGlvbi5oYXNoLnN1YnN0cigyKSArIGxvY2F0aW9uLnNlYXJjaCA6IGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoICsgbG9jYXRpb24uaGFzaDtcclxuICAgIHBhZ2UucmVwbGFjZSh1cmwsIG51bGwsIHRydWUsIGRpc3BhdGNoKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBVbmJpbmQgY2xpY2sgYW5kIHBvcHN0YXRlIGV2ZW50IGhhbmRsZXJzLlxyXG4gICAqXHJcbiAgICogQGFwaSBwdWJsaWNcclxuICAgKi9cclxuXHJcbiAgcGFnZS5zdG9wID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoIXJ1bm5pbmcpIHJldHVybjtcclxuICAgIHBhZ2UuY3VycmVudCA9ICcnO1xyXG4gICAgcGFnZS5sZW4gPSAwO1xyXG4gICAgcnVubmluZyA9IGZhbHNlO1xyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihjbGlja0V2ZW50LCBvbmNsaWNrLCBmYWxzZSk7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBvbnBvcHN0YXRlLCBmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBgcGF0aGAgd2l0aCBvcHRpb25hbCBgc3RhdGVgIG9iamVjdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXHJcbiAgICogQHBhcmFtIHtPYmplY3Q9fSBzdGF0ZVxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IGRpc3BhdGNoXHJcbiAgICogQHBhcmFtIHtib29sZWFuPX0gcHVzaFxyXG4gICAqIEByZXR1cm4geyFDb250ZXh0fVxyXG4gICAqIEBhcGkgcHVibGljXHJcbiAgICovXHJcblxyXG4gIHBhZ2Uuc2hvdyA9IGZ1bmN0aW9uKHBhdGgsIHN0YXRlLCBkaXNwYXRjaCwgcHVzaCkge1xyXG4gICAgdmFyIGN0eCA9IG5ldyBDb250ZXh0KHBhdGgsIHN0YXRlKTtcclxuICAgIHBhZ2UuY3VycmVudCA9IGN0eC5wYXRoO1xyXG4gICAgaWYgKGZhbHNlICE9PSBkaXNwYXRjaCkgcGFnZS5kaXNwYXRjaChjdHgpO1xyXG4gICAgaWYgKGZhbHNlICE9PSBjdHguaGFuZGxlZCAmJiBmYWxzZSAhPT0gcHVzaCkgY3R4LnB1c2hTdGF0ZSgpO1xyXG4gICAgcmV0dXJuIGN0eDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBHb2VzIGJhY2sgaW4gdGhlIGhpc3RvcnlcclxuICAgKiBCYWNrIHNob3VsZCBhbHdheXMgbGV0IHRoZSBjdXJyZW50IHJvdXRlIHB1c2ggc3RhdGUgYW5kIHRoZW4gZ28gYmFjay5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gZmFsbGJhY2sgcGF0aCB0byBnbyBiYWNrIGlmIG5vIG1vcmUgaGlzdG9yeSBleGlzdHMsIGlmIHVuZGVmaW5lZCBkZWZhdWx0cyB0byBwYWdlLmJhc2VcclxuICAgKiBAcGFyYW0ge09iamVjdD19IHN0YXRlXHJcbiAgICogQGFwaSBwdWJsaWNcclxuICAgKi9cclxuXHJcbiAgcGFnZS5iYWNrID0gZnVuY3Rpb24ocGF0aCwgc3RhdGUpIHtcclxuICAgIGlmIChwYWdlLmxlbiA+IDApIHtcclxuICAgICAgLy8gdGhpcyBtYXkgbmVlZCBtb3JlIHRlc3RpbmcgdG8gc2VlIGlmIGFsbCBicm93c2Vyc1xyXG4gICAgICAvLyB3YWl0IGZvciB0aGUgbmV4dCB0aWNrIHRvIGdvIGJhY2sgaW4gaGlzdG9yeVxyXG4gICAgICBoaXN0b3J5LmJhY2soKTtcclxuICAgICAgcGFnZS5sZW4tLTtcclxuICAgIH0gZWxzZSBpZiAocGF0aCkge1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHBhZ2Uuc2hvdyhwYXRoLCBzdGF0ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcGFnZS5zaG93KGJhc2UsIHN0YXRlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVyIHJvdXRlIHRvIHJlZGlyZWN0IGZyb20gb25lIHBhdGggdG8gb3RoZXJcclxuICAgKiBvciBqdXN0IHJlZGlyZWN0IHRvIGFub3RoZXIgcm91dGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tIC0gaWYgcGFyYW0gJ3RvJyBpcyB1bmRlZmluZWQgcmVkaXJlY3RzIHRvICdmcm9tJ1xyXG4gICAqIEBwYXJhbSB7c3RyaW5nPX0gdG9cclxuICAgKiBAYXBpIHB1YmxpY1xyXG4gICAqL1xyXG4gIHBhZ2UucmVkaXJlY3QgPSBmdW5jdGlvbihmcm9tLCB0bykge1xyXG4gICAgLy8gRGVmaW5lIHJvdXRlIGZyb20gYSBwYXRoIHRvIGFub3RoZXJcclxuICAgIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIGZyb20gJiYgJ3N0cmluZycgPT09IHR5cGVvZiB0bykge1xyXG4gICAgICBwYWdlKGZyb20sIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcGFnZS5yZXBsYWNlKC8qKiBAdHlwZSB7IXN0cmluZ30gKi8gKHRvKSk7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdhaXQgZm9yIHRoZSBwdXNoIHN0YXRlIGFuZCByZXBsYWNlIGl0IHdpdGggYW5vdGhlclxyXG4gICAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgZnJvbSAmJiAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIHRvKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcGFnZS5yZXBsYWNlKGZyb20pO1xyXG4gICAgICB9LCAwKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBSZXBsYWNlIGBwYXRoYCB3aXRoIG9wdGlvbmFsIGBzdGF0ZWAgb2JqZWN0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcclxuICAgKiBAcGFyYW0ge09iamVjdD19IHN0YXRlXHJcbiAgICogQHBhcmFtIHtib29sZWFuPX0gaW5pdFxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IGRpc3BhdGNoXHJcbiAgICogQHJldHVybiB7IUNvbnRleHR9XHJcbiAgICogQGFwaSBwdWJsaWNcclxuICAgKi9cclxuXHJcblxyXG4gIHBhZ2UucmVwbGFjZSA9IGZ1bmN0aW9uKHBhdGgsIHN0YXRlLCBpbml0LCBkaXNwYXRjaCkge1xyXG4gICAgdmFyIGN0eCA9IG5ldyBDb250ZXh0KHBhdGgsIHN0YXRlKTtcclxuICAgIHBhZ2UuY3VycmVudCA9IGN0eC5wYXRoO1xyXG4gICAgY3R4LmluaXQgPSBpbml0O1xyXG4gICAgY3R4LnNhdmUoKTsgLy8gc2F2ZSBiZWZvcmUgZGlzcGF0Y2hpbmcsIHdoaWNoIG1heSByZWRpcmVjdFxyXG4gICAgaWYgKGZhbHNlICE9PSBkaXNwYXRjaCkgcGFnZS5kaXNwYXRjaChjdHgpO1xyXG4gICAgcmV0dXJuIGN0eDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBEaXNwYXRjaCB0aGUgZ2l2ZW4gYGN0eGAuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0NvbnRleHR9IGN0eFxyXG4gICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHBhZ2UuZGlzcGF0Y2ggPSBmdW5jdGlvbihjdHgpIHtcclxuICAgIHZhciBwcmV2ID0gcHJldkNvbnRleHQsXHJcbiAgICAgIGkgPSAwLFxyXG4gICAgICBqID0gMDtcclxuXHJcbiAgICBwcmV2Q29udGV4dCA9IGN0eDtcclxuXHJcbiAgICBmdW5jdGlvbiBuZXh0RXhpdCgpIHtcclxuICAgICAgdmFyIGZuID0gcGFnZS5leGl0c1tqKytdO1xyXG4gICAgICBpZiAoIWZuKSByZXR1cm4gbmV4dEVudGVyKCk7XHJcbiAgICAgIGZuKHByZXYsIG5leHRFeGl0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBuZXh0RW50ZXIoKSB7XHJcbiAgICAgIHZhciBmbiA9IHBhZ2UuY2FsbGJhY2tzW2krK107XHJcblxyXG4gICAgICBpZiAoY3R4LnBhdGggIT09IHBhZ2UuY3VycmVudCkge1xyXG4gICAgICAgIGN0eC5oYW5kbGVkID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghZm4pIHJldHVybiB1bmhhbmRsZWQoY3R4KTtcclxuICAgICAgZm4oY3R4LCBuZXh0RW50ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcmV2KSB7XHJcbiAgICAgIG5leHRFeGl0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuZXh0RW50ZXIoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBVbmhhbmRsZWQgYGN0eGAuIFdoZW4gaXQncyBub3QgdGhlIGluaXRpYWxcclxuICAgKiBwb3BzdGF0ZSB0aGVuIHJlZGlyZWN0LiBJZiB5b3Ugd2lzaCB0byBoYW5kbGVcclxuICAgKiA0MDRzIG9uIHlvdXIgb3duIHVzZSBgcGFnZSgnKicsIGNhbGxiYWNrKWAuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0NvbnRleHR9IGN0eFxyXG4gICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHVuaGFuZGxlZChjdHgpIHtcclxuICAgIGlmIChjdHguaGFuZGxlZCkgcmV0dXJuO1xyXG4gICAgdmFyIGN1cnJlbnQ7XHJcblxyXG4gICAgaWYgKGhhc2hiYW5nKSB7XHJcbiAgICAgIGN1cnJlbnQgPSBiYXNlICsgbG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjIScsICcnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGN1cnJlbnQgPSBsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY3VycmVudCA9PT0gY3R4LmNhbm9uaWNhbFBhdGgpIHJldHVybjtcclxuICAgIHBhZ2Uuc3RvcCgpO1xyXG4gICAgY3R4LmhhbmRsZWQgPSBmYWxzZTtcclxuICAgIGxvY2F0aW9uLmhyZWYgPSBjdHguY2Fub25pY2FsUGF0aDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVyIGFuIGV4aXQgcm91dGUgb24gYHBhdGhgIHdpdGhcclxuICAgKiBjYWxsYmFjayBgZm4oKWAsIHdoaWNoIHdpbGwgYmUgY2FsbGVkXHJcbiAgICogb24gdGhlIHByZXZpb3VzIGNvbnRleHQgd2hlbiBhIG5ld1xyXG4gICAqIHBhZ2UgaXMgdmlzaXRlZC5cclxuICAgKi9cclxuICBwYWdlLmV4aXQgPSBmdW5jdGlvbihwYXRoLCBmbikge1xyXG4gICAgaWYgKHR5cGVvZiBwYXRoID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHJldHVybiBwYWdlLmV4aXQoJyonLCBwYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcm91dGUgPSBuZXcgUm91dGUocGF0aCk7XHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraSkge1xyXG4gICAgICBwYWdlLmV4aXRzLnB1c2gocm91dGUubWlkZGxld2FyZShhcmd1bWVudHNbaV0pKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgVVJMIGVuY29kaW5nIGZyb20gdGhlIGdpdmVuIGBzdHJgLlxyXG4gICAqIEFjY29tbW9kYXRlcyB3aGl0ZXNwYWNlIGluIGJvdGggeC13d3ctZm9ybS11cmxlbmNvZGVkXHJcbiAgICogYW5kIHJlZ3VsYXIgcGVyY2VudC1lbmNvZGVkIGZvcm0uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsIC0gVVJMIGNvbXBvbmVudCB0byBkZWNvZGVcclxuICAgKi9cclxuICBmdW5jdGlvbiBkZWNvZGVVUkxFbmNvZGVkVVJJQ29tcG9uZW50KHZhbCkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWwgIT09ICdzdHJpbmcnKSB7IHJldHVybiB2YWw7IH1cclxuICAgIHJldHVybiBkZWNvZGVVUkxDb21wb25lbnRzID8gZGVjb2RlVVJJQ29tcG9uZW50KHZhbC5yZXBsYWNlKC9cXCsvZywgJyAnKSkgOiB2YWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIGEgbmV3IFwicmVxdWVzdFwiIGBDb250ZXh0YFxyXG4gICAqIHdpdGggdGhlIGdpdmVuIGBwYXRoYCBhbmQgb3B0aW9uYWwgaW5pdGlhbCBgc3RhdGVgLlxyXG4gICAqXHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcclxuICAgKiBAcGFyYW0ge09iamVjdD19IHN0YXRlXHJcbiAgICogQGFwaSBwdWJsaWNcclxuICAgKi9cclxuXHJcbiAgZnVuY3Rpb24gQ29udGV4dChwYXRoLCBzdGF0ZSkge1xyXG4gICAgaWYgKCcvJyA9PT0gcGF0aFswXSAmJiAwICE9PSBwYXRoLmluZGV4T2YoYmFzZSkpIHBhdGggPSBiYXNlICsgKGhhc2hiYW5nID8gJyMhJyA6ICcnKSArIHBhdGg7XHJcbiAgICB2YXIgaSA9IHBhdGguaW5kZXhPZignPycpO1xyXG5cclxuICAgIHRoaXMuY2Fub25pY2FsUGF0aCA9IHBhdGg7XHJcbiAgICB0aGlzLnBhdGggPSBwYXRoLnJlcGxhY2UoYmFzZSwgJycpIHx8ICcvJztcclxuICAgIGlmIChoYXNoYmFuZykgdGhpcy5wYXRoID0gdGhpcy5wYXRoLnJlcGxhY2UoJyMhJywgJycpIHx8ICcvJztcclxuXHJcbiAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQudGl0bGU7XHJcbiAgICB0aGlzLnN0YXRlID0gc3RhdGUgfHwge307XHJcbiAgICB0aGlzLnN0YXRlLnBhdGggPSBwYXRoO1xyXG4gICAgdGhpcy5xdWVyeXN0cmluZyA9IH5pID8gZGVjb2RlVVJMRW5jb2RlZFVSSUNvbXBvbmVudChwYXRoLnNsaWNlKGkgKyAxKSkgOiAnJztcclxuICAgIHRoaXMucGF0aG5hbWUgPSBkZWNvZGVVUkxFbmNvZGVkVVJJQ29tcG9uZW50KH5pID8gcGF0aC5zbGljZSgwLCBpKSA6IHBhdGgpO1xyXG4gICAgdGhpcy5wYXJhbXMgPSB7fTtcclxuXHJcbiAgICAvLyBmcmFnbWVudFxyXG4gICAgdGhpcy5oYXNoID0gJyc7XHJcbiAgICBpZiAoIWhhc2hiYW5nKSB7XHJcbiAgICAgIGlmICghfnRoaXMucGF0aC5pbmRleE9mKCcjJykpIHJldHVybjtcclxuICAgICAgdmFyIHBhcnRzID0gdGhpcy5wYXRoLnNwbGl0KCcjJyk7XHJcbiAgICAgIHRoaXMucGF0aCA9IHBhcnRzWzBdO1xyXG4gICAgICB0aGlzLmhhc2ggPSBkZWNvZGVVUkxFbmNvZGVkVVJJQ29tcG9uZW50KHBhcnRzWzFdKSB8fCAnJztcclxuICAgICAgdGhpcy5xdWVyeXN0cmluZyA9IHRoaXMucXVlcnlzdHJpbmcuc3BsaXQoJyMnKVswXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4cG9zZSBgQ29udGV4dGAuXHJcbiAgICovXHJcblxyXG4gIHBhZ2UuQ29udGV4dCA9IENvbnRleHQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFB1c2ggc3RhdGUuXHJcbiAgICpcclxuICAgKiBAYXBpIHByaXZhdGVcclxuICAgKi9cclxuXHJcbiAgQ29udGV4dC5wcm90b3R5cGUucHVzaFN0YXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICBwYWdlLmxlbisrO1xyXG4gICAgaGlzdG9yeS5wdXNoU3RhdGUodGhpcy5zdGF0ZSwgdGhpcy50aXRsZSwgaGFzaGJhbmcgJiYgdGhpcy5wYXRoICE9PSAnLycgPyAnIyEnICsgdGhpcy5wYXRoIDogdGhpcy5jYW5vbmljYWxQYXRoKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBTYXZlIHRoZSBjb250ZXh0IHN0YXRlLlxyXG4gICAqXHJcbiAgICogQGFwaSBwdWJsaWNcclxuICAgKi9cclxuXHJcbiAgQ29udGV4dC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUodGhpcy5zdGF0ZSwgdGhpcy50aXRsZSwgaGFzaGJhbmcgJiYgdGhpcy5wYXRoICE9PSAnLycgPyAnIyEnICsgdGhpcy5wYXRoIDogdGhpcy5jYW5vbmljYWxQYXRoKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIGBSb3V0ZWAgd2l0aCB0aGUgZ2l2ZW4gSFRUUCBgcGF0aGAsXHJcbiAgICogYW5kIGFuIGFycmF5IG9mIGBjYWxsYmFja3NgIGFuZCBgb3B0aW9uc2AuXHJcbiAgICpcclxuICAgKiBPcHRpb25zOlxyXG4gICAqXHJcbiAgICogICAtIGBzZW5zaXRpdmVgICAgIGVuYWJsZSBjYXNlLXNlbnNpdGl2ZSByb3V0ZXNcclxuICAgKiAgIC0gYHN0cmljdGAgICAgICAgZW5hYmxlIHN0cmljdCBtYXRjaGluZyBmb3IgdHJhaWxpbmcgc2xhc2hlc1xyXG4gICAqXHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcclxuICAgKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICAgKiBAYXBpIHByaXZhdGVcclxuICAgKi9cclxuXHJcbiAgZnVuY3Rpb24gUm91dGUocGF0aCwgb3B0aW9ucykge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICB0aGlzLnBhdGggPSAocGF0aCA9PT0gJyonKSA/ICcoLiopJyA6IHBhdGg7XHJcbiAgICB0aGlzLm1ldGhvZCA9ICdHRVQnO1xyXG4gICAgdGhpcy5yZWdleHAgPSBwYXRodG9SZWdleHAodGhpcy5wYXRoLFxyXG4gICAgICB0aGlzLmtleXMgPSBbXSxcclxuICAgICAgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeHBvc2UgYFJvdXRlYC5cclxuICAgKi9cclxuXHJcbiAgcGFnZS5Sb3V0ZSA9IFJvdXRlO1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gcm91dGUgbWlkZGxld2FyZSB3aXRoXHJcbiAgICogdGhlIGdpdmVuIGNhbGxiYWNrIGBmbigpYC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAgICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAgICogQGFwaSBwdWJsaWNcclxuICAgKi9cclxuXHJcbiAgUm91dGUucHJvdG90eXBlLm1pZGRsZXdhcmUgPSBmdW5jdGlvbihmbikge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGN0eCwgbmV4dCkge1xyXG4gICAgICBpZiAoc2VsZi5tYXRjaChjdHgucGF0aCwgY3R4LnBhcmFtcykpIHJldHVybiBmbihjdHgsIG5leHQpO1xyXG4gICAgICBuZXh0KCk7XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIHRoaXMgcm91dGUgbWF0Y2hlcyBgcGF0aGAsIGlmIHNvXHJcbiAgICogcG9wdWxhdGUgYHBhcmFtc2AuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXNcclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAqL1xyXG5cclxuICBSb3V0ZS5wcm90b3R5cGUubWF0Y2ggPSBmdW5jdGlvbihwYXRoLCBwYXJhbXMpIHtcclxuICAgIHZhciBrZXlzID0gdGhpcy5rZXlzLFxyXG4gICAgICBxc0luZGV4ID0gcGF0aC5pbmRleE9mKCc/JyksXHJcbiAgICAgIHBhdGhuYW1lID0gfnFzSW5kZXggPyBwYXRoLnNsaWNlKDAsIHFzSW5kZXgpIDogcGF0aCxcclxuICAgICAgbSA9IHRoaXMucmVnZXhwLmV4ZWMoZGVjb2RlVVJJQ29tcG9uZW50KHBhdGhuYW1lKSk7XHJcblxyXG4gICAgaWYgKCFtKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDEsIGxlbiA9IG0ubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgdmFyIGtleSA9IGtleXNbaSAtIDFdO1xyXG4gICAgICB2YXIgdmFsID0gZGVjb2RlVVJMRW5jb2RlZFVSSUNvbXBvbmVudChtW2ldKTtcclxuICAgICAgaWYgKHZhbCAhPT0gdW5kZWZpbmVkIHx8ICEoaGFzT3duUHJvcGVydHkuY2FsbChwYXJhbXMsIGtleS5uYW1lKSkpIHtcclxuICAgICAgICBwYXJhbXNba2V5Lm5hbWVdID0gdmFsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfTtcclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZSBcInBvcHVsYXRlXCIgZXZlbnRzLlxyXG4gICAqL1xyXG5cclxuICB2YXIgb25wb3BzdGF0ZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbG9hZGVkID0gZmFsc2U7XHJcbiAgICBpZiAoJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiB3aW5kb3cpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcclxuICAgICAgbG9hZGVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG9ucG9wc3RhdGUoZSkge1xyXG4gICAgICBpZiAoIWxvYWRlZCkgcmV0dXJuO1xyXG4gICAgICBpZiAoZS5zdGF0ZSkge1xyXG4gICAgICAgIHZhciBwYXRoID0gZS5zdGF0ZS5wYXRoO1xyXG4gICAgICAgIHBhZ2UucmVwbGFjZShwYXRoLCBlLnN0YXRlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYWdlLnNob3cobG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5oYXNoLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0pKCk7XHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIFwiY2xpY2tcIiBldmVudHMuXHJcbiAgICovXHJcblxyXG4gIGZ1bmN0aW9uIG9uY2xpY2soZSkge1xyXG5cclxuICAgIGlmICgxICE9PSB3aGljaChlKSkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChlLm1ldGFLZXkgfHwgZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXkpIHJldHVybjtcclxuICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHJldHVybjtcclxuXHJcblxyXG5cclxuICAgIC8vIGVuc3VyZSBsaW5rXHJcbiAgICAvLyB1c2Ugc2hhZG93IGRvbSB3aGVuIGF2YWlsYWJsZVxyXG4gICAgdmFyIGVsID0gZS5wYXRoID8gZS5wYXRoWzBdIDogZS50YXJnZXQ7XHJcbiAgICB3aGlsZSAoZWwgJiYgJ0EnICE9PSBlbC5ub2RlTmFtZSkgZWwgPSBlbC5wYXJlbnROb2RlO1xyXG4gICAgaWYgKCFlbCB8fCAnQScgIT09IGVsLm5vZGVOYW1lKSByZXR1cm47XHJcblxyXG5cclxuXHJcbiAgICAvLyBJZ25vcmUgaWYgdGFnIGhhc1xyXG4gICAgLy8gMS4gXCJkb3dubG9hZFwiIGF0dHJpYnV0ZVxyXG4gICAgLy8gMi4gcmVsPVwiZXh0ZXJuYWxcIiBhdHRyaWJ1dGVcclxuICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2Rvd25sb2FkJykgfHwgZWwuZ2V0QXR0cmlidXRlKCdyZWwnKSA9PT0gJ2V4dGVybmFsJykgcmV0dXJuO1xyXG5cclxuICAgIC8vIGVuc3VyZSBub24taGFzaCBmb3IgdGhlIHNhbWUgcGF0aFxyXG4gICAgdmFyIGxpbmsgPSBlbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuICAgIGlmICghaGFzaGJhbmcgJiYgZWwucGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lICYmIChlbC5oYXNoIHx8ICcjJyA9PT0gbGluaykpIHJldHVybjtcclxuXHJcblxyXG5cclxuICAgIC8vIENoZWNrIGZvciBtYWlsdG86IGluIHRoZSBocmVmXHJcbiAgICBpZiAobGluayAmJiBsaW5rLmluZGV4T2YoJ21haWx0bzonKSA+IC0xKSByZXR1cm47XHJcblxyXG4gICAgLy8gY2hlY2sgdGFyZ2V0XHJcbiAgICBpZiAoZWwudGFyZ2V0KSByZXR1cm47XHJcblxyXG4gICAgLy8geC1vcmlnaW5cclxuICAgIGlmICghc2FtZU9yaWdpbihlbC5ocmVmKSkgcmV0dXJuO1xyXG5cclxuXHJcblxyXG4gICAgLy8gcmVidWlsZCBwYXRoXHJcbiAgICB2YXIgcGF0aCA9IGVsLnBhdGhuYW1lICsgZWwuc2VhcmNoICsgKGVsLmhhc2ggfHwgJycpO1xyXG5cclxuICAgIC8vIHN0cmlwIGxlYWRpbmcgXCIvW2RyaXZlIGxldHRlcl06XCIgb24gTlcuanMgb24gV2luZG93c1xyXG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwYXRoLm1hdGNoKC9eXFwvW2EtekEtWl06XFwvLykpIHtcclxuICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXlxcL1thLXpBLVpdOlxcLy8sICcvJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2FtZSBwYWdlXHJcbiAgICB2YXIgb3JpZyA9IHBhdGg7XHJcblxyXG4gICAgaWYgKHBhdGguaW5kZXhPZihiYXNlKSA9PT0gMCkge1xyXG4gICAgICBwYXRoID0gcGF0aC5zdWJzdHIoYmFzZS5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChoYXNoYmFuZykgcGF0aCA9IHBhdGgucmVwbGFjZSgnIyEnLCAnJyk7XHJcblxyXG4gICAgaWYgKGJhc2UgJiYgb3JpZyA9PT0gcGF0aCkgcmV0dXJuO1xyXG5cclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHBhZ2Uuc2hvdyhvcmlnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGJ1dHRvbi5cclxuICAgKi9cclxuXHJcbiAgZnVuY3Rpb24gd2hpY2goZSkge1xyXG4gICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgcmV0dXJuIG51bGwgPT09IGUud2hpY2ggPyBlLmJ1dHRvbiA6IGUud2hpY2g7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBgaHJlZmAgaXMgdGhlIHNhbWUgb3JpZ2luLlxyXG4gICAqL1xyXG5cclxuICBmdW5jdGlvbiBzYW1lT3JpZ2luKGhyZWYpIHtcclxuICAgIHZhciBvcmlnaW4gPSBsb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyBsb2NhdGlvbi5ob3N0bmFtZTtcclxuICAgIGlmIChsb2NhdGlvbi5wb3J0KSBvcmlnaW4gKz0gJzonICsgbG9jYXRpb24ucG9ydDtcclxuICAgIHJldHVybiAoaHJlZiAmJiAoMCA9PT0gaHJlZi5pbmRleE9mKG9yaWdpbikpKTtcclxuICB9XHJcblxyXG4gIHBhZ2Uuc2FtZU9yaWdpbiA9IHNhbWVPcmlnaW47XHJcblxyXG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSlcclxufSx7XCJfcHJvY2Vzc1wiOjIsXCJwYXRoLXRvLXJlZ2V4cFwiOjN9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXHJcblxyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XHJcblxyXG5wcm9jZXNzLm5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcclxuICAgIHZhciBjYW5NdXRhdGlvbk9ic2VydmVyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcclxuICAgICYmIHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyO1xyXG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXHJcbiAgICA7XHJcblxyXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKSB9O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBxdWV1ZSA9IFtdO1xyXG5cclxuICAgIGlmIChjYW5NdXRhdGlvbk9ic2VydmVyKSB7XHJcbiAgICAgICAgdmFyIGhpZGRlbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcXVldWVMaXN0ID0gcXVldWUuc2xpY2UoKTtcclxuICAgICAgICAgICAgcXVldWUubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgcXVldWVMaXN0LmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XHJcbiAgICAgICAgICAgICAgICBmbigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShoaWRkZW5EaXYsIHsgYXR0cmlidXRlczogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XHJcbiAgICAgICAgICAgIGlmICghcXVldWUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBoaWRkZW5EaXYuc2V0QXR0cmlidXRlKCd5ZXMnLCAnbm8nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjYW5Qb3N0KSB7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcclxuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XHJcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBmbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xyXG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcclxuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcclxucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcclxucHJvY2Vzcy5lbnYgPSB7fTtcclxucHJvY2Vzcy5hcmd2ID0gW107XHJcblxyXG5mdW5jdGlvbiBub29wKCkge31cclxuXHJcbnByb2Nlc3Mub24gPSBub29wO1xyXG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcclxucHJvY2Vzcy5vbmNlID0gbm9vcDtcclxucHJvY2Vzcy5vZmYgPSBub29wO1xyXG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcclxucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xyXG5wcm9jZXNzLmVtaXQgPSBub29wO1xyXG5cclxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxufTtcclxuXHJcbi8vIFRPRE8oc2h0eWxtYW4pXHJcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XHJcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xyXG59O1xyXG5cclxufSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbnZhciBpc2FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXHJcblxyXG4vKipcclxuICogRXhwb3NlIGBwYXRoVG9SZWdleHBgLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBwYXRoVG9SZWdleHBcclxubW9kdWxlLmV4cG9ydHMucGFyc2UgPSBwYXJzZVxyXG5tb2R1bGUuZXhwb3J0cy5jb21waWxlID0gY29tcGlsZVxyXG5tb2R1bGUuZXhwb3J0cy50b2tlbnNUb0Z1bmN0aW9uID0gdG9rZW5zVG9GdW5jdGlvblxyXG5tb2R1bGUuZXhwb3J0cy50b2tlbnNUb1JlZ0V4cCA9IHRva2Vuc1RvUmVnRXhwXHJcblxyXG4vKipcclxuICogVGhlIG1haW4gcGF0aCBtYXRjaGluZyByZWdleHAgdXRpbGl0eS5cclxuICpcclxuICogQHR5cGUge1JlZ0V4cH1cclxuICovXHJcbnZhciBQQVRIX1JFR0VYUCA9IG5ldyBSZWdFeHAoW1xyXG4gIC8vIE1hdGNoIGVzY2FwZWQgY2hhcmFjdGVycyB0aGF0IHdvdWxkIG90aGVyd2lzZSBhcHBlYXIgaW4gZnV0dXJlIG1hdGNoZXMuXHJcbiAgLy8gVGhpcyBhbGxvd3MgdGhlIHVzZXIgdG8gZXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyB0aGF0IHdvbid0IHRyYW5zZm9ybS5cclxuICAnKFxcXFxcXFxcLiknLFxyXG4gIC8vIE1hdGNoIEV4cHJlc3Mtc3R5bGUgcGFyYW1ldGVycyBhbmQgdW4tbmFtZWQgcGFyYW1ldGVycyB3aXRoIGEgcHJlZml4XHJcbiAgLy8gYW5kIG9wdGlvbmFsIHN1ZmZpeGVzLiBNYXRjaGVzIGFwcGVhciBhczpcclxuICAvL1xyXG4gIC8vIFwiLzp0ZXN0KFxcXFxkKyk/XCIgPT4gW1wiL1wiLCBcInRlc3RcIiwgXCJcXGQrXCIsIHVuZGVmaW5lZCwgXCI/XCIsIHVuZGVmaW5lZF1cclxuICAvLyBcIi9yb3V0ZShcXFxcZCspXCIgID0+IFt1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBcIlxcZCtcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWRdXHJcbiAgLy8gXCIvKlwiICAgICAgICAgICAgPT4gW1wiL1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiKlwiXVxyXG4gICcoW1xcXFwvLl0pPyg/Oig/OlxcXFw6KFxcXFx3KykoPzpcXFxcKCgoPzpcXFxcXFxcXC58W14oKV0pKylcXFxcKSk/fFxcXFwoKCg/OlxcXFxcXFxcLnxbXigpXSkrKVxcXFwpKShbKyo/XSk/fChcXFxcKikpJ1xyXG5dLmpvaW4oJ3wnKSwgJ2cnKVxyXG5cclxuLyoqXHJcbiAqIFBhcnNlIGEgc3RyaW5nIGZvciB0aGUgcmF3IHRva2Vucy5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSBzdHJcclxuICogQHJldHVybiB7QXJyYXl9XHJcbiAqL1xyXG5mdW5jdGlvbiBwYXJzZSAoc3RyKSB7XHJcbiAgdmFyIHRva2VucyA9IFtdXHJcbiAgdmFyIGtleSA9IDBcclxuICB2YXIgaW5kZXggPSAwXHJcbiAgdmFyIHBhdGggPSAnJ1xyXG4gIHZhciByZXNcclxuXHJcbiAgd2hpbGUgKChyZXMgPSBQQVRIX1JFR0VYUC5leGVjKHN0cikpICE9IG51bGwpIHtcclxuICAgIHZhciBtID0gcmVzWzBdXHJcbiAgICB2YXIgZXNjYXBlZCA9IHJlc1sxXVxyXG4gICAgdmFyIG9mZnNldCA9IHJlcy5pbmRleFxyXG4gICAgcGF0aCArPSBzdHIuc2xpY2UoaW5kZXgsIG9mZnNldClcclxuICAgIGluZGV4ID0gb2Zmc2V0ICsgbS5sZW5ndGhcclxuXHJcbiAgICAvLyBJZ25vcmUgYWxyZWFkeSBlc2NhcGVkIHNlcXVlbmNlcy5cclxuICAgIGlmIChlc2NhcGVkKSB7XHJcbiAgICAgIHBhdGggKz0gZXNjYXBlZFsxXVxyXG4gICAgICBjb250aW51ZVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFB1c2ggdGhlIGN1cnJlbnQgcGF0aCBvbnRvIHRoZSB0b2tlbnMuXHJcbiAgICBpZiAocGF0aCkge1xyXG4gICAgICB0b2tlbnMucHVzaChwYXRoKVxyXG4gICAgICBwYXRoID0gJydcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcHJlZml4ID0gcmVzWzJdXHJcbiAgICB2YXIgbmFtZSA9IHJlc1szXVxyXG4gICAgdmFyIGNhcHR1cmUgPSByZXNbNF1cclxuICAgIHZhciBncm91cCA9IHJlc1s1XVxyXG4gICAgdmFyIHN1ZmZpeCA9IHJlc1s2XVxyXG4gICAgdmFyIGFzdGVyaXNrID0gcmVzWzddXHJcblxyXG4gICAgdmFyIHJlcGVhdCA9IHN1ZmZpeCA9PT0gJysnIHx8IHN1ZmZpeCA9PT0gJyonXHJcbiAgICB2YXIgb3B0aW9uYWwgPSBzdWZmaXggPT09ICc/JyB8fCBzdWZmaXggPT09ICcqJ1xyXG4gICAgdmFyIGRlbGltaXRlciA9IHByZWZpeCB8fCAnLydcclxuICAgIHZhciBwYXR0ZXJuID0gY2FwdHVyZSB8fCBncm91cCB8fCAoYXN0ZXJpc2sgPyAnLionIDogJ1teJyArIGRlbGltaXRlciArICddKz8nKVxyXG5cclxuICAgIHRva2Vucy5wdXNoKHtcclxuICAgICAgbmFtZTogbmFtZSB8fCBrZXkrKyxcclxuICAgICAgcHJlZml4OiBwcmVmaXggfHwgJycsXHJcbiAgICAgIGRlbGltaXRlcjogZGVsaW1pdGVyLFxyXG4gICAgICBvcHRpb25hbDogb3B0aW9uYWwsXHJcbiAgICAgIHJlcGVhdDogcmVwZWF0LFxyXG4gICAgICBwYXR0ZXJuOiBlc2NhcGVHcm91cChwYXR0ZXJuKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8vIE1hdGNoIGFueSBjaGFyYWN0ZXJzIHN0aWxsIHJlbWFpbmluZy5cclxuICBpZiAoaW5kZXggPCBzdHIubGVuZ3RoKSB7XHJcbiAgICBwYXRoICs9IHN0ci5zdWJzdHIoaW5kZXgpXHJcbiAgfVxyXG5cclxuICAvLyBJZiB0aGUgcGF0aCBleGlzdHMsIHB1c2ggaXQgb250byB0aGUgZW5kLlxyXG4gIGlmIChwYXRoKSB7XHJcbiAgICB0b2tlbnMucHVzaChwYXRoKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRva2Vuc1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcGlsZSBhIHN0cmluZyB0byBhIHRlbXBsYXRlIGZ1bmN0aW9uIGZvciB0aGUgcGF0aC5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgIHN0clxyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICovXHJcbmZ1bmN0aW9uIGNvbXBpbGUgKHN0cikge1xyXG4gIHJldHVybiB0b2tlbnNUb0Z1bmN0aW9uKHBhcnNlKHN0cikpXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHBvc2UgYSBtZXRob2QgZm9yIHRyYW5zZm9ybWluZyB0b2tlbnMgaW50byB0aGUgcGF0aCBmdW5jdGlvbi5cclxuICovXHJcbmZ1bmN0aW9uIHRva2Vuc1RvRnVuY3Rpb24gKHRva2Vucykge1xyXG4gIC8vIENvbXBpbGUgYWxsIHRoZSB0b2tlbnMgaW50byByZWdleHBzLlxyXG4gIHZhciBtYXRjaGVzID0gbmV3IEFycmF5KHRva2Vucy5sZW5ndGgpXHJcblxyXG4gIC8vIENvbXBpbGUgYWxsIHRoZSBwYXR0ZXJucyBiZWZvcmUgY29tcGlsYXRpb24uXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmICh0eXBlb2YgdG9rZW5zW2ldID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBtYXRjaGVzW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0b2tlbnNbaV0ucGF0dGVybiArICckJylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICB2YXIgcGF0aCA9ICcnXHJcbiAgICB2YXIgZGF0YSA9IG9iaiB8fCB7fVxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXVxyXG5cclxuICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBwYXRoICs9IHRva2VuXHJcblxyXG4gICAgICAgIGNvbnRpbnVlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciB2YWx1ZSA9IGRhdGFbdG9rZW4ubmFtZV1cclxuICAgICAgdmFyIHNlZ21lbnRcclxuXHJcbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XHJcbiAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIGJlIGRlZmluZWQnKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzYXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgaWYgKCF0b2tlbi5yZXBlYXQpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbm90IHJlcGVhdCwgYnV0IHJlY2VpdmVkIFwiJyArIHZhbHVlICsgJ1wiJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIGlmICh0b2tlbi5vcHRpb25hbCkge1xyXG4gICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBub3QgYmUgZW1wdHknKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWx1ZS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgc2VnbWVudCA9IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZVtqXSlcclxuXHJcbiAgICAgICAgICBpZiAoIW1hdGNoZXNbaV0udGVzdChzZWdtZW50KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhbGwgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBtYXRjaCBcIicgKyB0b2tlbi5wYXR0ZXJuICsgJ1wiLCBidXQgcmVjZWl2ZWQgXCInICsgc2VnbWVudCArICdcIicpXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcGF0aCArPSAoaiA9PT0gMCA/IHRva2VuLnByZWZpeCA6IHRva2VuLmRlbGltaXRlcikgKyBzZWdtZW50XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb250aW51ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICBzZWdtZW50ID0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKVxyXG5cclxuICAgICAgaWYgKCFtYXRjaGVzW2ldLnRlc3Qoc2VnbWVudCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG1hdGNoIFwiJyArIHRva2VuLnBhdHRlcm4gKyAnXCIsIGJ1dCByZWNlaXZlZCBcIicgKyBzZWdtZW50ICsgJ1wiJylcclxuICAgICAgfVxyXG5cclxuICAgICAgcGF0aCArPSB0b2tlbi5wcmVmaXggKyBzZWdtZW50XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhdGhcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFc2NhcGUgYSByZWd1bGFyIGV4cHJlc3Npb24gc3RyaW5nLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmcgKHN0cikge1xyXG4gIHJldHVybiBzdHIucmVwbGFjZSgvKFsuKyo/PV4hOiR7fSgpW1xcXXxcXC9dKS9nLCAnXFxcXCQxJylcclxufVxyXG5cclxuLyoqXHJcbiAqIEVzY2FwZSB0aGUgY2FwdHVyaW5nIGdyb3VwIGJ5IGVzY2FwaW5nIHNwZWNpYWwgY2hhcmFjdGVycyBhbmQgbWVhbmluZy5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSBncm91cFxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBlc2NhcGVHcm91cCAoZ3JvdXApIHtcclxuICByZXR1cm4gZ3JvdXAucmVwbGFjZSgvKFs9ITokXFwvKCldKS9nLCAnXFxcXCQxJylcclxufVxyXG5cclxuLyoqXHJcbiAqIEF0dGFjaCB0aGUga2V5cyBhcyBhIHByb3BlcnR5IG9mIHRoZSByZWdleHAuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1JlZ0V4cH0gcmVcclxuICogQHBhcmFtICB7QXJyYXl9ICBrZXlzXHJcbiAqIEByZXR1cm4ge1JlZ0V4cH1cclxuICovXHJcbmZ1bmN0aW9uIGF0dGFjaEtleXMgKHJlLCBrZXlzKSB7XHJcbiAgcmUua2V5cyA9IGtleXNcclxuICByZXR1cm4gcmVcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgZmxhZ3MgZm9yIGEgcmVnZXhwIGZyb20gdGhlIG9wdGlvbnMuXHJcbiAqXHJcbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBmbGFncyAob3B0aW9ucykge1xyXG4gIHJldHVybiBvcHRpb25zLnNlbnNpdGl2ZSA/ICcnIDogJ2knXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQdWxsIG91dCBrZXlzIGZyb20gYSByZWdleHAuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1JlZ0V4cH0gcGF0aFxyXG4gKiBAcGFyYW0gIHtBcnJheX0gIGtleXNcclxuICogQHJldHVybiB7UmVnRXhwfVxyXG4gKi9cclxuZnVuY3Rpb24gcmVnZXhwVG9SZWdleHAgKHBhdGgsIGtleXMpIHtcclxuICAvLyBVc2UgYSBuZWdhdGl2ZSBsb29rYWhlYWQgdG8gbWF0Y2ggb25seSBjYXB0dXJpbmcgZ3JvdXBzLlxyXG4gIHZhciBncm91cHMgPSBwYXRoLnNvdXJjZS5tYXRjaCgvXFwoKD8hXFw/KS9nKVxyXG5cclxuICBpZiAoZ3JvdXBzKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBrZXlzLnB1c2goe1xyXG4gICAgICAgIG5hbWU6IGksXHJcbiAgICAgICAgcHJlZml4OiBudWxsLFxyXG4gICAgICAgIGRlbGltaXRlcjogbnVsbCxcclxuICAgICAgICBvcHRpb25hbDogZmFsc2UsXHJcbiAgICAgICAgcmVwZWF0OiBmYWxzZSxcclxuICAgICAgICBwYXR0ZXJuOiBudWxsXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYXR0YWNoS2V5cyhwYXRoLCBrZXlzKVxyXG59XHJcblxyXG4vKipcclxuICogVHJhbnNmb3JtIGFuIGFycmF5IGludG8gYSByZWdleHAuXHJcbiAqXHJcbiAqIEBwYXJhbSAge0FycmF5fSAgcGF0aFxyXG4gKiBAcGFyYW0gIHtBcnJheX0gIGtleXNcclxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zXHJcbiAqIEByZXR1cm4ge1JlZ0V4cH1cclxuICovXHJcbmZ1bmN0aW9uIGFycmF5VG9SZWdleHAgKHBhdGgsIGtleXMsIG9wdGlvbnMpIHtcclxuICB2YXIgcGFydHMgPSBbXVxyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcclxuICAgIHBhcnRzLnB1c2gocGF0aFRvUmVnZXhwKHBhdGhbaV0sIGtleXMsIG9wdGlvbnMpLnNvdXJjZSlcclxuICB9XHJcblxyXG4gIHZhciByZWdleHAgPSBuZXcgUmVnRXhwKCcoPzonICsgcGFydHMuam9pbignfCcpICsgJyknLCBmbGFncyhvcHRpb25zKSlcclxuXHJcbiAgcmV0dXJuIGF0dGFjaEtleXMocmVnZXhwLCBrZXlzKVxyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgcGF0aCByZWdleHAgZnJvbSBzdHJpbmcgaW5wdXQuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gcGF0aFxyXG4gKiBAcGFyYW0gIHtBcnJheX0gIGtleXNcclxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zXHJcbiAqIEByZXR1cm4ge1JlZ0V4cH1cclxuICovXHJcbmZ1bmN0aW9uIHN0cmluZ1RvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XHJcbiAgdmFyIHRva2VucyA9IHBhcnNlKHBhdGgpXHJcbiAgdmFyIHJlID0gdG9rZW5zVG9SZWdFeHAodG9rZW5zLCBvcHRpb25zKVxyXG5cclxuICAvLyBBdHRhY2gga2V5cyBiYWNrIHRvIHRoZSByZWdleHAuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmICh0eXBlb2YgdG9rZW5zW2ldICE9PSAnc3RyaW5nJykge1xyXG4gICAgICBrZXlzLnB1c2godG9rZW5zW2ldKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGF0dGFjaEtleXMocmUsIGtleXMpXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHBvc2UgYSBmdW5jdGlvbiBmb3IgdGFraW5nIHRva2VucyBhbmQgcmV0dXJuaW5nIGEgUmVnRXhwLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtBcnJheX0gIHRva2Vuc1xyXG4gKiBAcGFyYW0gIHtBcnJheX0gIGtleXNcclxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zXHJcbiAqIEByZXR1cm4ge1JlZ0V4cH1cclxuICovXHJcbmZ1bmN0aW9uIHRva2Vuc1RvUmVnRXhwICh0b2tlbnMsIG9wdGlvbnMpIHtcclxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG5cclxuICB2YXIgc3RyaWN0ID0gb3B0aW9ucy5zdHJpY3RcclxuICB2YXIgZW5kID0gb3B0aW9ucy5lbmQgIT09IGZhbHNlXHJcbiAgdmFyIHJvdXRlID0gJydcclxuICB2YXIgbGFzdFRva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXVxyXG4gIHZhciBlbmRzV2l0aFNsYXNoID0gdHlwZW9mIGxhc3RUb2tlbiA9PT0gJ3N0cmluZycgJiYgL1xcLyQvLnRlc3QobGFzdFRva2VuKVxyXG5cclxuICAvLyBJdGVyYXRlIG92ZXIgdGhlIHRva2VucyBhbmQgY3JlYXRlIG91ciByZWdleHAgc3RyaW5nLlxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xyXG4gICAgICByb3V0ZSArPSBlc2NhcGVTdHJpbmcodG9rZW4pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgcHJlZml4ID0gZXNjYXBlU3RyaW5nKHRva2VuLnByZWZpeClcclxuICAgICAgdmFyIGNhcHR1cmUgPSB0b2tlbi5wYXR0ZXJuXHJcblxyXG4gICAgICBpZiAodG9rZW4ucmVwZWF0KSB7XHJcbiAgICAgICAgY2FwdHVyZSArPSAnKD86JyArIHByZWZpeCArIGNhcHR1cmUgKyAnKSonXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0b2tlbi5vcHRpb25hbCkge1xyXG4gICAgICAgIGlmIChwcmVmaXgpIHtcclxuICAgICAgICAgIGNhcHR1cmUgPSAnKD86JyArIHByZWZpeCArICcoJyArIGNhcHR1cmUgKyAnKSk/J1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjYXB0dXJlID0gJygnICsgY2FwdHVyZSArICcpPydcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2FwdHVyZSA9IHByZWZpeCArICcoJyArIGNhcHR1cmUgKyAnKSdcclxuICAgICAgfVxyXG5cclxuICAgICAgcm91dGUgKz0gY2FwdHVyZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gSW4gbm9uLXN0cmljdCBtb2RlIHdlIGFsbG93IGEgc2xhc2ggYXQgdGhlIGVuZCBvZiBtYXRjaC4gSWYgdGhlIHBhdGggdG9cclxuICAvLyBtYXRjaCBhbHJlYWR5IGVuZHMgd2l0aCBhIHNsYXNoLCB3ZSByZW1vdmUgaXQgZm9yIGNvbnNpc3RlbmN5LiBUaGUgc2xhc2hcclxuICAvLyBpcyB2YWxpZCBhdCB0aGUgZW5kIG9mIGEgcGF0aCBtYXRjaCwgbm90IGluIHRoZSBtaWRkbGUuIFRoaXMgaXMgaW1wb3J0YW50XHJcbiAgLy8gaW4gbm9uLWVuZGluZyBtb2RlLCB3aGVyZSBcIi90ZXN0L1wiIHNob3VsZG4ndCBtYXRjaCBcIi90ZXN0Ly9yb3V0ZVwiLlxyXG4gIGlmICghc3RyaWN0KSB7XHJcbiAgICByb3V0ZSA9IChlbmRzV2l0aFNsYXNoID8gcm91dGUuc2xpY2UoMCwgLTIpIDogcm91dGUpICsgJyg/OlxcXFwvKD89JCkpPydcclxuICB9XHJcblxyXG4gIGlmIChlbmQpIHtcclxuICAgIHJvdXRlICs9ICckJ1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBJbiBub24tZW5kaW5nIG1vZGUsIHdlIG5lZWQgdGhlIGNhcHR1cmluZyBncm91cHMgdG8gbWF0Y2ggYXMgbXVjaCBhc1xyXG4gICAgLy8gcG9zc2libGUgYnkgdXNpbmcgYSBwb3NpdGl2ZSBsb29rYWhlYWQgdG8gdGhlIGVuZCBvciBuZXh0IHBhdGggc2VnbWVudC5cclxuICAgIHJvdXRlICs9IHN0cmljdCAmJiBlbmRzV2l0aFNsYXNoID8gJycgOiAnKD89XFxcXC98JCknXHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyByb3V0ZSwgZmxhZ3Mob3B0aW9ucykpXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBOb3JtYWxpemUgdGhlIGdpdmVuIHBhdGggc3RyaW5nLCByZXR1cm5pbmcgYSByZWd1bGFyIGV4cHJlc3Npb24uXHJcbiAqXHJcbiAqIEFuIGVtcHR5IGFycmF5IGNhbiBiZSBwYXNzZWQgaW4gZm9yIHRoZSBrZXlzLCB3aGljaCB3aWxsIGhvbGQgdGhlXHJcbiAqIHBsYWNlaG9sZGVyIGtleSBkZXNjcmlwdGlvbnMuIEZvciBleGFtcGxlLCB1c2luZyBgL3VzZXIvOmlkYCwgYGtleXNgIHdpbGxcclxuICogY29udGFpbiBgW3sgbmFtZTogJ2lkJywgZGVsaW1pdGVyOiAnLycsIG9wdGlvbmFsOiBmYWxzZSwgcmVwZWF0OiBmYWxzZSB9XWAuXHJcbiAqXHJcbiAqIEBwYXJhbSAgeyhTdHJpbmd8UmVnRXhwfEFycmF5KX0gcGF0aFxyXG4gKiBAcGFyYW0gIHtBcnJheX0gICAgICAgICAgICAgICAgIFtrZXlzXVxyXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgICAgICAgICAgICAgIFtvcHRpb25zXVxyXG4gKiBAcmV0dXJuIHtSZWdFeHB9XHJcbiAqL1xyXG5mdW5jdGlvbiBwYXRoVG9SZWdleHAgKHBhdGgsIGtleXMsIG9wdGlvbnMpIHtcclxuICBrZXlzID0ga2V5cyB8fCBbXVxyXG5cclxuICBpZiAoIWlzYXJyYXkoa2V5cykpIHtcclxuICAgIG9wdGlvbnMgPSBrZXlzXHJcbiAgICBrZXlzID0gW11cclxuICB9IGVsc2UgaWYgKCFvcHRpb25zKSB7XHJcbiAgICBvcHRpb25zID0ge31cclxuICB9XHJcblxyXG4gIGlmIChwYXRoIGluc3RhbmNlb2YgUmVnRXhwKSB7XHJcbiAgICByZXR1cm4gcmVnZXhwVG9SZWdleHAocGF0aCwga2V5cywgb3B0aW9ucylcclxuICB9XHJcblxyXG4gIGlmIChpc2FycmF5KHBhdGgpKSB7XHJcbiAgICByZXR1cm4gYXJyYXlUb1JlZ2V4cChwYXRoLCBrZXlzLCBvcHRpb25zKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN0cmluZ1RvUmVnZXhwKHBhdGgsIGtleXMsIG9wdGlvbnMpXHJcbn1cclxuXHJcbn0se1wiaXNhcnJheVwiOjR9XSw0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcclxuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcclxufTtcclxuXHJcbn0se31dfSx7fSxbMV0pKDEpXHJcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L2xpYi9wYWdlL3BhZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYXZhbG9uID0gcmVxdWlyZSgnYXZhbG9uJyk7XHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3d3cm9vdC9fc3JjL2pzL3ZpZXdzL2FyZWFzL21lbWJlcnNoaXAvdXNlci9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gYXZhbG9uO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhdmFsb25cIlxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=