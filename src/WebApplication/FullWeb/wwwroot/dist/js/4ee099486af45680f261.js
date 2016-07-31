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


/***/ },
/* 1 */
/***/ function(module, exports) {

	/*                  ______________________________________
	           ________|                                      |_______
	           \       |           SmartAdmin WebApp          |      /
	            \      |      Copyright © 2016 MyOrange       |     /
	            /      |______________________________________|     \
	           /__________)                                (_________\
	
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 * =======================================================================
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	 * MERCHANTABILITY, IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	 * =======================================================================
	 * original filename  : app.js
	 * filesize           : 62,499~ bytes
	 * author             : Sunny (@bootstraphunt)
	 * email              : info@myorange.ca
	 * legal notice       : This script is part of a theme sold by 
	 *                      MYORANGE INC.
	 *    
	 * =======================================================================
	 * INDEX (Note: line numbers for index items may not be up to date):
	 * 
	 * 1. APP CONFIGURATION..................................[ app.config.js ]
	 * 2. APP DOM REFERENCES.................................[ app.config.js ]
	 * 3. DETECT MOBILE DEVICES...................................[line: 149 ]
	 * 4. CUSTOM MENU PLUGIN......................................[line: 688 ]
	 * 5. ELEMENT EXIST OR NOT....................................[line: 778 ]
	 * 6. INITIALIZE FORMS........................................[line: 788 ]
	 * 		6a. BOOTSTRAP SLIDER PLUGIN...........................[line: 794 ]
	 * 		6b. SELECT2 PLUGIN....................................[line: 803 ]
	 * 		6c. MASKING...........................................[line: 824 ]
	 * 		6d. AUTOCOMPLETE......................................[line: 843 ]
	 * 		6f. JQUERY UI DATE....................................[line: 862 ]
	 * 		6g. AJAX BUTTON LOADING TEXT..........................[line: 884 ]
	 * 7. INITIALIZE CHARTS.......................................[line: 902 ]
	 * 		7a. SPARKLINES........................................[line: 907 ]
	 * 		7b. LINE CHART........................................[line: 1026]
	 * 		7c. PIE CHART.........................................[line: 1077]
	 * 		7d. BOX PLOT..........................................[line: 1100]
	 * 		7e. BULLET............................................[line: 1145]
	 * 		7f. DISCRETE..........................................[line: 1169]
	 * 		7g. TRISTATE..........................................[line: 1195]
	 * 		7h. COMPOSITE: BAR....................................[line: 1223]
	 * 		7i. COMPOSITE: LINE...................................[line: 1259]
	 * 		7j. EASY PIE CHARTS...................................[line: 1339]
	 * 8. INITIALIZE JARVIS WIDGETS...............................[line: 1379]
	 * 		8a. SETUP DESKTOP WIDGET..............................[line: 1466]
	 * 		8b. GOOGLE MAPS.......................................[line: 1478]
	 * 		8c. LOAD SCRIPTS......................................[line: 1500]
	 * 		8d. APP AJAX REQUEST SETUP............................[line: 1538]
	 * 9. CHECK TO SEE IF URL EXISTS..............................[line: 1614]
	 * 10.LOAD AJAX PAGES.........................................[line: 1669]
	 * 11.UPDATE BREADCRUMB.......................................[line: 1775]
	 * 12.PAGE SETUP..............................................[line: 1798]
	 * 13.POP OVER THEORY.........................................[line: 1852]
	 * 14.DELETE MODEL DATA ON HIDDEN.............................[line: 1991]
	 * 15.HELPFUL FUNCTIONS.......................................[line: 2027]
	 * 
	 * =======================================================================
	 *       IMPORTANT: ALL CONFIG VARS IS NOW MOVED TO APP.CONFIG.JS
	 * =======================================================================
	 * 
	 * 
	 * GLOBAL: interval array (to be used with jarviswidget in ajax and 
	 * angular mode) to clear auto fetch interval
	 */
		$.intervalArr = [];
	/*
	 * Calculate nav height
	 */
	var calc_navbar_height = function() {
			var height = null;
		
			if ($('#header').length)
				height = $('#header').height();
		
			if (height === null)
				height = $('<div id="header"></div>').height();
		
			if (height === null)
				return 49;
			// default
			return height;
		},
		
		navbar_height = calc_navbar_height, 
	/*
	 * APP DOM REFERENCES
	 * Description: Obj DOM reference, please try to avoid changing these
	 */	
		shortcut_dropdown = $('#shortcut'),
		
		bread_crumb = $('#ribbon ol.breadcrumb'),
	/*
	 * Top menu on/off
	 */
		topmenu = false,
	/*
	 * desktop or mobile
	 */
		thisDevice = null,
	/*
	 * DETECT MOBILE DEVICES
	 * Description: Detects mobile device - if any of the listed device is 
	 * detected a class is inserted to $.root_ and the variable thisDevice 
	 * is decleard. (so far this is covering most hand held devices)
	 */	
		ismobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())),
	/*
	 * JS ARRAY SCRIPT STORAGE
	 * Description: used with loadScript to store script path and file name
	 * so it will not load twice
	 */	
		jsArray = {},
	/*
	 * App Initialize
	 * Description: Initializes the app with intApp();
	 */	
		initApp = (function(app) {
			
			/*
			 * ADD DEVICE TYPE
			 * Detect if mobile or desktop
			 */		
			app.addDeviceType = function() {
				
				if (!ismobile) {
					// Desktop
					$.root_.addClass("desktop-detected");
					thisDevice = "desktop";
					return false; 
				} else {
					// Mobile
					$.root_.addClass("mobile-detected");
					thisDevice = "mobile";
					
					if (fastClick) {
						// Removes the tap delay in idevices
						// dependency: js/plugin/fastclick/fastclick.js 
						$.root_.addClass("needsclick");
						FastClick.attach(document.body); 
						return false; 
					}
					
				}
				
			};
			/* ~ END: ADD DEVICE TYPE */
			
			/*
			 * CHECK FOR MENU POSITION
			 * Scans localstroage for menu position (vertical or horizontal)
			 */
			app.menuPos = function() {
				
			 	if ($.root_.hasClass("menu-on-top") || localStorage.getItem('sm-setmenu')=='top' ) { 
			 		topmenu = true;
			 		$.root_.addClass("menu-on-top");
			 	}
			};
			/* ~ END: CHECK MOBILE DEVICE */
	
			/*
			 * SMART ACTIONS
			 */
			app.SmartActions = function(){
					
				var smartActions = {
				    
				    // LOGOUT MSG 
				    userLogout: function($this){
				
						// ask verification
						$.SmartMessageBox({
							title : "<i class='fa fa-sign-out txt-color-orangeDark'></i> Logout <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
							content : $this.data('logout-msg') || "You can improve your security further after logging out by closing this opened browser",
							buttons : '[No][Yes]'
				
						}, function(ButtonPressed) {
							if (ButtonPressed == "Yes") {
								$.root_.addClass('animated fadeOutUp');
								setTimeout(logout, 1000);
							}
						});
						function logout() {
							window.location = $this.attr('href');
						}
				
					},
			
					// RESET WIDGETS
				    resetWidgets: function($this){
						
						$.SmartMessageBox({
							title : "<i class='fa fa-refresh' style='color:green'></i> Clear Local Storage",
							content : $this.data('reset-msg') || "Would you like to RESET all your saved widgets and clear LocalStorage?1",
							buttons : '[No][Yes]'
						}, function(ButtonPressed) {
							if (ButtonPressed == "Yes" && localStorage) {
								localStorage.clear();
								location.reload();
							}
				
						});
				    },
				    
				    // LAUNCH FULLSCREEN 
				    launchFullscreen: function(element){
				
						if (!$.root_.hasClass("full-screen")) {
					
							$.root_.addClass("full-screen");
					
							if (element.requestFullscreen) {
								element.requestFullscreen();
							} else if (element.mozRequestFullScreen) {
								element.mozRequestFullScreen();
							} else if (element.webkitRequestFullscreen) {
								element.webkitRequestFullscreen();
							} else if (element.msRequestFullscreen) {
								element.msRequestFullscreen();
							}
					
						} else {
							
							$.root_.removeClass("full-screen");
							
							if (document.exitFullscreen) {
								document.exitFullscreen();
							} else if (document.mozCancelFullScreen) {
								document.mozCancelFullScreen();
							} else if (document.webkitExitFullscreen) {
								document.webkitExitFullscreen();
							}
					
						}
				
				   },
				
				   // MINIFY MENU
				    minifyMenu: function($this){
				    	if (!$.root_.hasClass("menu-on-top")){
							$.root_.toggleClass("minified");
							$.root_.removeClass("hidden-menu");
							$('html').removeClass("hidden-menu-mobile-lock");
							$this.effect("highlight", {}, 500);
						}
				    },
				    
				    // TOGGLE MENU 
				    toggleMenu: function(){
				    	if (!$.root_.hasClass("menu-on-top")){
							$('html').toggleClass("hidden-menu-mobile-lock");
							$.root_.toggleClass("hidden-menu");
							$.root_.removeClass("minified");
				    	//} else if ( $.root_.hasClass("menu-on-top") && $.root_.hasClass("mobile-view-activated") ) {
				    	// suggested fix from Christian Jäger	
				    	} else if ( $.root_.hasClass("menu-on-top") && $(window).width() < 979 ) {	
				    		$('html').toggleClass("hidden-menu-mobile-lock");
							$.root_.toggleClass("hidden-menu");
							$.root_.removeClass("minified");
				    	}
				    },     
				
				    // TOGGLE SHORTCUT 
				    toggleShortcut: function(){
				    	
						if (shortcut_dropdown.is(":visible")) {
							shortcut_buttons_hide();
						} else {
							shortcut_buttons_show();
						}
			
						// SHORT CUT (buttons that appear when clicked on user name)
						shortcut_dropdown.find('a').click(function(e) {
							e.preventDefault();
							window.location = $(this).attr('href');
							setTimeout(shortcut_buttons_hide, 300);
					
						});
					
						// SHORTCUT buttons goes away if mouse is clicked outside of the area
						$(document).mouseup(function(e) {
							if (!shortcut_dropdown.is(e.target) && shortcut_dropdown.has(e.target).length === 0) {
								shortcut_buttons_hide();
							}
						});
						
						// SHORTCUT ANIMATE HIDE
						function shortcut_buttons_hide() {
							shortcut_dropdown.animate({
								height : "hide"
							}, 300, "easeOutCirc");
							$.root_.removeClass('shortcut-on');
					
						}
					
						// SHORTCUT ANIMATE SHOW
						function shortcut_buttons_show() {
							shortcut_dropdown.animate({
								height : "show"
							}, 200, "easeOutCirc");
							$.root_.addClass('shortcut-on');
						}
				
				    }  
				   
				};
					
				$.root_.on('click', '[data-action="userLogout"]', function(e) {
					var $this = $(this);
					smartActions.userLogout($this);
					e.preventDefault();
					
					//clear memory reference
					$this = null;
					
				}); 
	
				/*
				 * BUTTON ACTIONS 
				 */		
				$.root_.on('click', '[data-action="resetWidgets"]', function(e) {	
					var $this = $(this);
					smartActions.resetWidgets($this);
					e.preventDefault();
					
					//clear memory reference
					$this = null;
				});
				
				$.root_.on('click', '[data-action="launchFullscreen"]', function(e) {	
					smartActions.launchFullscreen(document.documentElement);
					e.preventDefault();
				}); 
				
				$.root_.on('click', '[data-action="minifyMenu"]', function(e) {
					var $this = $(this);
					smartActions.minifyMenu($this);
					e.preventDefault();
					
					//clear memory reference
					$this = null;
				}); 
				
				$.root_.on('click', '[data-action="toggleMenu"]', function(e) {	
					smartActions.toggleMenu();
					e.preventDefault();
				});  
			
				$.root_.on('click', '[data-action="toggleShortcut"]', function(e) {	
					smartActions.toggleShortcut();
					e.preventDefault();
				}); 
						
			};
			/* ~ END: SMART ACTIONS */
			
			/*
			 * ACTIVATE NAVIGATION
			 * Description: Activation will fail if top navigation is on
			 */
			app.leftNav = function(){
				
				// INITIALIZE LEFT NAV
				if (!topmenu) {
					if (!null) {
						$('nav ul').jarvismenu({
							accordion : menu_accordion || true,
							speed : menu_speed || true,
							closedSign : '<em class="fa fa-plus-square-o"></em>',
							openedSign : '<em class="fa fa-minus-square-o"></em>'
						});
					} else {
						alert("Error - menu anchor does not exist");
					}
				}
				
			};
			/* ~ END: ACTIVATE NAVIGATION */
			
			/*
			 * MISCELANEOUS DOM READY FUNCTIONS
			 * Description: fire with jQuery(document).ready...
			 */
			app.domReadyMisc = function() {
				
				/*
				 * FIRE TOOLTIPS
				 */
				if ($("[rel=tooltip]").length) {
					$("[rel=tooltip]").tooltip();
				}
			
				// SHOW & HIDE MOBILE SEARCH FIELD
				$('#search-mobile').click(function() {
					$.root_.addClass('search-mobile');
				});
			
				$('#cancel-search-js').click(function() {
					$.root_.removeClass('search-mobile');
				});
			
				// ACTIVITY
				// ajax drop
				$('#activity').click(function(e) {
					var $this = $(this);
			
					if ($this.find('.badge').hasClass('bg-color-red')) {
						$this.find('.badge').removeClassPrefix('bg-color-');
						$this.find('.badge').text("0");
					}
			
					if (!$this.next('.ajax-dropdown').is(':visible')) {
						$this.next('.ajax-dropdown').fadeIn(150);
						$this.addClass('active');
					} else {
						$this.next('.ajax-dropdown').fadeOut(150);
						$this.removeClass('active');
					}
			
					var theUrlVal = $this.next('.ajax-dropdown').find('.btn-group > .active > input').attr('id');
					
					//clear memory reference
					$this = null;
					theUrlVal = null;
							
					e.preventDefault();
				});
			
				$('input[name="activity"]').change(function() {
					var $this = $(this);
			
					url = $this.attr('id');
					container = $('.ajax-notifications');
					
					loadURL(url, container);
					
					//clear memory reference
					$this = null;		
				});
			
				// close dropdown if mouse is not inside the area of .ajax-dropdown
				$(document).mouseup(function(e) {
					if (!$('.ajax-dropdown').is(e.target) && $('.ajax-dropdown').has(e.target).length === 0) {
						$('.ajax-dropdown').fadeOut(150);
						$('.ajax-dropdown').prev().removeClass("active");
					}
				});
				
				// loading animation (demo purpose only)
				$('button[data-btn-loading]').on('click', function() {
					var btn = $(this);
					btn.button('loading');
					setTimeout(function() {
						btn.button('reset');
					}, 3000);
				});
			
				// NOTIFICATION IS PRESENT
				// Change color of lable once notification button is clicked
	
				$this = $('#activity > .badge');
		
				if (parseInt($this.text()) > 0) {
					$this.addClass("bg-color-red bounceIn animated");
					
					//clear memory reference
					$this = null;
				}
	
				//PageExpander 
				/*function PageExpander(){
					console.log("TickTimer ~");
					var pageHeight = $("#content").height() + $("#header") +;
				}
		
				$(window).bind("load resize scroll", function () {
			        if ($.root_.hasClass("desktop-detected")){
			            PageExpander();
			        }
			    });*/
	
				
			};
			/* ~ END: MISCELANEOUS DOM */
		
			/*
			 * MISCELANEOUS DOM READY FUNCTIONS
			 * Description: fire with jQuery(document).ready...
			 */
			app.mobileCheckActivation = function(){
				
				if ($(window).width() < 979) {
					$.root_.addClass('mobile-view-activated');
					$.root_.removeClass('minified');
				} else if ($.root_.hasClass('mobile-view-activated')) {
					$.root_.removeClass('mobile-view-activated');
				}
	
				if (debugState){
					console.log("mobileCheckActivation");
				}
				
			} 
			/* ~ END: MISCELANEOUS DOM */
	
			return app;
			
		})({});
	
		initApp.addDeviceType();
		initApp.menuPos();
	/*
	 * DOCUMENT LOADED EVENT
	 * Description: Fire when DOM is ready
	 */
		jQuery(document).ready(function() {
			
			initApp.SmartActions();
			initApp.leftNav();
			initApp.domReadyMisc();
			initApp.mobileCheckActivation();
		});
	/*
	 * RESIZER WITH THROTTLE
	 * Source: http://benalman.com/code/projects/jquery-resize/examples/resize/
	 */
		(function ($, window, undefined) {
		
		    var elems = $([]),
		        jq_resize = $.resize = $.extend($.resize, {}),
		        timeout_id, str_setTimeout = 'setTimeout',
		        str_resize = 'resize',
		        str_data = str_resize + '-special-event',
		        str_delay = 'delay',
		        str_throttle = 'throttleWindow';
		
		    jq_resize[str_delay] = throttle_delay;
		
		    jq_resize[str_throttle] = true;
		
		    $.event.special[str_resize] = {
		
		        setup: function () {
		            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
		                return false;
		            }
		
		            var elem = $(this);
		            elems = elems.add(elem);
		            try {
		                $.data(this, str_data, {
		                    w: elem.width(),
		                    h: elem.height()
		                });
		            } catch (e) {
		                $.data(this, str_data, {
		                    w: elem.width, // elem.width();
		                    h: elem.height // elem.height();
		                });
		            }
		
		            if (elems.length === 1) {
		                loopy();
		            }
		        },
		        teardown: function () {
		            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
		                return false;
		            }
		
		            var elem = $(this);
		            elems = elems.not(elem);
		            elem.removeData(str_data);
		            if (!elems.length) {
		                clearTimeout(timeout_id);
		            }
		        },
		
		        add: function (handleObj) {
		            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
		                return false;
		            }
		            var old_handler;
		
		            function new_handler(e, w, h) {
		                var elem = $(this),
		                    data = $.data(this, str_data);
		                data.w = w !== undefined ? w : elem.width();
		                data.h = h !== undefined ? h : elem.height();
		
		                old_handler.apply(this, arguments);
		            }
		            if ($.isFunction(handleObj)) {
		                old_handler = handleObj;
		                return new_handler;
		            } else {
		                old_handler = handleObj.handler;
		                handleObj.handler = new_handler;
		            }
		        }
		    };
		
		    function loopy() {
		        timeout_id = window[str_setTimeout](function () {
		            elems.each(function () {
		                var width;
		                var height;
		
		                var elem = $(this),
		                    data = $.data(this, str_data); //width = elem.width(), height = elem.height();
		
		                // Highcharts fix
		                try {
		                    width = elem.width();
		                } catch (e) {
		                    width = elem.width;
		                }
		
		                try {
		                    height = elem.height();
		                } catch (e) {
		                    height = elem.height;
		                }
		                //fixed bug
		
		
		                if (width !== data.w || height !== data.h) {
		                    elem.trigger(str_resize, [data.w = width, data.h = height]);
		                }
		
		            });
		            loopy();
		
		        }, jq_resize[str_delay]);
		
		    }
		
		})(jQuery, this);
	/*
	* ADD CLASS WHEN BELOW CERTAIN WIDTH (MOBILE MENU)
	* Description: tracks the page min-width of #CONTENT and NAV when navigation is resized.
	* This is to counter bugs for minimum page width on many desktop and mobile devices.
	* Note: This script utilizes JSthrottle script so don't worry about memory/CPU usage
	*/
		$('#main').resize(function() {
			
			initApp.mobileCheckActivation();
			
		});
	
	/* ~ END: NAV OR #LEFT-BAR RESIZE DETECT */
	
	/*
	 * DETECT IE VERSION
	 * Description: A short snippet for detecting versions of IE in JavaScript
	 * without resorting to user-agent sniffing
	 * RETURNS:
	 * If you're not in IE (or IE version is less than 5) then:
	 * //ie === undefined
	 *
	 * If you're in IE (>=5) then you can determine which version:
	 * // ie === 7; // IE7
	 *
	 * Thus, to detect IE:
	 * // if (ie) {}
	 *
	 * And to detect the version:
	 * ie === 6 // IE6
	 * ie > 7 // IE8, IE9 ...
	 * ie < 9 // Anything less than IE9
	 */
	// TODO: delete this function later - no longer needed (?)
		var ie = ( function() {
		
			var undef, v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
		
			while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);
		
			return v > 4 ? v : undef;
		
		}()); 
	/* ~ END: DETECT IE VERSION */
	
	/*
	 * CUSTOM MENU PLUGIN
	 */
		$.fn.extend({
		
			//pass the options variable to the function
			jarvismenu : function(options) {
		
				var defaults = {
					accordion : 'true',
					speed : 200,
					closedSign : '[+]',
					openedSign : '[-]'
				},
		
				// Extend our default options with those provided.
					opts = $.extend(defaults, options),
				//Assign current element to variable, in this case is UL element
					$this = $(this);
		
				//add a mark [+] to a multilevel menu
				$this.find("li").each(function() {
					if ($(this).find("ul").size() !== 0) {
						//add the multilevel sign next to the link
						$(this).find("a:first").append("<b class='collapse-sign'>" + opts.closedSign + "</b>");
		
						//avoid jumping to the top of the page when the href is an #
						if ($(this).find("a:first").attr('href') == "#") {
							$(this).find("a:first").click(function() {
								return false;
							});
						}
					}
				});
		
				//open active level
				$this.find("li.active").each(function() {
					$(this).parents("ul").slideDown(opts.speed);
					$(this).parents("ul").parent("li").find("b:first").html(opts.openedSign);
					$(this).parents("ul").parent("li").addClass("open");
				});
		
				$this.find("li a").click(function() {
		
					if ($(this).parent().find("ul").size() !== 0) {
		
						if (opts.accordion) {
							//Do nothing when the list is open
							if (!$(this).parent().find("ul").is(':visible')) {
								parents = $(this).parent().parents("ul");
								visible = $this.find("ul:visible");
								visible.each(function(visibleIndex) {
									var close = true;
									parents.each(function(parentIndex) {
										if (parents[parentIndex] == visible[visibleIndex]) {
											close = false;
											return false;
										}
									});
									if (close) {
										if ($(this).parent().find("ul") != visible[visibleIndex]) {
											$(visible[visibleIndex]).slideUp(opts.speed, function() {
												$(this).parent("li").find("b:first").html(opts.closedSign);
												$(this).parent("li").removeClass("open");
											});
		
										}
									}
								});
							}
						}// end if
						if ($(this).parent().find("ul:first").is(":visible") && !$(this).parent().find("ul:first").hasClass("active")) {
							$(this).parent().find("ul:first").slideUp(opts.speed, function() {
								$(this).parent("li").removeClass("open");
								$(this).parent("li").find("b:first").delay(opts.speed).html(opts.closedSign);
							});
		
						} else {
							$(this).parent().find("ul:first").slideDown(opts.speed, function() {
								/*$(this).effect("highlight", {color : '#616161'}, 500); - disabled due to CPU clocking on phones*/
								$(this).parent("li").addClass("open");
								$(this).parent("li").find("b:first").delay(opts.speed).html(opts.openedSign);
							});
						} // end else
					} // end if
				});
			} // end function
		});
	/* ~ END: CUSTOM MENU PLUGIN */
	
	/*
	 * ELEMENT EXIST OR NOT
	 * Description: returns true or false
	 * Usage: $('#myDiv').doesExist();
	 */
		jQuery.fn.doesExist = function() {
			return jQuery(this).length > 0;
		};
	/* ~ END: ELEMENT EXIST OR NOT */
	
	/*
	 * INITIALIZE FORMS
	 * Description: Select2, Masking, Datepicker, Autocomplete
	 */	
		function runAllForms() {
		
			/*
			 * BOOTSTRAP SLIDER PLUGIN
			 * Usage:
			 * Dependency: js/plugin/bootstrap-slider
			 */
			if ($.fn.slider) {
				$('.slider').slider();
			}
		
			/*
			 * SELECT2 PLUGIN
			 * Usage:
			 * Dependency: js/plugin/select2/
			 */
			if ($.fn.select2) {
				$('select.select2').each(function() {
					var $this = $(this),
						width = $this.attr('data-select-width') || '100%';
					//, _showSearchInput = $this.attr('data-select-search') === 'true';
					$this.select2({
						//showSearchInput : _showSearchInput,
						allowClear : true,
						width : width
					});
	
					//clear memory reference
					$this = null;
				});
			}
		
			/*
			 * MASKING
			 * Dependency: js/plugin/masked-input/
			 */
			if ($.fn.mask) {
				$('[data-mask]').each(function() {
		
					var $this = $(this),
						mask = $this.attr('data-mask') || 'error...', mask_placeholder = $this.attr('data-mask-placeholder') || 'X';
		
					$this.mask(mask, {
						placeholder : mask_placeholder
					});
					
					//clear memory reference
					$this = null;
				});
			}
		
			/*
			 * AUTOCOMPLETE
			 * Dependency: js/jqui
			 */
			if ($.fn.autocomplete) {
				$('[data-autocomplete]').each(function() {
		
					var $this = $(this),
						availableTags = $this.data('autocomplete') || ["The", "Quick", "Brown", "Fox", "Jumps", "Over", "Three", "Lazy", "Dogs"];
		
					$this.autocomplete({
						source : availableTags
					});
					
					//clear memory reference
					$this = null;
				});
			}
		
			/*
			 * JQUERY UI DATE
			 * Dependency: js/libs/jquery-ui-1.10.3.min.js
			 * Usage: <input class="datepicker" />
			 */
			if ($.fn.datepicker) {
				$('.datepicker').each(function() {
		
					var $this = $(this),
						dataDateFormat = $this.attr('data-dateformat') || 'dd.mm.yy';
		
					$this.datepicker({
						dateFormat : dataDateFormat,
						prevText : '<i class="fa fa-chevron-left"></i>',
						nextText : '<i class="fa fa-chevron-right"></i>',
					});
					
					//clear memory reference
					$this = null;
				});
			}
		
			/*
			 * AJAX BUTTON LOADING TEXT
			 * Usage: <button type="button" data-loading-text="Loading..." class="btn btn-xs btn-default ajax-refresh"> .. </button>
			 */
			$('button[data-loading-text]').on('click', function() {
				var btn = $(this);
				btn.button('loading');
				setTimeout(function() {
					btn.button('reset');
					//clear memory reference
					btn = null;
				}, 3000);
	
			});
		
		}
	/* ~ END: INITIALIZE FORMS */
	
	/*
	 * INITIALIZE CHARTS
	 * Description: Sparklines, PieCharts
	 */
		function runAllCharts() {
			/*
			 * SPARKLINES
			 * DEPENDENCY: js/plugins/sparkline/jquery.sparkline.min.js
			 * See usage example below...
			 */
		
			/* Usage:
			 * 		<div class="sparkline-line txt-color-blue" data-fill-color="transparent" data-sparkline-height="26px">
			 *			5,6,7,9,9,5,9,6,5,6,6,7,7,6,7,8,9,7
			 *		</div>
			 */
		
			if ($.fn.sparkline) {
		
				// variable declearations:
		
				var barColor,
				    sparklineHeight,
				    sparklineBarWidth,
				    sparklineBarSpacing,
				    sparklineNegBarColor,
				    sparklineStackedColor,
				    thisLineColor,
				    thisLineWidth,
				    thisFill,
				    thisSpotColor,
				    thisMinSpotColor,
				    thisMaxSpotColor,
				    thishighlightSpotColor,
				    thisHighlightLineColor,
				    thisSpotRadius,			        
					pieColors,
				    pieWidthHeight,
				    pieBorderColor,
				    pieOffset,
				 	thisBoxWidth,
				    thisBoxHeight,
				    thisBoxRaw,
				    thisBoxTarget,
				    thisBoxMin,
				    thisBoxMax,
				    thisShowOutlier,
				    thisIQR,
				    thisBoxSpotRadius,
				    thisBoxLineColor,
				    thisBoxFillColor,
				    thisBoxWhisColor,
				    thisBoxOutlineColor,
				    thisBoxOutlineFill,
				    thisBoxMedianColor,
				    thisBoxTargetColor,
					thisBulletHeight,
				    thisBulletWidth,
				    thisBulletColor,
				    thisBulletPerformanceColor,
				    thisBulletRangeColors,
					thisDiscreteHeight,
				    thisDiscreteWidth,
				    thisDiscreteLineColor,
				    thisDiscreteLineHeight,
				    thisDiscreteThrushold,
				    thisDiscreteThrusholdColor,
					thisTristateHeight,
				    thisTristatePosBarColor,
				    thisTristateNegBarColor,
				    thisTristateZeroBarColor,
				    thisTristateBarWidth,
				    thisTristateBarSpacing,
				    thisZeroAxis,
				    thisBarColor,
				    sparklineWidth,
				    sparklineValue,
				    sparklineValueSpots1,
				    sparklineValueSpots2,
				    thisLineWidth1,
				    thisLineWidth2,
				    thisLineColor1,
				    thisLineColor2,
				    thisSpotRadius1,
				    thisSpotRadius2,
				    thisMinSpotColor1,
				    thisMaxSpotColor1,
				    thisMinSpotColor2,
				    thisMaxSpotColor2,
				    thishighlightSpotColor1,
				    thisHighlightLineColor1,
				    thishighlightSpotColor2,
				    thisFillColor1,
				    thisFillColor2;
						    				    	
				$('.sparkline:not(:has(>canvas))').each(function() {
					var $this = $(this),
						sparklineType = $this.data('sparkline-type') || 'bar';
		
					// BAR CHART
					if (sparklineType == 'bar') {
		
							barColor = $this.data('sparkline-bar-color') || $this.css('color') || '#0000f0';
						    sparklineHeight = $this.data('sparkline-height') || '26px';
						    sparklineBarWidth = $this.data('sparkline-barwidth') || 5;
						    sparklineBarSpacing = $this.data('sparkline-barspacing') || 2;
						    sparklineNegBarColor = $this.data('sparkline-negbar-color') || '#A90329';
						    sparklineStackedColor = $this.data('sparkline-barstacked-color') || ["#A90329", "#0099c6", "#98AA56", "#da532c", "#4490B1", "#6E9461", "#990099", "#B4CAD3"];
						        
						$this.sparkline('html', {
							barColor : barColor,
							type : sparklineType,
							height : sparklineHeight,
							barWidth : sparklineBarWidth,
							barSpacing : sparklineBarSpacing,
							stackedBarColor : sparklineStackedColor,
							negBarColor : sparklineNegBarColor,
							zeroAxis : 'false'
						});
						
						$this = null;
		
					}
		
					// LINE CHART
					if (sparklineType == 'line') {
		
							sparklineHeight = $this.data('sparkline-height') || '20px';
						    sparklineWidth = $this.data('sparkline-width') || '90px';
						    thisLineColor = $this.data('sparkline-line-color') || $this.css('color') || '#0000f0';
						    thisLineWidth = $this.data('sparkline-line-width') || 1;
						    thisFill = $this.data('fill-color') || '#c0d0f0';
						    thisSpotColor = $this.data('sparkline-spot-color') || '#f08000';
						    thisMinSpotColor = $this.data('sparkline-minspot-color') || '#ed1c24';
						    thisMaxSpotColor = $this.data('sparkline-maxspot-color') || '#f08000';
						    thishighlightSpotColor = $this.data('sparkline-highlightspot-color') || '#50f050';
						    thisHighlightLineColor = $this.data('sparkline-highlightline-color') || 'f02020';
						    thisSpotRadius = $this.data('sparkline-spotradius') || 1.5;
							thisChartMinYRange = $this.data('sparkline-min-y') || 'undefined'; 
							thisChartMaxYRange = $this.data('sparkline-max-y') || 'undefined'; 
							thisChartMinXRange = $this.data('sparkline-min-x') || 'undefined'; 
							thisChartMaxXRange = $this.data('sparkline-max-x') || 'undefined'; 
							thisMinNormValue = $this.data('min-val') || 'undefined'; 
							thisMaxNormValue = $this.data('max-val') || 'undefined'; 
							thisNormColor =  $this.data('norm-color') || '#c0c0c0';
							thisDrawNormalOnTop = $this.data('draw-normal') || false;
						    
						$this.sparkline('html', {
							type : 'line',
							width : sparklineWidth,
							height : sparklineHeight,
							lineWidth : thisLineWidth,
							lineColor : thisLineColor,
							fillColor : thisFill,
							spotColor : thisSpotColor,
							minSpotColor : thisMinSpotColor,
							maxSpotColor : thisMaxSpotColor,
							highlightSpotColor : thishighlightSpotColor,
							highlightLineColor : thisHighlightLineColor,
							spotRadius : thisSpotRadius,
							chartRangeMin : thisChartMinYRange,
							chartRangeMax : thisChartMaxYRange,
							chartRangeMinX : thisChartMinXRange,
							chartRangeMaxX : thisChartMaxXRange,
							normalRangeMin : thisMinNormValue,
							normalRangeMax : thisMaxNormValue,
							normalRangeColor : thisNormColor,
							drawNormalOnTop : thisDrawNormalOnTop
		
						});
						
						$this = null;
		
					}
		
					// PIE CHART
					if (sparklineType == 'pie') {
		
							pieColors = $this.data('sparkline-piecolor') || ["#B4CAD3", "#4490B1", "#98AA56", "#da532c","#6E9461", "#0099c6", "#990099", "#717D8A"];
						    pieWidthHeight = $this.data('sparkline-piesize') || 90;
						    pieBorderColor = $this.data('border-color') || '#45494C';
						    pieOffset = $this.data('sparkline-offset') || 0;
						    
						$this.sparkline('html', {
							type : 'pie',
							width : pieWidthHeight,
							height : pieWidthHeight,
							tooltipFormat : '<span style="color: {{color}}">&#9679;</span> ({{percent.1}}%)',
							sliceColors : pieColors,
							borderWidth : 1,
							offset : pieOffset,
							borderColor : pieBorderColor
						});
						
						$this = null;
		
					}
		
					// BOX PLOT
					if (sparklineType == 'box') {
		
							thisBoxWidth = $this.data('sparkline-width') || 'auto';
						    thisBoxHeight = $this.data('sparkline-height') || 'auto';
						    thisBoxRaw = $this.data('sparkline-boxraw') || false;
						    thisBoxTarget = $this.data('sparkline-targetval') || 'undefined';
						    thisBoxMin = $this.data('sparkline-min') || 'undefined';
						    thisBoxMax = $this.data('sparkline-max') || 'undefined';
						    thisShowOutlier = $this.data('sparkline-showoutlier') || true;
						    thisIQR = $this.data('sparkline-outlier-iqr') || 1.5;
						    thisBoxSpotRadius = $this.data('sparkline-spotradius') || 1.5;
						    thisBoxLineColor = $this.css('color') || '#000000';
						    thisBoxFillColor = $this.data('fill-color') || '#c0d0f0';
						    thisBoxWhisColor = $this.data('sparkline-whis-color') || '#000000';
						    thisBoxOutlineColor = $this.data('sparkline-outline-color') || '#303030';
						    thisBoxOutlineFill = $this.data('sparkline-outlinefill-color') || '#f0f0f0';
						    thisBoxMedianColor = $this.data('sparkline-outlinemedian-color') || '#f00000';
						    thisBoxTargetColor = $this.data('sparkline-outlinetarget-color') || '#40a020';
						    
						$this.sparkline('html', {
							type : 'box',
							width : thisBoxWidth,
							height : thisBoxHeight,
							raw : thisBoxRaw,
							target : thisBoxTarget,
							minValue : thisBoxMin,
							maxValue : thisBoxMax,
							showOutliers : thisShowOutlier,
							outlierIQR : thisIQR,
							spotRadius : thisBoxSpotRadius,
							boxLineColor : thisBoxLineColor,
							boxFillColor : thisBoxFillColor,
							whiskerColor : thisBoxWhisColor,
							outlierLineColor : thisBoxOutlineColor,
							outlierFillColor : thisBoxOutlineFill,
							medianColor : thisBoxMedianColor,
							targetColor : thisBoxTargetColor
		
						});
						
						$this = null;
		
					}
		
					// BULLET
					if (sparklineType == 'bullet') {
		
						var thisBulletHeight = $this.data('sparkline-height') || 'auto';
						    thisBulletWidth = $this.data('sparkline-width') || 2;
						    thisBulletColor = $this.data('sparkline-bullet-color') || '#ed1c24';
						    thisBulletPerformanceColor = $this.data('sparkline-performance-color') || '#3030f0';
						    thisBulletRangeColors = $this.data('sparkline-bulletrange-color') || ["#d3dafe", "#a8b6ff", "#7f94ff"];
						    
						$this.sparkline('html', {
		
							type : 'bullet',
							height : thisBulletHeight,
							targetWidth : thisBulletWidth,
							targetColor : thisBulletColor,
							performanceColor : thisBulletPerformanceColor,
							rangeColors : thisBulletRangeColors
		
						});
						
						$this = null;
		
					}
		
					// DISCRETE
					if (sparklineType == 'discrete') {
		
						 	thisDiscreteHeight = $this.data('sparkline-height') || 26;
						    thisDiscreteWidth = $this.data('sparkline-width') || 50;
						    thisDiscreteLineColor = $this.css('color');
						    thisDiscreteLineHeight = $this.data('sparkline-line-height') || 5;
						    thisDiscreteThrushold = $this.data('sparkline-threshold') || 'undefined';
						    thisDiscreteThrusholdColor = $this.data('sparkline-threshold-color') || '#ed1c24';
						    
						$this.sparkline('html', {
		
							type : 'discrete',
							width : thisDiscreteWidth,
							height : thisDiscreteHeight,
							lineColor : thisDiscreteLineColor,
							lineHeight : thisDiscreteLineHeight,
							thresholdValue : thisDiscreteThrushold,
							thresholdColor : thisDiscreteThrusholdColor
		
						});
						
						$this = null;
		
					}
		
					// TRISTATE
					if (sparklineType == 'tristate') {
		
						 	thisTristateHeight = $this.data('sparkline-height') || 26;
						    thisTristatePosBarColor = $this.data('sparkline-posbar-color') || '#60f060';
						    thisTristateNegBarColor = $this.data('sparkline-negbar-color') || '#f04040';
						    thisTristateZeroBarColor = $this.data('sparkline-zerobar-color') || '#909090';
						    thisTristateBarWidth = $this.data('sparkline-barwidth') || 5;
						    thisTristateBarSpacing = $this.data('sparkline-barspacing') || 2;
						    thisZeroAxis = $this.data('sparkline-zeroaxis') || false;
						    
						$this.sparkline('html', {
		
							type : 'tristate',
							height : thisTristateHeight,
							posBarColor : thisBarColor,
							negBarColor : thisTristateNegBarColor,
							zeroBarColor : thisTristateZeroBarColor,
							barWidth : thisTristateBarWidth,
							barSpacing : thisTristateBarSpacing,
							zeroAxis : thisZeroAxis
		
						});
						
						$this = null;
		
					}
		
					//COMPOSITE: BAR
					if (sparklineType == 'compositebar') {
		
					 	sparklineHeight = $this.data('sparkline-height') || '20px';
					    sparklineWidth = $this.data('sparkline-width') || '100%';
					    sparklineBarWidth = $this.data('sparkline-barwidth') || 3;
					    thisLineWidth = $this.data('sparkline-line-width') || 1;
					    thisLineColor = $this.data('data-sparkline-linecolor') || '#ed1c24';
					    thisBarColor = $this.data('data-sparkline-barcolor') || '#333333';
						    
						$this.sparkline($this.data('sparkline-bar-val'), {
		
							type : 'bar',
							width : sparklineWidth,
							height : sparklineHeight,
							barColor : thisBarColor,
							barWidth : sparklineBarWidth
							//barSpacing: 5
		
						});
		
						$this.sparkline($this.data('sparkline-line-val'), {
		
							width : sparklineWidth,
							height : sparklineHeight,
							lineColor : thisLineColor,
							lineWidth : thisLineWidth,
							composite : true,
							fillColor : false
		
						});
						
						$this = null;
		
					}
		
					//COMPOSITE: LINE
					if (sparklineType == 'compositeline') {
		
							sparklineHeight = $this.data('sparkline-height') || '20px';
						    sparklineWidth = $this.data('sparkline-width') || '90px';
						    sparklineValue = $this.data('sparkline-bar-val');
						    sparklineValueSpots1 = $this.data('sparkline-bar-val-spots-top') || null;
						    sparklineValueSpots2 = $this.data('sparkline-bar-val-spots-bottom') || null;
						    thisLineWidth1 = $this.data('sparkline-line-width-top') || 1;
						    thisLineWidth2 = $this.data('sparkline-line-width-bottom') || 1;
						    thisLineColor1 = $this.data('sparkline-color-top') || '#333333';
						    thisLineColor2 = $this.data('sparkline-color-bottom') || '#ed1c24';
						    thisSpotRadius1 = $this.data('sparkline-spotradius-top') || 1.5;
						    thisSpotRadius2 = $this.data('sparkline-spotradius-bottom') || thisSpotRadius1;
						    thisSpotColor = $this.data('sparkline-spot-color') || '#f08000';
						    thisMinSpotColor1 = $this.data('sparkline-minspot-color-top') || '#ed1c24';
						    thisMaxSpotColor1 = $this.data('sparkline-maxspot-color-top') || '#f08000';
						    thisMinSpotColor2 = $this.data('sparkline-minspot-color-bottom') || thisMinSpotColor1;
						    thisMaxSpotColor2 = $this.data('sparkline-maxspot-color-bottom') || thisMaxSpotColor1;
						    thishighlightSpotColor1 = $this.data('sparkline-highlightspot-color-top') || '#50f050';
						    thisHighlightLineColor1 = $this.data('sparkline-highlightline-color-top') || '#f02020';
						    thishighlightSpotColor2 = $this.data('sparkline-highlightspot-color-bottom') ||
						        thishighlightSpotColor1;
						    thisHighlightLineColor2 = $this.data('sparkline-highlightline-color-bottom') ||
						        thisHighlightLineColor1;
						    thisFillColor1 = $this.data('sparkline-fillcolor-top') || 'transparent';
						    thisFillColor2 = $this.data('sparkline-fillcolor-bottom') || 'transparent';
						    
						$this.sparkline(sparklineValue, {
		
							type : 'line',
							spotRadius : thisSpotRadius1,
		
							spotColor : thisSpotColor,
							minSpotColor : thisMinSpotColor1,
							maxSpotColor : thisMaxSpotColor1,
							highlightSpotColor : thishighlightSpotColor1,
							highlightLineColor : thisHighlightLineColor1,
		
							valueSpots : sparklineValueSpots1,
		
							lineWidth : thisLineWidth1,
							width : sparklineWidth,
							height : sparklineHeight,
							lineColor : thisLineColor1,
							fillColor : thisFillColor1
		
						});
		
						$this.sparkline($this.data('sparkline-line-val'), {
		
							type : 'line',
							spotRadius : thisSpotRadius2,
		
							spotColor : thisSpotColor,
							minSpotColor : thisMinSpotColor2,
							maxSpotColor : thisMaxSpotColor2,
							highlightSpotColor : thishighlightSpotColor2,
							highlightLineColor : thisHighlightLineColor2,
		
							valueSpots : sparklineValueSpots2,
		
							lineWidth : thisLineWidth2,
							width : sparklineWidth,
							height : sparklineHeight,
							lineColor : thisLineColor2,
							composite : true,
							fillColor : thisFillColor2
		
						});
						
						$this = null;
		
					}
		
				});
		
			}// end if
		
			/*
			 * EASY PIE CHARTS
			 * DEPENDENCY: js/plugins/easy-pie-chart/jquery.easy-pie-chart.min.js
			 * Usage: <div class="easy-pie-chart txt-color-orangeDark" data-pie-percent="33" data-pie-size="72" data-size="72">
			 *			<span class="percent percent-sign">35</span>
			 * 	  	  </div>
			 */
		
			if ($.fn.easyPieChart) {
		
				$('.easy-pie-chart').each(function() {
					var $this = $(this),
						barColor = $this.css('color') || $this.data('pie-color'),
					    trackColor = $this.data('pie-track-color') || 'rgba(0,0,0,0.04)',
					    size = parseInt($this.data('pie-size')) || 25;
					    
					$this.easyPieChart({
						
						barColor : barColor,
						trackColor : trackColor,
						scaleColor : false,
						lineCap : 'butt',
						lineWidth : parseInt(size / 8.5),
						animate : 1500,
						rotate : -90,
						size : size,
						onStep: function(from, to, percent) {
	            			$(this.el).find('.percent').text(Math.round(percent));
	        			}
						
					});
					
					$this = null;
				});
		
			} // end if
		
		}
	/* ~ END: INITIALIZE CHARTS */
	
	/*
	 * INITIALIZE JARVIS WIDGETS
	 * Setup Desktop Widgets
	 */
		function setup_widgets_desktop() {
		
			if ($.fn.jarvisWidgets && enableJarvisWidgets) {
		
				$('#widget-grid').jarvisWidgets({
		
					grid : 'article',
					widgets : '.jarviswidget',
					localStorage : localStorageJarvisWidgets,
					deleteSettingsKey : '#deletesettingskey-options',
					settingsKeyLabel : 'Reset settings?',
					deletePositionKey : '#deletepositionkey-options',
					positionKeyLabel : 'Reset position?',
					sortable : sortableJarvisWidgets,
					buttonsHidden : false,
					// toggle button
					toggleButton : true,
					toggleClass : 'fa fa-minus | fa fa-plus',
					toggleSpeed : 200,
					onToggle : function() {
					},
					// delete btn
					deleteButton : true,
					deleteMsg:'Warning: This action cannot be undone!',
					deleteClass : 'fa fa-times',
					deleteSpeed : 200,
					onDelete : function() {
					},
					// edit btn
					editButton : true,
					editPlaceholder : '.jarviswidget-editbox',
					editClass : 'fa fa-cog | fa fa-save',
					editSpeed : 200,
					onEdit : function() {
					},
					// color button
					colorButton : true,
					// full screen
					fullscreenButton : true,
					fullscreenClass : 'fa fa-expand | fa fa-compress',
					fullscreenDiff : 3,
					onFullscreen : function() {
					},
					// custom btn
					customButton : false,
					customClass : 'folder-10 | next-10',
					customStart : function() {
						alert('Hello you, this is a custom button...');
					},
					customEnd : function() {
						alert('bye, till next time...');
					},
					// order
					buttonOrder : '%refresh% %custom% %edit% %toggle% %fullscreen% %delete%',
					opacity : 1.0,
					dragHandle : '> header',
					placeholderClass : 'jarviswidget-placeholder',
					indicator : true,
					indicatorTime : 600,
					ajax : true,
					timestampPlaceholder : '.jarviswidget-timestamp',
					timestampFormat : 'Last update: %m%/%d%/%y% %h%:%i%:%s%',
					refreshButton : true,
					refreshButtonClass : 'fa fa-refresh',
					labelError : 'Sorry but there was a error:',
					labelUpdated : 'Last Update:',
					labelRefresh : 'Refresh',
					labelDelete : 'Delete widget:',
					afterLoad : function() {
					},
					rtl : false, // best not to toggle this!
					onChange : function() {
						
					},
					onSave : function() {
						
					},
					ajaxnav : $.navAsAjax // declears how the localstorage should be saved (HTML or AJAX Version)
		
				});
		
			}
		
		}
	/*
	 * SETUP DESKTOP WIDGET
	 */
		function setup_widgets_mobile() {
		
			if (enableMobileWidgets && enableJarvisWidgets) {
				setup_widgets_desktop();
			}
		
		}
	/* ~ END: INITIALIZE JARVIS WIDGETS */
	
	/*
	 * GOOGLE MAPS
	 * description: Append google maps to head dynamically (only execute for ajax version)
	 * Loads at the begining for ajax pages
	 */
		if ($.navAsAjax || $(".google_maps")){
			var gMapsLoaded = false;
			window.gMapsCallback = function() {
				gMapsLoaded = true;
				$(window).trigger('gMapsLoaded');
			};
			window.loadGoogleMaps = function() {
				if (gMapsLoaded)
					return window.gMapsCallback();
				var script_tag = document.createElement('script');
				script_tag.setAttribute("type", "text/javascript");
				script_tag.setAttribute("src", "http://maps.google.com/maps/api/js?sensor=false&callback=gMapsCallback");
				(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
			};
		}
	/* ~ END: GOOGLE MAPS */
	
	/*
	 * LOAD SCRIPTS
	 * Usage:
	 * Define function = myPrettyCode ()...
	 * loadScript("js/my_lovely_script.js", myPrettyCode);
	 */
		function loadScript(scriptName, callback) {
		
			if (!jsArray[scriptName]) {
				jsArray[scriptName] = true;
		
				// adding the script tag to the head as suggested before
				var body = document.getElementsByTagName('body')[0],
					script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = scriptName;
		
				// then bind the event to the callback function
				// there are several events for cross browser compatibility
				script.onload = callback;
		
				// fire the loading
				body.appendChild(script);
				
				// clear DOM reference
				//body = null;
				//script = null;
		
			} else if (callback) {
				// changed else to else if(callback)
				if (debugState){
					root.root.console.log("This script was already loaded %c: " + scriptName, debugStyle_warning);
				}
				//execute function
				callback();
			}
		
		}
	/* ~ END: LOAD SCRIPTS */
	
	/*
	* APP AJAX REQUEST SETUP
	* Description: Executes and fetches all ajax requests also
	* updates naivgation elements to active
	*/
		if($.navAsAjax) {
		    // fire this on page load if nav exists
		    if ($('nav').length) {
			    checkURL();
		    }
		
		    $(document).on('click', 'nav a[href!="#"]', function(e) {
			    e.preventDefault();
			    var $this = $(e.currentTarget);
		
			    // if parent is not active then get hash, or else page is assumed to be loaded
				if (!$this.parent().hasClass("active") && !$this.attr('target')) {
		
				    // update window with hash
				    // you could also do here:  thisDevice === "mobile" - and save a little more memory
		
				    if ($.root_.hasClass('mobile-view-activated')) {
					    $.root_.removeClass('hidden-menu');
					    $('html').removeClass("hidden-menu-mobile-lock");
					    window.setTimeout(function() {
							if (window.location.search) {
								window.location.href =
									window.location.href.replace(window.location.search, '')
										.replace(window.location.hash, '') + '#' + $this.attr('href');
							} else {
								window.location.hash = $this.attr('href');
							}
					    }, 150);
					    // it may not need this delay...
				    } else {
						if (window.location.search) {
							window.location.href =
								window.location.href.replace(window.location.search, '')
									.replace(window.location.hash, '') + '#' + $this.attr('href');
						} else {
							window.location.hash = $this.attr('href');
						}
				    }
				    
				    // clear DOM reference
				    // $this = null;
			    }
		
		    });
		
		    // fire links with targets on different window
		    $(document).on('click', 'nav a[target="_blank"]', function(e) {
			    e.preventDefault();
			    var $this = $(e.currentTarget);
		
			    window.open($this.attr('href'));
		    });
		
		    // fire links with targets on same window
		    $(document).on('click', 'nav a[target="_top"]', function(e) {
			    e.preventDefault();
			    var $this = $(e.currentTarget);
		
			    window.location = ($this.attr('href'));
		    });
		
		    // all links with hash tags are ignored
		    $(document).on('click', 'nav a[href="#"]', function(e) {
			    e.preventDefault();
		    });
		
		    // DO on hash change
		    $(window).on('hashchange', function() {
			    checkURL();
		    });
		}
	/*
	 * CHECK TO SEE IF URL EXISTS
	 */
		function checkURL() {
		
			//get the url by removing the hash
			//var url = location.hash.replace(/^#/, '');
			var url = location.href.split('#').splice(1).join('#');
			//BEGIN: IE11 Work Around
			if (!url) {
			
				try {
					var documentUrl = window.document.URL;
					if (documentUrl) {
						if (documentUrl.indexOf('#', 0) > 0 && documentUrl.indexOf('#', 0) < (documentUrl.length + 1)) {
							url = documentUrl.substring(documentUrl.indexOf('#', 0) + 1);
			
						}
			
					}
			
				} catch (err) {}
			}
			//END: IE11 Work Around
		
			container = $('#content');
			// Do this if url exists (for page refresh, etc...)
			if (url) {
				// remove all active class
				$('nav li.active').removeClass("active");
				// match the url and add the active class
				$('nav li:has(a[href="' + url + '"])').addClass("active");
				var title = ($('nav a[href="' + url + '"]').attr('title'));
		
				// change page title from global var
				document.title = (title || document.title);
				
				// debugState
				if (debugState){
					root.console.log("Page title: %c " + document.title, debugStyle_green);
				}
				
				// parse url to jquery
				loadURL(url + location.search, container);
	
			} else {
		
				// grab the first URL from nav
				var $this = $('nav > ul > li:first-child > a[href!="#"]');
		
				//update hash
				window.location.hash = $this.attr('href');
				
				//clear dom reference
				$this = null;
		
			}
		
		}
	/*
	 * LOAD AJAX PAGES
	 */ 
		function loadURL(url, container) {
	
			// debugState
			if (debugState){
				root.root.console.log("Loading URL: %c" + url, debugStyle);
			}
	
			$.ajax({
				type : "GET",
				url : url,
				dataType : 'html',
				cache : true, // (warning: setting it to false will cause a timestamp and will call the request twice)
				beforeSend : function() {
					
					//IE11 bug fix for googlemaps (delete all google map instances)
					//check if the page is ajax = true, has google map class and the container is #content
					if ($.navAsAjax && $(".google_maps")[0] && (container[0] == $("#content")[0]) ) {
						
						// target gmaps if any on page
						var collection = $(".google_maps"),
							i = 0;
						// run for each	map
						collection.each(function() {
						    i ++;
						    // get map id from class elements
						    var divDealerMap = document.getElementById(this.id);
						    
						    if(i == collection.length + 1) {
							    // "callback"
							} else {
								// destroy every map found
								if (divDealerMap) divDealerMap.parentNode.removeChild(divDealerMap);
	
								// debugState
								if (debugState){
									root.console.log("Destroying maps.........%c" + this.id, debugStyle_warning);
								}
							}
						});
	
						// debugState
						if (debugState){
							root.console.log("✔ Google map instances nuked!!!");
						}
						
					} //end fix
					
					// destroy all datatable instances
					if ( $.navAsAjax && $('.dataTables_wrapper')[0] && (container[0] == $("#content")[0]) ) {
						
						var tables = $.fn.dataTable.fnTables(true);				
						$(tables).each(function () {
							
							if($(this).find('.details-control').length != 0) {
								$(this).find('*').addBack().off().remove();
								$(this).dataTable().fnDestroy();
							} else {
								$(this).dataTable().fnDestroy();
							}
						    
						});
						
						// debugState
						if (debugState){
							root.console.log("✔ Datatable instances nuked!!!");
						}
					}
					// end destroy
					
					// pop intervals (destroys jarviswidget related intervals)
					if ( $.navAsAjax && $.intervalArr.length > 0 && (container[0] == $("#content")[0]) && enableJarvisWidgets ) {
						
						while($.intervalArr.length > 0)
		        			clearInterval($.intervalArr.pop());
		        			// debugState
							if (debugState){
								root.console.log("✔ All JarvisWidget intervals cleared");
							}
		        			
					}
					// end pop intervals
					
					// destroy all widget instances
					if ( $.navAsAjax && (container[0] == $("#content")[0]) && enableJarvisWidgets && $("#widget-grid")[0] ) {
						
						$("#widget-grid").jarvisWidgets('destroy');
						// debugState
						if (debugState){
							root.console.log("✔ JarvisWidgets destroyed");
						} 
						
					}
					// end destroy all widgets 
					
					// cluster destroy: destroy other instances that could be on the page 
					// this runs a script in the current loaded page before fetching the new page
					if ( $.navAsAjax && (container[0] == $("#content")[0]) ) {
	
						/*
						 * The following elements should be removed, if they have been created:
						 *
						 *	colorList
						 *	icon
						 *	picker
						 *	inline
						 *	And unbind events from elements:
						 *	
						 *	icon
						 *	picker
						 *	inline
						 *	especially $(document).on('mousedown')
						 *	It will be much easier to add namespace to plugin events and then unbind using selected namespace.
						 *	
						 *	See also:
						 *	
						 *	http://f6design.com/journal/2012/05/06/a-jquery-plugin-boilerplate/
						 *	http://keith-wood.name/pluginFramework.html
						 */
						
						// this function is below the pagefunction for all pages that has instances
	
						if (typeof pagedestroy == 'function') { 
	
						  try {
							    pagedestroy(); 
	
							    if (debugState){
									root.console.log("✔ Pagedestroy()");
							   } 
							}
							catch(err) {
							   pagedestroy = undefined; 
	
							   if (debugState){
									root.console.log("! Pagedestroy() Catch Error");
							   } 
						  }
	
						} 
	
						// destroy all inline charts
						
						if ( $.fn.sparkline && $("#content .sparkline")[0] ) {
							$("#content .sparkline").sparkline( 'destroy' );
							
							if (debugState){
								root.console.log("✔ Sparkline Charts destroyed!");
							} 
						}
						
						if ( $.fn.easyPieChart && $("#content .easy-pie-chart")[0] ) {
							$("#content .easy-pie-chart").easyPieChart( 'destroy' );
							
							if (debugState){
								root.console.log("✔ EasyPieChart Charts destroyed!");
							} 
						}
	
						
	
						// end destory all inline charts
						
						// destroy form controls: Datepicker, select2, autocomplete, mask, bootstrap slider
						
						if ( $.fn.select2 && $("#content select.select2")[0] ) {
							$("#content select.select2").select2('destroy');
							
							if (debugState){
								root.console.log("✔ Select2 destroyed!");
							}
						}
						
						if ( $.fn.mask && $('#content [data-mask]')[0] ) {
							$('#content [data-mask]').unmask();
							
							if (debugState){
								root.console.log("✔ Input Mask destroyed!");
							}
						}
						
						if ( $.fn.datepicker && $('#content .datepicker')[0] ) {
							$('#content .datepicker').off();
							$('#content .datepicker').remove();
							
							if (debugState){
								root.console.log("✔ Datepicker destroyed!");
							}
						}
						
						if ( $.fn.slider && $('#content .slider')[0] ) {
							$('#content .slider').off();
							$('#content .slider').remove();
							
							if (debugState){
								root.console.log("✔ Bootstrap Slider destroyed!");
							}
						}
									
						// end destroy form controls
						
						
					}
					// end cluster destroy
					
					// empty container and var to start garbage collection (frees memory)
					pagefunction = null;
					container.removeData().html("");
					
					// place cog
					container.html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
				
					// Only draw breadcrumb if it is main content material
					if (container[0] == $("#content")[0]) {
						
						// clear everything else except these key DOM elements
						// we do this because sometime plugins will leave dynamic elements behind
						$('body').find('> *').filter(':not(' + ignore_key_elms + ')').empty().remove();
						
						// draw breadcrumb
						drawBreadCrumb();
						
						// scroll up
						$("html").animate({
							scrollTop : 0
						}, "fast");
					} 
					// end if
				},
				success : function(data) {
					
					// dump data to container
					container.css({
						opacity : '0.0'
					}).html(data).delay(50).animate({
						opacity : '1.0'
					}, 300);
					
					// clear data var
					data = null;
					container = null;
				},
				error : function(xhr, status, thrownError, error) {
					container.html('<h4 class="ajax-loading-error"><i class="fa fa-warning txt-color-orangeDark"></i> Error requesting <span class="txt-color-red">' + url + '</span>: ' + xhr.status + ' <span style="text-transform: capitalize;">'  + thrownError + '</span></h4>');
				},
				async : true 
			});
		
		}
	/*
	 * UPDATE BREADCRUMB
	 */ 
		function drawBreadCrumb(opt_breadCrumbs) {
			var a = $("nav li.active > a"),
				b = a.length;
		
			bread_crumb.empty(), 
			bread_crumb.append($("<li>Home</li>")), a.each(function() {
				bread_crumb.append($("<li></li>").html($.trim($(this).clone().children(".badge").remove().end().text()))), --b || (document.title = bread_crumb.find("li:last-child").text())
			});
			
			// Push breadcrumb manually -> drawBreadCrumb(["Users", "John Doe"]);
			// Credits: Philip Whitt | philip.whitt@sbcglobal.net
			if (opt_breadCrumbs != undefined) {
				$.each(opt_breadCrumbs, function(index, value) {
					bread_crumb.append($("<li></li>").html(value)); 
					document.title = bread_crumb.find("li:last-child").text();
				});
			}
		}
	/* ~ END: APP AJAX REQUEST SETUP */
	
	/*
	 * PAGE SETUP
	 * Description: fire certain scripts that run through the page
	 * to check for form elements, tooltip activation, popovers, etc...
	 */
		function pageSetUp() {
		
			if (thisDevice === "desktop"){
				// is desktop
				
				// activate tooltips
				$("[rel=tooltip], [data-rel=tooltip]").tooltip();
			
				// activate popovers
				$("[rel=popover], [data-rel=popover]").popover();
			
				// activate popovers with hover states
				$("[rel=popover-hover], [data-rel=popover-hover]").popover({
					trigger : "hover"
				});
		
				// setup widgets
				setup_widgets_desktop();
			
				// activate inline charts
				runAllCharts();
			
				// run form elements
				runAllForms();
		
			} else {
				
				// is mobile
				
				// activate popovers
				$("[rel=popover], [data-rel=popover]").popover();
			
				// activate popovers with hover states
				$("[rel=popover-hover], [data-rel=popover-hover]").popover({
					trigger : "hover"
				});
			
				// activate inline charts
				runAllCharts();
			
				// setup widgets
				setup_widgets_mobile();
			
				// run form elements
				runAllForms();
				
			}
		
		}
	/* ~ END: PAGE SETUP */
	
	/*
	 * ONE POPOVER THEORY
	 * Keep only 1 active popover per trigger - also check and hide active popovers if user clicks on document
	 */
		$('body').on('click', function(e) {
			$('[rel="popover"], [data-rel="popover"]').each(function() {
				//the 'is' for buttons that trigger popups
				//the 'has' for icons within a button that triggers a popup
				if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
					$(this).popover('hide');
				}
			});
		}); 
	/* ~ END: ONE POP OVER THEORY */
	
	/*
	 * DELETE MODEL DATA ON HIDDEN
	 * Clears the model data once it is hidden, this way you do not create duplicated data on multiple modals
	 */
		$('body').on('hidden.bs.modal', '.modal', function () {
		  $(this).removeData('bs.modal');
		});
	/* ~ END: DELETE MODEL DATA ON HIDDEN */
	
	/*
	 * HELPFUL FUNCTIONS
	 * We have included some functions below that can be resued on various occasions
	 * 
	 * Get param value
	 * example: alert( getParam( 'param' ) );
	 */
		function getParam(name) {
		    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		    var regexS = "[\\?&]" + name + "=([^&#]*)";
		    var regex = new RegExp(regexS);
		    var results = regex.exec(window.location.href);
		    if (results == null)
		        return "";
		    else
		        return results[1];
		}
	/* ~ END: HELPFUL FUNCTIONS */

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGVlMDk5NDg2YWY0NTY4MGYyNjEiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQjtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQztBQUNBLG1CO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTTtBQUNOLFNBQVE7O0FBRVI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUEsT0FBTTs7QUFFTjs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUEsUUFBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0M7QUFDbEM7QUFDQSxTQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBLFVBQVMseUU7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVE7O0FBRVI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUEsUzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEtBQUksRTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxxRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSix5RTtBQUNBO0FBQ0E7QUFDQSxLQUFJLEU7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUksRTs7QUFFSixtRTtBQUNBO0FBQ0E7QUFDQSxLQUFJLEU7O0FBRUosdUU7QUFDQTtBQUNBO0FBQ0EsS0FBSSxFOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxrQjtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsS0FBSTs7QUFFSjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPLEVBQUU7OztBQUdUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsSTtBQUNBOztBQUVBOztBQUVBLEdBQUUsSUFBSTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0RBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQWtCO0FBQ2xCLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxtQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7O0FBRVY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0RBQW1EOztBQUVuRDtBQUNBO0FBQ0E7QUFDQSxtQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBLGVBQWM7QUFDZDs7QUFFQSxXQUFVOztBQUVWOztBQUVBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxHQUFFLEk7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPOztBQUVQLE9BQU07QUFDTjtBQUNBLHVDQUFzQyxrQkFBa0IsT0FBTztBQUMvRDtBQUNBO0FBQ0EsUUFBTztBQUNQLE9BQU07QUFDTixNQUFLO0FBQ0wsS0FBSTtBQUNKLElBQUc7QUFDSCxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKLElBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNOztBQUVOOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFO0FBQ0EseUU7QUFDQSx5RTtBQUNBLHlFO0FBQ0EsK0Q7QUFDQSwrRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU07O0FBRU47O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxPQUFPLFNBQVMsV0FBVyxXQUFXO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTs7QUFFTjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNOztBQUVOOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTTs7QUFFTjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNOztBQUVOOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNOztBQUVOOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNOztBQUVOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNOztBQUVOOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU07O0FBRU47O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNOztBQUVOOztBQUVBOztBQUVBLEtBQUk7O0FBRUosSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSzs7QUFFTDtBQUNBLEtBQUk7O0FBRUosSUFBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUEsTUFBSztBQUNMOztBQUVBLE1BQUs7QUFDTDs7QUFFQSxLQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0EsT0FBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSzs7QUFFTDtBQUNBOztBQUVBLGlEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUEsT0FBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDZDOztBQUVBO0FBQ0EseUI7O0FBRUE7QUFDQTtBQUNBLFc7QUFDQTtBQUNBO0FBQ0Esa0M7O0FBRUE7QUFDQTtBQUNBLFc7QUFDQTs7QUFFQSxPOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRO0FBQ0E7Ozs7QUFJQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTixNO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQSxtT0FBa087QUFDbE8sS0FBSTtBQUNKO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0Q7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBRzs7QUFFSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEdBQUUsRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0IiLCJmaWxlIjoiNGVlMDk5NDg2YWY0NTY4MGYyNjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDRlZTA5OTQ4NmFmNDU2ODBmMjYxXG4gKiovIiwicmVxdWlyZShcIi4vYXBwLmpzXCIpO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3d3cm9vdC9qcy9tYWluLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogICAgICAgICAgICAgICAgICBfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX1xyXG4gICAgICAgICAgIF9fX19fX19ffCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfF9fX19fX19cclxuICAgICAgICAgICBcXCAgICAgICB8ICAgICAgICAgICBTbWFydEFkbWluIFdlYkFwcCAgICAgICAgICB8ICAgICAgL1xyXG4gICAgICAgICAgICBcXCAgICAgIHwgICAgICBDb3B5cmlnaHQgwqkgMjAxNiBNeU9yYW5nZSAgICAgICB8ICAgICAvXHJcbiAgICAgICAgICAgIC8gICAgICB8X19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX198ICAgICBcXFxyXG4gICAgICAgICAgIC9fX19fX19fX19fKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKF9fX19fX19fX1xcXHJcblxyXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxyXG4gKiBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcclxuICogRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXHJcbiAqIE1FUkNIQU5UQUJJTElUWSwgSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkVcclxuICogTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTlxyXG4gKiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cclxuICogV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAqIG9yaWdpbmFsIGZpbGVuYW1lICA6IGFwcC5qc1xyXG4gKiBmaWxlc2l6ZSAgICAgICAgICAgOiA2Miw0OTl+IGJ5dGVzXHJcbiAqIGF1dGhvciAgICAgICAgICAgICA6IFN1bm55IChAYm9vdHN0cmFwaHVudClcclxuICogZW1haWwgICAgICAgICAgICAgIDogaW5mb0BteW9yYW5nZS5jYVxyXG4gKiBsZWdhbCBub3RpY2UgICAgICAgOiBUaGlzIHNjcmlwdCBpcyBwYXJ0IG9mIGEgdGhlbWUgc29sZCBieSBcclxuICogICAgICAgICAgICAgICAgICAgICAgTVlPUkFOR0UgSU5DLlxyXG4gKiAgICBcclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogSU5ERVggKE5vdGU6IGxpbmUgbnVtYmVycyBmb3IgaW5kZXggaXRlbXMgbWF5IG5vdCBiZSB1cCB0byBkYXRlKTpcclxuICogXHJcbiAqIDEuIEFQUCBDT05GSUdVUkFUSU9OLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlsgYXBwLmNvbmZpZy5qcyBdXHJcbiAqIDIuIEFQUCBET00gUkVGRVJFTkNFUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlsgYXBwLmNvbmZpZy5qcyBdXHJcbiAqIDMuIERFVEVDVCBNT0JJTEUgREVWSUNFUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDE0OSBdXHJcbiAqIDQuIENVU1RPTSBNRU5VIFBMVUdJTi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDY4OCBdXHJcbiAqIDUuIEVMRU1FTlQgRVhJU1QgT1IgTk9ULi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDc3OCBdXHJcbiAqIDYuIElOSVRJQUxJWkUgRk9STVMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDc4OCBdXHJcbiAqIFx0XHQ2YS4gQk9PVFNUUkFQIFNMSURFUiBQTFVHSU4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogNzk0IF1cclxuICogXHRcdDZiLiBTRUxFQ1QyIFBMVUdJTi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiA4MDMgXVxyXG4gKiBcdFx0NmMuIE1BU0tJTkcuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDgyNCBdXHJcbiAqIFx0XHQ2ZC4gQVVUT0NPTVBMRVRFLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogODQzIF1cclxuICogXHRcdDZmLiBKUVVFUlkgVUkgREFURS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiA4NjIgXVxyXG4gKiBcdFx0NmcuIEFKQVggQlVUVE9OIExPQURJTkcgVEVYVC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDg4NCBdXHJcbiAqIDcuIElOSVRJQUxJWkUgQ0hBUlRTLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDkwMiBdXHJcbiAqIFx0XHQ3YS4gU1BBUktMSU5FUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogOTA3IF1cclxuICogXHRcdDdiLiBMSU5FIENIQVJULi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAxMDI2XVxyXG4gKiBcdFx0N2MuIFBJRSBDSEFSVC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDEwNzddXHJcbiAqIFx0XHQ3ZC4gQk9YIFBMT1QuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogMTEwMF1cclxuICogXHRcdDdlLiBCVUxMRVQuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAxMTQ1XVxyXG4gKiBcdFx0N2YuIERJU0NSRVRFLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDExNjldXHJcbiAqIFx0XHQ3Zy4gVFJJU1RBVEUuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogMTE5NV1cclxuICogXHRcdDdoLiBDT01QT1NJVEU6IEJBUi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAxMjIzXVxyXG4gKiBcdFx0N2kuIENPTVBPU0lURTogTElORS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDEyNTldXHJcbiAqIFx0XHQ3ai4gRUFTWSBQSUUgQ0hBUlRTLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogMTMzOV1cclxuICogOC4gSU5JVElBTElaRSBKQVJWSVMgV0lER0VUUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogMTM3OV1cclxuICogXHRcdDhhLiBTRVRVUCBERVNLVE9QIFdJREdFVC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAxNDY2XVxyXG4gKiBcdFx0OGIuIEdPT0dMRSBNQVBTLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDE0NzhdXHJcbiAqIFx0XHQ4Yy4gTE9BRCBTQ1JJUFRTLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogMTUwMF1cclxuICogXHRcdDhkLiBBUFAgQUpBWCBSRVFVRVNUIFNFVFVQLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAxNTM4XVxyXG4gKiA5LiBDSEVDSyBUTyBTRUUgSUYgVVJMIEVYSVNUUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAxNjE0XVxyXG4gKiAxMC5MT0FEIEFKQVggUEFHRVMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAxNjY5XVxyXG4gKiAxMS5VUERBVEUgQlJFQURDUlVNQi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAxNzc1XVxyXG4gKiAxMi5QQUdFIFNFVFVQLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAxNzk4XVxyXG4gKiAxMy5QT1AgT1ZFUiBUSEVPUlkuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAxODUyXVxyXG4gKiAxNC5ERUxFVEUgTU9ERUwgREFUQSBPTiBISURERU4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAxOTkxXVxyXG4gKiAxNS5IRUxQRlVMIEZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAyMDI3XVxyXG4gKiBcclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogICAgICAgSU1QT1JUQU5UOiBBTEwgQ09ORklHIFZBUlMgSVMgTk9XIE1PVkVEIFRPIEFQUC5DT05GSUcuSlNcclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogXHJcbiAqIFxyXG4gKiBHTE9CQUw6IGludGVydmFsIGFycmF5ICh0byBiZSB1c2VkIHdpdGggamFydmlzd2lkZ2V0IGluIGFqYXggYW5kIFxyXG4gKiBhbmd1bGFyIG1vZGUpIHRvIGNsZWFyIGF1dG8gZmV0Y2ggaW50ZXJ2YWxcclxuICovXHJcblx0JC5pbnRlcnZhbEFyciA9IFtdO1xyXG4vKlxyXG4gKiBDYWxjdWxhdGUgbmF2IGhlaWdodFxyXG4gKi9cclxudmFyIGNhbGNfbmF2YmFyX2hlaWdodCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGhlaWdodCA9IG51bGw7XHJcblx0XHJcblx0XHRpZiAoJCgnI2hlYWRlcicpLmxlbmd0aClcclxuXHRcdFx0aGVpZ2h0ID0gJCgnI2hlYWRlcicpLmhlaWdodCgpO1xyXG5cdFxyXG5cdFx0aWYgKGhlaWdodCA9PT0gbnVsbClcclxuXHRcdFx0aGVpZ2h0ID0gJCgnPGRpdiBpZD1cImhlYWRlclwiPjwvZGl2PicpLmhlaWdodCgpO1xyXG5cdFxyXG5cdFx0aWYgKGhlaWdodCA9PT0gbnVsbClcclxuXHRcdFx0cmV0dXJuIDQ5O1xyXG5cdFx0Ly8gZGVmYXVsdFxyXG5cdFx0cmV0dXJuIGhlaWdodDtcclxuXHR9LFxyXG5cdFxyXG5cdG5hdmJhcl9oZWlnaHQgPSBjYWxjX25hdmJhcl9oZWlnaHQsIFxyXG4vKlxyXG4gKiBBUFAgRE9NIFJFRkVSRU5DRVNcclxuICogRGVzY3JpcHRpb246IE9iaiBET00gcmVmZXJlbmNlLCBwbGVhc2UgdHJ5IHRvIGF2b2lkIGNoYW5naW5nIHRoZXNlXHJcbiAqL1x0XHJcblx0c2hvcnRjdXRfZHJvcGRvd24gPSAkKCcjc2hvcnRjdXQnKSxcclxuXHRcclxuXHRicmVhZF9jcnVtYiA9ICQoJyNyaWJib24gb2wuYnJlYWRjcnVtYicpLFxyXG4vKlxyXG4gKiBUb3AgbWVudSBvbi9vZmZcclxuICovXHJcblx0dG9wbWVudSA9IGZhbHNlLFxyXG4vKlxyXG4gKiBkZXNrdG9wIG9yIG1vYmlsZVxyXG4gKi9cclxuXHR0aGlzRGV2aWNlID0gbnVsbCxcclxuLypcclxuICogREVURUNUIE1PQklMRSBERVZJQ0VTXHJcbiAqIERlc2NyaXB0aW9uOiBEZXRlY3RzIG1vYmlsZSBkZXZpY2UgLSBpZiBhbnkgb2YgdGhlIGxpc3RlZCBkZXZpY2UgaXMgXHJcbiAqIGRldGVjdGVkIGEgY2xhc3MgaXMgaW5zZXJ0ZWQgdG8gJC5yb290XyBhbmQgdGhlIHZhcmlhYmxlIHRoaXNEZXZpY2UgXHJcbiAqIGlzIGRlY2xlYXJkLiAoc28gZmFyIHRoaXMgaXMgY292ZXJpbmcgbW9zdCBoYW5kIGhlbGQgZGV2aWNlcylcclxuICovXHRcclxuXHRpc21vYmlsZSA9ICgvaXBob25lfGlwYWR8aXBvZHxhbmRyb2lkfGJsYWNrYmVycnl8bWluaXx3aW5kb3dzXFxzY2V8cGFsbS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKSksXHJcbi8qXHJcbiAqIEpTIEFSUkFZIFNDUklQVCBTVE9SQUdFXHJcbiAqIERlc2NyaXB0aW9uOiB1c2VkIHdpdGggbG9hZFNjcmlwdCB0byBzdG9yZSBzY3JpcHQgcGF0aCBhbmQgZmlsZSBuYW1lXHJcbiAqIHNvIGl0IHdpbGwgbm90IGxvYWQgdHdpY2VcclxuICovXHRcclxuXHRqc0FycmF5ID0ge30sXHJcbi8qXHJcbiAqIEFwcCBJbml0aWFsaXplXHJcbiAqIERlc2NyaXB0aW9uOiBJbml0aWFsaXplcyB0aGUgYXBwIHdpdGggaW50QXBwKCk7XHJcbiAqL1x0XHJcblx0aW5pdEFwcCA9IChmdW5jdGlvbihhcHApIHtcclxuXHRcdFxyXG5cdFx0LypcclxuXHRcdCAqIEFERCBERVZJQ0UgVFlQRVxyXG5cdFx0ICogRGV0ZWN0IGlmIG1vYmlsZSBvciBkZXNrdG9wXHJcblx0XHQgKi9cdFx0XHJcblx0XHRhcHAuYWRkRGV2aWNlVHlwZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKCFpc21vYmlsZSkge1xyXG5cdFx0XHRcdC8vIERlc2t0b3BcclxuXHRcdFx0XHQkLnJvb3RfLmFkZENsYXNzKFwiZGVza3RvcC1kZXRlY3RlZFwiKTtcclxuXHRcdFx0XHR0aGlzRGV2aWNlID0gXCJkZXNrdG9wXCI7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlOyBcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBNb2JpbGVcclxuXHRcdFx0XHQkLnJvb3RfLmFkZENsYXNzKFwibW9iaWxlLWRldGVjdGVkXCIpO1xyXG5cdFx0XHRcdHRoaXNEZXZpY2UgPSBcIm1vYmlsZVwiO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmIChmYXN0Q2xpY2spIHtcclxuXHRcdFx0XHRcdC8vIFJlbW92ZXMgdGhlIHRhcCBkZWxheSBpbiBpZGV2aWNlc1xyXG5cdFx0XHRcdFx0Ly8gZGVwZW5kZW5jeToganMvcGx1Z2luL2Zhc3RjbGljay9mYXN0Y2xpY2suanMgXHJcblx0XHRcdFx0XHQkLnJvb3RfLmFkZENsYXNzKFwibmVlZHNjbGlja1wiKTtcclxuXHRcdFx0XHRcdEZhc3RDbGljay5hdHRhY2goZG9jdW1lbnQuYm9keSk7IFxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlOyBcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9O1xyXG5cdFx0LyogfiBFTkQ6IEFERCBERVZJQ0UgVFlQRSAqL1xyXG5cdFx0XHJcblx0XHQvKlxyXG5cdFx0ICogQ0hFQ0sgRk9SIE1FTlUgUE9TSVRJT05cclxuXHRcdCAqIFNjYW5zIGxvY2Fsc3Ryb2FnZSBmb3IgbWVudSBwb3NpdGlvbiAodmVydGljYWwgb3IgaG9yaXpvbnRhbClcclxuXHRcdCAqL1xyXG5cdFx0YXBwLm1lbnVQb3MgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHJcblx0XHQgXHRpZiAoJC5yb290Xy5oYXNDbGFzcyhcIm1lbnUtb24tdG9wXCIpIHx8IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzbS1zZXRtZW51Jyk9PSd0b3AnICkgeyBcclxuXHRcdCBcdFx0dG9wbWVudSA9IHRydWU7XHJcblx0XHQgXHRcdCQucm9vdF8uYWRkQ2xhc3MoXCJtZW51LW9uLXRvcFwiKTtcclxuXHRcdCBcdH1cclxuXHRcdH07XHJcblx0XHQvKiB+IEVORDogQ0hFQ0sgTU9CSUxFIERFVklDRSAqL1xyXG5cclxuXHRcdC8qXHJcblx0XHQgKiBTTUFSVCBBQ1RJT05TXHJcblx0XHQgKi9cclxuXHRcdGFwcC5TbWFydEFjdGlvbnMgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR2YXIgc21hcnRBY3Rpb25zID0ge1xyXG5cdFx0XHQgICAgXHJcblx0XHRcdCAgICAvLyBMT0dPVVQgTVNHIFxyXG5cdFx0XHQgICAgdXNlckxvZ291dDogZnVuY3Rpb24oJHRoaXMpe1xyXG5cdFx0XHRcclxuXHRcdFx0XHRcdC8vIGFzayB2ZXJpZmljYXRpb25cclxuXHRcdFx0XHRcdCQuU21hcnRNZXNzYWdlQm94KHtcclxuXHRcdFx0XHRcdFx0dGl0bGUgOiBcIjxpIGNsYXNzPSdmYSBmYS1zaWduLW91dCB0eHQtY29sb3Itb3JhbmdlRGFyayc+PC9pPiBMb2dvdXQgPHNwYW4gY2xhc3M9J3R4dC1jb2xvci1vcmFuZ2VEYXJrJz48c3Ryb25nPlwiICsgJCgnI3Nob3ctc2hvcnRjdXQnKS50ZXh0KCkgKyBcIjwvc3Ryb25nPjwvc3Bhbj4gP1wiLFxyXG5cdFx0XHRcdFx0XHRjb250ZW50IDogJHRoaXMuZGF0YSgnbG9nb3V0LW1zZycpIHx8IFwiWW91IGNhbiBpbXByb3ZlIHlvdXIgc2VjdXJpdHkgZnVydGhlciBhZnRlciBsb2dnaW5nIG91dCBieSBjbG9zaW5nIHRoaXMgb3BlbmVkIGJyb3dzZXJcIixcclxuXHRcdFx0XHRcdFx0YnV0dG9ucyA6ICdbTm9dW1llc10nXHJcblx0XHRcdFxyXG5cdFx0XHRcdFx0fSwgZnVuY3Rpb24oQnV0dG9uUHJlc3NlZCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoQnV0dG9uUHJlc3NlZCA9PSBcIlllc1wiKSB7XHJcblx0XHRcdFx0XHRcdFx0JC5yb290Xy5hZGRDbGFzcygnYW5pbWF0ZWQgZmFkZU91dFVwJyk7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChsb2dvdXQsIDEwMDApO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGZ1bmN0aW9uIGxvZ291dCgpIHtcclxuXHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uID0gJHRoaXMuYXR0cignaHJlZicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHJcblx0XHRcdFx0Ly8gUkVTRVQgV0lER0VUU1xyXG5cdFx0XHQgICAgcmVzZXRXaWRnZXRzOiBmdW5jdGlvbigkdGhpcyl7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdCQuU21hcnRNZXNzYWdlQm94KHtcclxuXHRcdFx0XHRcdFx0dGl0bGUgOiBcIjxpIGNsYXNzPSdmYSBmYS1yZWZyZXNoJyBzdHlsZT0nY29sb3I6Z3JlZW4nPjwvaT4gQ2xlYXIgTG9jYWwgU3RvcmFnZVwiLFxyXG5cdFx0XHRcdFx0XHRjb250ZW50IDogJHRoaXMuZGF0YSgncmVzZXQtbXNnJykgfHwgXCJXb3VsZCB5b3UgbGlrZSB0byBSRVNFVCBhbGwgeW91ciBzYXZlZCB3aWRnZXRzIGFuZCBjbGVhciBMb2NhbFN0b3JhZ2U/MVwiLFxyXG5cdFx0XHRcdFx0XHRidXR0b25zIDogJ1tOb11bWWVzXSdcclxuXHRcdFx0XHRcdH0sIGZ1bmN0aW9uKEJ1dHRvblByZXNzZWQpIHtcclxuXHRcdFx0XHRcdFx0aWYgKEJ1dHRvblByZXNzZWQgPT0gXCJZZXNcIiAmJiBsb2NhbFN0b3JhZ2UpIHtcclxuXHRcdFx0XHRcdFx0XHRsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuXHRcdFx0XHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHQgICAgfSxcclxuXHRcdFx0ICAgIFxyXG5cdFx0XHQgICAgLy8gTEFVTkNIIEZVTExTQ1JFRU4gXHJcblx0XHRcdCAgICBsYXVuY2hGdWxsc2NyZWVuOiBmdW5jdGlvbihlbGVtZW50KXtcclxuXHRcdFx0XHJcblx0XHRcdFx0XHRpZiAoISQucm9vdF8uaGFzQ2xhc3MoXCJmdWxsLXNjcmVlblwiKSkge1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHQkLnJvb3RfLmFkZENsYXNzKFwiZnVsbC1zY3JlZW5cIik7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGlmIChlbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcblx0XHRcdFx0XHRcdFx0ZWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuXHRcdFx0XHRcdFx0XHRlbGVtZW50Lm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChlbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuXHRcdFx0XHRcdFx0XHRlbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdCQucm9vdF8ucmVtb3ZlQ2xhc3MoXCJmdWxsLXNjcmVlblwiKTtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGlmIChkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xyXG5cdFx0XHRcdFx0XHRcdGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xyXG5cdFx0XHRcdFx0XHRcdGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xyXG5cdFx0XHRcdFx0XHRcdGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdCAgIH0sXHJcblx0XHRcdFxyXG5cdFx0XHQgICAvLyBNSU5JRlkgTUVOVVxyXG5cdFx0XHQgICAgbWluaWZ5TWVudTogZnVuY3Rpb24oJHRoaXMpe1xyXG5cdFx0XHQgICAgXHRpZiAoISQucm9vdF8uaGFzQ2xhc3MoXCJtZW51LW9uLXRvcFwiKSl7XHJcblx0XHRcdFx0XHRcdCQucm9vdF8udG9nZ2xlQ2xhc3MoXCJtaW5pZmllZFwiKTtcclxuXHRcdFx0XHRcdFx0JC5yb290Xy5yZW1vdmVDbGFzcyhcImhpZGRlbi1tZW51XCIpO1xyXG5cdFx0XHRcdFx0XHQkKCdodG1sJykucmVtb3ZlQ2xhc3MoXCJoaWRkZW4tbWVudS1tb2JpbGUtbG9ja1wiKTtcclxuXHRcdFx0XHRcdFx0JHRoaXMuZWZmZWN0KFwiaGlnaGxpZ2h0XCIsIHt9LCA1MDApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHQgICAgfSxcclxuXHRcdFx0ICAgIFxyXG5cdFx0XHQgICAgLy8gVE9HR0xFIE1FTlUgXHJcblx0XHRcdCAgICB0b2dnbGVNZW51OiBmdW5jdGlvbigpe1xyXG5cdFx0XHQgICAgXHRpZiAoISQucm9vdF8uaGFzQ2xhc3MoXCJtZW51LW9uLXRvcFwiKSl7XHJcblx0XHRcdFx0XHRcdCQoJ2h0bWwnKS50b2dnbGVDbGFzcyhcImhpZGRlbi1tZW51LW1vYmlsZS1sb2NrXCIpO1xyXG5cdFx0XHRcdFx0XHQkLnJvb3RfLnRvZ2dsZUNsYXNzKFwiaGlkZGVuLW1lbnVcIik7XHJcblx0XHRcdFx0XHRcdCQucm9vdF8ucmVtb3ZlQ2xhc3MoXCJtaW5pZmllZFwiKTtcclxuXHRcdFx0ICAgIFx0Ly99IGVsc2UgaWYgKCAkLnJvb3RfLmhhc0NsYXNzKFwibWVudS1vbi10b3BcIikgJiYgJC5yb290Xy5oYXNDbGFzcyhcIm1vYmlsZS12aWV3LWFjdGl2YXRlZFwiKSApIHtcclxuXHRcdFx0ICAgIFx0Ly8gc3VnZ2VzdGVkIGZpeCBmcm9tIENocmlzdGlhbiBKw6RnZXJcdFxyXG5cdFx0XHQgICAgXHR9IGVsc2UgaWYgKCAkLnJvb3RfLmhhc0NsYXNzKFwibWVudS1vbi10b3BcIikgJiYgJCh3aW5kb3cpLndpZHRoKCkgPCA5NzkgKSB7XHRcclxuXHRcdFx0ICAgIFx0XHQkKCdodG1sJykudG9nZ2xlQ2xhc3MoXCJoaWRkZW4tbWVudS1tb2JpbGUtbG9ja1wiKTtcclxuXHRcdFx0XHRcdFx0JC5yb290Xy50b2dnbGVDbGFzcyhcImhpZGRlbi1tZW51XCIpO1xyXG5cdFx0XHRcdFx0XHQkLnJvb3RfLnJlbW92ZUNsYXNzKFwibWluaWZpZWRcIik7XHJcblx0XHRcdCAgICBcdH1cclxuXHRcdFx0ICAgIH0sICAgICBcclxuXHRcdFx0XHJcblx0XHRcdCAgICAvLyBUT0dHTEUgU0hPUlRDVVQgXHJcblx0XHRcdCAgICB0b2dnbGVTaG9ydGN1dDogZnVuY3Rpb24oKXtcclxuXHRcdFx0ICAgIFx0XHJcblx0XHRcdFx0XHRpZiAoc2hvcnRjdXRfZHJvcGRvd24uaXMoXCI6dmlzaWJsZVwiKSkge1xyXG5cdFx0XHRcdFx0XHRzaG9ydGN1dF9idXR0b25zX2hpZGUoKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHNob3J0Y3V0X2J1dHRvbnNfc2hvdygpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHJcblx0XHRcdFx0XHQvLyBTSE9SVCBDVVQgKGJ1dHRvbnMgdGhhdCBhcHBlYXIgd2hlbiBjbGlja2VkIG9uIHVzZXIgbmFtZSlcclxuXHRcdFx0XHRcdHNob3J0Y3V0X2Ryb3Bkb3duLmZpbmQoJ2EnKS5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoc2hvcnRjdXRfYnV0dG9uc19oaWRlLCAzMDApO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0XHQvLyBTSE9SVENVVCBidXR0b25zIGdvZXMgYXdheSBpZiBtb3VzZSBpcyBjbGlja2VkIG91dHNpZGUgb2YgdGhlIGFyZWFcclxuXHRcdFx0XHRcdCQoZG9jdW1lbnQpLm1vdXNldXAoZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoIXNob3J0Y3V0X2Ryb3Bkb3duLmlzKGUudGFyZ2V0KSAmJiBzaG9ydGN1dF9kcm9wZG93bi5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdHNob3J0Y3V0X2J1dHRvbnNfaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8gU0hPUlRDVVQgQU5JTUFURSBISURFXHJcblx0XHRcdFx0XHRmdW5jdGlvbiBzaG9ydGN1dF9idXR0b25zX2hpZGUoKSB7XHJcblx0XHRcdFx0XHRcdHNob3J0Y3V0X2Ryb3Bkb3duLmFuaW1hdGUoe1xyXG5cdFx0XHRcdFx0XHRcdGhlaWdodCA6IFwiaGlkZVwiXHJcblx0XHRcdFx0XHRcdH0sIDMwMCwgXCJlYXNlT3V0Q2lyY1wiKTtcclxuXHRcdFx0XHRcdFx0JC5yb290Xy5yZW1vdmVDbGFzcygnc2hvcnRjdXQtb24nKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcdC8vIFNIT1JUQ1VUIEFOSU1BVEUgU0hPV1xyXG5cdFx0XHRcdFx0ZnVuY3Rpb24gc2hvcnRjdXRfYnV0dG9uc19zaG93KCkge1xyXG5cdFx0XHRcdFx0XHRzaG9ydGN1dF9kcm9wZG93bi5hbmltYXRlKHtcclxuXHRcdFx0XHRcdFx0XHRoZWlnaHQgOiBcInNob3dcIlxyXG5cdFx0XHRcdFx0XHR9LCAyMDAsIFwiZWFzZU91dENpcmNcIik7XHJcblx0XHRcdFx0XHRcdCQucm9vdF8uYWRkQ2xhc3MoJ3Nob3J0Y3V0LW9uJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHQgICAgfSAgXHJcblx0XHRcdCAgIFxyXG5cdFx0XHR9O1xyXG5cdFx0XHRcdFxyXG5cdFx0XHQkLnJvb3RfLm9uKCdjbGljaycsICdbZGF0YS1hY3Rpb249XCJ1c2VyTG9nb3V0XCJdJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblx0XHRcdFx0c21hcnRBY3Rpb25zLnVzZXJMb2dvdXQoJHRoaXMpO1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQvL2NsZWFyIG1lbW9yeSByZWZlcmVuY2VcclxuXHRcdFx0XHQkdGhpcyA9IG51bGw7XHJcblx0XHRcdFx0XHJcblx0XHRcdH0pOyBcclxuXHJcblx0XHRcdC8qXHJcblx0XHRcdCAqIEJVVFRPTiBBQ1RJT05TIFxyXG5cdFx0XHQgKi9cdFx0XHJcblx0XHRcdCQucm9vdF8ub24oJ2NsaWNrJywgJ1tkYXRhLWFjdGlvbj1cInJlc2V0V2lkZ2V0c1wiXScsIGZ1bmN0aW9uKGUpIHtcdFxyXG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblx0XHRcdFx0c21hcnRBY3Rpb25zLnJlc2V0V2lkZ2V0cygkdGhpcyk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vY2xlYXIgbWVtb3J5IHJlZmVyZW5jZVxyXG5cdFx0XHRcdCR0aGlzID0gbnVsbDtcclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0XHQkLnJvb3RfLm9uKCdjbGljaycsICdbZGF0YS1hY3Rpb249XCJsYXVuY2hGdWxsc2NyZWVuXCJdJywgZnVuY3Rpb24oZSkge1x0XHJcblx0XHRcdFx0c21hcnRBY3Rpb25zLmxhdW5jaEZ1bGxzY3JlZW4oZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH0pOyBcclxuXHRcdFx0XHJcblx0XHRcdCQucm9vdF8ub24oJ2NsaWNrJywgJ1tkYXRhLWFjdGlvbj1cIm1pbmlmeU1lbnVcIl0nLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHRcdFx0XHRzbWFydEFjdGlvbnMubWluaWZ5TWVudSgkdGhpcyk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vY2xlYXIgbWVtb3J5IHJlZmVyZW5jZVxyXG5cdFx0XHRcdCR0aGlzID0gbnVsbDtcclxuXHRcdFx0fSk7IFxyXG5cdFx0XHRcclxuXHRcdFx0JC5yb290Xy5vbignY2xpY2snLCAnW2RhdGEtYWN0aW9uPVwidG9nZ2xlTWVudVwiXScsIGZ1bmN0aW9uKGUpIHtcdFxyXG5cdFx0XHRcdHNtYXJ0QWN0aW9ucy50b2dnbGVNZW51KCk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9KTsgIFxyXG5cdFx0XHJcblx0XHRcdCQucm9vdF8ub24oJ2NsaWNrJywgJ1tkYXRhLWFjdGlvbj1cInRvZ2dsZVNob3J0Y3V0XCJdJywgZnVuY3Rpb24oZSkge1x0XHJcblx0XHRcdFx0c21hcnRBY3Rpb25zLnRvZ2dsZVNob3J0Y3V0KCk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9KTsgXHJcblx0XHRcdFx0XHRcclxuXHRcdH07XHJcblx0XHQvKiB+IEVORDogU01BUlQgQUNUSU9OUyAqL1xyXG5cdFx0XHJcblx0XHQvKlxyXG5cdFx0ICogQUNUSVZBVEUgTkFWSUdBVElPTlxyXG5cdFx0ICogRGVzY3JpcHRpb246IEFjdGl2YXRpb24gd2lsbCBmYWlsIGlmIHRvcCBuYXZpZ2F0aW9uIGlzIG9uXHJcblx0XHQgKi9cclxuXHRcdGFwcC5sZWZ0TmF2ID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0XHJcblx0XHRcdC8vIElOSVRJQUxJWkUgTEVGVCBOQVZcclxuXHRcdFx0aWYgKCF0b3BtZW51KSB7XHJcblx0XHRcdFx0aWYgKCFudWxsKSB7XHJcblx0XHRcdFx0XHQkKCduYXYgdWwnKS5qYXJ2aXNtZW51KHtcclxuXHRcdFx0XHRcdFx0YWNjb3JkaW9uIDogbWVudV9hY2NvcmRpb24gfHwgdHJ1ZSxcclxuXHRcdFx0XHRcdFx0c3BlZWQgOiBtZW51X3NwZWVkIHx8IHRydWUsXHJcblx0XHRcdFx0XHRcdGNsb3NlZFNpZ24gOiAnPGVtIGNsYXNzPVwiZmEgZmEtcGx1cy1zcXVhcmUtb1wiPjwvZW0+JyxcclxuXHRcdFx0XHRcdFx0b3BlbmVkU2lnbiA6ICc8ZW0gY2xhc3M9XCJmYSBmYS1taW51cy1zcXVhcmUtb1wiPjwvZW0+J1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGFsZXJ0KFwiRXJyb3IgLSBtZW51IGFuY2hvciBkb2VzIG5vdCBleGlzdFwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9O1xyXG5cdFx0LyogfiBFTkQ6IEFDVElWQVRFIE5BVklHQVRJT04gKi9cclxuXHRcdFxyXG5cdFx0LypcclxuXHRcdCAqIE1JU0NFTEFORU9VUyBET00gUkVBRFkgRlVOQ1RJT05TXHJcblx0XHQgKiBEZXNjcmlwdGlvbjogZmlyZSB3aXRoIGpRdWVyeShkb2N1bWVudCkucmVhZHkuLi5cclxuXHRcdCAqL1xyXG5cdFx0YXBwLmRvbVJlYWR5TWlzYyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcclxuXHRcdFx0LypcclxuXHRcdFx0ICogRklSRSBUT09MVElQU1xyXG5cdFx0XHQgKi9cclxuXHRcdFx0aWYgKCQoXCJbcmVsPXRvb2x0aXBdXCIpLmxlbmd0aCkge1xyXG5cdFx0XHRcdCQoXCJbcmVsPXRvb2x0aXBdXCIpLnRvb2x0aXAoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHJcblx0XHRcdC8vIFNIT1cgJiBISURFIE1PQklMRSBTRUFSQ0ggRklFTERcclxuXHRcdFx0JCgnI3NlYXJjaC1tb2JpbGUnKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkLnJvb3RfLmFkZENsYXNzKCdzZWFyY2gtbW9iaWxlJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHJcblx0XHRcdCQoJyNjYW5jZWwtc2VhcmNoLWpzJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JC5yb290Xy5yZW1vdmVDbGFzcygnc2VhcmNoLW1vYmlsZScpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFxyXG5cdFx0XHQvLyBBQ1RJVklUWVxyXG5cdFx0XHQvLyBhamF4IGRyb3BcclxuXHRcdFx0JCgnI2FjdGl2aXR5JykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblx0XHRcclxuXHRcdFx0XHRpZiAoJHRoaXMuZmluZCgnLmJhZGdlJykuaGFzQ2xhc3MoJ2JnLWNvbG9yLXJlZCcpKSB7XHJcblx0XHRcdFx0XHQkdGhpcy5maW5kKCcuYmFkZ2UnKS5yZW1vdmVDbGFzc1ByZWZpeCgnYmctY29sb3ItJyk7XHJcblx0XHRcdFx0XHQkdGhpcy5maW5kKCcuYmFkZ2UnKS50ZXh0KFwiMFwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcclxuXHRcdFx0XHRpZiAoISR0aGlzLm5leHQoJy5hamF4LWRyb3Bkb3duJykuaXMoJzp2aXNpYmxlJykpIHtcclxuXHRcdFx0XHRcdCR0aGlzLm5leHQoJy5hamF4LWRyb3Bkb3duJykuZmFkZUluKDE1MCk7XHJcblx0XHRcdFx0XHQkdGhpcy5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdCR0aGlzLm5leHQoJy5hamF4LWRyb3Bkb3duJykuZmFkZU91dCgxNTApO1xyXG5cdFx0XHRcdFx0JHRoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFxyXG5cdFx0XHRcdHZhciB0aGVVcmxWYWwgPSAkdGhpcy5uZXh0KCcuYWpheC1kcm9wZG93bicpLmZpbmQoJy5idG4tZ3JvdXAgPiAuYWN0aXZlID4gaW5wdXQnKS5hdHRyKCdpZCcpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vY2xlYXIgbWVtb3J5IHJlZmVyZW5jZVxyXG5cdFx0XHRcdCR0aGlzID0gbnVsbDtcclxuXHRcdFx0XHR0aGVVcmxWYWwgPSBudWxsO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHJcblx0XHRcdCQoJ2lucHV0W25hbWU9XCJhY3Rpdml0eVwiXScpLmNoYW5nZShmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG5cdFx0XHJcblx0XHRcdFx0dXJsID0gJHRoaXMuYXR0cignaWQnKTtcclxuXHRcdFx0XHRjb250YWluZXIgPSAkKCcuYWpheC1ub3RpZmljYXRpb25zJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0bG9hZFVSTCh1cmwsIGNvbnRhaW5lcik7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly9jbGVhciBtZW1vcnkgcmVmZXJlbmNlXHJcblx0XHRcdFx0JHRoaXMgPSBudWxsO1x0XHRcclxuXHRcdFx0fSk7XHJcblx0XHRcclxuXHRcdFx0Ly8gY2xvc2UgZHJvcGRvd24gaWYgbW91c2UgaXMgbm90IGluc2lkZSB0aGUgYXJlYSBvZiAuYWpheC1kcm9wZG93blxyXG5cdFx0XHQkKGRvY3VtZW50KS5tb3VzZXVwKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRpZiAoISQoJy5hamF4LWRyb3Bkb3duJykuaXMoZS50YXJnZXQpICYmICQoJy5hamF4LWRyb3Bkb3duJykuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHRcdCQoJy5hamF4LWRyb3Bkb3duJykuZmFkZU91dCgxNTApO1xyXG5cdFx0XHRcdFx0JCgnLmFqYXgtZHJvcGRvd24nKS5wcmV2KCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdC8vIGxvYWRpbmcgYW5pbWF0aW9uIChkZW1vIHB1cnBvc2Ugb25seSlcclxuXHRcdFx0JCgnYnV0dG9uW2RhdGEtYnRuLWxvYWRpbmddJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyIGJ0biA9ICQodGhpcyk7XHJcblx0XHRcdFx0YnRuLmJ1dHRvbignbG9hZGluZycpO1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRidG4uYnV0dG9uKCdyZXNldCcpO1xyXG5cdFx0XHRcdH0sIDMwMDApO1xyXG5cdFx0XHR9KTtcclxuXHRcdFxyXG5cdFx0XHQvLyBOT1RJRklDQVRJT04gSVMgUFJFU0VOVFxyXG5cdFx0XHQvLyBDaGFuZ2UgY29sb3Igb2YgbGFibGUgb25jZSBub3RpZmljYXRpb24gYnV0dG9uIGlzIGNsaWNrZWRcclxuXHJcblx0XHRcdCR0aGlzID0gJCgnI2FjdGl2aXR5ID4gLmJhZGdlJyk7XHJcblx0XHJcblx0XHRcdGlmIChwYXJzZUludCgkdGhpcy50ZXh0KCkpID4gMCkge1xyXG5cdFx0XHRcdCR0aGlzLmFkZENsYXNzKFwiYmctY29sb3ItcmVkIGJvdW5jZUluIGFuaW1hdGVkXCIpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vY2xlYXIgbWVtb3J5IHJlZmVyZW5jZVxyXG5cdFx0XHRcdCR0aGlzID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly9QYWdlRXhwYW5kZXIgXHJcblx0XHRcdC8qZnVuY3Rpb24gUGFnZUV4cGFuZGVyKCl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJUaWNrVGltZXIgflwiKTtcclxuXHRcdFx0XHR2YXIgcGFnZUhlaWdodCA9ICQoXCIjY29udGVudFwiKS5oZWlnaHQoKSArICQoXCIjaGVhZGVyXCIpICs7XHJcblx0XHRcdH1cclxuXHRcclxuXHRcdFx0JCh3aW5kb3cpLmJpbmQoXCJsb2FkIHJlc2l6ZSBzY3JvbGxcIiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0ICAgICAgICBpZiAoJC5yb290Xy5oYXNDbGFzcyhcImRlc2t0b3AtZGV0ZWN0ZWRcIikpe1xyXG5cdFx0ICAgICAgICAgICAgUGFnZUV4cGFuZGVyKCk7XHJcblx0XHQgICAgICAgIH1cclxuXHRcdCAgICB9KTsqL1xyXG5cclxuXHRcdFx0XHJcblx0XHR9O1xyXG5cdFx0LyogfiBFTkQ6IE1JU0NFTEFORU9VUyBET00gKi9cclxuXHRcclxuXHRcdC8qXHJcblx0XHQgKiBNSVNDRUxBTkVPVVMgRE9NIFJFQURZIEZVTkNUSU9OU1xyXG5cdFx0ICogRGVzY3JpcHRpb246IGZpcmUgd2l0aCBqUXVlcnkoZG9jdW1lbnQpLnJlYWR5Li4uXHJcblx0XHQgKi9cclxuXHRcdGFwcC5tb2JpbGVDaGVja0FjdGl2YXRpb24gPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRcclxuXHRcdFx0aWYgKCQod2luZG93KS53aWR0aCgpIDwgOTc5KSB7XHJcblx0XHRcdFx0JC5yb290Xy5hZGRDbGFzcygnbW9iaWxlLXZpZXctYWN0aXZhdGVkJyk7XHJcblx0XHRcdFx0JC5yb290Xy5yZW1vdmVDbGFzcygnbWluaWZpZWQnKTtcclxuXHRcdFx0fSBlbHNlIGlmICgkLnJvb3RfLmhhc0NsYXNzKCdtb2JpbGUtdmlldy1hY3RpdmF0ZWQnKSkge1xyXG5cdFx0XHRcdCQucm9vdF8ucmVtb3ZlQ2xhc3MoJ21vYmlsZS12aWV3LWFjdGl2YXRlZCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZGVidWdTdGF0ZSl7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJtb2JpbGVDaGVja0FjdGl2YXRpb25cIik7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9IFxyXG5cdFx0LyogfiBFTkQ6IE1JU0NFTEFORU9VUyBET00gKi9cclxuXHJcblx0XHRyZXR1cm4gYXBwO1xyXG5cdFx0XHJcblx0fSkoe30pO1xyXG5cclxuXHRpbml0QXBwLmFkZERldmljZVR5cGUoKTtcclxuXHRpbml0QXBwLm1lbnVQb3MoKTtcclxuLypcclxuICogRE9DVU1FTlQgTE9BREVEIEVWRU5UXHJcbiAqIERlc2NyaXB0aW9uOiBGaXJlIHdoZW4gRE9NIGlzIHJlYWR5XHJcbiAqL1xyXG5cdGpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblx0XHRcclxuXHRcdGluaXRBcHAuU21hcnRBY3Rpb25zKCk7XHJcblx0XHRpbml0QXBwLmxlZnROYXYoKTtcclxuXHRcdGluaXRBcHAuZG9tUmVhZHlNaXNjKCk7XHJcblx0XHRpbml0QXBwLm1vYmlsZUNoZWNrQWN0aXZhdGlvbigpO1xyXG5cdH0pO1xyXG4vKlxyXG4gKiBSRVNJWkVSIFdJVEggVEhST1RUTEVcclxuICogU291cmNlOiBodHRwOi8vYmVuYWxtYW4uY29tL2NvZGUvcHJvamVjdHMvanF1ZXJ5LXJlc2l6ZS9leGFtcGxlcy9yZXNpemUvXHJcbiAqL1xyXG5cdChmdW5jdGlvbiAoJCwgd2luZG93LCB1bmRlZmluZWQpIHtcclxuXHRcclxuXHQgICAgdmFyIGVsZW1zID0gJChbXSksXHJcblx0ICAgICAgICBqcV9yZXNpemUgPSAkLnJlc2l6ZSA9ICQuZXh0ZW5kKCQucmVzaXplLCB7fSksXHJcblx0ICAgICAgICB0aW1lb3V0X2lkLCBzdHJfc2V0VGltZW91dCA9ICdzZXRUaW1lb3V0JyxcclxuXHQgICAgICAgIHN0cl9yZXNpemUgPSAncmVzaXplJyxcclxuXHQgICAgICAgIHN0cl9kYXRhID0gc3RyX3Jlc2l6ZSArICctc3BlY2lhbC1ldmVudCcsXHJcblx0ICAgICAgICBzdHJfZGVsYXkgPSAnZGVsYXknLFxyXG5cdCAgICAgICAgc3RyX3Rocm90dGxlID0gJ3Rocm90dGxlV2luZG93JztcclxuXHRcclxuXHQgICAganFfcmVzaXplW3N0cl9kZWxheV0gPSB0aHJvdHRsZV9kZWxheTtcclxuXHRcclxuXHQgICAganFfcmVzaXplW3N0cl90aHJvdHRsZV0gPSB0cnVlO1xyXG5cdFxyXG5cdCAgICAkLmV2ZW50LnNwZWNpYWxbc3RyX3Jlc2l6ZV0gPSB7XHJcblx0XHJcblx0ICAgICAgICBzZXR1cDogZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgICAgICAgIGlmICghanFfcmVzaXplW3N0cl90aHJvdHRsZV0gJiYgdGhpc1tzdHJfc2V0VGltZW91dF0pIHtcclxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHRcclxuXHQgICAgICAgICAgICB2YXIgZWxlbSA9ICQodGhpcyk7XHJcblx0ICAgICAgICAgICAgZWxlbXMgPSBlbGVtcy5hZGQoZWxlbSk7XHJcblx0ICAgICAgICAgICAgdHJ5IHtcclxuXHQgICAgICAgICAgICAgICAgJC5kYXRhKHRoaXMsIHN0cl9kYXRhLCB7XHJcblx0ICAgICAgICAgICAgICAgICAgICB3OiBlbGVtLndpZHRoKCksXHJcblx0ICAgICAgICAgICAgICAgICAgICBoOiBlbGVtLmhlaWdodCgpXHJcblx0ICAgICAgICAgICAgICAgIH0pO1xyXG5cdCAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuXHQgICAgICAgICAgICAgICAgJC5kYXRhKHRoaXMsIHN0cl9kYXRhLCB7XHJcblx0ICAgICAgICAgICAgICAgICAgICB3OiBlbGVtLndpZHRoLCAvLyBlbGVtLndpZHRoKCk7XHJcblx0ICAgICAgICAgICAgICAgICAgICBoOiBlbGVtLmhlaWdodCAvLyBlbGVtLmhlaWdodCgpO1xyXG5cdCAgICAgICAgICAgICAgICB9KTtcclxuXHQgICAgICAgICAgICB9XHJcblx0XHJcblx0ICAgICAgICAgICAgaWYgKGVsZW1zLmxlbmd0aCA9PT0gMSkge1xyXG5cdCAgICAgICAgICAgICAgICBsb29weSgpO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHQgICAgICAgIH0sXHJcblx0ICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgICAgICAgIGlmICghanFfcmVzaXplW3N0cl90aHJvdHRsZV0gJiYgdGhpc1tzdHJfc2V0VGltZW91dF0pIHtcclxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHRcclxuXHQgICAgICAgICAgICB2YXIgZWxlbSA9ICQodGhpcyk7XHJcblx0ICAgICAgICAgICAgZWxlbXMgPSBlbGVtcy5ub3QoZWxlbSk7XHJcblx0ICAgICAgICAgICAgZWxlbS5yZW1vdmVEYXRhKHN0cl9kYXRhKTtcclxuXHQgICAgICAgICAgICBpZiAoIWVsZW1zLmxlbmd0aCkge1xyXG5cdCAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dF9pZCk7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgfSxcclxuXHRcclxuXHQgICAgICAgIGFkZDogZnVuY3Rpb24gKGhhbmRsZU9iaikge1xyXG5cdCAgICAgICAgICAgIGlmICghanFfcmVzaXplW3N0cl90aHJvdHRsZV0gJiYgdGhpc1tzdHJfc2V0VGltZW91dF0pIHtcclxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHQgICAgICAgICAgICB2YXIgb2xkX2hhbmRsZXI7XHJcblx0XHJcblx0ICAgICAgICAgICAgZnVuY3Rpb24gbmV3X2hhbmRsZXIoZSwgdywgaCkge1xyXG5cdCAgICAgICAgICAgICAgICB2YXIgZWxlbSA9ICQodGhpcyksXHJcblx0ICAgICAgICAgICAgICAgICAgICBkYXRhID0gJC5kYXRhKHRoaXMsIHN0cl9kYXRhKTtcclxuXHQgICAgICAgICAgICAgICAgZGF0YS53ID0gdyAhPT0gdW5kZWZpbmVkID8gdyA6IGVsZW0ud2lkdGgoKTtcclxuXHQgICAgICAgICAgICAgICAgZGF0YS5oID0gaCAhPT0gdW5kZWZpbmVkID8gaCA6IGVsZW0uaGVpZ2h0KCk7XHJcblx0XHJcblx0ICAgICAgICAgICAgICAgIG9sZF9oYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgICAgIGlmICgkLmlzRnVuY3Rpb24oaGFuZGxlT2JqKSkge1xyXG5cdCAgICAgICAgICAgICAgICBvbGRfaGFuZGxlciA9IGhhbmRsZU9iajtcclxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ld19oYW5kbGVyO1xyXG5cdCAgICAgICAgICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICAgICAgICAgIG9sZF9oYW5kbGVyID0gaGFuZGxlT2JqLmhhbmRsZXI7XHJcblx0ICAgICAgICAgICAgICAgIGhhbmRsZU9iai5oYW5kbGVyID0gbmV3X2hhbmRsZXI7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgfVxyXG5cdCAgICB9O1xyXG5cdFxyXG5cdCAgICBmdW5jdGlvbiBsb29weSgpIHtcclxuXHQgICAgICAgIHRpbWVvdXRfaWQgPSB3aW5kb3dbc3RyX3NldFRpbWVvdXRdKGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICAgICAgICBlbGVtcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHQgICAgICAgICAgICAgICAgdmFyIHdpZHRoO1xyXG5cdCAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0O1xyXG5cdFxyXG5cdCAgICAgICAgICAgICAgICB2YXIgZWxlbSA9ICQodGhpcyksXHJcblx0ICAgICAgICAgICAgICAgICAgICBkYXRhID0gJC5kYXRhKHRoaXMsIHN0cl9kYXRhKTsgLy93aWR0aCA9IGVsZW0ud2lkdGgoKSwgaGVpZ2h0ID0gZWxlbS5oZWlnaHQoKTtcclxuXHRcclxuXHQgICAgICAgICAgICAgICAgLy8gSGlnaGNoYXJ0cyBmaXhcclxuXHQgICAgICAgICAgICAgICAgdHJ5IHtcclxuXHQgICAgICAgICAgICAgICAgICAgIHdpZHRoID0gZWxlbS53aWR0aCgpO1xyXG5cdCAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcblx0ICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IGVsZW0ud2lkdGg7XHJcblx0ICAgICAgICAgICAgICAgIH1cclxuXHRcclxuXHQgICAgICAgICAgICAgICAgdHJ5IHtcclxuXHQgICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IGVsZW0uaGVpZ2h0KCk7XHJcblx0ICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuXHQgICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IGVsZW0uaGVpZ2h0O1xyXG5cdCAgICAgICAgICAgICAgICB9XHJcblx0ICAgICAgICAgICAgICAgIC8vZml4ZWQgYnVnXHJcblx0XHJcblx0XHJcblx0ICAgICAgICAgICAgICAgIGlmICh3aWR0aCAhPT0gZGF0YS53IHx8IGhlaWdodCAhPT0gZGF0YS5oKSB7XHJcblx0ICAgICAgICAgICAgICAgICAgICBlbGVtLnRyaWdnZXIoc3RyX3Jlc2l6ZSwgW2RhdGEudyA9IHdpZHRoLCBkYXRhLmggPSBoZWlnaHRdKTtcclxuXHQgICAgICAgICAgICAgICAgfVxyXG5cdFxyXG5cdCAgICAgICAgICAgIH0pO1xyXG5cdCAgICAgICAgICAgIGxvb3B5KCk7XHJcblx0XHJcblx0ICAgICAgICB9LCBqcV9yZXNpemVbc3RyX2RlbGF5XSk7XHJcblx0XHJcblx0ICAgIH1cclxuXHRcclxuXHR9KShqUXVlcnksIHRoaXMpO1xyXG4vKlxyXG4qIEFERCBDTEFTUyBXSEVOIEJFTE9XIENFUlRBSU4gV0lEVEggKE1PQklMRSBNRU5VKVxyXG4qIERlc2NyaXB0aW9uOiB0cmFja3MgdGhlIHBhZ2UgbWluLXdpZHRoIG9mICNDT05URU5UIGFuZCBOQVYgd2hlbiBuYXZpZ2F0aW9uIGlzIHJlc2l6ZWQuXHJcbiogVGhpcyBpcyB0byBjb3VudGVyIGJ1Z3MgZm9yIG1pbmltdW0gcGFnZSB3aWR0aCBvbiBtYW55IGRlc2t0b3AgYW5kIG1vYmlsZSBkZXZpY2VzLlxyXG4qIE5vdGU6IFRoaXMgc2NyaXB0IHV0aWxpemVzIEpTdGhyb3R0bGUgc2NyaXB0IHNvIGRvbid0IHdvcnJ5IGFib3V0IG1lbW9yeS9DUFUgdXNhZ2VcclxuKi9cclxuXHQkKCcjbWFpbicpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdFxyXG5cdFx0aW5pdEFwcC5tb2JpbGVDaGVja0FjdGl2YXRpb24oKTtcclxuXHRcdFxyXG5cdH0pO1xyXG5cclxuLyogfiBFTkQ6IE5BViBPUiAjTEVGVC1CQVIgUkVTSVpFIERFVEVDVCAqL1xyXG5cclxuLypcclxuICogREVURUNUIElFIFZFUlNJT05cclxuICogRGVzY3JpcHRpb246IEEgc2hvcnQgc25pcHBldCBmb3IgZGV0ZWN0aW5nIHZlcnNpb25zIG9mIElFIGluIEphdmFTY3JpcHRcclxuICogd2l0aG91dCByZXNvcnRpbmcgdG8gdXNlci1hZ2VudCBzbmlmZmluZ1xyXG4gKiBSRVRVUk5TOlxyXG4gKiBJZiB5b3UncmUgbm90IGluIElFIChvciBJRSB2ZXJzaW9uIGlzIGxlc3MgdGhhbiA1KSB0aGVuOlxyXG4gKiAvL2llID09PSB1bmRlZmluZWRcclxuICpcclxuICogSWYgeW91J3JlIGluIElFICg+PTUpIHRoZW4geW91IGNhbiBkZXRlcm1pbmUgd2hpY2ggdmVyc2lvbjpcclxuICogLy8gaWUgPT09IDc7IC8vIElFN1xyXG4gKlxyXG4gKiBUaHVzLCB0byBkZXRlY3QgSUU6XHJcbiAqIC8vIGlmIChpZSkge31cclxuICpcclxuICogQW5kIHRvIGRldGVjdCB0aGUgdmVyc2lvbjpcclxuICogaWUgPT09IDYgLy8gSUU2XHJcbiAqIGllID4gNyAvLyBJRTgsIElFOSAuLi5cclxuICogaWUgPCA5IC8vIEFueXRoaW5nIGxlc3MgdGhhbiBJRTlcclxuICovXHJcbi8vIFRPRE86IGRlbGV0ZSB0aGlzIGZ1bmN0aW9uIGxhdGVyIC0gbm8gbG9uZ2VyIG5lZWRlZCAoPylcclxuXHR2YXIgaWUgPSAoIGZ1bmN0aW9uKCkge1xyXG5cdFxyXG5cdFx0dmFyIHVuZGVmLCB2ID0gMywgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksIGFsbCA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaScpO1xyXG5cdFxyXG5cdFx0d2hpbGUgKGRpdi5pbm5lckhUTUwgPSAnPCEtLVtpZiBndCBJRSAnICsgKCsrdikgKyAnXT48aT48L2k+PCFbZW5kaWZdLS0+JywgYWxsWzBdKTtcclxuXHRcclxuXHRcdHJldHVybiB2ID4gNCA/IHYgOiB1bmRlZjtcclxuXHRcclxuXHR9KCkpOyBcclxuLyogfiBFTkQ6IERFVEVDVCBJRSBWRVJTSU9OICovXHJcblxyXG4vKlxyXG4gKiBDVVNUT00gTUVOVSBQTFVHSU5cclxuICovXHJcblx0JC5mbi5leHRlbmQoe1xyXG5cdFxyXG5cdFx0Ly9wYXNzIHRoZSBvcHRpb25zIHZhcmlhYmxlIHRvIHRoZSBmdW5jdGlvblxyXG5cdFx0amFydmlzbWVudSA6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRcclxuXHRcdFx0dmFyIGRlZmF1bHRzID0ge1xyXG5cdFx0XHRcdGFjY29yZGlvbiA6ICd0cnVlJyxcclxuXHRcdFx0XHRzcGVlZCA6IDIwMCxcclxuXHRcdFx0XHRjbG9zZWRTaWduIDogJ1srXScsXHJcblx0XHRcdFx0b3BlbmVkU2lnbiA6ICdbLV0nXHJcblx0XHRcdH0sXHJcblx0XHJcblx0XHRcdC8vIEV4dGVuZCBvdXIgZGVmYXVsdCBvcHRpb25zIHdpdGggdGhvc2UgcHJvdmlkZWQuXHJcblx0XHRcdFx0b3B0cyA9ICQuZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKSxcclxuXHRcdFx0Ly9Bc3NpZ24gY3VycmVudCBlbGVtZW50IHRvIHZhcmlhYmxlLCBpbiB0aGlzIGNhc2UgaXMgVUwgZWxlbWVudFxyXG5cdFx0XHRcdCR0aGlzID0gJCh0aGlzKTtcclxuXHRcclxuXHRcdFx0Ly9hZGQgYSBtYXJrIFsrXSB0byBhIG11bHRpbGV2ZWwgbWVudVxyXG5cdFx0XHQkdGhpcy5maW5kKFwibGlcIikuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5maW5kKFwidWxcIikuc2l6ZSgpICE9PSAwKSB7XHJcblx0XHRcdFx0XHQvL2FkZCB0aGUgbXVsdGlsZXZlbCBzaWduIG5leHQgdG8gdGhlIGxpbmtcclxuXHRcdFx0XHRcdCQodGhpcykuZmluZChcImE6Zmlyc3RcIikuYXBwZW5kKFwiPGIgY2xhc3M9J2NvbGxhcHNlLXNpZ24nPlwiICsgb3B0cy5jbG9zZWRTaWduICsgXCI8L2I+XCIpO1xyXG5cdFxyXG5cdFx0XHRcdFx0Ly9hdm9pZCBqdW1waW5nIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2Ugd2hlbiB0aGUgaHJlZiBpcyBhbiAjXHJcblx0XHRcdFx0XHRpZiAoJCh0aGlzKS5maW5kKFwiYTpmaXJzdFwiKS5hdHRyKCdocmVmJykgPT0gXCIjXCIpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5maW5kKFwiYTpmaXJzdFwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHJcblx0XHRcdC8vb3BlbiBhY3RpdmUgbGV2ZWxcclxuXHRcdFx0JHRoaXMuZmluZChcImxpLmFjdGl2ZVwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQodGhpcykucGFyZW50cyhcInVsXCIpLnNsaWRlRG93bihvcHRzLnNwZWVkKTtcclxuXHRcdFx0XHQkKHRoaXMpLnBhcmVudHMoXCJ1bFwiKS5wYXJlbnQoXCJsaVwiKS5maW5kKFwiYjpmaXJzdFwiKS5odG1sKG9wdHMub3BlbmVkU2lnbik7XHJcblx0XHRcdFx0JCh0aGlzKS5wYXJlbnRzKFwidWxcIikucGFyZW50KFwibGlcIikuYWRkQ2xhc3MoXCJvcGVuXCIpO1xyXG5cdFx0XHR9KTtcclxuXHRcclxuXHRcdFx0JHRoaXMuZmluZChcImxpIGFcIikuY2xpY2soZnVuY3Rpb24oKSB7XHJcblx0XHJcblx0XHRcdFx0aWYgKCQodGhpcykucGFyZW50KCkuZmluZChcInVsXCIpLnNpemUoKSAhPT0gMCkge1xyXG5cdFxyXG5cdFx0XHRcdFx0aWYgKG9wdHMuYWNjb3JkaW9uKSB7XHJcblx0XHRcdFx0XHRcdC8vRG8gbm90aGluZyB3aGVuIHRoZSBsaXN0IGlzIG9wZW5cclxuXHRcdFx0XHRcdFx0aWYgKCEkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCJ1bFwiKS5pcygnOnZpc2libGUnKSkge1xyXG5cdFx0XHRcdFx0XHRcdHBhcmVudHMgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudHMoXCJ1bFwiKTtcclxuXHRcdFx0XHRcdFx0XHR2aXNpYmxlID0gJHRoaXMuZmluZChcInVsOnZpc2libGVcIik7XHJcblx0XHRcdFx0XHRcdFx0dmlzaWJsZS5lYWNoKGZ1bmN0aW9uKHZpc2libGVJbmRleCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIGNsb3NlID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudHMuZWFjaChmdW5jdGlvbihwYXJlbnRJbmRleCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAocGFyZW50c1twYXJlbnRJbmRleF0gPT0gdmlzaWJsZVt2aXNpYmxlSW5kZXhdKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xvc2UgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNsb3NlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICgkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCJ1bFwiKSAhPSB2aXNpYmxlW3Zpc2libGVJbmRleF0pIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQkKHZpc2libGVbdmlzaWJsZUluZGV4XSkuc2xpZGVVcChvcHRzLnNwZWVkLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCQodGhpcykucGFyZW50KFwibGlcIikuZmluZChcImI6Zmlyc3RcIikuaHRtbChvcHRzLmNsb3NlZFNpZ24pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoXCJsaVwiKS5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fS8vIGVuZCBpZlxyXG5cdFx0XHRcdFx0aWYgKCQodGhpcykucGFyZW50KCkuZmluZChcInVsOmZpcnN0XCIpLmlzKFwiOnZpc2libGVcIikgJiYgISQodGhpcykucGFyZW50KCkuZmluZChcInVsOmZpcnN0XCIpLmhhc0NsYXNzKFwiYWN0aXZlXCIpKSB7XHJcblx0XHRcdFx0XHRcdCQodGhpcykucGFyZW50KCkuZmluZChcInVsOmZpcnN0XCIpLnNsaWRlVXAob3B0cy5zcGVlZCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoXCJsaVwiKS5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XHJcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoXCJsaVwiKS5maW5kKFwiYjpmaXJzdFwiKS5kZWxheShvcHRzLnNwZWVkKS5odG1sKG9wdHMuY2xvc2VkU2lnbik7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5maW5kKFwidWw6Zmlyc3RcIikuc2xpZGVEb3duKG9wdHMuc3BlZWQsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdC8qJCh0aGlzKS5lZmZlY3QoXCJoaWdobGlnaHRcIiwge2NvbG9yIDogJyM2MTYxNjEnfSwgNTAwKTsgLSBkaXNhYmxlZCBkdWUgdG8gQ1BVIGNsb2NraW5nIG9uIHBob25lcyovXHJcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoXCJsaVwiKS5hZGRDbGFzcyhcIm9wZW5cIik7XHJcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoXCJsaVwiKS5maW5kKFwiYjpmaXJzdFwiKS5kZWxheShvcHRzLnNwZWVkKS5odG1sKG9wdHMub3BlbmVkU2lnbik7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fSAvLyBlbmQgZWxzZVxyXG5cdFx0XHRcdH0gLy8gZW5kIGlmXHJcblx0XHRcdH0pO1xyXG5cdFx0fSAvLyBlbmQgZnVuY3Rpb25cclxuXHR9KTtcclxuLyogfiBFTkQ6IENVU1RPTSBNRU5VIFBMVUdJTiAqL1xyXG5cclxuLypcclxuICogRUxFTUVOVCBFWElTVCBPUiBOT1RcclxuICogRGVzY3JpcHRpb246IHJldHVybnMgdHJ1ZSBvciBmYWxzZVxyXG4gKiBVc2FnZTogJCgnI215RGl2JykuZG9lc0V4aXN0KCk7XHJcbiAqL1xyXG5cdGpRdWVyeS5mbi5kb2VzRXhpc3QgPSBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBqUXVlcnkodGhpcykubGVuZ3RoID4gMDtcclxuXHR9O1xyXG4vKiB+IEVORDogRUxFTUVOVCBFWElTVCBPUiBOT1QgKi9cclxuXHJcbi8qXHJcbiAqIElOSVRJQUxJWkUgRk9STVNcclxuICogRGVzY3JpcHRpb246IFNlbGVjdDIsIE1hc2tpbmcsIERhdGVwaWNrZXIsIEF1dG9jb21wbGV0ZVxyXG4gKi9cdFxyXG5cdGZ1bmN0aW9uIHJ1bkFsbEZvcm1zKCkge1xyXG5cdFxyXG5cdFx0LypcclxuXHRcdCAqIEJPT1RTVFJBUCBTTElERVIgUExVR0lOXHJcblx0XHQgKiBVc2FnZTpcclxuXHRcdCAqIERlcGVuZGVuY3k6IGpzL3BsdWdpbi9ib290c3RyYXAtc2xpZGVyXHJcblx0XHQgKi9cclxuXHRcdGlmICgkLmZuLnNsaWRlcikge1xyXG5cdFx0XHQkKCcuc2xpZGVyJykuc2xpZGVyKCk7XHJcblx0XHR9XHJcblx0XHJcblx0XHQvKlxyXG5cdFx0ICogU0VMRUNUMiBQTFVHSU5cclxuXHRcdCAqIFVzYWdlOlxyXG5cdFx0ICogRGVwZW5kZW5jeToganMvcGx1Z2luL3NlbGVjdDIvXHJcblx0XHQgKi9cclxuXHRcdGlmICgkLmZuLnNlbGVjdDIpIHtcclxuXHRcdFx0JCgnc2VsZWN0LnNlbGVjdDInKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXHJcblx0XHRcdFx0XHR3aWR0aCA9ICR0aGlzLmF0dHIoJ2RhdGEtc2VsZWN0LXdpZHRoJykgfHwgJzEwMCUnO1xyXG5cdFx0XHRcdC8vLCBfc2hvd1NlYXJjaElucHV0ID0gJHRoaXMuYXR0cignZGF0YS1zZWxlY3Qtc2VhcmNoJykgPT09ICd0cnVlJztcclxuXHRcdFx0XHQkdGhpcy5zZWxlY3QyKHtcclxuXHRcdFx0XHRcdC8vc2hvd1NlYXJjaElucHV0IDogX3Nob3dTZWFyY2hJbnB1dCxcclxuXHRcdFx0XHRcdGFsbG93Q2xlYXIgOiB0cnVlLFxyXG5cdFx0XHRcdFx0d2lkdGggOiB3aWR0aFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHQvL2NsZWFyIG1lbW9yeSByZWZlcmVuY2VcclxuXHRcdFx0XHQkdGhpcyA9IG51bGw7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFxyXG5cdFx0LypcclxuXHRcdCAqIE1BU0tJTkdcclxuXHRcdCAqIERlcGVuZGVuY3k6IGpzL3BsdWdpbi9tYXNrZWQtaW5wdXQvXHJcblx0XHQgKi9cclxuXHRcdGlmICgkLmZuLm1hc2spIHtcclxuXHRcdFx0JCgnW2RhdGEtbWFza10nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFxyXG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXHJcblx0XHRcdFx0XHRtYXNrID0gJHRoaXMuYXR0cignZGF0YS1tYXNrJykgfHwgJ2Vycm9yLi4uJywgbWFza19wbGFjZWhvbGRlciA9ICR0aGlzLmF0dHIoJ2RhdGEtbWFzay1wbGFjZWhvbGRlcicpIHx8ICdYJztcclxuXHRcclxuXHRcdFx0XHQkdGhpcy5tYXNrKG1hc2ssIHtcclxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyIDogbWFza19wbGFjZWhvbGRlclxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vY2xlYXIgbWVtb3J5IHJlZmVyZW5jZVxyXG5cdFx0XHRcdCR0aGlzID0gbnVsbDtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHJcblx0XHQvKlxyXG5cdFx0ICogQVVUT0NPTVBMRVRFXHJcblx0XHQgKiBEZXBlbmRlbmN5OiBqcy9qcXVpXHJcblx0XHQgKi9cclxuXHRcdGlmICgkLmZuLmF1dG9jb21wbGV0ZSkge1xyXG5cdFx0XHQkKCdbZGF0YS1hdXRvY29tcGxldGVdJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcclxuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG5cdFx0XHRcdFx0YXZhaWxhYmxlVGFncyA9ICR0aGlzLmRhdGEoJ2F1dG9jb21wbGV0ZScpIHx8IFtcIlRoZVwiLCBcIlF1aWNrXCIsIFwiQnJvd25cIiwgXCJGb3hcIiwgXCJKdW1wc1wiLCBcIk92ZXJcIiwgXCJUaHJlZVwiLCBcIkxhenlcIiwgXCJEb2dzXCJdO1xyXG5cdFxyXG5cdFx0XHRcdCR0aGlzLmF1dG9jb21wbGV0ZSh7XHJcblx0XHRcdFx0XHRzb3VyY2UgOiBhdmFpbGFibGVUYWdzXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly9jbGVhciBtZW1vcnkgcmVmZXJlbmNlXHJcblx0XHRcdFx0JHRoaXMgPSBudWxsO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcclxuXHRcdC8qXHJcblx0XHQgKiBKUVVFUlkgVUkgREFURVxyXG5cdFx0ICogRGVwZW5kZW5jeToganMvbGlicy9qcXVlcnktdWktMS4xMC4zLm1pbi5qc1xyXG5cdFx0ICogVXNhZ2U6IDxpbnB1dCBjbGFzcz1cImRhdGVwaWNrZXJcIiAvPlxyXG5cdFx0ICovXHJcblx0XHRpZiAoJC5mbi5kYXRlcGlja2VyKSB7XHJcblx0XHRcdCQoJy5kYXRlcGlja2VyJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcclxuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG5cdFx0XHRcdFx0ZGF0YURhdGVGb3JtYXQgPSAkdGhpcy5hdHRyKCdkYXRhLWRhdGVmb3JtYXQnKSB8fCAnZGQubW0ueXknO1xyXG5cdFxyXG5cdFx0XHRcdCR0aGlzLmRhdGVwaWNrZXIoe1xyXG5cdFx0XHRcdFx0ZGF0ZUZvcm1hdCA6IGRhdGFEYXRlRm9ybWF0LFxyXG5cdFx0XHRcdFx0cHJldlRleHQgOiAnPGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIj48L2k+JyxcclxuXHRcdFx0XHRcdG5leHRUZXh0IDogJzxpIGNsYXNzPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvaT4nLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vY2xlYXIgbWVtb3J5IHJlZmVyZW5jZVxyXG5cdFx0XHRcdCR0aGlzID0gbnVsbDtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHJcblx0XHQvKlxyXG5cdFx0ICogQUpBWCBCVVRUT04gTE9BRElORyBURVhUXHJcblx0XHQgKiBVc2FnZTogPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1sb2FkaW5nLXRleHQ9XCJMb2FkaW5nLi4uXCIgY2xhc3M9XCJidG4gYnRuLXhzIGJ0bi1kZWZhdWx0IGFqYXgtcmVmcmVzaFwiPiAuLiA8L2J1dHRvbj5cclxuXHRcdCAqL1xyXG5cdFx0JCgnYnV0dG9uW2RhdGEtbG9hZGluZy10ZXh0XScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgYnRuID0gJCh0aGlzKTtcclxuXHRcdFx0YnRuLmJ1dHRvbignbG9hZGluZycpO1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGJ0bi5idXR0b24oJ3Jlc2V0Jyk7XHJcblx0XHRcdFx0Ly9jbGVhciBtZW1vcnkgcmVmZXJlbmNlXHJcblx0XHRcdFx0YnRuID0gbnVsbDtcclxuXHRcdFx0fSwgMzAwMCk7XHJcblxyXG5cdFx0fSk7XHJcblx0XHJcblx0fVxyXG4vKiB+IEVORDogSU5JVElBTElaRSBGT1JNUyAqL1xyXG5cclxuLypcclxuICogSU5JVElBTElaRSBDSEFSVFNcclxuICogRGVzY3JpcHRpb246IFNwYXJrbGluZXMsIFBpZUNoYXJ0c1xyXG4gKi9cclxuXHRmdW5jdGlvbiBydW5BbGxDaGFydHMoKSB7XHJcblx0XHQvKlxyXG5cdFx0ICogU1BBUktMSU5FU1xyXG5cdFx0ICogREVQRU5ERU5DWToganMvcGx1Z2lucy9zcGFya2xpbmUvanF1ZXJ5LnNwYXJrbGluZS5taW4uanNcclxuXHRcdCAqIFNlZSB1c2FnZSBleGFtcGxlIGJlbG93Li4uXHJcblx0XHQgKi9cclxuXHRcclxuXHRcdC8qIFVzYWdlOlxyXG5cdFx0ICogXHRcdDxkaXYgY2xhc3M9XCJzcGFya2xpbmUtbGluZSB0eHQtY29sb3ItYmx1ZVwiIGRhdGEtZmlsbC1jb2xvcj1cInRyYW5zcGFyZW50XCIgZGF0YS1zcGFya2xpbmUtaGVpZ2h0PVwiMjZweFwiPlxyXG5cdFx0ICpcdFx0XHQ1LDYsNyw5LDksNSw5LDYsNSw2LDYsNyw3LDYsNyw4LDksN1xyXG5cdFx0ICpcdFx0PC9kaXY+XHJcblx0XHQgKi9cclxuXHRcclxuXHRcdGlmICgkLmZuLnNwYXJrbGluZSkge1xyXG5cdFxyXG5cdFx0XHQvLyB2YXJpYWJsZSBkZWNsZWFyYXRpb25zOlxyXG5cdFxyXG5cdFx0XHR2YXIgYmFyQ29sb3IsXHJcblx0XHRcdCAgICBzcGFya2xpbmVIZWlnaHQsXHJcblx0XHRcdCAgICBzcGFya2xpbmVCYXJXaWR0aCxcclxuXHRcdFx0ICAgIHNwYXJrbGluZUJhclNwYWNpbmcsXHJcblx0XHRcdCAgICBzcGFya2xpbmVOZWdCYXJDb2xvcixcclxuXHRcdFx0ICAgIHNwYXJrbGluZVN0YWNrZWRDb2xvcixcclxuXHRcdFx0ICAgIHRoaXNMaW5lQ29sb3IsXHJcblx0XHRcdCAgICB0aGlzTGluZVdpZHRoLFxyXG5cdFx0XHQgICAgdGhpc0ZpbGwsXHJcblx0XHRcdCAgICB0aGlzU3BvdENvbG9yLFxyXG5cdFx0XHQgICAgdGhpc01pblNwb3RDb2xvcixcclxuXHRcdFx0ICAgIHRoaXNNYXhTcG90Q29sb3IsXHJcblx0XHRcdCAgICB0aGlzaGlnaGxpZ2h0U3BvdENvbG9yLFxyXG5cdFx0XHQgICAgdGhpc0hpZ2hsaWdodExpbmVDb2xvcixcclxuXHRcdFx0ICAgIHRoaXNTcG90UmFkaXVzLFx0XHRcdCAgICAgICAgXHJcblx0XHRcdFx0cGllQ29sb3JzLFxyXG5cdFx0XHQgICAgcGllV2lkdGhIZWlnaHQsXHJcblx0XHRcdCAgICBwaWVCb3JkZXJDb2xvcixcclxuXHRcdFx0ICAgIHBpZU9mZnNldCxcclxuXHRcdFx0IFx0dGhpc0JveFdpZHRoLFxyXG5cdFx0XHQgICAgdGhpc0JveEhlaWdodCxcclxuXHRcdFx0ICAgIHRoaXNCb3hSYXcsXHJcblx0XHRcdCAgICB0aGlzQm94VGFyZ2V0LFxyXG5cdFx0XHQgICAgdGhpc0JveE1pbixcclxuXHRcdFx0ICAgIHRoaXNCb3hNYXgsXHJcblx0XHRcdCAgICB0aGlzU2hvd091dGxpZXIsXHJcblx0XHRcdCAgICB0aGlzSVFSLFxyXG5cdFx0XHQgICAgdGhpc0JveFNwb3RSYWRpdXMsXHJcblx0XHRcdCAgICB0aGlzQm94TGluZUNvbG9yLFxyXG5cdFx0XHQgICAgdGhpc0JveEZpbGxDb2xvcixcclxuXHRcdFx0ICAgIHRoaXNCb3hXaGlzQ29sb3IsXHJcblx0XHRcdCAgICB0aGlzQm94T3V0bGluZUNvbG9yLFxyXG5cdFx0XHQgICAgdGhpc0JveE91dGxpbmVGaWxsLFxyXG5cdFx0XHQgICAgdGhpc0JveE1lZGlhbkNvbG9yLFxyXG5cdFx0XHQgICAgdGhpc0JveFRhcmdldENvbG9yLFxyXG5cdFx0XHRcdHRoaXNCdWxsZXRIZWlnaHQsXHJcblx0XHRcdCAgICB0aGlzQnVsbGV0V2lkdGgsXHJcblx0XHRcdCAgICB0aGlzQnVsbGV0Q29sb3IsXHJcblx0XHRcdCAgICB0aGlzQnVsbGV0UGVyZm9ybWFuY2VDb2xvcixcclxuXHRcdFx0ICAgIHRoaXNCdWxsZXRSYW5nZUNvbG9ycyxcclxuXHRcdFx0XHR0aGlzRGlzY3JldGVIZWlnaHQsXHJcblx0XHRcdCAgICB0aGlzRGlzY3JldGVXaWR0aCxcclxuXHRcdFx0ICAgIHRoaXNEaXNjcmV0ZUxpbmVDb2xvcixcclxuXHRcdFx0ICAgIHRoaXNEaXNjcmV0ZUxpbmVIZWlnaHQsXHJcblx0XHRcdCAgICB0aGlzRGlzY3JldGVUaHJ1c2hvbGQsXHJcblx0XHRcdCAgICB0aGlzRGlzY3JldGVUaHJ1c2hvbGRDb2xvcixcclxuXHRcdFx0XHR0aGlzVHJpc3RhdGVIZWlnaHQsXHJcblx0XHRcdCAgICB0aGlzVHJpc3RhdGVQb3NCYXJDb2xvcixcclxuXHRcdFx0ICAgIHRoaXNUcmlzdGF0ZU5lZ0JhckNvbG9yLFxyXG5cdFx0XHQgICAgdGhpc1RyaXN0YXRlWmVyb0JhckNvbG9yLFxyXG5cdFx0XHQgICAgdGhpc1RyaXN0YXRlQmFyV2lkdGgsXHJcblx0XHRcdCAgICB0aGlzVHJpc3RhdGVCYXJTcGFjaW5nLFxyXG5cdFx0XHQgICAgdGhpc1plcm9BeGlzLFxyXG5cdFx0XHQgICAgdGhpc0JhckNvbG9yLFxyXG5cdFx0XHQgICAgc3BhcmtsaW5lV2lkdGgsXHJcblx0XHRcdCAgICBzcGFya2xpbmVWYWx1ZSxcclxuXHRcdFx0ICAgIHNwYXJrbGluZVZhbHVlU3BvdHMxLFxyXG5cdFx0XHQgICAgc3BhcmtsaW5lVmFsdWVTcG90czIsXHJcblx0XHRcdCAgICB0aGlzTGluZVdpZHRoMSxcclxuXHRcdFx0ICAgIHRoaXNMaW5lV2lkdGgyLFxyXG5cdFx0XHQgICAgdGhpc0xpbmVDb2xvcjEsXHJcblx0XHRcdCAgICB0aGlzTGluZUNvbG9yMixcclxuXHRcdFx0ICAgIHRoaXNTcG90UmFkaXVzMSxcclxuXHRcdFx0ICAgIHRoaXNTcG90UmFkaXVzMixcclxuXHRcdFx0ICAgIHRoaXNNaW5TcG90Q29sb3IxLFxyXG5cdFx0XHQgICAgdGhpc01heFNwb3RDb2xvcjEsXHJcblx0XHRcdCAgICB0aGlzTWluU3BvdENvbG9yMixcclxuXHRcdFx0ICAgIHRoaXNNYXhTcG90Q29sb3IyLFxyXG5cdFx0XHQgICAgdGhpc2hpZ2hsaWdodFNwb3RDb2xvcjEsXHJcblx0XHRcdCAgICB0aGlzSGlnaGxpZ2h0TGluZUNvbG9yMSxcclxuXHRcdFx0ICAgIHRoaXNoaWdobGlnaHRTcG90Q29sb3IyLFxyXG5cdFx0XHQgICAgdGhpc0ZpbGxDb2xvcjEsXHJcblx0XHRcdCAgICB0aGlzRmlsbENvbG9yMjtcclxuXHRcdFx0XHRcdCAgICBcdFx0XHRcdCAgICBcdFxyXG5cdFx0XHQkKCcuc3BhcmtsaW5lOm5vdCg6aGFzKD5jYW52YXMpKScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHRcdHNwYXJrbGluZVR5cGUgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtdHlwZScpIHx8ICdiYXInO1xyXG5cdFxyXG5cdFx0XHRcdC8vIEJBUiBDSEFSVFxyXG5cdFx0XHRcdGlmIChzcGFya2xpbmVUeXBlID09ICdiYXInKSB7XHJcblx0XHJcblx0XHRcdFx0XHRcdGJhckNvbG9yID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWJhci1jb2xvcicpIHx8ICR0aGlzLmNzcygnY29sb3InKSB8fCAnIzAwMDBmMCc7XHJcblx0XHRcdFx0XHQgICAgc3BhcmtsaW5lSGVpZ2h0ID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWhlaWdodCcpIHx8ICcyNnB4JztcclxuXHRcdFx0XHRcdCAgICBzcGFya2xpbmVCYXJXaWR0aCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1iYXJ3aWR0aCcpIHx8IDU7XHJcblx0XHRcdFx0XHQgICAgc3BhcmtsaW5lQmFyU3BhY2luZyA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1iYXJzcGFjaW5nJykgfHwgMjtcclxuXHRcdFx0XHRcdCAgICBzcGFya2xpbmVOZWdCYXJDb2xvciA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1uZWdiYXItY29sb3InKSB8fCAnI0E5MDMyOSc7XHJcblx0XHRcdFx0XHQgICAgc3BhcmtsaW5lU3RhY2tlZENvbG9yID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWJhcnN0YWNrZWQtY29sb3InKSB8fCBbXCIjQTkwMzI5XCIsIFwiIzAwOTljNlwiLCBcIiM5OEFBNTZcIiwgXCIjZGE1MzJjXCIsIFwiIzQ0OTBCMVwiLCBcIiM2RTk0NjFcIiwgXCIjOTkwMDk5XCIsIFwiI0I0Q0FEM1wiXTtcclxuXHRcdFx0XHRcdCAgICAgICAgXHJcblx0XHRcdFx0XHQkdGhpcy5zcGFya2xpbmUoJ2h0bWwnLCB7XHJcblx0XHRcdFx0XHRcdGJhckNvbG9yIDogYmFyQ29sb3IsXHJcblx0XHRcdFx0XHRcdHR5cGUgOiBzcGFya2xpbmVUeXBlLFxyXG5cdFx0XHRcdFx0XHRoZWlnaHQgOiBzcGFya2xpbmVIZWlnaHQsXHJcblx0XHRcdFx0XHRcdGJhcldpZHRoIDogc3BhcmtsaW5lQmFyV2lkdGgsXHJcblx0XHRcdFx0XHRcdGJhclNwYWNpbmcgOiBzcGFya2xpbmVCYXJTcGFjaW5nLFxyXG5cdFx0XHRcdFx0XHRzdGFja2VkQmFyQ29sb3IgOiBzcGFya2xpbmVTdGFja2VkQ29sb3IsXHJcblx0XHRcdFx0XHRcdG5lZ0JhckNvbG9yIDogc3BhcmtsaW5lTmVnQmFyQ29sb3IsXHJcblx0XHRcdFx0XHRcdHplcm9BeGlzIDogJ2ZhbHNlJ1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdCR0aGlzID0gbnVsbDtcclxuXHRcclxuXHRcdFx0XHR9XHJcblx0XHJcblx0XHRcdFx0Ly8gTElORSBDSEFSVFxyXG5cdFx0XHRcdGlmIChzcGFya2xpbmVUeXBlID09ICdsaW5lJykge1xyXG5cdFxyXG5cdFx0XHRcdFx0XHRzcGFya2xpbmVIZWlnaHQgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtaGVpZ2h0JykgfHwgJzIwcHgnO1xyXG5cdFx0XHRcdFx0ICAgIHNwYXJrbGluZVdpZHRoID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLXdpZHRoJykgfHwgJzkwcHgnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNMaW5lQ29sb3IgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtbGluZS1jb2xvcicpIHx8ICR0aGlzLmNzcygnY29sb3InKSB8fCAnIzAwMDBmMCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc0xpbmVXaWR0aCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1saW5lLXdpZHRoJykgfHwgMTtcclxuXHRcdFx0XHRcdCAgICB0aGlzRmlsbCA9ICR0aGlzLmRhdGEoJ2ZpbGwtY29sb3InKSB8fCAnI2MwZDBmMCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc1Nwb3RDb2xvciA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1zcG90LWNvbG9yJykgfHwgJyNmMDgwMDAnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNNaW5TcG90Q29sb3IgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtbWluc3BvdC1jb2xvcicpIHx8ICcjZWQxYzI0JztcclxuXHRcdFx0XHRcdCAgICB0aGlzTWF4U3BvdENvbG9yID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLW1heHNwb3QtY29sb3InKSB8fCAnI2YwODAwMCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc2hpZ2hsaWdodFNwb3RDb2xvciA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1oaWdobGlnaHRzcG90LWNvbG9yJykgfHwgJyM1MGYwNTAnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNIaWdobGlnaHRMaW5lQ29sb3IgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtaGlnaGxpZ2h0bGluZS1jb2xvcicpIHx8ICdmMDIwMjAnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNTcG90UmFkaXVzID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLXNwb3RyYWRpdXMnKSB8fCAxLjU7XHJcblx0XHRcdFx0XHRcdHRoaXNDaGFydE1pbllSYW5nZSA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1taW4teScpIHx8ICd1bmRlZmluZWQnOyBcclxuXHRcdFx0XHRcdFx0dGhpc0NoYXJ0TWF4WVJhbmdlID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLW1heC15JykgfHwgJ3VuZGVmaW5lZCc7IFxyXG5cdFx0XHRcdFx0XHR0aGlzQ2hhcnRNaW5YUmFuZ2UgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtbWluLXgnKSB8fCAndW5kZWZpbmVkJzsgXHJcblx0XHRcdFx0XHRcdHRoaXNDaGFydE1heFhSYW5nZSA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1tYXgteCcpIHx8ICd1bmRlZmluZWQnOyBcclxuXHRcdFx0XHRcdFx0dGhpc01pbk5vcm1WYWx1ZSA9ICR0aGlzLmRhdGEoJ21pbi12YWwnKSB8fCAndW5kZWZpbmVkJzsgXHJcblx0XHRcdFx0XHRcdHRoaXNNYXhOb3JtVmFsdWUgPSAkdGhpcy5kYXRhKCdtYXgtdmFsJykgfHwgJ3VuZGVmaW5lZCc7IFxyXG5cdFx0XHRcdFx0XHR0aGlzTm9ybUNvbG9yID0gICR0aGlzLmRhdGEoJ25vcm0tY29sb3InKSB8fCAnI2MwYzBjMCc7XHJcblx0XHRcdFx0XHRcdHRoaXNEcmF3Tm9ybWFsT25Ub3AgPSAkdGhpcy5kYXRhKCdkcmF3LW5vcm1hbCcpIHx8IGZhbHNlO1xyXG5cdFx0XHRcdFx0ICAgIFxyXG5cdFx0XHRcdFx0JHRoaXMuc3BhcmtsaW5lKCdodG1sJywge1xyXG5cdFx0XHRcdFx0XHR0eXBlIDogJ2xpbmUnLFxyXG5cdFx0XHRcdFx0XHR3aWR0aCA6IHNwYXJrbGluZVdpZHRoLFxyXG5cdFx0XHRcdFx0XHRoZWlnaHQgOiBzcGFya2xpbmVIZWlnaHQsXHJcblx0XHRcdFx0XHRcdGxpbmVXaWR0aCA6IHRoaXNMaW5lV2lkdGgsXHJcblx0XHRcdFx0XHRcdGxpbmVDb2xvciA6IHRoaXNMaW5lQ29sb3IsXHJcblx0XHRcdFx0XHRcdGZpbGxDb2xvciA6IHRoaXNGaWxsLFxyXG5cdFx0XHRcdFx0XHRzcG90Q29sb3IgOiB0aGlzU3BvdENvbG9yLFxyXG5cdFx0XHRcdFx0XHRtaW5TcG90Q29sb3IgOiB0aGlzTWluU3BvdENvbG9yLFxyXG5cdFx0XHRcdFx0XHRtYXhTcG90Q29sb3IgOiB0aGlzTWF4U3BvdENvbG9yLFxyXG5cdFx0XHRcdFx0XHRoaWdobGlnaHRTcG90Q29sb3IgOiB0aGlzaGlnaGxpZ2h0U3BvdENvbG9yLFxyXG5cdFx0XHRcdFx0XHRoaWdobGlnaHRMaW5lQ29sb3IgOiB0aGlzSGlnaGxpZ2h0TGluZUNvbG9yLFxyXG5cdFx0XHRcdFx0XHRzcG90UmFkaXVzIDogdGhpc1Nwb3RSYWRpdXMsXHJcblx0XHRcdFx0XHRcdGNoYXJ0UmFuZ2VNaW4gOiB0aGlzQ2hhcnRNaW5ZUmFuZ2UsXHJcblx0XHRcdFx0XHRcdGNoYXJ0UmFuZ2VNYXggOiB0aGlzQ2hhcnRNYXhZUmFuZ2UsXHJcblx0XHRcdFx0XHRcdGNoYXJ0UmFuZ2VNaW5YIDogdGhpc0NoYXJ0TWluWFJhbmdlLFxyXG5cdFx0XHRcdFx0XHRjaGFydFJhbmdlTWF4WCA6IHRoaXNDaGFydE1heFhSYW5nZSxcclxuXHRcdFx0XHRcdFx0bm9ybWFsUmFuZ2VNaW4gOiB0aGlzTWluTm9ybVZhbHVlLFxyXG5cdFx0XHRcdFx0XHRub3JtYWxSYW5nZU1heCA6IHRoaXNNYXhOb3JtVmFsdWUsXHJcblx0XHRcdFx0XHRcdG5vcm1hbFJhbmdlQ29sb3IgOiB0aGlzTm9ybUNvbG9yLFxyXG5cdFx0XHRcdFx0XHRkcmF3Tm9ybWFsT25Ub3AgOiB0aGlzRHJhd05vcm1hbE9uVG9wXHJcblx0XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JHRoaXMgPSBudWxsO1xyXG5cdFxyXG5cdFx0XHRcdH1cclxuXHRcclxuXHRcdFx0XHQvLyBQSUUgQ0hBUlRcclxuXHRcdFx0XHRpZiAoc3BhcmtsaW5lVHlwZSA9PSAncGllJykge1xyXG5cdFxyXG5cdFx0XHRcdFx0XHRwaWVDb2xvcnMgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtcGllY29sb3InKSB8fCBbXCIjQjRDQUQzXCIsIFwiIzQ0OTBCMVwiLCBcIiM5OEFBNTZcIiwgXCIjZGE1MzJjXCIsXCIjNkU5NDYxXCIsIFwiIzAwOTljNlwiLCBcIiM5OTAwOTlcIiwgXCIjNzE3RDhBXCJdO1xyXG5cdFx0XHRcdFx0ICAgIHBpZVdpZHRoSGVpZ2h0ID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLXBpZXNpemUnKSB8fCA5MDtcclxuXHRcdFx0XHRcdCAgICBwaWVCb3JkZXJDb2xvciA9ICR0aGlzLmRhdGEoJ2JvcmRlci1jb2xvcicpIHx8ICcjNDU0OTRDJztcclxuXHRcdFx0XHRcdCAgICBwaWVPZmZzZXQgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtb2Zmc2V0JykgfHwgMDtcclxuXHRcdFx0XHRcdCAgICBcclxuXHRcdFx0XHRcdCR0aGlzLnNwYXJrbGluZSgnaHRtbCcsIHtcclxuXHRcdFx0XHRcdFx0dHlwZSA6ICdwaWUnLFxyXG5cdFx0XHRcdFx0XHR3aWR0aCA6IHBpZVdpZHRoSGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHRoZWlnaHQgOiBwaWVXaWR0aEhlaWdodCxcclxuXHRcdFx0XHRcdFx0dG9vbHRpcEZvcm1hdCA6ICc8c3BhbiBzdHlsZT1cImNvbG9yOiB7e2NvbG9yfX1cIj4mIzk2Nzk7PC9zcGFuPiAoe3twZXJjZW50LjF9fSUpJyxcclxuXHRcdFx0XHRcdFx0c2xpY2VDb2xvcnMgOiBwaWVDb2xvcnMsXHJcblx0XHRcdFx0XHRcdGJvcmRlcldpZHRoIDogMSxcclxuXHRcdFx0XHRcdFx0b2Zmc2V0IDogcGllT2Zmc2V0LFxyXG5cdFx0XHRcdFx0XHRib3JkZXJDb2xvciA6IHBpZUJvcmRlckNvbG9yXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JHRoaXMgPSBudWxsO1xyXG5cdFxyXG5cdFx0XHRcdH1cclxuXHRcclxuXHRcdFx0XHQvLyBCT1ggUExPVFxyXG5cdFx0XHRcdGlmIChzcGFya2xpbmVUeXBlID09ICdib3gnKSB7XHJcblx0XHJcblx0XHRcdFx0XHRcdHRoaXNCb3hXaWR0aCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS13aWR0aCcpIHx8ICdhdXRvJztcclxuXHRcdFx0XHRcdCAgICB0aGlzQm94SGVpZ2h0ID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWhlaWdodCcpIHx8ICdhdXRvJztcclxuXHRcdFx0XHRcdCAgICB0aGlzQm94UmF3ID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWJveHJhdycpIHx8IGZhbHNlO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNCb3hUYXJnZXQgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtdGFyZ2V0dmFsJykgfHwgJ3VuZGVmaW5lZCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc0JveE1pbiA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1taW4nKSB8fCAndW5kZWZpbmVkJztcclxuXHRcdFx0XHRcdCAgICB0aGlzQm94TWF4ID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLW1heCcpIHx8ICd1bmRlZmluZWQnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNTaG93T3V0bGllciA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1zaG93b3V0bGllcicpIHx8IHRydWU7XHJcblx0XHRcdFx0XHQgICAgdGhpc0lRUiA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1vdXRsaWVyLWlxcicpIHx8IDEuNTtcclxuXHRcdFx0XHRcdCAgICB0aGlzQm94U3BvdFJhZGl1cyA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1zcG90cmFkaXVzJykgfHwgMS41O1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNCb3hMaW5lQ29sb3IgPSAkdGhpcy5jc3MoJ2NvbG9yJykgfHwgJyMwMDAwMDAnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNCb3hGaWxsQ29sb3IgPSAkdGhpcy5kYXRhKCdmaWxsLWNvbG9yJykgfHwgJyNjMGQwZjAnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNCb3hXaGlzQ29sb3IgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtd2hpcy1jb2xvcicpIHx8ICcjMDAwMDAwJztcclxuXHRcdFx0XHRcdCAgICB0aGlzQm94T3V0bGluZUNvbG9yID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLW91dGxpbmUtY29sb3InKSB8fCAnIzMwMzAzMCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc0JveE91dGxpbmVGaWxsID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLW91dGxpbmVmaWxsLWNvbG9yJykgfHwgJyNmMGYwZjAnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNCb3hNZWRpYW5Db2xvciA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1vdXRsaW5lbWVkaWFuLWNvbG9yJykgfHwgJyNmMDAwMDAnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNCb3hUYXJnZXRDb2xvciA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1vdXRsaW5ldGFyZ2V0LWNvbG9yJykgfHwgJyM0MGEwMjAnO1xyXG5cdFx0XHRcdFx0ICAgIFxyXG5cdFx0XHRcdFx0JHRoaXMuc3BhcmtsaW5lKCdodG1sJywge1xyXG5cdFx0XHRcdFx0XHR0eXBlIDogJ2JveCcsXHJcblx0XHRcdFx0XHRcdHdpZHRoIDogdGhpc0JveFdpZHRoLFxyXG5cdFx0XHRcdFx0XHRoZWlnaHQgOiB0aGlzQm94SGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHRyYXcgOiB0aGlzQm94UmF3LFxyXG5cdFx0XHRcdFx0XHR0YXJnZXQgOiB0aGlzQm94VGFyZ2V0LFxyXG5cdFx0XHRcdFx0XHRtaW5WYWx1ZSA6IHRoaXNCb3hNaW4sXHJcblx0XHRcdFx0XHRcdG1heFZhbHVlIDogdGhpc0JveE1heCxcclxuXHRcdFx0XHRcdFx0c2hvd091dGxpZXJzIDogdGhpc1Nob3dPdXRsaWVyLFxyXG5cdFx0XHRcdFx0XHRvdXRsaWVySVFSIDogdGhpc0lRUixcclxuXHRcdFx0XHRcdFx0c3BvdFJhZGl1cyA6IHRoaXNCb3hTcG90UmFkaXVzLFxyXG5cdFx0XHRcdFx0XHRib3hMaW5lQ29sb3IgOiB0aGlzQm94TGluZUNvbG9yLFxyXG5cdFx0XHRcdFx0XHRib3hGaWxsQ29sb3IgOiB0aGlzQm94RmlsbENvbG9yLFxyXG5cdFx0XHRcdFx0XHR3aGlza2VyQ29sb3IgOiB0aGlzQm94V2hpc0NvbG9yLFxyXG5cdFx0XHRcdFx0XHRvdXRsaWVyTGluZUNvbG9yIDogdGhpc0JveE91dGxpbmVDb2xvcixcclxuXHRcdFx0XHRcdFx0b3V0bGllckZpbGxDb2xvciA6IHRoaXNCb3hPdXRsaW5lRmlsbCxcclxuXHRcdFx0XHRcdFx0bWVkaWFuQ29sb3IgOiB0aGlzQm94TWVkaWFuQ29sb3IsXHJcblx0XHRcdFx0XHRcdHRhcmdldENvbG9yIDogdGhpc0JveFRhcmdldENvbG9yXHJcblx0XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JHRoaXMgPSBudWxsO1xyXG5cdFxyXG5cdFx0XHRcdH1cclxuXHRcclxuXHRcdFx0XHQvLyBCVUxMRVRcclxuXHRcdFx0XHRpZiAoc3BhcmtsaW5lVHlwZSA9PSAnYnVsbGV0Jykge1xyXG5cdFxyXG5cdFx0XHRcdFx0dmFyIHRoaXNCdWxsZXRIZWlnaHQgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtaGVpZ2h0JykgfHwgJ2F1dG8nO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNCdWxsZXRXaWR0aCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS13aWR0aCcpIHx8IDI7XHJcblx0XHRcdFx0XHQgICAgdGhpc0J1bGxldENvbG9yID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWJ1bGxldC1jb2xvcicpIHx8ICcjZWQxYzI0JztcclxuXHRcdFx0XHRcdCAgICB0aGlzQnVsbGV0UGVyZm9ybWFuY2VDb2xvciA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1wZXJmb3JtYW5jZS1jb2xvcicpIHx8ICcjMzAzMGYwJztcclxuXHRcdFx0XHRcdCAgICB0aGlzQnVsbGV0UmFuZ2VDb2xvcnMgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtYnVsbGV0cmFuZ2UtY29sb3InKSB8fCBbXCIjZDNkYWZlXCIsIFwiI2E4YjZmZlwiLCBcIiM3Zjk0ZmZcIl07XHJcblx0XHRcdFx0XHQgICAgXHJcblx0XHRcdFx0XHQkdGhpcy5zcGFya2xpbmUoJ2h0bWwnLCB7XHJcblx0XHJcblx0XHRcdFx0XHRcdHR5cGUgOiAnYnVsbGV0JyxcclxuXHRcdFx0XHRcdFx0aGVpZ2h0IDogdGhpc0J1bGxldEhlaWdodCxcclxuXHRcdFx0XHRcdFx0dGFyZ2V0V2lkdGggOiB0aGlzQnVsbGV0V2lkdGgsXHJcblx0XHRcdFx0XHRcdHRhcmdldENvbG9yIDogdGhpc0J1bGxldENvbG9yLFxyXG5cdFx0XHRcdFx0XHRwZXJmb3JtYW5jZUNvbG9yIDogdGhpc0J1bGxldFBlcmZvcm1hbmNlQ29sb3IsXHJcblx0XHRcdFx0XHRcdHJhbmdlQ29sb3JzIDogdGhpc0J1bGxldFJhbmdlQ29sb3JzXHJcblx0XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JHRoaXMgPSBudWxsO1xyXG5cdFxyXG5cdFx0XHRcdH1cclxuXHRcclxuXHRcdFx0XHQvLyBESVNDUkVURVxyXG5cdFx0XHRcdGlmIChzcGFya2xpbmVUeXBlID09ICdkaXNjcmV0ZScpIHtcclxuXHRcclxuXHRcdFx0XHRcdCBcdHRoaXNEaXNjcmV0ZUhlaWdodCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1oZWlnaHQnKSB8fCAyNjtcclxuXHRcdFx0XHRcdCAgICB0aGlzRGlzY3JldGVXaWR0aCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS13aWR0aCcpIHx8IDUwO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNEaXNjcmV0ZUxpbmVDb2xvciA9ICR0aGlzLmNzcygnY29sb3InKTtcclxuXHRcdFx0XHRcdCAgICB0aGlzRGlzY3JldGVMaW5lSGVpZ2h0ID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWxpbmUtaGVpZ2h0JykgfHwgNTtcclxuXHRcdFx0XHRcdCAgICB0aGlzRGlzY3JldGVUaHJ1c2hvbGQgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtdGhyZXNob2xkJykgfHwgJ3VuZGVmaW5lZCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc0Rpc2NyZXRlVGhydXNob2xkQ29sb3IgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtdGhyZXNob2xkLWNvbG9yJykgfHwgJyNlZDFjMjQnO1xyXG5cdFx0XHRcdFx0ICAgIFxyXG5cdFx0XHRcdFx0JHRoaXMuc3BhcmtsaW5lKCdodG1sJywge1xyXG5cdFxyXG5cdFx0XHRcdFx0XHR0eXBlIDogJ2Rpc2NyZXRlJyxcclxuXHRcdFx0XHRcdFx0d2lkdGggOiB0aGlzRGlzY3JldGVXaWR0aCxcclxuXHRcdFx0XHRcdFx0aGVpZ2h0IDogdGhpc0Rpc2NyZXRlSGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHRsaW5lQ29sb3IgOiB0aGlzRGlzY3JldGVMaW5lQ29sb3IsXHJcblx0XHRcdFx0XHRcdGxpbmVIZWlnaHQgOiB0aGlzRGlzY3JldGVMaW5lSGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHR0aHJlc2hvbGRWYWx1ZSA6IHRoaXNEaXNjcmV0ZVRocnVzaG9sZCxcclxuXHRcdFx0XHRcdFx0dGhyZXNob2xkQ29sb3IgOiB0aGlzRGlzY3JldGVUaHJ1c2hvbGRDb2xvclxyXG5cdFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdCR0aGlzID0gbnVsbDtcclxuXHRcclxuXHRcdFx0XHR9XHJcblx0XHJcblx0XHRcdFx0Ly8gVFJJU1RBVEVcclxuXHRcdFx0XHRpZiAoc3BhcmtsaW5lVHlwZSA9PSAndHJpc3RhdGUnKSB7XHJcblx0XHJcblx0XHRcdFx0XHQgXHR0aGlzVHJpc3RhdGVIZWlnaHQgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtaGVpZ2h0JykgfHwgMjY7XHJcblx0XHRcdFx0XHQgICAgdGhpc1RyaXN0YXRlUG9zQmFyQ29sb3IgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtcG9zYmFyLWNvbG9yJykgfHwgJyM2MGYwNjAnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNUcmlzdGF0ZU5lZ0JhckNvbG9yID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLW5lZ2Jhci1jb2xvcicpIHx8ICcjZjA0MDQwJztcclxuXHRcdFx0XHRcdCAgICB0aGlzVHJpc3RhdGVaZXJvQmFyQ29sb3IgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtemVyb2Jhci1jb2xvcicpIHx8ICcjOTA5MDkwJztcclxuXHRcdFx0XHRcdCAgICB0aGlzVHJpc3RhdGVCYXJXaWR0aCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1iYXJ3aWR0aCcpIHx8IDU7XHJcblx0XHRcdFx0XHQgICAgdGhpc1RyaXN0YXRlQmFyU3BhY2luZyA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1iYXJzcGFjaW5nJykgfHwgMjtcclxuXHRcdFx0XHRcdCAgICB0aGlzWmVyb0F4aXMgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtemVyb2F4aXMnKSB8fCBmYWxzZTtcclxuXHRcdFx0XHRcdCAgICBcclxuXHRcdFx0XHRcdCR0aGlzLnNwYXJrbGluZSgnaHRtbCcsIHtcclxuXHRcclxuXHRcdFx0XHRcdFx0dHlwZSA6ICd0cmlzdGF0ZScsXHJcblx0XHRcdFx0XHRcdGhlaWdodCA6IHRoaXNUcmlzdGF0ZUhlaWdodCxcclxuXHRcdFx0XHRcdFx0cG9zQmFyQ29sb3IgOiB0aGlzQmFyQ29sb3IsXHJcblx0XHRcdFx0XHRcdG5lZ0JhckNvbG9yIDogdGhpc1RyaXN0YXRlTmVnQmFyQ29sb3IsXHJcblx0XHRcdFx0XHRcdHplcm9CYXJDb2xvciA6IHRoaXNUcmlzdGF0ZVplcm9CYXJDb2xvcixcclxuXHRcdFx0XHRcdFx0YmFyV2lkdGggOiB0aGlzVHJpc3RhdGVCYXJXaWR0aCxcclxuXHRcdFx0XHRcdFx0YmFyU3BhY2luZyA6IHRoaXNUcmlzdGF0ZUJhclNwYWNpbmcsXHJcblx0XHRcdFx0XHRcdHplcm9BeGlzIDogdGhpc1plcm9BeGlzXHJcblx0XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JHRoaXMgPSBudWxsO1xyXG5cdFxyXG5cdFx0XHRcdH1cclxuXHRcclxuXHRcdFx0XHQvL0NPTVBPU0lURTogQkFSXHJcblx0XHRcdFx0aWYgKHNwYXJrbGluZVR5cGUgPT0gJ2NvbXBvc2l0ZWJhcicpIHtcclxuXHRcclxuXHRcdFx0XHQgXHRzcGFya2xpbmVIZWlnaHQgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtaGVpZ2h0JykgfHwgJzIwcHgnO1xyXG5cdFx0XHRcdCAgICBzcGFya2xpbmVXaWR0aCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS13aWR0aCcpIHx8ICcxMDAlJztcclxuXHRcdFx0XHQgICAgc3BhcmtsaW5lQmFyV2lkdGggPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtYmFyd2lkdGgnKSB8fCAzO1xyXG5cdFx0XHRcdCAgICB0aGlzTGluZVdpZHRoID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWxpbmUtd2lkdGgnKSB8fCAxO1xyXG5cdFx0XHRcdCAgICB0aGlzTGluZUNvbG9yID0gJHRoaXMuZGF0YSgnZGF0YS1zcGFya2xpbmUtbGluZWNvbG9yJykgfHwgJyNlZDFjMjQnO1xyXG5cdFx0XHRcdCAgICB0aGlzQmFyQ29sb3IgPSAkdGhpcy5kYXRhKCdkYXRhLXNwYXJrbGluZS1iYXJjb2xvcicpIHx8ICcjMzMzMzMzJztcclxuXHRcdFx0XHRcdCAgICBcclxuXHRcdFx0XHRcdCR0aGlzLnNwYXJrbGluZSgkdGhpcy5kYXRhKCdzcGFya2xpbmUtYmFyLXZhbCcpLCB7XHJcblx0XHJcblx0XHRcdFx0XHRcdHR5cGUgOiAnYmFyJyxcclxuXHRcdFx0XHRcdFx0d2lkdGggOiBzcGFya2xpbmVXaWR0aCxcclxuXHRcdFx0XHRcdFx0aGVpZ2h0IDogc3BhcmtsaW5lSGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHRiYXJDb2xvciA6IHRoaXNCYXJDb2xvcixcclxuXHRcdFx0XHRcdFx0YmFyV2lkdGggOiBzcGFya2xpbmVCYXJXaWR0aFxyXG5cdFx0XHRcdFx0XHQvL2JhclNwYWNpbmc6IDVcclxuXHRcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFxyXG5cdFx0XHRcdFx0JHRoaXMuc3BhcmtsaW5lKCR0aGlzLmRhdGEoJ3NwYXJrbGluZS1saW5lLXZhbCcpLCB7XHJcblx0XHJcblx0XHRcdFx0XHRcdHdpZHRoIDogc3BhcmtsaW5lV2lkdGgsXHJcblx0XHRcdFx0XHRcdGhlaWdodCA6IHNwYXJrbGluZUhlaWdodCxcclxuXHRcdFx0XHRcdFx0bGluZUNvbG9yIDogdGhpc0xpbmVDb2xvcixcclxuXHRcdFx0XHRcdFx0bGluZVdpZHRoIDogdGhpc0xpbmVXaWR0aCxcclxuXHRcdFx0XHRcdFx0Y29tcG9zaXRlIDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0ZmlsbENvbG9yIDogZmFsc2VcclxuXHRcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQkdGhpcyA9IG51bGw7XHJcblx0XHJcblx0XHRcdFx0fVxyXG5cdFxyXG5cdFx0XHRcdC8vQ09NUE9TSVRFOiBMSU5FXHJcblx0XHRcdFx0aWYgKHNwYXJrbGluZVR5cGUgPT0gJ2NvbXBvc2l0ZWxpbmUnKSB7XHJcblx0XHJcblx0XHRcdFx0XHRcdHNwYXJrbGluZUhlaWdodCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1oZWlnaHQnKSB8fCAnMjBweCc7XHJcblx0XHRcdFx0XHQgICAgc3BhcmtsaW5lV2lkdGggPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtd2lkdGgnKSB8fCAnOTBweCc7XHJcblx0XHRcdFx0XHQgICAgc3BhcmtsaW5lVmFsdWUgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtYmFyLXZhbCcpO1xyXG5cdFx0XHRcdFx0ICAgIHNwYXJrbGluZVZhbHVlU3BvdHMxID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWJhci12YWwtc3BvdHMtdG9wJykgfHwgbnVsbDtcclxuXHRcdFx0XHRcdCAgICBzcGFya2xpbmVWYWx1ZVNwb3RzMiA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1iYXItdmFsLXNwb3RzLWJvdHRvbScpIHx8IG51bGw7XHJcblx0XHRcdFx0XHQgICAgdGhpc0xpbmVXaWR0aDEgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtbGluZS13aWR0aC10b3AnKSB8fCAxO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNMaW5lV2lkdGgyID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWxpbmUtd2lkdGgtYm90dG9tJykgfHwgMTtcclxuXHRcdFx0XHRcdCAgICB0aGlzTGluZUNvbG9yMSA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1jb2xvci10b3AnKSB8fCAnIzMzMzMzMyc7XHJcblx0XHRcdFx0XHQgICAgdGhpc0xpbmVDb2xvcjIgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtY29sb3ItYm90dG9tJykgfHwgJyNlZDFjMjQnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNTcG90UmFkaXVzMSA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1zcG90cmFkaXVzLXRvcCcpIHx8IDEuNTtcclxuXHRcdFx0XHRcdCAgICB0aGlzU3BvdFJhZGl1czIgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtc3BvdHJhZGl1cy1ib3R0b20nKSB8fCB0aGlzU3BvdFJhZGl1czE7XHJcblx0XHRcdFx0XHQgICAgdGhpc1Nwb3RDb2xvciA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1zcG90LWNvbG9yJykgfHwgJyNmMDgwMDAnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNNaW5TcG90Q29sb3IxID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLW1pbnNwb3QtY29sb3ItdG9wJykgfHwgJyNlZDFjMjQnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNNYXhTcG90Q29sb3IxID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLW1heHNwb3QtY29sb3ItdG9wJykgfHwgJyNmMDgwMDAnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNNaW5TcG90Q29sb3IyID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLW1pbnNwb3QtY29sb3ItYm90dG9tJykgfHwgdGhpc01pblNwb3RDb2xvcjE7XHJcblx0XHRcdFx0XHQgICAgdGhpc01heFNwb3RDb2xvcjIgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtbWF4c3BvdC1jb2xvci1ib3R0b20nKSB8fCB0aGlzTWF4U3BvdENvbG9yMTtcclxuXHRcdFx0XHRcdCAgICB0aGlzaGlnaGxpZ2h0U3BvdENvbG9yMSA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1oaWdobGlnaHRzcG90LWNvbG9yLXRvcCcpIHx8ICcjNTBmMDUwJztcclxuXHRcdFx0XHRcdCAgICB0aGlzSGlnaGxpZ2h0TGluZUNvbG9yMSA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1oaWdobGlnaHRsaW5lLWNvbG9yLXRvcCcpIHx8ICcjZjAyMDIwJztcclxuXHRcdFx0XHRcdCAgICB0aGlzaGlnaGxpZ2h0U3BvdENvbG9yMiA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1oaWdobGlnaHRzcG90LWNvbG9yLWJvdHRvbScpIHx8XHJcblx0XHRcdFx0XHQgICAgICAgIHRoaXNoaWdobGlnaHRTcG90Q29sb3IxO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNIaWdobGlnaHRMaW5lQ29sb3IyID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWhpZ2hsaWdodGxpbmUtY29sb3ItYm90dG9tJykgfHxcclxuXHRcdFx0XHRcdCAgICAgICAgdGhpc0hpZ2hsaWdodExpbmVDb2xvcjE7XHJcblx0XHRcdFx0XHQgICAgdGhpc0ZpbGxDb2xvcjEgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtZmlsbGNvbG9yLXRvcCcpIHx8ICd0cmFuc3BhcmVudCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc0ZpbGxDb2xvcjIgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtZmlsbGNvbG9yLWJvdHRvbScpIHx8ICd0cmFuc3BhcmVudCc7XHJcblx0XHRcdFx0XHQgICAgXHJcblx0XHRcdFx0XHQkdGhpcy5zcGFya2xpbmUoc3BhcmtsaW5lVmFsdWUsIHtcclxuXHRcclxuXHRcdFx0XHRcdFx0dHlwZSA6ICdsaW5lJyxcclxuXHRcdFx0XHRcdFx0c3BvdFJhZGl1cyA6IHRoaXNTcG90UmFkaXVzMSxcclxuXHRcclxuXHRcdFx0XHRcdFx0c3BvdENvbG9yIDogdGhpc1Nwb3RDb2xvcixcclxuXHRcdFx0XHRcdFx0bWluU3BvdENvbG9yIDogdGhpc01pblNwb3RDb2xvcjEsXHJcblx0XHRcdFx0XHRcdG1heFNwb3RDb2xvciA6IHRoaXNNYXhTcG90Q29sb3IxLFxyXG5cdFx0XHRcdFx0XHRoaWdobGlnaHRTcG90Q29sb3IgOiB0aGlzaGlnaGxpZ2h0U3BvdENvbG9yMSxcclxuXHRcdFx0XHRcdFx0aGlnaGxpZ2h0TGluZUNvbG9yIDogdGhpc0hpZ2hsaWdodExpbmVDb2xvcjEsXHJcblx0XHJcblx0XHRcdFx0XHRcdHZhbHVlU3BvdHMgOiBzcGFya2xpbmVWYWx1ZVNwb3RzMSxcclxuXHRcclxuXHRcdFx0XHRcdFx0bGluZVdpZHRoIDogdGhpc0xpbmVXaWR0aDEsXHJcblx0XHRcdFx0XHRcdHdpZHRoIDogc3BhcmtsaW5lV2lkdGgsXHJcblx0XHRcdFx0XHRcdGhlaWdodCA6IHNwYXJrbGluZUhlaWdodCxcclxuXHRcdFx0XHRcdFx0bGluZUNvbG9yIDogdGhpc0xpbmVDb2xvcjEsXHJcblx0XHRcdFx0XHRcdGZpbGxDb2xvciA6IHRoaXNGaWxsQ29sb3IxXHJcblx0XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcclxuXHRcdFx0XHRcdCR0aGlzLnNwYXJrbGluZSgkdGhpcy5kYXRhKCdzcGFya2xpbmUtbGluZS12YWwnKSwge1xyXG5cdFxyXG5cdFx0XHRcdFx0XHR0eXBlIDogJ2xpbmUnLFxyXG5cdFx0XHRcdFx0XHRzcG90UmFkaXVzIDogdGhpc1Nwb3RSYWRpdXMyLFxyXG5cdFxyXG5cdFx0XHRcdFx0XHRzcG90Q29sb3IgOiB0aGlzU3BvdENvbG9yLFxyXG5cdFx0XHRcdFx0XHRtaW5TcG90Q29sb3IgOiB0aGlzTWluU3BvdENvbG9yMixcclxuXHRcdFx0XHRcdFx0bWF4U3BvdENvbG9yIDogdGhpc01heFNwb3RDb2xvcjIsXHJcblx0XHRcdFx0XHRcdGhpZ2hsaWdodFNwb3RDb2xvciA6IHRoaXNoaWdobGlnaHRTcG90Q29sb3IyLFxyXG5cdFx0XHRcdFx0XHRoaWdobGlnaHRMaW5lQ29sb3IgOiB0aGlzSGlnaGxpZ2h0TGluZUNvbG9yMixcclxuXHRcclxuXHRcdFx0XHRcdFx0dmFsdWVTcG90cyA6IHNwYXJrbGluZVZhbHVlU3BvdHMyLFxyXG5cdFxyXG5cdFx0XHRcdFx0XHRsaW5lV2lkdGggOiB0aGlzTGluZVdpZHRoMixcclxuXHRcdFx0XHRcdFx0d2lkdGggOiBzcGFya2xpbmVXaWR0aCxcclxuXHRcdFx0XHRcdFx0aGVpZ2h0IDogc3BhcmtsaW5lSGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHRsaW5lQ29sb3IgOiB0aGlzTGluZUNvbG9yMixcclxuXHRcdFx0XHRcdFx0Y29tcG9zaXRlIDogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0ZmlsbENvbG9yIDogdGhpc0ZpbGxDb2xvcjJcclxuXHRcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQkdGhpcyA9IG51bGw7XHJcblx0XHJcblx0XHRcdFx0fVxyXG5cdFxyXG5cdFx0XHR9KTtcclxuXHRcclxuXHRcdH0vLyBlbmQgaWZcclxuXHRcclxuXHRcdC8qXHJcblx0XHQgKiBFQVNZIFBJRSBDSEFSVFNcclxuXHRcdCAqIERFUEVOREVOQ1k6IGpzL3BsdWdpbnMvZWFzeS1waWUtY2hhcnQvanF1ZXJ5LmVhc3ktcGllLWNoYXJ0Lm1pbi5qc1xyXG5cdFx0ICogVXNhZ2U6IDxkaXYgY2xhc3M9XCJlYXN5LXBpZS1jaGFydCB0eHQtY29sb3Itb3JhbmdlRGFya1wiIGRhdGEtcGllLXBlcmNlbnQ9XCIzM1wiIGRhdGEtcGllLXNpemU9XCI3MlwiIGRhdGEtc2l6ZT1cIjcyXCI+XHJcblx0XHQgKlx0XHRcdDxzcGFuIGNsYXNzPVwicGVyY2VudCBwZXJjZW50LXNpZ25cIj4zNTwvc3Bhbj5cclxuXHRcdCAqIFx0ICBcdCAgPC9kaXY+XHJcblx0XHQgKi9cclxuXHRcclxuXHRcdGlmICgkLmZuLmVhc3lQaWVDaGFydCkge1xyXG5cdFxyXG5cdFx0XHQkKCcuZWFzeS1waWUtY2hhcnQnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXHJcblx0XHRcdFx0XHRiYXJDb2xvciA9ICR0aGlzLmNzcygnY29sb3InKSB8fCAkdGhpcy5kYXRhKCdwaWUtY29sb3InKSxcclxuXHRcdFx0XHQgICAgdHJhY2tDb2xvciA9ICR0aGlzLmRhdGEoJ3BpZS10cmFjay1jb2xvcicpIHx8ICdyZ2JhKDAsMCwwLDAuMDQpJyxcclxuXHRcdFx0XHQgICAgc2l6ZSA9IHBhcnNlSW50KCR0aGlzLmRhdGEoJ3BpZS1zaXplJykpIHx8IDI1O1xyXG5cdFx0XHRcdCAgICBcclxuXHRcdFx0XHQkdGhpcy5lYXN5UGllQ2hhcnQoe1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRiYXJDb2xvciA6IGJhckNvbG9yLFxyXG5cdFx0XHRcdFx0dHJhY2tDb2xvciA6IHRyYWNrQ29sb3IsXHJcblx0XHRcdFx0XHRzY2FsZUNvbG9yIDogZmFsc2UsXHJcblx0XHRcdFx0XHRsaW5lQ2FwIDogJ2J1dHQnLFxyXG5cdFx0XHRcdFx0bGluZVdpZHRoIDogcGFyc2VJbnQoc2l6ZSAvIDguNSksXHJcblx0XHRcdFx0XHRhbmltYXRlIDogMTUwMCxcclxuXHRcdFx0XHRcdHJvdGF0ZSA6IC05MCxcclxuXHRcdFx0XHRcdHNpemUgOiBzaXplLFxyXG5cdFx0XHRcdFx0b25TdGVwOiBmdW5jdGlvbihmcm9tLCB0bywgcGVyY2VudCkge1xyXG4gICAgICAgICAgICBcdFx0XHQkKHRoaXMuZWwpLmZpbmQoJy5wZXJjZW50JykudGV4dChNYXRoLnJvdW5kKHBlcmNlbnQpKTtcclxuICAgICAgICBcdFx0XHR9XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQkdGhpcyA9IG51bGw7XHJcblx0XHRcdH0pO1xyXG5cdFxyXG5cdFx0fSAvLyBlbmQgaWZcclxuXHRcclxuXHR9XHJcbi8qIH4gRU5EOiBJTklUSUFMSVpFIENIQVJUUyAqL1xyXG5cclxuLypcclxuICogSU5JVElBTElaRSBKQVJWSVMgV0lER0VUU1xyXG4gKiBTZXR1cCBEZXNrdG9wIFdpZGdldHNcclxuICovXHJcblx0ZnVuY3Rpb24gc2V0dXBfd2lkZ2V0c19kZXNrdG9wKCkge1xyXG5cdFxyXG5cdFx0aWYgKCQuZm4uamFydmlzV2lkZ2V0cyAmJiBlbmFibGVKYXJ2aXNXaWRnZXRzKSB7XHJcblx0XHJcblx0XHRcdCQoJyN3aWRnZXQtZ3JpZCcpLmphcnZpc1dpZGdldHMoe1xyXG5cdFxyXG5cdFx0XHRcdGdyaWQgOiAnYXJ0aWNsZScsXHJcblx0XHRcdFx0d2lkZ2V0cyA6ICcuamFydmlzd2lkZ2V0JyxcclxuXHRcdFx0XHRsb2NhbFN0b3JhZ2UgOiBsb2NhbFN0b3JhZ2VKYXJ2aXNXaWRnZXRzLFxyXG5cdFx0XHRcdGRlbGV0ZVNldHRpbmdzS2V5IDogJyNkZWxldGVzZXR0aW5nc2tleS1vcHRpb25zJyxcclxuXHRcdFx0XHRzZXR0aW5nc0tleUxhYmVsIDogJ1Jlc2V0IHNldHRpbmdzPycsXHJcblx0XHRcdFx0ZGVsZXRlUG9zaXRpb25LZXkgOiAnI2RlbGV0ZXBvc2l0aW9ua2V5LW9wdGlvbnMnLFxyXG5cdFx0XHRcdHBvc2l0aW9uS2V5TGFiZWwgOiAnUmVzZXQgcG9zaXRpb24/JyxcclxuXHRcdFx0XHRzb3J0YWJsZSA6IHNvcnRhYmxlSmFydmlzV2lkZ2V0cyxcclxuXHRcdFx0XHRidXR0b25zSGlkZGVuIDogZmFsc2UsXHJcblx0XHRcdFx0Ly8gdG9nZ2xlIGJ1dHRvblxyXG5cdFx0XHRcdHRvZ2dsZUJ1dHRvbiA6IHRydWUsXHJcblx0XHRcdFx0dG9nZ2xlQ2xhc3MgOiAnZmEgZmEtbWludXMgfCBmYSBmYS1wbHVzJyxcclxuXHRcdFx0XHR0b2dnbGVTcGVlZCA6IDIwMCxcclxuXHRcdFx0XHRvblRvZ2dsZSA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Ly8gZGVsZXRlIGJ0blxyXG5cdFx0XHRcdGRlbGV0ZUJ1dHRvbiA6IHRydWUsXHJcblx0XHRcdFx0ZGVsZXRlTXNnOidXYXJuaW5nOiBUaGlzIGFjdGlvbiBjYW5ub3QgYmUgdW5kb25lIScsXHJcblx0XHRcdFx0ZGVsZXRlQ2xhc3MgOiAnZmEgZmEtdGltZXMnLFxyXG5cdFx0XHRcdGRlbGV0ZVNwZWVkIDogMjAwLFxyXG5cdFx0XHRcdG9uRGVsZXRlIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQvLyBlZGl0IGJ0blxyXG5cdFx0XHRcdGVkaXRCdXR0b24gOiB0cnVlLFxyXG5cdFx0XHRcdGVkaXRQbGFjZWhvbGRlciA6ICcuamFydmlzd2lkZ2V0LWVkaXRib3gnLFxyXG5cdFx0XHRcdGVkaXRDbGFzcyA6ICdmYSBmYS1jb2cgfCBmYSBmYS1zYXZlJyxcclxuXHRcdFx0XHRlZGl0U3BlZWQgOiAyMDAsXHJcblx0XHRcdFx0b25FZGl0IDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQvLyBjb2xvciBidXR0b25cclxuXHRcdFx0XHRjb2xvckJ1dHRvbiA6IHRydWUsXHJcblx0XHRcdFx0Ly8gZnVsbCBzY3JlZW5cclxuXHRcdFx0XHRmdWxsc2NyZWVuQnV0dG9uIDogdHJ1ZSxcclxuXHRcdFx0XHRmdWxsc2NyZWVuQ2xhc3MgOiAnZmEgZmEtZXhwYW5kIHwgZmEgZmEtY29tcHJlc3MnLFxyXG5cdFx0XHRcdGZ1bGxzY3JlZW5EaWZmIDogMyxcclxuXHRcdFx0XHRvbkZ1bGxzY3JlZW4gOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdC8vIGN1c3RvbSBidG5cclxuXHRcdFx0XHRjdXN0b21CdXR0b24gOiBmYWxzZSxcclxuXHRcdFx0XHRjdXN0b21DbGFzcyA6ICdmb2xkZXItMTAgfCBuZXh0LTEwJyxcclxuXHRcdFx0XHRjdXN0b21TdGFydCA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0YWxlcnQoJ0hlbGxvIHlvdSwgdGhpcyBpcyBhIGN1c3RvbSBidXR0b24uLi4nKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGN1c3RvbUVuZCA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0YWxlcnQoJ2J5ZSwgdGlsbCBuZXh0IHRpbWUuLi4nKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdC8vIG9yZGVyXHJcblx0XHRcdFx0YnV0dG9uT3JkZXIgOiAnJXJlZnJlc2glICVjdXN0b20lICVlZGl0JSAldG9nZ2xlJSAlZnVsbHNjcmVlbiUgJWRlbGV0ZSUnLFxyXG5cdFx0XHRcdG9wYWNpdHkgOiAxLjAsXHJcblx0XHRcdFx0ZHJhZ0hhbmRsZSA6ICc+IGhlYWRlcicsXHJcblx0XHRcdFx0cGxhY2Vob2xkZXJDbGFzcyA6ICdqYXJ2aXN3aWRnZXQtcGxhY2Vob2xkZXInLFxyXG5cdFx0XHRcdGluZGljYXRvciA6IHRydWUsXHJcblx0XHRcdFx0aW5kaWNhdG9yVGltZSA6IDYwMCxcclxuXHRcdFx0XHRhamF4IDogdHJ1ZSxcclxuXHRcdFx0XHR0aW1lc3RhbXBQbGFjZWhvbGRlciA6ICcuamFydmlzd2lkZ2V0LXRpbWVzdGFtcCcsXHJcblx0XHRcdFx0dGltZXN0YW1wRm9ybWF0IDogJ0xhc3QgdXBkYXRlOiAlbSUvJWQlLyV5JSAlaCU6JWklOiVzJScsXHJcblx0XHRcdFx0cmVmcmVzaEJ1dHRvbiA6IHRydWUsXHJcblx0XHRcdFx0cmVmcmVzaEJ1dHRvbkNsYXNzIDogJ2ZhIGZhLXJlZnJlc2gnLFxyXG5cdFx0XHRcdGxhYmVsRXJyb3IgOiAnU29ycnkgYnV0IHRoZXJlIHdhcyBhIGVycm9yOicsXHJcblx0XHRcdFx0bGFiZWxVcGRhdGVkIDogJ0xhc3QgVXBkYXRlOicsXHJcblx0XHRcdFx0bGFiZWxSZWZyZXNoIDogJ1JlZnJlc2gnLFxyXG5cdFx0XHRcdGxhYmVsRGVsZXRlIDogJ0RlbGV0ZSB3aWRnZXQ6JyxcclxuXHRcdFx0XHRhZnRlckxvYWQgOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHJ0bCA6IGZhbHNlLCAvLyBiZXN0IG5vdCB0byB0b2dnbGUgdGhpcyFcclxuXHRcdFx0XHRvbkNoYW5nZSA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRvblNhdmUgOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0YWpheG5hdiA6ICQubmF2QXNBamF4IC8vIGRlY2xlYXJzIGhvdyB0aGUgbG9jYWxzdG9yYWdlIHNob3VsZCBiZSBzYXZlZCAoSFRNTCBvciBBSkFYIFZlcnNpb24pXHJcblx0XHJcblx0XHRcdH0pO1xyXG5cdFxyXG5cdFx0fVxyXG5cdFxyXG5cdH1cclxuLypcclxuICogU0VUVVAgREVTS1RPUCBXSURHRVRcclxuICovXHJcblx0ZnVuY3Rpb24gc2V0dXBfd2lkZ2V0c19tb2JpbGUoKSB7XHJcblx0XHJcblx0XHRpZiAoZW5hYmxlTW9iaWxlV2lkZ2V0cyAmJiBlbmFibGVKYXJ2aXNXaWRnZXRzKSB7XHJcblx0XHRcdHNldHVwX3dpZGdldHNfZGVza3RvcCgpO1xyXG5cdFx0fVxyXG5cdFxyXG5cdH1cclxuLyogfiBFTkQ6IElOSVRJQUxJWkUgSkFSVklTIFdJREdFVFMgKi9cclxuXHJcbi8qXHJcbiAqIEdPT0dMRSBNQVBTXHJcbiAqIGRlc2NyaXB0aW9uOiBBcHBlbmQgZ29vZ2xlIG1hcHMgdG8gaGVhZCBkeW5hbWljYWxseSAob25seSBleGVjdXRlIGZvciBhamF4IHZlcnNpb24pXHJcbiAqIExvYWRzIGF0IHRoZSBiZWdpbmluZyBmb3IgYWpheCBwYWdlc1xyXG4gKi9cclxuXHRpZiAoJC5uYXZBc0FqYXggfHwgJChcIi5nb29nbGVfbWFwc1wiKSl7XHJcblx0XHR2YXIgZ01hcHNMb2FkZWQgPSBmYWxzZTtcclxuXHRcdHdpbmRvdy5nTWFwc0NhbGxiYWNrID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdGdNYXBzTG9hZGVkID0gdHJ1ZTtcclxuXHRcdFx0JCh3aW5kb3cpLnRyaWdnZXIoJ2dNYXBzTG9hZGVkJyk7XHJcblx0XHR9O1xyXG5cdFx0d2luZG93LmxvYWRHb29nbGVNYXBzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmIChnTWFwc0xvYWRlZClcclxuXHRcdFx0XHRyZXR1cm4gd2luZG93LmdNYXBzQ2FsbGJhY2soKTtcclxuXHRcdFx0dmFyIHNjcmlwdF90YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuXHRcdFx0c2NyaXB0X3RhZy5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dC9qYXZhc2NyaXB0XCIpO1xyXG5cdFx0XHRzY3JpcHRfdGFnLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImh0dHA6Ly9tYXBzLmdvb2dsZS5jb20vbWFwcy9hcGkvanM/c2Vuc29yPWZhbHNlJmNhbGxiYWNrPWdNYXBzQ2FsbGJhY2tcIik7XHJcblx0XHRcdChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0gfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5hcHBlbmRDaGlsZChzY3JpcHRfdGFnKTtcclxuXHRcdH07XHJcblx0fVxyXG4vKiB+IEVORDogR09PR0xFIE1BUFMgKi9cclxuXHJcbi8qXHJcbiAqIExPQUQgU0NSSVBUU1xyXG4gKiBVc2FnZTpcclxuICogRGVmaW5lIGZ1bmN0aW9uID0gbXlQcmV0dHlDb2RlICgpLi4uXHJcbiAqIGxvYWRTY3JpcHQoXCJqcy9teV9sb3ZlbHlfc2NyaXB0LmpzXCIsIG15UHJldHR5Q29kZSk7XHJcbiAqL1xyXG5cdGZ1bmN0aW9uIGxvYWRTY3JpcHQoc2NyaXB0TmFtZSwgY2FsbGJhY2spIHtcclxuXHRcclxuXHRcdGlmICghanNBcnJheVtzY3JpcHROYW1lXSkge1xyXG5cdFx0XHRqc0FycmF5W3NjcmlwdE5hbWVdID0gdHJ1ZTtcclxuXHRcclxuXHRcdFx0Ly8gYWRkaW5nIHRoZSBzY3JpcHQgdGFnIHRvIHRoZSBoZWFkIGFzIHN1Z2dlc3RlZCBiZWZvcmVcclxuXHRcdFx0dmFyIGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLFxyXG5cdFx0XHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG5cdFx0XHRzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG5cdFx0XHRzY3JpcHQuc3JjID0gc2NyaXB0TmFtZTtcclxuXHRcclxuXHRcdFx0Ly8gdGhlbiBiaW5kIHRoZSBldmVudCB0byB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cclxuXHRcdFx0Ly8gdGhlcmUgYXJlIHNldmVyYWwgZXZlbnRzIGZvciBjcm9zcyBicm93c2VyIGNvbXBhdGliaWxpdHlcclxuXHRcdFx0c2NyaXB0Lm9ubG9hZCA9IGNhbGxiYWNrO1xyXG5cdFxyXG5cdFx0XHQvLyBmaXJlIHRoZSBsb2FkaW5nXHJcblx0XHRcdGJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuXHRcdFx0XHJcblx0XHRcdC8vIGNsZWFyIERPTSByZWZlcmVuY2VcclxuXHRcdFx0Ly9ib2R5ID0gbnVsbDtcclxuXHRcdFx0Ly9zY3JpcHQgPSBudWxsO1xyXG5cdFxyXG5cdFx0fSBlbHNlIGlmIChjYWxsYmFjaykge1xyXG5cdFx0XHQvLyBjaGFuZ2VkIGVsc2UgdG8gZWxzZSBpZihjYWxsYmFjaylcclxuXHRcdFx0aWYgKGRlYnVnU3RhdGUpe1xyXG5cdFx0XHRcdHJvb3Qucm9vdC5jb25zb2xlLmxvZyhcIlRoaXMgc2NyaXB0IHdhcyBhbHJlYWR5IGxvYWRlZCAlYzogXCIgKyBzY3JpcHROYW1lLCBkZWJ1Z1N0eWxlX3dhcm5pbmcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vZXhlY3V0ZSBmdW5jdGlvblxyXG5cdFx0XHRjYWxsYmFjaygpO1xyXG5cdFx0fVxyXG5cdFxyXG5cdH1cclxuLyogfiBFTkQ6IExPQUQgU0NSSVBUUyAqL1xyXG5cclxuLypcclxuKiBBUFAgQUpBWCBSRVFVRVNUIFNFVFVQXHJcbiogRGVzY3JpcHRpb246IEV4ZWN1dGVzIGFuZCBmZXRjaGVzIGFsbCBhamF4IHJlcXVlc3RzIGFsc29cclxuKiB1cGRhdGVzIG5haXZnYXRpb24gZWxlbWVudHMgdG8gYWN0aXZlXHJcbiovXHJcblx0aWYoJC5uYXZBc0FqYXgpIHtcclxuXHQgICAgLy8gZmlyZSB0aGlzIG9uIHBhZ2UgbG9hZCBpZiBuYXYgZXhpc3RzXHJcblx0ICAgIGlmICgkKCduYXYnKS5sZW5ndGgpIHtcclxuXHRcdCAgICBjaGVja1VSTCgpO1xyXG5cdCAgICB9XHJcblx0XHJcblx0ICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICduYXYgYVtocmVmIT1cIiNcIl0nLCBmdW5jdGlvbihlKSB7XHJcblx0XHQgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0ICAgIHZhciAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuXHRcclxuXHRcdCAgICAvLyBpZiBwYXJlbnQgaXMgbm90IGFjdGl2ZSB0aGVuIGdldCBoYXNoLCBvciBlbHNlIHBhZ2UgaXMgYXNzdW1lZCB0byBiZSBsb2FkZWRcclxuXHRcdFx0aWYgKCEkdGhpcy5wYXJlbnQoKS5oYXNDbGFzcyhcImFjdGl2ZVwiKSAmJiAhJHRoaXMuYXR0cigndGFyZ2V0JykpIHtcclxuXHRcclxuXHRcdFx0ICAgIC8vIHVwZGF0ZSB3aW5kb3cgd2l0aCBoYXNoXHJcblx0XHRcdCAgICAvLyB5b3UgY291bGQgYWxzbyBkbyBoZXJlOiAgdGhpc0RldmljZSA9PT0gXCJtb2JpbGVcIiAtIGFuZCBzYXZlIGEgbGl0dGxlIG1vcmUgbWVtb3J5XHJcblx0XHJcblx0XHRcdCAgICBpZiAoJC5yb290Xy5oYXNDbGFzcygnbW9iaWxlLXZpZXctYWN0aXZhdGVkJykpIHtcclxuXHRcdFx0XHQgICAgJC5yb290Xy5yZW1vdmVDbGFzcygnaGlkZGVuLW1lbnUnKTtcclxuXHRcdFx0XHQgICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKFwiaGlkZGVuLW1lbnUtbW9iaWxlLWxvY2tcIik7XHJcblx0XHRcdFx0ICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRpZiAod2luZG93LmxvY2F0aW9uLnNlYXJjaCkge1xyXG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID1cclxuXHRcdFx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLnNlYXJjaCwgJycpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5oYXNoLCAnJykgKyAnIycgKyAkdGhpcy5hdHRyKCdocmVmJyk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSAkdGhpcy5hdHRyKCdocmVmJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHQgICAgfSwgMTUwKTtcclxuXHRcdFx0XHQgICAgLy8gaXQgbWF5IG5vdCBuZWVkIHRoaXMgZGVsYXkuLi5cclxuXHRcdFx0ICAgIH0gZWxzZSB7XHJcblx0XHRcdFx0XHRpZiAod2luZG93LmxvY2F0aW9uLnNlYXJjaCkge1xyXG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9XHJcblx0XHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSh3aW5kb3cubG9jYXRpb24uc2VhcmNoLCAnJylcclxuXHRcdFx0XHRcdFx0XHRcdC5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5oYXNoLCAnJykgKyAnIycgKyAkdGhpcy5hdHRyKCdocmVmJyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaGFzaCA9ICR0aGlzLmF0dHIoJ2hyZWYnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0ICAgIH1cclxuXHRcdFx0ICAgIFxyXG5cdFx0XHQgICAgLy8gY2xlYXIgRE9NIHJlZmVyZW5jZVxyXG5cdFx0XHQgICAgLy8gJHRoaXMgPSBudWxsO1xyXG5cdFx0ICAgIH1cclxuXHRcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIC8vIGZpcmUgbGlua3Mgd2l0aCB0YXJnZXRzIG9uIGRpZmZlcmVudCB3aW5kb3dcclxuXHQgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ25hdiBhW3RhcmdldD1cIl9ibGFua1wiXScsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdCAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHQgICAgdmFyICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG5cdFxyXG5cdFx0ICAgIHdpbmRvdy5vcGVuKCR0aGlzLmF0dHIoJ2hyZWYnKSk7XHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICAvLyBmaXJlIGxpbmtzIHdpdGggdGFyZ2V0cyBvbiBzYW1lIHdpbmRvd1xyXG5cdCAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnbmF2IGFbdGFyZ2V0PVwiX3RvcFwiXScsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdCAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHQgICAgdmFyICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG5cdFxyXG5cdFx0ICAgIHdpbmRvdy5sb2NhdGlvbiA9ICgkdGhpcy5hdHRyKCdocmVmJykpO1xyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgLy8gYWxsIGxpbmtzIHdpdGggaGFzaCB0YWdzIGFyZSBpZ25vcmVkXHJcblx0ICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICduYXYgYVtocmVmPVwiI1wiXScsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdCAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICAvLyBETyBvbiBoYXNoIGNoYW5nZVxyXG5cdCAgICAkKHdpbmRvdykub24oJ2hhc2hjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuXHRcdCAgICBjaGVja1VSTCgpO1xyXG5cdCAgICB9KTtcclxuXHR9XHJcbi8qXHJcbiAqIENIRUNLIFRPIFNFRSBJRiBVUkwgRVhJU1RTXHJcbiAqL1xyXG5cdGZ1bmN0aW9uIGNoZWNrVVJMKCkge1xyXG5cdFxyXG5cdFx0Ly9nZXQgdGhlIHVybCBieSByZW1vdmluZyB0aGUgaGFzaFxyXG5cdFx0Ly92YXIgdXJsID0gbG9jYXRpb24uaGFzaC5yZXBsYWNlKC9eIy8sICcnKTtcclxuXHRcdHZhciB1cmwgPSBsb2NhdGlvbi5ocmVmLnNwbGl0KCcjJykuc3BsaWNlKDEpLmpvaW4oJyMnKTtcclxuXHRcdC8vQkVHSU46IElFMTEgV29yayBBcm91bmRcclxuXHRcdGlmICghdXJsKSB7XHJcblx0XHRcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHR2YXIgZG9jdW1lbnRVcmwgPSB3aW5kb3cuZG9jdW1lbnQuVVJMO1xyXG5cdFx0XHRcdGlmIChkb2N1bWVudFVybCkge1xyXG5cdFx0XHRcdFx0aWYgKGRvY3VtZW50VXJsLmluZGV4T2YoJyMnLCAwKSA+IDAgJiYgZG9jdW1lbnRVcmwuaW5kZXhPZignIycsIDApIDwgKGRvY3VtZW50VXJsLmxlbmd0aCArIDEpKSB7XHJcblx0XHRcdFx0XHRcdHVybCA9IGRvY3VtZW50VXJsLnN1YnN0cmluZyhkb2N1bWVudFVybC5pbmRleE9mKCcjJywgMCkgKyAxKTtcclxuXHRcdFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHJcblx0XHRcdH0gY2F0Y2ggKGVycikge31cclxuXHRcdH1cclxuXHRcdC8vRU5EOiBJRTExIFdvcmsgQXJvdW5kXHJcblx0XHJcblx0XHRjb250YWluZXIgPSAkKCcjY29udGVudCcpO1xyXG5cdFx0Ly8gRG8gdGhpcyBpZiB1cmwgZXhpc3RzIChmb3IgcGFnZSByZWZyZXNoLCBldGMuLi4pXHJcblx0XHRpZiAodXJsKSB7XHJcblx0XHRcdC8vIHJlbW92ZSBhbGwgYWN0aXZlIGNsYXNzXHJcblx0XHRcdCQoJ25hdiBsaS5hY3RpdmUnKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0Ly8gbWF0Y2ggdGhlIHVybCBhbmQgYWRkIHRoZSBhY3RpdmUgY2xhc3NcclxuXHRcdFx0JCgnbmF2IGxpOmhhcyhhW2hyZWY9XCInICsgdXJsICsgJ1wiXSknKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0dmFyIHRpdGxlID0gKCQoJ25hdiBhW2hyZWY9XCInICsgdXJsICsgJ1wiXScpLmF0dHIoJ3RpdGxlJykpO1xyXG5cdFxyXG5cdFx0XHQvLyBjaGFuZ2UgcGFnZSB0aXRsZSBmcm9tIGdsb2JhbCB2YXJcclxuXHRcdFx0ZG9jdW1lbnQudGl0bGUgPSAodGl0bGUgfHwgZG9jdW1lbnQudGl0bGUpO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly8gZGVidWdTdGF0ZVxyXG5cdFx0XHRpZiAoZGVidWdTdGF0ZSl7XHJcblx0XHRcdFx0cm9vdC5jb25zb2xlLmxvZyhcIlBhZ2UgdGl0bGU6ICVjIFwiICsgZG9jdW1lbnQudGl0bGUsIGRlYnVnU3R5bGVfZ3JlZW4pO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHQvLyBwYXJzZSB1cmwgdG8ganF1ZXJ5XHJcblx0XHRcdGxvYWRVUkwodXJsICsgbG9jYXRpb24uc2VhcmNoLCBjb250YWluZXIpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHJcblx0XHRcdC8vIGdyYWIgdGhlIGZpcnN0IFVSTCBmcm9tIG5hdlxyXG5cdFx0XHR2YXIgJHRoaXMgPSAkKCduYXYgPiB1bCA+IGxpOmZpcnN0LWNoaWxkID4gYVtocmVmIT1cIiNcIl0nKTtcclxuXHRcclxuXHRcdFx0Ly91cGRhdGUgaGFzaFxyXG5cdFx0XHR3aW5kb3cubG9jYXRpb24uaGFzaCA9ICR0aGlzLmF0dHIoJ2hyZWYnKTtcclxuXHRcdFx0XHJcblx0XHRcdC8vY2xlYXIgZG9tIHJlZmVyZW5jZVxyXG5cdFx0XHQkdGhpcyA9IG51bGw7XHJcblx0XHJcblx0XHR9XHJcblx0XHJcblx0fVxyXG4vKlxyXG4gKiBMT0FEIEFKQVggUEFHRVNcclxuICovIFxyXG5cdGZ1bmN0aW9uIGxvYWRVUkwodXJsLCBjb250YWluZXIpIHtcclxuXHJcblx0XHQvLyBkZWJ1Z1N0YXRlXHJcblx0XHRpZiAoZGVidWdTdGF0ZSl7XHJcblx0XHRcdHJvb3Qucm9vdC5jb25zb2xlLmxvZyhcIkxvYWRpbmcgVVJMOiAlY1wiICsgdXJsLCBkZWJ1Z1N0eWxlKTtcclxuXHRcdH1cclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR0eXBlIDogXCJHRVRcIixcclxuXHRcdFx0dXJsIDogdXJsLFxyXG5cdFx0XHRkYXRhVHlwZSA6ICdodG1sJyxcclxuXHRcdFx0Y2FjaGUgOiB0cnVlLCAvLyAod2FybmluZzogc2V0dGluZyBpdCB0byBmYWxzZSB3aWxsIGNhdXNlIGEgdGltZXN0YW1wIGFuZCB3aWxsIGNhbGwgdGhlIHJlcXVlc3QgdHdpY2UpXHJcblx0XHRcdGJlZm9yZVNlbmQgOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQvL0lFMTEgYnVnIGZpeCBmb3IgZ29vZ2xlbWFwcyAoZGVsZXRlIGFsbCBnb29nbGUgbWFwIGluc3RhbmNlcylcclxuXHRcdFx0XHQvL2NoZWNrIGlmIHRoZSBwYWdlIGlzIGFqYXggPSB0cnVlLCBoYXMgZ29vZ2xlIG1hcCBjbGFzcyBhbmQgdGhlIGNvbnRhaW5lciBpcyAjY29udGVudFxyXG5cdFx0XHRcdGlmICgkLm5hdkFzQWpheCAmJiAkKFwiLmdvb2dsZV9tYXBzXCIpWzBdICYmIChjb250YWluZXJbMF0gPT0gJChcIiNjb250ZW50XCIpWzBdKSApIHtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8gdGFyZ2V0IGdtYXBzIGlmIGFueSBvbiBwYWdlXHJcblx0XHRcdFx0XHR2YXIgY29sbGVjdGlvbiA9ICQoXCIuZ29vZ2xlX21hcHNcIiksXHJcblx0XHRcdFx0XHRcdGkgPSAwO1xyXG5cdFx0XHRcdFx0Ly8gcnVuIGZvciBlYWNoXHRtYXBcclxuXHRcdFx0XHRcdGNvbGxlY3Rpb24uZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdCAgICBpICsrO1xyXG5cdFx0XHRcdFx0ICAgIC8vIGdldCBtYXAgaWQgZnJvbSBjbGFzcyBlbGVtZW50c1xyXG5cdFx0XHRcdFx0ICAgIHZhciBkaXZEZWFsZXJNYXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkKTtcclxuXHRcdFx0XHRcdCAgICBcclxuXHRcdFx0XHRcdCAgICBpZihpID09IGNvbGxlY3Rpb24ubGVuZ3RoICsgMSkge1xyXG5cdFx0XHRcdFx0XHQgICAgLy8gXCJjYWxsYmFja1wiXHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gZGVzdHJveSBldmVyeSBtYXAgZm91bmRcclxuXHRcdFx0XHRcdFx0XHRpZiAoZGl2RGVhbGVyTWFwKSBkaXZEZWFsZXJNYXAucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkaXZEZWFsZXJNYXApO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBkZWJ1Z1N0YXRlXHJcblx0XHRcdFx0XHRcdFx0aWYgKGRlYnVnU3RhdGUpe1xyXG5cdFx0XHRcdFx0XHRcdFx0cm9vdC5jb25zb2xlLmxvZyhcIkRlc3Ryb3lpbmcgbWFwcy4uLi4uLi4uLiVjXCIgKyB0aGlzLmlkLCBkZWJ1Z1N0eWxlX3dhcm5pbmcpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gZGVidWdTdGF0ZVxyXG5cdFx0XHRcdFx0aWYgKGRlYnVnU3RhdGUpe1xyXG5cdFx0XHRcdFx0XHRyb290LmNvbnNvbGUubG9nKFwi4pyUIEdvb2dsZSBtYXAgaW5zdGFuY2VzIG51a2VkISEhXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fSAvL2VuZCBmaXhcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQvLyBkZXN0cm95IGFsbCBkYXRhdGFibGUgaW5zdGFuY2VzXHJcblx0XHRcdFx0aWYgKCAkLm5hdkFzQWpheCAmJiAkKCcuZGF0YVRhYmxlc193cmFwcGVyJylbMF0gJiYgKGNvbnRhaW5lclswXSA9PSAkKFwiI2NvbnRlbnRcIilbMF0pICkge1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR2YXIgdGFibGVzID0gJC5mbi5kYXRhVGFibGUuZm5UYWJsZXModHJ1ZSk7XHRcdFx0XHRcclxuXHRcdFx0XHRcdCQodGFibGVzKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGlmKCQodGhpcykuZmluZCgnLmRldGFpbHMtY29udHJvbCcpLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5maW5kKCcqJykuYWRkQmFjaygpLm9mZigpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRcdCQodGhpcykuZGF0YVRhYmxlKCkuZm5EZXN0cm95KCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5kYXRhVGFibGUoKS5mbkRlc3Ryb3koKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ICAgIFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdC8vIGRlYnVnU3RhdGVcclxuXHRcdFx0XHRcdGlmIChkZWJ1Z1N0YXRlKXtcclxuXHRcdFx0XHRcdFx0cm9vdC5jb25zb2xlLmxvZyhcIuKclCBEYXRhdGFibGUgaW5zdGFuY2VzIG51a2VkISEhXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBlbmQgZGVzdHJveVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vIHBvcCBpbnRlcnZhbHMgKGRlc3Ryb3lzIGphcnZpc3dpZGdldCByZWxhdGVkIGludGVydmFscylcclxuXHRcdFx0XHRpZiAoICQubmF2QXNBamF4ICYmICQuaW50ZXJ2YWxBcnIubGVuZ3RoID4gMCAmJiAoY29udGFpbmVyWzBdID09ICQoXCIjY29udGVudFwiKVswXSkgJiYgZW5hYmxlSmFydmlzV2lkZ2V0cyApIHtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0d2hpbGUoJC5pbnRlcnZhbEFyci5sZW5ndGggPiAwKVxyXG5cdCAgICAgICAgXHRcdFx0Y2xlYXJJbnRlcnZhbCgkLmludGVydmFsQXJyLnBvcCgpKTtcclxuXHQgICAgICAgIFx0XHRcdC8vIGRlYnVnU3RhdGVcclxuXHRcdFx0XHRcdFx0aWYgKGRlYnVnU3RhdGUpe1xyXG5cdFx0XHRcdFx0XHRcdHJvb3QuY29uc29sZS5sb2coXCLinJQgQWxsIEphcnZpc1dpZGdldCBpbnRlcnZhbHMgY2xlYXJlZFwiKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdCAgICAgICAgXHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIGVuZCBwb3AgaW50ZXJ2YWxzXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly8gZGVzdHJveSBhbGwgd2lkZ2V0IGluc3RhbmNlc1xyXG5cdFx0XHRcdGlmICggJC5uYXZBc0FqYXggJiYgKGNvbnRhaW5lclswXSA9PSAkKFwiI2NvbnRlbnRcIilbMF0pICYmIGVuYWJsZUphcnZpc1dpZGdldHMgJiYgJChcIiN3aWRnZXQtZ3JpZFwiKVswXSApIHtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JChcIiN3aWRnZXQtZ3JpZFwiKS5qYXJ2aXNXaWRnZXRzKCdkZXN0cm95Jyk7XHJcblx0XHRcdFx0XHQvLyBkZWJ1Z1N0YXRlXHJcblx0XHRcdFx0XHRpZiAoZGVidWdTdGF0ZSl7XHJcblx0XHRcdFx0XHRcdHJvb3QuY29uc29sZS5sb2coXCLinJQgSmFydmlzV2lkZ2V0cyBkZXN0cm95ZWRcIik7XHJcblx0XHRcdFx0XHR9IFxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIGVuZCBkZXN0cm95IGFsbCB3aWRnZXRzIFxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vIGNsdXN0ZXIgZGVzdHJveTogZGVzdHJveSBvdGhlciBpbnN0YW5jZXMgdGhhdCBjb3VsZCBiZSBvbiB0aGUgcGFnZSBcclxuXHRcdFx0XHQvLyB0aGlzIHJ1bnMgYSBzY3JpcHQgaW4gdGhlIGN1cnJlbnQgbG9hZGVkIHBhZ2UgYmVmb3JlIGZldGNoaW5nIHRoZSBuZXcgcGFnZVxyXG5cdFx0XHRcdGlmICggJC5uYXZBc0FqYXggJiYgKGNvbnRhaW5lclswXSA9PSAkKFwiI2NvbnRlbnRcIilbMF0pICkge1xyXG5cclxuXHRcdFx0XHRcdC8qXHJcblx0XHRcdFx0XHQgKiBUaGUgZm9sbG93aW5nIGVsZW1lbnRzIHNob3VsZCBiZSByZW1vdmVkLCBpZiB0aGV5IGhhdmUgYmVlbiBjcmVhdGVkOlxyXG5cdFx0XHRcdFx0ICpcclxuXHRcdFx0XHRcdCAqXHRjb2xvckxpc3RcclxuXHRcdFx0XHRcdCAqXHRpY29uXHJcblx0XHRcdFx0XHQgKlx0cGlja2VyXHJcblx0XHRcdFx0XHQgKlx0aW5saW5lXHJcblx0XHRcdFx0XHQgKlx0QW5kIHVuYmluZCBldmVudHMgZnJvbSBlbGVtZW50czpcclxuXHRcdFx0XHRcdCAqXHRcclxuXHRcdFx0XHRcdCAqXHRpY29uXHJcblx0XHRcdFx0XHQgKlx0cGlja2VyXHJcblx0XHRcdFx0XHQgKlx0aW5saW5lXHJcblx0XHRcdFx0XHQgKlx0ZXNwZWNpYWxseSAkKGRvY3VtZW50KS5vbignbW91c2Vkb3duJylcclxuXHRcdFx0XHRcdCAqXHRJdCB3aWxsIGJlIG11Y2ggZWFzaWVyIHRvIGFkZCBuYW1lc3BhY2UgdG8gcGx1Z2luIGV2ZW50cyBhbmQgdGhlbiB1bmJpbmQgdXNpbmcgc2VsZWN0ZWQgbmFtZXNwYWNlLlxyXG5cdFx0XHRcdFx0ICpcdFxyXG5cdFx0XHRcdFx0ICpcdFNlZSBhbHNvOlxyXG5cdFx0XHRcdFx0ICpcdFxyXG5cdFx0XHRcdFx0ICpcdGh0dHA6Ly9mNmRlc2lnbi5jb20vam91cm5hbC8yMDEyLzA1LzA2L2EtanF1ZXJ5LXBsdWdpbi1ib2lsZXJwbGF0ZS9cclxuXHRcdFx0XHRcdCAqXHRodHRwOi8va2VpdGgtd29vZC5uYW1lL3BsdWdpbkZyYW1ld29yay5odG1sXHJcblx0XHRcdFx0XHQgKi9cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8gdGhpcyBmdW5jdGlvbiBpcyBiZWxvdyB0aGUgcGFnZWZ1bmN0aW9uIGZvciBhbGwgcGFnZXMgdGhhdCBoYXMgaW5zdGFuY2VzXHJcblxyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBwYWdlZGVzdHJveSA9PSAnZnVuY3Rpb24nKSB7IFxyXG5cclxuXHRcdFx0XHRcdCAgdHJ5IHtcclxuXHRcdFx0XHRcdFx0ICAgIHBhZ2VkZXN0cm95KCk7IFxyXG5cclxuXHRcdFx0XHRcdFx0ICAgIGlmIChkZWJ1Z1N0YXRlKXtcclxuXHRcdFx0XHRcdFx0XHRcdHJvb3QuY29uc29sZS5sb2coXCLinJQgUGFnZWRlc3Ryb3koKVwiKTtcclxuXHRcdFx0XHRcdFx0ICAgfSBcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRjYXRjaChlcnIpIHtcclxuXHRcdFx0XHRcdFx0ICAgcGFnZWRlc3Ryb3kgPSB1bmRlZmluZWQ7IFxyXG5cclxuXHRcdFx0XHRcdFx0ICAgaWYgKGRlYnVnU3RhdGUpe1xyXG5cdFx0XHRcdFx0XHRcdFx0cm9vdC5jb25zb2xlLmxvZyhcIiEgUGFnZWRlc3Ryb3koKSBDYXRjaCBFcnJvclwiKTtcclxuXHRcdFx0XHRcdFx0ICAgfSBcclxuXHRcdFx0XHRcdCAgfVxyXG5cclxuXHRcdFx0XHRcdH0gXHJcblxyXG5cdFx0XHRcdFx0Ly8gZGVzdHJveSBhbGwgaW5saW5lIGNoYXJ0c1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRpZiAoICQuZm4uc3BhcmtsaW5lICYmICQoXCIjY29udGVudCAuc3BhcmtsaW5lXCIpWzBdICkge1xyXG5cdFx0XHRcdFx0XHQkKFwiI2NvbnRlbnQgLnNwYXJrbGluZVwiKS5zcGFya2xpbmUoICdkZXN0cm95JyApO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0aWYgKGRlYnVnU3RhdGUpe1xyXG5cdFx0XHRcdFx0XHRcdHJvb3QuY29uc29sZS5sb2coXCLinJQgU3BhcmtsaW5lIENoYXJ0cyBkZXN0cm95ZWQhXCIpO1xyXG5cdFx0XHRcdFx0XHR9IFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRpZiAoICQuZm4uZWFzeVBpZUNoYXJ0ICYmICQoXCIjY29udGVudCAuZWFzeS1waWUtY2hhcnRcIilbMF0gKSB7XHJcblx0XHRcdFx0XHRcdCQoXCIjY29udGVudCAuZWFzeS1waWUtY2hhcnRcIikuZWFzeVBpZUNoYXJ0KCAnZGVzdHJveScgKTtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGlmIChkZWJ1Z1N0YXRlKXtcclxuXHRcdFx0XHRcdFx0XHRyb290LmNvbnNvbGUubG9nKFwi4pyUIEVhc3lQaWVDaGFydCBDaGFydHMgZGVzdHJveWVkIVwiKTtcclxuXHRcdFx0XHRcdFx0fSBcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcclxuXHJcblx0XHRcdFx0XHQvLyBlbmQgZGVzdG9yeSBhbGwgaW5saW5lIGNoYXJ0c1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQvLyBkZXN0cm95IGZvcm0gY29udHJvbHM6IERhdGVwaWNrZXIsIHNlbGVjdDIsIGF1dG9jb21wbGV0ZSwgbWFzaywgYm9vdHN0cmFwIHNsaWRlclxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRpZiAoICQuZm4uc2VsZWN0MiAmJiAkKFwiI2NvbnRlbnQgc2VsZWN0LnNlbGVjdDJcIilbMF0gKSB7XHJcblx0XHRcdFx0XHRcdCQoXCIjY29udGVudCBzZWxlY3Quc2VsZWN0MlwiKS5zZWxlY3QyKCdkZXN0cm95Jyk7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRpZiAoZGVidWdTdGF0ZSl7XHJcblx0XHRcdFx0XHRcdFx0cm9vdC5jb25zb2xlLmxvZyhcIuKclCBTZWxlY3QyIGRlc3Ryb3llZCFcIik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0aWYgKCAkLmZuLm1hc2sgJiYgJCgnI2NvbnRlbnQgW2RhdGEtbWFza10nKVswXSApIHtcclxuXHRcdFx0XHRcdFx0JCgnI2NvbnRlbnQgW2RhdGEtbWFza10nKS51bm1hc2soKTtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGlmIChkZWJ1Z1N0YXRlKXtcclxuXHRcdFx0XHRcdFx0XHRyb290LmNvbnNvbGUubG9nKFwi4pyUIElucHV0IE1hc2sgZGVzdHJveWVkIVwiKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRpZiAoICQuZm4uZGF0ZXBpY2tlciAmJiAkKCcjY29udGVudCAuZGF0ZXBpY2tlcicpWzBdICkge1xyXG5cdFx0XHRcdFx0XHQkKCcjY29udGVudCAuZGF0ZXBpY2tlcicpLm9mZigpO1xyXG5cdFx0XHRcdFx0XHQkKCcjY29udGVudCAuZGF0ZXBpY2tlcicpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0aWYgKGRlYnVnU3RhdGUpe1xyXG5cdFx0XHRcdFx0XHRcdHJvb3QuY29uc29sZS5sb2coXCLinJQgRGF0ZXBpY2tlciBkZXN0cm95ZWQhXCIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGlmICggJC5mbi5zbGlkZXIgJiYgJCgnI2NvbnRlbnQgLnNsaWRlcicpWzBdICkge1xyXG5cdFx0XHRcdFx0XHQkKCcjY29udGVudCAuc2xpZGVyJykub2ZmKCk7XHJcblx0XHRcdFx0XHRcdCQoJyNjb250ZW50IC5zbGlkZXInKS5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGlmIChkZWJ1Z1N0YXRlKXtcclxuXHRcdFx0XHRcdFx0XHRyb290LmNvbnNvbGUubG9nKFwi4pyUIEJvb3RzdHJhcCBTbGlkZXIgZGVzdHJveWVkIVwiKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQvLyBlbmQgZGVzdHJveSBmb3JtIGNvbnRyb2xzXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBlbmQgY2x1c3RlciBkZXN0cm95XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly8gZW1wdHkgY29udGFpbmVyIGFuZCB2YXIgdG8gc3RhcnQgZ2FyYmFnZSBjb2xsZWN0aW9uIChmcmVlcyBtZW1vcnkpXHJcblx0XHRcdFx0cGFnZWZ1bmN0aW9uID0gbnVsbDtcclxuXHRcdFx0XHRjb250YWluZXIucmVtb3ZlRGF0YSgpLmh0bWwoXCJcIik7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly8gcGxhY2UgY29nXHJcblx0XHRcdFx0Y29udGFpbmVyLmh0bWwoJzxoMSBjbGFzcz1cImFqYXgtbG9hZGluZy1hbmltYXRpb25cIj48aSBjbGFzcz1cImZhIGZhLWNvZyBmYS1zcGluXCI+PC9pPiBMb2FkaW5nLi4uPC9oMT4nKTtcclxuXHRcdFx0XHJcblx0XHRcdFx0Ly8gT25seSBkcmF3IGJyZWFkY3J1bWIgaWYgaXQgaXMgbWFpbiBjb250ZW50IG1hdGVyaWFsXHJcblx0XHRcdFx0aWYgKGNvbnRhaW5lclswXSA9PSAkKFwiI2NvbnRlbnRcIilbMF0pIHtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8gY2xlYXIgZXZlcnl0aGluZyBlbHNlIGV4Y2VwdCB0aGVzZSBrZXkgRE9NIGVsZW1lbnRzXHJcblx0XHRcdFx0XHQvLyB3ZSBkbyB0aGlzIGJlY2F1c2Ugc29tZXRpbWUgcGx1Z2lucyB3aWxsIGxlYXZlIGR5bmFtaWMgZWxlbWVudHMgYmVoaW5kXHJcblx0XHRcdFx0XHQkKCdib2R5JykuZmluZCgnPiAqJykuZmlsdGVyKCc6bm90KCcgKyBpZ25vcmVfa2V5X2VsbXMgKyAnKScpLmVtcHR5KCkucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdC8vIGRyYXcgYnJlYWRjcnVtYlxyXG5cdFx0XHRcdFx0ZHJhd0JyZWFkQ3J1bWIoKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8gc2Nyb2xsIHVwXHJcblx0XHRcdFx0XHQkKFwiaHRtbFwiKS5hbmltYXRlKHtcclxuXHRcdFx0XHRcdFx0c2Nyb2xsVG9wIDogMFxyXG5cdFx0XHRcdFx0fSwgXCJmYXN0XCIpO1xyXG5cdFx0XHRcdH0gXHJcblx0XHRcdFx0Ly8gZW5kIGlmXHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhKSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly8gZHVtcCBkYXRhIHRvIGNvbnRhaW5lclxyXG5cdFx0XHRcdGNvbnRhaW5lci5jc3Moe1xyXG5cdFx0XHRcdFx0b3BhY2l0eSA6ICcwLjAnXHJcblx0XHRcdFx0fSkuaHRtbChkYXRhKS5kZWxheSg1MCkuYW5pbWF0ZSh7XHJcblx0XHRcdFx0XHRvcGFjaXR5IDogJzEuMCdcclxuXHRcdFx0XHR9LCAzMDApO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vIGNsZWFyIGRhdGEgdmFyXHJcblx0XHRcdFx0ZGF0YSA9IG51bGw7XHJcblx0XHRcdFx0Y29udGFpbmVyID0gbnVsbDtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3IgOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgdGhyb3duRXJyb3IsIGVycm9yKSB7XHJcblx0XHRcdFx0Y29udGFpbmVyLmh0bWwoJzxoNCBjbGFzcz1cImFqYXgtbG9hZGluZy1lcnJvclwiPjxpIGNsYXNzPVwiZmEgZmEtd2FybmluZyB0eHQtY29sb3Itb3JhbmdlRGFya1wiPjwvaT4gRXJyb3IgcmVxdWVzdGluZyA8c3BhbiBjbGFzcz1cInR4dC1jb2xvci1yZWRcIj4nICsgdXJsICsgJzwvc3Bhbj46ICcgKyB4aHIuc3RhdHVzICsgJyA8c3BhbiBzdHlsZT1cInRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1wiPicgICsgdGhyb3duRXJyb3IgKyAnPC9zcGFuPjwvaDQ+Jyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGFzeW5jIDogdHJ1ZSBcclxuXHRcdH0pO1xyXG5cdFxyXG5cdH1cclxuLypcclxuICogVVBEQVRFIEJSRUFEQ1JVTUJcclxuICovIFxyXG5cdGZ1bmN0aW9uIGRyYXdCcmVhZENydW1iKG9wdF9icmVhZENydW1icykge1xyXG5cdFx0dmFyIGEgPSAkKFwibmF2IGxpLmFjdGl2ZSA+IGFcIiksXHJcblx0XHRcdGIgPSBhLmxlbmd0aDtcclxuXHRcclxuXHRcdGJyZWFkX2NydW1iLmVtcHR5KCksIFxyXG5cdFx0YnJlYWRfY3J1bWIuYXBwZW5kKCQoXCI8bGk+SG9tZTwvbGk+XCIpKSwgYS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRicmVhZF9jcnVtYi5hcHBlbmQoJChcIjxsaT48L2xpPlwiKS5odG1sKCQudHJpbSgkKHRoaXMpLmNsb25lKCkuY2hpbGRyZW4oXCIuYmFkZ2VcIikucmVtb3ZlKCkuZW5kKCkudGV4dCgpKSkpLCAtLWIgfHwgKGRvY3VtZW50LnRpdGxlID0gYnJlYWRfY3J1bWIuZmluZChcImxpOmxhc3QtY2hpbGRcIikudGV4dCgpKVxyXG5cdFx0fSk7XHJcblx0XHRcclxuXHRcdC8vIFB1c2ggYnJlYWRjcnVtYiBtYW51YWxseSAtPiBkcmF3QnJlYWRDcnVtYihbXCJVc2Vyc1wiLCBcIkpvaG4gRG9lXCJdKTtcclxuXHRcdC8vIENyZWRpdHM6IFBoaWxpcCBXaGl0dCB8IHBoaWxpcC53aGl0dEBzYmNnbG9iYWwubmV0XHJcblx0XHRpZiAob3B0X2JyZWFkQ3J1bWJzICE9IHVuZGVmaW5lZCkge1xyXG5cdFx0XHQkLmVhY2gob3B0X2JyZWFkQ3J1bWJzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcclxuXHRcdFx0XHRicmVhZF9jcnVtYi5hcHBlbmQoJChcIjxsaT48L2xpPlwiKS5odG1sKHZhbHVlKSk7IFxyXG5cdFx0XHRcdGRvY3VtZW50LnRpdGxlID0gYnJlYWRfY3J1bWIuZmluZChcImxpOmxhc3QtY2hpbGRcIikudGV4dCgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbi8qIH4gRU5EOiBBUFAgQUpBWCBSRVFVRVNUIFNFVFVQICovXHJcblxyXG4vKlxyXG4gKiBQQUdFIFNFVFVQXHJcbiAqIERlc2NyaXB0aW9uOiBmaXJlIGNlcnRhaW4gc2NyaXB0cyB0aGF0IHJ1biB0aHJvdWdoIHRoZSBwYWdlXHJcbiAqIHRvIGNoZWNrIGZvciBmb3JtIGVsZW1lbnRzLCB0b29sdGlwIGFjdGl2YXRpb24sIHBvcG92ZXJzLCBldGMuLi5cclxuICovXHJcblx0ZnVuY3Rpb24gcGFnZVNldFVwKCkge1xyXG5cdFxyXG5cdFx0aWYgKHRoaXNEZXZpY2UgPT09IFwiZGVza3RvcFwiKXtcclxuXHRcdFx0Ly8gaXMgZGVza3RvcFxyXG5cdFx0XHRcclxuXHRcdFx0Ly8gYWN0aXZhdGUgdG9vbHRpcHNcclxuXHRcdFx0JChcIltyZWw9dG9vbHRpcF0sIFtkYXRhLXJlbD10b29sdGlwXVwiKS50b29sdGlwKCk7XHJcblx0XHRcclxuXHRcdFx0Ly8gYWN0aXZhdGUgcG9wb3ZlcnNcclxuXHRcdFx0JChcIltyZWw9cG9wb3Zlcl0sIFtkYXRhLXJlbD1wb3BvdmVyXVwiKS5wb3BvdmVyKCk7XHJcblx0XHRcclxuXHRcdFx0Ly8gYWN0aXZhdGUgcG9wb3ZlcnMgd2l0aCBob3ZlciBzdGF0ZXNcclxuXHRcdFx0JChcIltyZWw9cG9wb3Zlci1ob3Zlcl0sIFtkYXRhLXJlbD1wb3BvdmVyLWhvdmVyXVwiKS5wb3BvdmVyKHtcclxuXHRcdFx0XHR0cmlnZ2VyIDogXCJob3ZlclwiXHJcblx0XHRcdH0pO1xyXG5cdFxyXG5cdFx0XHQvLyBzZXR1cCB3aWRnZXRzXHJcblx0XHRcdHNldHVwX3dpZGdldHNfZGVza3RvcCgpO1xyXG5cdFx0XHJcblx0XHRcdC8vIGFjdGl2YXRlIGlubGluZSBjaGFydHNcclxuXHRcdFx0cnVuQWxsQ2hhcnRzKCk7XHJcblx0XHRcclxuXHRcdFx0Ly8gcnVuIGZvcm0gZWxlbWVudHNcclxuXHRcdFx0cnVuQWxsRm9ybXMoKTtcclxuXHRcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdFxyXG5cdFx0XHQvLyBpcyBtb2JpbGVcclxuXHRcdFx0XHJcblx0XHRcdC8vIGFjdGl2YXRlIHBvcG92ZXJzXHJcblx0XHRcdCQoXCJbcmVsPXBvcG92ZXJdLCBbZGF0YS1yZWw9cG9wb3Zlcl1cIikucG9wb3ZlcigpO1xyXG5cdFx0XHJcblx0XHRcdC8vIGFjdGl2YXRlIHBvcG92ZXJzIHdpdGggaG92ZXIgc3RhdGVzXHJcblx0XHRcdCQoXCJbcmVsPXBvcG92ZXItaG92ZXJdLCBbZGF0YS1yZWw9cG9wb3Zlci1ob3Zlcl1cIikucG9wb3Zlcih7XHJcblx0XHRcdFx0dHJpZ2dlciA6IFwiaG92ZXJcIlxyXG5cdFx0XHR9KTtcclxuXHRcdFxyXG5cdFx0XHQvLyBhY3RpdmF0ZSBpbmxpbmUgY2hhcnRzXHJcblx0XHRcdHJ1bkFsbENoYXJ0cygpO1xyXG5cdFx0XHJcblx0XHRcdC8vIHNldHVwIHdpZGdldHNcclxuXHRcdFx0c2V0dXBfd2lkZ2V0c19tb2JpbGUoKTtcclxuXHRcdFxyXG5cdFx0XHQvLyBydW4gZm9ybSBlbGVtZW50c1xyXG5cdFx0XHRydW5BbGxGb3JtcygpO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcclxuXHR9XHJcbi8qIH4gRU5EOiBQQUdFIFNFVFVQICovXHJcblxyXG4vKlxyXG4gKiBPTkUgUE9QT1ZFUiBUSEVPUllcclxuICogS2VlcCBvbmx5IDEgYWN0aXZlIHBvcG92ZXIgcGVyIHRyaWdnZXIgLSBhbHNvIGNoZWNrIGFuZCBoaWRlIGFjdGl2ZSBwb3BvdmVycyBpZiB1c2VyIGNsaWNrcyBvbiBkb2N1bWVudFxyXG4gKi9cclxuXHQkKCdib2R5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0JCgnW3JlbD1cInBvcG92ZXJcIl0sIFtkYXRhLXJlbD1cInBvcG92ZXJcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvL3RoZSAnaXMnIGZvciBidXR0b25zIHRoYXQgdHJpZ2dlciBwb3B1cHNcclxuXHRcdFx0Ly90aGUgJ2hhcycgZm9yIGljb25zIHdpdGhpbiBhIGJ1dHRvbiB0aGF0IHRyaWdnZXJzIGEgcG9wdXBcclxuXHRcdFx0aWYgKCEkKHRoaXMpLmlzKGUudGFyZ2V0KSAmJiAkKHRoaXMpLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwICYmICQoJy5wb3BvdmVyJykuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0XHQkKHRoaXMpLnBvcG92ZXIoJ2hpZGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7IFxyXG4vKiB+IEVORDogT05FIFBPUCBPVkVSIFRIRU9SWSAqL1xyXG5cclxuLypcclxuICogREVMRVRFIE1PREVMIERBVEEgT04gSElEREVOXHJcbiAqIENsZWFycyB0aGUgbW9kZWwgZGF0YSBvbmNlIGl0IGlzIGhpZGRlbiwgdGhpcyB3YXkgeW91IGRvIG5vdCBjcmVhdGUgZHVwbGljYXRlZCBkYXRhIG9uIG11bHRpcGxlIG1vZGFsc1xyXG4gKi9cclxuXHQkKCdib2R5Jykub24oJ2hpZGRlbi5icy5tb2RhbCcsICcubW9kYWwnLCBmdW5jdGlvbiAoKSB7XHJcblx0ICAkKHRoaXMpLnJlbW92ZURhdGEoJ2JzLm1vZGFsJyk7XHJcblx0fSk7XHJcbi8qIH4gRU5EOiBERUxFVEUgTU9ERUwgREFUQSBPTiBISURERU4gKi9cclxuXHJcbi8qXHJcbiAqIEhFTFBGVUwgRlVOQ1RJT05TXHJcbiAqIFdlIGhhdmUgaW5jbHVkZWQgc29tZSBmdW5jdGlvbnMgYmVsb3cgdGhhdCBjYW4gYmUgcmVzdWVkIG9uIHZhcmlvdXMgb2NjYXNpb25zXHJcbiAqIFxyXG4gKiBHZXQgcGFyYW0gdmFsdWVcclxuICogZXhhbXBsZTogYWxlcnQoIGdldFBhcmFtKCAncGFyYW0nICkgKTtcclxuICovXHJcblx0ZnVuY3Rpb24gZ2V0UGFyYW0obmFtZSkge1xyXG5cdCAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXS8sIFwiXFxcXFxcW1wiKS5yZXBsYWNlKC9bXFxdXS8sIFwiXFxcXFxcXVwiKTtcclxuXHQgICAgdmFyIHJlZ2V4UyA9IFwiW1xcXFw/Jl1cIiArIG5hbWUgKyBcIj0oW14mI10qKVwiO1xyXG5cdCAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKHJlZ2V4Uyk7XHJcblx0ICAgIHZhciByZXN1bHRzID0gcmVnZXguZXhlYyh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcblx0ICAgIGlmIChyZXN1bHRzID09IG51bGwpXHJcblx0ICAgICAgICByZXR1cm4gXCJcIjtcclxuXHQgICAgZWxzZVxyXG5cdCAgICAgICAgcmV0dXJuIHJlc3VsdHNbMV07XHJcblx0fVxyXG4vKiB+IEVORDogSEVMUEZVTCBGVU5DVElPTlMgKi9cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3d3cm9vdC9qcy9hcHAuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9