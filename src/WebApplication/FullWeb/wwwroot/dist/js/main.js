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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGY3YzU4ODU3NzRiMjMwMjY3NGEiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3d3d3Jvb3QvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQjtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQztBQUNBLG1CO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTTtBQUNOLFNBQVE7O0FBRVI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUEsT0FBTTs7QUFFTjs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUEsUUFBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0M7QUFDbEM7QUFDQSxTQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBLFVBQVMseUU7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVE7O0FBRVI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUEsUzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEtBQUksRTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxxRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSix5RTtBQUNBO0FBQ0E7QUFDQSxLQUFJLEU7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUksRTs7QUFFSixtRTtBQUNBO0FBQ0E7QUFDQSxLQUFJLEU7O0FBRUosdUU7QUFDQTtBQUNBO0FBQ0EsS0FBSSxFOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxrQjtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsS0FBSTs7QUFFSjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPLEVBQUU7OztBQUdUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsSTtBQUNBOztBQUVBOztBQUVBLEdBQUUsSUFBSTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0RBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQWtCO0FBQ2xCLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxtQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7O0FBRVY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0RBQW1EOztBQUVuRDtBQUNBO0FBQ0E7QUFDQSxtQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBLGVBQWM7QUFDZDs7QUFFQSxXQUFVOztBQUVWOztBQUVBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxHQUFFLEk7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXOztBQUVYO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPOztBQUVQLE9BQU07QUFDTjtBQUNBLHVDQUFzQyxrQkFBa0IsT0FBTztBQUMvRDtBQUNBO0FBQ0EsUUFBTztBQUNQLE9BQU07QUFDTixNQUFLO0FBQ0wsS0FBSTtBQUNKLElBQUc7QUFDSCxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKLElBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNOztBQUVOOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFO0FBQ0EseUU7QUFDQSx5RTtBQUNBLHlFO0FBQ0EsK0Q7QUFDQSwrRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU07O0FBRU47O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxPQUFPLFNBQVMsV0FBVyxXQUFXO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTs7QUFFTjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNOztBQUVOOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTTs7QUFFTjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNOztBQUVOOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNOztBQUVOOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNOztBQUVOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNOztBQUVOOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU07O0FBRU47O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNOztBQUVOOztBQUVBOztBQUVBLEtBQUk7O0FBRUosSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSzs7QUFFTDtBQUNBLEtBQUk7O0FBRUosSUFBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUEsTUFBSztBQUNMOztBQUVBLE1BQUs7QUFDTDs7QUFFQSxLQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsT0FBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0EsT0FBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSzs7QUFFTDtBQUNBOztBQUVBLGlEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUEsT0FBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDZDOztBQUVBO0FBQ0EseUI7O0FBRUE7QUFDQTtBQUNBLFc7QUFDQTtBQUNBO0FBQ0Esa0M7O0FBRUE7QUFDQTtBQUNBLFc7QUFDQTs7QUFFQSxPOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRO0FBQ0E7Ozs7QUFJQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTixNO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQSxtT0FBa087QUFDbE8sS0FBSTtBQUNKO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0Q7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBRzs7QUFFSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEdBQUUsRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0IiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMGY3YzU4ODU3NzRiMjMwMjY3NGFcbiAqKi8iLCJyZXF1aXJlKFwiLi9hcHAuanNcIik7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L2pzL21haW4uanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiAgICAgICAgICAgICAgICAgIF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXHJcbiAgICAgICAgICAgX19fX19fX198ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8X19fX19fX1xyXG4gICAgICAgICAgIFxcICAgICAgIHwgICAgICAgICAgIFNtYXJ0QWRtaW4gV2ViQXBwICAgICAgICAgIHwgICAgICAvXHJcbiAgICAgICAgICAgIFxcICAgICAgfCAgICAgIENvcHlyaWdodCDCqSAyMDE2IE15T3JhbmdlICAgICAgIHwgICAgIC9cclxuICAgICAgICAgICAgLyAgICAgIHxfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX3wgICAgIFxcXHJcbiAgICAgICAgICAgL19fX19fX19fX18pICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoX19fX19fX19fXFxcclxuXHJcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXHJcbiAqIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxyXG4gKiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0ZcclxuICogTUVSQ0hBTlRBQklMSVRZLCBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRVxyXG4gKiBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OXHJcbiAqIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTlxyXG4gKiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICogb3JpZ2luYWwgZmlsZW5hbWUgIDogYXBwLmpzXHJcbiAqIGZpbGVzaXplICAgICAgICAgICA6IDYyLDQ5OX4gYnl0ZXNcclxuICogYXV0aG9yICAgICAgICAgICAgIDogU3VubnkgKEBib290c3RyYXBodW50KVxyXG4gKiBlbWFpbCAgICAgICAgICAgICAgOiBpbmZvQG15b3JhbmdlLmNhXHJcbiAqIGxlZ2FsIG5vdGljZSAgICAgICA6IFRoaXMgc2NyaXB0IGlzIHBhcnQgb2YgYSB0aGVtZSBzb2xkIGJ5IFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICBNWU9SQU5HRSBJTkMuXHJcbiAqICAgIFxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiBJTkRFWCAoTm90ZTogbGluZSBudW1iZXJzIGZvciBpbmRleCBpdGVtcyBtYXkgbm90IGJlIHVwIHRvIGRhdGUpOlxyXG4gKiBcclxuICogMS4gQVBQIENPTkZJR1VSQVRJT04uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uWyBhcHAuY29uZmlnLmpzIF1cclxuICogMi4gQVBQIERPTSBSRUZFUkVOQ0VTLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uWyBhcHAuY29uZmlnLmpzIF1cclxuICogMy4gREVURUNUIE1PQklMRSBERVZJQ0VTLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogMTQ5IF1cclxuICogNC4gQ1VTVE9NIE1FTlUgUExVR0lOLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogNjg4IF1cclxuICogNS4gRUxFTUVOVCBFWElTVCBPUiBOT1QuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogNzc4IF1cclxuICogNi4gSU5JVElBTElaRSBGT1JNUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogNzg4IF1cclxuICogXHRcdDZhLiBCT09UU1RSQVAgU0xJREVSIFBMVUdJTi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiA3OTQgXVxyXG4gKiBcdFx0NmIuIFNFTEVDVDIgUExVR0lOLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDgwMyBdXHJcbiAqIFx0XHQ2Yy4gTUFTS0lORy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogODI0IF1cclxuICogXHRcdDZkLiBBVVRPQ09NUExFVEUuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiA4NDMgXVxyXG4gKiBcdFx0NmYuIEpRVUVSWSBVSSBEQVRFLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDg2MiBdXHJcbiAqIFx0XHQ2Zy4gQUpBWCBCVVRUT04gTE9BRElORyBURVhULi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogODg0IF1cclxuICogNy4gSU5JVElBTElaRSBDSEFSVFMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogOTAyIF1cclxuICogXHRcdDdhLiBTUEFSS0xJTkVTLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiA5MDcgXVxyXG4gKiBcdFx0N2IuIExJTkUgQ0hBUlQuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDEwMjZdXHJcbiAqIFx0XHQ3Yy4gUElFIENIQVJULi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogMTA3N11cclxuICogXHRcdDdkLiBCT1ggUExPVC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAxMTAwXVxyXG4gKiBcdFx0N2UuIEJVTExFVC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDExNDVdXHJcbiAqIFx0XHQ3Zi4gRElTQ1JFVEUuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogMTE2OV1cclxuICogXHRcdDdnLiBUUklTVEFURS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAxMTk1XVxyXG4gKiBcdFx0N2guIENPTVBPU0lURTogQkFSLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDEyMjNdXHJcbiAqIFx0XHQ3aS4gQ09NUE9TSVRFOiBMSU5FLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogMTI1OV1cclxuICogXHRcdDdqLiBFQVNZIFBJRSBDSEFSVFMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAxMzM5XVxyXG4gKiA4LiBJTklUSUFMSVpFIEpBUlZJUyBXSURHRVRTLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAxMzc5XVxyXG4gKiBcdFx0OGEuIFNFVFVQIERFU0tUT1AgV0lER0VULi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDE0NjZdXHJcbiAqIFx0XHQ4Yi4gR09PR0xFIE1BUFMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5bbGluZTogMTQ3OF1cclxuICogXHRcdDhjLiBMT0FEIFNDUklQVFMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLltsaW5lOiAxNTAwXVxyXG4gKiBcdFx0OGQuIEFQUCBBSkFYIFJFUVVFU1QgU0VUVVAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDE1MzhdXHJcbiAqIDkuIENIRUNLIFRPIFNFRSBJRiBVUkwgRVhJU1RTLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDE2MTRdXHJcbiAqIDEwLkxPQUQgQUpBWCBQQUdFUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDE2NjldXHJcbiAqIDExLlVQREFURSBCUkVBRENSVU1CLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDE3NzVdXHJcbiAqIDEyLlBBR0UgU0VUVVAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDE3OThdXHJcbiAqIDEzLlBPUCBPVkVSIFRIRU9SWS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDE4NTJdXHJcbiAqIDE0LkRFTEVURSBNT0RFTCBEQVRBIE9OIEhJRERFTi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDE5OTFdXHJcbiAqIDE1LkhFTFBGVUwgRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uW2xpbmU6IDIwMjddXHJcbiAqIFxyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiAgICAgICBJTVBPUlRBTlQ6IEFMTCBDT05GSUcgVkFSUyBJUyBOT1cgTU9WRUQgVE8gQVBQLkNPTkZJRy5KU1xyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiBcclxuICogXHJcbiAqIEdMT0JBTDogaW50ZXJ2YWwgYXJyYXkgKHRvIGJlIHVzZWQgd2l0aCBqYXJ2aXN3aWRnZXQgaW4gYWpheCBhbmQgXHJcbiAqIGFuZ3VsYXIgbW9kZSkgdG8gY2xlYXIgYXV0byBmZXRjaCBpbnRlcnZhbFxyXG4gKi9cclxuXHQkLmludGVydmFsQXJyID0gW107XHJcbi8qXHJcbiAqIENhbGN1bGF0ZSBuYXYgaGVpZ2h0XHJcbiAqL1xyXG52YXIgY2FsY19uYXZiYXJfaGVpZ2h0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgaGVpZ2h0ID0gbnVsbDtcclxuXHRcclxuXHRcdGlmICgkKCcjaGVhZGVyJykubGVuZ3RoKVxyXG5cdFx0XHRoZWlnaHQgPSAkKCcjaGVhZGVyJykuaGVpZ2h0KCk7XHJcblx0XHJcblx0XHRpZiAoaGVpZ2h0ID09PSBudWxsKVxyXG5cdFx0XHRoZWlnaHQgPSAkKCc8ZGl2IGlkPVwiaGVhZGVyXCI+PC9kaXY+JykuaGVpZ2h0KCk7XHJcblx0XHJcblx0XHRpZiAoaGVpZ2h0ID09PSBudWxsKVxyXG5cdFx0XHRyZXR1cm4gNDk7XHJcblx0XHQvLyBkZWZhdWx0XHJcblx0XHRyZXR1cm4gaGVpZ2h0O1xyXG5cdH0sXHJcblx0XHJcblx0bmF2YmFyX2hlaWdodCA9IGNhbGNfbmF2YmFyX2hlaWdodCwgXHJcbi8qXHJcbiAqIEFQUCBET00gUkVGRVJFTkNFU1xyXG4gKiBEZXNjcmlwdGlvbjogT2JqIERPTSByZWZlcmVuY2UsIHBsZWFzZSB0cnkgdG8gYXZvaWQgY2hhbmdpbmcgdGhlc2VcclxuICovXHRcclxuXHRzaG9ydGN1dF9kcm9wZG93biA9ICQoJyNzaG9ydGN1dCcpLFxyXG5cdFxyXG5cdGJyZWFkX2NydW1iID0gJCgnI3JpYmJvbiBvbC5icmVhZGNydW1iJyksXHJcbi8qXHJcbiAqIFRvcCBtZW51IG9uL29mZlxyXG4gKi9cclxuXHR0b3BtZW51ID0gZmFsc2UsXHJcbi8qXHJcbiAqIGRlc2t0b3Agb3IgbW9iaWxlXHJcbiAqL1xyXG5cdHRoaXNEZXZpY2UgPSBudWxsLFxyXG4vKlxyXG4gKiBERVRFQ1QgTU9CSUxFIERFVklDRVNcclxuICogRGVzY3JpcHRpb246IERldGVjdHMgbW9iaWxlIGRldmljZSAtIGlmIGFueSBvZiB0aGUgbGlzdGVkIGRldmljZSBpcyBcclxuICogZGV0ZWN0ZWQgYSBjbGFzcyBpcyBpbnNlcnRlZCB0byAkLnJvb3RfIGFuZCB0aGUgdmFyaWFibGUgdGhpc0RldmljZSBcclxuICogaXMgZGVjbGVhcmQuIChzbyBmYXIgdGhpcyBpcyBjb3ZlcmluZyBtb3N0IGhhbmQgaGVsZCBkZXZpY2VzKVxyXG4gKi9cdFxyXG5cdGlzbW9iaWxlID0gKC9pcGhvbmV8aXBhZHxpcG9kfGFuZHJvaWR8YmxhY2tiZXJyeXxtaW5pfHdpbmRvd3NcXHNjZXxwYWxtL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpKSxcclxuLypcclxuICogSlMgQVJSQVkgU0NSSVBUIFNUT1JBR0VcclxuICogRGVzY3JpcHRpb246IHVzZWQgd2l0aCBsb2FkU2NyaXB0IHRvIHN0b3JlIHNjcmlwdCBwYXRoIGFuZCBmaWxlIG5hbWVcclxuICogc28gaXQgd2lsbCBub3QgbG9hZCB0d2ljZVxyXG4gKi9cdFxyXG5cdGpzQXJyYXkgPSB7fSxcclxuLypcclxuICogQXBwIEluaXRpYWxpemVcclxuICogRGVzY3JpcHRpb246IEluaXRpYWxpemVzIHRoZSBhcHAgd2l0aCBpbnRBcHAoKTtcclxuICovXHRcclxuXHRpbml0QXBwID0gKGZ1bmN0aW9uKGFwcCkge1xyXG5cdFx0XHJcblx0XHQvKlxyXG5cdFx0ICogQUREIERFVklDRSBUWVBFXHJcblx0XHQgKiBEZXRlY3QgaWYgbW9iaWxlIG9yIGRlc2t0b3BcclxuXHRcdCAqL1x0XHRcclxuXHRcdGFwcC5hZGREZXZpY2VUeXBlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoIWlzbW9iaWxlKSB7XHJcblx0XHRcdFx0Ly8gRGVza3RvcFxyXG5cdFx0XHRcdCQucm9vdF8uYWRkQ2xhc3MoXCJkZXNrdG9wLWRldGVjdGVkXCIpO1xyXG5cdFx0XHRcdHRoaXNEZXZpY2UgPSBcImRlc2t0b3BcIjtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7IFxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIE1vYmlsZVxyXG5cdFx0XHRcdCQucm9vdF8uYWRkQ2xhc3MoXCJtb2JpbGUtZGV0ZWN0ZWRcIik7XHJcblx0XHRcdFx0dGhpc0RldmljZSA9IFwibW9iaWxlXCI7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYgKGZhc3RDbGljaykge1xyXG5cdFx0XHRcdFx0Ly8gUmVtb3ZlcyB0aGUgdGFwIGRlbGF5IGluIGlkZXZpY2VzXHJcblx0XHRcdFx0XHQvLyBkZXBlbmRlbmN5OiBqcy9wbHVnaW4vZmFzdGNsaWNrL2Zhc3RjbGljay5qcyBcclxuXHRcdFx0XHRcdCQucm9vdF8uYWRkQ2xhc3MoXCJuZWVkc2NsaWNrXCIpO1xyXG5cdFx0XHRcdFx0RmFzdENsaWNrLmF0dGFjaChkb2N1bWVudC5ib2R5KTsgXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7IFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH07XHJcblx0XHQvKiB+IEVORDogQUREIERFVklDRSBUWVBFICovXHJcblx0XHRcclxuXHRcdC8qXHJcblx0XHQgKiBDSEVDSyBGT1IgTUVOVSBQT1NJVElPTlxyXG5cdFx0ICogU2NhbnMgbG9jYWxzdHJvYWdlIGZvciBtZW51IHBvc2l0aW9uICh2ZXJ0aWNhbCBvciBob3Jpem9udGFsKVxyXG5cdFx0ICovXHJcblx0XHRhcHAubWVudVBvcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcclxuXHRcdCBcdGlmICgkLnJvb3RfLmhhc0NsYXNzKFwibWVudS1vbi10b3BcIikgfHwgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NtLXNldG1lbnUnKT09J3RvcCcgKSB7IFxyXG5cdFx0IFx0XHR0b3BtZW51ID0gdHJ1ZTtcclxuXHRcdCBcdFx0JC5yb290Xy5hZGRDbGFzcyhcIm1lbnUtb24tdG9wXCIpO1xyXG5cdFx0IFx0fVxyXG5cdFx0fTtcclxuXHRcdC8qIH4gRU5EOiBDSEVDSyBNT0JJTEUgREVWSUNFICovXHJcblxyXG5cdFx0LypcclxuXHRcdCAqIFNNQVJUIEFDVElPTlNcclxuXHRcdCAqL1xyXG5cdFx0YXBwLlNtYXJ0QWN0aW9ucyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHJcblx0XHRcdHZhciBzbWFydEFjdGlvbnMgPSB7XHJcblx0XHRcdCAgICBcclxuXHRcdFx0ICAgIC8vIExPR09VVCBNU0cgXHJcblx0XHRcdCAgICB1c2VyTG9nb3V0OiBmdW5jdGlvbigkdGhpcyl7XHJcblx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8gYXNrIHZlcmlmaWNhdGlvblxyXG5cdFx0XHRcdFx0JC5TbWFydE1lc3NhZ2VCb3goe1xyXG5cdFx0XHRcdFx0XHR0aXRsZSA6IFwiPGkgY2xhc3M9J2ZhIGZhLXNpZ24tb3V0IHR4dC1jb2xvci1vcmFuZ2VEYXJrJz48L2k+IExvZ291dCA8c3BhbiBjbGFzcz0ndHh0LWNvbG9yLW9yYW5nZURhcmsnPjxzdHJvbmc+XCIgKyAkKCcjc2hvdy1zaG9ydGN1dCcpLnRleHQoKSArIFwiPC9zdHJvbmc+PC9zcGFuPiA/XCIsXHJcblx0XHRcdFx0XHRcdGNvbnRlbnQgOiAkdGhpcy5kYXRhKCdsb2dvdXQtbXNnJykgfHwgXCJZb3UgY2FuIGltcHJvdmUgeW91ciBzZWN1cml0eSBmdXJ0aGVyIGFmdGVyIGxvZ2dpbmcgb3V0IGJ5IGNsb3NpbmcgdGhpcyBvcGVuZWQgYnJvd3NlclwiLFxyXG5cdFx0XHRcdFx0XHRidXR0b25zIDogJ1tOb11bWWVzXSdcclxuXHRcdFx0XHJcblx0XHRcdFx0XHR9LCBmdW5jdGlvbihCdXR0b25QcmVzc2VkKSB7XHJcblx0XHRcdFx0XHRcdGlmIChCdXR0b25QcmVzc2VkID09IFwiWWVzXCIpIHtcclxuXHRcdFx0XHRcdFx0XHQkLnJvb3RfLmFkZENsYXNzKCdhbmltYXRlZCBmYWRlT3V0VXAnKTtcclxuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGxvZ291dCwgMTAwMCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0ZnVuY3Rpb24gbG9nb3V0KCkge1xyXG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24gPSAkdGhpcy5hdHRyKCdocmVmJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcclxuXHRcdFx0XHQvLyBSRVNFVCBXSURHRVRTXHJcblx0XHRcdCAgICByZXNldFdpZGdldHM6IGZ1bmN0aW9uKCR0aGlzKXtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JC5TbWFydE1lc3NhZ2VCb3goe1xyXG5cdFx0XHRcdFx0XHR0aXRsZSA6IFwiPGkgY2xhc3M9J2ZhIGZhLXJlZnJlc2gnIHN0eWxlPSdjb2xvcjpncmVlbic+PC9pPiBDbGVhciBMb2NhbCBTdG9yYWdlXCIsXHJcblx0XHRcdFx0XHRcdGNvbnRlbnQgOiAkdGhpcy5kYXRhKCdyZXNldC1tc2cnKSB8fCBcIldvdWxkIHlvdSBsaWtlIHRvIFJFU0VUIGFsbCB5b3VyIHNhdmVkIHdpZGdldHMgYW5kIGNsZWFyIExvY2FsU3RvcmFnZT8xXCIsXHJcblx0XHRcdFx0XHRcdGJ1dHRvbnMgOiAnW05vXVtZZXNdJ1xyXG5cdFx0XHRcdFx0fSwgZnVuY3Rpb24oQnV0dG9uUHJlc3NlZCkge1xyXG5cdFx0XHRcdFx0XHRpZiAoQnV0dG9uUHJlc3NlZCA9PSBcIlllc1wiICYmIGxvY2FsU3RvcmFnZSkge1xyXG5cdFx0XHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG5cdFx0XHRcdFx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdCAgICB9LFxyXG5cdFx0XHQgICAgXHJcblx0XHRcdCAgICAvLyBMQVVOQ0ggRlVMTFNDUkVFTiBcclxuXHRcdFx0ICAgIGxhdW5jaEZ1bGxzY3JlZW46IGZ1bmN0aW9uKGVsZW1lbnQpe1xyXG5cdFx0XHRcclxuXHRcdFx0XHRcdGlmICghJC5yb290Xy5oYXNDbGFzcyhcImZ1bGwtc2NyZWVuXCIpKSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdCQucm9vdF8uYWRkQ2xhc3MoXCJmdWxsLXNjcmVlblwiKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0aWYgKGVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuXHRcdFx0XHRcdFx0XHRlbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoZWxlbWVudC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcblx0XHRcdFx0XHRcdFx0ZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0JC5yb290Xy5yZW1vdmVDbGFzcyhcImZ1bGwtc2NyZWVuXCIpO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0aWYgKGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKSB7XHJcblx0XHRcdFx0XHRcdFx0ZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XHJcblx0XHRcdFx0XHRcdFx0ZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XHJcblx0XHRcdFx0XHRcdFx0ZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0ICAgfSxcclxuXHRcdFx0XHJcblx0XHRcdCAgIC8vIE1JTklGWSBNRU5VXHJcblx0XHRcdCAgICBtaW5pZnlNZW51OiBmdW5jdGlvbigkdGhpcyl7XHJcblx0XHRcdCAgICBcdGlmICghJC5yb290Xy5oYXNDbGFzcyhcIm1lbnUtb24tdG9wXCIpKXtcclxuXHRcdFx0XHRcdFx0JC5yb290Xy50b2dnbGVDbGFzcyhcIm1pbmlmaWVkXCIpO1xyXG5cdFx0XHRcdFx0XHQkLnJvb3RfLnJlbW92ZUNsYXNzKFwiaGlkZGVuLW1lbnVcIik7XHJcblx0XHRcdFx0XHRcdCQoJ2h0bWwnKS5yZW1vdmVDbGFzcyhcImhpZGRlbi1tZW51LW1vYmlsZS1sb2NrXCIpO1xyXG5cdFx0XHRcdFx0XHQkdGhpcy5lZmZlY3QoXCJoaWdobGlnaHRcIiwge30sIDUwMCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdCAgICB9LFxyXG5cdFx0XHQgICAgXHJcblx0XHRcdCAgICAvLyBUT0dHTEUgTUVOVSBcclxuXHRcdFx0ICAgIHRvZ2dsZU1lbnU6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdCAgICBcdGlmICghJC5yb290Xy5oYXNDbGFzcyhcIm1lbnUtb24tdG9wXCIpKXtcclxuXHRcdFx0XHRcdFx0JCgnaHRtbCcpLnRvZ2dsZUNsYXNzKFwiaGlkZGVuLW1lbnUtbW9iaWxlLWxvY2tcIik7XHJcblx0XHRcdFx0XHRcdCQucm9vdF8udG9nZ2xlQ2xhc3MoXCJoaWRkZW4tbWVudVwiKTtcclxuXHRcdFx0XHRcdFx0JC5yb290Xy5yZW1vdmVDbGFzcyhcIm1pbmlmaWVkXCIpO1xyXG5cdFx0XHQgICAgXHQvL30gZWxzZSBpZiAoICQucm9vdF8uaGFzQ2xhc3MoXCJtZW51LW9uLXRvcFwiKSAmJiAkLnJvb3RfLmhhc0NsYXNzKFwibW9iaWxlLXZpZXctYWN0aXZhdGVkXCIpICkge1xyXG5cdFx0XHQgICAgXHQvLyBzdWdnZXN0ZWQgZml4IGZyb20gQ2hyaXN0aWFuIErDpGdlclx0XHJcblx0XHRcdCAgICBcdH0gZWxzZSBpZiAoICQucm9vdF8uaGFzQ2xhc3MoXCJtZW51LW9uLXRvcFwiKSAmJiAkKHdpbmRvdykud2lkdGgoKSA8IDk3OSApIHtcdFxyXG5cdFx0XHQgICAgXHRcdCQoJ2h0bWwnKS50b2dnbGVDbGFzcyhcImhpZGRlbi1tZW51LW1vYmlsZS1sb2NrXCIpO1xyXG5cdFx0XHRcdFx0XHQkLnJvb3RfLnRvZ2dsZUNsYXNzKFwiaGlkZGVuLW1lbnVcIik7XHJcblx0XHRcdFx0XHRcdCQucm9vdF8ucmVtb3ZlQ2xhc3MoXCJtaW5pZmllZFwiKTtcclxuXHRcdFx0ICAgIFx0fVxyXG5cdFx0XHQgICAgfSwgICAgIFxyXG5cdFx0XHRcclxuXHRcdFx0ICAgIC8vIFRPR0dMRSBTSE9SVENVVCBcclxuXHRcdFx0ICAgIHRvZ2dsZVNob3J0Y3V0OiBmdW5jdGlvbigpe1xyXG5cdFx0XHQgICAgXHRcclxuXHRcdFx0XHRcdGlmIChzaG9ydGN1dF9kcm9wZG93bi5pcyhcIjp2aXNpYmxlXCIpKSB7XHJcblx0XHRcdFx0XHRcdHNob3J0Y3V0X2J1dHRvbnNfaGlkZSgpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0c2hvcnRjdXRfYnV0dG9uc19zaG93KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcclxuXHRcdFx0XHRcdC8vIFNIT1JUIENVVCAoYnV0dG9ucyB0aGF0IGFwcGVhciB3aGVuIGNsaWNrZWQgb24gdXNlciBuYW1lKVxyXG5cdFx0XHRcdFx0c2hvcnRjdXRfZHJvcGRvd24uZmluZCgnYScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24gPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuXHRcdFx0XHRcdFx0c2V0VGltZW91dChzaG9ydGN1dF9idXR0b25zX2hpZGUsIDMwMCk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcdC8vIFNIT1JUQ1VUIGJ1dHRvbnMgZ29lcyBhd2F5IGlmIG1vdXNlIGlzIGNsaWNrZWQgb3V0c2lkZSBvZiB0aGUgYXJlYVxyXG5cdFx0XHRcdFx0JChkb2N1bWVudCkubW91c2V1cChmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0XHRcdGlmICghc2hvcnRjdXRfZHJvcGRvd24uaXMoZS50YXJnZXQpICYmIHNob3J0Y3V0X2Ryb3Bkb3duLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0c2hvcnRjdXRfYnV0dG9uc19oaWRlKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQvLyBTSE9SVENVVCBBTklNQVRFIEhJREVcclxuXHRcdFx0XHRcdGZ1bmN0aW9uIHNob3J0Y3V0X2J1dHRvbnNfaGlkZSgpIHtcclxuXHRcdFx0XHRcdFx0c2hvcnRjdXRfZHJvcGRvd24uYW5pbWF0ZSh7XHJcblx0XHRcdFx0XHRcdFx0aGVpZ2h0IDogXCJoaWRlXCJcclxuXHRcdFx0XHRcdFx0fSwgMzAwLCBcImVhc2VPdXRDaXJjXCIpO1xyXG5cdFx0XHRcdFx0XHQkLnJvb3RfLnJlbW92ZUNsYXNzKCdzaG9ydGN1dC1vbicpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8gU0hPUlRDVVQgQU5JTUFURSBTSE9XXHJcblx0XHRcdFx0XHRmdW5jdGlvbiBzaG9ydGN1dF9idXR0b25zX3Nob3coKSB7XHJcblx0XHRcdFx0XHRcdHNob3J0Y3V0X2Ryb3Bkb3duLmFuaW1hdGUoe1xyXG5cdFx0XHRcdFx0XHRcdGhlaWdodCA6IFwic2hvd1wiXHJcblx0XHRcdFx0XHRcdH0sIDIwMCwgXCJlYXNlT3V0Q2lyY1wiKTtcclxuXHRcdFx0XHRcdFx0JC5yb290Xy5hZGRDbGFzcygnc2hvcnRjdXQtb24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdCAgICB9ICBcclxuXHRcdFx0ICAgXHJcblx0XHRcdH07XHJcblx0XHRcdFx0XHJcblx0XHRcdCQucm9vdF8ub24oJ2NsaWNrJywgJ1tkYXRhLWFjdGlvbj1cInVzZXJMb2dvdXRcIl0nLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHRcdFx0XHRzbWFydEFjdGlvbnMudXNlckxvZ291dCgkdGhpcyk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vY2xlYXIgbWVtb3J5IHJlZmVyZW5jZVxyXG5cdFx0XHRcdCR0aGlzID0gbnVsbDtcclxuXHRcdFx0XHRcclxuXHRcdFx0fSk7IFxyXG5cclxuXHRcdFx0LypcclxuXHRcdFx0ICogQlVUVE9OIEFDVElPTlMgXHJcblx0XHRcdCAqL1x0XHRcclxuXHRcdFx0JC5yb290Xy5vbignY2xpY2snLCAnW2RhdGEtYWN0aW9uPVwicmVzZXRXaWRnZXRzXCJdJywgZnVuY3Rpb24oZSkge1x0XHJcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHRcdFx0XHRzbWFydEFjdGlvbnMucmVzZXRXaWRnZXRzKCR0aGlzKTtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly9jbGVhciBtZW1vcnkgcmVmZXJlbmNlXHJcblx0XHRcdFx0JHRoaXMgPSBudWxsO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdCQucm9vdF8ub24oJ2NsaWNrJywgJ1tkYXRhLWFjdGlvbj1cImxhdW5jaEZ1bGxzY3JlZW5cIl0nLCBmdW5jdGlvbihlKSB7XHRcclxuXHRcdFx0XHRzbWFydEFjdGlvbnMubGF1bmNoRnVsbHNjcmVlbihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fSk7IFxyXG5cdFx0XHRcclxuXHRcdFx0JC5yb290Xy5vbignY2xpY2snLCAnW2RhdGEtYWN0aW9uPVwibWluaWZ5TWVudVwiXScsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG5cdFx0XHRcdHNtYXJ0QWN0aW9ucy5taW5pZnlNZW51KCR0aGlzKTtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly9jbGVhciBtZW1vcnkgcmVmZXJlbmNlXHJcblx0XHRcdFx0JHRoaXMgPSBudWxsO1xyXG5cdFx0XHR9KTsgXHJcblx0XHRcdFxyXG5cdFx0XHQkLnJvb3RfLm9uKCdjbGljaycsICdbZGF0YS1hY3Rpb249XCJ0b2dnbGVNZW51XCJdJywgZnVuY3Rpb24oZSkge1x0XHJcblx0XHRcdFx0c21hcnRBY3Rpb25zLnRvZ2dsZU1lbnUoKTtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH0pOyAgXHJcblx0XHRcclxuXHRcdFx0JC5yb290Xy5vbignY2xpY2snLCAnW2RhdGEtYWN0aW9uPVwidG9nZ2xlU2hvcnRjdXRcIl0nLCBmdW5jdGlvbihlKSB7XHRcclxuXHRcdFx0XHRzbWFydEFjdGlvbnMudG9nZ2xlU2hvcnRjdXQoKTtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH0pOyBcclxuXHRcdFx0XHRcdFxyXG5cdFx0fTtcclxuXHRcdC8qIH4gRU5EOiBTTUFSVCBBQ1RJT05TICovXHJcblx0XHRcclxuXHRcdC8qXHJcblx0XHQgKiBBQ1RJVkFURSBOQVZJR0FUSU9OXHJcblx0XHQgKiBEZXNjcmlwdGlvbjogQWN0aXZhdGlvbiB3aWxsIGZhaWwgaWYgdG9wIG5hdmlnYXRpb24gaXMgb25cclxuXHRcdCAqL1xyXG5cdFx0YXBwLmxlZnROYXYgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRcclxuXHRcdFx0Ly8gSU5JVElBTElaRSBMRUZUIE5BVlxyXG5cdFx0XHRpZiAoIXRvcG1lbnUpIHtcclxuXHRcdFx0XHRpZiAoIW51bGwpIHtcclxuXHRcdFx0XHRcdCQoJ25hdiB1bCcpLmphcnZpc21lbnUoe1xyXG5cdFx0XHRcdFx0XHRhY2NvcmRpb24gOiBtZW51X2FjY29yZGlvbiB8fCB0cnVlLFxyXG5cdFx0XHRcdFx0XHRzcGVlZCA6IG1lbnVfc3BlZWQgfHwgdHJ1ZSxcclxuXHRcdFx0XHRcdFx0Y2xvc2VkU2lnbiA6ICc8ZW0gY2xhc3M9XCJmYSBmYS1wbHVzLXNxdWFyZS1vXCI+PC9lbT4nLFxyXG5cdFx0XHRcdFx0XHRvcGVuZWRTaWduIDogJzxlbSBjbGFzcz1cImZhIGZhLW1pbnVzLXNxdWFyZS1vXCI+PC9lbT4nXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0YWxlcnQoXCJFcnJvciAtIG1lbnUgYW5jaG9yIGRvZXMgbm90IGV4aXN0XCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH07XHJcblx0XHQvKiB+IEVORDogQUNUSVZBVEUgTkFWSUdBVElPTiAqL1xyXG5cdFx0XHJcblx0XHQvKlxyXG5cdFx0ICogTUlTQ0VMQU5FT1VTIERPTSBSRUFEWSBGVU5DVElPTlNcclxuXHRcdCAqIERlc2NyaXB0aW9uOiBmaXJlIHdpdGggalF1ZXJ5KGRvY3VtZW50KS5yZWFkeS4uLlxyXG5cdFx0ICovXHJcblx0XHRhcHAuZG9tUmVhZHlNaXNjID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFxyXG5cdFx0XHQvKlxyXG5cdFx0XHQgKiBGSVJFIFRPT0xUSVBTXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRpZiAoJChcIltyZWw9dG9vbHRpcF1cIikubGVuZ3RoKSB7XHJcblx0XHRcdFx0JChcIltyZWw9dG9vbHRpcF1cIikudG9vbHRpcCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcclxuXHRcdFx0Ly8gU0hPVyAmIEhJREUgTU9CSUxFIFNFQVJDSCBGSUVMRFxyXG5cdFx0XHQkKCcjc2VhcmNoLW1vYmlsZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdCQucm9vdF8uYWRkQ2xhc3MoJ3NlYXJjaC1tb2JpbGUnKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcclxuXHRcdFx0JCgnI2NhbmNlbC1zZWFyY2gtanMnKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkLnJvb3RfLnJlbW92ZUNsYXNzKCdzZWFyY2gtbW9iaWxlJyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHJcblx0XHRcdC8vIEFDVElWSVRZXHJcblx0XHRcdC8vIGFqYXggZHJvcFxyXG5cdFx0XHQkKCcjYWN0aXZpdHknKS5jbGljayhmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHRcdFxyXG5cdFx0XHRcdGlmICgkdGhpcy5maW5kKCcuYmFkZ2UnKS5oYXNDbGFzcygnYmctY29sb3ItcmVkJykpIHtcclxuXHRcdFx0XHRcdCR0aGlzLmZpbmQoJy5iYWRnZScpLnJlbW92ZUNsYXNzUHJlZml4KCdiZy1jb2xvci0nKTtcclxuXHRcdFx0XHRcdCR0aGlzLmZpbmQoJy5iYWRnZScpLnRleHQoXCIwXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFxyXG5cdFx0XHRcdGlmICghJHRoaXMubmV4dCgnLmFqYXgtZHJvcGRvd24nKS5pcygnOnZpc2libGUnKSkge1xyXG5cdFx0XHRcdFx0JHRoaXMubmV4dCgnLmFqYXgtZHJvcGRvd24nKS5mYWRlSW4oMTUwKTtcclxuXHRcdFx0XHRcdCR0aGlzLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0JHRoaXMubmV4dCgnLmFqYXgtZHJvcGRvd24nKS5mYWRlT3V0KDE1MCk7XHJcblx0XHRcdFx0XHQkdGhpcy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHJcblx0XHRcdFx0dmFyIHRoZVVybFZhbCA9ICR0aGlzLm5leHQoJy5hamF4LWRyb3Bkb3duJykuZmluZCgnLmJ0bi1ncm91cCA+IC5hY3RpdmUgPiBpbnB1dCcpLmF0dHIoJ2lkJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly9jbGVhciBtZW1vcnkgcmVmZXJlbmNlXHJcblx0XHRcdFx0JHRoaXMgPSBudWxsO1xyXG5cdFx0XHRcdHRoZVVybFZhbCA9IG51bGw7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcclxuXHRcdFx0JCgnaW5wdXRbbmFtZT1cImFjdGl2aXR5XCJdJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblx0XHRcclxuXHRcdFx0XHR1cmwgPSAkdGhpcy5hdHRyKCdpZCcpO1xyXG5cdFx0XHRcdGNvbnRhaW5lciA9ICQoJy5hamF4LW5vdGlmaWNhdGlvbnMnKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsb2FkVVJMKHVybCwgY29udGFpbmVyKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQvL2NsZWFyIG1lbW9yeSByZWZlcmVuY2VcclxuXHRcdFx0XHQkdGhpcyA9IG51bGw7XHRcdFxyXG5cdFx0XHR9KTtcclxuXHRcdFxyXG5cdFx0XHQvLyBjbG9zZSBkcm9wZG93biBpZiBtb3VzZSBpcyBub3QgaW5zaWRlIHRoZSBhcmVhIG9mIC5hamF4LWRyb3Bkb3duXHJcblx0XHRcdCQoZG9jdW1lbnQpLm1vdXNldXAoZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRcdGlmICghJCgnLmFqYXgtZHJvcGRvd24nKS5pcyhlLnRhcmdldCkgJiYgJCgnLmFqYXgtZHJvcGRvd24nKS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdFx0JCgnLmFqYXgtZHJvcGRvd24nKS5mYWRlT3V0KDE1MCk7XHJcblx0XHRcdFx0XHQkKCcuYWpheC1kcm9wZG93bicpLnByZXYoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly8gbG9hZGluZyBhbmltYXRpb24gKGRlbW8gcHVycG9zZSBvbmx5KVxyXG5cdFx0XHQkKCdidXR0b25bZGF0YS1idG4tbG9hZGluZ10nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgYnRuID0gJCh0aGlzKTtcclxuXHRcdFx0XHRidG4uYnV0dG9uKCdsb2FkaW5nJyk7XHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGJ0bi5idXR0b24oJ3Jlc2V0Jyk7XHJcblx0XHRcdFx0fSwgMzAwMCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHJcblx0XHRcdC8vIE5PVElGSUNBVElPTiBJUyBQUkVTRU5UXHJcblx0XHRcdC8vIENoYW5nZSBjb2xvciBvZiBsYWJsZSBvbmNlIG5vdGlmaWNhdGlvbiBidXR0b24gaXMgY2xpY2tlZFxyXG5cclxuXHRcdFx0JHRoaXMgPSAkKCcjYWN0aXZpdHkgPiAuYmFkZ2UnKTtcclxuXHRcclxuXHRcdFx0aWYgKHBhcnNlSW50KCR0aGlzLnRleHQoKSkgPiAwKSB7XHJcblx0XHRcdFx0JHRoaXMuYWRkQ2xhc3MoXCJiZy1jb2xvci1yZWQgYm91bmNlSW4gYW5pbWF0ZWRcIik7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly9jbGVhciBtZW1vcnkgcmVmZXJlbmNlXHJcblx0XHRcdFx0JHRoaXMgPSBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvL1BhZ2VFeHBhbmRlciBcclxuXHRcdFx0LypmdW5jdGlvbiBQYWdlRXhwYW5kZXIoKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlRpY2tUaW1lciB+XCIpO1xyXG5cdFx0XHRcdHZhciBwYWdlSGVpZ2h0ID0gJChcIiNjb250ZW50XCIpLmhlaWdodCgpICsgJChcIiNoZWFkZXJcIikgKztcclxuXHRcdFx0fVxyXG5cdFxyXG5cdFx0XHQkKHdpbmRvdykuYmluZChcImxvYWQgcmVzaXplIHNjcm9sbFwiLCBmdW5jdGlvbiAoKSB7XHJcblx0XHQgICAgICAgIGlmICgkLnJvb3RfLmhhc0NsYXNzKFwiZGVza3RvcC1kZXRlY3RlZFwiKSl7XHJcblx0XHQgICAgICAgICAgICBQYWdlRXhwYW5kZXIoKTtcclxuXHRcdCAgICAgICAgfVxyXG5cdFx0ICAgIH0pOyovXHJcblxyXG5cdFx0XHRcclxuXHRcdH07XHJcblx0XHQvKiB+IEVORDogTUlTQ0VMQU5FT1VTIERPTSAqL1xyXG5cdFxyXG5cdFx0LypcclxuXHRcdCAqIE1JU0NFTEFORU9VUyBET00gUkVBRFkgRlVOQ1RJT05TXHJcblx0XHQgKiBEZXNjcmlwdGlvbjogZmlyZSB3aXRoIGpRdWVyeShkb2N1bWVudCkucmVhZHkuLi5cclxuXHRcdCAqL1xyXG5cdFx0YXBwLm1vYmlsZUNoZWNrQWN0aXZhdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAoJCh3aW5kb3cpLndpZHRoKCkgPCA5NzkpIHtcclxuXHRcdFx0XHQkLnJvb3RfLmFkZENsYXNzKCdtb2JpbGUtdmlldy1hY3RpdmF0ZWQnKTtcclxuXHRcdFx0XHQkLnJvb3RfLnJlbW92ZUNsYXNzKCdtaW5pZmllZCcpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKCQucm9vdF8uaGFzQ2xhc3MoJ21vYmlsZS12aWV3LWFjdGl2YXRlZCcpKSB7XHJcblx0XHRcdFx0JC5yb290Xy5yZW1vdmVDbGFzcygnbW9iaWxlLXZpZXctYWN0aXZhdGVkJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChkZWJ1Z1N0YXRlKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIm1vYmlsZUNoZWNrQWN0aXZhdGlvblwiKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH0gXHJcblx0XHQvKiB+IEVORDogTUlTQ0VMQU5FT1VTIERPTSAqL1xyXG5cclxuXHRcdHJldHVybiBhcHA7XHJcblx0XHRcclxuXHR9KSh7fSk7XHJcblxyXG5cdGluaXRBcHAuYWRkRGV2aWNlVHlwZSgpO1xyXG5cdGluaXRBcHAubWVudVBvcygpO1xyXG4vKlxyXG4gKiBET0NVTUVOVCBMT0FERUQgRVZFTlRcclxuICogRGVzY3JpcHRpb246IEZpcmUgd2hlbiBET00gaXMgcmVhZHlcclxuICovXHJcblx0alF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHRcdFxyXG5cdFx0aW5pdEFwcC5TbWFydEFjdGlvbnMoKTtcclxuXHRcdGluaXRBcHAubGVmdE5hdigpO1xyXG5cdFx0aW5pdEFwcC5kb21SZWFkeU1pc2MoKTtcclxuXHRcdGluaXRBcHAubW9iaWxlQ2hlY2tBY3RpdmF0aW9uKCk7XHJcblx0fSk7XHJcbi8qXHJcbiAqIFJFU0laRVIgV0lUSCBUSFJPVFRMRVxyXG4gKiBTb3VyY2U6IGh0dHA6Ly9iZW5hbG1hbi5jb20vY29kZS9wcm9qZWN0cy9qcXVlcnktcmVzaXplL2V4YW1wbGVzL3Jlc2l6ZS9cclxuICovXHJcblx0KGZ1bmN0aW9uICgkLCB3aW5kb3csIHVuZGVmaW5lZCkge1xyXG5cdFxyXG5cdCAgICB2YXIgZWxlbXMgPSAkKFtdKSxcclxuXHQgICAgICAgIGpxX3Jlc2l6ZSA9ICQucmVzaXplID0gJC5leHRlbmQoJC5yZXNpemUsIHt9KSxcclxuXHQgICAgICAgIHRpbWVvdXRfaWQsIHN0cl9zZXRUaW1lb3V0ID0gJ3NldFRpbWVvdXQnLFxyXG5cdCAgICAgICAgc3RyX3Jlc2l6ZSA9ICdyZXNpemUnLFxyXG5cdCAgICAgICAgc3RyX2RhdGEgPSBzdHJfcmVzaXplICsgJy1zcGVjaWFsLWV2ZW50JyxcclxuXHQgICAgICAgIHN0cl9kZWxheSA9ICdkZWxheScsXHJcblx0ICAgICAgICBzdHJfdGhyb3R0bGUgPSAndGhyb3R0bGVXaW5kb3cnO1xyXG5cdFxyXG5cdCAgICBqcV9yZXNpemVbc3RyX2RlbGF5XSA9IHRocm90dGxlX2RlbGF5O1xyXG5cdFxyXG5cdCAgICBqcV9yZXNpemVbc3RyX3Rocm90dGxlXSA9IHRydWU7XHJcblx0XHJcblx0ICAgICQuZXZlbnQuc3BlY2lhbFtzdHJfcmVzaXplXSA9IHtcclxuXHRcclxuXHQgICAgICAgIHNldHVwOiBmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgICAgICAgaWYgKCFqcV9yZXNpemVbc3RyX3Rocm90dGxlXSAmJiB0aGlzW3N0cl9zZXRUaW1lb3V0XSkge1xyXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdFxyXG5cdCAgICAgICAgICAgIHZhciBlbGVtID0gJCh0aGlzKTtcclxuXHQgICAgICAgICAgICBlbGVtcyA9IGVsZW1zLmFkZChlbGVtKTtcclxuXHQgICAgICAgICAgICB0cnkge1xyXG5cdCAgICAgICAgICAgICAgICAkLmRhdGEodGhpcywgc3RyX2RhdGEsIHtcclxuXHQgICAgICAgICAgICAgICAgICAgIHc6IGVsZW0ud2lkdGgoKSxcclxuXHQgICAgICAgICAgICAgICAgICAgIGg6IGVsZW0uaGVpZ2h0KClcclxuXHQgICAgICAgICAgICAgICAgfSk7XHJcblx0ICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG5cdCAgICAgICAgICAgICAgICAkLmRhdGEodGhpcywgc3RyX2RhdGEsIHtcclxuXHQgICAgICAgICAgICAgICAgICAgIHc6IGVsZW0ud2lkdGgsIC8vIGVsZW0ud2lkdGgoKTtcclxuXHQgICAgICAgICAgICAgICAgICAgIGg6IGVsZW0uaGVpZ2h0IC8vIGVsZW0uaGVpZ2h0KCk7XHJcblx0ICAgICAgICAgICAgICAgIH0pO1xyXG5cdCAgICAgICAgICAgIH1cclxuXHRcclxuXHQgICAgICAgICAgICBpZiAoZWxlbXMubGVuZ3RoID09PSAxKSB7XHJcblx0ICAgICAgICAgICAgICAgIGxvb3B5KCk7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgfSxcclxuXHQgICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbiAoKSB7XHJcblx0ICAgICAgICAgICAgaWYgKCFqcV9yZXNpemVbc3RyX3Rocm90dGxlXSAmJiB0aGlzW3N0cl9zZXRUaW1lb3V0XSkge1xyXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdFxyXG5cdCAgICAgICAgICAgIHZhciBlbGVtID0gJCh0aGlzKTtcclxuXHQgICAgICAgICAgICBlbGVtcyA9IGVsZW1zLm5vdChlbGVtKTtcclxuXHQgICAgICAgICAgICBlbGVtLnJlbW92ZURhdGEoc3RyX2RhdGEpO1xyXG5cdCAgICAgICAgICAgIGlmICghZWxlbXMubGVuZ3RoKSB7XHJcblx0ICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0X2lkKTtcclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICB9LFxyXG5cdFxyXG5cdCAgICAgICAgYWRkOiBmdW5jdGlvbiAoaGFuZGxlT2JqKSB7XHJcblx0ICAgICAgICAgICAgaWYgKCFqcV9yZXNpemVbc3RyX3Rocm90dGxlXSAmJiB0aGlzW3N0cl9zZXRUaW1lb3V0XSkge1xyXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblx0ICAgICAgICAgICAgfVxyXG5cdCAgICAgICAgICAgIHZhciBvbGRfaGFuZGxlcjtcclxuXHRcclxuXHQgICAgICAgICAgICBmdW5jdGlvbiBuZXdfaGFuZGxlcihlLCB3LCBoKSB7XHJcblx0ICAgICAgICAgICAgICAgIHZhciBlbGVtID0gJCh0aGlzKSxcclxuXHQgICAgICAgICAgICAgICAgICAgIGRhdGEgPSAkLmRhdGEodGhpcywgc3RyX2RhdGEpO1xyXG5cdCAgICAgICAgICAgICAgICBkYXRhLncgPSB3ICE9PSB1bmRlZmluZWQgPyB3IDogZWxlbS53aWR0aCgpO1xyXG5cdCAgICAgICAgICAgICAgICBkYXRhLmggPSBoICE9PSB1bmRlZmluZWQgPyBoIDogZWxlbS5oZWlnaHQoKTtcclxuXHRcclxuXHQgICAgICAgICAgICAgICAgb2xkX2hhbmRsZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbihoYW5kbGVPYmopKSB7XHJcblx0ICAgICAgICAgICAgICAgIG9sZF9oYW5kbGVyID0gaGFuZGxlT2JqO1xyXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gbmV3X2hhbmRsZXI7XHJcblx0ICAgICAgICAgICAgfSBlbHNlIHtcclxuXHQgICAgICAgICAgICAgICAgb2xkX2hhbmRsZXIgPSBoYW5kbGVPYmouaGFuZGxlcjtcclxuXHQgICAgICAgICAgICAgICAgaGFuZGxlT2JqLmhhbmRsZXIgPSBuZXdfaGFuZGxlcjtcclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICB9XHJcblx0ICAgIH07XHJcblx0XHJcblx0ICAgIGZ1bmN0aW9uIGxvb3B5KCkge1xyXG5cdCAgICAgICAgdGltZW91dF9pZCA9IHdpbmRvd1tzdHJfc2V0VGltZW91dF0oZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgICAgICAgIGVsZW1zLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdCAgICAgICAgICAgICAgICB2YXIgd2lkdGg7XHJcblx0ICAgICAgICAgICAgICAgIHZhciBoZWlnaHQ7XHJcblx0XHJcblx0ICAgICAgICAgICAgICAgIHZhciBlbGVtID0gJCh0aGlzKSxcclxuXHQgICAgICAgICAgICAgICAgICAgIGRhdGEgPSAkLmRhdGEodGhpcywgc3RyX2RhdGEpOyAvL3dpZHRoID0gZWxlbS53aWR0aCgpLCBoZWlnaHQgPSBlbGVtLmhlaWdodCgpO1xyXG5cdFxyXG5cdCAgICAgICAgICAgICAgICAvLyBIaWdoY2hhcnRzIGZpeFxyXG5cdCAgICAgICAgICAgICAgICB0cnkge1xyXG5cdCAgICAgICAgICAgICAgICAgICAgd2lkdGggPSBlbGVtLndpZHRoKCk7XHJcblx0ICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuXHQgICAgICAgICAgICAgICAgICAgIHdpZHRoID0gZWxlbS53aWR0aDtcclxuXHQgICAgICAgICAgICAgICAgfVxyXG5cdFxyXG5cdCAgICAgICAgICAgICAgICB0cnkge1xyXG5cdCAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gZWxlbS5oZWlnaHQoKTtcclxuXHQgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG5cdCAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gZWxlbS5oZWlnaHQ7XHJcblx0ICAgICAgICAgICAgICAgIH1cclxuXHQgICAgICAgICAgICAgICAgLy9maXhlZCBidWdcclxuXHRcclxuXHRcclxuXHQgICAgICAgICAgICAgICAgaWYgKHdpZHRoICE9PSBkYXRhLncgfHwgaGVpZ2h0ICE9PSBkYXRhLmgpIHtcclxuXHQgICAgICAgICAgICAgICAgICAgIGVsZW0udHJpZ2dlcihzdHJfcmVzaXplLCBbZGF0YS53ID0gd2lkdGgsIGRhdGEuaCA9IGhlaWdodF0pO1xyXG5cdCAgICAgICAgICAgICAgICB9XHJcblx0XHJcblx0ICAgICAgICAgICAgfSk7XHJcblx0ICAgICAgICAgICAgbG9vcHkoKTtcclxuXHRcclxuXHQgICAgICAgIH0sIGpxX3Jlc2l6ZVtzdHJfZGVsYXldKTtcclxuXHRcclxuXHQgICAgfVxyXG5cdFxyXG5cdH0pKGpRdWVyeSwgdGhpcyk7XHJcbi8qXHJcbiogQUREIENMQVNTIFdIRU4gQkVMT1cgQ0VSVEFJTiBXSURUSCAoTU9CSUxFIE1FTlUpXHJcbiogRGVzY3JpcHRpb246IHRyYWNrcyB0aGUgcGFnZSBtaW4td2lkdGggb2YgI0NPTlRFTlQgYW5kIE5BViB3aGVuIG5hdmlnYXRpb24gaXMgcmVzaXplZC5cclxuKiBUaGlzIGlzIHRvIGNvdW50ZXIgYnVncyBmb3IgbWluaW11bSBwYWdlIHdpZHRoIG9uIG1hbnkgZGVza3RvcCBhbmQgbW9iaWxlIGRldmljZXMuXHJcbiogTm90ZTogVGhpcyBzY3JpcHQgdXRpbGl6ZXMgSlN0aHJvdHRsZSBzY3JpcHQgc28gZG9uJ3Qgd29ycnkgYWJvdXQgbWVtb3J5L0NQVSB1c2FnZVxyXG4qL1xyXG5cdCQoJyNtYWluJykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHJcblx0XHRpbml0QXBwLm1vYmlsZUNoZWNrQWN0aXZhdGlvbigpO1xyXG5cdFx0XHJcblx0fSk7XHJcblxyXG4vKiB+IEVORDogTkFWIE9SICNMRUZULUJBUiBSRVNJWkUgREVURUNUICovXHJcblxyXG4vKlxyXG4gKiBERVRFQ1QgSUUgVkVSU0lPTlxyXG4gKiBEZXNjcmlwdGlvbjogQSBzaG9ydCBzbmlwcGV0IGZvciBkZXRlY3RpbmcgdmVyc2lvbnMgb2YgSUUgaW4gSmF2YVNjcmlwdFxyXG4gKiB3aXRob3V0IHJlc29ydGluZyB0byB1c2VyLWFnZW50IHNuaWZmaW5nXHJcbiAqIFJFVFVSTlM6XHJcbiAqIElmIHlvdSdyZSBub3QgaW4gSUUgKG9yIElFIHZlcnNpb24gaXMgbGVzcyB0aGFuIDUpIHRoZW46XHJcbiAqIC8vaWUgPT09IHVuZGVmaW5lZFxyXG4gKlxyXG4gKiBJZiB5b3UncmUgaW4gSUUgKD49NSkgdGhlbiB5b3UgY2FuIGRldGVybWluZSB3aGljaCB2ZXJzaW9uOlxyXG4gKiAvLyBpZSA9PT0gNzsgLy8gSUU3XHJcbiAqXHJcbiAqIFRodXMsIHRvIGRldGVjdCBJRTpcclxuICogLy8gaWYgKGllKSB7fVxyXG4gKlxyXG4gKiBBbmQgdG8gZGV0ZWN0IHRoZSB2ZXJzaW9uOlxyXG4gKiBpZSA9PT0gNiAvLyBJRTZcclxuICogaWUgPiA3IC8vIElFOCwgSUU5IC4uLlxyXG4gKiBpZSA8IDkgLy8gQW55dGhpbmcgbGVzcyB0aGFuIElFOVxyXG4gKi9cclxuLy8gVE9ETzogZGVsZXRlIHRoaXMgZnVuY3Rpb24gbGF0ZXIgLSBubyBsb25nZXIgbmVlZGVkICg/KVxyXG5cdHZhciBpZSA9ICggZnVuY3Rpb24oKSB7XHJcblx0XHJcblx0XHR2YXIgdW5kZWYsIHYgPSAzLCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSwgYWxsID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpJyk7XHJcblx0XHJcblx0XHR3aGlsZSAoZGl2LmlubmVySFRNTCA9ICc8IS0tW2lmIGd0IElFICcgKyAoKyt2KSArICddPjxpPjwvaT48IVtlbmRpZl0tLT4nLCBhbGxbMF0pO1xyXG5cdFxyXG5cdFx0cmV0dXJuIHYgPiA0ID8gdiA6IHVuZGVmO1xyXG5cdFxyXG5cdH0oKSk7IFxyXG4vKiB+IEVORDogREVURUNUIElFIFZFUlNJT04gKi9cclxuXHJcbi8qXHJcbiAqIENVU1RPTSBNRU5VIFBMVUdJTlxyXG4gKi9cclxuXHQkLmZuLmV4dGVuZCh7XHJcblx0XHJcblx0XHQvL3Bhc3MgdGhlIG9wdGlvbnMgdmFyaWFibGUgdG8gdGhlIGZ1bmN0aW9uXHJcblx0XHRqYXJ2aXNtZW51IDogZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdFxyXG5cdFx0XHR2YXIgZGVmYXVsdHMgPSB7XHJcblx0XHRcdFx0YWNjb3JkaW9uIDogJ3RydWUnLFxyXG5cdFx0XHRcdHNwZWVkIDogMjAwLFxyXG5cdFx0XHRcdGNsb3NlZFNpZ24gOiAnWytdJyxcclxuXHRcdFx0XHRvcGVuZWRTaWduIDogJ1stXSdcclxuXHRcdFx0fSxcclxuXHRcclxuXHRcdFx0Ly8gRXh0ZW5kIG91ciBkZWZhdWx0IG9wdGlvbnMgd2l0aCB0aG9zZSBwcm92aWRlZC5cclxuXHRcdFx0XHRvcHRzID0gJC5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpLFxyXG5cdFx0XHQvL0Fzc2lnbiBjdXJyZW50IGVsZW1lbnQgdG8gdmFyaWFibGUsIGluIHRoaXMgY2FzZSBpcyBVTCBlbGVtZW50XHJcblx0XHRcdFx0JHRoaXMgPSAkKHRoaXMpO1xyXG5cdFxyXG5cdFx0XHQvL2FkZCBhIG1hcmsgWytdIHRvIGEgbXVsdGlsZXZlbCBtZW51XHJcblx0XHRcdCR0aGlzLmZpbmQoXCJsaVwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmICgkKHRoaXMpLmZpbmQoXCJ1bFwiKS5zaXplKCkgIT09IDApIHtcclxuXHRcdFx0XHRcdC8vYWRkIHRoZSBtdWx0aWxldmVsIHNpZ24gbmV4dCB0byB0aGUgbGlua1xyXG5cdFx0XHRcdFx0JCh0aGlzKS5maW5kKFwiYTpmaXJzdFwiKS5hcHBlbmQoXCI8YiBjbGFzcz0nY29sbGFwc2Utc2lnbic+XCIgKyBvcHRzLmNsb3NlZFNpZ24gKyBcIjwvYj5cIik7XHJcblx0XHJcblx0XHRcdFx0XHQvL2F2b2lkIGp1bXBpbmcgdG8gdGhlIHRvcCBvZiB0aGUgcGFnZSB3aGVuIHRoZSBocmVmIGlzIGFuICNcclxuXHRcdFx0XHRcdGlmICgkKHRoaXMpLmZpbmQoXCJhOmZpcnN0XCIpLmF0dHIoJ2hyZWYnKSA9PSBcIiNcIikge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoXCJhOmZpcnN0XCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcclxuXHRcdFx0Ly9vcGVuIGFjdGl2ZSBsZXZlbFxyXG5cdFx0XHQkdGhpcy5maW5kKFwibGkuYWN0aXZlXCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0JCh0aGlzKS5wYXJlbnRzKFwidWxcIikuc2xpZGVEb3duKG9wdHMuc3BlZWQpO1xyXG5cdFx0XHRcdCQodGhpcykucGFyZW50cyhcInVsXCIpLnBhcmVudChcImxpXCIpLmZpbmQoXCJiOmZpcnN0XCIpLmh0bWwob3B0cy5vcGVuZWRTaWduKTtcclxuXHRcdFx0XHQkKHRoaXMpLnBhcmVudHMoXCJ1bFwiKS5wYXJlbnQoXCJsaVwiKS5hZGRDbGFzcyhcIm9wZW5cIik7XHJcblx0XHRcdH0pO1xyXG5cdFxyXG5cdFx0XHQkdGhpcy5maW5kKFwibGkgYVwiKS5jbGljayhmdW5jdGlvbigpIHtcclxuXHRcclxuXHRcdFx0XHRpZiAoJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwidWxcIikuc2l6ZSgpICE9PSAwKSB7XHJcblx0XHJcblx0XHRcdFx0XHRpZiAob3B0cy5hY2NvcmRpb24pIHtcclxuXHRcdFx0XHRcdFx0Ly9EbyBub3RoaW5nIHdoZW4gdGhlIGxpc3QgaXMgb3BlblxyXG5cdFx0XHRcdFx0XHRpZiAoISQodGhpcykucGFyZW50KCkuZmluZChcInVsXCIpLmlzKCc6dmlzaWJsZScpKSB7XHJcblx0XHRcdFx0XHRcdFx0cGFyZW50cyA9ICQodGhpcykucGFyZW50KCkucGFyZW50cyhcInVsXCIpO1xyXG5cdFx0XHRcdFx0XHRcdHZpc2libGUgPSAkdGhpcy5maW5kKFwidWw6dmlzaWJsZVwiKTtcclxuXHRcdFx0XHRcdFx0XHR2aXNpYmxlLmVhY2goZnVuY3Rpb24odmlzaWJsZUluZGV4KSB7XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgY2xvc2UgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50cy5lYWNoKGZ1bmN0aW9uKHBhcmVudEluZGV4KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChwYXJlbnRzW3BhcmVudEluZGV4XSA9PSB2aXNpYmxlW3Zpc2libGVJbmRleF0pIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjbG9zZSA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2xvc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCQodGhpcykucGFyZW50KCkuZmluZChcInVsXCIpICE9IHZpc2libGVbdmlzaWJsZUluZGV4XSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQodmlzaWJsZVt2aXNpYmxlSW5kZXhdKS5zbGlkZVVwKG9wdHMuc3BlZWQsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoXCJsaVwiKS5maW5kKFwiYjpmaXJzdFwiKS5odG1sKG9wdHMuY2xvc2VkU2lnbik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudChcImxpXCIpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9Ly8gZW5kIGlmXHJcblx0XHRcdFx0XHRpZiAoJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwidWw6Zmlyc3RcIikuaXMoXCI6dmlzaWJsZVwiKSAmJiAhJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwidWw6Zmlyc3RcIikuaGFzQ2xhc3MoXCJhY3RpdmVcIikpIHtcclxuXHRcdFx0XHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5maW5kKFwidWw6Zmlyc3RcIikuc2xpZGVVcChvcHRzLnNwZWVkLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudChcImxpXCIpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcclxuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudChcImxpXCIpLmZpbmQoXCJiOmZpcnN0XCIpLmRlbGF5KG9wdHMuc3BlZWQpLmh0bWwob3B0cy5jbG9zZWRTaWduKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCJ1bDpmaXJzdFwiKS5zbGlkZURvd24ob3B0cy5zcGVlZCwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdFx0LyokKHRoaXMpLmVmZmVjdChcImhpZ2hsaWdodFwiLCB7Y29sb3IgOiAnIzYxNjE2MSd9LCA1MDApOyAtIGRpc2FibGVkIGR1ZSB0byBDUFUgY2xvY2tpbmcgb24gcGhvbmVzKi9cclxuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudChcImxpXCIpLmFkZENsYXNzKFwib3BlblwiKTtcclxuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudChcImxpXCIpLmZpbmQoXCJiOmZpcnN0XCIpLmRlbGF5KG9wdHMuc3BlZWQpLmh0bWwob3B0cy5vcGVuZWRTaWduKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9IC8vIGVuZCBlbHNlXHJcblx0XHRcdFx0fSAvLyBlbmQgaWZcclxuXHRcdFx0fSk7XHJcblx0XHR9IC8vIGVuZCBmdW5jdGlvblxyXG5cdH0pO1xyXG4vKiB+IEVORDogQ1VTVE9NIE1FTlUgUExVR0lOICovXHJcblxyXG4vKlxyXG4gKiBFTEVNRU5UIEVYSVNUIE9SIE5PVFxyXG4gKiBEZXNjcmlwdGlvbjogcmV0dXJucyB0cnVlIG9yIGZhbHNlXHJcbiAqIFVzYWdlOiAkKCcjbXlEaXYnKS5kb2VzRXhpc3QoKTtcclxuICovXHJcblx0alF1ZXJ5LmZuLmRvZXNFeGlzdCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIGpRdWVyeSh0aGlzKS5sZW5ndGggPiAwO1xyXG5cdH07XHJcbi8qIH4gRU5EOiBFTEVNRU5UIEVYSVNUIE9SIE5PVCAqL1xyXG5cclxuLypcclxuICogSU5JVElBTElaRSBGT1JNU1xyXG4gKiBEZXNjcmlwdGlvbjogU2VsZWN0MiwgTWFza2luZywgRGF0ZXBpY2tlciwgQXV0b2NvbXBsZXRlXHJcbiAqL1x0XHJcblx0ZnVuY3Rpb24gcnVuQWxsRm9ybXMoKSB7XHJcblx0XHJcblx0XHQvKlxyXG5cdFx0ICogQk9PVFNUUkFQIFNMSURFUiBQTFVHSU5cclxuXHRcdCAqIFVzYWdlOlxyXG5cdFx0ICogRGVwZW5kZW5jeToganMvcGx1Z2luL2Jvb3RzdHJhcC1zbGlkZXJcclxuXHRcdCAqL1xyXG5cdFx0aWYgKCQuZm4uc2xpZGVyKSB7XHJcblx0XHRcdCQoJy5zbGlkZXInKS5zbGlkZXIoKTtcclxuXHRcdH1cclxuXHRcclxuXHRcdC8qXHJcblx0XHQgKiBTRUxFQ1QyIFBMVUdJTlxyXG5cdFx0ICogVXNhZ2U6XHJcblx0XHQgKiBEZXBlbmRlbmN5OiBqcy9wbHVnaW4vc2VsZWN0Mi9cclxuXHRcdCAqL1xyXG5cdFx0aWYgKCQuZm4uc2VsZWN0Mikge1xyXG5cdFx0XHQkKCdzZWxlY3Quc2VsZWN0MicpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHRcdHdpZHRoID0gJHRoaXMuYXR0cignZGF0YS1zZWxlY3Qtd2lkdGgnKSB8fCAnMTAwJSc7XHJcblx0XHRcdFx0Ly8sIF9zaG93U2VhcmNoSW5wdXQgPSAkdGhpcy5hdHRyKCdkYXRhLXNlbGVjdC1zZWFyY2gnKSA9PT0gJ3RydWUnO1xyXG5cdFx0XHRcdCR0aGlzLnNlbGVjdDIoe1xyXG5cdFx0XHRcdFx0Ly9zaG93U2VhcmNoSW5wdXQgOiBfc2hvd1NlYXJjaElucHV0LFxyXG5cdFx0XHRcdFx0YWxsb3dDbGVhciA6IHRydWUsXHJcblx0XHRcdFx0XHR3aWR0aCA6IHdpZHRoXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdC8vY2xlYXIgbWVtb3J5IHJlZmVyZW5jZVxyXG5cdFx0XHRcdCR0aGlzID0gbnVsbDtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHJcblx0XHQvKlxyXG5cdFx0ICogTUFTS0lOR1xyXG5cdFx0ICogRGVwZW5kZW5jeToganMvcGx1Z2luL21hc2tlZC1pbnB1dC9cclxuXHRcdCAqL1xyXG5cdFx0aWYgKCQuZm4ubWFzaykge1xyXG5cdFx0XHQkKCdbZGF0YS1tYXNrXScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHJcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHRcdG1hc2sgPSAkdGhpcy5hdHRyKCdkYXRhLW1hc2snKSB8fCAnZXJyb3IuLi4nLCBtYXNrX3BsYWNlaG9sZGVyID0gJHRoaXMuYXR0cignZGF0YS1tYXNrLXBsYWNlaG9sZGVyJykgfHwgJ1gnO1xyXG5cdFxyXG5cdFx0XHRcdCR0aGlzLm1hc2sobWFzaywge1xyXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXIgOiBtYXNrX3BsYWNlaG9sZGVyXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly9jbGVhciBtZW1vcnkgcmVmZXJlbmNlXHJcblx0XHRcdFx0JHRoaXMgPSBudWxsO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcclxuXHRcdC8qXHJcblx0XHQgKiBBVVRPQ09NUExFVEVcclxuXHRcdCAqIERlcGVuZGVuY3k6IGpzL2pxdWlcclxuXHRcdCAqL1xyXG5cdFx0aWYgKCQuZm4uYXV0b2NvbXBsZXRlKSB7XHJcblx0XHRcdCQoJ1tkYXRhLWF1dG9jb21wbGV0ZV0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFxyXG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXHJcblx0XHRcdFx0XHRhdmFpbGFibGVUYWdzID0gJHRoaXMuZGF0YSgnYXV0b2NvbXBsZXRlJykgfHwgW1wiVGhlXCIsIFwiUXVpY2tcIiwgXCJCcm93blwiLCBcIkZveFwiLCBcIkp1bXBzXCIsIFwiT3ZlclwiLCBcIlRocmVlXCIsIFwiTGF6eVwiLCBcIkRvZ3NcIl07XHJcblx0XHJcblx0XHRcdFx0JHRoaXMuYXV0b2NvbXBsZXRlKHtcclxuXHRcdFx0XHRcdHNvdXJjZSA6IGF2YWlsYWJsZVRhZ3NcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQvL2NsZWFyIG1lbW9yeSByZWZlcmVuY2VcclxuXHRcdFx0XHQkdGhpcyA9IG51bGw7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFxyXG5cdFx0LypcclxuXHRcdCAqIEpRVUVSWSBVSSBEQVRFXHJcblx0XHQgKiBEZXBlbmRlbmN5OiBqcy9saWJzL2pxdWVyeS11aS0xLjEwLjMubWluLmpzXHJcblx0XHQgKiBVc2FnZTogPGlucHV0IGNsYXNzPVwiZGF0ZXBpY2tlclwiIC8+XHJcblx0XHQgKi9cclxuXHRcdGlmICgkLmZuLmRhdGVwaWNrZXIpIHtcclxuXHRcdFx0JCgnLmRhdGVwaWNrZXInKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFxyXG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXHJcblx0XHRcdFx0XHRkYXRhRGF0ZUZvcm1hdCA9ICR0aGlzLmF0dHIoJ2RhdGEtZGF0ZWZvcm1hdCcpIHx8ICdkZC5tbS55eSc7XHJcblx0XHJcblx0XHRcdFx0JHRoaXMuZGF0ZXBpY2tlcih7XHJcblx0XHRcdFx0XHRkYXRlRm9ybWF0IDogZGF0YURhdGVGb3JtYXQsXHJcblx0XHRcdFx0XHRwcmV2VGV4dCA6ICc8aSBjbGFzcz1cImZhIGZhLWNoZXZyb24tbGVmdFwiPjwvaT4nLFxyXG5cdFx0XHRcdFx0bmV4dFRleHQgOiAnPGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9pPicsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly9jbGVhciBtZW1vcnkgcmVmZXJlbmNlXHJcblx0XHRcdFx0JHRoaXMgPSBudWxsO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcclxuXHRcdC8qXHJcblx0XHQgKiBBSkFYIEJVVFRPTiBMT0FESU5HIFRFWFRcclxuXHRcdCAqIFVzYWdlOiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLWxvYWRpbmctdGV4dD1cIkxvYWRpbmcuLi5cIiBjbGFzcz1cImJ0biBidG4teHMgYnRuLWRlZmF1bHQgYWpheC1yZWZyZXNoXCI+IC4uIDwvYnV0dG9uPlxyXG5cdFx0ICovXHJcblx0XHQkKCdidXR0b25bZGF0YS1sb2FkaW5nLXRleHRdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdHZhciBidG4gPSAkKHRoaXMpO1xyXG5cdFx0XHRidG4uYnV0dG9uKCdsb2FkaW5nJyk7XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0YnRuLmJ1dHRvbigncmVzZXQnKTtcclxuXHRcdFx0XHQvL2NsZWFyIG1lbW9yeSByZWZlcmVuY2VcclxuXHRcdFx0XHRidG4gPSBudWxsO1xyXG5cdFx0XHR9LCAzMDAwKTtcclxuXHJcblx0XHR9KTtcclxuXHRcclxuXHR9XHJcbi8qIH4gRU5EOiBJTklUSUFMSVpFIEZPUk1TICovXHJcblxyXG4vKlxyXG4gKiBJTklUSUFMSVpFIENIQVJUU1xyXG4gKiBEZXNjcmlwdGlvbjogU3BhcmtsaW5lcywgUGllQ2hhcnRzXHJcbiAqL1xyXG5cdGZ1bmN0aW9uIHJ1bkFsbENoYXJ0cygpIHtcclxuXHRcdC8qXHJcblx0XHQgKiBTUEFSS0xJTkVTXHJcblx0XHQgKiBERVBFTkRFTkNZOiBqcy9wbHVnaW5zL3NwYXJrbGluZS9qcXVlcnkuc3BhcmtsaW5lLm1pbi5qc1xyXG5cdFx0ICogU2VlIHVzYWdlIGV4YW1wbGUgYmVsb3cuLi5cclxuXHRcdCAqL1xyXG5cdFxyXG5cdFx0LyogVXNhZ2U6XHJcblx0XHQgKiBcdFx0PGRpdiBjbGFzcz1cInNwYXJrbGluZS1saW5lIHR4dC1jb2xvci1ibHVlXCIgZGF0YS1maWxsLWNvbG9yPVwidHJhbnNwYXJlbnRcIiBkYXRhLXNwYXJrbGluZS1oZWlnaHQ9XCIyNnB4XCI+XHJcblx0XHQgKlx0XHRcdDUsNiw3LDksOSw1LDksNiw1LDYsNiw3LDcsNiw3LDgsOSw3XHJcblx0XHQgKlx0XHQ8L2Rpdj5cclxuXHRcdCAqL1xyXG5cdFxyXG5cdFx0aWYgKCQuZm4uc3BhcmtsaW5lKSB7XHJcblx0XHJcblx0XHRcdC8vIHZhcmlhYmxlIGRlY2xlYXJhdGlvbnM6XHJcblx0XHJcblx0XHRcdHZhciBiYXJDb2xvcixcclxuXHRcdFx0ICAgIHNwYXJrbGluZUhlaWdodCxcclxuXHRcdFx0ICAgIHNwYXJrbGluZUJhcldpZHRoLFxyXG5cdFx0XHQgICAgc3BhcmtsaW5lQmFyU3BhY2luZyxcclxuXHRcdFx0ICAgIHNwYXJrbGluZU5lZ0JhckNvbG9yLFxyXG5cdFx0XHQgICAgc3BhcmtsaW5lU3RhY2tlZENvbG9yLFxyXG5cdFx0XHQgICAgdGhpc0xpbmVDb2xvcixcclxuXHRcdFx0ICAgIHRoaXNMaW5lV2lkdGgsXHJcblx0XHRcdCAgICB0aGlzRmlsbCxcclxuXHRcdFx0ICAgIHRoaXNTcG90Q29sb3IsXHJcblx0XHRcdCAgICB0aGlzTWluU3BvdENvbG9yLFxyXG5cdFx0XHQgICAgdGhpc01heFNwb3RDb2xvcixcclxuXHRcdFx0ICAgIHRoaXNoaWdobGlnaHRTcG90Q29sb3IsXHJcblx0XHRcdCAgICB0aGlzSGlnaGxpZ2h0TGluZUNvbG9yLFxyXG5cdFx0XHQgICAgdGhpc1Nwb3RSYWRpdXMsXHRcdFx0ICAgICAgICBcclxuXHRcdFx0XHRwaWVDb2xvcnMsXHJcblx0XHRcdCAgICBwaWVXaWR0aEhlaWdodCxcclxuXHRcdFx0ICAgIHBpZUJvcmRlckNvbG9yLFxyXG5cdFx0XHQgICAgcGllT2Zmc2V0LFxyXG5cdFx0XHQgXHR0aGlzQm94V2lkdGgsXHJcblx0XHRcdCAgICB0aGlzQm94SGVpZ2h0LFxyXG5cdFx0XHQgICAgdGhpc0JveFJhdyxcclxuXHRcdFx0ICAgIHRoaXNCb3hUYXJnZXQsXHJcblx0XHRcdCAgICB0aGlzQm94TWluLFxyXG5cdFx0XHQgICAgdGhpc0JveE1heCxcclxuXHRcdFx0ICAgIHRoaXNTaG93T3V0bGllcixcclxuXHRcdFx0ICAgIHRoaXNJUVIsXHJcblx0XHRcdCAgICB0aGlzQm94U3BvdFJhZGl1cyxcclxuXHRcdFx0ICAgIHRoaXNCb3hMaW5lQ29sb3IsXHJcblx0XHRcdCAgICB0aGlzQm94RmlsbENvbG9yLFxyXG5cdFx0XHQgICAgdGhpc0JveFdoaXNDb2xvcixcclxuXHRcdFx0ICAgIHRoaXNCb3hPdXRsaW5lQ29sb3IsXHJcblx0XHRcdCAgICB0aGlzQm94T3V0bGluZUZpbGwsXHJcblx0XHRcdCAgICB0aGlzQm94TWVkaWFuQ29sb3IsXHJcblx0XHRcdCAgICB0aGlzQm94VGFyZ2V0Q29sb3IsXHJcblx0XHRcdFx0dGhpc0J1bGxldEhlaWdodCxcclxuXHRcdFx0ICAgIHRoaXNCdWxsZXRXaWR0aCxcclxuXHRcdFx0ICAgIHRoaXNCdWxsZXRDb2xvcixcclxuXHRcdFx0ICAgIHRoaXNCdWxsZXRQZXJmb3JtYW5jZUNvbG9yLFxyXG5cdFx0XHQgICAgdGhpc0J1bGxldFJhbmdlQ29sb3JzLFxyXG5cdFx0XHRcdHRoaXNEaXNjcmV0ZUhlaWdodCxcclxuXHRcdFx0ICAgIHRoaXNEaXNjcmV0ZVdpZHRoLFxyXG5cdFx0XHQgICAgdGhpc0Rpc2NyZXRlTGluZUNvbG9yLFxyXG5cdFx0XHQgICAgdGhpc0Rpc2NyZXRlTGluZUhlaWdodCxcclxuXHRcdFx0ICAgIHRoaXNEaXNjcmV0ZVRocnVzaG9sZCxcclxuXHRcdFx0ICAgIHRoaXNEaXNjcmV0ZVRocnVzaG9sZENvbG9yLFxyXG5cdFx0XHRcdHRoaXNUcmlzdGF0ZUhlaWdodCxcclxuXHRcdFx0ICAgIHRoaXNUcmlzdGF0ZVBvc0JhckNvbG9yLFxyXG5cdFx0XHQgICAgdGhpc1RyaXN0YXRlTmVnQmFyQ29sb3IsXHJcblx0XHRcdCAgICB0aGlzVHJpc3RhdGVaZXJvQmFyQ29sb3IsXHJcblx0XHRcdCAgICB0aGlzVHJpc3RhdGVCYXJXaWR0aCxcclxuXHRcdFx0ICAgIHRoaXNUcmlzdGF0ZUJhclNwYWNpbmcsXHJcblx0XHRcdCAgICB0aGlzWmVyb0F4aXMsXHJcblx0XHRcdCAgICB0aGlzQmFyQ29sb3IsXHJcblx0XHRcdCAgICBzcGFya2xpbmVXaWR0aCxcclxuXHRcdFx0ICAgIHNwYXJrbGluZVZhbHVlLFxyXG5cdFx0XHQgICAgc3BhcmtsaW5lVmFsdWVTcG90czEsXHJcblx0XHRcdCAgICBzcGFya2xpbmVWYWx1ZVNwb3RzMixcclxuXHRcdFx0ICAgIHRoaXNMaW5lV2lkdGgxLFxyXG5cdFx0XHQgICAgdGhpc0xpbmVXaWR0aDIsXHJcblx0XHRcdCAgICB0aGlzTGluZUNvbG9yMSxcclxuXHRcdFx0ICAgIHRoaXNMaW5lQ29sb3IyLFxyXG5cdFx0XHQgICAgdGhpc1Nwb3RSYWRpdXMxLFxyXG5cdFx0XHQgICAgdGhpc1Nwb3RSYWRpdXMyLFxyXG5cdFx0XHQgICAgdGhpc01pblNwb3RDb2xvcjEsXHJcblx0XHRcdCAgICB0aGlzTWF4U3BvdENvbG9yMSxcclxuXHRcdFx0ICAgIHRoaXNNaW5TcG90Q29sb3IyLFxyXG5cdFx0XHQgICAgdGhpc01heFNwb3RDb2xvcjIsXHJcblx0XHRcdCAgICB0aGlzaGlnaGxpZ2h0U3BvdENvbG9yMSxcclxuXHRcdFx0ICAgIHRoaXNIaWdobGlnaHRMaW5lQ29sb3IxLFxyXG5cdFx0XHQgICAgdGhpc2hpZ2hsaWdodFNwb3RDb2xvcjIsXHJcblx0XHRcdCAgICB0aGlzRmlsbENvbG9yMSxcclxuXHRcdFx0ICAgIHRoaXNGaWxsQ29sb3IyO1xyXG5cdFx0XHRcdFx0ICAgIFx0XHRcdFx0ICAgIFx0XHJcblx0XHRcdCQoJy5zcGFya2xpbmU6bm90KDpoYXMoPmNhbnZhcykpJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG5cdFx0XHRcdFx0c3BhcmtsaW5lVHlwZSA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS10eXBlJykgfHwgJ2Jhcic7XHJcblx0XHJcblx0XHRcdFx0Ly8gQkFSIENIQVJUXHJcblx0XHRcdFx0aWYgKHNwYXJrbGluZVR5cGUgPT0gJ2JhcicpIHtcclxuXHRcclxuXHRcdFx0XHRcdFx0YmFyQ29sb3IgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtYmFyLWNvbG9yJykgfHwgJHRoaXMuY3NzKCdjb2xvcicpIHx8ICcjMDAwMGYwJztcclxuXHRcdFx0XHRcdCAgICBzcGFya2xpbmVIZWlnaHQgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtaGVpZ2h0JykgfHwgJzI2cHgnO1xyXG5cdFx0XHRcdFx0ICAgIHNwYXJrbGluZUJhcldpZHRoID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWJhcndpZHRoJykgfHwgNTtcclxuXHRcdFx0XHRcdCAgICBzcGFya2xpbmVCYXJTcGFjaW5nID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWJhcnNwYWNpbmcnKSB8fCAyO1xyXG5cdFx0XHRcdFx0ICAgIHNwYXJrbGluZU5lZ0JhckNvbG9yID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLW5lZ2Jhci1jb2xvcicpIHx8ICcjQTkwMzI5JztcclxuXHRcdFx0XHRcdCAgICBzcGFya2xpbmVTdGFja2VkQ29sb3IgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtYmFyc3RhY2tlZC1jb2xvcicpIHx8IFtcIiNBOTAzMjlcIiwgXCIjMDA5OWM2XCIsIFwiIzk4QUE1NlwiLCBcIiNkYTUzMmNcIiwgXCIjNDQ5MEIxXCIsIFwiIzZFOTQ2MVwiLCBcIiM5OTAwOTlcIiwgXCIjQjRDQUQzXCJdO1xyXG5cdFx0XHRcdFx0ICAgICAgICBcclxuXHRcdFx0XHRcdCR0aGlzLnNwYXJrbGluZSgnaHRtbCcsIHtcclxuXHRcdFx0XHRcdFx0YmFyQ29sb3IgOiBiYXJDb2xvcixcclxuXHRcdFx0XHRcdFx0dHlwZSA6IHNwYXJrbGluZVR5cGUsXHJcblx0XHRcdFx0XHRcdGhlaWdodCA6IHNwYXJrbGluZUhlaWdodCxcclxuXHRcdFx0XHRcdFx0YmFyV2lkdGggOiBzcGFya2xpbmVCYXJXaWR0aCxcclxuXHRcdFx0XHRcdFx0YmFyU3BhY2luZyA6IHNwYXJrbGluZUJhclNwYWNpbmcsXHJcblx0XHRcdFx0XHRcdHN0YWNrZWRCYXJDb2xvciA6IHNwYXJrbGluZVN0YWNrZWRDb2xvcixcclxuXHRcdFx0XHRcdFx0bmVnQmFyQ29sb3IgOiBzcGFya2xpbmVOZWdCYXJDb2xvcixcclxuXHRcdFx0XHRcdFx0emVyb0F4aXMgOiAnZmFsc2UnXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JHRoaXMgPSBudWxsO1xyXG5cdFxyXG5cdFx0XHRcdH1cclxuXHRcclxuXHRcdFx0XHQvLyBMSU5FIENIQVJUXHJcblx0XHRcdFx0aWYgKHNwYXJrbGluZVR5cGUgPT0gJ2xpbmUnKSB7XHJcblx0XHJcblx0XHRcdFx0XHRcdHNwYXJrbGluZUhlaWdodCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1oZWlnaHQnKSB8fCAnMjBweCc7XHJcblx0XHRcdFx0XHQgICAgc3BhcmtsaW5lV2lkdGggPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtd2lkdGgnKSB8fCAnOTBweCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc0xpbmVDb2xvciA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1saW5lLWNvbG9yJykgfHwgJHRoaXMuY3NzKCdjb2xvcicpIHx8ICcjMDAwMGYwJztcclxuXHRcdFx0XHRcdCAgICB0aGlzTGluZVdpZHRoID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWxpbmUtd2lkdGgnKSB8fCAxO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNGaWxsID0gJHRoaXMuZGF0YSgnZmlsbC1jb2xvcicpIHx8ICcjYzBkMGYwJztcclxuXHRcdFx0XHRcdCAgICB0aGlzU3BvdENvbG9yID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLXNwb3QtY29sb3InKSB8fCAnI2YwODAwMCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc01pblNwb3RDb2xvciA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1taW5zcG90LWNvbG9yJykgfHwgJyNlZDFjMjQnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNNYXhTcG90Q29sb3IgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtbWF4c3BvdC1jb2xvcicpIHx8ICcjZjA4MDAwJztcclxuXHRcdFx0XHRcdCAgICB0aGlzaGlnaGxpZ2h0U3BvdENvbG9yID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWhpZ2hsaWdodHNwb3QtY29sb3InKSB8fCAnIzUwZjA1MCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc0hpZ2hsaWdodExpbmVDb2xvciA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1oaWdobGlnaHRsaW5lLWNvbG9yJykgfHwgJ2YwMjAyMCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc1Nwb3RSYWRpdXMgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtc3BvdHJhZGl1cycpIHx8IDEuNTtcclxuXHRcdFx0XHRcdFx0dGhpc0NoYXJ0TWluWVJhbmdlID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLW1pbi15JykgfHwgJ3VuZGVmaW5lZCc7IFxyXG5cdFx0XHRcdFx0XHR0aGlzQ2hhcnRNYXhZUmFuZ2UgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtbWF4LXknKSB8fCAndW5kZWZpbmVkJzsgXHJcblx0XHRcdFx0XHRcdHRoaXNDaGFydE1pblhSYW5nZSA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1taW4teCcpIHx8ICd1bmRlZmluZWQnOyBcclxuXHRcdFx0XHRcdFx0dGhpc0NoYXJ0TWF4WFJhbmdlID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLW1heC14JykgfHwgJ3VuZGVmaW5lZCc7IFxyXG5cdFx0XHRcdFx0XHR0aGlzTWluTm9ybVZhbHVlID0gJHRoaXMuZGF0YSgnbWluLXZhbCcpIHx8ICd1bmRlZmluZWQnOyBcclxuXHRcdFx0XHRcdFx0dGhpc01heE5vcm1WYWx1ZSA9ICR0aGlzLmRhdGEoJ21heC12YWwnKSB8fCAndW5kZWZpbmVkJzsgXHJcblx0XHRcdFx0XHRcdHRoaXNOb3JtQ29sb3IgPSAgJHRoaXMuZGF0YSgnbm9ybS1jb2xvcicpIHx8ICcjYzBjMGMwJztcclxuXHRcdFx0XHRcdFx0dGhpc0RyYXdOb3JtYWxPblRvcCA9ICR0aGlzLmRhdGEoJ2RyYXctbm9ybWFsJykgfHwgZmFsc2U7XHJcblx0XHRcdFx0XHQgICAgXHJcblx0XHRcdFx0XHQkdGhpcy5zcGFya2xpbmUoJ2h0bWwnLCB7XHJcblx0XHRcdFx0XHRcdHR5cGUgOiAnbGluZScsXHJcblx0XHRcdFx0XHRcdHdpZHRoIDogc3BhcmtsaW5lV2lkdGgsXHJcblx0XHRcdFx0XHRcdGhlaWdodCA6IHNwYXJrbGluZUhlaWdodCxcclxuXHRcdFx0XHRcdFx0bGluZVdpZHRoIDogdGhpc0xpbmVXaWR0aCxcclxuXHRcdFx0XHRcdFx0bGluZUNvbG9yIDogdGhpc0xpbmVDb2xvcixcclxuXHRcdFx0XHRcdFx0ZmlsbENvbG9yIDogdGhpc0ZpbGwsXHJcblx0XHRcdFx0XHRcdHNwb3RDb2xvciA6IHRoaXNTcG90Q29sb3IsXHJcblx0XHRcdFx0XHRcdG1pblNwb3RDb2xvciA6IHRoaXNNaW5TcG90Q29sb3IsXHJcblx0XHRcdFx0XHRcdG1heFNwb3RDb2xvciA6IHRoaXNNYXhTcG90Q29sb3IsXHJcblx0XHRcdFx0XHRcdGhpZ2hsaWdodFNwb3RDb2xvciA6IHRoaXNoaWdobGlnaHRTcG90Q29sb3IsXHJcblx0XHRcdFx0XHRcdGhpZ2hsaWdodExpbmVDb2xvciA6IHRoaXNIaWdobGlnaHRMaW5lQ29sb3IsXHJcblx0XHRcdFx0XHRcdHNwb3RSYWRpdXMgOiB0aGlzU3BvdFJhZGl1cyxcclxuXHRcdFx0XHRcdFx0Y2hhcnRSYW5nZU1pbiA6IHRoaXNDaGFydE1pbllSYW5nZSxcclxuXHRcdFx0XHRcdFx0Y2hhcnRSYW5nZU1heCA6IHRoaXNDaGFydE1heFlSYW5nZSxcclxuXHRcdFx0XHRcdFx0Y2hhcnRSYW5nZU1pblggOiB0aGlzQ2hhcnRNaW5YUmFuZ2UsXHJcblx0XHRcdFx0XHRcdGNoYXJ0UmFuZ2VNYXhYIDogdGhpc0NoYXJ0TWF4WFJhbmdlLFxyXG5cdFx0XHRcdFx0XHRub3JtYWxSYW5nZU1pbiA6IHRoaXNNaW5Ob3JtVmFsdWUsXHJcblx0XHRcdFx0XHRcdG5vcm1hbFJhbmdlTWF4IDogdGhpc01heE5vcm1WYWx1ZSxcclxuXHRcdFx0XHRcdFx0bm9ybWFsUmFuZ2VDb2xvciA6IHRoaXNOb3JtQ29sb3IsXHJcblx0XHRcdFx0XHRcdGRyYXdOb3JtYWxPblRvcCA6IHRoaXNEcmF3Tm9ybWFsT25Ub3BcclxuXHRcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQkdGhpcyA9IG51bGw7XHJcblx0XHJcblx0XHRcdFx0fVxyXG5cdFxyXG5cdFx0XHRcdC8vIFBJRSBDSEFSVFxyXG5cdFx0XHRcdGlmIChzcGFya2xpbmVUeXBlID09ICdwaWUnKSB7XHJcblx0XHJcblx0XHRcdFx0XHRcdHBpZUNvbG9ycyA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1waWVjb2xvcicpIHx8IFtcIiNCNENBRDNcIiwgXCIjNDQ5MEIxXCIsIFwiIzk4QUE1NlwiLCBcIiNkYTUzMmNcIixcIiM2RTk0NjFcIiwgXCIjMDA5OWM2XCIsIFwiIzk5MDA5OVwiLCBcIiM3MTdEOEFcIl07XHJcblx0XHRcdFx0XHQgICAgcGllV2lkdGhIZWlnaHQgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtcGllc2l6ZScpIHx8IDkwO1xyXG5cdFx0XHRcdFx0ICAgIHBpZUJvcmRlckNvbG9yID0gJHRoaXMuZGF0YSgnYm9yZGVyLWNvbG9yJykgfHwgJyM0NTQ5NEMnO1xyXG5cdFx0XHRcdFx0ICAgIHBpZU9mZnNldCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1vZmZzZXQnKSB8fCAwO1xyXG5cdFx0XHRcdFx0ICAgIFxyXG5cdFx0XHRcdFx0JHRoaXMuc3BhcmtsaW5lKCdodG1sJywge1xyXG5cdFx0XHRcdFx0XHR0eXBlIDogJ3BpZScsXHJcblx0XHRcdFx0XHRcdHdpZHRoIDogcGllV2lkdGhIZWlnaHQsXHJcblx0XHRcdFx0XHRcdGhlaWdodCA6IHBpZVdpZHRoSGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHR0b29sdGlwRm9ybWF0IDogJzxzcGFuIHN0eWxlPVwiY29sb3I6IHt7Y29sb3J9fVwiPiYjOTY3OTs8L3NwYW4+ICh7e3BlcmNlbnQuMX19JSknLFxyXG5cdFx0XHRcdFx0XHRzbGljZUNvbG9ycyA6IHBpZUNvbG9ycyxcclxuXHRcdFx0XHRcdFx0Ym9yZGVyV2lkdGggOiAxLFxyXG5cdFx0XHRcdFx0XHRvZmZzZXQgOiBwaWVPZmZzZXQsXHJcblx0XHRcdFx0XHRcdGJvcmRlckNvbG9yIDogcGllQm9yZGVyQ29sb3JcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQkdGhpcyA9IG51bGw7XHJcblx0XHJcblx0XHRcdFx0fVxyXG5cdFxyXG5cdFx0XHRcdC8vIEJPWCBQTE9UXHJcblx0XHRcdFx0aWYgKHNwYXJrbGluZVR5cGUgPT0gJ2JveCcpIHtcclxuXHRcclxuXHRcdFx0XHRcdFx0dGhpc0JveFdpZHRoID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLXdpZHRoJykgfHwgJ2F1dG8nO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNCb3hIZWlnaHQgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtaGVpZ2h0JykgfHwgJ2F1dG8nO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNCb3hSYXcgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtYm94cmF3JykgfHwgZmFsc2U7XHJcblx0XHRcdFx0XHQgICAgdGhpc0JveFRhcmdldCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS10YXJnZXR2YWwnKSB8fCAndW5kZWZpbmVkJztcclxuXHRcdFx0XHRcdCAgICB0aGlzQm94TWluID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLW1pbicpIHx8ICd1bmRlZmluZWQnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNCb3hNYXggPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtbWF4JykgfHwgJ3VuZGVmaW5lZCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc1Nob3dPdXRsaWVyID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLXNob3dvdXRsaWVyJykgfHwgdHJ1ZTtcclxuXHRcdFx0XHRcdCAgICB0aGlzSVFSID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLW91dGxpZXItaXFyJykgfHwgMS41O1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNCb3hTcG90UmFkaXVzID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLXNwb3RyYWRpdXMnKSB8fCAxLjU7XHJcblx0XHRcdFx0XHQgICAgdGhpc0JveExpbmVDb2xvciA9ICR0aGlzLmNzcygnY29sb3InKSB8fCAnIzAwMDAwMCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc0JveEZpbGxDb2xvciA9ICR0aGlzLmRhdGEoJ2ZpbGwtY29sb3InKSB8fCAnI2MwZDBmMCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc0JveFdoaXNDb2xvciA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS13aGlzLWNvbG9yJykgfHwgJyMwMDAwMDAnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNCb3hPdXRsaW5lQ29sb3IgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtb3V0bGluZS1jb2xvcicpIHx8ICcjMzAzMDMwJztcclxuXHRcdFx0XHRcdCAgICB0aGlzQm94T3V0bGluZUZpbGwgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtb3V0bGluZWZpbGwtY29sb3InKSB8fCAnI2YwZjBmMCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc0JveE1lZGlhbkNvbG9yID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLW91dGxpbmVtZWRpYW4tY29sb3InKSB8fCAnI2YwMDAwMCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc0JveFRhcmdldENvbG9yID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLW91dGxpbmV0YXJnZXQtY29sb3InKSB8fCAnIzQwYTAyMCc7XHJcblx0XHRcdFx0XHQgICAgXHJcblx0XHRcdFx0XHQkdGhpcy5zcGFya2xpbmUoJ2h0bWwnLCB7XHJcblx0XHRcdFx0XHRcdHR5cGUgOiAnYm94JyxcclxuXHRcdFx0XHRcdFx0d2lkdGggOiB0aGlzQm94V2lkdGgsXHJcblx0XHRcdFx0XHRcdGhlaWdodCA6IHRoaXNCb3hIZWlnaHQsXHJcblx0XHRcdFx0XHRcdHJhdyA6IHRoaXNCb3hSYXcsXHJcblx0XHRcdFx0XHRcdHRhcmdldCA6IHRoaXNCb3hUYXJnZXQsXHJcblx0XHRcdFx0XHRcdG1pblZhbHVlIDogdGhpc0JveE1pbixcclxuXHRcdFx0XHRcdFx0bWF4VmFsdWUgOiB0aGlzQm94TWF4LFxyXG5cdFx0XHRcdFx0XHRzaG93T3V0bGllcnMgOiB0aGlzU2hvd091dGxpZXIsXHJcblx0XHRcdFx0XHRcdG91dGxpZXJJUVIgOiB0aGlzSVFSLFxyXG5cdFx0XHRcdFx0XHRzcG90UmFkaXVzIDogdGhpc0JveFNwb3RSYWRpdXMsXHJcblx0XHRcdFx0XHRcdGJveExpbmVDb2xvciA6IHRoaXNCb3hMaW5lQ29sb3IsXHJcblx0XHRcdFx0XHRcdGJveEZpbGxDb2xvciA6IHRoaXNCb3hGaWxsQ29sb3IsXHJcblx0XHRcdFx0XHRcdHdoaXNrZXJDb2xvciA6IHRoaXNCb3hXaGlzQ29sb3IsXHJcblx0XHRcdFx0XHRcdG91dGxpZXJMaW5lQ29sb3IgOiB0aGlzQm94T3V0bGluZUNvbG9yLFxyXG5cdFx0XHRcdFx0XHRvdXRsaWVyRmlsbENvbG9yIDogdGhpc0JveE91dGxpbmVGaWxsLFxyXG5cdFx0XHRcdFx0XHRtZWRpYW5Db2xvciA6IHRoaXNCb3hNZWRpYW5Db2xvcixcclxuXHRcdFx0XHRcdFx0dGFyZ2V0Q29sb3IgOiB0aGlzQm94VGFyZ2V0Q29sb3JcclxuXHRcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQkdGhpcyA9IG51bGw7XHJcblx0XHJcblx0XHRcdFx0fVxyXG5cdFxyXG5cdFx0XHRcdC8vIEJVTExFVFxyXG5cdFx0XHRcdGlmIChzcGFya2xpbmVUeXBlID09ICdidWxsZXQnKSB7XHJcblx0XHJcblx0XHRcdFx0XHR2YXIgdGhpc0J1bGxldEhlaWdodCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1oZWlnaHQnKSB8fCAnYXV0byc7XHJcblx0XHRcdFx0XHQgICAgdGhpc0J1bGxldFdpZHRoID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLXdpZHRoJykgfHwgMjtcclxuXHRcdFx0XHRcdCAgICB0aGlzQnVsbGV0Q29sb3IgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtYnVsbGV0LWNvbG9yJykgfHwgJyNlZDFjMjQnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNCdWxsZXRQZXJmb3JtYW5jZUNvbG9yID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLXBlcmZvcm1hbmNlLWNvbG9yJykgfHwgJyMzMDMwZjAnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNCdWxsZXRSYW5nZUNvbG9ycyA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1idWxsZXRyYW5nZS1jb2xvcicpIHx8IFtcIiNkM2RhZmVcIiwgXCIjYThiNmZmXCIsIFwiIzdmOTRmZlwiXTtcclxuXHRcdFx0XHRcdCAgICBcclxuXHRcdFx0XHRcdCR0aGlzLnNwYXJrbGluZSgnaHRtbCcsIHtcclxuXHRcclxuXHRcdFx0XHRcdFx0dHlwZSA6ICdidWxsZXQnLFxyXG5cdFx0XHRcdFx0XHRoZWlnaHQgOiB0aGlzQnVsbGV0SGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHR0YXJnZXRXaWR0aCA6IHRoaXNCdWxsZXRXaWR0aCxcclxuXHRcdFx0XHRcdFx0dGFyZ2V0Q29sb3IgOiB0aGlzQnVsbGV0Q29sb3IsXHJcblx0XHRcdFx0XHRcdHBlcmZvcm1hbmNlQ29sb3IgOiB0aGlzQnVsbGV0UGVyZm9ybWFuY2VDb2xvcixcclxuXHRcdFx0XHRcdFx0cmFuZ2VDb2xvcnMgOiB0aGlzQnVsbGV0UmFuZ2VDb2xvcnNcclxuXHRcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQkdGhpcyA9IG51bGw7XHJcblx0XHJcblx0XHRcdFx0fVxyXG5cdFxyXG5cdFx0XHRcdC8vIERJU0NSRVRFXHJcblx0XHRcdFx0aWYgKHNwYXJrbGluZVR5cGUgPT0gJ2Rpc2NyZXRlJykge1xyXG5cdFxyXG5cdFx0XHRcdFx0IFx0dGhpc0Rpc2NyZXRlSGVpZ2h0ID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWhlaWdodCcpIHx8IDI2O1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNEaXNjcmV0ZVdpZHRoID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLXdpZHRoJykgfHwgNTA7XHJcblx0XHRcdFx0XHQgICAgdGhpc0Rpc2NyZXRlTGluZUNvbG9yID0gJHRoaXMuY3NzKCdjb2xvcicpO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNEaXNjcmV0ZUxpbmVIZWlnaHQgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtbGluZS1oZWlnaHQnKSB8fCA1O1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNEaXNjcmV0ZVRocnVzaG9sZCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS10aHJlc2hvbGQnKSB8fCAndW5kZWZpbmVkJztcclxuXHRcdFx0XHRcdCAgICB0aGlzRGlzY3JldGVUaHJ1c2hvbGRDb2xvciA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS10aHJlc2hvbGQtY29sb3InKSB8fCAnI2VkMWMyNCc7XHJcblx0XHRcdFx0XHQgICAgXHJcblx0XHRcdFx0XHQkdGhpcy5zcGFya2xpbmUoJ2h0bWwnLCB7XHJcblx0XHJcblx0XHRcdFx0XHRcdHR5cGUgOiAnZGlzY3JldGUnLFxyXG5cdFx0XHRcdFx0XHR3aWR0aCA6IHRoaXNEaXNjcmV0ZVdpZHRoLFxyXG5cdFx0XHRcdFx0XHRoZWlnaHQgOiB0aGlzRGlzY3JldGVIZWlnaHQsXHJcblx0XHRcdFx0XHRcdGxpbmVDb2xvciA6IHRoaXNEaXNjcmV0ZUxpbmVDb2xvcixcclxuXHRcdFx0XHRcdFx0bGluZUhlaWdodCA6IHRoaXNEaXNjcmV0ZUxpbmVIZWlnaHQsXHJcblx0XHRcdFx0XHRcdHRocmVzaG9sZFZhbHVlIDogdGhpc0Rpc2NyZXRlVGhydXNob2xkLFxyXG5cdFx0XHRcdFx0XHR0aHJlc2hvbGRDb2xvciA6IHRoaXNEaXNjcmV0ZVRocnVzaG9sZENvbG9yXHJcblx0XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JHRoaXMgPSBudWxsO1xyXG5cdFxyXG5cdFx0XHRcdH1cclxuXHRcclxuXHRcdFx0XHQvLyBUUklTVEFURVxyXG5cdFx0XHRcdGlmIChzcGFya2xpbmVUeXBlID09ICd0cmlzdGF0ZScpIHtcclxuXHRcclxuXHRcdFx0XHRcdCBcdHRoaXNUcmlzdGF0ZUhlaWdodCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1oZWlnaHQnKSB8fCAyNjtcclxuXHRcdFx0XHRcdCAgICB0aGlzVHJpc3RhdGVQb3NCYXJDb2xvciA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1wb3NiYXItY29sb3InKSB8fCAnIzYwZjA2MCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc1RyaXN0YXRlTmVnQmFyQ29sb3IgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtbmVnYmFyLWNvbG9yJykgfHwgJyNmMDQwNDAnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNUcmlzdGF0ZVplcm9CYXJDb2xvciA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS16ZXJvYmFyLWNvbG9yJykgfHwgJyM5MDkwOTAnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNUcmlzdGF0ZUJhcldpZHRoID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWJhcndpZHRoJykgfHwgNTtcclxuXHRcdFx0XHRcdCAgICB0aGlzVHJpc3RhdGVCYXJTcGFjaW5nID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWJhcnNwYWNpbmcnKSB8fCAyO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNaZXJvQXhpcyA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS16ZXJvYXhpcycpIHx8IGZhbHNlO1xyXG5cdFx0XHRcdFx0ICAgIFxyXG5cdFx0XHRcdFx0JHRoaXMuc3BhcmtsaW5lKCdodG1sJywge1xyXG5cdFxyXG5cdFx0XHRcdFx0XHR0eXBlIDogJ3RyaXN0YXRlJyxcclxuXHRcdFx0XHRcdFx0aGVpZ2h0IDogdGhpc1RyaXN0YXRlSGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHRwb3NCYXJDb2xvciA6IHRoaXNCYXJDb2xvcixcclxuXHRcdFx0XHRcdFx0bmVnQmFyQ29sb3IgOiB0aGlzVHJpc3RhdGVOZWdCYXJDb2xvcixcclxuXHRcdFx0XHRcdFx0emVyb0JhckNvbG9yIDogdGhpc1RyaXN0YXRlWmVyb0JhckNvbG9yLFxyXG5cdFx0XHRcdFx0XHRiYXJXaWR0aCA6IHRoaXNUcmlzdGF0ZUJhcldpZHRoLFxyXG5cdFx0XHRcdFx0XHRiYXJTcGFjaW5nIDogdGhpc1RyaXN0YXRlQmFyU3BhY2luZyxcclxuXHRcdFx0XHRcdFx0emVyb0F4aXMgOiB0aGlzWmVyb0F4aXNcclxuXHRcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQkdGhpcyA9IG51bGw7XHJcblx0XHJcblx0XHRcdFx0fVxyXG5cdFxyXG5cdFx0XHRcdC8vQ09NUE9TSVRFOiBCQVJcclxuXHRcdFx0XHRpZiAoc3BhcmtsaW5lVHlwZSA9PSAnY29tcG9zaXRlYmFyJykge1xyXG5cdFxyXG5cdFx0XHRcdCBcdHNwYXJrbGluZUhlaWdodCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1oZWlnaHQnKSB8fCAnMjBweCc7XHJcblx0XHRcdFx0ICAgIHNwYXJrbGluZVdpZHRoID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLXdpZHRoJykgfHwgJzEwMCUnO1xyXG5cdFx0XHRcdCAgICBzcGFya2xpbmVCYXJXaWR0aCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1iYXJ3aWR0aCcpIHx8IDM7XHJcblx0XHRcdFx0ICAgIHRoaXNMaW5lV2lkdGggPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtbGluZS13aWR0aCcpIHx8IDE7XHJcblx0XHRcdFx0ICAgIHRoaXNMaW5lQ29sb3IgPSAkdGhpcy5kYXRhKCdkYXRhLXNwYXJrbGluZS1saW5lY29sb3InKSB8fCAnI2VkMWMyNCc7XHJcblx0XHRcdFx0ICAgIHRoaXNCYXJDb2xvciA9ICR0aGlzLmRhdGEoJ2RhdGEtc3BhcmtsaW5lLWJhcmNvbG9yJykgfHwgJyMzMzMzMzMnO1xyXG5cdFx0XHRcdFx0ICAgIFxyXG5cdFx0XHRcdFx0JHRoaXMuc3BhcmtsaW5lKCR0aGlzLmRhdGEoJ3NwYXJrbGluZS1iYXItdmFsJyksIHtcclxuXHRcclxuXHRcdFx0XHRcdFx0dHlwZSA6ICdiYXInLFxyXG5cdFx0XHRcdFx0XHR3aWR0aCA6IHNwYXJrbGluZVdpZHRoLFxyXG5cdFx0XHRcdFx0XHRoZWlnaHQgOiBzcGFya2xpbmVIZWlnaHQsXHJcblx0XHRcdFx0XHRcdGJhckNvbG9yIDogdGhpc0JhckNvbG9yLFxyXG5cdFx0XHRcdFx0XHRiYXJXaWR0aCA6IHNwYXJrbGluZUJhcldpZHRoXHJcblx0XHRcdFx0XHRcdC8vYmFyU3BhY2luZzogNVxyXG5cdFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHJcblx0XHRcdFx0XHQkdGhpcy5zcGFya2xpbmUoJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWxpbmUtdmFsJyksIHtcclxuXHRcclxuXHRcdFx0XHRcdFx0d2lkdGggOiBzcGFya2xpbmVXaWR0aCxcclxuXHRcdFx0XHRcdFx0aGVpZ2h0IDogc3BhcmtsaW5lSGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHRsaW5lQ29sb3IgOiB0aGlzTGluZUNvbG9yLFxyXG5cdFx0XHRcdFx0XHRsaW5lV2lkdGggOiB0aGlzTGluZVdpZHRoLFxyXG5cdFx0XHRcdFx0XHRjb21wb3NpdGUgOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRmaWxsQ29sb3IgOiBmYWxzZVxyXG5cdFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdCR0aGlzID0gbnVsbDtcclxuXHRcclxuXHRcdFx0XHR9XHJcblx0XHJcblx0XHRcdFx0Ly9DT01QT1NJVEU6IExJTkVcclxuXHRcdFx0XHRpZiAoc3BhcmtsaW5lVHlwZSA9PSAnY29tcG9zaXRlbGluZScpIHtcclxuXHRcclxuXHRcdFx0XHRcdFx0c3BhcmtsaW5lSGVpZ2h0ID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWhlaWdodCcpIHx8ICcyMHB4JztcclxuXHRcdFx0XHRcdCAgICBzcGFya2xpbmVXaWR0aCA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS13aWR0aCcpIHx8ICc5MHB4JztcclxuXHRcdFx0XHRcdCAgICBzcGFya2xpbmVWYWx1ZSA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1iYXItdmFsJyk7XHJcblx0XHRcdFx0XHQgICAgc3BhcmtsaW5lVmFsdWVTcG90czEgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtYmFyLXZhbC1zcG90cy10b3AnKSB8fCBudWxsO1xyXG5cdFx0XHRcdFx0ICAgIHNwYXJrbGluZVZhbHVlU3BvdHMyID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWJhci12YWwtc3BvdHMtYm90dG9tJykgfHwgbnVsbDtcclxuXHRcdFx0XHRcdCAgICB0aGlzTGluZVdpZHRoMSA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1saW5lLXdpZHRoLXRvcCcpIHx8IDE7XHJcblx0XHRcdFx0XHQgICAgdGhpc0xpbmVXaWR0aDIgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtbGluZS13aWR0aC1ib3R0b20nKSB8fCAxO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNMaW5lQ29sb3IxID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWNvbG9yLXRvcCcpIHx8ICcjMzMzMzMzJztcclxuXHRcdFx0XHRcdCAgICB0aGlzTGluZUNvbG9yMiA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1jb2xvci1ib3R0b20nKSB8fCAnI2VkMWMyNCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc1Nwb3RSYWRpdXMxID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLXNwb3RyYWRpdXMtdG9wJykgfHwgMS41O1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNTcG90UmFkaXVzMiA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1zcG90cmFkaXVzLWJvdHRvbScpIHx8IHRoaXNTcG90UmFkaXVzMTtcclxuXHRcdFx0XHRcdCAgICB0aGlzU3BvdENvbG9yID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLXNwb3QtY29sb3InKSB8fCAnI2YwODAwMCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc01pblNwb3RDb2xvcjEgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtbWluc3BvdC1jb2xvci10b3AnKSB8fCAnI2VkMWMyNCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc01heFNwb3RDb2xvcjEgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtbWF4c3BvdC1jb2xvci10b3AnKSB8fCAnI2YwODAwMCc7XHJcblx0XHRcdFx0XHQgICAgdGhpc01pblNwb3RDb2xvcjIgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtbWluc3BvdC1jb2xvci1ib3R0b20nKSB8fCB0aGlzTWluU3BvdENvbG9yMTtcclxuXHRcdFx0XHRcdCAgICB0aGlzTWF4U3BvdENvbG9yMiA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1tYXhzcG90LWNvbG9yLWJvdHRvbScpIHx8IHRoaXNNYXhTcG90Q29sb3IxO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNoaWdobGlnaHRTcG90Q29sb3IxID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWhpZ2hsaWdodHNwb3QtY29sb3ItdG9wJykgfHwgJyM1MGYwNTAnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNIaWdobGlnaHRMaW5lQ29sb3IxID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWhpZ2hsaWdodGxpbmUtY29sb3ItdG9wJykgfHwgJyNmMDIwMjAnO1xyXG5cdFx0XHRcdFx0ICAgIHRoaXNoaWdobGlnaHRTcG90Q29sb3IyID0gJHRoaXMuZGF0YSgnc3BhcmtsaW5lLWhpZ2hsaWdodHNwb3QtY29sb3ItYm90dG9tJykgfHxcclxuXHRcdFx0XHRcdCAgICAgICAgdGhpc2hpZ2hsaWdodFNwb3RDb2xvcjE7XHJcblx0XHRcdFx0XHQgICAgdGhpc0hpZ2hsaWdodExpbmVDb2xvcjIgPSAkdGhpcy5kYXRhKCdzcGFya2xpbmUtaGlnaGxpZ2h0bGluZS1jb2xvci1ib3R0b20nKSB8fFxyXG5cdFx0XHRcdFx0ICAgICAgICB0aGlzSGlnaGxpZ2h0TGluZUNvbG9yMTtcclxuXHRcdFx0XHRcdCAgICB0aGlzRmlsbENvbG9yMSA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1maWxsY29sb3ItdG9wJykgfHwgJ3RyYW5zcGFyZW50JztcclxuXHRcdFx0XHRcdCAgICB0aGlzRmlsbENvbG9yMiA9ICR0aGlzLmRhdGEoJ3NwYXJrbGluZS1maWxsY29sb3ItYm90dG9tJykgfHwgJ3RyYW5zcGFyZW50JztcclxuXHRcdFx0XHRcdCAgICBcclxuXHRcdFx0XHRcdCR0aGlzLnNwYXJrbGluZShzcGFya2xpbmVWYWx1ZSwge1xyXG5cdFxyXG5cdFx0XHRcdFx0XHR0eXBlIDogJ2xpbmUnLFxyXG5cdFx0XHRcdFx0XHRzcG90UmFkaXVzIDogdGhpc1Nwb3RSYWRpdXMxLFxyXG5cdFxyXG5cdFx0XHRcdFx0XHRzcG90Q29sb3IgOiB0aGlzU3BvdENvbG9yLFxyXG5cdFx0XHRcdFx0XHRtaW5TcG90Q29sb3IgOiB0aGlzTWluU3BvdENvbG9yMSxcclxuXHRcdFx0XHRcdFx0bWF4U3BvdENvbG9yIDogdGhpc01heFNwb3RDb2xvcjEsXHJcblx0XHRcdFx0XHRcdGhpZ2hsaWdodFNwb3RDb2xvciA6IHRoaXNoaWdobGlnaHRTcG90Q29sb3IxLFxyXG5cdFx0XHRcdFx0XHRoaWdobGlnaHRMaW5lQ29sb3IgOiB0aGlzSGlnaGxpZ2h0TGluZUNvbG9yMSxcclxuXHRcclxuXHRcdFx0XHRcdFx0dmFsdWVTcG90cyA6IHNwYXJrbGluZVZhbHVlU3BvdHMxLFxyXG5cdFxyXG5cdFx0XHRcdFx0XHRsaW5lV2lkdGggOiB0aGlzTGluZVdpZHRoMSxcclxuXHRcdFx0XHRcdFx0d2lkdGggOiBzcGFya2xpbmVXaWR0aCxcclxuXHRcdFx0XHRcdFx0aGVpZ2h0IDogc3BhcmtsaW5lSGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHRsaW5lQ29sb3IgOiB0aGlzTGluZUNvbG9yMSxcclxuXHRcdFx0XHRcdFx0ZmlsbENvbG9yIDogdGhpc0ZpbGxDb2xvcjFcclxuXHRcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFxyXG5cdFx0XHRcdFx0JHRoaXMuc3BhcmtsaW5lKCR0aGlzLmRhdGEoJ3NwYXJrbGluZS1saW5lLXZhbCcpLCB7XHJcblx0XHJcblx0XHRcdFx0XHRcdHR5cGUgOiAnbGluZScsXHJcblx0XHRcdFx0XHRcdHNwb3RSYWRpdXMgOiB0aGlzU3BvdFJhZGl1czIsXHJcblx0XHJcblx0XHRcdFx0XHRcdHNwb3RDb2xvciA6IHRoaXNTcG90Q29sb3IsXHJcblx0XHRcdFx0XHRcdG1pblNwb3RDb2xvciA6IHRoaXNNaW5TcG90Q29sb3IyLFxyXG5cdFx0XHRcdFx0XHRtYXhTcG90Q29sb3IgOiB0aGlzTWF4U3BvdENvbG9yMixcclxuXHRcdFx0XHRcdFx0aGlnaGxpZ2h0U3BvdENvbG9yIDogdGhpc2hpZ2hsaWdodFNwb3RDb2xvcjIsXHJcblx0XHRcdFx0XHRcdGhpZ2hsaWdodExpbmVDb2xvciA6IHRoaXNIaWdobGlnaHRMaW5lQ29sb3IyLFxyXG5cdFxyXG5cdFx0XHRcdFx0XHR2YWx1ZVNwb3RzIDogc3BhcmtsaW5lVmFsdWVTcG90czIsXHJcblx0XHJcblx0XHRcdFx0XHRcdGxpbmVXaWR0aCA6IHRoaXNMaW5lV2lkdGgyLFxyXG5cdFx0XHRcdFx0XHR3aWR0aCA6IHNwYXJrbGluZVdpZHRoLFxyXG5cdFx0XHRcdFx0XHRoZWlnaHQgOiBzcGFya2xpbmVIZWlnaHQsXHJcblx0XHRcdFx0XHRcdGxpbmVDb2xvciA6IHRoaXNMaW5lQ29sb3IyLFxyXG5cdFx0XHRcdFx0XHRjb21wb3NpdGUgOiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRmaWxsQ29sb3IgOiB0aGlzRmlsbENvbG9yMlxyXG5cdFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdCR0aGlzID0gbnVsbDtcclxuXHRcclxuXHRcdFx0XHR9XHJcblx0XHJcblx0XHRcdH0pO1xyXG5cdFxyXG5cdFx0fS8vIGVuZCBpZlxyXG5cdFxyXG5cdFx0LypcclxuXHRcdCAqIEVBU1kgUElFIENIQVJUU1xyXG5cdFx0ICogREVQRU5ERU5DWToganMvcGx1Z2lucy9lYXN5LXBpZS1jaGFydC9qcXVlcnkuZWFzeS1waWUtY2hhcnQubWluLmpzXHJcblx0XHQgKiBVc2FnZTogPGRpdiBjbGFzcz1cImVhc3ktcGllLWNoYXJ0IHR4dC1jb2xvci1vcmFuZ2VEYXJrXCIgZGF0YS1waWUtcGVyY2VudD1cIjMzXCIgZGF0YS1waWUtc2l6ZT1cIjcyXCIgZGF0YS1zaXplPVwiNzJcIj5cclxuXHRcdCAqXHRcdFx0PHNwYW4gY2xhc3M9XCJwZXJjZW50IHBlcmNlbnQtc2lnblwiPjM1PC9zcGFuPlxyXG5cdFx0ICogXHQgIFx0ICA8L2Rpdj5cclxuXHRcdCAqL1xyXG5cdFxyXG5cdFx0aWYgKCQuZm4uZWFzeVBpZUNoYXJ0KSB7XHJcblx0XHJcblx0XHRcdCQoJy5lYXN5LXBpZS1jaGFydCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHRcdGJhckNvbG9yID0gJHRoaXMuY3NzKCdjb2xvcicpIHx8ICR0aGlzLmRhdGEoJ3BpZS1jb2xvcicpLFxyXG5cdFx0XHRcdCAgICB0cmFja0NvbG9yID0gJHRoaXMuZGF0YSgncGllLXRyYWNrLWNvbG9yJykgfHwgJ3JnYmEoMCwwLDAsMC4wNCknLFxyXG5cdFx0XHRcdCAgICBzaXplID0gcGFyc2VJbnQoJHRoaXMuZGF0YSgncGllLXNpemUnKSkgfHwgMjU7XHJcblx0XHRcdFx0ICAgIFxyXG5cdFx0XHRcdCR0aGlzLmVhc3lQaWVDaGFydCh7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGJhckNvbG9yIDogYmFyQ29sb3IsXHJcblx0XHRcdFx0XHR0cmFja0NvbG9yIDogdHJhY2tDb2xvcixcclxuXHRcdFx0XHRcdHNjYWxlQ29sb3IgOiBmYWxzZSxcclxuXHRcdFx0XHRcdGxpbmVDYXAgOiAnYnV0dCcsXHJcblx0XHRcdFx0XHRsaW5lV2lkdGggOiBwYXJzZUludChzaXplIC8gOC41KSxcclxuXHRcdFx0XHRcdGFuaW1hdGUgOiAxNTAwLFxyXG5cdFx0XHRcdFx0cm90YXRlIDogLTkwLFxyXG5cdFx0XHRcdFx0c2l6ZSA6IHNpemUsXHJcblx0XHRcdFx0XHRvblN0ZXA6IGZ1bmN0aW9uKGZyb20sIHRvLCBwZXJjZW50KSB7XHJcbiAgICAgICAgICAgIFx0XHRcdCQodGhpcy5lbCkuZmluZCgnLnBlcmNlbnQnKS50ZXh0KE1hdGgucm91bmQocGVyY2VudCkpO1xyXG4gICAgICAgIFx0XHRcdH1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdCR0aGlzID0gbnVsbDtcclxuXHRcdFx0fSk7XHJcblx0XHJcblx0XHR9IC8vIGVuZCBpZlxyXG5cdFxyXG5cdH1cclxuLyogfiBFTkQ6IElOSVRJQUxJWkUgQ0hBUlRTICovXHJcblxyXG4vKlxyXG4gKiBJTklUSUFMSVpFIEpBUlZJUyBXSURHRVRTXHJcbiAqIFNldHVwIERlc2t0b3AgV2lkZ2V0c1xyXG4gKi9cclxuXHRmdW5jdGlvbiBzZXR1cF93aWRnZXRzX2Rlc2t0b3AoKSB7XHJcblx0XHJcblx0XHRpZiAoJC5mbi5qYXJ2aXNXaWRnZXRzICYmIGVuYWJsZUphcnZpc1dpZGdldHMpIHtcclxuXHRcclxuXHRcdFx0JCgnI3dpZGdldC1ncmlkJykuamFydmlzV2lkZ2V0cyh7XHJcblx0XHJcblx0XHRcdFx0Z3JpZCA6ICdhcnRpY2xlJyxcclxuXHRcdFx0XHR3aWRnZXRzIDogJy5qYXJ2aXN3aWRnZXQnLFxyXG5cdFx0XHRcdGxvY2FsU3RvcmFnZSA6IGxvY2FsU3RvcmFnZUphcnZpc1dpZGdldHMsXHJcblx0XHRcdFx0ZGVsZXRlU2V0dGluZ3NLZXkgOiAnI2RlbGV0ZXNldHRpbmdza2V5LW9wdGlvbnMnLFxyXG5cdFx0XHRcdHNldHRpbmdzS2V5TGFiZWwgOiAnUmVzZXQgc2V0dGluZ3M/JyxcclxuXHRcdFx0XHRkZWxldGVQb3NpdGlvbktleSA6ICcjZGVsZXRlcG9zaXRpb25rZXktb3B0aW9ucycsXHJcblx0XHRcdFx0cG9zaXRpb25LZXlMYWJlbCA6ICdSZXNldCBwb3NpdGlvbj8nLFxyXG5cdFx0XHRcdHNvcnRhYmxlIDogc29ydGFibGVKYXJ2aXNXaWRnZXRzLFxyXG5cdFx0XHRcdGJ1dHRvbnNIaWRkZW4gOiBmYWxzZSxcclxuXHRcdFx0XHQvLyB0b2dnbGUgYnV0dG9uXHJcblx0XHRcdFx0dG9nZ2xlQnV0dG9uIDogdHJ1ZSxcclxuXHRcdFx0XHR0b2dnbGVDbGFzcyA6ICdmYSBmYS1taW51cyB8IGZhIGZhLXBsdXMnLFxyXG5cdFx0XHRcdHRvZ2dsZVNwZWVkIDogMjAwLFxyXG5cdFx0XHRcdG9uVG9nZ2xlIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHQvLyBkZWxldGUgYnRuXHJcblx0XHRcdFx0ZGVsZXRlQnV0dG9uIDogdHJ1ZSxcclxuXHRcdFx0XHRkZWxldGVNc2c6J1dhcm5pbmc6IFRoaXMgYWN0aW9uIGNhbm5vdCBiZSB1bmRvbmUhJyxcclxuXHRcdFx0XHRkZWxldGVDbGFzcyA6ICdmYSBmYS10aW1lcycsXHJcblx0XHRcdFx0ZGVsZXRlU3BlZWQgOiAyMDAsXHJcblx0XHRcdFx0b25EZWxldGUgOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdC8vIGVkaXQgYnRuXHJcblx0XHRcdFx0ZWRpdEJ1dHRvbiA6IHRydWUsXHJcblx0XHRcdFx0ZWRpdFBsYWNlaG9sZGVyIDogJy5qYXJ2aXN3aWRnZXQtZWRpdGJveCcsXHJcblx0XHRcdFx0ZWRpdENsYXNzIDogJ2ZhIGZhLWNvZyB8IGZhIGZhLXNhdmUnLFxyXG5cdFx0XHRcdGVkaXRTcGVlZCA6IDIwMCxcclxuXHRcdFx0XHRvbkVkaXQgOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdC8vIGNvbG9yIGJ1dHRvblxyXG5cdFx0XHRcdGNvbG9yQnV0dG9uIDogdHJ1ZSxcclxuXHRcdFx0XHQvLyBmdWxsIHNjcmVlblxyXG5cdFx0XHRcdGZ1bGxzY3JlZW5CdXR0b24gOiB0cnVlLFxyXG5cdFx0XHRcdGZ1bGxzY3JlZW5DbGFzcyA6ICdmYSBmYS1leHBhbmQgfCBmYSBmYS1jb21wcmVzcycsXHJcblx0XHRcdFx0ZnVsbHNjcmVlbkRpZmYgOiAzLFxyXG5cdFx0XHRcdG9uRnVsbHNjcmVlbiA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Ly8gY3VzdG9tIGJ0blxyXG5cdFx0XHRcdGN1c3RvbUJ1dHRvbiA6IGZhbHNlLFxyXG5cdFx0XHRcdGN1c3RvbUNsYXNzIDogJ2ZvbGRlci0xMCB8IG5leHQtMTAnLFxyXG5cdFx0XHRcdGN1c3RvbVN0YXJ0IDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRhbGVydCgnSGVsbG8geW91LCB0aGlzIGlzIGEgY3VzdG9tIGJ1dHRvbi4uLicpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y3VzdG9tRW5kIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRhbGVydCgnYnllLCB0aWxsIG5leHQgdGltZS4uLicpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Ly8gb3JkZXJcclxuXHRcdFx0XHRidXR0b25PcmRlciA6ICclcmVmcmVzaCUgJWN1c3RvbSUgJWVkaXQlICV0b2dnbGUlICVmdWxsc2NyZWVuJSAlZGVsZXRlJScsXHJcblx0XHRcdFx0b3BhY2l0eSA6IDEuMCxcclxuXHRcdFx0XHRkcmFnSGFuZGxlIDogJz4gaGVhZGVyJyxcclxuXHRcdFx0XHRwbGFjZWhvbGRlckNsYXNzIDogJ2phcnZpc3dpZGdldC1wbGFjZWhvbGRlcicsXHJcblx0XHRcdFx0aW5kaWNhdG9yIDogdHJ1ZSxcclxuXHRcdFx0XHRpbmRpY2F0b3JUaW1lIDogNjAwLFxyXG5cdFx0XHRcdGFqYXggOiB0cnVlLFxyXG5cdFx0XHRcdHRpbWVzdGFtcFBsYWNlaG9sZGVyIDogJy5qYXJ2aXN3aWRnZXQtdGltZXN0YW1wJyxcclxuXHRcdFx0XHR0aW1lc3RhbXBGb3JtYXQgOiAnTGFzdCB1cGRhdGU6ICVtJS8lZCUvJXklICVoJTolaSU6JXMlJyxcclxuXHRcdFx0XHRyZWZyZXNoQnV0dG9uIDogdHJ1ZSxcclxuXHRcdFx0XHRyZWZyZXNoQnV0dG9uQ2xhc3MgOiAnZmEgZmEtcmVmcmVzaCcsXHJcblx0XHRcdFx0bGFiZWxFcnJvciA6ICdTb3JyeSBidXQgdGhlcmUgd2FzIGEgZXJyb3I6JyxcclxuXHRcdFx0XHRsYWJlbFVwZGF0ZWQgOiAnTGFzdCBVcGRhdGU6JyxcclxuXHRcdFx0XHRsYWJlbFJlZnJlc2ggOiAnUmVmcmVzaCcsXHJcblx0XHRcdFx0bGFiZWxEZWxldGUgOiAnRGVsZXRlIHdpZGdldDonLFxyXG5cdFx0XHRcdGFmdGVyTG9hZCA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0cnRsIDogZmFsc2UsIC8vIGJlc3Qgbm90IHRvIHRvZ2dsZSB0aGlzIVxyXG5cdFx0XHRcdG9uQ2hhbmdlIDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG9uU2F2ZSA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRhamF4bmF2IDogJC5uYXZBc0FqYXggLy8gZGVjbGVhcnMgaG93IHRoZSBsb2NhbHN0b3JhZ2Ugc2hvdWxkIGJlIHNhdmVkIChIVE1MIG9yIEFKQVggVmVyc2lvbilcclxuXHRcclxuXHRcdFx0fSk7XHJcblx0XHJcblx0XHR9XHJcblx0XHJcblx0fVxyXG4vKlxyXG4gKiBTRVRVUCBERVNLVE9QIFdJREdFVFxyXG4gKi9cclxuXHRmdW5jdGlvbiBzZXR1cF93aWRnZXRzX21vYmlsZSgpIHtcclxuXHRcclxuXHRcdGlmIChlbmFibGVNb2JpbGVXaWRnZXRzICYmIGVuYWJsZUphcnZpc1dpZGdldHMpIHtcclxuXHRcdFx0c2V0dXBfd2lkZ2V0c19kZXNrdG9wKCk7XHJcblx0XHR9XHJcblx0XHJcblx0fVxyXG4vKiB+IEVORDogSU5JVElBTElaRSBKQVJWSVMgV0lER0VUUyAqL1xyXG5cclxuLypcclxuICogR09PR0xFIE1BUFNcclxuICogZGVzY3JpcHRpb246IEFwcGVuZCBnb29nbGUgbWFwcyB0byBoZWFkIGR5bmFtaWNhbGx5IChvbmx5IGV4ZWN1dGUgZm9yIGFqYXggdmVyc2lvbilcclxuICogTG9hZHMgYXQgdGhlIGJlZ2luaW5nIGZvciBhamF4IHBhZ2VzXHJcbiAqL1xyXG5cdGlmICgkLm5hdkFzQWpheCB8fCAkKFwiLmdvb2dsZV9tYXBzXCIpKXtcclxuXHRcdHZhciBnTWFwc0xvYWRlZCA9IGZhbHNlO1xyXG5cdFx0d2luZG93LmdNYXBzQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Z01hcHNMb2FkZWQgPSB0cnVlO1xyXG5cdFx0XHQkKHdpbmRvdykudHJpZ2dlcignZ01hcHNMb2FkZWQnKTtcclxuXHRcdH07XHJcblx0XHR3aW5kb3cubG9hZEdvb2dsZU1hcHMgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0aWYgKGdNYXBzTG9hZGVkKVxyXG5cdFx0XHRcdHJldHVybiB3aW5kb3cuZ01hcHNDYWxsYmFjaygpO1xyXG5cdFx0XHR2YXIgc2NyaXB0X3RhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG5cdFx0XHRzY3JpcHRfdGFnLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0L2phdmFzY3JpcHRcIik7XHJcblx0XHRcdHNjcmlwdF90YWcuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiaHR0cDovL21hcHMuZ29vZ2xlLmNvbS9tYXBzL2FwaS9qcz9zZW5zb3I9ZmFsc2UmY2FsbGJhY2s9Z01hcHNDYWxsYmFja1wiKTtcclxuXHRcdFx0KGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmFwcGVuZENoaWxkKHNjcmlwdF90YWcpO1xyXG5cdFx0fTtcclxuXHR9XHJcbi8qIH4gRU5EOiBHT09HTEUgTUFQUyAqL1xyXG5cclxuLypcclxuICogTE9BRCBTQ1JJUFRTXHJcbiAqIFVzYWdlOlxyXG4gKiBEZWZpbmUgZnVuY3Rpb24gPSBteVByZXR0eUNvZGUgKCkuLi5cclxuICogbG9hZFNjcmlwdChcImpzL215X2xvdmVseV9zY3JpcHQuanNcIiwgbXlQcmV0dHlDb2RlKTtcclxuICovXHJcblx0ZnVuY3Rpb24gbG9hZFNjcmlwdChzY3JpcHROYW1lLCBjYWxsYmFjaykge1xyXG5cdFxyXG5cdFx0aWYgKCFqc0FycmF5W3NjcmlwdE5hbWVdKSB7XHJcblx0XHRcdGpzQXJyYXlbc2NyaXB0TmFtZV0gPSB0cnVlO1xyXG5cdFxyXG5cdFx0XHQvLyBhZGRpbmcgdGhlIHNjcmlwdCB0YWcgdG8gdGhlIGhlYWQgYXMgc3VnZ2VzdGVkIGJlZm9yZVxyXG5cdFx0XHR2YXIgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0sXHJcblx0XHRcdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcblx0XHRcdHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XHJcblx0XHRcdHNjcmlwdC5zcmMgPSBzY3JpcHROYW1lO1xyXG5cdFxyXG5cdFx0XHQvLyB0aGVuIGJpbmQgdGhlIGV2ZW50IHRvIHRoZSBjYWxsYmFjayBmdW5jdGlvblxyXG5cdFx0XHQvLyB0aGVyZSBhcmUgc2V2ZXJhbCBldmVudHMgZm9yIGNyb3NzIGJyb3dzZXIgY29tcGF0aWJpbGl0eVxyXG5cdFx0XHRzY3JpcHQub25sb2FkID0gY2FsbGJhY2s7XHJcblx0XHJcblx0XHRcdC8vIGZpcmUgdGhlIGxvYWRpbmdcclxuXHRcdFx0Ym9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly8gY2xlYXIgRE9NIHJlZmVyZW5jZVxyXG5cdFx0XHQvL2JvZHkgPSBudWxsO1xyXG5cdFx0XHQvL3NjcmlwdCA9IG51bGw7XHJcblx0XHJcblx0XHR9IGVsc2UgaWYgKGNhbGxiYWNrKSB7XHJcblx0XHRcdC8vIGNoYW5nZWQgZWxzZSB0byBlbHNlIGlmKGNhbGxiYWNrKVxyXG5cdFx0XHRpZiAoZGVidWdTdGF0ZSl7XHJcblx0XHRcdFx0cm9vdC5yb290LmNvbnNvbGUubG9nKFwiVGhpcyBzY3JpcHQgd2FzIGFscmVhZHkgbG9hZGVkICVjOiBcIiArIHNjcmlwdE5hbWUsIGRlYnVnU3R5bGVfd2FybmluZyk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly9leGVjdXRlIGZ1bmN0aW9uXHJcblx0XHRcdGNhbGxiYWNrKCk7XHJcblx0XHR9XHJcblx0XHJcblx0fVxyXG4vKiB+IEVORDogTE9BRCBTQ1JJUFRTICovXHJcblxyXG4vKlxyXG4qIEFQUCBBSkFYIFJFUVVFU1QgU0VUVVBcclxuKiBEZXNjcmlwdGlvbjogRXhlY3V0ZXMgYW5kIGZldGNoZXMgYWxsIGFqYXggcmVxdWVzdHMgYWxzb1xyXG4qIHVwZGF0ZXMgbmFpdmdhdGlvbiBlbGVtZW50cyB0byBhY3RpdmVcclxuKi9cclxuXHRpZigkLm5hdkFzQWpheCkge1xyXG5cdCAgICAvLyBmaXJlIHRoaXMgb24gcGFnZSBsb2FkIGlmIG5hdiBleGlzdHNcclxuXHQgICAgaWYgKCQoJ25hdicpLmxlbmd0aCkge1xyXG5cdFx0ICAgIGNoZWNrVVJMKCk7XHJcblx0ICAgIH1cclxuXHRcclxuXHQgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ25hdiBhW2hyZWYhPVwiI1wiXScsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdCAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHQgICAgdmFyICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG5cdFxyXG5cdFx0ICAgIC8vIGlmIHBhcmVudCBpcyBub3QgYWN0aXZlIHRoZW4gZ2V0IGhhc2gsIG9yIGVsc2UgcGFnZSBpcyBhc3N1bWVkIHRvIGJlIGxvYWRlZFxyXG5cdFx0XHRpZiAoISR0aGlzLnBhcmVudCgpLmhhc0NsYXNzKFwiYWN0aXZlXCIpICYmICEkdGhpcy5hdHRyKCd0YXJnZXQnKSkge1xyXG5cdFxyXG5cdFx0XHQgICAgLy8gdXBkYXRlIHdpbmRvdyB3aXRoIGhhc2hcclxuXHRcdFx0ICAgIC8vIHlvdSBjb3VsZCBhbHNvIGRvIGhlcmU6ICB0aGlzRGV2aWNlID09PSBcIm1vYmlsZVwiIC0gYW5kIHNhdmUgYSBsaXR0bGUgbW9yZSBtZW1vcnlcclxuXHRcclxuXHRcdFx0ICAgIGlmICgkLnJvb3RfLmhhc0NsYXNzKCdtb2JpbGUtdmlldy1hY3RpdmF0ZWQnKSkge1xyXG5cdFx0XHRcdCAgICAkLnJvb3RfLnJlbW92ZUNsYXNzKCdoaWRkZW4tbWVudScpO1xyXG5cdFx0XHRcdCAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoXCJoaWRkZW4tbWVudS1tb2JpbGUtbG9ja1wiKTtcclxuXHRcdFx0XHQgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdGlmICh3aW5kb3cubG9jYXRpb24uc2VhcmNoKSB7XHJcblx0XHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPVxyXG5cdFx0XHRcdFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSh3aW5kb3cubG9jYXRpb24uc2VhcmNoLCAnJylcclxuXHRcdFx0XHRcdFx0XHRcdFx0LnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLmhhc2gsICcnKSArICcjJyArICR0aGlzLmF0dHIoJ2hyZWYnKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaGFzaCA9ICR0aGlzLmF0dHIoJ2hyZWYnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdCAgICB9LCAxNTApO1xyXG5cdFx0XHRcdCAgICAvLyBpdCBtYXkgbm90IG5lZWQgdGhpcyBkZWxheS4uLlxyXG5cdFx0XHQgICAgfSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmICh3aW5kb3cubG9jYXRpb24uc2VhcmNoKSB7XHJcblx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID1cclxuXHRcdFx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gsICcnKVxyXG5cdFx0XHRcdFx0XHRcdFx0LnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLmhhc2gsICcnKSArICcjJyArICR0aGlzLmF0dHIoJ2hyZWYnKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJHRoaXMuYXR0cignaHJlZicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHQgICAgfVxyXG5cdFx0XHQgICAgXHJcblx0XHRcdCAgICAvLyBjbGVhciBET00gcmVmZXJlbmNlXHJcblx0XHRcdCAgICAvLyAkdGhpcyA9IG51bGw7XHJcblx0XHQgICAgfVxyXG5cdFxyXG5cdCAgICB9KTtcclxuXHRcclxuXHQgICAgLy8gZmlyZSBsaW5rcyB3aXRoIHRhcmdldHMgb24gZGlmZmVyZW50IHdpbmRvd1xyXG5cdCAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnbmF2IGFbdGFyZ2V0PVwiX2JsYW5rXCJdJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdCAgICB2YXIgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcblx0XHJcblx0XHQgICAgd2luZG93Lm9wZW4oJHRoaXMuYXR0cignaHJlZicpKTtcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIC8vIGZpcmUgbGlua3Mgd2l0aCB0YXJnZXRzIG9uIHNhbWUgd2luZG93XHJcblx0ICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICduYXYgYVt0YXJnZXQ9XCJfdG9wXCJdJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdCAgICB2YXIgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcblx0XHJcblx0XHQgICAgd2luZG93LmxvY2F0aW9uID0gKCR0aGlzLmF0dHIoJ2hyZWYnKSk7XHJcblx0ICAgIH0pO1xyXG5cdFxyXG5cdCAgICAvLyBhbGwgbGlua3Mgd2l0aCBoYXNoIHRhZ3MgYXJlIGlnbm9yZWRcclxuXHQgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ25hdiBhW2hyZWY9XCIjXCJdJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0ICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHQgICAgfSk7XHJcblx0XHJcblx0ICAgIC8vIERPIG9uIGhhc2ggY2hhbmdlXHJcblx0ICAgICQod2luZG93KS5vbignaGFzaGNoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAgIGNoZWNrVVJMKCk7XHJcblx0ICAgIH0pO1xyXG5cdH1cclxuLypcclxuICogQ0hFQ0sgVE8gU0VFIElGIFVSTCBFWElTVFNcclxuICovXHJcblx0ZnVuY3Rpb24gY2hlY2tVUkwoKSB7XHJcblx0XHJcblx0XHQvL2dldCB0aGUgdXJsIGJ5IHJlbW92aW5nIHRoZSBoYXNoXHJcblx0XHQvL3ZhciB1cmwgPSBsb2NhdGlvbi5oYXNoLnJlcGxhY2UoL14jLywgJycpO1xyXG5cdFx0dmFyIHVybCA9IGxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKS5zcGxpY2UoMSkuam9pbignIycpO1xyXG5cdFx0Ly9CRUdJTjogSUUxMSBXb3JrIEFyb3VuZFxyXG5cdFx0aWYgKCF1cmwpIHtcclxuXHRcdFxyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHZhciBkb2N1bWVudFVybCA9IHdpbmRvdy5kb2N1bWVudC5VUkw7XHJcblx0XHRcdFx0aWYgKGRvY3VtZW50VXJsKSB7XHJcblx0XHRcdFx0XHRpZiAoZG9jdW1lbnRVcmwuaW5kZXhPZignIycsIDApID4gMCAmJiBkb2N1bWVudFVybC5pbmRleE9mKCcjJywgMCkgPCAoZG9jdW1lbnRVcmwubGVuZ3RoICsgMSkpIHtcclxuXHRcdFx0XHRcdFx0dXJsID0gZG9jdW1lbnRVcmwuc3Vic3RyaW5nKGRvY3VtZW50VXJsLmluZGV4T2YoJyMnLCAwKSArIDEpO1xyXG5cdFx0XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcclxuXHRcdFx0fSBjYXRjaCAoZXJyKSB7fVxyXG5cdFx0fVxyXG5cdFx0Ly9FTkQ6IElFMTEgV29yayBBcm91bmRcclxuXHRcclxuXHRcdGNvbnRhaW5lciA9ICQoJyNjb250ZW50Jyk7XHJcblx0XHQvLyBEbyB0aGlzIGlmIHVybCBleGlzdHMgKGZvciBwYWdlIHJlZnJlc2gsIGV0Yy4uLilcclxuXHRcdGlmICh1cmwpIHtcclxuXHRcdFx0Ly8gcmVtb3ZlIGFsbCBhY3RpdmUgY2xhc3NcclxuXHRcdFx0JCgnbmF2IGxpLmFjdGl2ZScpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHQvLyBtYXRjaCB0aGUgdXJsIGFuZCBhZGQgdGhlIGFjdGl2ZSBjbGFzc1xyXG5cdFx0XHQkKCduYXYgbGk6aGFzKGFbaHJlZj1cIicgKyB1cmwgKyAnXCJdKScpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHR2YXIgdGl0bGUgPSAoJCgnbmF2IGFbaHJlZj1cIicgKyB1cmwgKyAnXCJdJykuYXR0cigndGl0bGUnKSk7XHJcblx0XHJcblx0XHRcdC8vIGNoYW5nZSBwYWdlIHRpdGxlIGZyb20gZ2xvYmFsIHZhclxyXG5cdFx0XHRkb2N1bWVudC50aXRsZSA9ICh0aXRsZSB8fCBkb2N1bWVudC50aXRsZSk7XHJcblx0XHRcdFxyXG5cdFx0XHQvLyBkZWJ1Z1N0YXRlXHJcblx0XHRcdGlmIChkZWJ1Z1N0YXRlKXtcclxuXHRcdFx0XHRyb290LmNvbnNvbGUubG9nKFwiUGFnZSB0aXRsZTogJWMgXCIgKyBkb2N1bWVudC50aXRsZSwgZGVidWdTdHlsZV9ncmVlbik7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdC8vIHBhcnNlIHVybCB0byBqcXVlcnlcclxuXHRcdFx0bG9hZFVSTCh1cmwgKyBsb2NhdGlvbi5zZWFyY2gsIGNvbnRhaW5lcik7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcclxuXHRcdFx0Ly8gZ3JhYiB0aGUgZmlyc3QgVVJMIGZyb20gbmF2XHJcblx0XHRcdHZhciAkdGhpcyA9ICQoJ25hdiA+IHVsID4gbGk6Zmlyc3QtY2hpbGQgPiBhW2hyZWYhPVwiI1wiXScpO1xyXG5cdFxyXG5cdFx0XHQvL3VwZGF0ZSBoYXNoXHJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJHRoaXMuYXR0cignaHJlZicpO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly9jbGVhciBkb20gcmVmZXJlbmNlXHJcblx0XHRcdCR0aGlzID0gbnVsbDtcclxuXHRcclxuXHRcdH1cclxuXHRcclxuXHR9XHJcbi8qXHJcbiAqIExPQUQgQUpBWCBQQUdFU1xyXG4gKi8gXHJcblx0ZnVuY3Rpb24gbG9hZFVSTCh1cmwsIGNvbnRhaW5lcikge1xyXG5cclxuXHRcdC8vIGRlYnVnU3RhdGVcclxuXHRcdGlmIChkZWJ1Z1N0YXRlKXtcclxuXHRcdFx0cm9vdC5yb290LmNvbnNvbGUubG9nKFwiTG9hZGluZyBVUkw6ICVjXCIgKyB1cmwsIGRlYnVnU3R5bGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHR5cGUgOiBcIkdFVFwiLFxyXG5cdFx0XHR1cmwgOiB1cmwsXHJcblx0XHRcdGRhdGFUeXBlIDogJ2h0bWwnLFxyXG5cdFx0XHRjYWNoZSA6IHRydWUsIC8vICh3YXJuaW5nOiBzZXR0aW5nIGl0IHRvIGZhbHNlIHdpbGwgY2F1c2UgYSB0aW1lc3RhbXAgYW5kIHdpbGwgY2FsbCB0aGUgcmVxdWVzdCB0d2ljZSlcclxuXHRcdFx0YmVmb3JlU2VuZCA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vSUUxMSBidWcgZml4IGZvciBnb29nbGVtYXBzIChkZWxldGUgYWxsIGdvb2dsZSBtYXAgaW5zdGFuY2VzKVxyXG5cdFx0XHRcdC8vY2hlY2sgaWYgdGhlIHBhZ2UgaXMgYWpheCA9IHRydWUsIGhhcyBnb29nbGUgbWFwIGNsYXNzIGFuZCB0aGUgY29udGFpbmVyIGlzICNjb250ZW50XHJcblx0XHRcdFx0aWYgKCQubmF2QXNBamF4ICYmICQoXCIuZ29vZ2xlX21hcHNcIilbMF0gJiYgKGNvbnRhaW5lclswXSA9PSAkKFwiI2NvbnRlbnRcIilbMF0pICkge1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQvLyB0YXJnZXQgZ21hcHMgaWYgYW55IG9uIHBhZ2VcclxuXHRcdFx0XHRcdHZhciBjb2xsZWN0aW9uID0gJChcIi5nb29nbGVfbWFwc1wiKSxcclxuXHRcdFx0XHRcdFx0aSA9IDA7XHJcblx0XHRcdFx0XHQvLyBydW4gZm9yIGVhY2hcdG1hcFxyXG5cdFx0XHRcdFx0Y29sbGVjdGlvbi5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0ICAgIGkgKys7XHJcblx0XHRcdFx0XHQgICAgLy8gZ2V0IG1hcCBpZCBmcm9tIGNsYXNzIGVsZW1lbnRzXHJcblx0XHRcdFx0XHQgICAgdmFyIGRpdkRlYWxlck1hcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpO1xyXG5cdFx0XHRcdFx0ICAgIFxyXG5cdFx0XHRcdFx0ICAgIGlmKGkgPT0gY29sbGVjdGlvbi5sZW5ndGggKyAxKSB7XHJcblx0XHRcdFx0XHRcdCAgICAvLyBcImNhbGxiYWNrXCJcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBkZXN0cm95IGV2ZXJ5IG1hcCBmb3VuZFxyXG5cdFx0XHRcdFx0XHRcdGlmIChkaXZEZWFsZXJNYXApIGRpdkRlYWxlck1hcC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRpdkRlYWxlck1hcCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIGRlYnVnU3RhdGVcclxuXHRcdFx0XHRcdFx0XHRpZiAoZGVidWdTdGF0ZSl7XHJcblx0XHRcdFx0XHRcdFx0XHRyb290LmNvbnNvbGUubG9nKFwiRGVzdHJveWluZyBtYXBzLi4uLi4uLi4uJWNcIiArIHRoaXMuaWQsIGRlYnVnU3R5bGVfd2FybmluZyk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHQvLyBkZWJ1Z1N0YXRlXHJcblx0XHRcdFx0XHRpZiAoZGVidWdTdGF0ZSl7XHJcblx0XHRcdFx0XHRcdHJvb3QuY29uc29sZS5sb2coXCLinJQgR29vZ2xlIG1hcCBpbnN0YW5jZXMgbnVrZWQhISFcIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHR9IC8vZW5kIGZpeFxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vIGRlc3Ryb3kgYWxsIGRhdGF0YWJsZSBpbnN0YW5jZXNcclxuXHRcdFx0XHRpZiAoICQubmF2QXNBamF4ICYmICQoJy5kYXRhVGFibGVzX3dyYXBwZXInKVswXSAmJiAoY29udGFpbmVyWzBdID09ICQoXCIjY29udGVudFwiKVswXSkgKSB7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdHZhciB0YWJsZXMgPSAkLmZuLmRhdGFUYWJsZS5mblRhYmxlcyh0cnVlKTtcdFx0XHRcdFxyXG5cdFx0XHRcdFx0JCh0YWJsZXMpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0aWYoJCh0aGlzKS5maW5kKCcuZGV0YWlscy1jb250cm9sJykubGVuZ3RoICE9IDApIHtcclxuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLmZpbmQoJyonKS5hZGRCYWNrKCkub2ZmKCkucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5kYXRhVGFibGUoKS5mbkRlc3Ryb3koKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHQkKHRoaXMpLmRhdGFUYWJsZSgpLmZuRGVzdHJveSgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQgICAgXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8gZGVidWdTdGF0ZVxyXG5cdFx0XHRcdFx0aWYgKGRlYnVnU3RhdGUpe1xyXG5cdFx0XHRcdFx0XHRyb290LmNvbnNvbGUubG9nKFwi4pyUIERhdGF0YWJsZSBpbnN0YW5jZXMgbnVrZWQhISFcIik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIGVuZCBkZXN0cm95XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly8gcG9wIGludGVydmFscyAoZGVzdHJveXMgamFydmlzd2lkZ2V0IHJlbGF0ZWQgaW50ZXJ2YWxzKVxyXG5cdFx0XHRcdGlmICggJC5uYXZBc0FqYXggJiYgJC5pbnRlcnZhbEFyci5sZW5ndGggPiAwICYmIChjb250YWluZXJbMF0gPT0gJChcIiNjb250ZW50XCIpWzBdKSAmJiBlbmFibGVKYXJ2aXNXaWRnZXRzICkge1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHR3aGlsZSgkLmludGVydmFsQXJyLmxlbmd0aCA+IDApXHJcblx0ICAgICAgICBcdFx0XHRjbGVhckludGVydmFsKCQuaW50ZXJ2YWxBcnIucG9wKCkpO1xyXG5cdCAgICAgICAgXHRcdFx0Ly8gZGVidWdTdGF0ZVxyXG5cdFx0XHRcdFx0XHRpZiAoZGVidWdTdGF0ZSl7XHJcblx0XHRcdFx0XHRcdFx0cm9vdC5jb25zb2xlLmxvZyhcIuKclCBBbGwgSmFydmlzV2lkZ2V0IGludGVydmFscyBjbGVhcmVkXCIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0ICAgICAgICBcdFx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gZW5kIHBvcCBpbnRlcnZhbHNcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQvLyBkZXN0cm95IGFsbCB3aWRnZXQgaW5zdGFuY2VzXHJcblx0XHRcdFx0aWYgKCAkLm5hdkFzQWpheCAmJiAoY29udGFpbmVyWzBdID09ICQoXCIjY29udGVudFwiKVswXSkgJiYgZW5hYmxlSmFydmlzV2lkZ2V0cyAmJiAkKFwiI3dpZGdldC1ncmlkXCIpWzBdICkge1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQkKFwiI3dpZGdldC1ncmlkXCIpLmphcnZpc1dpZGdldHMoJ2Rlc3Ryb3knKTtcclxuXHRcdFx0XHRcdC8vIGRlYnVnU3RhdGVcclxuXHRcdFx0XHRcdGlmIChkZWJ1Z1N0YXRlKXtcclxuXHRcdFx0XHRcdFx0cm9vdC5jb25zb2xlLmxvZyhcIuKclCBKYXJ2aXNXaWRnZXRzIGRlc3Ryb3llZFwiKTtcclxuXHRcdFx0XHRcdH0gXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gZW5kIGRlc3Ryb3kgYWxsIHdpZGdldHMgXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly8gY2x1c3RlciBkZXN0cm95OiBkZXN0cm95IG90aGVyIGluc3RhbmNlcyB0aGF0IGNvdWxkIGJlIG9uIHRoZSBwYWdlIFxyXG5cdFx0XHRcdC8vIHRoaXMgcnVucyBhIHNjcmlwdCBpbiB0aGUgY3VycmVudCBsb2FkZWQgcGFnZSBiZWZvcmUgZmV0Y2hpbmcgdGhlIG5ldyBwYWdlXHJcblx0XHRcdFx0aWYgKCAkLm5hdkFzQWpheCAmJiAoY29udGFpbmVyWzBdID09ICQoXCIjY29udGVudFwiKVswXSkgKSB7XHJcblxyXG5cdFx0XHRcdFx0LypcclxuXHRcdFx0XHRcdCAqIFRoZSBmb2xsb3dpbmcgZWxlbWVudHMgc2hvdWxkIGJlIHJlbW92ZWQsIGlmIHRoZXkgaGF2ZSBiZWVuIGNyZWF0ZWQ6XHJcblx0XHRcdFx0XHQgKlxyXG5cdFx0XHRcdFx0ICpcdGNvbG9yTGlzdFxyXG5cdFx0XHRcdFx0ICpcdGljb25cclxuXHRcdFx0XHRcdCAqXHRwaWNrZXJcclxuXHRcdFx0XHRcdCAqXHRpbmxpbmVcclxuXHRcdFx0XHRcdCAqXHRBbmQgdW5iaW5kIGV2ZW50cyBmcm9tIGVsZW1lbnRzOlxyXG5cdFx0XHRcdFx0ICpcdFxyXG5cdFx0XHRcdFx0ICpcdGljb25cclxuXHRcdFx0XHRcdCAqXHRwaWNrZXJcclxuXHRcdFx0XHRcdCAqXHRpbmxpbmVcclxuXHRcdFx0XHRcdCAqXHRlc3BlY2lhbGx5ICQoZG9jdW1lbnQpLm9uKCdtb3VzZWRvd24nKVxyXG5cdFx0XHRcdFx0ICpcdEl0IHdpbGwgYmUgbXVjaCBlYXNpZXIgdG8gYWRkIG5hbWVzcGFjZSB0byBwbHVnaW4gZXZlbnRzIGFuZCB0aGVuIHVuYmluZCB1c2luZyBzZWxlY3RlZCBuYW1lc3BhY2UuXHJcblx0XHRcdFx0XHQgKlx0XHJcblx0XHRcdFx0XHQgKlx0U2VlIGFsc286XHJcblx0XHRcdFx0XHQgKlx0XHJcblx0XHRcdFx0XHQgKlx0aHR0cDovL2Y2ZGVzaWduLmNvbS9qb3VybmFsLzIwMTIvMDUvMDYvYS1qcXVlcnktcGx1Z2luLWJvaWxlcnBsYXRlL1xyXG5cdFx0XHRcdFx0ICpcdGh0dHA6Ly9rZWl0aC13b29kLm5hbWUvcGx1Z2luRnJhbWV3b3JrLmh0bWxcclxuXHRcdFx0XHRcdCAqL1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQvLyB0aGlzIGZ1bmN0aW9uIGlzIGJlbG93IHRoZSBwYWdlZnVuY3Rpb24gZm9yIGFsbCBwYWdlcyB0aGF0IGhhcyBpbnN0YW5jZXNcclxuXHJcblx0XHRcdFx0XHRpZiAodHlwZW9mIHBhZ2VkZXN0cm95ID09ICdmdW5jdGlvbicpIHsgXHJcblxyXG5cdFx0XHRcdFx0ICB0cnkge1xyXG5cdFx0XHRcdFx0XHQgICAgcGFnZWRlc3Ryb3koKTsgXHJcblxyXG5cdFx0XHRcdFx0XHQgICAgaWYgKGRlYnVnU3RhdGUpe1xyXG5cdFx0XHRcdFx0XHRcdFx0cm9vdC5jb25zb2xlLmxvZyhcIuKclCBQYWdlZGVzdHJveSgpXCIpO1xyXG5cdFx0XHRcdFx0XHQgICB9IFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGNhdGNoKGVycikge1xyXG5cdFx0XHRcdFx0XHQgICBwYWdlZGVzdHJveSA9IHVuZGVmaW5lZDsgXHJcblxyXG5cdFx0XHRcdFx0XHQgICBpZiAoZGVidWdTdGF0ZSl7XHJcblx0XHRcdFx0XHRcdFx0XHRyb290LmNvbnNvbGUubG9nKFwiISBQYWdlZGVzdHJveSgpIENhdGNoIEVycm9yXCIpO1xyXG5cdFx0XHRcdFx0XHQgICB9IFxyXG5cdFx0XHRcdFx0ICB9XHJcblxyXG5cdFx0XHRcdFx0fSBcclxuXHJcblx0XHRcdFx0XHQvLyBkZXN0cm95IGFsbCBpbmxpbmUgY2hhcnRzXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGlmICggJC5mbi5zcGFya2xpbmUgJiYgJChcIiNjb250ZW50IC5zcGFya2xpbmVcIilbMF0gKSB7XHJcblx0XHRcdFx0XHRcdCQoXCIjY29udGVudCAuc3BhcmtsaW5lXCIpLnNwYXJrbGluZSggJ2Rlc3Ryb3knICk7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRpZiAoZGVidWdTdGF0ZSl7XHJcblx0XHRcdFx0XHRcdFx0cm9vdC5jb25zb2xlLmxvZyhcIuKclCBTcGFya2xpbmUgQ2hhcnRzIGRlc3Ryb3llZCFcIik7XHJcblx0XHRcdFx0XHRcdH0gXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGlmICggJC5mbi5lYXN5UGllQ2hhcnQgJiYgJChcIiNjb250ZW50IC5lYXN5LXBpZS1jaGFydFwiKVswXSApIHtcclxuXHRcdFx0XHRcdFx0JChcIiNjb250ZW50IC5lYXN5LXBpZS1jaGFydFwiKS5lYXN5UGllQ2hhcnQoICdkZXN0cm95JyApO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0aWYgKGRlYnVnU3RhdGUpe1xyXG5cdFx0XHRcdFx0XHRcdHJvb3QuY29uc29sZS5sb2coXCLinJQgRWFzeVBpZUNoYXJ0IENoYXJ0cyBkZXN0cm95ZWQhXCIpO1xyXG5cdFx0XHRcdFx0XHR9IFxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFxyXG5cclxuXHRcdFx0XHRcdC8vIGVuZCBkZXN0b3J5IGFsbCBpbmxpbmUgY2hhcnRzXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdC8vIGRlc3Ryb3kgZm9ybSBjb250cm9sczogRGF0ZXBpY2tlciwgc2VsZWN0MiwgYXV0b2NvbXBsZXRlLCBtYXNrLCBib290c3RyYXAgc2xpZGVyXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGlmICggJC5mbi5zZWxlY3QyICYmICQoXCIjY29udGVudCBzZWxlY3Quc2VsZWN0MlwiKVswXSApIHtcclxuXHRcdFx0XHRcdFx0JChcIiNjb250ZW50IHNlbGVjdC5zZWxlY3QyXCIpLnNlbGVjdDIoJ2Rlc3Ryb3knKTtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGlmIChkZWJ1Z1N0YXRlKXtcclxuXHRcdFx0XHRcdFx0XHRyb290LmNvbnNvbGUubG9nKFwi4pyUIFNlbGVjdDIgZGVzdHJveWVkIVwiKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRpZiAoICQuZm4ubWFzayAmJiAkKCcjY29udGVudCBbZGF0YS1tYXNrXScpWzBdICkge1xyXG5cdFx0XHRcdFx0XHQkKCcjY29udGVudCBbZGF0YS1tYXNrXScpLnVubWFzaygpO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0aWYgKGRlYnVnU3RhdGUpe1xyXG5cdFx0XHRcdFx0XHRcdHJvb3QuY29uc29sZS5sb2coXCLinJQgSW5wdXQgTWFzayBkZXN0cm95ZWQhXCIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGlmICggJC5mbi5kYXRlcGlja2VyICYmICQoJyNjb250ZW50IC5kYXRlcGlja2VyJylbMF0gKSB7XHJcblx0XHRcdFx0XHRcdCQoJyNjb250ZW50IC5kYXRlcGlja2VyJykub2ZmKCk7XHJcblx0XHRcdFx0XHRcdCQoJyNjb250ZW50IC5kYXRlcGlja2VyJykucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRpZiAoZGVidWdTdGF0ZSl7XHJcblx0XHRcdFx0XHRcdFx0cm9vdC5jb25zb2xlLmxvZyhcIuKclCBEYXRlcGlja2VyIGRlc3Ryb3llZCFcIik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0aWYgKCAkLmZuLnNsaWRlciAmJiAkKCcjY29udGVudCAuc2xpZGVyJylbMF0gKSB7XHJcblx0XHRcdFx0XHRcdCQoJyNjb250ZW50IC5zbGlkZXInKS5vZmYoKTtcclxuXHRcdFx0XHRcdFx0JCgnI2NvbnRlbnQgLnNsaWRlcicpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0aWYgKGRlYnVnU3RhdGUpe1xyXG5cdFx0XHRcdFx0XHRcdHJvb3QuY29uc29sZS5sb2coXCLinJQgQm9vdHN0cmFwIFNsaWRlciBkZXN0cm95ZWQhXCIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdC8vIGVuZCBkZXN0cm95IGZvcm0gY29udHJvbHNcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIGVuZCBjbHVzdGVyIGRlc3Ryb3lcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQvLyBlbXB0eSBjb250YWluZXIgYW5kIHZhciB0byBzdGFydCBnYXJiYWdlIGNvbGxlY3Rpb24gKGZyZWVzIG1lbW9yeSlcclxuXHRcdFx0XHRwYWdlZnVuY3Rpb24gPSBudWxsO1xyXG5cdFx0XHRcdGNvbnRhaW5lci5yZW1vdmVEYXRhKCkuaHRtbChcIlwiKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQvLyBwbGFjZSBjb2dcclxuXHRcdFx0XHRjb250YWluZXIuaHRtbCgnPGgxIGNsYXNzPVwiYWpheC1sb2FkaW5nLWFuaW1hdGlvblwiPjxpIGNsYXNzPVwiZmEgZmEtY29nIGZhLXNwaW5cIj48L2k+IExvYWRpbmcuLi48L2gxPicpO1xyXG5cdFx0XHRcclxuXHRcdFx0XHQvLyBPbmx5IGRyYXcgYnJlYWRjcnVtYiBpZiBpdCBpcyBtYWluIGNvbnRlbnQgbWF0ZXJpYWxcclxuXHRcdFx0XHRpZiAoY29udGFpbmVyWzBdID09ICQoXCIjY29udGVudFwiKVswXSkge1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQvLyBjbGVhciBldmVyeXRoaW5nIGVsc2UgZXhjZXB0IHRoZXNlIGtleSBET00gZWxlbWVudHNcclxuXHRcdFx0XHRcdC8vIHdlIGRvIHRoaXMgYmVjYXVzZSBzb21ldGltZSBwbHVnaW5zIHdpbGwgbGVhdmUgZHluYW1pYyBlbGVtZW50cyBiZWhpbmRcclxuXHRcdFx0XHRcdCQoJ2JvZHknKS5maW5kKCc+IConKS5maWx0ZXIoJzpub3QoJyArIGlnbm9yZV9rZXlfZWxtcyArICcpJykuZW1wdHkoKS5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8gZHJhdyBicmVhZGNydW1iXHJcblx0XHRcdFx0XHRkcmF3QnJlYWRDcnVtYigpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQvLyBzY3JvbGwgdXBcclxuXHRcdFx0XHRcdCQoXCJodG1sXCIpLmFuaW1hdGUoe1xyXG5cdFx0XHRcdFx0XHRzY3JvbGxUb3AgOiAwXHJcblx0XHRcdFx0XHR9LCBcImZhc3RcIik7XHJcblx0XHRcdFx0fSBcclxuXHRcdFx0XHQvLyBlbmQgaWZcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQvLyBkdW1wIGRhdGEgdG8gY29udGFpbmVyXHJcblx0XHRcdFx0Y29udGFpbmVyLmNzcyh7XHJcblx0XHRcdFx0XHRvcGFjaXR5IDogJzAuMCdcclxuXHRcdFx0XHR9KS5odG1sKGRhdGEpLmRlbGF5KDUwKS5hbmltYXRlKHtcclxuXHRcdFx0XHRcdG9wYWNpdHkgOiAnMS4wJ1xyXG5cdFx0XHRcdH0sIDMwMCk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Ly8gY2xlYXIgZGF0YSB2YXJcclxuXHRcdFx0XHRkYXRhID0gbnVsbDtcclxuXHRcdFx0XHRjb250YWluZXIgPSBudWxsO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRlcnJvciA6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCB0aHJvd25FcnJvciwgZXJyb3IpIHtcclxuXHRcdFx0XHRjb250YWluZXIuaHRtbCgnPGg0IGNsYXNzPVwiYWpheC1sb2FkaW5nLWVycm9yXCI+PGkgY2xhc3M9XCJmYSBmYS13YXJuaW5nIHR4dC1jb2xvci1vcmFuZ2VEYXJrXCI+PC9pPiBFcnJvciByZXF1ZXN0aW5nIDxzcGFuIGNsYXNzPVwidHh0LWNvbG9yLXJlZFwiPicgKyB1cmwgKyAnPC9zcGFuPjogJyArIHhoci5zdGF0dXMgKyAnIDxzcGFuIHN0eWxlPVwidGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XCI+JyAgKyB0aHJvd25FcnJvciArICc8L3NwYW4+PC9oND4nKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0YXN5bmMgOiB0cnVlIFxyXG5cdFx0fSk7XHJcblx0XHJcblx0fVxyXG4vKlxyXG4gKiBVUERBVEUgQlJFQURDUlVNQlxyXG4gKi8gXHJcblx0ZnVuY3Rpb24gZHJhd0JyZWFkQ3J1bWIob3B0X2JyZWFkQ3J1bWJzKSB7XHJcblx0XHR2YXIgYSA9ICQoXCJuYXYgbGkuYWN0aXZlID4gYVwiKSxcclxuXHRcdFx0YiA9IGEubGVuZ3RoO1xyXG5cdFxyXG5cdFx0YnJlYWRfY3J1bWIuZW1wdHkoKSwgXHJcblx0XHRicmVhZF9jcnVtYi5hcHBlbmQoJChcIjxsaT5Ib21lPC9saT5cIikpLCBhLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdGJyZWFkX2NydW1iLmFwcGVuZCgkKFwiPGxpPjwvbGk+XCIpLmh0bWwoJC50cmltKCQodGhpcykuY2xvbmUoKS5jaGlsZHJlbihcIi5iYWRnZVwiKS5yZW1vdmUoKS5lbmQoKS50ZXh0KCkpKSksIC0tYiB8fCAoZG9jdW1lbnQudGl0bGUgPSBicmVhZF9jcnVtYi5maW5kKFwibGk6bGFzdC1jaGlsZFwiKS50ZXh0KCkpXHJcblx0XHR9KTtcclxuXHRcdFxyXG5cdFx0Ly8gUHVzaCBicmVhZGNydW1iIG1hbnVhbGx5IC0+IGRyYXdCcmVhZENydW1iKFtcIlVzZXJzXCIsIFwiSm9obiBEb2VcIl0pO1xyXG5cdFx0Ly8gQ3JlZGl0czogUGhpbGlwIFdoaXR0IHwgcGhpbGlwLndoaXR0QHNiY2dsb2JhbC5uZXRcclxuXHRcdGlmIChvcHRfYnJlYWRDcnVtYnMgIT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdCQuZWFjaChvcHRfYnJlYWRDcnVtYnMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xyXG5cdFx0XHRcdGJyZWFkX2NydW1iLmFwcGVuZCgkKFwiPGxpPjwvbGk+XCIpLmh0bWwodmFsdWUpKTsgXHJcblx0XHRcdFx0ZG9jdW1lbnQudGl0bGUgPSBicmVhZF9jcnVtYi5maW5kKFwibGk6bGFzdC1jaGlsZFwiKS50ZXh0KCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuLyogfiBFTkQ6IEFQUCBBSkFYIFJFUVVFU1QgU0VUVVAgKi9cclxuXHJcbi8qXHJcbiAqIFBBR0UgU0VUVVBcclxuICogRGVzY3JpcHRpb246IGZpcmUgY2VydGFpbiBzY3JpcHRzIHRoYXQgcnVuIHRocm91Z2ggdGhlIHBhZ2VcclxuICogdG8gY2hlY2sgZm9yIGZvcm0gZWxlbWVudHMsIHRvb2x0aXAgYWN0aXZhdGlvbiwgcG9wb3ZlcnMsIGV0Yy4uLlxyXG4gKi9cclxuXHRmdW5jdGlvbiBwYWdlU2V0VXAoKSB7XHJcblx0XHJcblx0XHRpZiAodGhpc0RldmljZSA9PT0gXCJkZXNrdG9wXCIpe1xyXG5cdFx0XHQvLyBpcyBkZXNrdG9wXHJcblx0XHRcdFxyXG5cdFx0XHQvLyBhY3RpdmF0ZSB0b29sdGlwc1xyXG5cdFx0XHQkKFwiW3JlbD10b29sdGlwXSwgW2RhdGEtcmVsPXRvb2x0aXBdXCIpLnRvb2x0aXAoKTtcclxuXHRcdFxyXG5cdFx0XHQvLyBhY3RpdmF0ZSBwb3BvdmVyc1xyXG5cdFx0XHQkKFwiW3JlbD1wb3BvdmVyXSwgW2RhdGEtcmVsPXBvcG92ZXJdXCIpLnBvcG92ZXIoKTtcclxuXHRcdFxyXG5cdFx0XHQvLyBhY3RpdmF0ZSBwb3BvdmVycyB3aXRoIGhvdmVyIHN0YXRlc1xyXG5cdFx0XHQkKFwiW3JlbD1wb3BvdmVyLWhvdmVyXSwgW2RhdGEtcmVsPXBvcG92ZXItaG92ZXJdXCIpLnBvcG92ZXIoe1xyXG5cdFx0XHRcdHRyaWdnZXIgOiBcImhvdmVyXCJcclxuXHRcdFx0fSk7XHJcblx0XHJcblx0XHRcdC8vIHNldHVwIHdpZGdldHNcclxuXHRcdFx0c2V0dXBfd2lkZ2V0c19kZXNrdG9wKCk7XHJcblx0XHRcclxuXHRcdFx0Ly8gYWN0aXZhdGUgaW5saW5lIGNoYXJ0c1xyXG5cdFx0XHRydW5BbGxDaGFydHMoKTtcclxuXHRcdFxyXG5cdFx0XHQvLyBydW4gZm9ybSBlbGVtZW50c1xyXG5cdFx0XHRydW5BbGxGb3JtcygpO1xyXG5cdFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0XHJcblx0XHRcdC8vIGlzIG1vYmlsZVxyXG5cdFx0XHRcclxuXHRcdFx0Ly8gYWN0aXZhdGUgcG9wb3ZlcnNcclxuXHRcdFx0JChcIltyZWw9cG9wb3Zlcl0sIFtkYXRhLXJlbD1wb3BvdmVyXVwiKS5wb3BvdmVyKCk7XHJcblx0XHRcclxuXHRcdFx0Ly8gYWN0aXZhdGUgcG9wb3ZlcnMgd2l0aCBob3ZlciBzdGF0ZXNcclxuXHRcdFx0JChcIltyZWw9cG9wb3Zlci1ob3Zlcl0sIFtkYXRhLXJlbD1wb3BvdmVyLWhvdmVyXVwiKS5wb3BvdmVyKHtcclxuXHRcdFx0XHR0cmlnZ2VyIDogXCJob3ZlclwiXHJcblx0XHRcdH0pO1xyXG5cdFx0XHJcblx0XHRcdC8vIGFjdGl2YXRlIGlubGluZSBjaGFydHNcclxuXHRcdFx0cnVuQWxsQ2hhcnRzKCk7XHJcblx0XHRcclxuXHRcdFx0Ly8gc2V0dXAgd2lkZ2V0c1xyXG5cdFx0XHRzZXR1cF93aWRnZXRzX21vYmlsZSgpO1xyXG5cdFx0XHJcblx0XHRcdC8vIHJ1biBmb3JtIGVsZW1lbnRzXHJcblx0XHRcdHJ1bkFsbEZvcm1zKCk7XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFxyXG5cdH1cclxuLyogfiBFTkQ6IFBBR0UgU0VUVVAgKi9cclxuXHJcbi8qXHJcbiAqIE9ORSBQT1BPVkVSIFRIRU9SWVxyXG4gKiBLZWVwIG9ubHkgMSBhY3RpdmUgcG9wb3ZlciBwZXIgdHJpZ2dlciAtIGFsc28gY2hlY2sgYW5kIGhpZGUgYWN0aXZlIHBvcG92ZXJzIGlmIHVzZXIgY2xpY2tzIG9uIGRvY3VtZW50XHJcbiAqL1xyXG5cdCQoJ2JvZHknKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcblx0XHQkKCdbcmVsPVwicG9wb3ZlclwiXSwgW2RhdGEtcmVsPVwicG9wb3ZlclwiXScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vdGhlICdpcycgZm9yIGJ1dHRvbnMgdGhhdCB0cmlnZ2VyIHBvcHVwc1xyXG5cdFx0XHQvL3RoZSAnaGFzJyBmb3IgaWNvbnMgd2l0aGluIGEgYnV0dG9uIHRoYXQgdHJpZ2dlcnMgYSBwb3B1cFxyXG5cdFx0XHRpZiAoISQodGhpcykuaXMoZS50YXJnZXQpICYmICQodGhpcykuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDAgJiYgJCgnLnBvcG92ZXInKS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHRcdCQodGhpcykucG9wb3ZlcignaGlkZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTsgXHJcbi8qIH4gRU5EOiBPTkUgUE9QIE9WRVIgVEhFT1JZICovXHJcblxyXG4vKlxyXG4gKiBERUxFVEUgTU9ERUwgREFUQSBPTiBISURERU5cclxuICogQ2xlYXJzIHRoZSBtb2RlbCBkYXRhIG9uY2UgaXQgaXMgaGlkZGVuLCB0aGlzIHdheSB5b3UgZG8gbm90IGNyZWF0ZSBkdXBsaWNhdGVkIGRhdGEgb24gbXVsdGlwbGUgbW9kYWxzXHJcbiAqL1xyXG5cdCQoJ2JvZHknKS5vbignaGlkZGVuLmJzLm1vZGFsJywgJy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcclxuXHQgICQodGhpcykucmVtb3ZlRGF0YSgnYnMubW9kYWwnKTtcclxuXHR9KTtcclxuLyogfiBFTkQ6IERFTEVURSBNT0RFTCBEQVRBIE9OIEhJRERFTiAqL1xyXG5cclxuLypcclxuICogSEVMUEZVTCBGVU5DVElPTlNcclxuICogV2UgaGF2ZSBpbmNsdWRlZCBzb21lIGZ1bmN0aW9ucyBiZWxvdyB0aGF0IGNhbiBiZSByZXN1ZWQgb24gdmFyaW91cyBvY2Nhc2lvbnNcclxuICogXHJcbiAqIEdldCBwYXJhbSB2YWx1ZVxyXG4gKiBleGFtcGxlOiBhbGVydCggZ2V0UGFyYW0oICdwYXJhbScgKSApO1xyXG4gKi9cclxuXHRmdW5jdGlvbiBnZXRQYXJhbShuYW1lKSB7XHJcblx0ICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtdLywgXCJcXFxcXFxbXCIpLnJlcGxhY2UoL1tcXF1dLywgXCJcXFxcXFxdXCIpO1xyXG5cdCAgICB2YXIgcmVnZXhTID0gXCJbXFxcXD8mXVwiICsgbmFtZSArIFwiPShbXiYjXSopXCI7XHJcblx0ICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAocmVnZXhTKTtcclxuXHQgICAgdmFyIHJlc3VsdHMgPSByZWdleC5leGVjKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuXHQgICAgaWYgKHJlc3VsdHMgPT0gbnVsbClcclxuXHQgICAgICAgIHJldHVybiBcIlwiO1xyXG5cdCAgICBlbHNlXHJcblx0ICAgICAgICByZXR1cm4gcmVzdWx0c1sxXTtcclxuXHR9XHJcbi8qIH4gRU5EOiBIRUxQRlVMIEZVTkNUSU9OUyAqL1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L2pzL2FwcC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=