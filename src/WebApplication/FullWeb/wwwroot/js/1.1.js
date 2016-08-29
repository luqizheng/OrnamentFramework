webpackJsonp([1],{

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	   var $ = __webpack_require__(2);
	function build(selector, ajaxFormOptions, fnSuccess) {
	    __webpack_require__.e/* nsure */(2, function () {
	         
	            __webpack_require__(10);
	            __webpack_require__(8);
	            __webpack_require__(9);
	
	            var $form = $(selector);
	            ajaxFormOptions ? $form.ajaxForm(ajaxFormOptions) : $form.ajaxForm();
	            $.validator.unobtrusive.parse(selector);
	            var $formSetting = $form.data("validator");
	            if ($formSetting) {
	                $formSetting.settings.submitHandler = function () {
	                    $form.ajaxSubmit(fnSuccess);
	                    return false;
	                };
	            }
	            return $form;
	        });
	}
	
	
	module.exports = {
	    'for': function (selector, fnSuccess) {
	        build(selector, false, fnSuccess);
	    },
	    forWebApi: function (selector, fnSubmit) {
	        var $ = __webpack_require__(2);
	        __webpack_require__(8);
	        __webpack_require__(9);
	        var $form = $(selector);
	        $.validator.unobtrusive.parse(selector);
	        var $formSetting = $form.data("validator");
	        $formSetting.settings.submitHandler = function () {
	            fnSubmit();
	            return false;
	        };
	    }
	};
	


/***/ },

/***/ 8:
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

/***/ 9:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93d3dyb290L19zcmMvanMvbW9kdWxlcy92YWZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9saWIvanF1ZXJ5LXZhbGlkYXRpb24vZGlzdC9qcXVlcnkudmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3cm9vdC9saWIvanF1ZXJ5LXZhbGlkYXRpb24tdW5vYnRydXNpdmUvanF1ZXJ5LnZhbGlkYXRlLnVub2J0cnVzaXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBLHlDQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxFQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7O0FBRUEsNkNBQTRDO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsZ0JBQWdCO0FBQzNDOztBQUVBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQSxvQ0FBbUM7QUFDbkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTJDLFlBQVk7QUFDdkQ7QUFDQSxJQUFHO0FBQ0gsR0FBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxlQUFjO0FBQ2QsYUFBWTtBQUNaLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBNkQsRUFBRTtBQUMvRCwwREFBeUQsRUFBRTtBQUMzRCxtRUFBa0UsRUFBRSxNQUFNLEVBQUU7QUFDNUUsNkRBQTRELEVBQUUsTUFBTSxFQUFFO0FBQ3RFLHlFQUF3RSxFQUFFO0FBQzFFLDRFQUEyRSxFQUFFO0FBQzdFLDBEQUF5RCxFQUFFO0FBQzNELEdBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUNBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsMkVBQTBFLGVBQWU7QUFDekY7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQSxpQkFBZ0IsZUFBZTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdDQUF1QztBQUN2QztBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixJQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBcUQ7QUFDckQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0osSUFBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0Esb0JBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCLE9BQU87QUFDNUI7QUFDQTtBQUNBLEtBQUk7QUFDSixnRUFBK0QsR0FBRztBQUNsRTs7QUFFQTtBQUNBLElBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLGdCQUFlLHFCQUFxQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQix1QkFBdUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBaUQsZUFBZTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQStDLFlBQVksRUFBRTtBQUM3RCxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDLGlCQUFpQjtBQUM3RCxLQUFJO0FBQ0osSUFBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjtBQUNBLGNBQWEsaUJBQWlCO0FBQzlCLFdBQVUsY0FBYztBQUN4QixTQUFRLFlBQVk7QUFDcEIsVUFBUyxhQUFhO0FBQ3RCLGFBQVksZ0JBQWdCO0FBQzVCLFlBQVcsZUFBZTtBQUMxQixZQUFXLGVBQWU7QUFDMUIsZ0JBQWU7QUFDZixHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBLGlCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQSxHQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0EsaUJBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0EsaUJBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFOztBQUVGLG9DQUFtQyxhQUFhLDRCQUE0QjtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBbUUsRUFBRSxnQ0FBZ0MsS0FBSyw2Q0FBNkMsS0FBSztBQUM1SixJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrR0FBOEcsSUFBSSxFQUFFLEVBQUUsaUNBQWlDLElBQUksRUFBRSxFQUFFLHNDQUFzQyxJQUFJLEVBQUUsRUFBRSxnREFBZ0QsSUFBSSxvQkFBb0IsRUFBRSxvTEFBb0wsR0FBRyxZQUFZLElBQUk7QUFDOWQsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSw0Q0FBMkMsRUFBRTtBQUM3QyxJQUFHOztBQUVIO0FBQ0E7QUFDQSx1REFBc0QsSUFBSSxPQUFPLEVBQUU7QUFDbkUsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBDQUF5QyxhQUFhO0FBQ3RELDJDQUEwQyxjQUFjO0FBQ3hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBLGlFQUFnRSxvQ0FBb0M7QUFDcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBLEVBQUM7O0FBRUQ7QUFDQSxtQkFBa0IscUNBQXFDO0FBQ3ZEOztBQUVBLHlCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRixFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFDLEc7Ozs7Ozs7QUMzL0NEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaURBQWdELGNBQWMsRUFBRTtBQUNoRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRDQUEyQztBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBDQUF5QztBQUN6QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7O0FBRUEsZ0NBQStCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQTZEO0FBQzdEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckIsaUNBQWdDO0FBQ2hDLDhCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCLHdDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBd0I7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkNBQTRDO0FBQzVDOztBQUVBO0FBQ0E7QUFDQSxzQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0EsY0FBYTs7QUFFYiw4QkFBNkIsb0JBQW9COztBQUVqRDtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQiwrQ0FBK0M7QUFDbEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsRUFBQyxVIiwiZmlsZSI6IjEuMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiAgIHZhciAkID0gcmVxdWlyZShcImpxdWVyeVwiKTtcclxuZnVuY3Rpb24gYnVpbGQoc2VsZWN0b3IsIGFqYXhGb3JtT3B0aW9ucywgZm5TdWNjZXNzKSB7XHJcbiAgICByZXF1aXJlLmVuc3VyZShbXCJqcS1mb3JtXCIsIFwianEtdmFsXCIsIFwianEtdmFsLXVvXCJdLFxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgXHJcbiAgICAgICAgICAgIHJlcXVpcmUoXCJqcS1mb3JtXCIpO1xyXG4gICAgICAgICAgICByZXF1aXJlKFwianEtdmFsXCIpO1xyXG4gICAgICAgICAgICByZXF1aXJlKFwianEtdmFsLXVvXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyICRmb3JtID0gJChzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIGFqYXhGb3JtT3B0aW9ucyA/ICRmb3JtLmFqYXhGb3JtKGFqYXhGb3JtT3B0aW9ucykgOiAkZm9ybS5hamF4Rm9ybSgpO1xyXG4gICAgICAgICAgICAkLnZhbGlkYXRvci51bm9idHJ1c2l2ZS5wYXJzZShzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIHZhciAkZm9ybVNldHRpbmcgPSAkZm9ybS5kYXRhKFwidmFsaWRhdG9yXCIpO1xyXG4gICAgICAgICAgICBpZiAoJGZvcm1TZXR0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAkZm9ybVNldHRpbmcuc2V0dGluZ3Muc3VibWl0SGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkZm9ybS5hamF4U3VibWl0KGZuU3VjY2Vzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJGZvcm07XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgICdmb3InOiBmdW5jdGlvbiAoc2VsZWN0b3IsIGZuU3VjY2Vzcykge1xyXG4gICAgICAgIGJ1aWxkKHNlbGVjdG9yLCBmYWxzZSwgZm5TdWNjZXNzKTtcclxuICAgIH0sXHJcbiAgICBmb3JXZWJBcGk6IGZ1bmN0aW9uIChzZWxlY3RvciwgZm5TdWJtaXQpIHtcclxuICAgICAgICB2YXIgJCA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XHJcbiAgICAgICAgcmVxdWlyZShcImpxLXZhbFwiKTtcclxuICAgICAgICByZXF1aXJlKFwianEtdmFsLXVvXCIpO1xyXG4gICAgICAgIHZhciAkZm9ybSA9ICQoc2VsZWN0b3IpO1xyXG4gICAgICAgICQudmFsaWRhdG9yLnVub2J0cnVzaXZlLnBhcnNlKHNlbGVjdG9yKTtcclxuICAgICAgICB2YXIgJGZvcm1TZXR0aW5nID0gJGZvcm0uZGF0YShcInZhbGlkYXRvclwiKTtcclxuICAgICAgICAkZm9ybVNldHRpbmcuc2V0dGluZ3Muc3VibWl0SGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZm5TdWJtaXQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3d3cm9vdC9fc3JjL2pzL21vZHVsZXMvdmFmb3JtLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiLyohXG4gKiBqUXVlcnkgVmFsaWRhdGlvbiBQbHVnaW4gdjEuMTUuMFxuICpcbiAqIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgSsO2cm4gWmFlZmZlcmVyXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuKGZ1bmN0aW9uKCBmYWN0b3J5ICkge1xuXHRpZiAoIHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kICkge1xuXHRcdGRlZmluZSggW1wianF1ZXJ5XCJdLCBmYWN0b3J5ICk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSggcmVxdWlyZSggXCJqcXVlcnlcIiApICk7XG5cdH0gZWxzZSB7XG5cdFx0ZmFjdG9yeSggalF1ZXJ5ICk7XG5cdH1cbn0oZnVuY3Rpb24oICQgKSB7XG5cbiQuZXh0ZW5kKCAkLmZuLCB7XG5cblx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3ZhbGlkYXRlL1xuXHR2YWxpZGF0ZTogZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cblx0XHQvLyBJZiBub3RoaW5nIGlzIHNlbGVjdGVkLCByZXR1cm4gbm90aGluZzsgY2FuJ3QgY2hhaW4gYW55d2F5XG5cdFx0aWYgKCAhdGhpcy5sZW5ndGggKSB7XG5cdFx0XHRpZiAoIG9wdGlvbnMgJiYgb3B0aW9ucy5kZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSApIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKCBcIk5vdGhpbmcgc2VsZWN0ZWQsIGNhbid0IHZhbGlkYXRlLCByZXR1cm5pbmcgbm90aGluZy5cIiApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIENoZWNrIGlmIGEgdmFsaWRhdG9yIGZvciB0aGlzIGZvcm0gd2FzIGFscmVhZHkgY3JlYXRlZFxuXHRcdHZhciB2YWxpZGF0b3IgPSAkLmRhdGEoIHRoaXNbIDAgXSwgXCJ2YWxpZGF0b3JcIiApO1xuXHRcdGlmICggdmFsaWRhdG9yICkge1xuXHRcdFx0cmV0dXJuIHZhbGlkYXRvcjtcblx0XHR9XG5cblx0XHQvLyBBZGQgbm92YWxpZGF0ZSB0YWcgaWYgSFRNTDUuXG5cdFx0dGhpcy5hdHRyKCBcIm5vdmFsaWRhdGVcIiwgXCJub3ZhbGlkYXRlXCIgKTtcblxuXHRcdHZhbGlkYXRvciA9IG5ldyAkLnZhbGlkYXRvciggb3B0aW9ucywgdGhpc1sgMCBdICk7XG5cdFx0JC5kYXRhKCB0aGlzWyAwIF0sIFwidmFsaWRhdG9yXCIsIHZhbGlkYXRvciApO1xuXG5cdFx0aWYgKCB2YWxpZGF0b3Iuc2V0dGluZ3Mub25zdWJtaXQgKSB7XG5cblx0XHRcdHRoaXMub24oIFwiY2xpY2sudmFsaWRhdGVcIiwgXCI6c3VibWl0XCIsIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0aWYgKCB2YWxpZGF0b3Iuc2V0dGluZ3Muc3VibWl0SGFuZGxlciApIHtcblx0XHRcdFx0XHR2YWxpZGF0b3Iuc3VibWl0QnV0dG9uID0gZXZlbnQudGFyZ2V0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gQWxsb3cgc3VwcHJlc3NpbmcgdmFsaWRhdGlvbiBieSBhZGRpbmcgYSBjYW5jZWwgY2xhc3MgdG8gdGhlIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0aWYgKCAkKCB0aGlzICkuaGFzQ2xhc3MoIFwiY2FuY2VsXCIgKSApIHtcblx0XHRcdFx0XHR2YWxpZGF0b3IuY2FuY2VsU3VibWl0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFsbG93IHN1cHByZXNzaW5nIHZhbGlkYXRpb24gYnkgYWRkaW5nIHRoZSBodG1sNSBmb3Jtbm92YWxpZGF0ZSBhdHRyaWJ1dGUgdG8gdGhlIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0aWYgKCAkKCB0aGlzICkuYXR0ciggXCJmb3Jtbm92YWxpZGF0ZVwiICkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHR2YWxpZGF0b3IuY2FuY2VsU3VibWl0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXG5cdFx0XHQvLyBWYWxpZGF0ZSB0aGUgZm9ybSBvbiBzdWJtaXRcblx0XHRcdHRoaXMub24oIFwic3VibWl0LnZhbGlkYXRlXCIsIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0aWYgKCB2YWxpZGF0b3Iuc2V0dGluZ3MuZGVidWcgKSB7XG5cblx0XHRcdFx0XHQvLyBQcmV2ZW50IGZvcm0gc3VibWl0IHRvIGJlIGFibGUgdG8gc2VlIGNvbnNvbGUgb3V0cHV0XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmdW5jdGlvbiBoYW5kbGUoKSB7XG5cdFx0XHRcdFx0dmFyIGhpZGRlbiwgcmVzdWx0O1xuXHRcdFx0XHRcdGlmICggdmFsaWRhdG9yLnNldHRpbmdzLnN1Ym1pdEhhbmRsZXIgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHZhbGlkYXRvci5zdWJtaXRCdXR0b24gKSB7XG5cblx0XHRcdFx0XHRcdFx0Ly8gSW5zZXJ0IGEgaGlkZGVuIGlucHV0IGFzIGEgcmVwbGFjZW1lbnQgZm9yIHRoZSBtaXNzaW5nIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0XHRcdFx0aGlkZGVuID0gJCggXCI8aW5wdXQgdHlwZT0naGlkZGVuJy8+XCIgKVxuXHRcdFx0XHRcdFx0XHRcdC5hdHRyKCBcIm5hbWVcIiwgdmFsaWRhdG9yLnN1Ym1pdEJ1dHRvbi5uYW1lIClcblx0XHRcdFx0XHRcdFx0XHQudmFsKCAkKCB2YWxpZGF0b3Iuc3VibWl0QnV0dG9uICkudmFsKCkgKVxuXHRcdFx0XHRcdFx0XHRcdC5hcHBlbmRUbyggdmFsaWRhdG9yLmN1cnJlbnRGb3JtICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB2YWxpZGF0b3Iuc2V0dGluZ3Muc3VibWl0SGFuZGxlci5jYWxsKCB2YWxpZGF0b3IsIHZhbGlkYXRvci5jdXJyZW50Rm9ybSwgZXZlbnQgKTtcblx0XHRcdFx0XHRcdGlmICggdmFsaWRhdG9yLnN1Ym1pdEJ1dHRvbiApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBBbmQgY2xlYW4gdXAgYWZ0ZXJ3YXJkczsgdGhhbmtzIHRvIG5vLWJsb2NrLXNjb3BlLCBoaWRkZW4gY2FuIGJlIHJlZmVyZW5jZWRcblx0XHRcdFx0XHRcdFx0aGlkZGVuLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCByZXN1bHQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBQcmV2ZW50IHN1Ym1pdCBmb3IgaW52YWxpZCBmb3JtcyBvciBjdXN0b20gc3VibWl0IGhhbmRsZXJzXG5cdFx0XHRcdGlmICggdmFsaWRhdG9yLmNhbmNlbFN1Ym1pdCApIHtcblx0XHRcdFx0XHR2YWxpZGF0b3IuY2FuY2VsU3VibWl0ID0gZmFsc2U7XG5cdFx0XHRcdFx0cmV0dXJuIGhhbmRsZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggdmFsaWRhdG9yLmZvcm0oKSApIHtcblx0XHRcdFx0XHRpZiAoIHZhbGlkYXRvci5wZW5kaW5nUmVxdWVzdCApIHtcblx0XHRcdFx0XHRcdHZhbGlkYXRvci5mb3JtU3VibWl0dGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGhhbmRsZSgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbGlkYXRvci5mb2N1c0ludmFsaWQoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsaWRhdG9yO1xuXHR9LFxuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy92YWxpZC9cblx0dmFsaWQ6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciB2YWxpZCwgdmFsaWRhdG9yLCBlcnJvckxpc3Q7XG5cblx0XHRpZiAoICQoIHRoaXNbIDAgXSApLmlzKCBcImZvcm1cIiApICkge1xuXHRcdFx0dmFsaWQgPSB0aGlzLnZhbGlkYXRlKCkuZm9ybSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlcnJvckxpc3QgPSBbXTtcblx0XHRcdHZhbGlkID0gdHJ1ZTtcblx0XHRcdHZhbGlkYXRvciA9ICQoIHRoaXNbIDAgXS5mb3JtICkudmFsaWRhdGUoKTtcblx0XHRcdHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhbGlkID0gdmFsaWRhdG9yLmVsZW1lbnQoIHRoaXMgKSAmJiB2YWxpZDtcblx0XHRcdFx0aWYgKCAhdmFsaWQgKSB7XG5cdFx0XHRcdFx0ZXJyb3JMaXN0ID0gZXJyb3JMaXN0LmNvbmNhdCggdmFsaWRhdG9yLmVycm9yTGlzdCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cdFx0XHR2YWxpZGF0b3IuZXJyb3JMaXN0ID0gZXJyb3JMaXN0O1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsaWQ7XG5cdH0sXG5cblx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3J1bGVzL1xuXHRydWxlczogZnVuY3Rpb24oIGNvbW1hbmQsIGFyZ3VtZW50ICkge1xuXG5cdFx0Ly8gSWYgbm90aGluZyBpcyBzZWxlY3RlZCwgcmV0dXJuIG5vdGhpbmc7IGNhbid0IGNoYWluIGFueXdheVxuXHRcdGlmICggIXRoaXMubGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBlbGVtZW50ID0gdGhpc1sgMCBdLFxuXHRcdFx0c2V0dGluZ3MsIHN0YXRpY1J1bGVzLCBleGlzdGluZ1J1bGVzLCBkYXRhLCBwYXJhbSwgZmlsdGVyZWQ7XG5cblx0XHRpZiAoIGNvbW1hbmQgKSB7XG5cdFx0XHRzZXR0aW5ncyA9ICQuZGF0YSggZWxlbWVudC5mb3JtLCBcInZhbGlkYXRvclwiICkuc2V0dGluZ3M7XG5cdFx0XHRzdGF0aWNSdWxlcyA9IHNldHRpbmdzLnJ1bGVzO1xuXHRcdFx0ZXhpc3RpbmdSdWxlcyA9ICQudmFsaWRhdG9yLnN0YXRpY1J1bGVzKCBlbGVtZW50ICk7XG5cdFx0XHRzd2l0Y2ggKCBjb21tYW5kICkge1xuXHRcdFx0Y2FzZSBcImFkZFwiOlxuXHRcdFx0XHQkLmV4dGVuZCggZXhpc3RpbmdSdWxlcywgJC52YWxpZGF0b3Iubm9ybWFsaXplUnVsZSggYXJndW1lbnQgKSApO1xuXG5cdFx0XHRcdC8vIFJlbW92ZSBtZXNzYWdlcyBmcm9tIHJ1bGVzLCBidXQgYWxsb3cgdGhlbSB0byBiZSBzZXQgc2VwYXJhdGVseVxuXHRcdFx0XHRkZWxldGUgZXhpc3RpbmdSdWxlcy5tZXNzYWdlcztcblx0XHRcdFx0c3RhdGljUnVsZXNbIGVsZW1lbnQubmFtZSBdID0gZXhpc3RpbmdSdWxlcztcblx0XHRcdFx0aWYgKCBhcmd1bWVudC5tZXNzYWdlcyApIHtcblx0XHRcdFx0XHRzZXR0aW5ncy5tZXNzYWdlc1sgZWxlbWVudC5uYW1lIF0gPSAkLmV4dGVuZCggc2V0dGluZ3MubWVzc2FnZXNbIGVsZW1lbnQubmFtZSBdLCBhcmd1bWVudC5tZXNzYWdlcyApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInJlbW92ZVwiOlxuXHRcdFx0XHRpZiAoICFhcmd1bWVudCApIHtcblx0XHRcdFx0XHRkZWxldGUgc3RhdGljUnVsZXNbIGVsZW1lbnQubmFtZSBdO1xuXHRcdFx0XHRcdHJldHVybiBleGlzdGluZ1J1bGVzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGZpbHRlcmVkID0ge307XG5cdFx0XHRcdCQuZWFjaCggYXJndW1lbnQuc3BsaXQoIC9cXHMvICksIGZ1bmN0aW9uKCBpbmRleCwgbWV0aG9kICkge1xuXHRcdFx0XHRcdGZpbHRlcmVkWyBtZXRob2QgXSA9IGV4aXN0aW5nUnVsZXNbIG1ldGhvZCBdO1xuXHRcdFx0XHRcdGRlbGV0ZSBleGlzdGluZ1J1bGVzWyBtZXRob2QgXTtcblx0XHRcdFx0XHRpZiAoIG1ldGhvZCA9PT0gXCJyZXF1aXJlZFwiICkge1xuXHRcdFx0XHRcdFx0JCggZWxlbWVudCApLnJlbW92ZUF0dHIoIFwiYXJpYS1yZXF1aXJlZFwiICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cdFx0XHRcdHJldHVybiBmaWx0ZXJlZDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRkYXRhID0gJC52YWxpZGF0b3Iubm9ybWFsaXplUnVsZXMoXG5cdFx0JC5leHRlbmQoXG5cdFx0XHR7fSxcblx0XHRcdCQudmFsaWRhdG9yLmNsYXNzUnVsZXMoIGVsZW1lbnQgKSxcblx0XHRcdCQudmFsaWRhdG9yLmF0dHJpYnV0ZVJ1bGVzKCBlbGVtZW50ICksXG5cdFx0XHQkLnZhbGlkYXRvci5kYXRhUnVsZXMoIGVsZW1lbnQgKSxcblx0XHRcdCQudmFsaWRhdG9yLnN0YXRpY1J1bGVzKCBlbGVtZW50IClcblx0XHQpLCBlbGVtZW50ICk7XG5cblx0XHQvLyBNYWtlIHN1cmUgcmVxdWlyZWQgaXMgYXQgZnJvbnRcblx0XHRpZiAoIGRhdGEucmVxdWlyZWQgKSB7XG5cdFx0XHRwYXJhbSA9IGRhdGEucmVxdWlyZWQ7XG5cdFx0XHRkZWxldGUgZGF0YS5yZXF1aXJlZDtcblx0XHRcdGRhdGEgPSAkLmV4dGVuZCggeyByZXF1aXJlZDogcGFyYW0gfSwgZGF0YSApO1xuXHRcdFx0JCggZWxlbWVudCApLmF0dHIoIFwiYXJpYS1yZXF1aXJlZFwiLCBcInRydWVcIiApO1xuXHRcdH1cblxuXHRcdC8vIE1ha2Ugc3VyZSByZW1vdGUgaXMgYXQgYmFja1xuXHRcdGlmICggZGF0YS5yZW1vdGUgKSB7XG5cdFx0XHRwYXJhbSA9IGRhdGEucmVtb3RlO1xuXHRcdFx0ZGVsZXRlIGRhdGEucmVtb3RlO1xuXHRcdFx0ZGF0YSA9ICQuZXh0ZW5kKCBkYXRhLCB7IHJlbW90ZTogcGFyYW0gfSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG59ICk7XG5cbi8vIEN1c3RvbSBzZWxlY3RvcnNcbiQuZXh0ZW5kKCAkLmV4cHJbIFwiOlwiIF0sIHtcblxuXHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvYmxhbmstc2VsZWN0b3IvXG5cdGJsYW5rOiBmdW5jdGlvbiggYSApIHtcblx0XHRyZXR1cm4gISQudHJpbSggXCJcIiArICQoIGEgKS52YWwoKSApO1xuXHR9LFxuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9maWxsZWQtc2VsZWN0b3IvXG5cdGZpbGxlZDogZnVuY3Rpb24oIGEgKSB7XG5cdFx0dmFyIHZhbCA9ICQoIGEgKS52YWwoKTtcblx0XHRyZXR1cm4gdmFsICE9PSBudWxsICYmICEhJC50cmltKCBcIlwiICsgdmFsICk7XG5cdH0sXG5cblx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3VuY2hlY2tlZC1zZWxlY3Rvci9cblx0dW5jaGVja2VkOiBmdW5jdGlvbiggYSApIHtcblx0XHRyZXR1cm4gISQoIGEgKS5wcm9wKCBcImNoZWNrZWRcIiApO1xuXHR9XG59ICk7XG5cbi8vIENvbnN0cnVjdG9yIGZvciB2YWxpZGF0b3JcbiQudmFsaWRhdG9yID0gZnVuY3Rpb24oIG9wdGlvbnMsIGZvcm0gKSB7XG5cdHRoaXMuc2V0dGluZ3MgPSAkLmV4dGVuZCggdHJ1ZSwge30sICQudmFsaWRhdG9yLmRlZmF1bHRzLCBvcHRpb25zICk7XG5cdHRoaXMuY3VycmVudEZvcm0gPSBmb3JtO1xuXHR0aGlzLmluaXQoKTtcbn07XG5cbi8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9qUXVlcnkudmFsaWRhdG9yLmZvcm1hdC9cbiQudmFsaWRhdG9yLmZvcm1hdCA9IGZ1bmN0aW9uKCBzb3VyY2UsIHBhcmFtcyApIHtcblx0aWYgKCBhcmd1bWVudHMubGVuZ3RoID09PSAxICkge1xuXHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBhcmdzID0gJC5tYWtlQXJyYXkoIGFyZ3VtZW50cyApO1xuXHRcdFx0YXJncy51bnNoaWZ0KCBzb3VyY2UgKTtcblx0XHRcdHJldHVybiAkLnZhbGlkYXRvci5mb3JtYXQuYXBwbHkoIHRoaXMsIGFyZ3MgKTtcblx0XHR9O1xuXHR9XG5cdGlmICggcGFyYW1zID09PSB1bmRlZmluZWQgKSB7XG5cdFx0cmV0dXJuIHNvdXJjZTtcblx0fVxuXHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIHBhcmFtcy5jb25zdHJ1Y3RvciAhPT0gQXJyYXkgICkge1xuXHRcdHBhcmFtcyA9ICQubWFrZUFycmF5KCBhcmd1bWVudHMgKS5zbGljZSggMSApO1xuXHR9XG5cdGlmICggcGFyYW1zLmNvbnN0cnVjdG9yICE9PSBBcnJheSApIHtcblx0XHRwYXJhbXMgPSBbIHBhcmFtcyBdO1xuXHR9XG5cdCQuZWFjaCggcGFyYW1zLCBmdW5jdGlvbiggaSwgbiApIHtcblx0XHRzb3VyY2UgPSBzb3VyY2UucmVwbGFjZSggbmV3IFJlZ0V4cCggXCJcXFxce1wiICsgaSArIFwiXFxcXH1cIiwgXCJnXCIgKSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gbjtcblx0XHR9ICk7XG5cdH0gKTtcblx0cmV0dXJuIHNvdXJjZTtcbn07XG5cbiQuZXh0ZW5kKCAkLnZhbGlkYXRvciwge1xuXG5cdGRlZmF1bHRzOiB7XG5cdFx0bWVzc2FnZXM6IHt9LFxuXHRcdGdyb3Vwczoge30sXG5cdFx0cnVsZXM6IHt9LFxuXHRcdGVycm9yQ2xhc3M6IFwiZXJyb3JcIixcblx0XHRwZW5kaW5nQ2xhc3M6IFwicGVuZGluZ1wiLFxuXHRcdHZhbGlkQ2xhc3M6IFwidmFsaWRcIixcblx0XHRlcnJvckVsZW1lbnQ6IFwibGFiZWxcIixcblx0XHRmb2N1c0NsZWFudXA6IGZhbHNlLFxuXHRcdGZvY3VzSW52YWxpZDogdHJ1ZSxcblx0XHRlcnJvckNvbnRhaW5lcjogJCggW10gKSxcblx0XHRlcnJvckxhYmVsQ29udGFpbmVyOiAkKCBbXSApLFxuXHRcdG9uc3VibWl0OiB0cnVlLFxuXHRcdGlnbm9yZTogXCI6aGlkZGVuXCIsXG5cdFx0aWdub3JlVGl0bGU6IGZhbHNlLFxuXHRcdG9uZm9jdXNpbjogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHR0aGlzLmxhc3RBY3RpdmUgPSBlbGVtZW50O1xuXG5cdFx0XHQvLyBIaWRlIGVycm9yIGxhYmVsIGFuZCByZW1vdmUgZXJyb3IgY2xhc3Mgb24gZm9jdXMgaWYgZW5hYmxlZFxuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLmZvY3VzQ2xlYW51cCApIHtcblx0XHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLnVuaGlnaGxpZ2h0ICkge1xuXHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MudW5oaWdobGlnaHQuY2FsbCggdGhpcywgZWxlbWVudCwgdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzLCB0aGlzLnNldHRpbmdzLnZhbGlkQ2xhc3MgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmhpZGVUaGVzZSggdGhpcy5lcnJvcnNGb3IoIGVsZW1lbnQgKSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0b25mb2N1c291dDogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHRpZiAoICF0aGlzLmNoZWNrYWJsZSggZWxlbWVudCApICYmICggZWxlbWVudC5uYW1lIGluIHRoaXMuc3VibWl0dGVkIHx8ICF0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgKSApIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50KCBlbGVtZW50ICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRvbmtleXVwOiBmdW5jdGlvbiggZWxlbWVudCwgZXZlbnQgKSB7XG5cblx0XHRcdC8vIEF2b2lkIHJldmFsaWRhdGUgdGhlIGZpZWxkIHdoZW4gcHJlc3Npbmcgb25lIG9mIHRoZSBmb2xsb3dpbmcga2V5c1xuXHRcdFx0Ly8gU2hpZnQgICAgICAgPT4gMTZcblx0XHRcdC8vIEN0cmwgICAgICAgID0+IDE3XG5cdFx0XHQvLyBBbHQgICAgICAgICA9PiAxOFxuXHRcdFx0Ly8gQ2FwcyBsb2NrICAgPT4gMjBcblx0XHRcdC8vIEVuZCAgICAgICAgID0+IDM1XG5cdFx0XHQvLyBIb21lICAgICAgICA9PiAzNlxuXHRcdFx0Ly8gTGVmdCBhcnJvdyAgPT4gMzdcblx0XHRcdC8vIFVwIGFycm93ICAgID0+IDM4XG5cdFx0XHQvLyBSaWdodCBhcnJvdyA9PiAzOVxuXHRcdFx0Ly8gRG93biBhcnJvdyAgPT4gNDBcblx0XHRcdC8vIEluc2VydCAgICAgID0+IDQ1XG5cdFx0XHQvLyBOdW0gbG9jayAgICA9PiAxNDRcblx0XHRcdC8vIEFsdEdyIGtleSAgID0+IDIyNVxuXHRcdFx0dmFyIGV4Y2x1ZGVkS2V5cyA9IFtcblx0XHRcdFx0MTYsIDE3LCAxOCwgMjAsIDM1LCAzNiwgMzcsXG5cdFx0XHRcdDM4LCAzOSwgNDAsIDQ1LCAxNDQsIDIyNVxuXHRcdFx0XTtcblxuXHRcdFx0aWYgKCBldmVudC53aGljaCA9PT0gOSAmJiB0aGlzLmVsZW1lbnRWYWx1ZSggZWxlbWVudCApID09PSBcIlwiIHx8ICQuaW5BcnJheSggZXZlbnQua2V5Q29kZSwgZXhjbHVkZWRLZXlzICkgIT09IC0xICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9IGVsc2UgaWYgKCBlbGVtZW50Lm5hbWUgaW4gdGhpcy5zdWJtaXR0ZWQgfHwgZWxlbWVudC5uYW1lIGluIHRoaXMuaW52YWxpZCApIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50KCBlbGVtZW50ICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRvbmNsaWNrOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblxuXHRcdFx0Ly8gQ2xpY2sgb24gc2VsZWN0cywgcmFkaW9idXR0b25zIGFuZCBjaGVja2JveGVzXG5cdFx0XHRpZiAoIGVsZW1lbnQubmFtZSBpbiB0aGlzLnN1Ym1pdHRlZCApIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50KCBlbGVtZW50ICk7XG5cblx0XHRcdC8vIE9yIG9wdGlvbiBlbGVtZW50cywgY2hlY2sgcGFyZW50IHNlbGVjdCBpbiB0aGF0IGNhc2Vcblx0XHRcdH0gZWxzZSBpZiAoIGVsZW1lbnQucGFyZW50Tm9kZS5uYW1lIGluIHRoaXMuc3VibWl0dGVkICkge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQoIGVsZW1lbnQucGFyZW50Tm9kZSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0aGlnaGxpZ2h0OiBmdW5jdGlvbiggZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcyApIHtcblx0XHRcdGlmICggZWxlbWVudC50eXBlID09PSBcInJhZGlvXCIgKSB7XG5cdFx0XHRcdHRoaXMuZmluZEJ5TmFtZSggZWxlbWVudC5uYW1lICkuYWRkQ2xhc3MoIGVycm9yQ2xhc3MgKS5yZW1vdmVDbGFzcyggdmFsaWRDbGFzcyApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCggZWxlbWVudCApLmFkZENsYXNzKCBlcnJvckNsYXNzICkucmVtb3ZlQ2xhc3MoIHZhbGlkQ2xhc3MgKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHVuaGlnaGxpZ2h0OiBmdW5jdGlvbiggZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcyApIHtcblx0XHRcdGlmICggZWxlbWVudC50eXBlID09PSBcInJhZGlvXCIgKSB7XG5cdFx0XHRcdHRoaXMuZmluZEJ5TmFtZSggZWxlbWVudC5uYW1lICkucmVtb3ZlQ2xhc3MoIGVycm9yQ2xhc3MgKS5hZGRDbGFzcyggdmFsaWRDbGFzcyApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JCggZWxlbWVudCApLnJlbW92ZUNsYXNzKCBlcnJvckNsYXNzICkuYWRkQ2xhc3MoIHZhbGlkQ2xhc3MgKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL2pRdWVyeS52YWxpZGF0b3Iuc2V0RGVmYXVsdHMvXG5cdHNldERlZmF1bHRzOiBmdW5jdGlvbiggc2V0dGluZ3MgKSB7XG5cdFx0JC5leHRlbmQoICQudmFsaWRhdG9yLmRlZmF1bHRzLCBzZXR0aW5ncyApO1xuXHR9LFxuXG5cdG1lc3NhZ2VzOiB7XG5cdFx0cmVxdWlyZWQ6IFwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZC5cIixcblx0XHRyZW1vdGU6IFwiUGxlYXNlIGZpeCB0aGlzIGZpZWxkLlwiLFxuXHRcdGVtYWlsOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuXCIsXG5cdFx0dXJsOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIFVSTC5cIixcblx0XHRkYXRlOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGRhdGUuXCIsXG5cdFx0ZGF0ZUlTTzogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBkYXRlICggSVNPICkuXCIsXG5cdFx0bnVtYmVyOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIG51bWJlci5cIixcblx0XHRkaWdpdHM6IFwiUGxlYXNlIGVudGVyIG9ubHkgZGlnaXRzLlwiLFxuXHRcdGVxdWFsVG86IFwiUGxlYXNlIGVudGVyIHRoZSBzYW1lIHZhbHVlIGFnYWluLlwiLFxuXHRcdG1heGxlbmd0aDogJC52YWxpZGF0b3IuZm9ybWF0KCBcIlBsZWFzZSBlbnRlciBubyBtb3JlIHRoYW4gezB9IGNoYXJhY3RlcnMuXCIgKSxcblx0XHRtaW5sZW5ndGg6ICQudmFsaWRhdG9yLmZvcm1hdCggXCJQbGVhc2UgZW50ZXIgYXQgbGVhc3QgezB9IGNoYXJhY3RlcnMuXCIgKSxcblx0XHRyYW5nZWxlbmd0aDogJC52YWxpZGF0b3IuZm9ybWF0KCBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGJldHdlZW4gezB9IGFuZCB7MX0gY2hhcmFjdGVycyBsb25nLlwiICksXG5cdFx0cmFuZ2U6ICQudmFsaWRhdG9yLmZvcm1hdCggXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBiZXR3ZWVuIHswfSBhbmQgezF9LlwiICksXG5cdFx0bWF4OiAkLnZhbGlkYXRvci5mb3JtYXQoIFwiUGxlYXNlIGVudGVyIGEgdmFsdWUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHswfS5cIiApLFxuXHRcdG1pbjogJC52YWxpZGF0b3IuZm9ybWF0KCBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB7MH0uXCIgKSxcblx0XHRzdGVwOiAkLnZhbGlkYXRvci5mb3JtYXQoIFwiUGxlYXNlIGVudGVyIGEgbXVsdGlwbGUgb2YgezB9LlwiIClcblx0fSxcblxuXHRhdXRvQ3JlYXRlUmFuZ2VzOiBmYWxzZSxcblxuXHRwcm90b3R5cGU6IHtcblxuXHRcdGluaXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5sYWJlbENvbnRhaW5lciA9ICQoIHRoaXMuc2V0dGluZ3MuZXJyb3JMYWJlbENvbnRhaW5lciApO1xuXHRcdFx0dGhpcy5lcnJvckNvbnRleHQgPSB0aGlzLmxhYmVsQ29udGFpbmVyLmxlbmd0aCAmJiB0aGlzLmxhYmVsQ29udGFpbmVyIHx8ICQoIHRoaXMuY3VycmVudEZvcm0gKTtcblx0XHRcdHRoaXMuY29udGFpbmVycyA9ICQoIHRoaXMuc2V0dGluZ3MuZXJyb3JDb250YWluZXIgKS5hZGQoIHRoaXMuc2V0dGluZ3MuZXJyb3JMYWJlbENvbnRhaW5lciApO1xuXHRcdFx0dGhpcy5zdWJtaXR0ZWQgPSB7fTtcblx0XHRcdHRoaXMudmFsdWVDYWNoZSA9IHt9O1xuXHRcdFx0dGhpcy5wZW5kaW5nUmVxdWVzdCA9IDA7XG5cdFx0XHR0aGlzLnBlbmRpbmcgPSB7fTtcblx0XHRcdHRoaXMuaW52YWxpZCA9IHt9O1xuXHRcdFx0dGhpcy5yZXNldCgpO1xuXG5cdFx0XHR2YXIgZ3JvdXBzID0gKCB0aGlzLmdyb3VwcyA9IHt9ICksXG5cdFx0XHRcdHJ1bGVzO1xuXHRcdFx0JC5lYWNoKCB0aGlzLnNldHRpbmdzLmdyb3VwcywgZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XG5cdFx0XHRcdGlmICggdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWUuc3BsaXQoIC9cXHMvICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JC5lYWNoKCB2YWx1ZSwgZnVuY3Rpb24oIGluZGV4LCBuYW1lICkge1xuXHRcdFx0XHRcdGdyb3Vwc1sgbmFtZSBdID0ga2V5O1xuXHRcdFx0XHR9ICk7XG5cdFx0XHR9ICk7XG5cdFx0XHRydWxlcyA9IHRoaXMuc2V0dGluZ3MucnVsZXM7XG5cdFx0XHQkLmVhY2goIHJ1bGVzLCBmdW5jdGlvbigga2V5LCB2YWx1ZSApIHtcblx0XHRcdFx0cnVsZXNbIGtleSBdID0gJC52YWxpZGF0b3Iubm9ybWFsaXplUnVsZSggdmFsdWUgKTtcblx0XHRcdH0gKTtcblxuXHRcdFx0ZnVuY3Rpb24gZGVsZWdhdGUoIGV2ZW50ICkge1xuXHRcdFx0XHR2YXIgdmFsaWRhdG9yID0gJC5kYXRhKCB0aGlzLmZvcm0sIFwidmFsaWRhdG9yXCIgKSxcblx0XHRcdFx0XHRldmVudFR5cGUgPSBcIm9uXCIgKyBldmVudC50eXBlLnJlcGxhY2UoIC9edmFsaWRhdGUvLCBcIlwiICksXG5cdFx0XHRcdFx0c2V0dGluZ3MgPSB2YWxpZGF0b3Iuc2V0dGluZ3M7XG5cdFx0XHRcdGlmICggc2V0dGluZ3NbIGV2ZW50VHlwZSBdICYmICEkKCB0aGlzICkuaXMoIHNldHRpbmdzLmlnbm9yZSApICkge1xuXHRcdFx0XHRcdHNldHRpbmdzWyBldmVudFR5cGUgXS5jYWxsKCB2YWxpZGF0b3IsIHRoaXMsIGV2ZW50ICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0JCggdGhpcy5jdXJyZW50Rm9ybSApXG5cdFx0XHRcdC5vbiggXCJmb2N1c2luLnZhbGlkYXRlIGZvY3Vzb3V0LnZhbGlkYXRlIGtleXVwLnZhbGlkYXRlXCIsXG5cdFx0XHRcdFx0XCI6dGV4dCwgW3R5cGU9J3Bhc3N3b3JkJ10sIFt0eXBlPSdmaWxlJ10sIHNlbGVjdCwgdGV4dGFyZWEsIFt0eXBlPSdudW1iZXInXSwgW3R5cGU9J3NlYXJjaCddLCBcIiArXG5cdFx0XHRcdFx0XCJbdHlwZT0ndGVsJ10sIFt0eXBlPSd1cmwnXSwgW3R5cGU9J2VtYWlsJ10sIFt0eXBlPSdkYXRldGltZSddLCBbdHlwZT0nZGF0ZSddLCBbdHlwZT0nbW9udGgnXSwgXCIgK1xuXHRcdFx0XHRcdFwiW3R5cGU9J3dlZWsnXSwgW3R5cGU9J3RpbWUnXSwgW3R5cGU9J2RhdGV0aW1lLWxvY2FsJ10sIFt0eXBlPSdyYW5nZSddLCBbdHlwZT0nY29sb3InXSwgXCIgK1xuXHRcdFx0XHRcdFwiW3R5cGU9J3JhZGlvJ10sIFt0eXBlPSdjaGVja2JveCddLCBbY29udGVudGVkaXRhYmxlXVwiLCBkZWxlZ2F0ZSApXG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lLCBvbGRJRVxuXHRcdFx0XHQvLyBcInNlbGVjdFwiIGlzIHByb3ZpZGVkIGFzIGV2ZW50LnRhcmdldCB3aGVuIGNsaWNraW5nIGEgb3B0aW9uXG5cdFx0XHRcdC5vbiggXCJjbGljay52YWxpZGF0ZVwiLCBcInNlbGVjdCwgb3B0aW9uLCBbdHlwZT0ncmFkaW8nXSwgW3R5cGU9J2NoZWNrYm94J11cIiwgZGVsZWdhdGUgKTtcblxuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLmludmFsaWRIYW5kbGVyICkge1xuXHRcdFx0XHQkKCB0aGlzLmN1cnJlbnRGb3JtICkub24oIFwiaW52YWxpZC1mb3JtLnZhbGlkYXRlXCIsIHRoaXMuc2V0dGluZ3MuaW52YWxpZEhhbmRsZXIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIGFyaWEtcmVxdWlyZWQgdG8gYW55IFN0YXRpYy9EYXRhL0NsYXNzIHJlcXVpcmVkIGZpZWxkcyBiZWZvcmUgZmlyc3QgdmFsaWRhdGlvblxuXHRcdFx0Ly8gU2NyZWVuIHJlYWRlcnMgcmVxdWlyZSB0aGlzIGF0dHJpYnV0ZSB0byBiZSBwcmVzZW50IGJlZm9yZSB0aGUgaW5pdGlhbCBzdWJtaXNzaW9uIGh0dHA6Ly93d3cudzMub3JnL1RSL1dDQUctVEVDSFMvQVJJQTIuaHRtbFxuXHRcdFx0JCggdGhpcy5jdXJyZW50Rm9ybSApLmZpbmQoIFwiW3JlcXVpcmVkXSwgW2RhdGEtcnVsZS1yZXF1aXJlZF0sIC5yZXF1aXJlZFwiICkuYXR0ciggXCJhcmlhLXJlcXVpcmVkXCIsIFwidHJ1ZVwiICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9WYWxpZGF0b3IuZm9ybS9cblx0XHRmb3JtOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMuY2hlY2tGb3JtKCk7XG5cdFx0XHQkLmV4dGVuZCggdGhpcy5zdWJtaXR0ZWQsIHRoaXMuZXJyb3JNYXAgKTtcblx0XHRcdHRoaXMuaW52YWxpZCA9ICQuZXh0ZW5kKCB7fSwgdGhpcy5lcnJvck1hcCApO1xuXHRcdFx0aWYgKCAhdGhpcy52YWxpZCgpICkge1xuXHRcdFx0XHQkKCB0aGlzLmN1cnJlbnRGb3JtICkudHJpZ2dlckhhbmRsZXIoIFwiaW52YWxpZC1mb3JtXCIsIFsgdGhpcyBdICk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNob3dFcnJvcnMoKTtcblx0XHRcdHJldHVybiB0aGlzLnZhbGlkKCk7XG5cdFx0fSxcblxuXHRcdGNoZWNrRm9ybTogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnByZXBhcmVGb3JtKCk7XG5cdFx0XHRmb3IgKCB2YXIgaSA9IDAsIGVsZW1lbnRzID0gKCB0aGlzLmN1cnJlbnRFbGVtZW50cyA9IHRoaXMuZWxlbWVudHMoKSApOyBlbGVtZW50c1sgaSBdOyBpKysgKSB7XG5cdFx0XHRcdHRoaXMuY2hlY2soIGVsZW1lbnRzWyBpIF0gKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLnZhbGlkKCk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9WYWxpZGF0b3IuZWxlbWVudC9cblx0XHRlbGVtZW50OiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdHZhciBjbGVhbkVsZW1lbnQgPSB0aGlzLmNsZWFuKCBlbGVtZW50ICksXG5cdFx0XHRcdGNoZWNrRWxlbWVudCA9IHRoaXMudmFsaWRhdGlvblRhcmdldEZvciggY2xlYW5FbGVtZW50ICksXG5cdFx0XHRcdHYgPSB0aGlzLFxuXHRcdFx0XHRyZXN1bHQgPSB0cnVlLFxuXHRcdFx0XHRycywgZ3JvdXA7XG5cblx0XHRcdGlmICggY2hlY2tFbGVtZW50ID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmludmFsaWRbIGNsZWFuRWxlbWVudC5uYW1lIF07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnByZXBhcmVFbGVtZW50KCBjaGVja0VsZW1lbnQgKTtcblx0XHRcdFx0dGhpcy5jdXJyZW50RWxlbWVudHMgPSAkKCBjaGVja0VsZW1lbnQgKTtcblxuXHRcdFx0XHQvLyBJZiB0aGlzIGVsZW1lbnQgaXMgZ3JvdXBlZCwgdGhlbiB2YWxpZGF0ZSBhbGwgZ3JvdXAgZWxlbWVudHMgYWxyZWFkeVxuXHRcdFx0XHQvLyBjb250YWluaW5nIGEgdmFsdWVcblx0XHRcdFx0Z3JvdXAgPSB0aGlzLmdyb3Vwc1sgY2hlY2tFbGVtZW50Lm5hbWUgXTtcblx0XHRcdFx0aWYgKCBncm91cCApIHtcblx0XHRcdFx0XHQkLmVhY2goIHRoaXMuZ3JvdXBzLCBmdW5jdGlvbiggbmFtZSwgdGVzdGdyb3VwICkge1xuXHRcdFx0XHRcdFx0aWYgKCB0ZXN0Z3JvdXAgPT09IGdyb3VwICYmIG5hbWUgIT09IGNoZWNrRWxlbWVudC5uYW1lICkge1xuXHRcdFx0XHRcdFx0XHRjbGVhbkVsZW1lbnQgPSB2LnZhbGlkYXRpb25UYXJnZXRGb3IoIHYuY2xlYW4oIHYuZmluZEJ5TmFtZSggbmFtZSApICkgKTtcblx0XHRcdFx0XHRcdFx0aWYgKCBjbGVhbkVsZW1lbnQgJiYgY2xlYW5FbGVtZW50Lm5hbWUgaW4gdi5pbnZhbGlkICkge1xuXHRcdFx0XHRcdFx0XHRcdHYuY3VycmVudEVsZW1lbnRzLnB1c2goIGNsZWFuRWxlbWVudCApO1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdCAmJiB2LmNoZWNrKCBjbGVhbkVsZW1lbnQgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJzID0gdGhpcy5jaGVjayggY2hlY2tFbGVtZW50ICkgIT09IGZhbHNlO1xuXHRcdFx0XHRyZXN1bHQgPSByZXN1bHQgJiYgcnM7XG5cdFx0XHRcdGlmICggcnMgKSB7XG5cdFx0XHRcdFx0dGhpcy5pbnZhbGlkWyBjaGVja0VsZW1lbnQubmFtZSBdID0gZmFsc2U7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5pbnZhbGlkWyBjaGVja0VsZW1lbnQubmFtZSBdID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggIXRoaXMubnVtYmVyT2ZJbnZhbGlkcygpICkge1xuXG5cdFx0XHRcdFx0Ly8gSGlkZSBlcnJvciBjb250YWluZXJzIG9uIGxhc3QgZXJyb3Jcblx0XHRcdFx0XHR0aGlzLnRvSGlkZSA9IHRoaXMudG9IaWRlLmFkZCggdGhpcy5jb250YWluZXJzICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5zaG93RXJyb3JzKCk7XG5cblx0XHRcdFx0Ly8gQWRkIGFyaWEtaW52YWxpZCBzdGF0dXMgZm9yIHNjcmVlbiByZWFkZXJzXG5cdFx0XHRcdCQoIGVsZW1lbnQgKS5hdHRyKCBcImFyaWEtaW52YWxpZFwiLCAhcnMgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL1ZhbGlkYXRvci5zaG93RXJyb3JzL1xuXHRcdHNob3dFcnJvcnM6IGZ1bmN0aW9uKCBlcnJvcnMgKSB7XG5cdFx0XHRpZiAoIGVycm9ycyApIHtcblx0XHRcdFx0dmFyIHZhbGlkYXRvciA9IHRoaXM7XG5cblx0XHRcdFx0Ly8gQWRkIGl0ZW1zIHRvIGVycm9yIGxpc3QgYW5kIG1hcFxuXHRcdFx0XHQkLmV4dGVuZCggdGhpcy5lcnJvck1hcCwgZXJyb3JzICk7XG5cdFx0XHRcdHRoaXMuZXJyb3JMaXN0ID0gJC5tYXAoIHRoaXMuZXJyb3JNYXAsIGZ1bmN0aW9uKCBtZXNzYWdlLCBuYW1lICkge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBtZXNzYWdlLFxuXHRcdFx0XHRcdFx0ZWxlbWVudDogdmFsaWRhdG9yLmZpbmRCeU5hbWUoIG5hbWUgKVsgMCBdXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fSApO1xuXG5cdFx0XHRcdC8vIFJlbW92ZSBpdGVtcyBmcm9tIHN1Y2Nlc3MgbGlzdFxuXHRcdFx0XHR0aGlzLnN1Y2Nlc3NMaXN0ID0gJC5ncmVwKCB0aGlzLnN1Y2Nlc3NMaXN0LCBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdFx0XHRyZXR1cm4gISggZWxlbWVudC5uYW1lIGluIGVycm9ycyApO1xuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHRoaXMuc2V0dGluZ3Muc2hvd0Vycm9ycyApIHtcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5zaG93RXJyb3JzLmNhbGwoIHRoaXMsIHRoaXMuZXJyb3JNYXAsIHRoaXMuZXJyb3JMaXN0ICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmRlZmF1bHRTaG93RXJyb3JzKCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9WYWxpZGF0b3IucmVzZXRGb3JtL1xuXHRcdHJlc2V0Rm9ybTogZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoICQuZm4ucmVzZXRGb3JtICkge1xuXHRcdFx0XHQkKCB0aGlzLmN1cnJlbnRGb3JtICkucmVzZXRGb3JtKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmludmFsaWQgPSB7fTtcblx0XHRcdHRoaXMuc3VibWl0dGVkID0ge307XG5cdFx0XHR0aGlzLnByZXBhcmVGb3JtKCk7XG5cdFx0XHR0aGlzLmhpZGVFcnJvcnMoKTtcblx0XHRcdHZhciBlbGVtZW50cyA9IHRoaXMuZWxlbWVudHMoKVxuXHRcdFx0XHQucmVtb3ZlRGF0YSggXCJwcmV2aW91c1ZhbHVlXCIgKVxuXHRcdFx0XHQucmVtb3ZlQXR0ciggXCJhcmlhLWludmFsaWRcIiApO1xuXG5cdFx0XHR0aGlzLnJlc2V0RWxlbWVudHMoIGVsZW1lbnRzICk7XG5cdFx0fSxcblxuXHRcdHJlc2V0RWxlbWVudHM6IGZ1bmN0aW9uKCBlbGVtZW50cyApIHtcblx0XHRcdHZhciBpO1xuXG5cdFx0XHRpZiAoIHRoaXMuc2V0dGluZ3MudW5oaWdobGlnaHQgKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwOyBlbGVtZW50c1sgaSBdOyBpKysgKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy51bmhpZ2hsaWdodC5jYWxsKCB0aGlzLCBlbGVtZW50c1sgaSBdLFxuXHRcdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzLCBcIlwiICk7XG5cdFx0XHRcdFx0dGhpcy5maW5kQnlOYW1lKCBlbGVtZW50c1sgaSBdLm5hbWUgKS5yZW1vdmVDbGFzcyggdGhpcy5zZXR0aW5ncy52YWxpZENsYXNzICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnRzXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCB0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MgKVxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcyggdGhpcy5zZXR0aW5ncy52YWxpZENsYXNzICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdG51bWJlck9mSW52YWxpZHM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMub2JqZWN0TGVuZ3RoKCB0aGlzLmludmFsaWQgKTtcblx0XHR9LFxuXG5cdFx0b2JqZWN0TGVuZ3RoOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdFx0LyoganNoaW50IHVudXNlZDogZmFsc2UgKi9cblx0XHRcdHZhciBjb3VudCA9IDAsXG5cdFx0XHRcdGk7XG5cdFx0XHRmb3IgKCBpIGluIG9iaiApIHtcblx0XHRcdFx0aWYgKCBvYmpbIGkgXSApIHtcblx0XHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY291bnQ7XG5cdFx0fSxcblxuXHRcdGhpZGVFcnJvcnM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5oaWRlVGhlc2UoIHRoaXMudG9IaWRlICk7XG5cdFx0fSxcblxuXHRcdGhpZGVUaGVzZTogZnVuY3Rpb24oIGVycm9ycyApIHtcblx0XHRcdGVycm9ycy5ub3QoIHRoaXMuY29udGFpbmVycyApLnRleHQoIFwiXCIgKTtcblx0XHRcdHRoaXMuYWRkV3JhcHBlciggZXJyb3JzICkuaGlkZSgpO1xuXHRcdH0sXG5cblx0XHR2YWxpZDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zaXplKCkgPT09IDA7XG5cdFx0fSxcblxuXHRcdHNpemU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZXJyb3JMaXN0Lmxlbmd0aDtcblx0XHR9LFxuXG5cdFx0Zm9jdXNJbnZhbGlkOiBmdW5jdGlvbigpIHtcblx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy5mb2N1c0ludmFsaWQgKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0JCggdGhpcy5maW5kTGFzdEFjdGl2ZSgpIHx8IHRoaXMuZXJyb3JMaXN0Lmxlbmd0aCAmJiB0aGlzLmVycm9yTGlzdFsgMCBdLmVsZW1lbnQgfHwgW10gKVxuXHRcdFx0XHRcdC5maWx0ZXIoIFwiOnZpc2libGVcIiApXG5cdFx0XHRcdFx0LmZvY3VzKClcblxuXHRcdFx0XHRcdC8vIE1hbnVhbGx5IHRyaWdnZXIgZm9jdXNpbiBldmVudDsgd2l0aG91dCBpdCwgZm9jdXNpbiBoYW5kbGVyIGlzbid0IGNhbGxlZCwgZmluZExhc3RBY3RpdmUgd29uJ3QgaGF2ZSBhbnl0aGluZyB0byBmaW5kXG5cdFx0XHRcdFx0LnRyaWdnZXIoIFwiZm9jdXNpblwiICk7XG5cdFx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRcdFx0Ly8gSWdub3JlIElFIHRocm93aW5nIGVycm9ycyB3aGVuIGZvY3VzaW5nIGhpZGRlbiBlbGVtZW50c1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGZpbmRMYXN0QWN0aXZlOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBsYXN0QWN0aXZlID0gdGhpcy5sYXN0QWN0aXZlO1xuXHRcdFx0cmV0dXJuIGxhc3RBY3RpdmUgJiYgJC5ncmVwKCB0aGlzLmVycm9yTGlzdCwgZnVuY3Rpb24oIG4gKSB7XG5cdFx0XHRcdHJldHVybiBuLmVsZW1lbnQubmFtZSA9PT0gbGFzdEFjdGl2ZS5uYW1lO1xuXHRcdFx0fSApLmxlbmd0aCA9PT0gMSAmJiBsYXN0QWN0aXZlO1xuXHRcdH0sXG5cblx0XHRlbGVtZW50czogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdmFsaWRhdG9yID0gdGhpcyxcblx0XHRcdFx0cnVsZXNDYWNoZSA9IHt9O1xuXG5cdFx0XHQvLyBTZWxlY3QgYWxsIHZhbGlkIGlucHV0cyBpbnNpZGUgdGhlIGZvcm0gKG5vIHN1Ym1pdCBvciByZXNldCBidXR0b25zKVxuXHRcdFx0cmV0dXJuICQoIHRoaXMuY3VycmVudEZvcm0gKVxuXHRcdFx0LmZpbmQoIFwiaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIFtjb250ZW50ZWRpdGFibGVdXCIgKVxuXHRcdFx0Lm5vdCggXCI6c3VibWl0LCA6cmVzZXQsIDppbWFnZSwgOmRpc2FibGVkXCIgKVxuXHRcdFx0Lm5vdCggdGhpcy5zZXR0aW5ncy5pZ25vcmUgKVxuXHRcdFx0LmZpbHRlciggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBuYW1lID0gdGhpcy5uYW1lIHx8ICQoIHRoaXMgKS5hdHRyKCBcIm5hbWVcIiApOyAvLyBGb3IgY29udGVudGVkaXRhYmxlXG5cdFx0XHRcdGlmICggIW5hbWUgJiYgdmFsaWRhdG9yLnNldHRpbmdzLmRlYnVnICYmIHdpbmRvdy5jb25zb2xlICkge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoIFwiJW8gaGFzIG5vIG5hbWUgYXNzaWduZWRcIiwgdGhpcyApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU2V0IGZvcm0gZXhwYW5kbyBvbiBjb250ZW50ZWRpdGFibGVcblx0XHRcdFx0aWYgKCB0aGlzLmhhc0F0dHJpYnV0ZSggXCJjb250ZW50ZWRpdGFibGVcIiApICkge1xuXHRcdFx0XHRcdHRoaXMuZm9ybSA9ICQoIHRoaXMgKS5jbG9zZXN0KCBcImZvcm1cIiApWyAwIF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTZWxlY3Qgb25seSB0aGUgZmlyc3QgZWxlbWVudCBmb3IgZWFjaCBuYW1lLCBhbmQgb25seSB0aG9zZSB3aXRoIHJ1bGVzIHNwZWNpZmllZFxuXHRcdFx0XHRpZiAoIG5hbWUgaW4gcnVsZXNDYWNoZSB8fCAhdmFsaWRhdG9yLm9iamVjdExlbmd0aCggJCggdGhpcyApLnJ1bGVzKCkgKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRydWxlc0NhY2hlWyBuYW1lIF0gPSB0cnVlO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0gKTtcblx0XHR9LFxuXG5cdFx0Y2xlYW46IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRcdHJldHVybiAkKCBzZWxlY3RvciApWyAwIF07XG5cdFx0fSxcblxuXHRcdGVycm9yczogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZXJyb3JDbGFzcyA9IHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcy5zcGxpdCggXCIgXCIgKS5qb2luKCBcIi5cIiApO1xuXHRcdFx0cmV0dXJuICQoIHRoaXMuc2V0dGluZ3MuZXJyb3JFbGVtZW50ICsgXCIuXCIgKyBlcnJvckNsYXNzLCB0aGlzLmVycm9yQ29udGV4dCApO1xuXHRcdH0sXG5cblx0XHRyZXNldEludGVybmFsczogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnN1Y2Nlc3NMaXN0ID0gW107XG5cdFx0XHR0aGlzLmVycm9yTGlzdCA9IFtdO1xuXHRcdFx0dGhpcy5lcnJvck1hcCA9IHt9O1xuXHRcdFx0dGhpcy50b1Nob3cgPSAkKCBbXSApO1xuXHRcdFx0dGhpcy50b0hpZGUgPSAkKCBbXSApO1xuXHRcdH0sXG5cblx0XHRyZXNldDogZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLnJlc2V0SW50ZXJuYWxzKCk7XG5cdFx0XHR0aGlzLmN1cnJlbnRFbGVtZW50cyA9ICQoIFtdICk7XG5cdFx0fSxcblxuXHRcdHByZXBhcmVGb3JtOiBmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMucmVzZXQoKTtcblx0XHRcdHRoaXMudG9IaWRlID0gdGhpcy5lcnJvcnMoKS5hZGQoIHRoaXMuY29udGFpbmVycyApO1xuXHRcdH0sXG5cblx0XHRwcmVwYXJlRWxlbWVudDogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHR0aGlzLnJlc2V0KCk7XG5cdFx0XHR0aGlzLnRvSGlkZSA9IHRoaXMuZXJyb3JzRm9yKCBlbGVtZW50ICk7XG5cdFx0fSxcblxuXHRcdGVsZW1lbnRWYWx1ZTogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHR2YXIgJGVsZW1lbnQgPSAkKCBlbGVtZW50ICksXG5cdFx0XHRcdHR5cGUgPSBlbGVtZW50LnR5cGUsXG5cdFx0XHRcdHZhbCwgaWR4O1xuXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwicmFkaW9cIiB8fCB0eXBlID09PSBcImNoZWNrYm94XCIgKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmZpbmRCeU5hbWUoIGVsZW1lbnQubmFtZSApLmZpbHRlciggXCI6Y2hlY2tlZFwiICkudmFsKCk7XG5cdFx0XHR9IGVsc2UgaWYgKCB0eXBlID09PSBcIm51bWJlclwiICYmIHR5cGVvZiBlbGVtZW50LnZhbGlkaXR5ICE9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbWVudC52YWxpZGl0eS5iYWRJbnB1dCA/IFwiTmFOXCIgOiAkZWxlbWVudC52YWwoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBlbGVtZW50Lmhhc0F0dHJpYnV0ZSggXCJjb250ZW50ZWRpdGFibGVcIiApICkge1xuXHRcdFx0XHR2YWwgPSAkZWxlbWVudC50ZXh0KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YWwgPSAkZWxlbWVudC52YWwoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCB0eXBlID09PSBcImZpbGVcIiApIHtcblxuXHRcdFx0XHQvLyBNb2Rlcm4gYnJvd3NlciAoY2hyb21lICYgc2FmYXJpKVxuXHRcdFx0XHRpZiAoIHZhbC5zdWJzdHIoIDAsIDEyICkgPT09IFwiQzpcXFxcZmFrZXBhdGhcXFxcXCIgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbC5zdWJzdHIoIDEyICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBMZWdhY3kgYnJvd3NlcnNcblx0XHRcdFx0Ly8gVW5peC1iYXNlZCBwYXRoXG5cdFx0XHRcdGlkeCA9IHZhbC5sYXN0SW5kZXhPZiggXCIvXCIgKTtcblx0XHRcdFx0aWYgKCBpZHggPj0gMCApIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsLnN1YnN0ciggaWR4ICsgMSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gV2luZG93cy1iYXNlZCBwYXRoXG5cdFx0XHRcdGlkeCA9IHZhbC5sYXN0SW5kZXhPZiggXCJcXFxcXCIgKTtcblx0XHRcdFx0aWYgKCBpZHggPj0gMCApIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsLnN1YnN0ciggaWR4ICsgMSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSnVzdCB0aGUgZmlsZSBuYW1lXG5cdFx0XHRcdHJldHVybiB2YWw7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggdHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdFx0cmV0dXJuIHZhbC5yZXBsYWNlKCAvXFxyL2csIFwiXCIgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB2YWw7XG5cdFx0fSxcblxuXHRcdGNoZWNrOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdGVsZW1lbnQgPSB0aGlzLnZhbGlkYXRpb25UYXJnZXRGb3IoIHRoaXMuY2xlYW4oIGVsZW1lbnQgKSApO1xuXG5cdFx0XHR2YXIgcnVsZXMgPSAkKCBlbGVtZW50ICkucnVsZXMoKSxcblx0XHRcdFx0cnVsZXNDb3VudCA9ICQubWFwKCBydWxlcywgZnVuY3Rpb24oIG4sIGkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHRcdH0gKS5sZW5ndGgsXG5cdFx0XHRcdGRlcGVuZGVuY3lNaXNtYXRjaCA9IGZhbHNlLFxuXHRcdFx0XHR2YWwgPSB0aGlzLmVsZW1lbnRWYWx1ZSggZWxlbWVudCApLFxuXHRcdFx0XHRyZXN1bHQsIG1ldGhvZCwgcnVsZTtcblxuXHRcdFx0Ly8gSWYgYSBub3JtYWxpemVyIGlzIGRlZmluZWQgZm9yIHRoaXMgZWxlbWVudCwgdGhlblxuXHRcdFx0Ly8gY2FsbCBpdCB0byByZXRyZWl2ZSB0aGUgY2hhbmdlZCB2YWx1ZSBpbnN0ZWFkXG5cdFx0XHQvLyBvZiB1c2luZyB0aGUgcmVhbCBvbmUuXG5cdFx0XHQvLyBOb3RlIHRoYXQgYHRoaXNgIGluIHRoZSBub3JtYWxpemVyIGlzIGBlbGVtZW50YC5cblx0XHRcdGlmICggdHlwZW9mIHJ1bGVzLm5vcm1hbGl6ZXIgPT09IFwiZnVuY3Rpb25cIiApIHtcblx0XHRcdFx0dmFsID0gcnVsZXMubm9ybWFsaXplci5jYWxsKCBlbGVtZW50LCB2YWwgKTtcblxuXHRcdFx0XHRpZiAoIHR5cGVvZiB2YWwgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvciggXCJUaGUgbm9ybWFsaXplciBzaG91bGQgcmV0dXJuIGEgc3RyaW5nIHZhbHVlLlwiICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBEZWxldGUgdGhlIG5vcm1hbGl6ZXIgZnJvbSBydWxlcyB0byBhdm9pZCB0cmVhdGluZ1xuXHRcdFx0XHQvLyBpdCBhcyBhIHByZS1kZWZpbmVkIG1ldGhvZC5cblx0XHRcdFx0ZGVsZXRlIHJ1bGVzLm5vcm1hbGl6ZXI7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoIG1ldGhvZCBpbiBydWxlcyApIHtcblx0XHRcdFx0cnVsZSA9IHsgbWV0aG9kOiBtZXRob2QsIHBhcmFtZXRlcnM6IHJ1bGVzWyBtZXRob2QgXSB9O1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJlc3VsdCA9ICQudmFsaWRhdG9yLm1ldGhvZHNbIG1ldGhvZCBdLmNhbGwoIHRoaXMsIHZhbCwgZWxlbWVudCwgcnVsZS5wYXJhbWV0ZXJzICk7XG5cblx0XHRcdFx0XHQvLyBJZiBhIG1ldGhvZCBpbmRpY2F0ZXMgdGhhdCB0aGUgZmllbGQgaXMgb3B0aW9uYWwgYW5kIHRoZXJlZm9yZSB2YWxpZCxcblx0XHRcdFx0XHQvLyBkb24ndCBtYXJrIGl0IGFzIHZhbGlkIHdoZW4gdGhlcmUgYXJlIG5vIG90aGVyIHJ1bGVzXG5cdFx0XHRcdFx0aWYgKCByZXN1bHQgPT09IFwiZGVwZW5kZW5jeS1taXNtYXRjaFwiICYmIHJ1bGVzQ291bnQgPT09IDEgKSB7XG5cdFx0XHRcdFx0XHRkZXBlbmRlbmN5TWlzbWF0Y2ggPSB0cnVlO1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRlcGVuZGVuY3lNaXNtYXRjaCA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKCByZXN1bHQgPT09IFwicGVuZGluZ1wiICkge1xuXHRcdFx0XHRcdFx0dGhpcy50b0hpZGUgPSB0aGlzLnRvSGlkZS5ub3QoIHRoaXMuZXJyb3JzRm9yKCBlbGVtZW50ICkgKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoICFyZXN1bHQgKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmZvcm1hdEFuZEFkZCggZWxlbWVudCwgcnVsZSApO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLmRlYnVnICYmIHdpbmRvdy5jb25zb2xlICkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coIFwiRXhjZXB0aW9uIG9jY3VycmVkIHdoZW4gY2hlY2tpbmcgZWxlbWVudCBcIiArIGVsZW1lbnQuaWQgKyBcIiwgY2hlY2sgdGhlICdcIiArIHJ1bGUubWV0aG9kICsgXCInIG1ldGhvZC5cIiwgZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIGUgaW5zdGFuY2VvZiBUeXBlRXJyb3IgKSB7XG5cdFx0XHRcdFx0XHRlLm1lc3NhZ2UgKz0gXCIuICBFeGNlcHRpb24gb2NjdXJyZWQgd2hlbiBjaGVja2luZyBlbGVtZW50IFwiICsgZWxlbWVudC5pZCArIFwiLCBjaGVjayB0aGUgJ1wiICsgcnVsZS5tZXRob2QgKyBcIicgbWV0aG9kLlwiO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRocm93IGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICggZGVwZW5kZW5jeU1pc21hdGNoICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHRoaXMub2JqZWN0TGVuZ3RoKCBydWxlcyApICkge1xuXHRcdFx0XHR0aGlzLnN1Y2Nlc3NMaXN0LnB1c2goIGVsZW1lbnQgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm4gdGhlIGN1c3RvbSBtZXNzYWdlIGZvciB0aGUgZ2l2ZW4gZWxlbWVudCBhbmQgdmFsaWRhdGlvbiBtZXRob2Rcblx0XHQvLyBzcGVjaWZpZWQgaW4gdGhlIGVsZW1lbnQncyBIVE1MNSBkYXRhIGF0dHJpYnV0ZVxuXHRcdC8vIHJldHVybiB0aGUgZ2VuZXJpYyBtZXNzYWdlIGlmIHByZXNlbnQgYW5kIG5vIG1ldGhvZCBzcGVjaWZpYyBtZXNzYWdlIGlzIHByZXNlbnRcblx0XHRjdXN0b21EYXRhTWVzc2FnZTogZnVuY3Rpb24oIGVsZW1lbnQsIG1ldGhvZCApIHtcblx0XHRcdHJldHVybiAkKCBlbGVtZW50ICkuZGF0YSggXCJtc2dcIiArIG1ldGhvZC5jaGFyQXQoIDAgKS50b1VwcGVyQ2FzZSgpICtcblx0XHRcdFx0bWV0aG9kLnN1YnN0cmluZyggMSApLnRvTG93ZXJDYXNlKCkgKSB8fCAkKCBlbGVtZW50ICkuZGF0YSggXCJtc2dcIiApO1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm4gdGhlIGN1c3RvbSBtZXNzYWdlIGZvciB0aGUgZ2l2ZW4gZWxlbWVudCBuYW1lIGFuZCB2YWxpZGF0aW9uIG1ldGhvZFxuXHRcdGN1c3RvbU1lc3NhZ2U6IGZ1bmN0aW9uKCBuYW1lLCBtZXRob2QgKSB7XG5cdFx0XHR2YXIgbSA9IHRoaXMuc2V0dGluZ3MubWVzc2FnZXNbIG5hbWUgXTtcblx0XHRcdHJldHVybiBtICYmICggbS5jb25zdHJ1Y3RvciA9PT0gU3RyaW5nID8gbSA6IG1bIG1ldGhvZCBdICk7XG5cdFx0fSxcblxuXHRcdC8vIFJldHVybiB0aGUgZmlyc3QgZGVmaW5lZCBhcmd1bWVudCwgYWxsb3dpbmcgZW1wdHkgc3RyaW5nc1xuXHRcdGZpbmREZWZpbmVkOiBmdW5jdGlvbigpIHtcblx0XHRcdGZvciAoIHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBhcmd1bWVudHNbIGkgXSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHJldHVybiBhcmd1bWVudHNbIGkgXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9LFxuXG5cdFx0ZGVmYXVsdE1lc3NhZ2U6IGZ1bmN0aW9uKCBlbGVtZW50LCBydWxlICkge1xuXHRcdFx0dmFyIG1lc3NhZ2UgPSB0aGlzLmZpbmREZWZpbmVkKFxuXHRcdFx0XHRcdHRoaXMuY3VzdG9tTWVzc2FnZSggZWxlbWVudC5uYW1lLCBydWxlLm1ldGhvZCApLFxuXHRcdFx0XHRcdHRoaXMuY3VzdG9tRGF0YU1lc3NhZ2UoIGVsZW1lbnQsIHJ1bGUubWV0aG9kICksXG5cblx0XHRcdFx0XHQvLyAndGl0bGUnIGlzIG5ldmVyIHVuZGVmaW5lZCwgc28gaGFuZGxlIGVtcHR5IHN0cmluZyBhcyB1bmRlZmluZWRcblx0XHRcdFx0XHQhdGhpcy5zZXR0aW5ncy5pZ25vcmVUaXRsZSAmJiBlbGVtZW50LnRpdGxlIHx8IHVuZGVmaW5lZCxcblx0XHRcdFx0XHQkLnZhbGlkYXRvci5tZXNzYWdlc1sgcnVsZS5tZXRob2QgXSxcblx0XHRcdFx0XHRcIjxzdHJvbmc+V2FybmluZzogTm8gbWVzc2FnZSBkZWZpbmVkIGZvciBcIiArIGVsZW1lbnQubmFtZSArIFwiPC9zdHJvbmc+XCJcblx0XHRcdFx0KSxcblx0XHRcdFx0dGhlcmVnZXggPSAvXFwkP1xceyhcXGQrKVxcfS9nO1xuXHRcdFx0aWYgKCB0eXBlb2YgbWVzc2FnZSA9PT0gXCJmdW5jdGlvblwiICkge1xuXHRcdFx0XHRtZXNzYWdlID0gbWVzc2FnZS5jYWxsKCB0aGlzLCBydWxlLnBhcmFtZXRlcnMsIGVsZW1lbnQgKTtcblx0XHRcdH0gZWxzZSBpZiAoIHRoZXJlZ2V4LnRlc3QoIG1lc3NhZ2UgKSApIHtcblx0XHRcdFx0bWVzc2FnZSA9ICQudmFsaWRhdG9yLmZvcm1hdCggbWVzc2FnZS5yZXBsYWNlKCB0aGVyZWdleCwgXCJ7JDF9XCIgKSwgcnVsZS5wYXJhbWV0ZXJzICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBtZXNzYWdlO1xuXHRcdH0sXG5cblx0XHRmb3JtYXRBbmRBZGQ6IGZ1bmN0aW9uKCBlbGVtZW50LCBydWxlICkge1xuXHRcdFx0dmFyIG1lc3NhZ2UgPSB0aGlzLmRlZmF1bHRNZXNzYWdlKCBlbGVtZW50LCBydWxlICk7XG5cblx0XHRcdHRoaXMuZXJyb3JMaXN0LnB1c2goIHtcblx0XHRcdFx0bWVzc2FnZTogbWVzc2FnZSxcblx0XHRcdFx0ZWxlbWVudDogZWxlbWVudCxcblx0XHRcdFx0bWV0aG9kOiBydWxlLm1ldGhvZFxuXHRcdFx0fSApO1xuXG5cdFx0XHR0aGlzLmVycm9yTWFwWyBlbGVtZW50Lm5hbWUgXSA9IG1lc3NhZ2U7XG5cdFx0XHR0aGlzLnN1Ym1pdHRlZFsgZWxlbWVudC5uYW1lIF0gPSBtZXNzYWdlO1xuXHRcdH0sXG5cblx0XHRhZGRXcmFwcGVyOiBmdW5jdGlvbiggdG9Ub2dnbGUgKSB7XG5cdFx0XHRpZiAoIHRoaXMuc2V0dGluZ3Mud3JhcHBlciApIHtcblx0XHRcdFx0dG9Ub2dnbGUgPSB0b1RvZ2dsZS5hZGQoIHRvVG9nZ2xlLnBhcmVudCggdGhpcy5zZXR0aW5ncy53cmFwcGVyICkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0b1RvZ2dsZTtcblx0XHR9LFxuXG5cdFx0ZGVmYXVsdFNob3dFcnJvcnM6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGksIGVsZW1lbnRzLCBlcnJvcjtcblx0XHRcdGZvciAoIGkgPSAwOyB0aGlzLmVycm9yTGlzdFsgaSBdOyBpKysgKSB7XG5cdFx0XHRcdGVycm9yID0gdGhpcy5lcnJvckxpc3RbIGkgXTtcblx0XHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLmhpZ2hsaWdodCApIHtcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLmhpZ2hsaWdodC5jYWxsKCB0aGlzLCBlcnJvci5lbGVtZW50LCB0aGlzLnNldHRpbmdzLmVycm9yQ2xhc3MsIHRoaXMuc2V0dGluZ3MudmFsaWRDbGFzcyApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2hvd0xhYmVsKCBlcnJvci5lbGVtZW50LCBlcnJvci5tZXNzYWdlICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHRoaXMuZXJyb3JMaXN0Lmxlbmd0aCApIHtcblx0XHRcdFx0dGhpcy50b1Nob3cgPSB0aGlzLnRvU2hvdy5hZGQoIHRoaXMuY29udGFpbmVycyApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLnN1Y2Nlc3MgKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwOyB0aGlzLnN1Y2Nlc3NMaXN0WyBpIF07IGkrKyApIHtcblx0XHRcdFx0XHR0aGlzLnNob3dMYWJlbCggdGhpcy5zdWNjZXNzTGlzdFsgaSBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICggdGhpcy5zZXR0aW5ncy51bmhpZ2hsaWdodCApIHtcblx0XHRcdFx0Zm9yICggaSA9IDAsIGVsZW1lbnRzID0gdGhpcy52YWxpZEVsZW1lbnRzKCk7IGVsZW1lbnRzWyBpIF07IGkrKyApIHtcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLnVuaGlnaGxpZ2h0LmNhbGwoIHRoaXMsIGVsZW1lbnRzWyBpIF0sIHRoaXMuc2V0dGluZ3MuZXJyb3JDbGFzcywgdGhpcy5zZXR0aW5ncy52YWxpZENsYXNzICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMudG9IaWRlID0gdGhpcy50b0hpZGUubm90KCB0aGlzLnRvU2hvdyApO1xuXHRcdFx0dGhpcy5oaWRlRXJyb3JzKCk7XG5cdFx0XHR0aGlzLmFkZFdyYXBwZXIoIHRoaXMudG9TaG93ICkuc2hvdygpO1xuXHRcdH0sXG5cblx0XHR2YWxpZEVsZW1lbnRzOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmN1cnJlbnRFbGVtZW50cy5ub3QoIHRoaXMuaW52YWxpZEVsZW1lbnRzKCkgKTtcblx0XHR9LFxuXG5cdFx0aW52YWxpZEVsZW1lbnRzOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiAkKCB0aGlzLmVycm9yTGlzdCApLm1hcCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQ7XG5cdFx0XHR9ICk7XG5cdFx0fSxcblxuXHRcdHNob3dMYWJlbDogZnVuY3Rpb24oIGVsZW1lbnQsIG1lc3NhZ2UgKSB7XG5cdFx0XHR2YXIgcGxhY2UsIGdyb3VwLCBlcnJvcklELCB2LFxuXHRcdFx0XHRlcnJvciA9IHRoaXMuZXJyb3JzRm9yKCBlbGVtZW50ICksXG5cdFx0XHRcdGVsZW1lbnRJRCA9IHRoaXMuaWRPck5hbWUoIGVsZW1lbnQgKSxcblx0XHRcdFx0ZGVzY3JpYmVkQnkgPSAkKCBlbGVtZW50ICkuYXR0ciggXCJhcmlhLWRlc2NyaWJlZGJ5XCIgKTtcblxuXHRcdFx0aWYgKCBlcnJvci5sZW5ndGggKSB7XG5cblx0XHRcdFx0Ly8gUmVmcmVzaCBlcnJvci9zdWNjZXNzIGNsYXNzXG5cdFx0XHRcdGVycm9yLnJlbW92ZUNsYXNzKCB0aGlzLnNldHRpbmdzLnZhbGlkQ2xhc3MgKS5hZGRDbGFzcyggdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzICk7XG5cblx0XHRcdFx0Ly8gUmVwbGFjZSBtZXNzYWdlIG9uIGV4aXN0aW5nIGxhYmVsXG5cdFx0XHRcdGVycm9yLmh0bWwoIG1lc3NhZ2UgKTtcblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gQ3JlYXRlIGVycm9yIGVsZW1lbnRcblx0XHRcdFx0ZXJyb3IgPSAkKCBcIjxcIiArIHRoaXMuc2V0dGluZ3MuZXJyb3JFbGVtZW50ICsgXCI+XCIgKVxuXHRcdFx0XHRcdC5hdHRyKCBcImlkXCIsIGVsZW1lbnRJRCArIFwiLWVycm9yXCIgKVxuXHRcdFx0XHRcdC5hZGRDbGFzcyggdGhpcy5zZXR0aW5ncy5lcnJvckNsYXNzIClcblx0XHRcdFx0XHQuaHRtbCggbWVzc2FnZSB8fCBcIlwiICk7XG5cblx0XHRcdFx0Ly8gTWFpbnRhaW4gcmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50IHRvIGJlIHBsYWNlZCBpbnRvIHRoZSBET01cblx0XHRcdFx0cGxhY2UgPSBlcnJvcjtcblx0XHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLndyYXBwZXIgKSB7XG5cblx0XHRcdFx0XHQvLyBNYWtlIHN1cmUgdGhlIGVsZW1lbnQgaXMgdmlzaWJsZSwgZXZlbiBpbiBJRVxuXHRcdFx0XHRcdC8vIGFjdHVhbGx5IHNob3dpbmcgdGhlIHdyYXBwZWQgZWxlbWVudCBpcyBoYW5kbGVkIGVsc2V3aGVyZVxuXHRcdFx0XHRcdHBsYWNlID0gZXJyb3IuaGlkZSgpLnNob3coKS53cmFwKCBcIjxcIiArIHRoaXMuc2V0dGluZ3Mud3JhcHBlciArIFwiLz5cIiApLnBhcmVudCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggdGhpcy5sYWJlbENvbnRhaW5lci5sZW5ndGggKSB7XG5cdFx0XHRcdFx0dGhpcy5sYWJlbENvbnRhaW5lci5hcHBlbmQoIHBsYWNlICk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHRoaXMuc2V0dGluZ3MuZXJyb3JQbGFjZW1lbnQgKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5lcnJvclBsYWNlbWVudCggcGxhY2UsICQoIGVsZW1lbnQgKSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHBsYWNlLmluc2VydEFmdGVyKCBlbGVtZW50ICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBMaW5rIGVycm9yIGJhY2sgdG8gdGhlIGVsZW1lbnRcblx0XHRcdFx0aWYgKCBlcnJvci5pcyggXCJsYWJlbFwiICkgKSB7XG5cblx0XHRcdFx0XHQvLyBJZiB0aGUgZXJyb3IgaXMgYSBsYWJlbCwgdGhlbiBhc3NvY2lhdGUgdXNpbmcgJ2Zvcidcblx0XHRcdFx0XHRlcnJvci5hdHRyKCBcImZvclwiLCBlbGVtZW50SUQgKTtcblxuXHRcdFx0XHRcdC8vIElmIHRoZSBlbGVtZW50IGlzIG5vdCBhIGNoaWxkIG9mIGFuIGFzc29jaWF0ZWQgbGFiZWwsIHRoZW4gaXQncyBuZWNlc3Nhcnlcblx0XHRcdFx0XHQvLyB0byBleHBsaWNpdGx5IGFwcGx5IGFyaWEtZGVzY3JpYmVkYnlcblx0XHRcdFx0fSBlbHNlIGlmICggZXJyb3IucGFyZW50cyggXCJsYWJlbFtmb3I9J1wiICsgdGhpcy5lc2NhcGVDc3NNZXRhKCBlbGVtZW50SUQgKSArIFwiJ11cIiApLmxlbmd0aCA9PT0gMCApIHtcblx0XHRcdFx0XHRlcnJvcklEID0gZXJyb3IuYXR0ciggXCJpZFwiICk7XG5cblx0XHRcdFx0XHQvLyBSZXNwZWN0IGV4aXN0aW5nIG5vbi1lcnJvciBhcmlhLWRlc2NyaWJlZGJ5XG5cdFx0XHRcdFx0aWYgKCAhZGVzY3JpYmVkQnkgKSB7XG5cdFx0XHRcdFx0XHRkZXNjcmliZWRCeSA9IGVycm9ySUQ7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICggIWRlc2NyaWJlZEJ5Lm1hdGNoKCBuZXcgUmVnRXhwKCBcIlxcXFxiXCIgKyB0aGlzLmVzY2FwZUNzc01ldGEoIGVycm9ySUQgKSArIFwiXFxcXGJcIiApICkgKSB7XG5cblx0XHRcdFx0XHRcdC8vIEFkZCB0byBlbmQgb2YgbGlzdCBpZiBub3QgYWxyZWFkeSBwcmVzZW50XG5cdFx0XHRcdFx0XHRkZXNjcmliZWRCeSArPSBcIiBcIiArIGVycm9ySUQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCQoIGVsZW1lbnQgKS5hdHRyKCBcImFyaWEtZGVzY3JpYmVkYnlcIiwgZGVzY3JpYmVkQnkgKTtcblxuXHRcdFx0XHRcdC8vIElmIHRoaXMgZWxlbWVudCBpcyBncm91cGVkLCB0aGVuIGFzc2lnbiB0byBhbGwgZWxlbWVudHMgaW4gdGhlIHNhbWUgZ3JvdXBcblx0XHRcdFx0XHRncm91cCA9IHRoaXMuZ3JvdXBzWyBlbGVtZW50Lm5hbWUgXTtcblx0XHRcdFx0XHRpZiAoIGdyb3VwICkge1xuXHRcdFx0XHRcdFx0diA9IHRoaXM7XG5cdFx0XHRcdFx0XHQkLmVhY2goIHYuZ3JvdXBzLCBmdW5jdGlvbiggbmFtZSwgdGVzdGdyb3VwICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIHRlc3Rncm91cCA9PT0gZ3JvdXAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0JCggXCJbbmFtZT0nXCIgKyB2LmVzY2FwZUNzc01ldGEoIG5hbWUgKSArIFwiJ11cIiwgdi5jdXJyZW50Rm9ybSApXG5cdFx0XHRcdFx0XHRcdFx0XHQuYXR0ciggXCJhcmlhLWRlc2NyaWJlZGJ5XCIsIGVycm9yLmF0dHIoIFwiaWRcIiApICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICggIW1lc3NhZ2UgJiYgdGhpcy5zZXR0aW5ncy5zdWNjZXNzICkge1xuXHRcdFx0XHRlcnJvci50ZXh0KCBcIlwiICk7XG5cdFx0XHRcdGlmICggdHlwZW9mIHRoaXMuc2V0dGluZ3Muc3VjY2VzcyA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdFx0XHRlcnJvci5hZGRDbGFzcyggdGhpcy5zZXR0aW5ncy5zdWNjZXNzICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5zdWNjZXNzKCBlcnJvciwgZWxlbWVudCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnRvU2hvdyA9IHRoaXMudG9TaG93LmFkZCggZXJyb3IgKTtcblx0XHR9LFxuXG5cdFx0ZXJyb3JzRm9yOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdHZhciBuYW1lID0gdGhpcy5lc2NhcGVDc3NNZXRhKCB0aGlzLmlkT3JOYW1lKCBlbGVtZW50ICkgKSxcblx0XHRcdFx0ZGVzY3JpYmVyID0gJCggZWxlbWVudCApLmF0dHIoIFwiYXJpYS1kZXNjcmliZWRieVwiICksXG5cdFx0XHRcdHNlbGVjdG9yID0gXCJsYWJlbFtmb3I9J1wiICsgbmFtZSArIFwiJ10sIGxhYmVsW2Zvcj0nXCIgKyBuYW1lICsgXCInXSAqXCI7XG5cblx0XHRcdC8vICdhcmlhLWRlc2NyaWJlZGJ5JyBzaG91bGQgZGlyZWN0bHkgcmVmZXJlbmNlIHRoZSBlcnJvciBlbGVtZW50XG5cdFx0XHRpZiAoIGRlc2NyaWJlciApIHtcblx0XHRcdFx0c2VsZWN0b3IgPSBzZWxlY3RvciArIFwiLCAjXCIgKyB0aGlzLmVzY2FwZUNzc01ldGEoIGRlc2NyaWJlciApXG5cdFx0XHRcdFx0LnJlcGxhY2UoIC9cXHMrL2csIFwiLCAjXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHRcdFx0LmVycm9ycygpXG5cdFx0XHRcdC5maWx0ZXIoIHNlbGVjdG9yICk7XG5cdFx0fSxcblxuXHRcdC8vIFNlZSBodHRwczovL2FwaS5qcXVlcnkuY29tL2NhdGVnb3J5L3NlbGVjdG9ycy8sIGZvciBDU1Ncblx0XHQvLyBtZXRhLWNoYXJhY3RlcnMgdGhhdCBzaG91bGQgYmUgZXNjYXBlZCBpbiBvcmRlciB0byBiZSB1c2VkIHdpdGggSlF1ZXJ5XG5cdFx0Ly8gYXMgYSBsaXRlcmFsIHBhcnQgb2YgYSBuYW1lL2lkIG9yIGFueSBzZWxlY3Rvci5cblx0XHRlc2NhcGVDc3NNZXRhOiBmdW5jdGlvbiggc3RyaW5nICkge1xuXHRcdFx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKCAvKFtcXFxcIVwiIyQlJicoKSorLC4vOjs8PT4/QFxcW1xcXV5ge3x9fl0pL2csIFwiXFxcXCQxXCIgKTtcblx0XHR9LFxuXG5cdFx0aWRPck5hbWU6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ3JvdXBzWyBlbGVtZW50Lm5hbWUgXSB8fCAoIHRoaXMuY2hlY2thYmxlKCBlbGVtZW50ICkgPyBlbGVtZW50Lm5hbWUgOiBlbGVtZW50LmlkIHx8IGVsZW1lbnQubmFtZSApO1xuXHRcdH0sXG5cblx0XHR2YWxpZGF0aW9uVGFyZ2V0Rm9yOiBmdW5jdGlvbiggZWxlbWVudCApIHtcblxuXHRcdFx0Ly8gSWYgcmFkaW8vY2hlY2tib3gsIHZhbGlkYXRlIGZpcnN0IGVsZW1lbnQgaW4gZ3JvdXAgaW5zdGVhZFxuXHRcdFx0aWYgKCB0aGlzLmNoZWNrYWJsZSggZWxlbWVudCApICkge1xuXHRcdFx0XHRlbGVtZW50ID0gdGhpcy5maW5kQnlOYW1lKCBlbGVtZW50Lm5hbWUgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWx3YXlzIGFwcGx5IGlnbm9yZSBmaWx0ZXJcblx0XHRcdHJldHVybiAkKCBlbGVtZW50ICkubm90KCB0aGlzLnNldHRpbmdzLmlnbm9yZSApWyAwIF07XG5cdFx0fSxcblxuXHRcdGNoZWNrYWJsZTogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gKCAvcmFkaW98Y2hlY2tib3gvaSApLnRlc3QoIGVsZW1lbnQudHlwZSApO1xuXHRcdH0sXG5cblx0XHRmaW5kQnlOYW1lOiBmdW5jdGlvbiggbmFtZSApIHtcblx0XHRcdHJldHVybiAkKCB0aGlzLmN1cnJlbnRGb3JtICkuZmluZCggXCJbbmFtZT0nXCIgKyB0aGlzLmVzY2FwZUNzc01ldGEoIG5hbWUgKSArIFwiJ11cIiApO1xuXHRcdH0sXG5cblx0XHRnZXRMZW5ndGg6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCApIHtcblx0XHRcdHN3aXRjaCAoIGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSApIHtcblx0XHRcdGNhc2UgXCJzZWxlY3RcIjpcblx0XHRcdFx0cmV0dXJuICQoIFwib3B0aW9uOnNlbGVjdGVkXCIsIGVsZW1lbnQgKS5sZW5ndGg7XG5cdFx0XHRjYXNlIFwiaW5wdXRcIjpcblx0XHRcdFx0aWYgKCB0aGlzLmNoZWNrYWJsZSggZWxlbWVudCApICkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmZpbmRCeU5hbWUoIGVsZW1lbnQubmFtZSApLmZpbHRlciggXCI6Y2hlY2tlZFwiICkubGVuZ3RoO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdmFsdWUubGVuZ3RoO1xuXHRcdH0sXG5cblx0XHRkZXBlbmQ6IGZ1bmN0aW9uKCBwYXJhbSwgZWxlbWVudCApIHtcblx0XHRcdHJldHVybiB0aGlzLmRlcGVuZFR5cGVzWyB0eXBlb2YgcGFyYW0gXSA/IHRoaXMuZGVwZW5kVHlwZXNbIHR5cGVvZiBwYXJhbSBdKCBwYXJhbSwgZWxlbWVudCApIDogdHJ1ZTtcblx0XHR9LFxuXG5cdFx0ZGVwZW5kVHlwZXM6IHtcblx0XHRcdFwiYm9vbGVhblwiOiBmdW5jdGlvbiggcGFyYW0gKSB7XG5cdFx0XHRcdHJldHVybiBwYXJhbTtcblx0XHRcdH0sXG5cdFx0XHRcInN0cmluZ1wiOiBmdW5jdGlvbiggcGFyYW0sIGVsZW1lbnQgKSB7XG5cdFx0XHRcdHJldHVybiAhISQoIHBhcmFtLCBlbGVtZW50LmZvcm0gKS5sZW5ndGg7XG5cdFx0XHR9LFxuXHRcdFx0XCJmdW5jdGlvblwiOiBmdW5jdGlvbiggcGFyYW0sIGVsZW1lbnQgKSB7XG5cdFx0XHRcdHJldHVybiBwYXJhbSggZWxlbWVudCApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRvcHRpb25hbDogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0XHR2YXIgdmFsID0gdGhpcy5lbGVtZW50VmFsdWUoIGVsZW1lbnQgKTtcblx0XHRcdHJldHVybiAhJC52YWxpZGF0b3IubWV0aG9kcy5yZXF1aXJlZC5jYWxsKCB0aGlzLCB2YWwsIGVsZW1lbnQgKSAmJiBcImRlcGVuZGVuY3ktbWlzbWF0Y2hcIjtcblx0XHR9LFxuXG5cdFx0c3RhcnRSZXF1ZXN0OiBmdW5jdGlvbiggZWxlbWVudCApIHtcblx0XHRcdGlmICggIXRoaXMucGVuZGluZ1sgZWxlbWVudC5uYW1lIF0gKSB7XG5cdFx0XHRcdHRoaXMucGVuZGluZ1JlcXVlc3QrKztcblx0XHRcdFx0JCggZWxlbWVudCApLmFkZENsYXNzKCB0aGlzLnNldHRpbmdzLnBlbmRpbmdDbGFzcyApO1xuXHRcdFx0XHR0aGlzLnBlbmRpbmdbIGVsZW1lbnQubmFtZSBdID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0c3RvcFJlcXVlc3Q6IGZ1bmN0aW9uKCBlbGVtZW50LCB2YWxpZCApIHtcblx0XHRcdHRoaXMucGVuZGluZ1JlcXVlc3QtLTtcblxuXHRcdFx0Ly8gU29tZXRpbWVzIHN5bmNocm9uaXphdGlvbiBmYWlscywgbWFrZSBzdXJlIHBlbmRpbmdSZXF1ZXN0IGlzIG5ldmVyIDwgMFxuXHRcdFx0aWYgKCB0aGlzLnBlbmRpbmdSZXF1ZXN0IDwgMCApIHtcblx0XHRcdFx0dGhpcy5wZW5kaW5nUmVxdWVzdCA9IDA7XG5cdFx0XHR9XG5cdFx0XHRkZWxldGUgdGhpcy5wZW5kaW5nWyBlbGVtZW50Lm5hbWUgXTtcblx0XHRcdCQoIGVsZW1lbnQgKS5yZW1vdmVDbGFzcyggdGhpcy5zZXR0aW5ncy5wZW5kaW5nQ2xhc3MgKTtcblx0XHRcdGlmICggdmFsaWQgJiYgdGhpcy5wZW5kaW5nUmVxdWVzdCA9PT0gMCAmJiB0aGlzLmZvcm1TdWJtaXR0ZWQgJiYgdGhpcy5mb3JtKCkgKSB7XG5cdFx0XHRcdCQoIHRoaXMuY3VycmVudEZvcm0gKS5zdWJtaXQoKTtcblx0XHRcdFx0dGhpcy5mb3JtU3VibWl0dGVkID0gZmFsc2U7XG5cdFx0XHR9IGVsc2UgaWYgKCAhdmFsaWQgJiYgdGhpcy5wZW5kaW5nUmVxdWVzdCA9PT0gMCAmJiB0aGlzLmZvcm1TdWJtaXR0ZWQgKSB7XG5cdFx0XHRcdCQoIHRoaXMuY3VycmVudEZvcm0gKS50cmlnZ2VySGFuZGxlciggXCJpbnZhbGlkLWZvcm1cIiwgWyB0aGlzIF0gKTtcblx0XHRcdFx0dGhpcy5mb3JtU3VibWl0dGVkID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHByZXZpb3VzVmFsdWU6IGZ1bmN0aW9uKCBlbGVtZW50LCBtZXRob2QgKSB7XG5cdFx0XHRyZXR1cm4gJC5kYXRhKCBlbGVtZW50LCBcInByZXZpb3VzVmFsdWVcIiApIHx8ICQuZGF0YSggZWxlbWVudCwgXCJwcmV2aW91c1ZhbHVlXCIsIHtcblx0XHRcdFx0b2xkOiBudWxsLFxuXHRcdFx0XHR2YWxpZDogdHJ1ZSxcblx0XHRcdFx0bWVzc2FnZTogdGhpcy5kZWZhdWx0TWVzc2FnZSggZWxlbWVudCwgeyBtZXRob2Q6IG1ldGhvZCB9IClcblx0XHRcdH0gKTtcblx0XHR9LFxuXG5cdFx0Ly8gQ2xlYW5zIHVwIGFsbCBmb3JtcyBhbmQgZWxlbWVudHMsIHJlbW92ZXMgdmFsaWRhdG9yLXNwZWNpZmljIGV2ZW50c1xuXHRcdGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5yZXNldEZvcm0oKTtcblxuXHRcdFx0JCggdGhpcy5jdXJyZW50Rm9ybSApXG5cdFx0XHRcdC5vZmYoIFwiLnZhbGlkYXRlXCIgKVxuXHRcdFx0XHQucmVtb3ZlRGF0YSggXCJ2YWxpZGF0b3JcIiApXG5cdFx0XHRcdC5maW5kKCBcIi52YWxpZGF0ZS1lcXVhbFRvLWJsdXJcIiApXG5cdFx0XHRcdFx0Lm9mZiggXCIudmFsaWRhdGUtZXF1YWxUb1wiIClcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoIFwidmFsaWRhdGUtZXF1YWxUby1ibHVyXCIgKTtcblx0XHR9XG5cblx0fSxcblxuXHRjbGFzc1J1bGVTZXR0aW5nczoge1xuXHRcdHJlcXVpcmVkOiB7IHJlcXVpcmVkOiB0cnVlIH0sXG5cdFx0ZW1haWw6IHsgZW1haWw6IHRydWUgfSxcblx0XHR1cmw6IHsgdXJsOiB0cnVlIH0sXG5cdFx0ZGF0ZTogeyBkYXRlOiB0cnVlIH0sXG5cdFx0ZGF0ZUlTTzogeyBkYXRlSVNPOiB0cnVlIH0sXG5cdFx0bnVtYmVyOiB7IG51bWJlcjogdHJ1ZSB9LFxuXHRcdGRpZ2l0czogeyBkaWdpdHM6IHRydWUgfSxcblx0XHRjcmVkaXRjYXJkOiB7IGNyZWRpdGNhcmQ6IHRydWUgfVxuXHR9LFxuXG5cdGFkZENsYXNzUnVsZXM6IGZ1bmN0aW9uKCBjbGFzc05hbWUsIHJ1bGVzICkge1xuXHRcdGlmICggY2xhc3NOYW1lLmNvbnN0cnVjdG9yID09PSBTdHJpbmcgKSB7XG5cdFx0XHR0aGlzLmNsYXNzUnVsZVNldHRpbmdzWyBjbGFzc05hbWUgXSA9IHJ1bGVzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkLmV4dGVuZCggdGhpcy5jbGFzc1J1bGVTZXR0aW5ncywgY2xhc3NOYW1lICk7XG5cdFx0fVxuXHR9LFxuXG5cdGNsYXNzUnVsZXM6IGZ1bmN0aW9uKCBlbGVtZW50ICkge1xuXHRcdHZhciBydWxlcyA9IHt9LFxuXHRcdFx0Y2xhc3NlcyA9ICQoIGVsZW1lbnQgKS5hdHRyKCBcImNsYXNzXCIgKTtcblxuXHRcdGlmICggY2xhc3NlcyApIHtcblx0XHRcdCQuZWFjaCggY2xhc3Nlcy5zcGxpdCggXCIgXCIgKSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggdGhpcyBpbiAkLnZhbGlkYXRvci5jbGFzc1J1bGVTZXR0aW5ncyApIHtcblx0XHRcdFx0XHQkLmV4dGVuZCggcnVsZXMsICQudmFsaWRhdG9yLmNsYXNzUnVsZVNldHRpbmdzWyB0aGlzIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXHRcdH1cblx0XHRyZXR1cm4gcnVsZXM7XG5cdH0sXG5cblx0bm9ybWFsaXplQXR0cmlidXRlUnVsZTogZnVuY3Rpb24oIHJ1bGVzLCB0eXBlLCBtZXRob2QsIHZhbHVlICkge1xuXG5cdFx0Ly8gQ29udmVydCB0aGUgdmFsdWUgdG8gYSBudW1iZXIgZm9yIG51bWJlciBpbnB1dHMsIGFuZCBmb3IgdGV4dCBmb3IgYmFja3dhcmRzIGNvbXBhYmlsaXR5XG5cdFx0Ly8gYWxsb3dzIHR5cGU9XCJkYXRlXCIgYW5kIG90aGVycyB0byBiZSBjb21wYXJlZCBhcyBzdHJpbmdzXG5cdFx0aWYgKCAvbWlufG1heHxzdGVwLy50ZXN0KCBtZXRob2QgKSAmJiAoIHR5cGUgPT09IG51bGwgfHwgL251bWJlcnxyYW5nZXx0ZXh0Ly50ZXN0KCB0eXBlICkgKSApIHtcblx0XHRcdHZhbHVlID0gTnVtYmVyKCB2YWx1ZSApO1xuXG5cdFx0XHQvLyBTdXBwb3J0IE9wZXJhIE1pbmksIHdoaWNoIHJldHVybnMgTmFOIGZvciB1bmRlZmluZWQgbWlubGVuZ3RoXG5cdFx0XHRpZiAoIGlzTmFOKCB2YWx1ZSApICkge1xuXHRcdFx0XHR2YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIHZhbHVlIHx8IHZhbHVlID09PSAwICkge1xuXHRcdFx0cnVsZXNbIG1ldGhvZCBdID0gdmFsdWU7XG5cdFx0fSBlbHNlIGlmICggdHlwZSA9PT0gbWV0aG9kICYmIHR5cGUgIT09IFwicmFuZ2VcIiApIHtcblxuXHRcdFx0Ly8gRXhjZXB0aW9uOiB0aGUganF1ZXJ5IHZhbGlkYXRlICdyYW5nZScgbWV0aG9kXG5cdFx0XHQvLyBkb2VzIG5vdCB0ZXN0IGZvciB0aGUgaHRtbDUgJ3JhbmdlJyB0eXBlXG5cdFx0XHRydWxlc1sgbWV0aG9kIF0gPSB0cnVlO1xuXHRcdH1cblx0fSxcblxuXHRhdHRyaWJ1dGVSdWxlczogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0dmFyIHJ1bGVzID0ge30sXG5cdFx0XHQkZWxlbWVudCA9ICQoIGVsZW1lbnQgKSxcblx0XHRcdHR5cGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSggXCJ0eXBlXCIgKSxcblx0XHRcdG1ldGhvZCwgdmFsdWU7XG5cblx0XHRmb3IgKCBtZXRob2QgaW4gJC52YWxpZGF0b3IubWV0aG9kcyApIHtcblxuXHRcdFx0Ly8gU3VwcG9ydCBmb3IgPGlucHV0IHJlcXVpcmVkPiBpbiBib3RoIGh0bWw1IGFuZCBvbGRlciBicm93c2Vyc1xuXHRcdFx0aWYgKCBtZXRob2QgPT09IFwicmVxdWlyZWRcIiApIHtcblx0XHRcdFx0dmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSggbWV0aG9kICk7XG5cblx0XHRcdFx0Ly8gU29tZSBicm93c2VycyByZXR1cm4gYW4gZW1wdHkgc3RyaW5nIGZvciB0aGUgcmVxdWlyZWQgYXR0cmlidXRlXG5cdFx0XHRcdC8vIGFuZCBub24tSFRNTDUgYnJvd3NlcnMgbWlnaHQgaGF2ZSByZXF1aXJlZD1cIlwiIG1hcmt1cFxuXHRcdFx0XHRpZiAoIHZhbHVlID09PSBcIlwiICkge1xuXHRcdFx0XHRcdHZhbHVlID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEZvcmNlIG5vbi1IVE1MNSBicm93c2VycyB0byByZXR1cm4gYm9vbFxuXHRcdFx0XHR2YWx1ZSA9ICEhdmFsdWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YWx1ZSA9ICRlbGVtZW50LmF0dHIoIG1ldGhvZCApO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLm5vcm1hbGl6ZUF0dHJpYnV0ZVJ1bGUoIHJ1bGVzLCB0eXBlLCBtZXRob2QsIHZhbHVlICk7XG5cdFx0fVxuXG5cdFx0Ly8gJ21heGxlbmd0aCcgbWF5IGJlIHJldHVybmVkIGFzIC0xLCAyMTQ3NDgzNjQ3ICggSUUgKSBhbmQgNTI0Mjg4ICggc2FmYXJpICkgZm9yIHRleHQgaW5wdXRzXG5cdFx0aWYgKCBydWxlcy5tYXhsZW5ndGggJiYgLy0xfDIxNDc0ODM2NDd8NTI0Mjg4Ly50ZXN0KCBydWxlcy5tYXhsZW5ndGggKSApIHtcblx0XHRcdGRlbGV0ZSBydWxlcy5tYXhsZW5ndGg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJ1bGVzO1xuXHR9LFxuXG5cdGRhdGFSdWxlczogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0dmFyIHJ1bGVzID0ge30sXG5cdFx0XHQkZWxlbWVudCA9ICQoIGVsZW1lbnQgKSxcblx0XHRcdHR5cGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSggXCJ0eXBlXCIgKSxcblx0XHRcdG1ldGhvZCwgdmFsdWU7XG5cblx0XHRmb3IgKCBtZXRob2QgaW4gJC52YWxpZGF0b3IubWV0aG9kcyApIHtcblx0XHRcdHZhbHVlID0gJGVsZW1lbnQuZGF0YSggXCJydWxlXCIgKyBtZXRob2QuY2hhckF0KCAwICkudG9VcHBlckNhc2UoKSArIG1ldGhvZC5zdWJzdHJpbmcoIDEgKS50b0xvd2VyQ2FzZSgpICk7XG5cdFx0XHR0aGlzLm5vcm1hbGl6ZUF0dHJpYnV0ZVJ1bGUoIHJ1bGVzLCB0eXBlLCBtZXRob2QsIHZhbHVlICk7XG5cdFx0fVxuXHRcdHJldHVybiBydWxlcztcblx0fSxcblxuXHRzdGF0aWNSdWxlczogZnVuY3Rpb24oIGVsZW1lbnQgKSB7XG5cdFx0dmFyIHJ1bGVzID0ge30sXG5cdFx0XHR2YWxpZGF0b3IgPSAkLmRhdGEoIGVsZW1lbnQuZm9ybSwgXCJ2YWxpZGF0b3JcIiApO1xuXG5cdFx0aWYgKCB2YWxpZGF0b3Iuc2V0dGluZ3MucnVsZXMgKSB7XG5cdFx0XHRydWxlcyA9ICQudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGUoIHZhbGlkYXRvci5zZXR0aW5ncy5ydWxlc1sgZWxlbWVudC5uYW1lIF0gKSB8fCB7fTtcblx0XHR9XG5cdFx0cmV0dXJuIHJ1bGVzO1xuXHR9LFxuXG5cdG5vcm1hbGl6ZVJ1bGVzOiBmdW5jdGlvbiggcnVsZXMsIGVsZW1lbnQgKSB7XG5cblx0XHQvLyBIYW5kbGUgZGVwZW5kZW5jeSBjaGVja1xuXHRcdCQuZWFjaCggcnVsZXMsIGZ1bmN0aW9uKCBwcm9wLCB2YWwgKSB7XG5cblx0XHRcdC8vIElnbm9yZSBydWxlIHdoZW4gcGFyYW0gaXMgZXhwbGljaXRseSBmYWxzZSwgZWcuIHJlcXVpcmVkOmZhbHNlXG5cdFx0XHRpZiAoIHZhbCA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdGRlbGV0ZSBydWxlc1sgcHJvcCBdO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHZhbC5wYXJhbSB8fCB2YWwuZGVwZW5kcyApIHtcblx0XHRcdFx0dmFyIGtlZXBSdWxlID0gdHJ1ZTtcblx0XHRcdFx0c3dpdGNoICggdHlwZW9mIHZhbC5kZXBlbmRzICkge1xuXHRcdFx0XHRjYXNlIFwic3RyaW5nXCI6XG5cdFx0XHRcdFx0a2VlcFJ1bGUgPSAhISQoIHZhbC5kZXBlbmRzLCBlbGVtZW50LmZvcm0gKS5sZW5ndGg7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJmdW5jdGlvblwiOlxuXHRcdFx0XHRcdGtlZXBSdWxlID0gdmFsLmRlcGVuZHMuY2FsbCggZWxlbWVudCwgZWxlbWVudCApO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICgga2VlcFJ1bGUgKSB7XG5cdFx0XHRcdFx0cnVsZXNbIHByb3AgXSA9IHZhbC5wYXJhbSAhPT0gdW5kZWZpbmVkID8gdmFsLnBhcmFtIDogdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkLmRhdGEoIGVsZW1lbnQuZm9ybSwgXCJ2YWxpZGF0b3JcIiApLnJlc2V0RWxlbWVudHMoICQoIGVsZW1lbnQgKSApO1xuXHRcdFx0XHRcdGRlbGV0ZSBydWxlc1sgcHJvcCBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXG5cdFx0Ly8gRXZhbHVhdGUgcGFyYW1ldGVyc1xuXHRcdCQuZWFjaCggcnVsZXMsIGZ1bmN0aW9uKCBydWxlLCBwYXJhbWV0ZXIgKSB7XG5cdFx0XHRydWxlc1sgcnVsZSBdID0gJC5pc0Z1bmN0aW9uKCBwYXJhbWV0ZXIgKSAmJiBydWxlICE9PSBcIm5vcm1hbGl6ZXJcIiA/IHBhcmFtZXRlciggZWxlbWVudCApIDogcGFyYW1ldGVyO1xuXHRcdH0gKTtcblxuXHRcdC8vIENsZWFuIG51bWJlciBwYXJhbWV0ZXJzXG5cdFx0JC5lYWNoKCBbIFwibWlubGVuZ3RoXCIsIFwibWF4bGVuZ3RoXCIgXSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIHJ1bGVzWyB0aGlzIF0gKSB7XG5cdFx0XHRcdHJ1bGVzWyB0aGlzIF0gPSBOdW1iZXIoIHJ1bGVzWyB0aGlzIF0gKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdFx0JC5lYWNoKCBbIFwicmFuZ2VsZW5ndGhcIiwgXCJyYW5nZVwiIF0sIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHBhcnRzO1xuXHRcdFx0aWYgKCBydWxlc1sgdGhpcyBdICkge1xuXHRcdFx0XHRpZiAoICQuaXNBcnJheSggcnVsZXNbIHRoaXMgXSApICkge1xuXHRcdFx0XHRcdHJ1bGVzWyB0aGlzIF0gPSBbIE51bWJlciggcnVsZXNbIHRoaXMgXVsgMCBdICksIE51bWJlciggcnVsZXNbIHRoaXMgXVsgMSBdICkgXTtcblx0XHRcdFx0fSBlbHNlIGlmICggdHlwZW9mIHJ1bGVzWyB0aGlzIF0gPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdFx0cGFydHMgPSBydWxlc1sgdGhpcyBdLnJlcGxhY2UoIC9bXFxbXFxdXS9nLCBcIlwiICkuc3BsaXQoIC9bXFxzLF0rLyApO1xuXHRcdFx0XHRcdHJ1bGVzWyB0aGlzIF0gPSBbIE51bWJlciggcGFydHNbIDAgXSApLCBOdW1iZXIoIHBhcnRzWyAxIF0gKSBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSApO1xuXG5cdFx0aWYgKCAkLnZhbGlkYXRvci5hdXRvQ3JlYXRlUmFuZ2VzICkge1xuXG5cdFx0XHQvLyBBdXRvLWNyZWF0ZSByYW5nZXNcblx0XHRcdGlmICggcnVsZXMubWluICE9IG51bGwgJiYgcnVsZXMubWF4ICE9IG51bGwgKSB7XG5cdFx0XHRcdHJ1bGVzLnJhbmdlID0gWyBydWxlcy5taW4sIHJ1bGVzLm1heCBdO1xuXHRcdFx0XHRkZWxldGUgcnVsZXMubWluO1xuXHRcdFx0XHRkZWxldGUgcnVsZXMubWF4O1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBydWxlcy5taW5sZW5ndGggIT0gbnVsbCAmJiBydWxlcy5tYXhsZW5ndGggIT0gbnVsbCApIHtcblx0XHRcdFx0cnVsZXMucmFuZ2VsZW5ndGggPSBbIHJ1bGVzLm1pbmxlbmd0aCwgcnVsZXMubWF4bGVuZ3RoIF07XG5cdFx0XHRcdGRlbGV0ZSBydWxlcy5taW5sZW5ndGg7XG5cdFx0XHRcdGRlbGV0ZSBydWxlcy5tYXhsZW5ndGg7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJ1bGVzO1xuXHR9LFxuXG5cdC8vIENvbnZlcnRzIGEgc2ltcGxlIHN0cmluZyB0byBhIHtzdHJpbmc6IHRydWV9IHJ1bGUsIGUuZy4sIFwicmVxdWlyZWRcIiB0byB7cmVxdWlyZWQ6dHJ1ZX1cblx0bm9ybWFsaXplUnVsZTogZnVuY3Rpb24oIGRhdGEgKSB7XG5cdFx0aWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHZhciB0cmFuc2Zvcm1lZCA9IHt9O1xuXHRcdFx0JC5lYWNoKCBkYXRhLnNwbGl0KCAvXFxzLyApLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0dHJhbnNmb3JtZWRbIHRoaXMgXSA9IHRydWU7XG5cdFx0XHR9ICk7XG5cdFx0XHRkYXRhID0gdHJhbnNmb3JtZWQ7XG5cdFx0fVxuXHRcdHJldHVybiBkYXRhO1xuXHR9LFxuXG5cdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9qUXVlcnkudmFsaWRhdG9yLmFkZE1ldGhvZC9cblx0YWRkTWV0aG9kOiBmdW5jdGlvbiggbmFtZSwgbWV0aG9kLCBtZXNzYWdlICkge1xuXHRcdCQudmFsaWRhdG9yLm1ldGhvZHNbIG5hbWUgXSA9IG1ldGhvZDtcblx0XHQkLnZhbGlkYXRvci5tZXNzYWdlc1sgbmFtZSBdID0gbWVzc2FnZSAhPT0gdW5kZWZpbmVkID8gbWVzc2FnZSA6ICQudmFsaWRhdG9yLm1lc3NhZ2VzWyBuYW1lIF07XG5cdFx0aWYgKCBtZXRob2QubGVuZ3RoIDwgMyApIHtcblx0XHRcdCQudmFsaWRhdG9yLmFkZENsYXNzUnVsZXMoIG5hbWUsICQudmFsaWRhdG9yLm5vcm1hbGl6ZVJ1bGUoIG5hbWUgKSApO1xuXHRcdH1cblx0fSxcblxuXHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvalF1ZXJ5LnZhbGlkYXRvci5tZXRob2RzL1xuXHRtZXRob2RzOiB7XG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvcmVxdWlyZWQtbWV0aG9kL1xuXHRcdHJlcXVpcmVkOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXG5cdFx0XHQvLyBDaGVjayBpZiBkZXBlbmRlbmN5IGlzIG1ldFxuXHRcdFx0aWYgKCAhdGhpcy5kZXBlbmQoIHBhcmFtLCBlbGVtZW50ICkgKSB7XG5cdFx0XHRcdHJldHVybiBcImRlcGVuZGVuY3ktbWlzbWF0Y2hcIjtcblx0XHRcdH1cblx0XHRcdGlmICggZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInNlbGVjdFwiICkge1xuXG5cdFx0XHRcdC8vIENvdWxkIGJlIGFuIGFycmF5IGZvciBzZWxlY3QtbXVsdGlwbGUgb3IgYSBzdHJpbmcsIGJvdGggYXJlIGZpbmUgdGhpcyB3YXlcblx0XHRcdFx0dmFyIHZhbCA9ICQoIGVsZW1lbnQgKS52YWwoKTtcblx0XHRcdFx0cmV0dXJuIHZhbCAmJiB2YWwubGVuZ3RoID4gMDtcblx0XHRcdH1cblx0XHRcdGlmICggdGhpcy5jaGVja2FibGUoIGVsZW1lbnQgKSApIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0TGVuZ3RoKCB2YWx1ZSwgZWxlbWVudCApID4gMDtcblx0XHRcdH1cblx0XHRcdHJldHVybiB2YWx1ZS5sZW5ndGggPiAwO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvZW1haWwtbWV0aG9kL1xuXHRcdGVtYWlsOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQgKSB7XG5cblx0XHRcdC8vIEZyb20gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZm9ybXMuaHRtbCN2YWxpZC1lLW1haWwtYWRkcmVzc1xuXHRcdFx0Ly8gUmV0cmlldmVkIDIwMTQtMDEtMTRcblx0XHRcdC8vIElmIHlvdSBoYXZlIGEgcHJvYmxlbSB3aXRoIHRoaXMgaW1wbGVtZW50YXRpb24sIHJlcG9ydCBhIGJ1ZyBhZ2FpbnN0IHRoZSBhYm92ZSBzcGVjXG5cdFx0XHQvLyBPciB1c2UgY3VzdG9tIG1ldGhvZHMgdG8gaW1wbGVtZW50IHlvdXIgb3duIGVtYWlsIHZhbGlkYXRpb25cblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgL15bYS16QS1aMC05LiEjJCUmJyorXFwvPT9eX2B7fH1+LV0rQFthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPyg/OlxcLlthLXpBLVowLTldKD86W2EtekEtWjAtOS1dezAsNjF9W2EtekEtWjAtOV0pPykqJC8udGVzdCggdmFsdWUgKTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3VybC1tZXRob2QvXG5cdFx0dXJsOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQgKSB7XG5cblx0XHRcdC8vIENvcHlyaWdodCAoYykgMjAxMC0yMDEzIERpZWdvIFBlcmluaSwgTUlUIGxpY2Vuc2VkXG5cdFx0XHQvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9kcGVyaW5pLzcyOTI5NFxuXHRcdFx0Ly8gc2VlIGFsc28gaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL2RlbW8vdXJsLXJlZ2V4XG5cdFx0XHQvLyBtb2RpZmllZCB0byBhbGxvdyBwcm90b2NvbC1yZWxhdGl2ZSBVUkxzXG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8IC9eKD86KD86KD86aHR0cHM/fGZ0cCk6KT9cXC9cXC8pKD86XFxTKyg/OjpcXFMqKT9AKT8oPzooPyEoPzoxMHwxMjcpKD86XFwuXFxkezEsM30pezN9KSg/ISg/OjE2OVxcLjI1NHwxOTJcXC4xNjgpKD86XFwuXFxkezEsM30pezJ9KSg/ITE3MlxcLig/OjFbNi05XXwyXFxkfDNbMC0xXSkoPzpcXC5cXGR7MSwzfSl7Mn0pKD86WzEtOV1cXGQ/fDFcXGRcXGR8MlswMV1cXGR8MjJbMC0zXSkoPzpcXC4oPzoxP1xcZHsxLDJ9fDJbMC00XVxcZHwyNVswLTVdKSl7Mn0oPzpcXC4oPzpbMS05XVxcZD98MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC00XSkpfCg/Oig/OlthLXpcXHUwMGExLVxcdWZmZmYwLTldLSopKlthLXpcXHUwMGExLVxcdWZmZmYwLTldKykoPzpcXC4oPzpbYS16XFx1MDBhMS1cXHVmZmZmMC05XS0qKSpbYS16XFx1MDBhMS1cXHVmZmZmMC05XSspKig/OlxcLig/OlthLXpcXHUwMGExLVxcdWZmZmZdezIsfSkpLj8pKD86OlxcZHsyLDV9KT8oPzpbLz8jXVxcUyopPyQvaS50ZXN0KCB2YWx1ZSApO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvZGF0ZS1tZXRob2QvXG5cdFx0ZGF0ZTogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50ICkge1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCAhL0ludmFsaWR8TmFOLy50ZXN0KCBuZXcgRGF0ZSggdmFsdWUgKS50b1N0cmluZygpICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9kYXRlSVNPLW1ldGhvZC9cblx0XHRkYXRlSVNPOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8IC9eXFxkezR9W1xcL1xcLV0oMD9bMS05XXwxWzAxMl0pW1xcL1xcLV0oMD9bMS05XXxbMTJdWzAtOV18M1swMV0pJC8udGVzdCggdmFsdWUgKTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL251bWJlci1tZXRob2QvXG5cdFx0bnVtYmVyOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8IC9eKD86LT9cXGQrfC0/XFxkezEsM30oPzosXFxkezN9KSspPyg/OlxcLlxcZCspPyQvLnRlc3QoIHZhbHVlICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9kaWdpdHMtbWV0aG9kL1xuXHRcdGRpZ2l0czogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50ICkge1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCAvXlxcZCskLy50ZXN0KCB2YWx1ZSApO1xuXHRcdH0sXG5cblx0XHQvLyBodHRwOi8vanF1ZXJ5dmFsaWRhdGlvbi5vcmcvbWlubGVuZ3RoLW1ldGhvZC9cblx0XHRtaW5sZW5ndGg6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCwgcGFyYW0gKSB7XG5cdFx0XHR2YXIgbGVuZ3RoID0gJC5pc0FycmF5KCB2YWx1ZSApID8gdmFsdWUubGVuZ3RoIDogdGhpcy5nZXRMZW5ndGgoIHZhbHVlLCBlbGVtZW50ICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8IGxlbmd0aCA+PSBwYXJhbTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL21heGxlbmd0aC1tZXRob2QvXG5cdFx0bWF4bGVuZ3RoOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXHRcdFx0dmFyIGxlbmd0aCA9ICQuaXNBcnJheSggdmFsdWUgKSA/IHZhbHVlLmxlbmd0aCA6IHRoaXMuZ2V0TGVuZ3RoKCB2YWx1ZSwgZWxlbWVudCApO1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCBsZW5ndGggPD0gcGFyYW07XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9yYW5nZWxlbmd0aC1tZXRob2QvXG5cdFx0cmFuZ2VsZW5ndGg6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCwgcGFyYW0gKSB7XG5cdFx0XHR2YXIgbGVuZ3RoID0gJC5pc0FycmF5KCB2YWx1ZSApID8gdmFsdWUubGVuZ3RoIDogdGhpcy5nZXRMZW5ndGgoIHZhbHVlLCBlbGVtZW50ICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25hbCggZWxlbWVudCApIHx8ICggbGVuZ3RoID49IHBhcmFtWyAwIF0gJiYgbGVuZ3RoIDw9IHBhcmFtWyAxIF0gKTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL21pbi1tZXRob2QvXG5cdFx0bWluOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCB2YWx1ZSA+PSBwYXJhbTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL21heC1tZXRob2QvXG5cdFx0bWF4OiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXHRcdFx0cmV0dXJuIHRoaXMub3B0aW9uYWwoIGVsZW1lbnQgKSB8fCB2YWx1ZSA8PSBwYXJhbTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3JhbmdlLW1ldGhvZC9cblx0XHRyYW5nZTogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50LCBwYXJhbSApIHtcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgKCB2YWx1ZSA+PSBwYXJhbVsgMCBdICYmIHZhbHVlIDw9IHBhcmFtWyAxIF0gKTtcblx0XHR9LFxuXG5cdFx0Ly8gaHR0cDovL2pxdWVyeXZhbGlkYXRpb24ub3JnL3N0ZXAtbWV0aG9kL1xuXHRcdHN0ZXA6IGZ1bmN0aW9uKCB2YWx1ZSwgZWxlbWVudCwgcGFyYW0gKSB7XG5cdFx0XHR2YXIgdHlwZSA9ICQoIGVsZW1lbnQgKS5hdHRyKCBcInR5cGVcIiApLFxuXHRcdFx0XHRlcnJvck1lc3NhZ2UgPSBcIlN0ZXAgYXR0cmlidXRlIG9uIGlucHV0IHR5cGUgXCIgKyB0eXBlICsgXCIgaXMgbm90IHN1cHBvcnRlZC5cIixcblx0XHRcdFx0c3VwcG9ydGVkVHlwZXMgPSBbIFwidGV4dFwiLCBcIm51bWJlclwiLCBcInJhbmdlXCIgXSxcblx0XHRcdFx0cmUgPSBuZXcgUmVnRXhwKCBcIlxcXFxiXCIgKyB0eXBlICsgXCJcXFxcYlwiICksXG5cdFx0XHRcdG5vdFN1cHBvcnRlZCA9IHR5cGUgJiYgIXJlLnRlc3QoIHN1cHBvcnRlZFR5cGVzLmpvaW4oKSApO1xuXG5cdFx0XHQvLyBXb3JrcyBvbmx5IGZvciB0ZXh0LCBudW1iZXIgYW5kIHJhbmdlIGlucHV0IHR5cGVzXG5cdFx0XHQvLyBUT0RPIGZpbmQgYSB3YXkgdG8gc3VwcG9ydCBpbnB1dCB0eXBlcyBkYXRlLCBkYXRldGltZSwgZGF0ZXRpbWUtbG9jYWwsIG1vbnRoLCB0aW1lIGFuZCB3ZWVrXG5cdFx0XHRpZiAoIG5vdFN1cHBvcnRlZCApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBlcnJvck1lc3NhZ2UgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgfHwgKCB2YWx1ZSAlIHBhcmFtID09PSAwICk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9lcXVhbFRvLW1ldGhvZC9cblx0XHRlcXVhbFRvOiBmdW5jdGlvbiggdmFsdWUsIGVsZW1lbnQsIHBhcmFtICkge1xuXG5cdFx0XHQvLyBCaW5kIHRvIHRoZSBibHVyIGV2ZW50IG9mIHRoZSB0YXJnZXQgaW4gb3JkZXIgdG8gcmV2YWxpZGF0ZSB3aGVuZXZlciB0aGUgdGFyZ2V0IGZpZWxkIGlzIHVwZGF0ZWRcblx0XHRcdHZhciB0YXJnZXQgPSAkKCBwYXJhbSApO1xuXHRcdFx0aWYgKCB0aGlzLnNldHRpbmdzLm9uZm9jdXNvdXQgJiYgdGFyZ2V0Lm5vdCggXCIudmFsaWRhdGUtZXF1YWxUby1ibHVyXCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdHRhcmdldC5hZGRDbGFzcyggXCJ2YWxpZGF0ZS1lcXVhbFRvLWJsdXJcIiApLm9uKCBcImJsdXIudmFsaWRhdGUtZXF1YWxUb1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQkKCBlbGVtZW50ICkudmFsaWQoKTtcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHZhbHVlID09PSB0YXJnZXQudmFsKCk7XG5cdFx0fSxcblxuXHRcdC8vIGh0dHA6Ly9qcXVlcnl2YWxpZGF0aW9uLm9yZy9yZW1vdGUtbWV0aG9kL1xuXHRcdHJlbW90ZTogZnVuY3Rpb24oIHZhbHVlLCBlbGVtZW50LCBwYXJhbSwgbWV0aG9kICkge1xuXHRcdFx0aWYgKCB0aGlzLm9wdGlvbmFsKCBlbGVtZW50ICkgKSB7XG5cdFx0XHRcdHJldHVybiBcImRlcGVuZGVuY3ktbWlzbWF0Y2hcIjtcblx0XHRcdH1cblxuXHRcdFx0bWV0aG9kID0gdHlwZW9mIG1ldGhvZCA9PT0gXCJzdHJpbmdcIiAmJiBtZXRob2QgfHwgXCJyZW1vdGVcIjtcblxuXHRcdFx0dmFyIHByZXZpb3VzID0gdGhpcy5wcmV2aW91c1ZhbHVlKCBlbGVtZW50LCBtZXRob2QgKSxcblx0XHRcdFx0dmFsaWRhdG9yLCBkYXRhLCBvcHRpb25EYXRhU3RyaW5nO1xuXG5cdFx0XHRpZiAoICF0aGlzLnNldHRpbmdzLm1lc3NhZ2VzWyBlbGVtZW50Lm5hbWUgXSApIHtcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5tZXNzYWdlc1sgZWxlbWVudC5uYW1lIF0gPSB7fTtcblx0XHRcdH1cblx0XHRcdHByZXZpb3VzLm9yaWdpbmFsTWVzc2FnZSA9IHByZXZpb3VzLm9yaWdpbmFsTWVzc2FnZSB8fCB0aGlzLnNldHRpbmdzLm1lc3NhZ2VzWyBlbGVtZW50Lm5hbWUgXVsgbWV0aG9kIF07XG5cdFx0XHR0aGlzLnNldHRpbmdzLm1lc3NhZ2VzWyBlbGVtZW50Lm5hbWUgXVsgbWV0aG9kIF0gPSBwcmV2aW91cy5tZXNzYWdlO1xuXG5cdFx0XHRwYXJhbSA9IHR5cGVvZiBwYXJhbSA9PT0gXCJzdHJpbmdcIiAmJiB7IHVybDogcGFyYW0gfSB8fCBwYXJhbTtcblx0XHRcdG9wdGlvbkRhdGFTdHJpbmcgPSAkLnBhcmFtKCAkLmV4dGVuZCggeyBkYXRhOiB2YWx1ZSB9LCBwYXJhbS5kYXRhICkgKTtcblx0XHRcdGlmICggcHJldmlvdXMub2xkID09PSBvcHRpb25EYXRhU3RyaW5nICkge1xuXHRcdFx0XHRyZXR1cm4gcHJldmlvdXMudmFsaWQ7XG5cdFx0XHR9XG5cblx0XHRcdHByZXZpb3VzLm9sZCA9IG9wdGlvbkRhdGFTdHJpbmc7XG5cdFx0XHR2YWxpZGF0b3IgPSB0aGlzO1xuXHRcdFx0dGhpcy5zdGFydFJlcXVlc3QoIGVsZW1lbnQgKTtcblx0XHRcdGRhdGEgPSB7fTtcblx0XHRcdGRhdGFbIGVsZW1lbnQubmFtZSBdID0gdmFsdWU7XG5cdFx0XHQkLmFqYXgoICQuZXh0ZW5kKCB0cnVlLCB7XG5cdFx0XHRcdG1vZGU6IFwiYWJvcnRcIixcblx0XHRcdFx0cG9ydDogXCJ2YWxpZGF0ZVwiICsgZWxlbWVudC5uYW1lLFxuXHRcdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdGNvbnRleHQ6IHZhbGlkYXRvci5jdXJyZW50Rm9ybSxcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24oIHJlc3BvbnNlICkge1xuXHRcdFx0XHRcdHZhciB2YWxpZCA9IHJlc3BvbnNlID09PSB0cnVlIHx8IHJlc3BvbnNlID09PSBcInRydWVcIixcblx0XHRcdFx0XHRcdGVycm9ycywgbWVzc2FnZSwgc3VibWl0dGVkO1xuXG5cdFx0XHRcdFx0dmFsaWRhdG9yLnNldHRpbmdzLm1lc3NhZ2VzWyBlbGVtZW50Lm5hbWUgXVsgbWV0aG9kIF0gPSBwcmV2aW91cy5vcmlnaW5hbE1lc3NhZ2U7XG5cdFx0XHRcdFx0aWYgKCB2YWxpZCApIHtcblx0XHRcdFx0XHRcdHN1Ym1pdHRlZCA9IHZhbGlkYXRvci5mb3JtU3VibWl0dGVkO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLnJlc2V0SW50ZXJuYWxzKCk7XG5cdFx0XHRcdFx0XHR2YWxpZGF0b3IudG9IaWRlID0gdmFsaWRhdG9yLmVycm9yc0ZvciggZWxlbWVudCApO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLmZvcm1TdWJtaXR0ZWQgPSBzdWJtaXR0ZWQ7XG5cdFx0XHRcdFx0XHR2YWxpZGF0b3Iuc3VjY2Vzc0xpc3QucHVzaCggZWxlbWVudCApO1xuXHRcdFx0XHRcdFx0dmFsaWRhdG9yLmludmFsaWRbIGVsZW1lbnQubmFtZSBdID0gZmFsc2U7XG5cdFx0XHRcdFx0XHR2YWxpZGF0b3Iuc2hvd0Vycm9ycygpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlcnJvcnMgPSB7fTtcblx0XHRcdFx0XHRcdG1lc3NhZ2UgPSByZXNwb25zZSB8fCB2YWxpZGF0b3IuZGVmYXVsdE1lc3NhZ2UoIGVsZW1lbnQsIHsgbWV0aG9kOiBtZXRob2QsIHBhcmFtZXRlcnM6IHZhbHVlIH0gKTtcblx0XHRcdFx0XHRcdGVycm9yc1sgZWxlbWVudC5uYW1lIF0gPSBwcmV2aW91cy5tZXNzYWdlID0gbWVzc2FnZTtcblx0XHRcdFx0XHRcdHZhbGlkYXRvci5pbnZhbGlkWyBlbGVtZW50Lm5hbWUgXSA9IHRydWU7XG5cdFx0XHRcdFx0XHR2YWxpZGF0b3Iuc2hvd0Vycm9ycyggZXJyb3JzICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHByZXZpb3VzLnZhbGlkID0gdmFsaWQ7XG5cdFx0XHRcdFx0dmFsaWRhdG9yLnN0b3BSZXF1ZXN0KCBlbGVtZW50LCB2YWxpZCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCBwYXJhbSApICk7XG5cdFx0XHRyZXR1cm4gXCJwZW5kaW5nXCI7XG5cdFx0fVxuXHR9XG5cbn0gKTtcblxuLy8gQWpheCBtb2RlOiBhYm9ydFxuLy8gdXNhZ2U6ICQuYWpheCh7IG1vZGU6IFwiYWJvcnRcIlssIHBvcnQ6IFwidW5pcXVlcG9ydFwiXX0pO1xuLy8gaWYgbW9kZTpcImFib3J0XCIgaXMgdXNlZCwgdGhlIHByZXZpb3VzIHJlcXVlc3Qgb24gdGhhdCBwb3J0IChwb3J0IGNhbiBiZSB1bmRlZmluZWQpIGlzIGFib3J0ZWQgdmlhIFhNTEh0dHBSZXF1ZXN0LmFib3J0KClcblxudmFyIHBlbmRpbmdSZXF1ZXN0cyA9IHt9LFxuXHRhamF4O1xuXG4vLyBVc2UgYSBwcmVmaWx0ZXIgaWYgYXZhaWxhYmxlICgxLjUrKVxuaWYgKCAkLmFqYXhQcmVmaWx0ZXIgKSB7XG5cdCQuYWpheFByZWZpbHRlciggZnVuY3Rpb24oIHNldHRpbmdzLCBfLCB4aHIgKSB7XG5cdFx0dmFyIHBvcnQgPSBzZXR0aW5ncy5wb3J0O1xuXHRcdGlmICggc2V0dGluZ3MubW9kZSA9PT0gXCJhYm9ydFwiICkge1xuXHRcdFx0aWYgKCBwZW5kaW5nUmVxdWVzdHNbIHBvcnQgXSApIHtcblx0XHRcdFx0cGVuZGluZ1JlcXVlc3RzWyBwb3J0IF0uYWJvcnQoKTtcblx0XHRcdH1cblx0XHRcdHBlbmRpbmdSZXF1ZXN0c1sgcG9ydCBdID0geGhyO1xuXHRcdH1cblx0fSApO1xufSBlbHNlIHtcblxuXHQvLyBQcm94eSBhamF4XG5cdGFqYXggPSAkLmFqYXg7XG5cdCQuYWpheCA9IGZ1bmN0aW9uKCBzZXR0aW5ncyApIHtcblx0XHR2YXIgbW9kZSA9ICggXCJtb2RlXCIgaW4gc2V0dGluZ3MgPyBzZXR0aW5ncyA6ICQuYWpheFNldHRpbmdzICkubW9kZSxcblx0XHRcdHBvcnQgPSAoIFwicG9ydFwiIGluIHNldHRpbmdzID8gc2V0dGluZ3MgOiAkLmFqYXhTZXR0aW5ncyApLnBvcnQ7XG5cdFx0aWYgKCBtb2RlID09PSBcImFib3J0XCIgKSB7XG5cdFx0XHRpZiAoIHBlbmRpbmdSZXF1ZXN0c1sgcG9ydCBdICkge1xuXHRcdFx0XHRwZW5kaW5nUmVxdWVzdHNbIHBvcnQgXS5hYm9ydCgpO1xuXHRcdFx0fVxuXHRcdFx0cGVuZGluZ1JlcXVlc3RzWyBwb3J0IF0gPSBhamF4LmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdHJldHVybiBwZW5kaW5nUmVxdWVzdHNbIHBvcnQgXTtcblx0XHR9XG5cdFx0cmV0dXJuIGFqYXguYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHR9O1xufVxuXG59KSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3d3d3Jvb3QvbGliL2pxdWVyeS12YWxpZGF0aW9uL2Rpc3QvanF1ZXJ5LnZhbGlkYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiLyohXHJcbioqIFVub2J0cnVzaXZlIHZhbGlkYXRpb24gc3VwcG9ydCBsaWJyYXJ5IGZvciBqUXVlcnkgYW5kIGpRdWVyeSBWYWxpZGF0ZVxyXG4qKiBDb3B5cmlnaHQgKEMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuKi9cclxuXHJcbi8qanNsaW50IHdoaXRlOiB0cnVlLCBicm93c2VyOiB0cnVlLCBvbmV2YXI6IHRydWUsIHVuZGVmOiB0cnVlLCBub21lbjogdHJ1ZSwgZXFlcWVxOiB0cnVlLCBwbHVzcGx1czogdHJ1ZSwgYml0d2lzZTogdHJ1ZSwgcmVnZXhwOiB0cnVlLCBuZXdjYXA6IHRydWUsIGltbWVkOiB0cnVlLCBzdHJpY3Q6IGZhbHNlICovXHJcbi8qZ2xvYmFsIGRvY3VtZW50OiBmYWxzZSwgalF1ZXJ5OiBmYWxzZSAqL1xyXG5cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgICB2YXIgJGpRdmFsID0gJC52YWxpZGF0b3IsXHJcbiAgICAgICAgYWRhcHRlcnMsXHJcbiAgICAgICAgZGF0YV92YWxpZGF0aW9uID0gXCJ1bm9idHJ1c2l2ZVZhbGlkYXRpb25cIjtcclxuXHJcbiAgICBmdW5jdGlvbiBzZXRWYWxpZGF0aW9uVmFsdWVzKG9wdGlvbnMsIHJ1bGVOYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIG9wdGlvbnMucnVsZXNbcnVsZU5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMubWVzc2FnZSkge1xyXG4gICAgICAgICAgICBvcHRpb25zLm1lc3NhZ2VzW3J1bGVOYW1lXSA9IG9wdGlvbnMubWVzc2FnZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3BsaXRBbmRUcmltKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpLnNwbGl0KC9cXHMqLFxccyovZyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXNjYXBlQXR0cmlidXRlVmFsdWUodmFsdWUpIHtcclxuICAgICAgICAvLyBBcyBtZW50aW9uZWQgb24gaHR0cDovL2FwaS5qcXVlcnkuY29tL2NhdGVnb3J5L3NlbGVjdG9ycy9cclxuICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvKFshXCIjJCUmJygpKissLi86Ozw9Pj9AXFxbXFxcXFxcXV5ge3x9fl0pL2csIFwiXFxcXCQxXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldE1vZGVsUHJlZml4KGZpZWxkTmFtZSkge1xyXG4gICAgICAgIHJldHVybiBmaWVsZE5hbWUuc3Vic3RyKDAsIGZpZWxkTmFtZS5sYXN0SW5kZXhPZihcIi5cIikgKyAxKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhcHBlbmRNb2RlbFByZWZpeCh2YWx1ZSwgcHJlZml4KSB7XHJcbiAgICAgICAgaWYgKHZhbHVlLmluZGV4T2YoXCIqLlwiKSA9PT0gMCkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoXCIqLlwiLCBwcmVmaXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25FcnJvcihlcnJvciwgaW5wdXRFbGVtZW50KSB7ICAvLyAndGhpcycgaXMgdGhlIGZvcm0gZWxlbWVudFxyXG4gICAgICAgIHZhciBjb250YWluZXIgPSAkKHRoaXMpLmZpbmQoXCJbZGF0YS12YWxtc2ctZm9yPSdcIiArIGVzY2FwZUF0dHJpYnV0ZVZhbHVlKGlucHV0RWxlbWVudFswXS5uYW1lKSArIFwiJ11cIiksXHJcbiAgICAgICAgICAgIHJlcGxhY2VBdHRyVmFsdWUgPSBjb250YWluZXIuYXR0cihcImRhdGEtdmFsbXNnLXJlcGxhY2VcIiksXHJcbiAgICAgICAgICAgIHJlcGxhY2UgPSByZXBsYWNlQXR0clZhbHVlID8gJC5wYXJzZUpTT04ocmVwbGFjZUF0dHJWYWx1ZSkgIT09IGZhbHNlIDogbnVsbDtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKFwiZmllbGQtdmFsaWRhdGlvbi12YWxpZFwiKS5hZGRDbGFzcyhcImZpZWxkLXZhbGlkYXRpb24tZXJyb3JcIik7XHJcbiAgICAgICAgZXJyb3IuZGF0YShcInVub2J0cnVzaXZlQ29udGFpbmVyXCIsIGNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIGlmIChyZXBsYWNlKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5lbXB0eSgpO1xyXG4gICAgICAgICAgICBlcnJvci5yZW1vdmVDbGFzcyhcImlucHV0LXZhbGlkYXRpb24tZXJyb3JcIikuYXBwZW5kVG8oY29udGFpbmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGVycm9yLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25FcnJvcnMoZXZlbnQsIHZhbGlkYXRvcikgeyAgLy8gJ3RoaXMnIGlzIHRoZSBmb3JtIGVsZW1lbnRcclxuICAgICAgICB2YXIgY29udGFpbmVyID0gJCh0aGlzKS5maW5kKFwiW2RhdGEtdmFsbXNnLXN1bW1hcnk9dHJ1ZV1cIiksXHJcbiAgICAgICAgICAgIGxpc3QgPSBjb250YWluZXIuZmluZChcInVsXCIpO1xyXG5cclxuICAgICAgICBpZiAobGlzdCAmJiBsaXN0Lmxlbmd0aCAmJiB2YWxpZGF0b3IuZXJyb3JMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsaXN0LmVtcHR5KCk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhcInZhbGlkYXRpb24tc3VtbWFyeS1lcnJvcnNcIikucmVtb3ZlQ2xhc3MoXCJ2YWxpZGF0aW9uLXN1bW1hcnktdmFsaWRcIik7XHJcblxyXG4gICAgICAgICAgICAkLmVhY2godmFsaWRhdG9yLmVycm9yTGlzdCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJChcIjxsaSAvPlwiKS5odG1sKHRoaXMubWVzc2FnZSkuYXBwZW5kVG8obGlzdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvblN1Y2Nlc3MoZXJyb3IpIHsgIC8vICd0aGlzJyBpcyB0aGUgZm9ybSBlbGVtZW50XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGVycm9yLmRhdGEoXCJ1bm9idHJ1c2l2ZUNvbnRhaW5lclwiKTtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB2YXIgcmVwbGFjZUF0dHJWYWx1ZSA9IGNvbnRhaW5lci5hdHRyKFwiZGF0YS12YWxtc2ctcmVwbGFjZVwiKSxcclxuICAgICAgICAgICAgICAgIHJlcGxhY2UgPSByZXBsYWNlQXR0clZhbHVlID8gJC5wYXJzZUpTT04ocmVwbGFjZUF0dHJWYWx1ZSkgOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKFwiZmllbGQtdmFsaWRhdGlvbi12YWxpZFwiKS5yZW1vdmVDbGFzcyhcImZpZWxkLXZhbGlkYXRpb24tZXJyb3JcIik7XHJcbiAgICAgICAgICAgIGVycm9yLnJlbW92ZURhdGEoXCJ1bm9idHJ1c2l2ZUNvbnRhaW5lclwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXBsYWNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuZW1wdHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvblJlc2V0KGV2ZW50KSB7ICAvLyAndGhpcycgaXMgdGhlIGZvcm0gZWxlbWVudFxyXG4gICAgICAgIHZhciAkZm9ybSA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIGtleSA9ICdfX2pxdWVyeV91bm9idHJ1c2l2ZV92YWxpZGF0aW9uX2Zvcm1fcmVzZXQnO1xyXG4gICAgICAgIGlmICgkZm9ybS5kYXRhKGtleSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTZXQgYSBmbGFnIHRoYXQgaW5kaWNhdGVzIHdlJ3JlIGN1cnJlbnRseSByZXNldHRpbmcgdGhlIGZvcm0uXHJcbiAgICAgICAgJGZvcm0uZGF0YShrZXksIHRydWUpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICRmb3JtLmRhdGEoXCJ2YWxpZGF0b3JcIikucmVzZXRGb3JtKCk7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgJGZvcm0ucmVtb3ZlRGF0YShrZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGZvcm0uZmluZChcIi52YWxpZGF0aW9uLXN1bW1hcnktZXJyb3JzXCIpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcInZhbGlkYXRpb24tc3VtbWFyeS12YWxpZFwiKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJ2YWxpZGF0aW9uLXN1bW1hcnktZXJyb3JzXCIpO1xyXG4gICAgICAgICRmb3JtLmZpbmQoXCIuZmllbGQtdmFsaWRhdGlvbi1lcnJvclwiKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJmaWVsZC12YWxpZGF0aW9uLXZhbGlkXCIpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImZpZWxkLXZhbGlkYXRpb24tZXJyb3JcIilcclxuICAgICAgICAgICAgLnJlbW92ZURhdGEoXCJ1bm9idHJ1c2l2ZUNvbnRhaW5lclwiKVxyXG4gICAgICAgICAgICAuZmluZChcIj4qXCIpICAvLyBJZiB3ZSB3ZXJlIHVzaW5nIHZhbG1zZy1yZXBsYWNlLCBnZXQgdGhlIHVuZGVybHlpbmcgZXJyb3JcclxuICAgICAgICAgICAgICAgIC5yZW1vdmVEYXRhKFwidW5vYnRydXNpdmVDb250YWluZXJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGlvbkluZm8oZm9ybSkge1xyXG4gICAgICAgIHZhciAkZm9ybSA9ICQoZm9ybSksXHJcbiAgICAgICAgICAgIHJlc3VsdCA9ICRmb3JtLmRhdGEoZGF0YV92YWxpZGF0aW9uKSxcclxuICAgICAgICAgICAgb25SZXNldFByb3h5ID0gJC5wcm94eShvblJlc2V0LCBmb3JtKSxcclxuICAgICAgICAgICAgZGVmYXVsdE9wdGlvbnMgPSAkalF2YWwudW5vYnRydXNpdmUub3B0aW9ucyB8fCB7fSxcclxuICAgICAgICAgICAgZXhlY0luQ29udGV4dCA9IGZ1bmN0aW9uIChuYW1lLCBhcmdzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZnVuYyA9IGRlZmF1bHRPcHRpb25zW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgZnVuYyAmJiAkLmlzRnVuY3Rpb24oZnVuYykgJiYgZnVuYy5hcHBseShmb3JtLCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7ICAvLyBvcHRpb25zIHN0cnVjdHVyZSBwYXNzZWQgdG8galF1ZXJ5IFZhbGlkYXRlJ3MgdmFsaWRhdGUoKSBtZXRob2RcclxuICAgICAgICAgICAgICAgICAgICBlcnJvckNsYXNzOiBkZWZhdWx0T3B0aW9ucy5lcnJvckNsYXNzIHx8IFwiaW5wdXQtdmFsaWRhdGlvbi1lcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yRWxlbWVudDogZGVmYXVsdE9wdGlvbnMuZXJyb3JFbGVtZW50IHx8IFwic3BhblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yUGxhY2VtZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRXJyb3IuYXBwbHkoZm9ybSwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhlY0luQ29udGV4dChcImVycm9yUGxhY2VtZW50XCIsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBpbnZhbGlkSGFuZGxlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9ycy5hcHBseShmb3JtLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBleGVjSW5Db250ZXh0KFwiaW52YWxpZEhhbmRsZXJcIiwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICBydWxlczoge30sXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MuYXBwbHkoZm9ybSwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhlY0luQ29udGV4dChcInN1Y2Nlc3NcIiwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYXR0YWNoVmFsaWRhdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vZmYoXCJyZXNldC5cIiArIGRhdGFfdmFsaWRhdGlvbiwgb25SZXNldFByb3h5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oXCJyZXNldC5cIiArIGRhdGFfdmFsaWRhdGlvbiwgb25SZXNldFByb3h5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudmFsaWRhdGUodGhpcy5vcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKCkgeyAgLy8gYSB2YWxpZGF0aW9uIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIGJ5IHVub2J0cnVzaXZlIEFqYXhcclxuICAgICAgICAgICAgICAgICAgICAkZm9ybS52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkZm9ybS52YWxpZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAkZm9ybS5kYXRhKGRhdGFfdmFsaWRhdGlvbiwgcmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgJGpRdmFsLnVub2J0cnVzaXZlID0ge1xyXG4gICAgICAgIGFkYXB0ZXJzOiBbXSxcclxuXHJcbiAgICAgICAgcGFyc2VFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCwgc2tpcEF0dGFjaCkge1xyXG4gICAgICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyBQYXJzZXMgYSBzaW5nbGUgSFRNTCBlbGVtZW50IGZvciB1bm9idHJ1c2l2ZSB2YWxpZGF0aW9uIGF0dHJpYnV0ZXMuXHJcbiAgICAgICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImVsZW1lbnRcIiBkb21FbGVtZW50PVwidHJ1ZVwiPlRoZSBIVE1MIGVsZW1lbnQgdG8gYmUgcGFyc2VkLjwvcGFyYW0+XHJcbiAgICAgICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNraXBBdHRhY2hcIiB0eXBlPVwiQm9vbGVhblwiPltPcHRpb25hbF0gdHJ1ZSB0byBza2lwIGF0dGFjaGluZyB0aGVcclxuICAgICAgICAgICAgLy8vIHZhbGlkYXRpb24gdG8gdGhlIGZvcm0uIElmIHBhcnNpbmcganVzdCB0aGlzIHNpbmdsZSBlbGVtZW50LCB5b3Ugc2hvdWxkIHNwZWNpZnkgdHJ1ZS5cclxuICAgICAgICAgICAgLy8vIElmIHBhcnNpbmcgc2V2ZXJhbCBlbGVtZW50cywgeW91IHNob3VsZCBzcGVjaWZ5IGZhbHNlLCBhbmQgbWFudWFsbHkgYXR0YWNoIHRoZSB2YWxpZGF0aW9uXHJcbiAgICAgICAgICAgIC8vLyB0byB0aGUgZm9ybSB3aGVuIHlvdSBhcmUgZmluaXNoZWQuIFRoZSBkZWZhdWx0IGlzIGZhbHNlLjwvcGFyYW0+XHJcbiAgICAgICAgICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCksXHJcbiAgICAgICAgICAgICAgICBmb3JtID0gJGVsZW1lbnQucGFyZW50cyhcImZvcm1cIilbMF0sXHJcbiAgICAgICAgICAgICAgICB2YWxJbmZvLCBydWxlcywgbWVzc2FnZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWZvcm0pIHsgIC8vIENhbm5vdCBkbyBjbGllbnQtc2lkZSB2YWxpZGF0aW9uIHdpdGhvdXQgYSBmb3JtXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhbEluZm8gPSB2YWxpZGF0aW9uSW5mbyhmb3JtKTtcclxuICAgICAgICAgICAgdmFsSW5mby5vcHRpb25zLnJ1bGVzW2VsZW1lbnQubmFtZV0gPSBydWxlcyA9IHt9O1xyXG4gICAgICAgICAgICB2YWxJbmZvLm9wdGlvbnMubWVzc2FnZXNbZWxlbWVudC5uYW1lXSA9IG1lc3NhZ2VzID0ge307XHJcblxyXG4gICAgICAgICAgICAkLmVhY2godGhpcy5hZGFwdGVycywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByZWZpeCA9IFwiZGF0YS12YWwtXCIgKyB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICRlbGVtZW50LmF0dHIocHJlZml4KSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbVZhbHVlcyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlICE9PSB1bmRlZmluZWQpIHsgIC8vIENvbXBhcmUgYWdhaW5zdCB1bmRlZmluZWQsIGJlY2F1c2UgYW4gZW1wdHkgbWVzc2FnZSBpcyBsZWdhbCAoYW5kIGZhbHN5KVxyXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeCArPSBcIi1cIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHRoaXMucGFyYW1zLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtVmFsdWVzW3RoaXNdID0gJGVsZW1lbnQuYXR0cihwcmVmaXggKyB0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFwdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1WYWx1ZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGVzOiBydWxlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXM6IG1lc3NhZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJC5leHRlbmQocnVsZXMsIHsgXCJfX2R1bW15X19cIjogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghc2tpcEF0dGFjaCkge1xyXG4gICAgICAgICAgICAgICAgdmFsSW5mby5hdHRhY2hWYWxpZGF0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwYXJzZTogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIFBhcnNlcyBhbGwgdGhlIEhUTUwgZWxlbWVudHMgaW4gdGhlIHNwZWNpZmllZCBzZWxlY3Rvci4gSXQgbG9va3MgZm9yIGlucHV0IGVsZW1lbnRzIGRlY29yYXRlZFxyXG4gICAgICAgICAgICAvLy8gd2l0aCB0aGUgW2RhdGEtdmFsPXRydWVdIGF0dHJpYnV0ZSB2YWx1ZSBhbmQgZW5hYmxlcyB2YWxpZGF0aW9uIGFjY29yZGluZyB0byB0aGUgZGF0YS12YWwtKlxyXG4gICAgICAgICAgICAvLy8gYXR0cmlidXRlIHZhbHVlcy5cclxuICAgICAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2VsZWN0b3JcIiB0eXBlPVwiU3RyaW5nXCI+QW55IHZhbGlkIGpRdWVyeSBzZWxlY3Rvci48L3BhcmFtPlxyXG5cclxuICAgICAgICAgICAgLy8gJGZvcm1zIGluY2x1ZGVzIGFsbCBmb3JtcyBpbiBzZWxlY3RvcidzIERPTSBoaWVyYXJjaHkgKHBhcmVudCwgY2hpbGRyZW4gYW5kIHNlbGYpIHRoYXQgaGF2ZSBhdCBsZWFzdCBvbmVcclxuICAgICAgICAgICAgLy8gZWxlbWVudCB3aXRoIGRhdGEtdmFsPXRydWVcclxuICAgICAgICAgICAgdmFyICRzZWxlY3RvciA9ICQoc2VsZWN0b3IpLFxyXG4gICAgICAgICAgICAgICAgJGZvcm1zID0gJHNlbGVjdG9yLnBhcmVudHMoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEJhY2soKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihcImZvcm1cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGQoJHNlbGVjdG9yLmZpbmQoXCJmb3JtXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmhhcyhcIltkYXRhLXZhbD10cnVlXVwiKTtcclxuXHJcbiAgICAgICAgICAgICRzZWxlY3Rvci5maW5kKFwiW2RhdGEtdmFsPXRydWVdXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJGpRdmFsLnVub2J0cnVzaXZlLnBhcnNlRWxlbWVudCh0aGlzLCB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkZm9ybXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5mbyA9IHZhbGlkYXRpb25JbmZvKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmZvLmF0dGFjaFZhbGlkYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBhZGFwdGVycyA9ICRqUXZhbC51bm9idHJ1c2l2ZS5hZGFwdGVycztcclxuXHJcbiAgICBhZGFwdGVycy5hZGQgPSBmdW5jdGlvbiAoYWRhcHRlck5hbWUsIHBhcmFtcywgZm4pIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+QWRkcyBhIG5ldyBhZGFwdGVyIHRvIGNvbnZlcnQgdW5vYnRydXNpdmUgSFRNTCBpbnRvIGEgalF1ZXJ5IFZhbGlkYXRlIHZhbGlkYXRpb24uPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFkYXB0ZXJOYW1lXCIgdHlwZT1cIlN0cmluZ1wiPlRoZSBuYW1lIG9mIHRoZSBhZGFwdGVyIHRvIGJlIGFkZGVkLiBUaGlzIG1hdGNoZXMgdGhlIG5hbWUgdXNlZFxyXG4gICAgICAgIC8vLyBpbiB0aGUgZGF0YS12YWwtbm5ubiBIVE1MIGF0dHJpYnV0ZSAod2hlcmUgbm5ubiBpcyB0aGUgYWRhcHRlciBuYW1lKS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhcmFtc1wiIHR5cGU9XCJBcnJheVwiIG9wdGlvbmFsPVwidHJ1ZVwiPltPcHRpb25hbF0gQW4gYXJyYXkgb2YgcGFyYW1ldGVyIG5hbWVzIChzdHJpbmdzKSB0aGF0IHdpbGxcclxuICAgICAgICAvLy8gYmUgZXh0cmFjdGVkIGZyb20gdGhlIGRhdGEtdmFsLW5ubm4tbW1tbSBIVE1MIGF0dHJpYnV0ZXMgKHdoZXJlIG5ubm4gaXMgdGhlIGFkYXB0ZXIgbmFtZSwgYW5kXHJcbiAgICAgICAgLy8vIG1tbW0gaXMgdGhlIHBhcmFtZXRlciBuYW1lKS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZuXCIgdHlwZT1cIkZ1bmN0aW9uXCI+VGhlIGZ1bmN0aW9uIHRvIGNhbGwsIHdoaWNoIGFkYXB0cyB0aGUgdmFsdWVzIGZyb20gdGhlIEhUTUxcclxuICAgICAgICAvLy8gYXR0cmlidXRlcyBpbnRvIGpRdWVyeSBWYWxpZGF0ZSBydWxlcyBhbmQvb3IgbWVzc2FnZXMuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnMgdHlwZT1cImpRdWVyeS52YWxpZGF0b3IudW5vYnRydXNpdmUuYWRhcHRlcnNcIiAvPlxyXG4gICAgICAgIGlmICghZm4pIHsgIC8vIENhbGxlZCB3aXRoIG5vIHBhcmFtcywganVzdCBhIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIGZuID0gcGFyYW1zO1xyXG4gICAgICAgICAgICBwYXJhbXMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wdXNoKHsgbmFtZTogYWRhcHRlck5hbWUsIHBhcmFtczogcGFyYW1zLCBhZGFwdDogZm4gfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkYXB0ZXJzLmFkZEJvb2wgPSBmdW5jdGlvbiAoYWRhcHRlck5hbWUsIHJ1bGVOYW1lKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkFkZHMgYSBuZXcgYWRhcHRlciB0byBjb252ZXJ0IHVub2J0cnVzaXZlIEhUTUwgaW50byBhIGpRdWVyeSBWYWxpZGF0ZSB2YWxpZGF0aW9uLCB3aGVyZVxyXG4gICAgICAgIC8vLyB0aGUgalF1ZXJ5IFZhbGlkYXRlIHZhbGlkYXRpb24gcnVsZSBoYXMgbm8gcGFyYW1ldGVyIHZhbHVlcy48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYWRhcHRlck5hbWVcIiB0eXBlPVwiU3RyaW5nXCI+VGhlIG5hbWUgb2YgdGhlIGFkYXB0ZXIgdG8gYmUgYWRkZWQuIFRoaXMgbWF0Y2hlcyB0aGUgbmFtZSB1c2VkXHJcbiAgICAgICAgLy8vIGluIHRoZSBkYXRhLXZhbC1ubm5uIEhUTUwgYXR0cmlidXRlICh3aGVyZSBubm5uIGlzIHRoZSBhZGFwdGVyIG5hbWUpLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicnVsZU5hbWVcIiB0eXBlPVwiU3RyaW5nXCIgb3B0aW9uYWw9XCJ0cnVlXCI+W09wdGlvbmFsXSBUaGUgbmFtZSBvZiB0aGUgalF1ZXJ5IFZhbGlkYXRlIHJ1bGUuIElmIG5vdCBwcm92aWRlZCwgdGhlIHZhbHVlXHJcbiAgICAgICAgLy8vIG9mIGFkYXB0ZXJOYW1lIHdpbGwgYmUgdXNlZCBpbnN0ZWFkLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zIHR5cGU9XCJqUXVlcnkudmFsaWRhdG9yLnVub2J0cnVzaXZlLmFkYXB0ZXJzXCIgLz5cclxuICAgICAgICByZXR1cm4gdGhpcy5hZGQoYWRhcHRlck5hbWUsIGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHNldFZhbGlkYXRpb25WYWx1ZXMob3B0aW9ucywgcnVsZU5hbWUgfHwgYWRhcHRlck5hbWUsIHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBhZGFwdGVycy5hZGRNaW5NYXggPSBmdW5jdGlvbiAoYWRhcHRlck5hbWUsIG1pblJ1bGVOYW1lLCBtYXhSdWxlTmFtZSwgbWluTWF4UnVsZU5hbWUsIG1pbkF0dHJpYnV0ZSwgbWF4QXR0cmlidXRlKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkFkZHMgYSBuZXcgYWRhcHRlciB0byBjb252ZXJ0IHVub2J0cnVzaXZlIEhUTUwgaW50byBhIGpRdWVyeSBWYWxpZGF0ZSB2YWxpZGF0aW9uLCB3aGVyZVxyXG4gICAgICAgIC8vLyB0aGUgalF1ZXJ5IFZhbGlkYXRlIHZhbGlkYXRpb24gaGFzIHRocmVlIHBvdGVudGlhbCBydWxlcyAob25lIGZvciBtaW4tb25seSwgb25lIGZvciBtYXgtb25seSwgYW5kXHJcbiAgICAgICAgLy8vIG9uZSBmb3IgbWluLWFuZC1tYXgpLiBUaGUgSFRNTCBwYXJhbWV0ZXJzIGFyZSBleHBlY3RlZCB0byBiZSBuYW1lZCAtbWluIGFuZCAtbWF4Ljwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhZGFwdGVyTmFtZVwiIHR5cGU9XCJTdHJpbmdcIj5UaGUgbmFtZSBvZiB0aGUgYWRhcHRlciB0byBiZSBhZGRlZC4gVGhpcyBtYXRjaGVzIHRoZSBuYW1lIHVzZWRcclxuICAgICAgICAvLy8gaW4gdGhlIGRhdGEtdmFsLW5ubm4gSFRNTCBhdHRyaWJ1dGUgKHdoZXJlIG5ubm4gaXMgdGhlIGFkYXB0ZXIgbmFtZSkuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtaW5SdWxlTmFtZVwiIHR5cGU9XCJTdHJpbmdcIj5UaGUgbmFtZSBvZiB0aGUgalF1ZXJ5IFZhbGlkYXRlIHJ1bGUgdG8gYmUgdXNlZCB3aGVuIHlvdSBvbmx5XHJcbiAgICAgICAgLy8vIGhhdmUgYSBtaW5pbXVtIHZhbHVlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibWF4UnVsZU5hbWVcIiB0eXBlPVwiU3RyaW5nXCI+VGhlIG5hbWUgb2YgdGhlIGpRdWVyeSBWYWxpZGF0ZSBydWxlIHRvIGJlIHVzZWQgd2hlbiB5b3Ugb25seVxyXG4gICAgICAgIC8vLyBoYXZlIGEgbWF4aW11bSB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1pbk1heFJ1bGVOYW1lXCIgdHlwZT1cIlN0cmluZ1wiPlRoZSBuYW1lIG9mIHRoZSBqUXVlcnkgVmFsaWRhdGUgcnVsZSB0byBiZSB1c2VkIHdoZW4geW91XHJcbiAgICAgICAgLy8vIGhhdmUgYm90aCBhIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtaW5BdHRyaWJ1dGVcIiB0eXBlPVwiU3RyaW5nXCIgb3B0aW9uYWw9XCJ0cnVlXCI+W09wdGlvbmFsXSBUaGUgbmFtZSBvZiB0aGUgSFRNTCBhdHRyaWJ1dGUgdGhhdFxyXG4gICAgICAgIC8vLyBjb250YWlucyB0aGUgbWluaW11bSB2YWx1ZS4gVGhlIGRlZmF1bHQgaXMgXCJtaW5cIi48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1heEF0dHJpYnV0ZVwiIHR5cGU9XCJTdHJpbmdcIiBvcHRpb25hbD1cInRydWVcIj5bT3B0aW9uYWxdIFRoZSBuYW1lIG9mIHRoZSBIVE1MIGF0dHJpYnV0ZSB0aGF0XHJcbiAgICAgICAgLy8vIGNvbnRhaW5zIHRoZSBtYXhpbXVtIHZhbHVlLiBUaGUgZGVmYXVsdCBpcyBcIm1heFwiLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zIHR5cGU9XCJqUXVlcnkudmFsaWRhdG9yLnVub2J0cnVzaXZlLmFkYXB0ZXJzXCIgLz5cclxuICAgICAgICByZXR1cm4gdGhpcy5hZGQoYWRhcHRlck5hbWUsIFttaW5BdHRyaWJ1dGUgfHwgXCJtaW5cIiwgbWF4QXR0cmlidXRlIHx8IFwibWF4XCJdLCBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgbWluID0gb3B0aW9ucy5wYXJhbXMubWluLFxyXG4gICAgICAgICAgICAgICAgbWF4ID0gb3B0aW9ucy5wYXJhbXMubWF4O1xyXG5cclxuICAgICAgICAgICAgaWYgKG1pbiAmJiBtYXgpIHtcclxuICAgICAgICAgICAgICAgIHNldFZhbGlkYXRpb25WYWx1ZXMob3B0aW9ucywgbWluTWF4UnVsZU5hbWUsIFttaW4sIG1heF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1pbikge1xyXG4gICAgICAgICAgICAgICAgc2V0VmFsaWRhdGlvblZhbHVlcyhvcHRpb25zLCBtaW5SdWxlTmFtZSwgbWluKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChtYXgpIHtcclxuICAgICAgICAgICAgICAgIHNldFZhbGlkYXRpb25WYWx1ZXMob3B0aW9ucywgbWF4UnVsZU5hbWUsIG1heCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgYWRhcHRlcnMuYWRkU2luZ2xlVmFsID0gZnVuY3Rpb24gKGFkYXB0ZXJOYW1lLCBhdHRyaWJ1dGUsIHJ1bGVOYW1lKSB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkFkZHMgYSBuZXcgYWRhcHRlciB0byBjb252ZXJ0IHVub2J0cnVzaXZlIEhUTUwgaW50byBhIGpRdWVyeSBWYWxpZGF0ZSB2YWxpZGF0aW9uLCB3aGVyZVxyXG4gICAgICAgIC8vLyB0aGUgalF1ZXJ5IFZhbGlkYXRlIHZhbGlkYXRpb24gcnVsZSBoYXMgYSBzaW5nbGUgdmFsdWUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImFkYXB0ZXJOYW1lXCIgdHlwZT1cIlN0cmluZ1wiPlRoZSBuYW1lIG9mIHRoZSBhZGFwdGVyIHRvIGJlIGFkZGVkLiBUaGlzIG1hdGNoZXMgdGhlIG5hbWUgdXNlZFxyXG4gICAgICAgIC8vLyBpbiB0aGUgZGF0YS12YWwtbm5ubiBIVE1MIGF0dHJpYnV0ZSh3aGVyZSBubm5uIGlzIHRoZSBhZGFwdGVyIG5hbWUpLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXR0cmlidXRlXCIgdHlwZT1cIlN0cmluZ1wiPltPcHRpb25hbF0gVGhlIG5hbWUgb2YgdGhlIEhUTUwgYXR0cmlidXRlIHRoYXQgY29udGFpbnMgdGhlIHZhbHVlLlxyXG4gICAgICAgIC8vLyBUaGUgZGVmYXVsdCBpcyBcInZhbFwiLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicnVsZU5hbWVcIiB0eXBlPVwiU3RyaW5nXCIgb3B0aW9uYWw9XCJ0cnVlXCI+W09wdGlvbmFsXSBUaGUgbmFtZSBvZiB0aGUgalF1ZXJ5IFZhbGlkYXRlIHJ1bGUuIElmIG5vdCBwcm92aWRlZCwgdGhlIHZhbHVlXHJcbiAgICAgICAgLy8vIG9mIGFkYXB0ZXJOYW1lIHdpbGwgYmUgdXNlZCBpbnN0ZWFkLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zIHR5cGU9XCJqUXVlcnkudmFsaWRhdG9yLnVub2J0cnVzaXZlLmFkYXB0ZXJzXCIgLz5cclxuICAgICAgICByZXR1cm4gdGhpcy5hZGQoYWRhcHRlck5hbWUsIFthdHRyaWJ1dGUgfHwgXCJ2YWxcIl0sIGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHNldFZhbGlkYXRpb25WYWx1ZXMob3B0aW9ucywgcnVsZU5hbWUgfHwgYWRhcHRlck5hbWUsIG9wdGlvbnMucGFyYW1zW2F0dHJpYnV0ZV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAkalF2YWwuYWRkTWV0aG9kKFwiX19kdW1teV9fXCIsIGZ1bmN0aW9uICh2YWx1ZSwgZWxlbWVudCwgcGFyYW1zKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkalF2YWwuYWRkTWV0aG9kKFwicmVnZXhcIiwgZnVuY3Rpb24gKHZhbHVlLCBlbGVtZW50LCBwYXJhbXMpIHtcclxuICAgICAgICB2YXIgbWF0Y2g7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uYWwoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtYXRjaCA9IG5ldyBSZWdFeHAocGFyYW1zKS5leGVjKHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gKG1hdGNoICYmIChtYXRjaC5pbmRleCA9PT0gMCkgJiYgKG1hdGNoWzBdLmxlbmd0aCA9PT0gdmFsdWUubGVuZ3RoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkalF2YWwuYWRkTWV0aG9kKFwibm9uYWxwaGFtaW5cIiwgZnVuY3Rpb24gKHZhbHVlLCBlbGVtZW50LCBub25hbHBoYW1pbikge1xyXG4gICAgICAgIHZhciBtYXRjaDtcclxuICAgICAgICBpZiAobm9uYWxwaGFtaW4pIHtcclxuICAgICAgICAgICAgbWF0Y2ggPSB2YWx1ZS5tYXRjaCgvXFxXL2cpO1xyXG4gICAgICAgICAgICBtYXRjaCA9IG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+PSBub25hbHBoYW1pbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCRqUXZhbC5tZXRob2RzLmV4dGVuc2lvbikge1xyXG4gICAgICAgIGFkYXB0ZXJzLmFkZFNpbmdsZVZhbChcImFjY2VwdFwiLCBcIm1pbXR5cGVcIik7XHJcbiAgICAgICAgYWRhcHRlcnMuYWRkU2luZ2xlVmFsKFwiZXh0ZW5zaW9uXCIsIFwiZXh0ZW5zaW9uXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgd2hlbiB0aGUgJ2V4dGVuc2lvbicgdmFsaWRhdGlvbiBtZXRob2QgZG9lcyBub3QgZXhpc3QsIHN1Y2ggYXMgd2l0aCB2ZXJzaW9uc1xyXG4gICAgICAgIC8vIG9mIEpRdWVyeSBWYWxpZGF0aW9uIHBsdWdpbiBwcmlvciB0byAxLjEwLCB3ZSBzaG91bGQgdXNlIHRoZSAnYWNjZXB0JyBtZXRob2QgZm9yXHJcbiAgICAgICAgLy8gdmFsaWRhdGluZyB0aGUgZXh0ZW5zaW9uLCBhbmQgaWdub3JlIG1pbWUtdHlwZSB2YWxpZGF0aW9ucyBhcyB0aGV5IGFyZSBub3Qgc3VwcG9ydGVkLlxyXG4gICAgICAgIGFkYXB0ZXJzLmFkZFNpbmdsZVZhbChcImV4dGVuc2lvblwiLCBcImV4dGVuc2lvblwiLCBcImFjY2VwdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGFwdGVycy5hZGRTaW5nbGVWYWwoXCJyZWdleFwiLCBcInBhdHRlcm5cIik7XHJcbiAgICBhZGFwdGVycy5hZGRCb29sKFwiY3JlZGl0Y2FyZFwiKS5hZGRCb29sKFwiZGF0ZVwiKS5hZGRCb29sKFwiZGlnaXRzXCIpLmFkZEJvb2woXCJlbWFpbFwiKS5hZGRCb29sKFwibnVtYmVyXCIpLmFkZEJvb2woXCJ1cmxcIik7XHJcbiAgICBhZGFwdGVycy5hZGRNaW5NYXgoXCJsZW5ndGhcIiwgXCJtaW5sZW5ndGhcIiwgXCJtYXhsZW5ndGhcIiwgXCJyYW5nZWxlbmd0aFwiKS5hZGRNaW5NYXgoXCJyYW5nZVwiLCBcIm1pblwiLCBcIm1heFwiLCBcInJhbmdlXCIpO1xyXG4gICAgYWRhcHRlcnMuYWRkTWluTWF4KFwibWlubGVuZ3RoXCIsIFwibWlubGVuZ3RoXCIpLmFkZE1pbk1heChcIm1heGxlbmd0aFwiLCBcIm1pbmxlbmd0aFwiLCBcIm1heGxlbmd0aFwiKTtcclxuICAgIGFkYXB0ZXJzLmFkZChcImVxdWFsdG9cIiwgW1wib3RoZXJcIl0sIGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHByZWZpeCA9IGdldE1vZGVsUHJlZml4KG9wdGlvbnMuZWxlbWVudC5uYW1lKSxcclxuICAgICAgICAgICAgb3RoZXIgPSBvcHRpb25zLnBhcmFtcy5vdGhlcixcclxuICAgICAgICAgICAgZnVsbE90aGVyTmFtZSA9IGFwcGVuZE1vZGVsUHJlZml4KG90aGVyLCBwcmVmaXgpLFxyXG4gICAgICAgICAgICBlbGVtZW50ID0gJChvcHRpb25zLmZvcm0pLmZpbmQoXCI6aW5wdXRcIikuZmlsdGVyKFwiW25hbWU9J1wiICsgZXNjYXBlQXR0cmlidXRlVmFsdWUoZnVsbE90aGVyTmFtZSkgKyBcIiddXCIpWzBdO1xyXG5cclxuICAgICAgICBzZXRWYWxpZGF0aW9uVmFsdWVzKG9wdGlvbnMsIFwiZXF1YWxUb1wiLCBlbGVtZW50KTtcclxuICAgIH0pO1xyXG4gICAgYWRhcHRlcnMuYWRkKFwicmVxdWlyZWRcIiwgZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAvLyBqUXVlcnkgVmFsaWRhdGUgZXF1YXRlcyBcInJlcXVpcmVkXCIgd2l0aCBcIm1hbmRhdG9yeVwiIGZvciBjaGVja2JveCBlbGVtZW50c1xyXG4gICAgICAgIGlmIChvcHRpb25zLmVsZW1lbnQudGFnTmFtZS50b1VwcGVyQ2FzZSgpICE9PSBcIklOUFVUXCIgfHwgb3B0aW9ucy5lbGVtZW50LnR5cGUudG9VcHBlckNhc2UoKSAhPT0gXCJDSEVDS0JPWFwiKSB7XHJcbiAgICAgICAgICAgIHNldFZhbGlkYXRpb25WYWx1ZXMob3B0aW9ucywgXCJyZXF1aXJlZFwiLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGFkYXB0ZXJzLmFkZChcInJlbW90ZVwiLCBbXCJ1cmxcIiwgXCJ0eXBlXCIsIFwiYWRkaXRpb25hbGZpZWxkc1wiXSwgZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgdmFsdWUgPSB7XHJcbiAgICAgICAgICAgIHVybDogb3B0aW9ucy5wYXJhbXMudXJsLFxyXG4gICAgICAgICAgICB0eXBlOiBvcHRpb25zLnBhcmFtcy50eXBlIHx8IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHt9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJlZml4ID0gZ2V0TW9kZWxQcmVmaXgob3B0aW9ucy5lbGVtZW50Lm5hbWUpO1xyXG5cclxuICAgICAgICAkLmVhY2goc3BsaXRBbmRUcmltKG9wdGlvbnMucGFyYW1zLmFkZGl0aW9uYWxmaWVsZHMgfHwgb3B0aW9ucy5lbGVtZW50Lm5hbWUpLCBmdW5jdGlvbiAoaSwgZmllbGROYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbU5hbWUgPSBhcHBlbmRNb2RlbFByZWZpeChmaWVsZE5hbWUsIHByZWZpeCk7XHJcbiAgICAgICAgICAgIHZhbHVlLmRhdGFbcGFyYW1OYW1lXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9ICQob3B0aW9ucy5mb3JtKS5maW5kKFwiOmlucHV0XCIpLmZpbHRlcihcIltuYW1lPSdcIiArIGVzY2FwZUF0dHJpYnV0ZVZhbHVlKHBhcmFtTmFtZSkgKyBcIiddXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gRm9yIGNoZWNrYm94ZXMgYW5kIHJhZGlvIGJ1dHRvbnMsIG9ubHkgcGljayB1cCB2YWx1ZXMgZnJvbSBjaGVja2VkIGZpZWxkcy5cclxuICAgICAgICAgICAgICAgIGlmIChmaWVsZC5pcyhcIjpjaGVja2JveFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZC5maWx0ZXIoXCI6Y2hlY2tlZFwiKS52YWwoKSB8fCBmaWVsZC5maWx0ZXIoXCI6aGlkZGVuXCIpLnZhbCgpIHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZmllbGQuaXMoXCI6cmFkaW9cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmllbGQuZmlsdGVyKFwiOmNoZWNrZWRcIikudmFsKCkgfHwgJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmllbGQudmFsKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNldFZhbGlkYXRpb25WYWx1ZXMob3B0aW9ucywgXCJyZW1vdGVcIiwgdmFsdWUpO1xyXG4gICAgfSk7XHJcbiAgICBhZGFwdGVycy5hZGQoXCJwYXNzd29yZFwiLCBbXCJtaW5cIiwgXCJub25hbHBoYW1pblwiLCBcInJlZ2V4XCJdLCBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgIGlmIChvcHRpb25zLnBhcmFtcy5taW4pIHtcclxuICAgICAgICAgICAgc2V0VmFsaWRhdGlvblZhbHVlcyhvcHRpb25zLCBcIm1pbmxlbmd0aFwiLCBvcHRpb25zLnBhcmFtcy5taW4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy5wYXJhbXMubm9uYWxwaGFtaW4pIHtcclxuICAgICAgICAgICAgc2V0VmFsaWRhdGlvblZhbHVlcyhvcHRpb25zLCBcIm5vbmFscGhhbWluXCIsIG9wdGlvbnMucGFyYW1zLm5vbmFscGhhbWluKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMucGFyYW1zLnJlZ2V4KSB7XHJcbiAgICAgICAgICAgIHNldFZhbGlkYXRpb25WYWx1ZXMob3B0aW9ucywgXCJyZWdleFwiLCBvcHRpb25zLnBhcmFtcy5yZWdleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJGpRdmFsLnVub2J0cnVzaXZlLnBhcnNlKGRvY3VtZW50KTtcclxuICAgIH0pO1xyXG59KGpRdWVyeSkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93d3dyb290L2xpYi9qcXVlcnktdmFsaWRhdGlvbi11bm9idHJ1c2l2ZS9qcXVlcnkudmFsaWRhdGUudW5vYnRydXNpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9