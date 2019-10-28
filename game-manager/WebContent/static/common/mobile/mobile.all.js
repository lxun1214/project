/*! jQuery Validation Plugin - v1.11.0 - 2/4/2013
 * https://github.com/jzaefferer/jquery-validation
 * Copyright (c) 2013 Jörn Zaefferer; Licensed MIT */
(function(a) {
	a
			.extend(
					a.fn,
					{
						validate : function(b) {
							if (!this.length) {
								if (b && b.debug && window.console) {
									console
											.warn("Nothing selected, can't validate, returning nothing.")
								}
								return
							}
							var c = a.data(this[0], "validator");
							if (c) {
								return c
							}
							this.attr("novalidate", "novalidate");
							c = new a.validator(b, this[0]);
							a.data(this[0], "validator", c);
							if (c.settings.onsubmit) {
								this
										.validateDelegate(
												":submit",
												"click",
												function(d) {
													if (c.settings.submitHandler) {
														c.submitButton = d.target
													}
													if (a(d.target).hasClass(
															"cancel")) {
														c.cancelSubmit = true
													}
												});
								this
										.submit(function(d) {
											if (c.settings.debug) {
												d.preventDefault()
											}
											function e() {
												var f;
												if (c.settings.submitHandler) {
													if (c.submitButton) {
														f = a(
																"<input type='hidden'/>")
																.attr(
																		"name",
																		c.submitButton.name)
																.val(
																		c.submitButton.value)
																.appendTo(
																		c.currentForm)
													}
													c.settings.submitHandler
															.call(
																	c,
																	c.currentForm,
																	d);
													if (c.submitButton) {
														f.remove()
													}
													return false
												}
												return true
											}
											if (c.cancelSubmit) {
												c.cancelSubmit = false;
												return e()
											}
											if (c.form()) {
												if (c.pendingRequest) {
													c.formSubmitted = true;
													return false
												}
												return e()
											} else {
												c.focusInvalid();
												return false
											}
										})
							}
							return c
						},
						valid : function() {
							if (a(this[0]).is("form")) {
								return this.validate().form()
							} else {
								var c = true;
								var b = a(this[0].form).validate();
								this.each(function() {
									c &= b.element(this)
								});
								return c
							}
						},
						removeAttrs : function(d) {
							var b = {}, c = this;
							a.each(d.split(/\s/), function(e, f) {
								b[f] = c.attr(f);
								c.removeAttr(f)
							});
							return b
						},
						rules : function(e, b) {
							var g = this[0];
							if (e) {
								var d = a.data(g.form, "validator").settings;
								var i = d.rules;
								var j = a.validator.staticRules(g);
								switch (e) {
								case "add":
									a.extend(j, a.validator.normalizeRule(b));
									i[g.name] = j;
									if (b.messages) {
										d.messages[g.name] = a.extend(
												d.messages[g.name], b.messages)
									}
									break;
								case "remove":
									if (!b) {
										delete i[g.name];
										return j
									}
									var h = {};
									a.each(b.split(/\s/), function(k, l) {
										h[l] = j[l];
										delete j[l]
									});
									return h
								}
							}
							var f = a.validator.normalizeRules(a.extend({},
									a.validator.classRules(g), a.validator
											.attributeRules(g), a.validator
											.dataRules(g), a.validator
											.staticRules(g)), g);
							if (f.required) {
								var c = f.required;
								delete f.required;
								f = a.extend({
									required : c
								}, f)
							}
							return f
						}
					});
	a.extend(a.expr[":"], {
		blank : function(b) {
			return !a.trim("" + b.value)
		},
		filled : function(b) {
			return !!a.trim("" + b.value)
		},
		unchecked : function(b) {
			return !b.checked
		}
	});
	a.validator = function(b, c) {
		this.settings = a.extend(true, {}, a.validator.defaults, b);
		this.currentForm = c;
		this.init()
	};
	a.validator.format = function(b, c) {
		if (arguments.length === 1) {
			return function() {
				var d = a.makeArray(arguments);
				d.unshift(b);
				return a.validator.format.apply(this, d)
			}
		}
		if (arguments.length > 2 && c.constructor !== Array) {
			c = a.makeArray(arguments).slice(1)
		}
		if (c.constructor !== Array) {
			c = [ c ]
		}
		a.each(c, function(d, e) {
			b = b.replace(new RegExp("\\{" + d + "\\}", "g"), function() {
				return e
			})
		});
		return b
	};
	a
			.extend(
					a.validator,
					{
						defaults : {
							messages : {},
							groups : {},
							rules : {},
							errorClass : "error",
							validClass : "valid",
							errorElement : "label",
							focusInvalid : true,
							errorContainer : a([]),
							errorLabelContainer : a([]),
							onsubmit : true,
							ignore : ":hidden",
							ignoreTitle : false,
							onfocusin : function(b, c) {
								this.lastActive = b;
								if (this.settings.focusCleanup
										&& !this.blockFocusCleanup) {
									if (this.settings.unhighlight) {
										this.settings.unhighlight.call(this, b,
												this.settings.errorClass,
												this.settings.validClass)
									}
									this.addWrapper(this.errorsFor(b)).hide()
								}
							},
							onfocusout : function(b, c) {
								if (!this.checkable(b)
										&& (b.name in this.submitted || !this
												.optional(b))) {
									this.element(b)
								}
							},
							onkeyup : function(b, c) {
								if (c.which === 9
										&& this.elementValue(b) === "") {
									return
								} else {
									if (b.name in this.submitted
											|| b === this.lastElement) {
										this.element(b)
									}
								}
							},
							onclick : function(b, c) {
								if (b.name in this.submitted) {
									this.element(b)
								} else {
									if (b.parentNode.name in this.submitted) {
										this.element(b.parentNode)
									}
								}
							},
							highlight : function(d, b, c) {
								if (d.type === "radio") {
									this.findByName(d.name).addClass(b)
											.removeClass(c)
								} else {
									a(d).addClass(b).removeClass(c)
								}
							},
							unhighlight : function(d, b, c) {
								if (d.type === "radio") {
									this.findByName(d.name).removeClass(b)
											.addClass(c)
								} else {
									a(d).removeClass(b).addClass(c)
								}
							}
						},
						setDefaults : function(b) {
							a.extend(a.validator.defaults, b)
						},
						messages : {
							required : "This field is required.",
							remote : "Please fix this field.",
							email : "Please enter a valid email address.",
							url : "Please enter a valid URL.",
							date : "Please enter a valid date.",
							dateISO : "Please enter a valid date (ISO).",
							number : "Please enter a valid number.",
							digits : "Please enter only digits.",
							creditcard : "Please enter a valid credit card number.",
							equalTo : "Please enter the same value again.",
							maxlength : a.validator
									.format("Please enter no more than {0} characters."),
							minlength : a.validator
									.format("Please enter at least {0} characters."),
							rangelength : a.validator
									.format("Please enter a value between {0} and {1} characters long."),
							range : a.validator
									.format("Please enter a value between {0} and {1}."),
							max : a.validator
									.format("Please enter a value less than or equal to {0}."),
							min : a.validator
									.format("Please enter a value greater than or equal to {0}.")
						},
						autoCreateRanges : false,
						prototype : {
							init : function() {
								this.labelContainer = a(this.settings.errorLabelContainer);
								this.errorContext = this.labelContainer.length
										&& this.labelContainer
										|| a(this.currentForm);
								this.containers = a(
										this.settings.errorContainer).add(
										this.settings.errorLabelContainer);
								this.submitted = {};
								this.valueCache = {};
								this.pendingRequest = 0;
								this.pending = {};
								this.invalid = {};
								this.reset();
								var b = (this.groups = {});
								a.each(this.settings.groups, function(e, f) {
									if (typeof f === "string") {
										f = f.split(/\s/)
									}
									a.each(f, function(h, g) {
										b[g] = e
									})
								});
								var d = this.settings.rules;
								a.each(d, function(e, f) {
									d[e] = a.validator.normalizeRule(f)
								});
								function c(g) {
									var f = a.data(this[0].form, "validator"), e = "on"
											+ g.type.replace(/^validate/, "");
									if (f.settings[e]) {
										f.settings[e].call(f, this[0], g)
									}
								}
								a(this.currentForm)
										.validateDelegate(
												":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ",
												"focusin focusout keyup", c)
										.validateDelegate(
												"[type='radio'], [type='checkbox'], select, option",
												"click", c);
								if (this.settings.invalidHandler) {
									a(this.currentForm).bind(
											"invalid-form.validate",
											this.settings.invalidHandler)
								}
							},
							form : function() {
								this.checkForm();
								a.extend(this.submitted, this.errorMap);
								this.invalid = a.extend({}, this.errorMap);
								if (!this.valid()) {
									a(this.currentForm).triggerHandler(
											"invalid-form", [ this ])
								}
								this.showErrors();
								return this.valid()
							},
							checkForm : function() {
								this.prepareForm();
								for (var b = 0, c = (this.currentElements = this
										.elements()); c[b]; b++) {
									this.check(c[b])
								}
								return this.valid()
							},
							element : function(c) {
								c = this.validationTargetFor(this.clean(c));
								this.lastElement = c;
								this.prepareElement(c);
								this.currentElements = a(c);
								var b = this.check(c) !== false;
								if (b) {
									delete this.invalid[c.name]
								} else {
									this.invalid[c.name] = true
								}
								if (!this.numberOfInvalids()) {
									this.toHide = this.toHide
											.add(this.containers)
								}
								this.showErrors();
								return b
							},
							showErrors : function(c) {
								if (c) {
									a.extend(this.errorMap, c);
									this.errorList = [];
									for ( var b in c) {
										this.errorList.push({
											message : c[b],
											element : this.findByName(b)[0]
										})
									}
									this.successList = a.grep(this.successList,
											function(d) {
												return !(d.name in c)
											})
								}
								if (this.settings.showErrors) {
									this.settings.showErrors.call(this,
											this.errorMap, this.errorList)
								} else {
									this.defaultShowErrors()
								}
							},
							resetForm : function() {
								if (a.fn.resetForm) {
									a(this.currentForm).resetForm()
								}
								this.submitted = {};
								this.lastElement = null;
								this.prepareForm();
								this.hideErrors();
								this.elements().removeClass(
										this.settings.errorClass).removeData(
										"previousValue")
							},
							numberOfInvalids : function() {
								return this.objectLength(this.invalid)
							},
							objectLength : function(d) {
								var c = 0;
								for ( var b in d) {
									c++
								}
								return c
							},
							hideErrors : function() {
								this.addWrapper(this.toHide).hide()
							},
							valid : function() {
								return this.size() === 0
							},
							size : function() {
								return this.errorList.length
							},
							focusInvalid : function() {
								if (this.settings.focusInvalid) {
									try {
										a(
												this.findLastActive()
														|| this.errorList.length
														&& this.errorList[0].element
														|| []).filter(
												":visible").focus().trigger(
												"focusin")
									} catch (b) {
									}
								}
							},
							findLastActive : function() {
								var b = this.lastActive;
								return b && a.grep(this.errorList, function(c) {
									return c.element.name === b.name
								}).length === 1 && b
							},
							elements : function() {
								var c = this, b = {};
								return a(this.currentForm)
										.find("input, select, textarea")
										.not(
												":submit, :reset, :image, [disabled]")
										.not(this.settings.ignore)
										.filter(
												function() {
													if (!this.name
															&& c.settings.debug
															&& window.console) {
														console
																.error(
																		"%o has no name assigned",
																		this)
													}
													if (this.name in b
															|| !c
																	.objectLength(a(
																			this)
																			.rules())) {
														return false
													}
													b[this.name] = true;
													return true
												})
							},
							clean : function(b) {
								return a(b)[0]
							},
							errors : function() {
								var b = this.settings.errorClass.replace(" ",
										".");
								return a(this.settings.errorElement + "." + b,
										this.errorContext)
							},
							reset : function() {
								this.successList = [];
								this.errorList = [];
								this.errorMap = {};
								this.toShow = a([]);
								this.toHide = a([]);
								this.currentElements = a([])
							},
							prepareForm : function() {
								this.reset();
								this.toHide = this.errors()
										.add(this.containers)
							},
							prepareElement : function(b) {
								this.reset();
								this.toHide = this.errorsFor(b)
							},
							elementValue : function(b) {
								var c = a(b).attr("type"), d = a(b).val();
								if (c === "radio" || c === "checkbox") {
									return a(
											"input[name='" + a(b).attr("name")
													+ "']:checked").val()
								}
								if (typeof d === "string") {
									return d.replace(/\r/g, "")
								}
								return d
							},
							check : function(c) {
								c = this.validationTargetFor(this.clean(c));
								var i = a(c).rules();
								var d = false;
								var h = this.elementValue(c);
								var b;
								for ( var j in i) {
									var g = {
										method : j,
										parameters : i[j]
									};
									try {
										b = a.validator.methods[j].call(this,
												h, c, g.parameters);
										if (b === "dependency-mismatch") {
											d = true;
											continue
										}
										d = false;
										if (b === "pending") {
											this.toHide = this.toHide.not(this
													.errorsFor(c));
											return
										}
										if (!b) {
											this.formatAndAdd(c, g);
											return false
										}
									} catch (f) {
										if (this.settings.debug
												&& window.console) {
											console.log(
													"Exception occured when checking element "
															+ c.id
															+ ", check the '"
															+ g.method
															+ "' method.", f)
										}
										throw f
									}
								}
								if (d) {
									return
								}
								if (this.objectLength(i)) {
									this.successList.push(c)
								}
								return true
							},
							customDataMessage : function(b, c) {
								return a(b).data("msg-" + c.toLowerCase())
										|| (b.attributes && a(b).attr(
												"data-msg-" + c.toLowerCase()))
							},
							customMessage : function(c, d) {
								var b = this.settings.messages[c];
								return b
										&& (b.constructor === String ? b : b[d])
							},
							findDefined : function() {
								for (var b = 0; b < arguments.length; b++) {
									if (arguments[b] !== undefined) {
										return arguments[b]
									}
								}
								return undefined
							},
							defaultMessage : function(b, c) {
								return this.findDefined(this.customMessage(
										b.name, c), this
										.customDataMessage(b, c),
										!this.settings.ignoreTitle && b.title
												|| undefined,
										a.validator.messages[c],
										"<strong>Warning: No message defined for "
												+ b.name + "</strong>")
							},
							formatAndAdd : function(c, e) {
								var d = this.defaultMessage(c, e.method), b = /\$?\{(\d+)\}/g;
								if (typeof d === "function") {
									d = d.call(this, e.parameters, c)
								} else {
									if (b.test(d)) {
										d = a.validator.format(d.replace(b,
												"{$1}"), e.parameters)
									}
								}
								this.errorList.push({
									message : d,
									element : c
								});
								this.errorMap[c.name] = d;
								this.submitted[c.name] = d
							},
							addWrapper : function(b) {
								if (this.settings.wrapper) {
									b = b.add(b.parent(this.settings.wrapper))
								}
								return b
							},
							defaultShowErrors : function() {
								var c, d;
								for (c = 0; this.errorList[c]; c++) {
									var b = this.errorList[c];
									if (this.settings.highlight) {
										this.settings.highlight.call(this,
												b.element,
												this.settings.errorClass,
												this.settings.validClass)
									}
									this.showLabel(b.element, b.message)
								}
								if (this.errorList.length) {
									this.toShow = this.toShow
											.add(this.containers)
								}
								if (this.settings.success) {
									for (c = 0; this.successList[c]; c++) {
										this.showLabel(this.successList[c])
									}
								}
								if (this.settings.unhighlight) {
									for (c = 0, d = this.validElements(); d[c]; c++) {
										this.settings.unhighlight.call(this,
												d[c], this.settings.errorClass,
												this.settings.validClass)
									}
								}
								this.toHide = this.toHide.not(this.toShow);
								this.hideErrors();
								this.addWrapper(this.toShow).show()
							},
							validElements : function() {
								return this.currentElements.not(this
										.invalidElements())
							},
							invalidElements : function() {
								return a(this.errorList).map(function() {
									return this.element
								})
							},
							showLabel : function(c, d) {
								var b = this.errorsFor(c);
								if (b.length) {
									b.removeClass(this.settings.validClass)
											.addClass(this.settings.errorClass);
									b.html(d)
								} else {
									b = a(
											"<" + this.settings.errorElement
													+ ">").attr("for",
											this.idOrName(c)).addClass(
											this.settings.errorClass).html(
											d || "");
									if (this.settings.wrapper) {
										b = b.hide().show().wrap(
												"<" + this.settings.wrapper
														+ "/>").parent()
									}
									if (!this.labelContainer.append(b).length) {
										if (this.settings.errorPlacement) {
											this.settings.errorPlacement(b,
													a(c))
										} else {
											b.insertAfter(c)
										}
									}
								}
								if (!d && this.settings.success) {
									b.text("");
									if (typeof this.settings.success === "string") {
										b.addClass(this.settings.success)
									} else {
										this.settings.success(b, c)
									}
								}
								this.toShow = this.toShow.add(b)
							},
							errorsFor : function(c) {
								var b = this.idOrName(c);
								return this.errors().filter(function() {
									return a(this).attr("for") === b
								})
							},
							idOrName : function(b) {
								return this.groups[b.name]
										|| (this.checkable(b) ? b.name : b.id
												|| b.name)
							},
							validationTargetFor : function(b) {
								if (this.checkable(b)) {
									b = this.findByName(b.name).not(
											this.settings.ignore)[0]
								}
								return b
							},
							checkable : function(b) {
								return (/radio|checkbox/i).test(b.type)
							},
							findByName : function(b) {
								return a(this.currentForm).find(
										"[name='" + b + "']")
							},
							getLength : function(c, b) {
								switch (b.nodeName.toLowerCase()) {
								case "select":
									return a("option:selected", b).length;
								case "input":
									if (this.checkable(b)) {
										return this.findByName(b.name).filter(
												":checked").length
									}
								}
								return c.length
							},
							depend : function(c, b) {
								return this.dependTypes[typeof c] ? this.dependTypes[typeof c]
										(c, b)
										: true
							},
							dependTypes : {
								"boolean" : function(c, b) {
									return c
								},
								string : function(c, b) {
									return !!a(c, b.form).length
								},
								"function" : function(c, b) {
									return c(b)
								}
							},
							optional : function(b) {
								var c = this.elementValue(b);
								return !a.validator.methods.required.call(this,
										c, b)
										&& "dependency-mismatch"
							},
							startRequest : function(b) {
								if (!this.pending[b.name]) {
									this.pendingRequest++;
									this.pending[b.name] = true
								}
							},
							stopRequest : function(b, c) {
								this.pendingRequest--;
								if (this.pendingRequest < 0) {
									this.pendingRequest = 0
								}
								delete this.pending[b.name];
								if (c && this.pendingRequest === 0
										&& this.formSubmitted && this.form()) {
									a(this.currentForm).submit();
									this.formSubmitted = false
								} else {
									if (!c && this.pendingRequest === 0
											&& this.formSubmitted) {
										a(this.currentForm).triggerHandler(
												"invalid-form", [ this ]);
										this.formSubmitted = false
									}
								}
							},
							previousValue : function(b) {
								return a.data(b, "previousValue")
										|| a.data(b, "previousValue", {
											old : null,
											valid : true,
											message : this.defaultMessage(b,
													"remote")
										})
							}
						},
						classRuleSettings : {
							required : {
								required : true
							},
							email : {
								email : true
							},
							url : {
								url : true
							},
							date : {
								date : true
							},
							dateISO : {
								dateISO : true
							},
							number : {
								number : true
							},
							digits : {
								digits : true
							},
							creditcard : {
								creditcard : true
							}
						},
						addClassRules : function(b, c) {
							if (b.constructor === String) {
								this.classRuleSettings[b] = c
							} else {
								a.extend(this.classRuleSettings, b)
							}
						},
						classRules : function(c) {
							var d = {};
							var b = a(c).attr("class");
							if (b) {
								a
										.each(
												b.split(" "),
												function() {
													if (this in a.validator.classRuleSettings) {
														a
																.extend(
																		d,
																		a.validator.classRuleSettings[this])
													}
												})
							}
							return d
						},
						attributeRules : function(c) {
							var e = {};
							var b = a(c);
							for ( var f in a.validator.methods) {
								var d;
								if (f === "required") {
									d = b.get(0).getAttribute(f);
									if (d === "") {
										d = true
									}
									d = !!d
								} else {
									d = b.attr(f)
								}
								if (d) {
									e[f] = d
								} else {
									if (b[0].getAttribute("type") === f) {
										e[f] = true
									}
								}
							}
							if (e.maxlength
									&& /-1|2147483647|524288/.test(e.maxlength)) {
								delete e.maxlength
							}
							return e
						},
						dataRules : function(c) {
							var f, d, e = {}, b = a(c);
							for (f in a.validator.methods) {
								d = b.data("rule-" + f.toLowerCase());
								if (d !== undefined) {
									e[f] = d
								}
							}
							return e
						},
						staticRules : function(c) {
							var d = {};
							var b = a.data(c.form, "validator");
							if (b.settings.rules) {
								d = a.validator
										.normalizeRule(b.settings.rules[c.name])
										|| {}
							}
							return d
						},
						normalizeRules : function(c, b) {
							a.each(c, function(f, e) {
								if (e === false) {
									delete c[f];
									return
								}
								if (e.param || e.depends) {
									var d = true;
									switch (typeof e.depends) {
									case "string":
										d = !!a(e.depends, b.form).length;
										break;
									case "function":
										d = e.depends.call(b, b);
										break
									}
									if (d) {
										c[f] = e.param !== undefined ? e.param
												: true
									} else {
										delete c[f]
									}
								}
							});
							a.each(c, function(d, e) {
								c[d] = a.isFunction(e) ? e(b) : e
							});
							a.each([ "minlength", "maxlength" ], function() {
								if (c[this]) {
									c[this] = Number(c[this])
								}
							});
							a.each([ "rangelength" ], function() {
								var d;
								if (c[this]) {
									if (a.isArray(c[this])) {
										c[this] = [ Number(c[this][0]),
												Number(c[this][1]) ]
									} else {
										if (typeof c[this] === "string") {
											d = c[this].split(/[\s,]+/);
											c[this] = [ Number(d[0]),
													Number(d[1]) ]
										}
									}
								}
							});
							if (a.validator.autoCreateRanges) {
								if (c.min && c.max) {
									c.range = [ c.min, c.max ];
									delete c.min;
									delete c.max
								}
								if (c.minlength && c.maxlength) {
									c.rangelength = [ c.minlength, c.maxlength ];
									delete c.minlength;
									delete c.maxlength
								}
							}
							return c
						},
						normalizeRule : function(c) {
							if (typeof c === "string") {
								var b = {};
								a.each(c.split(/\s/), function() {
									b[this] = true
								});
								c = b
							}
							return c
						},
						addMethod : function(b, d, c) {
							a.validator.methods[b] = d;
							a.validator.messages[b] = c !== undefined ? c
									: a.validator.messages[b];
							if (d.length < 3) {
								a.validator.addClassRules(b, a.validator
										.normalizeRule(b))
							}
						},
						methods : {
							required : function(c, b, e) {
								if (!this.depend(e, b)) {
									return "dependency-mismatch"
								}
								if (b.nodeName.toLowerCase() === "select") {
									var d = a(b).val();
									return d && d.length > 0
								}
								if (this.checkable(b)) {
									return this.getLength(c, b) > 0
								}
								return a.trim(c).length > 0
							},
							remote : function(f, c, g) {
								if (this.optional(c)) {
									return "dependency-mismatch"
								}
								var d = this.previousValue(c);
								if (!this.settings.messages[c.name]) {
									this.settings.messages[c.name] = {}
								}
								d.originalMessage = this.settings.messages[c.name].remote;
								this.settings.messages[c.name].remote = d.message;
								g = typeof g === "string" && {
									url : g
								} || g;
								if (d.old === f) {
									return d.valid
								}
								d.old = f;
								var b = this;
								this.startRequest(c);
								var e = {};
								e[c.name] = f;
								a
										.ajax(a
												.extend(
														true,
														{
															url : g,
															mode : "abort",
															port : "validate"
																	+ c.name,
															dataType : "json",
															data : e,
															success : function(
																	i) {
																b.settings.messages[c.name].remote = d.originalMessage;
																var k = i === true
																		|| i === "true";
																if (k) {
																	var h = b.formSubmitted;
																	b
																			.prepareElement(c);
																	b.formSubmitted = h;
																	b.successList
																			.push(c);
																	delete b.invalid[c.name];
																	b
																			.showErrors()
																} else {
																	var l = {};
																	var j = i
																			|| b
																					.defaultMessage(
																							c,
																							"remote");
																	l[c.name] = d.message = a
																			.isFunction(j) ? j(f)
																			: j;
																	b.invalid[c.name] = true;
																	b
																			.showErrors(l)
																}
																d.valid = k;
																b.stopRequest(
																		c, k)
															}
														}, g));
								return "pending"
							},
							minlength : function(d, b, e) {
								var c = a.isArray(d) ? d.length : this
										.getLength(a.trim(d), b);
								return this.optional(b) || c >= e
							},
							maxlength : function(d, b, e) {
								var c = a.isArray(d) ? d.length : this
										.getLength(a.trim(d), b);
								return this.optional(b) || c <= e
							},
							rangelength : function(d, b, e) {
								var c = a.isArray(d) ? d.length : this
										.getLength(a.trim(d), b);
								return this.optional(b)
										|| (c >= e[0] && c <= e[1])
							},
							min : function(c, b, d) {
								return this.optional(b) || c >= d
							},
							max : function(c, b, d) {
								return this.optional(b) || c <= d
							},
							range : function(c, b, d) {
								return this.optional(b)
										|| (c >= d[0] && c <= d[1])
							},
							email : function(c, b) {
								return this.optional(b)
										|| /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
												.test(c)
							},
							url : function(c, b) {
								return this.optional(b)
										|| /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
												.test(c)
							},
							date : function(c, b) {
								return this.optional(b)
										|| !/Invalid|NaN/.test(new Date(c)
												.toString())
							},
							dateISO : function(c, b) {
								return this.optional(b)
										|| /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/
												.test(c)
							},
							number : function(c, b) {
								return this.optional(b)
										|| /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
												.test(c)
							},
							digits : function(c, b) {
								return this.optional(b) || /^\d+$/.test(c)
							},
							creditcard : function(f, c) {
								if (this.optional(c)) {
									return "dependency-mismatch"
								}
								if (/[^0-9 \-]+/.test(f)) {
									return false
								}
								var g = 0, e = 0, b = false;
								f = f.replace(/\D/g, "");
								for (var h = f.length - 1; h >= 0; h--) {
									var d = f.charAt(h);
									e = parseInt(d, 10);
									if (b) {
										if ((e *= 2) > 9) {
											e -= 9
										}
									}
									g += e;
									b = !b
								}
								return (g % 10) === 0
							},
							equalTo : function(c, b, e) {
								var d = a(e);
								if (this.settings.onfocusout) {
									d.unbind(".validate-equalTo").bind(
											"blur.validate-equalTo",
											function() {
												a(b).valid()
											})
								}
								return c === d.val()
							}
						}
					});
	a.format = a.validator.format
}(jQuery));
(function(c) {
	var a = {};
	if (c.ajaxPrefilter) {
		c.ajaxPrefilter(function(f, e, g) {
			var d = f.port;
			if (f.mode === "abort") {
				if (a[d]) {
					a[d].abort()
				}
				a[d] = g
			}
		})
	} else {
		var b = c.ajax;
		c.ajax = function(e) {
			var f = ("mode" in e ? e : c.ajaxSettings).mode, d = ("port" in e ? e
					: c.ajaxSettings).port;
			if (f === "abort") {
				if (a[d]) {
					a[d].abort()
				}
				return (a[d] = b.apply(this, arguments))
			}
			return b.apply(this, arguments)
		}
	}
}(jQuery));
(function(a) {
	a.extend(a.fn, {
		validateDelegate : function(d, c, b) {
			return this.bind(c, function(e) {
				var f = a(e.target);
				if (f.is(d)) {
					return b.apply(f, arguments)
				}
			})
		}
	})
}(jQuery));
(function(a) {
	a.extend(a.validator.messages, {
		required : "必填信息",
		remote : "请修正该信息",
		email : "请输入正确格式的电子邮件",
		url : "请输入合法的网址",
		date : "请输入合法的日期",
		dateISO : "请输入合法的日期 (ISO).",
		number : "请输入合法的数字",
		digits : "只能输入整数",
		creditcard : "请输入合法的信用卡号",
		equalTo : "请再次输入相同的值",
		accept : "请输入拥有合法后缀名的字符串",
		maxlength : a.validator.format("请输入一个长度最多是 {0} 的字符串"),
		minlength : a.validator.format("请输入一个长度最少是 {0} 的字符串"),
		rangelength : a.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
		range : a.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
		max : a.validator.format("请输入一个最大为 {0} 的值"),
		min : a.validator.format("请输入一个最小为 {0} 的值")
	})
}(jQuery));
jQuery.validator.addMethod("ip", function(b, a) {
	return this.optional(a)
			|| (/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(b) && (RegExp.$1 < 256
					&& RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256))
}, "请输入合法的IP地址");
jQuery.validator.addMethod("abc", function(b, a) {
	return this.optional(a) || /^[a-zA-Z0-9_]*$/.test(b)
}, "请输入字母数字或下划线");
jQuery.validator.addMethod("username", function(b, a) {
	return this.optional(a) || /^[a-zA-Z0-9][a-zA-Z0-9_]{2,19}$/.test(b)
}, "3-20位字母或数字开头，允许字母数字下划线");
jQuery.validator.addMethod("noEqualTo", function(b, a, c) {
	return b != $(c).val()
}, "请再次输入不同的值");
jQuery.validator.addMethod("realName", function(b, a) {
	return this.optional(a) || /^[\u4e00-\u9fa5]{2,30}$/.test(b)
}, "姓名只能为2-30个汉字");
jQuery.validator.addMethod("userName", function(b, a) {
	return this.optional(a) || /^[\u0391-\uFFE5\w]+$/.test(b)
}, "登录名只能包括中文字、英文字母、数字和下划线");
jQuery.validator.addMethod("mobile", function(c, a) {
	var b = c.length;
	return this.optional(a)
			|| (b == 11 && /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/.test(c))
}, "请正确填写您的手机号码");
jQuery.validator.addMethod("simplePhone", function(c, b) {
	var a = /^(\d{3,4}-?)?\d{7,9}$/g;
	return this.optional(b) || (a.test(c))
}, "请正确填写您的电话号码");
jQuery.validator.addMethod("phone", function(c, b) {
	var a = /(^0[1-9]{1}\d{9,10}$)|(^1[3,5,8]\d{9}$)/g;
	return this.optional(b) || (a.test(c))
}, "格式为:固话为区号(3-4位)号码(7-9位),手机为:13,15,18号段");
jQuery.validator.addMethod("zipCode", function(c, b) {
	var a = /^[0-9]{6}$/;
	return this.optional(b) || (a.test(c))
}, "请正确填写您的邮政编码");
jQuery.validator.addMethod("qq", function(c, b) {
	var a = /^[1-9][0-9]{4,}$/;
	return this.optional(b) || (a.test(c))
}, "请正确填写您的QQ号码");
jQuery.validator.addMethod("card", function(b, a) {
	return this.optional(a) || checkIdcard(b)
}, "请输入正确的身份证号码(15-18位)");
function checkIdcard(d) {
	d = d.toString();
	var f = new Array(true, false, false, false, false);
	var e = {
		11 : "北京",
		12 : "天津",
		13 : "河北",
		14 : "山西",
		15 : "内蒙古",
		21 : "辽宁",
		22 : "吉林",
		23 : "黑龙江",
		31 : "上海",
		32 : "江苏",
		33 : "浙江",
		34 : "安徽",
		35 : "福建",
		36 : "江西",
		37 : "山东",
		41 : "河南",
		42 : "湖北",
		43 : "湖南",
		44 : "广东",
		45 : "广西",
		46 : "海南",
		50 : "重庆",
		51 : "四川",
		52 : "贵州",
		53 : "云南",
		54 : "西藏",
		61 : "陕西",
		62 : "甘肃",
		63 : "青海",
		64 : "宁夏",
		65 : "新疆",
		71 : "台湾",
		81 : "香港",
		82 : "澳门",
		91 : "国外"
	};
	var d, g, b;
	var c, h;
	var a = new Array();
	a = d.split("");
	if (e[parseInt(d.substr(0, 2))] == null) {
		return f[4]
	}
	switch (d.length) {
	case 15:
		if ((parseInt(d.substr(6, 2)) + 1900) % 4 == 0
				|| ((parseInt(d.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(d
						.substr(6, 2)) + 1900) % 4 == 0)) {
			ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/
		} else {
			ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/
		}
		if (ereg.test(d)) {
			return f[0]
		} else {
			return f[2]
		}
		break;
	case 18:
		if (parseInt(d.substr(6, 4)) % 4 == 0
				|| (parseInt(d.substr(6, 4)) % 100 == 0 && parseInt(d.substr(6,
						4)) % 4 == 0)) {
			ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/
		} else {
			ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/
		}
		if (ereg.test(d)) {
			c = (parseInt(a[0]) + parseInt(a[10])) * 7
					+ (parseInt(a[1]) + parseInt(a[11])) * 9
					+ (parseInt(a[2]) + parseInt(a[12])) * 10
					+ (parseInt(a[3]) + parseInt(a[13])) * 5
					+ (parseInt(a[4]) + parseInt(a[14])) * 8
					+ (parseInt(a[5]) + parseInt(a[15])) * 4
					+ (parseInt(a[6]) + parseInt(a[16])) * 2 + parseInt(a[7])
					* 1 + parseInt(a[8]) * 6 + parseInt(a[9]) * 3;
			g = c % 11;
			h = "F";
			b = "10X98765432";
			h = b.substr(g, 1);
			if (h == a[17]) {
				return f[0]
			} else {
				return f[3]
			}
		} else {
			return f[2]
		}
		break;
	default:
		return f[1];
		break
	}
};/*
	 * !/ jQuery Alert Dialogs Plugin // // Version 1.0 // // Cory S.N. LaViska //
	 * A Beautiful Site (http://abeautifulsite.net/) // 29 December 2008 // //
	 * Visit http://abeautifulsite.net/notebook/87 for more information // //
	 * Usage: // jAlert( message, [title, callback] ) // jConfirm( message,
	 * [title, callback] ) // jPrompt( message, [value, title, callback] ) // //
	 * History: // // 1.00 - Released (29 December 2008) // // License: // //
	 * This plugin is licensed under the GNU General Public License:
	 * http://www.gnu.org/licenses/gpl.html /
	 */
(function($) {

	$.alerts = {

		// These properties can be read/written by accessing
		// $.alerts.propertyName from your scripts at any time

		verticalOffset : -75, // vertical offset of the dialog from center
								// screen, in pixels
		horizontalOffset : 0, // horizontal offset of the dialog from center
								// screen, in pixels/
		repositionOnResize : true, // re-centers the dialog on window resize
		overlayOpacity : 0.6, // transparency level of overlay
		overlayColor : '#000', // base color of overlay
		draggable : false, // make the dialogs draggable (requires UI
							// Draggables plugin)
		okButton : '&nbsp;确定&nbsp;', // text for the OK button
		cancelButton : '&nbsp;取消&nbsp;', // text for the Cancel button
		dialogClass : null, // if specified, this class will be applied to all
							// dialogs

		// Public methods

		alert : function(message, title, callback) {
			if (title == null)
				title = '确认信息';
			$.alerts._show(title, message, null, 'alert', function(result) {
				if (callback)
					callback(result);
			});
		},

		confirm : function(message, title, callback) {
			if (title == null)
				title = '确认信息';
			$.alerts._show(title, message, null, 'confirm', function(result) {
				if (callback)
					callback(result);
			});
		},

		prompt : function(message, value, title, callback) {
			if (title == null)
				title = 'Prompt';
			$.alerts._show(title, message, value, 'prompt', function(result) {
				if (callback)
					callback(result);
			});
		},

		// Private methods

		_show : function(title, msg, value, type, callback) {

			$.alerts._hide();
			$.alerts._overlay('show');

			$("BODY").append(
					'<div id="popup_container">' + '<h1 id="popup_title"></h1>'
							+ '<div id="popup_content">'
							+ '<div id="popup_message"></div>' + '</div>'
							+ '</div>');

			if ($.alerts.dialogClass)
				$("#popup_container").addClass($.alerts.dialogClass);

			// IE6 Fix
			var pos = 'absolute';

			$("#popup_container").css({
				position : pos,
				zIndex : 99999,
				padding : 0,
				margin : 0
			});

			$("#popup_title").text(title);
			$("#popup_content").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html(
					$("#popup_message").text().replace(/\n/g, '<br />'));

			$("#popup_container").css({
				minWidth : $("#popup_container").outerWidth(),
				maxWidth : $("#popup_container").outerWidth()
			});

			$.alerts._reposition();
			$.alerts._maintainPosition(true);

			switch (type) {
			case 'alert':
				$("#popup_message")
						.after(
								'<a class="popup_panel popup_ok"><span class="alert-ui-btn" type="button" id="popup_ok"><span class="ui-txt">'
										+ $.alerts.okButton
										+ '</span></span></a>');
				$("#popup_ok").click(function() {
					$.alerts._hide();
					callback(true);
				});
				$("#popup_ok").focus().keypress(function(e) {
					if (e.keyCode == 13 || e.keyCode == 27)
						$("#popup_ok").trigger('click');
				});
				break;
			case 'confirm':
				$("#popup_message")
						.after(
								'<a class="popup_panel popup_ok"><span class="alert-ui-btn" type="button" id="popup_ok"><span class="ui-txt">'
										+ $.alerts.okButton
										+ '</span></span></a> <a class="popup_panel popup_cancel"><span class="alert-ui-btn" type="button" id="popup_cancel"><span class="ui-txt">'
										+ $.alerts.cancelButton
										+ '</span></span></a>');
				$("#popup_ok").click(function() {
					$.alerts._hide();
					if (callback)
						callback(true);
				});
				$("#popup_cancel").click(function() {
					$.alerts._hide();
					if (callback)
						callback(false);
				});
				$("#popup_ok").focus();
				$("#popup_ok, #popup_cancel").keypress(function(e) {
					if (e.keyCode == 13)
						$("#popup_ok").trigger('click');
					if (e.keyCode == 27)
						$("#popup_cancel").trigger('click');
				});
				break;
			case 'prompt':
				$("#popup_message")
						.append(
								'<br /><input type="text" size="30" id="popup_prompt" />')
						.after(
								'<a class="popup_panel popup_ok"><span class="alert-ui-btn" type="button" id="popup_ok"><span class="ui-txt">'
										+ $.alerts.okButton
										+ '</span></span></a> <a class="popup_panel popup_cancel"><span class="alert-ui-btn" type="button" id="popup_cancel"><span class="ui-txt">'
										+ $.alerts.cancelButton
										+ '</span></span></a>');
				$("#popup_prompt").width($("#popup_message").width());
				$("#popup_ok").click(function() {
					var val = $("#popup_prompt").val();
					$.alerts._hide();
					if (callback)
						callback(val);
				});
				$("#popup_cancel").click(function() {
					$.alerts._hide();
					if (callback)
						callback(null);
				});
				$("#popup_prompt, #popup_ok, #popup_cancel").keypress(
						function(e) {
							if (e.keyCode == 13)
								$("#popup_ok").trigger('click');
							if (e.keyCode == 27)
								$("#popup_cancel").trigger('click');
						});
				if (value)
					$("#popup_prompt").val(value);
				$("#popup_prompt").focus().select();
				break;
			}

			// Make draggable
			if ($.alerts.draggable) {
				try {
					$("#popup_container").draggable({
						handle : $("#popup_title")
					});
					$("#popup_title").css({
						cursor : 'move'
					});
				} catch (e) { /* requires jQuery UI draggables */
				}
			}
		},

		_hide : function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},

		_overlay : function(status) {
			switch (status) {
			case 'show':
				$.alerts._overlay('hide');
				$("BODY").append('<div id="popup_overlay"></div>');
				$("#popup_overlay").css({
					position : 'absolute',
					zIndex : 99998,
					top : '0px',
					left : '0px',
					width : '100%',
					height : $(document).height(),
					background : $.alerts.overlayColor,
					opacity : $.alerts.overlayOpacity
				});
				break;
			case 'hide':
				$("#popup_overlay").remove();
				break;
			}
		},

		_reposition : function() {
			var top = (($(window).height() / 2) - ($("#popup_container")
					.outerHeight() / 2))
					+ $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container")
					.outerWidth() / 2))
					+ $.alerts.horizontalOffset;
			if (top >= 150)
				top = 50;
			if (top < 0)
				top = 0;
			if (left < 0)
				left = 0;

			// IE6 fix
			top = top + $(window).scrollTop();

			$("#popup_container").css({
				top : top + 'px',
				left : left + 'px'
			});
			$("#popup_overlay").height($(document).height());
		},

		_maintainPosition : function(status) {
			if ($.alerts.repositionOnResize) {
				switch (status) {
				case true:
					$(window).bind('resize', function() {
						$.alerts._reposition();
					});
					break;
				case false:
					$(window).unbind('resize');
					break;
				}
			}
		}

	}

	// Shortuct functions
	jAlert = function(message, title, callback) {
		$.alerts.alert(message, title, callback);
	}

	jConfirm = function(message, title, callback) {
		$.alerts.confirm(message, title, callback);
	};

	jPrompt = function(message, value, title, callback) {
		$.alerts.prompt(message, value, title, callback);
	};

})(jQuery);
/*
 * ! mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
(function(a, b) {
	if (typeof exports === "object" && exports) {
		b(exports)
	} else {
		var c = {};
		b(c);
		if (typeof define === "function" && define.amd) {
			define(c)
		} else {
			a.Mustache = c
		}
	}
}(this, function(a) {
	var f = /\s*/;
	var m = /\s+/;
	var k = /\S/;
	var i = /\s*=/;
	var o = /\s*\}/;
	var u = /#|\^|\/|>|\{|&|=|!/;
	var g = RegExp.prototype.test;
	function t(A, z) {
		return g.call(A, z)
	}
	function h(z) {
		return !t(k, z)
	}
	var w = Object.prototype.toString;
	var l = Array.isArray || function(z) {
		return w.call(z) === "[object Array]"
	};
	function b(z) {
		return typeof z === "function"
	}
	function e(z) {
		return z.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
	}
	var d = {
		"&" : "&amp;",
		"<" : "&lt;",
		">" : "&gt;",
		'"' : "&quot;",
		"'" : "&#39;",
		"/" : "&#x2F;"
	};
	function n(z) {
		return String(z).replace(/[&<>"'\/]/g, function(A) {
			return d[A]
		})
	}
	function v(z) {
		this.string = z;
		this.tail = z;
		this.pos = 0
	}
	v.prototype.eos = function() {
		return this.tail === ""
	};
	v.prototype.scan = function(B) {
		var A = this.tail.match(B);
		if (A && A.index === 0) {
			var z = A[0];
			this.tail = this.tail.substring(z.length);
			this.pos += z.length;
			return z
		}
		return ""
	};
	v.prototype.scanUntil = function(B) {
		var A = this.tail.search(B), z;
		switch (A) {
		case -1:
			z = this.tail;
			this.tail = "";
			break;
		case 0:
			z = "";
			break;
		default:
			z = this.tail.substring(0, A);
			this.tail = this.tail.substring(A)
		}
		this.pos += z.length;
		return z
	};
	function s(z, A) {
		this.view = z == null ? {} : z;
		this.parent = A;
		this._cache = {
			"." : this.view
		}
	}
	s.make = function(z) {
		return (z instanceof s) ? z : new s(z)
	};
	s.prototype.push = function(z) {
		return new s(z, this)
	};
	s.prototype.lookup = function(z) {
		var C;
		if (z in this._cache) {
			C = this._cache[z]
		} else {
			var B = this;
			while (B) {
				if (z.indexOf(".") > 0) {
					C = B.view;
					var D = z.split("."), A = 0;
					while (C != null && A < D.length) {
						C = C[D[A++]]
					}
				} else {
					C = B.view[z]
				}
				if (C != null) {
					break
				}
				B = B.parent
			}
			this._cache[z] = C
		}
		if (b(C)) {
			C = C.call(this.view)
		}
		return C
	};
	function q() {
		this.clearCache()
	}
	q.prototype.clearCache = function() {
		this._cache = {};
		this._partialCache = {}
	};
	q.prototype.compile = function(B, z) {
		var A = this._cache[B];
		if (!A) {
			var C = a.parse(B, z);
			A = this._cache[B] = this.compileTokens(C, B)
		}
		return A
	};
	q.prototype.compilePartial = function(A, C, z) {
		var B = this.compile(C, z);
		this._partialCache[A] = B;
		return B
	};
	q.prototype.getPartial = function(z) {
		if (!(z in this._partialCache) && this._loadPartial) {
			this.compilePartial(z, this._loadPartial(z))
		}
		return this._partialCache[z]
	};
	q.prototype.compileTokens = function(B, A) {
		var z = this;
		return function(C, E) {
			if (E) {
				if (b(E)) {
					z._loadPartial = E
				} else {
					for ( var D in E) {
						z.compilePartial(D, E[D])
					}
				}
			}
			return p(B, z, s.make(C), A)
		}
	};
	q.prototype.render = function(B, z, A) {
		return this.compile(B)(z, A)
	};
	function p(H, B, z, K) {
		var E = "";
		function A(N) {
			return B.render(N, z)
		}
		var C, I, J;
		for (var F = 0, G = H.length; F < G; ++F) {
			C = H[F];
			I = C[1];
			switch (C[0]) {
			case "#":
				J = z.lookup(I);
				if (typeof J === "object" || typeof J === "string") {
					if (l(J)) {
						for (var D = 0, M = J.length; D < M; ++D) {
							E += p(C[4], B, z.push(J[D]), K)
						}
					} else {
						if (J) {
							E += p(C[4], B, z.push(J), K)
						}
					}
				} else {
					if (b(J)) {
						var L = K == null ? null : K.slice(C[3], C[5]);
						J = J.call(z.view, L, A);
						if (J != null) {
							E += J
						}
					} else {
						if (J) {
							E += p(C[4], B, z, K)
						}
					}
				}
				break;
			case "^":
				J = z.lookup(I);
				if (!J || (l(J) && J.length === 0)) {
					E += p(C[4], B, z, K)
				}
				break;
			case ">":
				J = B.getPartial(I);
				if (b(J)) {
					E += J(z)
				}
				break;
			case "&":
				J = z.lookup(I);
				if (J != null) {
					E += J
				}
				break;
			case "name":
				J = z.lookup(I);
				if (J != null) {
					E += a.escape(J)
				}
				break;
			case "text":
				E += I;
				break
			}
		}
		return E
	}
	function y(F) {
		var A = [];
		var E = A;
		var G = [];
		var C;
		for (var B = 0, z = F.length; B < z; ++B) {
			C = F[B];
			switch (C[0]) {
			case "#":
			case "^":
				G.push(C);
				E.push(C);
				E = C[4] = [];
				break;
			case "/":
				var D = G.pop();
				D[5] = C[2];
				E = G.length > 0 ? G[G.length - 1][4] : A;
				break;
			default:
				E.push(C)
			}
		}
		return A
	}
	function c(E) {
		var B = [];
		var D, A;
		for (var C = 0, z = E.length; C < z; ++C) {
			D = E[C];
			if (D) {
				if (D[0] === "text" && A && A[0] === "text") {
					A[1] += D[1];
					A[3] = D[3]
				} else {
					A = D;
					B.push(D)
				}
			}
		}
		return B
	}
	function r(z) {
		return [ new RegExp(e(z[0]) + "\\s*"), new RegExp("\\s*" + e(z[1])) ]
	}
	function x(P, F) {
		P = P || "";
		F = F || a.tags;
		if (typeof F === "string") {
			F = F.split(m)
		}
		if (F.length !== 2) {
			throw new Error("Invalid tags: " + F.join(", "))
		}
		var J = r(F);
		var B = new v(P);
		var H = [];
		var G = [];
		var E = [];
		var Q = false;
		var O = false;
		function N() {
			if (Q && !O) {
				while (E.length) {
					delete G[E.pop()]
				}
			} else {
				E = []
			}
			Q = false;
			O = false
		}
		var C, A, I, K, D, z;
		while (!B.eos()) {
			C = B.pos;
			I = B.scanUntil(J[0]);
			if (I) {
				for (var L = 0, M = I.length; L < M; ++L) {
					K = I.charAt(L);
					if (h(K)) {
						E.push(G.length)
					} else {
						O = true
					}
					G.push([ "text", K, C, C + 1 ]);
					C += 1;
					if (K == "\n") {
						N()
					}
				}
			}
			if (!B.scan(J[0])) {
				break
			}
			Q = true;
			A = B.scan(u) || "name";
			B.scan(f);
			if (A === "=") {
				I = B.scanUntil(i);
				B.scan(i);
				B.scanUntil(J[1])
			} else {
				if (A === "{") {
					I = B.scanUntil(new RegExp("\\s*" + e("}" + F[1])));
					B.scan(o);
					B.scanUntil(J[1]);
					A = "&"
				} else {
					I = B.scanUntil(J[1])
				}
			}
			if (!B.scan(J[1])) {
				throw new Error("Unclosed tag at " + B.pos)
			}
			D = [ A, I, C, B.pos ];
			G.push(D);
			if (A === "#" || A === "^") {
				H.push(D)
			} else {
				if (A === "/") {
					z = H.pop();
					if (!z) {
						throw new Error('Unopened section "' + I + '" at ' + C)
					}
					if (z[1] !== I) {
						throw new Error('Unclosed section "' + z[1] + '" at '
								+ C)
					}
				} else {
					if (A === "name" || A === "{" || A === "&") {
						O = true
					} else {
						if (A === "=") {
							F = I.split(m);
							if (F.length !== 2) {
								throw new Error("Invalid tags at " + C + ": "
										+ F.join(", "))
							}
							J = r(F)
						}
					}
				}
			}
		}
		z = H.pop();
		if (z) {
			throw new Error('Unclosed section "' + z[1] + '" at ' + B.pos)
		}
		return y(c(G))
	}
	a.name = "mustache.js";
	a.version = "0.7.3";
	a.tags = [ "{{", "}}" ];
	a.Scanner = v;
	a.Context = s;
	a.Writer = q;
	a.parse = x;
	a.escape = n;
	var j = new q();
	a.clearCache = function() {
		return j.clearCache()
	};
	a.compile = function(A, z) {
		return j.compile(A, z)
	};
	a.compilePartial = function(A, B, z) {
		return j.compilePartial(A, B, z)
	};
	a.compileTokens = function(A, z) {
		return j.compileTokens(A, z)
	};
	a.render = function(B, z, A) {
		return j.render(B, z, A)
	};
	a.to_html = function(C, A, B, D) {
		var z = a.render(C, A, B);
		if (b(D)) {
			D(z)
		} else {
			return z
		}
	}
}));

/*
 * ! jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage CC 3.0 Attribution. May be relicensed without
 * permission/notification. https://github.com/jtsage/jquery-mobile-datebox
 */
(function(a) {
	a
			.widget(
					"mobile.datebox",
					a.mobile.widget,
					{
						options : {
							version : "2-1.4.0-2013070300",
							mobVer : parseInt(a.mobile.version.replace(/\./g,
									"")),
							theme : false,
							themeDefault : "a",
							themeHeader : "a",
							mode : false,
							centerHoriz : false,
							centerVert : false,
							transition : "pop",
							useAnimation : true,
							hideInput : false,
							hideFixedToolbars : false,
							lockInput : true,
							enhanceInput : true,
							zindex : "500",
							clickEvent : "vclick",
							clickEventAlt : "click",
							resizeListener : true,
							defaultValue : false,
							showInitialValue : false,
							dialogEnable : false,
							dialogForce : false,
							enablePopup : false,
							popupPosition : false,
							popupForceX : false,
							popupForceY : false,
							useModal : false,
							useInline : false,
							useInlineBlind : false,
							useHeader : true,
							useImmediate : false,
							useNewStyle : false,
							useAltIcon : false,
							overrideStyleClass : false,
							useButton : true,
							useFocus : false,
							useClearButton : false,
							useCollapsedBut : false,
							usePlaceholder : false,
							openCallback : false,
							openCallbackArgs : [],
							closeCallback : false,
							closeCallbackArgs : [],
							startOffsetYears : false,
							startOffsetMonths : false,
							startOffsetDays : false,
							afterToday : false,
							beforeToday : false,
							notToday : false,
							maxDays : false,
							minDays : false,
							maxYear : false,
							minYear : false,
							blackDates : false,
							blackDatesRec : false,
							blackDays : false,
							minHour : false,
							maxHour : false,
							minuteStep : 1,
							minuteStepRound : 0,
							rolloverMode : {
								m : true,
								d : true,
								h : true,
								i : true,
								s : true
							},
							useLang : "default",
							lang : {
								"default" : {
									setDateButtonLabel : "Set Date",
									setTimeButtonLabel : "Set Time",
									setDurationButtonLabel : "Set Duration",
									calTodayButtonLabel : "Jump to Today",
									titleDateDialogLabel : "Set Date",
									titleTimeDialogLabel : "Set Time",
									daysOfWeek : [ "Sunday", "Monday",
											"Tuesday", "Wednesday", "Thursday",
											"Friday", "Saturday" ],
									daysOfWeekShort : [ "Su", "Mo", "Tu", "We",
											"Th", "Fr", "Sa" ],
									monthsOfYear : [ "January", "February",
											"March", "April", "May", "June",
											"July", "August", "September",
											"October", "November", "December" ],
									monthsOfYearShort : [ "Jan", "Feb", "Mar",
											"Apr", "May", "Jun", "Jul", "Aug",
											"Sep", "Oct", "Nov", "Dec" ],
									durationLabel : [ "Days", "Hours",
											"Minutes", "Seconds" ],
									durationDays : [ "Day", "Days" ],
									timeFormat : 24,
									headerFormat : "%A, %B %-d, %Y",
									tooltip : "Open Date Picker",
									nextMonth : "Next Month",
									prevMonth : "Previous Month",
									dateFieldOrder : [ "m", "d", "y" ],
									timeFieldOrder : [ "h", "i", "a" ],
									slideFieldOrder : [ "y", "m", "d" ],
									dateFormat : "%Y-%m-%d",
									useArabicIndic : false,
									isRTL : false,
									calStartDay : 0,
									clearButton : "Clear",
									durationOrder : [ "d", "h", "i", "s" ],
									meridiem : [ "AM", "PM" ],
									timeOutput : "%k:%M",
									durationFormat : "%Dd %DA, %Dl:%DM:%DS",
									calDateListLabel : "Other Dates",
									calHeaderFormat : "%B %Y"
								}
							}
						},
						_enhanceDate : function() {
							a
									.extend(
											this._date.prototype,
											{
												copy : function(c, b) {
													if (typeof c === "undefined") {
														c = [ 0, 0, 0, 0, 0, 0,
																0 ]
													}
													if (typeof b === "undefined") {
														b = [ 0, 0, 0, 0, 0, 0,
																0 ]
													}
													while (c.length < 7) {
														c.push(0)
													}
													while (b.length < 7) {
														b.push(0)
													}
													return new Date(
															((b[0] > 0) ? b[0]
																	: this
																			.getFullYear()
																			+ c[0]),
															((b[1] > 0) ? b[1]
																	: this
																			.getMonth()
																			+ c[1]),
															((b[2] > 0) ? b[2]
																	: this
																			.getDate()
																			+ c[2]),
															((b[3] > 0) ? b[3]
																	: this
																			.getHours()
																			+ c[3]),
															((b[4] > 0) ? b[4]
																	: this
																			.getMinutes()
																			+ c[4]),
															((b[5] > 0) ? b[5]
																	: this
																			.getSeconds()
																			+ c[5]),
															((b[6] > 0) ? b[5]
																	: this
																			.getMilliseconds()
																			+ c[6]))
												},
												adj : function(c, b) {
													if (typeof b !== "number") {
														throw new Error(
																"Adjustment value not specified")
													}
													if (typeof c !== "number") {
														throw new Error(
																"Adjustment type not specified")
													}
													switch (c) {
													case 0:
														this.setFullYear(this
																.getFullYear()
																+ b);
														break;
													case 1:
														this.setMonth(this
																.getMonth()
																+ b);
														break;
													case 2:
														this.setDate(this
																.getDate()
																+ b);
														break;
													case 3:
														this.setHours(this
																.getHours()
																+ b);
														break;
													case 4:
														this.setMinutes(this
																.getMinutes()
																+ b);
														break;
													case 5:
														this.setSeconds(this
																.getSeconds()
																+ b);
														break;
													case 6:
														this
																.setMilliseconds(this
																		.getMilliseconds()
																		+ b);
														break
													}
													return this
												},
												setD : function(c, b) {
													switch (c) {
													case 0:
														this.setFullYear(b);
														break;
													case 1:
														this.setMonth(b);
														break;
													case 2:
														this.setDate(b);
														break;
													case 3:
														this.setHours(b);
														break;
													case 4:
														this.setMinutes(b);
														break;
													case 5:
														this.setSeconds(b);
														break;
													case 6:
														this.setMilliseconds(b);
														break
													}
													return this
												},
												get : function(b) {
													switch (b) {
													case 0:
														return this
																.getFullYear();
													case 1:
														return this.getMonth();
													case 2:
														return this.getDate();
													case 3:
														return this.getHours();
													case 4:
														return this
																.getMinutes();
													case 5:
														return this
																.getSeconds()
													}
													return false
												},
												iso : function() {
													return String(this
															.getFullYear())
															+ "-"
															+ ((this.getMonth() < 9) ? "0"
																	: "")
															+ String(this
																	.getMonth() + 1)
															+ "-"
															+ ((this.getDate() < 10) ? "0"
																	: "")
															+ String(this
																	.getDate())
												},
												comp : function() {
													return parseInt(this.iso()
															.replace(/-/g, ""),
															10)
												},
												getEpoch : function() {
													return (this.getTime() - this
															.getMilliseconds()) / 1000
												},
												getArray : function() {
													return [
															this.getFullYear(),
															this.getMonth(),
															this.getDate(),
															this.getHours(),
															this.getMinutes(),
															this.getSeconds() ]
												},
												setFirstDay : function(b) {
													this
															.setD(2, 1)
															.adj(
																	2,
																	(b - this
																			.getDay()));
													if (this.get(2) > 10) {
														this.adj(2, 7)
													}
													return this
												},
												setDWeek : function(c, b) {
													if (c === 4) {
														return this
																.setD(1, 0)
																.setD(2, 1)
																.setFirstDay(4)
																.adj(2, -3)
																.adj(
																		2,
																		(b - 1) * 7)
													}
													return this
															.setD(1, 0)
															.setD(2, 1)
															.setFirstDay(c)
															.adj(2, (b - 1) * 7)
												},
												getDWeek : function(c) {
													var d, b;
													switch (c) {
													case 0:
														d = this
																.copy(
																		[
																				0,
																				-1
																						* this
																								.getMonth() ])
																.setFirstDay(0);
														return Math
																.floor((this
																		.getTime() - (d
																		.getTime() + ((this
																		.getTimezoneOffset() - d
																		.getTimezoneOffset()) * 60000))) / 604800000) + 1;
													case 1:
														d = this
																.copy(
																		[
																				0,
																				-1
																						* this
																								.getMonth() ])
																.setFirstDay(1);
														return Math
																.floor((this
																		.getTime() - (d
																		.getTime() + ((this
																		.getTimezoneOffset() - d
																		.getTimezoneOffset()) * 60000))) / 604800000) + 1;
													case 4:
														if (this.getMonth() === 11
																&& this
																		.getDate() > 28) {
															return 1
														}
														d = this
																.copy(
																		[
																				0,
																				-1
																						* this
																								.getMonth() ],
																		true)
																.setFirstDay(4)
																.adj(2, -3);
														b = Math
																.floor((this
																		.getTime() - (d
																		.getTime() + ((this
																		.getTimezoneOffset() - d
																		.getTimezoneOffset()) * 60000))) / 604800000) + 1;
														if (b < 1) {
															d = this
																	.copy(
																			[
																					-1,
																					-1
																							* this
																									.getMonth() ])
																	.setFirstDay(
																			4)
																	.adj(2, -3);
															return Math
																	.floor((this
																			.getTime() - d
																			.getTime()) / 604800000) + 1
														}
														return b;
													default:
														return 0
													}
												}
											})
						},
						_event : function(d, c) {
							var b = a(this)
									.data(
											parseInt(a.mobile.version.replace(
													/\./g, ""), 10) > 110 ? "mobile-datebox"
													: "datebox");
							if (!d.isPropagationStopped()) {
								switch (c.method) {
								case "close":
									b.close();
									break;
								case "open":
									b.open();
									break;
								case "set":
									a(this).val(c.value);
									a(this).trigger("change");
									break;
								case "doset":
									if (a.isFunction(b["_" + b.options.mode
											+ "DoSet"])) {
										b["_" + b.options.mode + "DoSet"]
												.apply(b, [])
									} else {
										a(this).trigger(
												"datebox",
												{
													method : "set",
													value : b
															._formatter(b
																	.__fmt(),
																	b.theDate),
													date : b.theDate
												})
									}
									break;
								case "dooffset":
									if (c.type) {
										b._offset(c.type, c.amount, true)
									}
									break;
								case "dorefresh":
									b.refresh();
									break;
								case "doreset":
									b.hardreset();
									break;
								case "doclear":
									a(this).val("").trigger("change");
									break;
								case "clear":
									a(this).trigger("change")
								}
							}
						},
						_hoover : function(b) {
							a(b).toggleClass(
									"ui-btn-up-" + a(b).jqmData("theme")
											+ " ui-btn-down-"
											+ a(b).jqmData("theme"))
						},
						_ord : {
							"default" : function(c) {
								var b = c % 10;
								if (c > 9 && c < 21) {
									return "th"
								}
								if (b > 3) {
									return "th"
								}
								return [ "th", "st", "nd", "rd" ][b]
							}
						},
						__ : function(d) {
							var c = this.options, b = "override"
									+ d.charAt(0).toUpperCase() + d.slice(1);
							if (typeof c[b] !== "undefined") {
								return c[b]
							}
							if (typeof c.lang[c.useLang][d] !== "undefined") {
								return c.lang[c.useLang][d]
							}
							if (typeof c[c.mode + "lang"] !== "undefined"
									&& typeof c[c.mode + "lang"][d] !== "undefined") {
								return c[c.mode + "lang"][d]
							}
							return c.lang["default"][d]
						},
						__fmt : function() {
							var b = this, c = this.options;
							switch (c.mode) {
							case "timebox":
							case "timeflipbox":
								return b.__("timeOutput");
							case "durationbox":
							case "durationflipbox":
								return b.__("durationFormat");
							default:
								return b.__("dateFormat")
							}
						},
						_zPad : function(b) {
							return ((b < 10) ? "0" + String(b) : String(b))
						},
						_dRep : function(j, g) {
							var h = 48, b = 57, c = 1584, d = null, e = null, f = "";
							if (g === -1) {
								h += c;
								b += c;
								c = -1584
							}
							for (d = 0; d < j.length; d++) {
								e = j.charCodeAt(d);
								if (e >= h && e <= b) {
									f = f + String.fromCharCode(e + c)
								} else {
									f = f + String.fromCharCode(e)
								}
							}
							return f
						},
						_doIndic : function() {
							var b = this;
							b.d.intHTML
									.find("*")
									.each(
											function() {
												if (a(this).children().length < 1) {
													a(this).text(
															b._dRep(a(this)
																	.text()))
												} else {
													if (a(this)
															.hasClass(
																	"ui-datebox-slideday")) {
														a(this)
																.html(
																		b
																				._dRep(a(
																						this)
																						.html()))
													}
												}
											});
							b.d.intHTML.find("input").each(function() {
								a(this).val(b._dRep(a(this).val()))
							})
						},
						_parser : {
							"default" : function(b) {
								return false
							}
						},
						_n : function(c, b) {
							return (c < 0) ? b : c
						},
						_pa : function(b, c) {
							if (typeof c === "boolean") {
								return new this._date(b[0], b[1], b[2], 0, 0,
										0, 0)
							}
							return new this._date(c.getFullYear(),
									c.getMonth(), c.getDate(), b[0], b[1],
									b[2], 0)
						},
						_makeDate : function(k) {
							k = a
									.trim(((this.__("useArabicIndic") === true) ? this
											._dRep(k, -1)
											: k));
							var n = this, c = this.options, e = n.__fmt(), m = null, h = [], l = null, b = null, f = new n._date(), j = {
								year : -1,
								mont : -1,
								date : -1,
								hour : -1,
								mins : -1,
								secs : -1,
								week : false,
								wtyp : 4,
								wday : false,
								yday : false,
								meri : 0
							}, g;
							if (typeof c.mode === "undefined") {
								return f
							}
							if (typeof n._parser[c.mode] !== "undefined") {
								return n._parser[c.mode].apply(n, [ k ])
							}
							if (c.mode === "durationbox"
									|| c.mode === "durationflipbox") {
								e = e.replace(/%D([a-z])/gi, function(d, o) {
									switch (o) {
									case "d":
									case "l":
									case "M":
									case "S":
										return "(" + d + "|[0-9]+)";
									default:
										return ".+?"
									}
								});
								e = new RegExp("^" + e + "$");
								m = e.exec(k);
								l = e.exec(n.__fmt());
								if (m === null || m.length !== l.length) {
									if (typeof c.defaultValue === "number"
											&& c.defaultValue > 0) {
										return new n._date((n.initDate
												.getEpoch() + parseInt(
												c.defaultValue, 10)) * 1000)
									}
									return new n._date(n.initDate.getTime())
								}
								b = n.initDate.getEpoch();
								for (g = 0; g < m.length; g++) {
									if (l[g].match(/^%Dd$/i)) {
										b = b
												+ (parseInt(m[g], 10) * 60 * 60 * 24)
									}
									if (l[g].match(/^%Dl$/i)) {
										b = b + (parseInt(m[g], 10) * 60 * 60)
									}
									if (l[g].match(/^%DM$/i)) {
										b = b + (parseInt(m[g], 10) * 60)
									}
									if (l[g].match(/^%DS$/i)) {
										b = b + (parseInt(m[g], 10))
									}
								}
								return new n._date((b * 1000))
							}
							e = e
									.replace(
											/%(0|-)*([a-z])/gi,
											function(d, o, p) {
												h.push(p);
												switch (p) {
												case "p":
												case "P":
												case "b":
												case "B":
													return "(" + d + "|.+?)";
												case "H":
												case "k":
												case "I":
												case "l":
												case "m":
												case "M":
												case "S":
												case "V":
												case "U":
												case "u":
												case "W":
												case "d":
													return "("
															+ d
															+ "|"
															+ ((o === "-") ? "[0-9]{1,2}"
																	: "[0-9]{2}")
															+ ")";
												case "j":
													return "(" + d
															+ "|[0-9]{3})";
												case "s":
													return "(" + d + "|[0-9]+)";
												case "g":
												case "y":
													return "(" + d
															+ "|[0-9]{2})";
												case "E":
												case "G":
												case "Y":
													return "(" + d
															+ "|[0-9]{1,4})";
												default:
													h.pop();
													return ".+?"
												}
											});
							e = new RegExp("^" + e + "$");
							m = e.exec(k);
							l = e.exec(n.__fmt());
							if (m === null || m.length !== l.length) {
								if (c.defaultValue !== false) {
									switch (typeof c.defaultValue) {
									case "object":
										if (c.defaultValue.length === 3) {
											f = n
													._pa(
															c.defaultValue,
															((c.mode === "timebox" || c.mode === "timeflipbox") ? f
																	: false))
										}
										break;
									case "number":
										f = new n._date(c.defaultValue * 1000);
										break;
									case "string":
										if (c.mode === "timebox"
												|| c.mode === "timeflipbox") {
											b = c.defaultValue.split(":");
											if (b.length === 3) {
												f = n._pa([ b[0], b[1], b[2] ],
														f)
											} else {
												if (b.length === 2) {
													f = n._pa(
															[ b[0], b[1], 0 ],
															f)
												}
											}
										} else {
											b = c.defaultValue.split("-");
											if (b.length === 3) {
												f = n._pa([ b[0], b[1] - 1,
														b[2] ], false)
											}
										}
										break
									}
								}
								if (isNaN(f.getDate())) {
									f = new n._date()
								}
							} else {
								for (g = 1; g < m.length; g++) {
									switch (h[g - 1]) {
									case "s":
										return new n._date(
												parseInt(m[g], 10) * 1000);
									case "Y":
									case "G":
										j.year = parseInt(m[g], 10);
										break;
									case "E":
										j.year = parseInt(m[g], 10) - 543;
										break;
									case "y":
									case "g":
										if (c.afterToday === true
												|| parseInt(m[g], 10) < 38) {
											j.year = parseInt("20" + m[g], 10)
										} else {
											j.year = parseInt("19" + m[g], 10)
										}
										break;
									case "m":
										j.mont = parseInt(m[g], 10) - 1;
										break;
									case "d":
										j.date = parseInt(m[g], 10);
										break;
									case "H":
									case "k":
									case "I":
									case "l":
										j.hour = parseInt(m[g], 10);
										break;
									case "M":
										j.mins = parseInt(m[g], 10);
										break;
									case "S":
										j.secs = parseInt(m[g], 10);
										break;
									case "u":
										j.wday = parseInt(m[g], 10) - 1;
										break;
									case "w":
										j.wday = parseInt(m[g], 10);
										break;
									case "j":
										j.yday = parseInt(m[g], 10);
										break;
									case "V":
										j.week = parseInt(m[g], 10);
										j.wtyp = 4;
										break;
									case "U":
										j.week = parseInt(m[g], 10);
										j.wtyp = 0;
										break;
									case "W":
										j.week = parseInt(m[g], 10);
										j.wtyp = 1;
										break;
									case "p":
									case "P":
										j.meri = ((m[g].toLowerCase() === n
												.__("meridiem")[0]
												.toLowerCase()) ? -1 : 1);
										break;
									case "b":
										b = a.inArray(m[g], n
												.__("monthsOfYearShort"));
										if (b > -1) {
											j.mont = b
										}
										break;
									case "B":
										b = a.inArray(m[g], n
												.__("monthsOfYear"));
										if (b > -1) {
											j.mont = b
										}
										break
									}
								}
								if (j.meri !== 0) {
									if (j.meri === -1 && j.hour === 12) {
										j.hour = 0
									}
									if (j.meri === 1 && j.hour !== 12) {
										j.hour = j.hour + 12
									}
								}
								f = new n._date(n._n(j.year, 0), n
										._n(j.mont, 0), n._n(j.date, 1), n._n(
										j.hour, 0), n._n(j.mins, 0), n._n(
										j.secs, 0), 0);
								if (j.year < 100 && j.year !== -1) {
									f.setFullYear(j.year)
								}
								if ((j.mont > -1 && j.date > -1)
										|| (j.hour > -1 && j.mins > -1 && j.secs > -1)) {
									return f
								}
								if (j.week !== false) {
									f.setDWeek(j.wtyp, j.week);
									if (j.date > -1) {
										f.setDate(j.date)
									}
								}
								if (j.yday !== false) {
									f.setD(1, 0).setD(2, 1)
											.adj(2, (j.yday - 1))
								}
								if (j.wday !== false) {
									f.adj(2, (j.wday - f.getDay()))
								}
							}
							return f
						},
						_customformat : {
							"default" : function(c, b) {
								return false
							}
						},
						_formatter : function(f, c) {
							var b = this, g = this.options, d, e = {
								part : [ 0, 0, 0, 0 ],
								tp : 0
							};
							if (g.mode === "durationbox"
									|| g.mode === "durationflipbox") {
								e.tp = this.theDate.getEpoch()
										- this.initDate.getEpoch();
								e.part[0] = parseInt(e.tp / (60 * 60 * 24), 10);
								e.tp -= (e.part[0] * 60 * 60 * 24);
								e.part[1] = parseInt(e.tp / (60 * 60), 10);
								e.tp -= (e.part[1] * 60 * 60);
								e.part[2] = parseInt(e.tp / (60), 10);
								e.tp -= (e.part[2] * 60);
								e.part[3] = e.tp;
								if (!f.match(/%Dd/)) {
									e.part[1] += (e.part[0] * 24)
								}
								if (!f.match(/%Dl/)) {
									e.part[2] += (e.part[1] * 60)
								}
								if (!f.match(/%DM/)) {
									e.part[3] += (e.part[2] * 60)
								}
							}
							f = f
									.replace(
											/%(D|X|0|-)*([1-9a-zA-Z])/g,
											function(h, j, k) {
												if (j === "X") {
													if (typeof b._customformat[g.mode] !== "undefined") {
														return b._customformat[g.mode]
																(k, c, g)
													}
													return h
												}
												if (j === "D") {
													switch (k) {
													case "d":
														return e.part[0];
													case "l":
														return b
																._zPad(e.part[1]);
													case "M":
														return b
																._zPad(e.part[2]);
													case "S":
														return b
																._zPad(e.part[3]);
													case "A":
														return ((e.part[0] > 1) ? b
																.__("durationDays")[1]
																: b
																		.__("durationDays")[0]);
													default:
														return h
													}
												}
												switch (k) {
												case "%":
													return "%";
												case "a":
													return b
															.__("daysOfWeekShort")[c
															.getDay()];
												case "A":
													return b.__("daysOfWeek")[c
															.getDay()];
												case "b":
													return b
															.__("monthsOfYearShort")[c
															.getMonth()];
												case "B":
													return b.__("monthsOfYear")[c
															.getMonth()];
												case "C":
													return c.getFullYear()
															.toString().substr(
																	0, 2);
												case "d":
													return ((j === "-") ? c
															.getDate() : b
															._zPad(c.getDate()));
												case "H":
												case "k":
													return ((j === "-") ? c
															.getHours()
															: b
																	._zPad(c
																			.getHours()));
												case "I":
												case "l":
													return ((j === "-") ? ((c
															.getHours() === 0 || c
															.getHours() === 12) ? 12
															: ((c.getHours() < 12) ? c
																	.getHours()
																	: (c
																			.getHours() - 12)))
															: b
																	._zPad(((c
																			.getHours() === 0 || c
																			.getHours() === 12) ? 12
																			: ((c
																					.getHours() < 12) ? c
																					.getHours()
																					: c
																							.getHours() - 12))));
												case "m":
													return ((j === "-") ? c
															.getMonth() + 1
															: b
																	._zPad(c
																			.getMonth() + 1));
												case "M":
													return ((j === "-") ? c
															.getMinutes()
															: b
																	._zPad(c
																			.getMinutes()));
												case "p":
													return ((c.getHours() < 12) ? b
															.__("meridiem")[0]
															.toUpperCase()
															: b.__("meridiem")[1]
																	.toUpperCase());
												case "P":
													return ((c.getHours() < 12) ? b
															.__("meridiem")[0]
															.toLowerCase()
															: b.__("meridiem")[1]
																	.toLowerCase());
												case "s":
													return c.getEpoch();
												case "S":
													return ((j === "-") ? c
															.getSeconds()
															: b
																	._zPad(c
																			.getSeconds()));
												case "u":
													return ((j === "-") ? c
															.getDay() + 1
															: b
																	._zPad(c
																			.getDay() + 1));
												case "w":
													return c.getDay();
												case "y":
													return c.getFullYear()
															.toString().substr(
																	2, 2);
												case "Y":
													return c.getFullYear();
												case "E":
													return c.getFullYear() + 543;
												case "V":
													return ((j === "-") ? c
															.getDWeek(4)
															: b
																	._zPad(c
																			.getDWeek(4)));
												case "U":
													return ((j === "-") ? c
															.getDWeek(0)
															: b
																	._zPad(c
																			.getDWeek(0)));
												case "W":
													return ((j === "-") ? c
															.getDWeek(1)
															: b
																	._zPad(c
																			.getDWeek(1)));
												case "o":
													if (typeof b._ord[g.useLang] !== "undefined") {
														return b._ord[g.useLang]
																(c.getDate())
													}
													return b._ord["default"](c
															.getDate());
												case "j":
													d = new Date(c
															.getFullYear(), 0,
															1);
													d = Math
															.ceil((c - d) / 86400000) + 1;
													return ((d < 100) ? ((d < 10) ? "00"
															: "0")
															: "")
															+ String(d);
												case "G":
													if (c.getDWeek(4) === 1
															&& c.getMonth() > 0) {
														return c.getFullYear() + 1
													}
													if (c.getDWeek(4) > 51
															&& c.getMonth() < 11) {
														return c.getFullYear() - 1
													}
													return c.getFullYear();
												case "g":
													if (c.getDWeek(4) === 1
															&& c.getMonth() > 0) {
														return parseInt(c
																.getFullYear()
																.toString()
																.substr(2, 2),
																10) + 1
													}
													if (c.getDWeek(4) > 51
															&& c.getMonth() < 11) {
														return parseInt(c
																.getFullYear()
																.toString()
																.substr(2, 2),
																10) - 1
													}
													return c.getFullYear()
															.toString().substr(
																	2, 2);
												default:
													return h
												}
											});
							if (b.__("useArabicIndic") === true) {
								f = b._dRep(f)
							}
							return f
						},
						_btwn : function(d, b, c) {
							return (d > b && d < c)
						},
						_minStepFix : function() {
							var d = this.theDate.get(4), c, b = this, e = this.options;
							if (e.minuteStep > 1 && d % e.minuteStep > 0) {
								if (e.minuteStepRound < 0) {
									d = d - (d % e.minuteStep)
								} else {
									if (e.minStepRound > 0) {
										d = d
												+ (e.minuteStep - (d % e.minuteStep))
									} else {
										if (d % e.minuteStep < e.minuteStep / 2) {
											d = d - (d % e.minuteStep)
										} else {
											d = d
													+ (e.minuteStep - (d % e.minuteStep))
										}
									}
								}
								b.theDate.setMinutes(d)
							}
						},
						_offset : function(f, d, g) {
							var b = this, e = this.options, c = false;
							f = (f || "").toLowerCase();
							if (typeof (g) === "undefined") {
								g = true
							}
							b.d.input.trigger("datebox", {
								method : "offset",
								type : f,
								amount : d
							});
							if (f !== "a"
									&& (typeof e.rolloverMode[f] === "undefined" || e.rolloverMode[f] === true)) {
								c = a.inArray(f,
										[ "y", "m", "d", "h", "i", "s" ])
							} else {
								switch (f) {
								case "y":
									c = 0;
									break;
								case "m":
									if (b._btwn(b.theDate.getMonth() + d, -1,
											12)) {
										c = 1
									}
									break;
								case "d":
									if (b
											._btwn(b.theDate.getDate() + d, 0,
													(32 - b.theDate.copy([ 0 ],
															[ 0, 0, 32, 13 ])
															.getDate() + 1))) {
										c = 2
									}
									break;
								case "h":
									if (b._btwn(b.theDate.getHours() + d, -1,
											24)) {
										c = 3
									}
									break;
								case "i":
									if (b._btwn(b.theDate.getMinutes() + d, -1,
											60)) {
										c = 4
									}
									break;
								case "s":
									if (b._btwn(b.theDate.getSeconds() + d, -1,
											60)) {
										c = 5
									}
									break;
								case "a":
									b._offset("h", ((d > 0) ? 1 : -1) * 12,
											false);
									break
								}
							}
							if (c !== false) {
								b.theDate.adj(c, d)
							}
							if (g === true) {
								b.refresh()
							}
							if (e.useImmediate) {
								b.d.input.trigger("datebox", {
									method : "doset"
								})
							}
						},
						_startOffset : function(b) {
							var c = this.options;
							if (c.startOffsetYears !== false) {
								b.adj(0, c.startOffsetYears)
							}
							if (c.startOffsetMonths !== false) {
								b.adj(1, c.startOffsetMonths)
							}
							if (c.startOffsetDays !== false) {
								b.adj(2, c.startOffsetDays)
							}
							return b
						},
						_create : function() {
							a(document).trigger("dateboxcreate");
							var j = this, b = a
									.extend(
											this.options,
											(typeof this.element
													.jqmData("options") !== "undefined") ? this.element
													.jqmData("options")
													: this
															._getLongOptions(this.element)), k = (b.theme === false && typeof (a(this)
									.jqmData("theme")) === "undefined") ? ((typeof (this.element
									.parentsUntil(":jqmData(theme)").parent()
									.jqmData("theme")) === "undefined") ? b.themeDefault
									: this.element.parentsUntil(
											":jqmData(theme)").parent()
											.jqmData("theme"))
									: b.theme, l = b.useAnimation ? b.transition
									: "none", g = b.useNewStyle === false ? {
								input : this.element,
								wrap : this.element
										.wrap(
												'<div class="ui-input-datebox ui-shadow-inset ui-corner-all '
														+ (this.element
																.jqmData("mini") === true ? "ui-mini "
																: "")
														+ "ui-body-" + k
														+ '"></div>').parent(),
								mainWrap : a(
										"<div>",
										{
											"class" : "ui-datebox-container ui-overlay-shadow ui-corner-all ui-datebox-hidden "
													+ l + " ui-body-" + k
										}).css("zIndex", b.zindex),
								intHTML : false
							}
									: {
										input : this.element,
										wrap : this.element,
										mainWrap : a(
												"<div>",
												{
													"class" : "ui-datebox-container ui-overlay-shadow ui-corner-all ui-datebox-hidden "
															+ l
															+ " ui-body-"
															+ k
												}).css("zIndex", b.zindex),
										intHTML : false
									}, e = (typeof window.ontouchstart !== "undefined"), f = {
								eStart : (e ? "touchstart" : "mousedown")
										+ ".datebox",
								eMove : (e ? "touchmove" : "mousemove")
										+ ".datebox",
								eEnd : (e ? "touchend" : "mouseup")
										+ ".datebox",
								eEndA : (e ? "mouseup.datebox touchend.datebox touchcancel.datebox touchmove.datebox"
										: "mouseup.datebox"),
								move : false,
								start : false,
								end : false,
								pos : false,
								target : false,
								delta : false,
								tmp : false
							}, c = {}, h = (typeof a.mobile.ns !== "undefined") ? a.mobile.ns
									: "";
							a.extend(j, {
								d : g,
								ns : h,
								drag : f,
								touch : e
							});
							if (b.usePlaceholder !== false) {
								if (b.usePlaceholder === true
										&& j._grabLabel() !== false) {
									j.d.input.attr("placeholder", j
											._grabLabel())
								}
								if (typeof b.usePlaceholder === "string") {
									j.d.input.attr("placeholder",
											b.usePlaceholder)
								}
							}
							b.theme = k;
							j.clearFunc = false;
							j.disabled = false;
							j.runButton = false;
							j._date = window.Date;
							j._enhanceDate();
							j.baseID = j.d.input.attr("id");
							j.initDate = new j._date();
							j.theDate = (b.defaultValue) ? j
									._makeDate(b.defaultValue) : ((j.d.input
									.val() !== "") ? j._makeDate(j.d.input
									.val()) : new j._date());
							j.initDone = false;
							if (b.showInitialValue === true) {
								j.d.input.val(j
										._formatter(j.__fmt(), j.theDate))
							}
							if (b.useButton === true && b.useInline === false
									&& b.useNewStyle === false) {
								j.d.open = a(
										'<a href="#" class="ui-input-clear" title="'
												+ this.__("tooltip") + '">'
												+ this.__("tooltip") + "</a>")
										.on(
												b.clickEvent,
												function(d) {
													d.preventDefault();
													if (!j.disabled) {
														j.d.input
																.trigger(
																		"datebox",
																		{
																			method : "open"
																		});
														j.d.wrap
																.parent()
																.addClass(
																		"ui-focus");
														j.d.input
																.parent()
																.removeClass(
																		"ui-focus")
													}
													setTimeout(
															function() {
																a(d.target)
																		.closest(
																				"a")
																		.removeClass(
																				a.mobile.activeBtnClass)
															}, 300)
												}).appendTo(j.d.wrap)
										.buttonMarkup({
											icon : "grid",
											iconpos : "notext",
											corners : true,
											shadow : true
										}).css({
											"vertical-align" : "middle",
											display : "inline-block"
										})
							}
							j.d.screen = a(
									"<div>",
									{
										"class" : "ui-datebox-screen ui-datebox-hidden"
												+ ((b.useModal) ? " ui-datebox-screen-modal"
														: "")
									}).css({
								"z-index" : b.zindex - 1
							}).on(b.clickEventAlt, function(d) {
								d.preventDefault();
								j.d.input.trigger("datebox", {
									method : "close"
								})
							});
							if (b.enhanceInput === true
									&& navigator.userAgent.match(/Android/i)) {
								j.inputType = "number"
							} else {
								j.inputType = "text"
							}
							if (b.hideInput) {
								j.d.wrap.parent().hide()
							}
							if (b.mobVer < 140) {
								a("label[for='" + j.d.input.attr("id") + "']")
										.addClass("ui-input-text").css(
												"verticalAlign", "middle")
							}
							j.d.wrap
									.on(
											b.clickEvent,
											function() {
												if (!j.disabled
														&& (b.noButtonFocusMode || b.focusMode)) {
													j.d.input.trigger(
															"datebox", {
																method : "open"
															});
													j.d.wrap
															.addClass("ui-focus");
													j.d.input
															.removeClass("ui-focus")
												}
											});
							j.d.input
									.removeClass(
											"ui-corner-all ui-shadow-inset")
									.bind(
											j.touch ? "touchend" : "click",
											function(d) {
												if (j.disabled === false
														&& b.useNewStyle === true
														&& b.useFocus === false) {
													if (((j.touch ? d.originalEvent.changedTouches[0].pageX
															: d.pageX) - d.target.offsetLeft) > (d.target.offsetWidth - 20)) {
														j.d.input
																.trigger(
																		"datebox",
																		{
																			method : "open"
																		});
														j.d.wrap
																.parent()
																.addClass(
																		"ui-focus");
														j.d.input
																.removeClass("ui-focus")
													}
												}
											})
									.focus(
											function() {
												if (j.disabled === false
														&& b.useFocus === true) {
													j.d.input.trigger(
															"datebox", {
																method : "open"
															});
													j.d.wrap
															.addClass("ui-focus");
													j.d.input
															.removeClass("ui-focus");
													if (b.useNewStyle === false) {
														j.d.input
																.parent()
																.removeClass(
																		"ui-focus");
														j.d.wrap
																.parent()
																.addClass(
																		"ui-focus")
													}
												}
												if (b.useNewStyle === false) {
													j.d.input
															.removeClass("ui-focus")
												}
											}).blur(function() {
										j.d.wrap.removeClass("ui-focus");
										j.d.input.removeClass("ui-focus")
									}).change(
											function() {
												j.theDate = j
														._makeDate(j.d.input
																.val());
												j.refresh()
											}).attr("readonly", b.lockInput)
									.on("datebox", j._event);
							if (b.useNewStyle === true) {
								j.d.input
										.addClass("ui-corner-all "
												+ ((b.useAltIcon === true) ? "ui-icon-datebox-alt"
														: "ui-icon-datebox"));
								if (b.overrideStyleClass !== false) {
									j.d.input.addClass(b.overrideStyleClass)
								}
							} else {
								j.d.input.parent().css("border", "none")
										.removeClass("ui-shadow-inset")
							}
							j.d.wrap
									.parent()
									.on(
											b.clickEvent,
											function() {
												if (!j.disabled
														&& b.useFocus === true
														&& b.useNewStyle === false) {
													j.d.input.trigger(
															"datebox", {
																method : "open"
															});
													j.d.wrap
															.addClass("ui-focus");
													j.d.input
															.removeClass("ui-focus");
													setTimeout(
															function() {
																j.d.wrap
																		.removeClass("ui-focus");
																j.d.wrap
																		.parent()
																		.addClass(
																				"ui-focus")
															}, 500)
												}
											});
							if (typeof a.event.special.mousewheel !== "undefined") {
								j.wheelExists = true
							}
							if (j.d.input.is(":disabled")) {
								j.disable()
							}
							if (b.useInline === true || b.useInlineBlind) {
								j.open()
							}
							j.applyMinMax(false, false);
							a(document).trigger("dateboxaftercreate")
						},
						applyMinMax : function(e, d) {
							var b = this, f = this.options, c = {};
							if (typeof e === "undefined") {
								e = false
							}
							if (typeof d === "undefined") {
								d = true
							}
							if ((d === true || f.minDays === false)
									&& typeof (b.d.input.attr("min")) !== "undefined") {
								c.today = new b._date();
								c.lod = 24 * 60 * 60 * 1000;
								c.todayc = new b._date(c.today.getFullYear(),
										c.today.getMonth(), c.today.getDate(),
										0, 0, 0, 0);
								c.fromel = b.d.input.attr("min").split("-");
								c.compdt = new b._date(c.fromel[0],
										c.fromel[1] - 1, c.fromel[2], 0, 0, 0,
										0);
								f.minDays = parseInt(
										(((c.compdt.getTime() - c.todayc
												.getTime()) / c.lod))
												* -1, 10)
							}
							if ((d === true || f.maxDays === false)
									&& typeof (b.d.input.attr("max")) !== "undefined") {
								c.today = new b._date();
								c.lod = 24 * 60 * 60 * 1000;
								c.todayc = new b._date(c.today.getFullYear(),
										c.today.getMonth(), c.today.getDate(),
										0, 0, 0, 0);
								c.fromel = b.d.input.attr("max").split("-");
								c.compdt = new b._date(c.fromel[0],
										c.fromel[1] - 1, c.fromel[2], 0, 0, 0,
										0);
								f.maxDays = parseInt(
										(((c.compdt.getTime() - c.todayc
												.getTime()) / c.lod)), 10)
							}
							if (e === true) {
								b.refresh()
							}
						},
						_build : {
							"default" : function() {
								this.d.headerText = "Error";
								this.d.intHTML = a("<div class='ui-body-b'><h2 style='text-align:center'>There is no mode by that name loaded / mode not given</h2></div>")
							}
						},
						_applyCoords : function(h) {
							var b = h.widget, j = h.widget.options, f = {
								h : a.mobile.activePage.find(".ui-header")
										.jqmData("position"),
								f : a.mobile.activePage.find(".ui-footer")
										.jqmData("position"),
								fh : a.mobile.activePage.find(".ui-footer")
										.outerHeight(),
								hh : a.mobile.activePage.find(".ui-header")
										.outerHeight()
							}, c = {
								x : b.d.wrap.offset().left
										+ (b.d.wrap.outerWidth() / 2),
								y : b.d.wrap.offset().top
										+ (b.d.wrap.outerHeight() / 2)
							}, d = {
								w : b.d.mainWrap.outerWidth(),
								h : b.d.mainWrap.outerHeight()
							}, g = {
								t : a(window).scrollTop(),
								h : a(window).height(),
								w : a.mobile.activePage.width(),
								ah : a(document).height()
							}, k = {
								y : (j.centerVert) ? g.t
										+ ((g.h / 2) - (d.h / 2)) : c.y
										- (d.h / 2),
								x : (g.w < 400 || j.centerHoriz) ? (g.w / 2)
										- (d.w / 2) : c.x - (d.w / 2)
							};
							if (j.centerVert === false) {
								if (j.hideFixedToolbars === true
										&& (typeof f.f !== "undefined" || typeof f.h !== "undefined")) {
									a.mobile.activePage.find(
											":jqmData(position='fixed')")
											.fixedtoolbar("hide");
									f.f = undefined;
									f.h = undefined
								}
								if (typeof f.f !== "undefined") {
									if ((k.y + d.h) > (g.h - f.fh - 2)) {
										k.y = g.h - f.fh - 2 - d.h
									}
								} else {
									if ((k.y + d.h) > (g.ah - f.fh - 2)) {
										k.y = g.ah - f.fh - 2 - d.h
									}
									if ((g.h + g.t) < (d.h + k.y + 2)) {
										k.y = g.h + g.t - d.h - 2
									}
								}
								if (typeof f.h !== "undefined") {
									if ((g.t + f.hh + 2) > k.y) {
										k.y = g.t + f.hh + 2
									}
								} else {
									if (f.hh + 2 > k.y) {
										k.y = f.hh + 2
									}
									if (k.y < g.t + 2) {
										k.y = g.t + 2
									}
								}
							}
							b.d.mainWrap.css({
								position : "absolute",
								top : k.y,
								left : k.x
							})
						},
						_drag : {
							"default" : function() {
								return false
							}
						},
						open : function() {
							var b = this, g = this.options, e = {}, f = {
								history : false
							}, d = "data-" + this.ns, c = g.useAnimation ? g.transition
									: "none";
							if (g.useFocus === true && b.fastReopen === true) {
								b.d.input.blur();
								return false
							}
							if (b.clearFunc !== false) {
								clearTimeout(b.clearFunc);
								b.clearFunc = false
							}
							if (g.openCallback !== false) {
								if (!a.isFunction(g.openCallback)) {
									if (typeof window[g.openCallback] !== "undefined") {
										g.openCallback = window[g.openCallback]
									} else {
										g.openCallback = new Function(
												g.openCallback)
									}
								}
								if (g.openCallback.apply(b, a.merge(
										[ b.theDate ], g.openCallbackArgs)) === false) {
									return false
								}
							}
							b.theDate = b._makeDate(b.d.input.val());
							if (b.d.input.val() === "") {
								b._startOffset(b.theDate)
							}
							b.d.input.blur();
							if (typeof b._build[g.mode] === "undefined") {
								b._build["default"].apply(b, [])
							} else {
								b._build[g.mode].apply(b, [])
							}
							if (typeof b._drag[g.mode] !== "undefined") {
								b._drag[g.mode].apply(b, [])
							}
							b.d.input.trigger("datebox", {
								method : "refresh"
							});
							if (b.__("useArabicIndic") === true) {
								b._doIndic()
							}
							if ((g.useInline === true || g.useInlineBlind === true)
									&& b.initDone === false) {
								b.d.mainWrap.append(b.d.intHTML);
								b.d.input.parent().parent()
										.append(b.d.mainWrap);
								b.d.mainWrap.removeClass("ui-datebox-hidden");
								if (g.useInline === true) {
									b.d.mainWrap.addClass("ui-datebox-inline")
								} else {
									b.d.mainWrap
											.addClass("ui-datebox-inlineblind");
									b.d.mainWrap.hide()
								}
								b.initDone = false;
								b.d.input.trigger("datebox", {
									method : "postrefresh"
								})
							}
							if (g.useImmediate) {
								b.d.input.trigger("datebox", {
									method : "doset"
								})
							}
							if (g.useInline) {
								return true
							}
							if (g.useInlineBlind) {
								if (b.initDone) {
									b.d.mainWrap.slideDown()
								} else {
									b.initDone = true
								}
								return true
							}
							if (b.d.intHTML.is(":visible")) {
								return false
							}
							if (g.enablePopup === true) {
								b.d.dialogPage = false;
								b.d.mainWrap.empty();
								if (g.useHeader === true) {
									b.d.headHTML = a('<div class="ui-header ui-bar-'
											+ g.themeHeader + '"></div>');
									a(
											"<a class='ui-btn-left' href='#'>Close</a>")
											.appendTo(b.d.headHTML)
											.buttonMarkup({
												theme : g.themeHeader,
												icon : "delete",
												iconpos : "notext",
												corners : true,
												shadow : true
											}).on(g.clickEventAlt, function(h) {
												h.preventDefault();
												b.d.input.trigger("datebox", {
													method : "close"
												})
											});
									a(
											'<h1 class="ui-title">'
													+ b.d.headerText + "</h1>")
											.appendTo(b.d.headHTML);
									b.d.mainWrap.append(b.d.headHTML)
								}
								b.d.mainWrap.append(b.d.intHTML).css("zIndex",
										g.zindex);
								b.d.input.trigger("datebox", {
									method : "postrefresh"
								});
								if (g.useAnimation === true) {
									e.transition = g.transition
								} else {
									e.transition = "none"
								}
								if (g.popupForceX !== false
										&& g.popupForceY !== false) {
									e.x = g.popupForceX;
									e.y = g.popupForceY
								}
								if (g.popupPosition !== false) {
									e.positionTo = g.popupPosition
								} else {
									if (typeof b.baseID !== undefined) {
										e.positionTo = "#" + b.baseID
									} else {
										e.positionTo = "window"
									}
								}
								if (g.useModal === true) {
									f.overlayTheme = "a"
								}
								b.d.mainWrap.removeClass("ui-datebox-hidden")
										.popup(f).popup("open", e);
								b.refresh()
							} else {
								if (g.dialogForce
										|| (g.dialogEnable && window.width() < 400)) {
									b.d.dialogPage = a(
											"<div " + d + "role='dialog' " + d
													+ "theme='" + g.theme
													+ "' ><div " + d
													+ "role='header' " + d
													+ "theme='" + g.themeHeader
													+ "'><h1>" + b.d.headerText
													+ "</h1></div><div " + d
													+ "role='content'></div>")
											.appendTo(a.mobile.pageContainer)
											.page().css("minHeight", "0px")
											.addClass(c);
									b.d.dialogPage.find(".ui-header").find("a")
											.off("click vclick")
											.on(g.clickEventAlt, function(h) {
												h.preventDefault();
												b.d.input.trigger("datebox", {
													method : "close"
												})
											});
									b.d.mainWrap.append(b.d.intHTML).css({
										marginLeft : "auto",
										marginRight : "auto"
									}).removeClass("ui-datebox-hidden");
									b.d.dialogPage.find(".ui-content").append(
											b.d.mainWrap);
									b.d.input.trigger("datebox", {
										method : "postrefresh"
									});
									a.mobile.activePage.off("pagehide.remove");
									a.mobile.changePage(b.d.dialogPage, {
										transition : c
									})
								} else {
									b.d.dialogPage = false;
									b.d.mainWrap.empty();
									if (g.useHeader === true) {
										b.d.headHTML = a('<div class="ui-header ui-bar-'
												+ g.themeHeader + '"></div>');
										a(
												"<a class='ui-btn-left' href='#'>Close</a>")
												.appendTo(b.d.headHTML)
												.buttonMarkup({
													theme : g.themeHeader,
													icon : "delete",
													iconpos : "notext",
													corners : true,
													shadow : true
												})
												.on(
														g.clickEventAlt,
														function(h) {
															h.preventDefault();
															b.d.input
																	.trigger(
																			"datebox",
																			{
																				method : "close"
																			})
														});
										a(
												'<h1 class="ui-title">'
														+ b.d.headerText
														+ "</h1>").appendTo(
												b.d.headHTML);
										b.d.mainWrap.append(b.d.headHTML)
									}
									b.d.mainWrap.append(b.d.intHTML).css(
											"zIndex", g.zindex);
									b.d.mainWrap.appendTo(a.mobile.activePage);
									b.d.screen.appendTo(a.mobile.activePage);
									b.d.input.trigger("datebox", {
										method : "postrefresh"
									});
									b._applyCoords({
										widget : b
									});
									if (g.useModal === true) {
										if (g.useAnimation) {
											b.d.screen.fadeIn("slow")
										} else {
											b.d.screen.show()
										}
									} else {
										setTimeout(
												function() {
													b.d.screen
															.removeClass("ui-datebox-hidden")
												}, 500)
									}
									b.d.mainWrap.addClass(
											"ui-overlay-shadow in")
											.removeClass("ui-datebox-hidden");
									a(document).on("orientationchange.datebox",
											{
												widget : b
											}, function(h) {
												b._applyCoords(h.data)
											});
									if (g.resizeListener === true) {
										a(window).on("resize.datebox", {
											widget : b
										}, function(h) {
											b._applyCoords(h.data)
										})
									}
								}
							}
						},
						close : function() {
							var b = this, c = this.options;
							if (c.useInlineBlind === true) {
								b.d.mainWrap.slideUp();
								return true
							}
							if (c.useInline === true || b.d.intHTML === false) {
								return true
							}
							if (b.d.dialogPage !== false) {
								a(b.d.dialogPage).dialog("close");
								if (!a.mobile.activePage.jqmData("mobile-page").options.domCache) {
									a.mobile.activePage.on("pagehide.remove",
											function() {
												a(this).remove()
											})
								}
								b.d.intHTML.detach().empty();
								b.d.mainWrap.detach().empty();
								b.d.wrap.removeClass("ui-focus");
								b.clearFunc = setTimeout(function() {
									b.d.dialogPage.empty().remove();
									b.clearFunc = false
								}, 1500)
							} else {
								if (c.enablePopup === true) {
									b.d.mainWrap.popup("close");
									b.d.wrap.removeClass("ui-focus")
								} else {
									if (c.useModal) {
										if (c.useAnimation) {
											b.d.screen.fadeOut("slow")
										} else {
											b.d.screen.hide()
										}
									} else {
										b.d.screen
												.addClass("ui-datebox-hidden")
									}
									b.d.screen.detach();
									b.d.mainWrap.addClass("ui-datebox-hidden")
											.removeAttr("style").removeClass(
													"in ui-overlay-shadow")
											.empty().detach();
									b.d.intHTML.detach();
									b.d.wrap.removeClass("ui-focus");
									a(document)
											.off("orientationchange.datebox");
									if (c.resizeListener === true) {
										a(window).off("resize.datebox")
									}
								}
							}
							b.d.wrap.parent().removeClass("ui-focus");
							a(document).off(b.drag.eMove);
							a(document).off(b.drag.eEnd);
							a(document).off(b.drag.eEndA);
							if (c.useFocus) {
								b.fastReopen = true;
								setTimeout(function(d) {
									return function() {
										d.fastReopen = false
									}
								}(b), 300)
							}
							if (c.closeCallback !== false) {
								if (!a.isFunction(c.closeCallback)) {
									if (typeof window[c.closeCallback] !== "undefined") {
										c.closeCallback = window[c.closeCallback]
									} else {
										c.closeCallback = new Function(
												c.closeCallback)
									}
								}
								c.closeCallback.apply(b, a.merge([ b.theDate ],
										c.closeCallbackArgs))
							}
						},
						refresh : function() {
							if (typeof this._build[this.options.mode] === "undefined") {
								this._build["default"].apply(this, [])
							} else {
								this._build[this.options.mode].apply(this, [])
							}
							if (this.__("useArabicIndic") === true) {
								this._doIndic()
							}
							this.d.mainWrap.append(this.d.intHTML);
							this.d.input.trigger("datebox", {
								method : "postrefresh"
							})
						},
						_check : function() {
							var b = this, d = null, c = this.options;
							b.dateOK = true;
							if (c.afterToday !== false) {
								d = new b._date();
								if (b.theDate < d) {
									b.theDate = d
								}
							}
							if (c.beforeToday !== false) {
								d = new b._date();
								if (b.theDate > d) {
									b.theDate = d
								}
							}
							if (c.maxDays !== false) {
								d = new b._date();
								d.adj(2, c.maxDays);
								if (b.theDate > d) {
									b.theDate = d
								}
							}
							if (c.minDays !== false) {
								d = new b._date();
								d.adj(2, -1 * c.minDays);
								if (b.theDate < d) {
									b.theDate = d
								}
							}
							if (c.minHour !== false) {
								if (b.theDate.getHours() < c.minHour) {
									b.theDate.setHours(c.minHour)
								}
							}
							if (c.maxHour !== false) {
								if (b.theDate.getHours() > c.maxHour) {
									b.theDate.setHours(c.maxHour)
								}
							}
							if (c.maxYear !== false) {
								d = new b._date(c.maxYear, 0, 1);
								d.adj(2, -1);
								if (b.theDate > d) {
									b.theDate = d
								}
							}
							if (c.minYear !== false) {
								d = new b._date(c.minYear, 0, 1);
								if (b.theDate < d) {
									b.theDate = d
								}
							}
							if (a.inArray(c.mode, [ "timebox", "durationbox",
									"durationflipbox", "timeflipbox" ]) > -1) {
								if (c.mode === "timeflipbox"
										&& c.validHours !== false) {
									if (a.inArray(b.theDate.getHours(),
											c.validHours) < 0) {
										b.dateOK = false
									}
								}
							} else {
								if (c.blackDatesRec !== false) {
									for (i = 0; i < c.blackDatesRec.length; i++) {
										if ((c.blackDatesRec[i][0] === -1 || c.blackDatesRec[i][0] === year)
												&& (c.blackDatesRec[i][1] === -1 || c.blackDatesRec[i][1] === month)
												&& (c.blackDatesRec[i][2] === -1 || c.blackDatesRec[i][2] === date)) {
											b.dateOK = false
										}
									}
								}
								if (c.blackDates !== false) {
									if (a
											.inArray(b.theDate.iso(),
													c.blackDates) > -1) {
										b.dateOK = false
									}
								}
								if (c.blackDays !== false) {
									if (a.inArray(b.theDate.getDay(),
											c.blackDays) > -1) {
										b.dateOK = false
									}
								}
							}
						},
						_grabLabel : function() {
							var b = this, c = this.options;
							if (typeof c.overrideDialogLabel === "undefined") {
								if (typeof b.d.input.attr("placeholder") !== "undefined") {
									return b.d.input.attr("placeholder")
								}
								if (typeof b.d.input.attr("title") !== "undefined") {
									return b.d.input.attr("title")
								}
								if (b.d.wrap.parent().find(
										"label[for='" + b.d.input.attr("id")
												+ "']").text() !== "") {
									return b.d.wrap.parent().find(
											"label[for='"
													+ b.d.input.attr("id")
													+ "']").text()
								}
								return false
							}
							return c.overrideDialogLabel
						},
						_makeEl : function(d, e) {
							var b = false, c = false;
							c = d.clone();
							if (typeof e.attr !== "undefined") {
								for (b in e.attr) {
									if (e.attr.hasOwnProperty(b)) {
										c.jqmData(b, e.attr[b])
									}
								}
							}
							return c
						},
						_getLongOptions : function(d) {
							var c, e = {}, f, b;
							if (a.mobile.ns === "") {
								f = "datebox"
							} else {
								f = a.mobile.ns.substr(0,
										a.mobile.ns.length - 1)
										+ "Datebox"
							}
							for (c in d.data()) {
								if (c.substr(0, f.length) === f
										&& c.length > f.length) {
									b = c.substr(f.length);
									b = b.charAt(0).toLowerCase() + b.slice(1);
									e[b] = d.data(c)
								}
							}
							return e
						},
						disable : function() {
							this.d.input.attr("disabled", true);
							this.d.wrap.addClass("ui-disabled").blur();
							this.disabled = true;
							this.d.input.trigger("datebox", {
								method : "disable"
							})
						},
						enable : function() {
							this.d.input.attr("disabled", false);
							this.d.wrap.removeClass("ui-disabled");
							this.disabled = false;
							this.d.input.trigger("datebox", {
								method : "enable"
							})
						},
						_setOption : function() {
							a.Widget.prototype._setOption
									.apply(this, arguments);
							this.refresh()
						},
						getTheDate : function() {
							return this.theDate
						},
						getLastDur : function() {
							return this.lastDuration
						},
						setTheDate : function(b) {
							this.theDate = b;
							this.refresh()
						},
						callFormat : function(c, b) {
							return this._formatter(c, b)
						}
					});
	a(document).on("pagebeforecreate", function(b) {
		a(":jqmData(role='datebox')", b.target).each(function() {
			a(this).prop("type", "text")
		})
	});
	a(document)
			.on(
					"pagecreate create",
					function(b) {
						a(document).trigger("dateboxbeforecreate");
						a(":jqmData(role='datebox')", b.target)
								.each(
										function() {
											var c = typeof (a(this)
													.data(parseInt(
															a.mobile.version
																	.replace(
																			/\./g,
																			""),
															10) > 111 ? "mobile-datebox"
															: "datebox"));
											if (c === "undefined") {
												a(this).datebox()
											}
										})
					})
})(jQuery);
/*
 * ! jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage CC 3.0 Attribution. May be relicensed without
 * permission/notification. https://github.com/jtsage/jquery-mobile-datebox
 */
(function(a) {
	a.extend(a.mobile.datebox.prototype.options, {
		themeDateToday : "b",
		themeDayHigh : "b",
		themeDatePick : "b",
		themeDateHigh : "b",
		themeDateHighAlt : "b",
		themeDateHighRec : "b",
		themeDate : "a",
		calHighToday : true,
		calHighPick : true,
		calShowDays : true,
		calOnlyMonth : false,
		calWeekMode : false,
		calWeekModeDay : 1,
		calWeekHigh : false,
		calControlGroup : false,
		calShowWeek : false,
		calUsePickers : false,
		calNoHeader : false,
		useTodayButton : false,
		useCollapsedBut : false,
		highDays : false,
		highDates : false,
		highDatesRec : false,
		highDatesAlt : false,
		enableDates : false,
		calDateList : false,
		calShowDateList : false,
	});
	a
			.extend(
					a.mobile.datebox.prototype,
					{
						_cal_gen : function(d, f, l, i, h) {
							var b = 0, e = 0, k = 1, g = 1, c = [], m = [], j = false;
							for (b = 0; b <= 5; b++) {
								if (j === false) {
									m = [];
									for (e = 0; e <= 6; e++) {
										if (b === 0 && e < d) {
											if (i === true) {
												m
														.push([
																f + (e - d) + 1,
																h - 1 ])
											} else {
												m.push(false)
											}
										} else {
											if (b > 3 && k > l) {
												if (i === true) {
													m.push([ g, h + 1 ]);
													g++
												} else {
													m.push(false)
												}
												j = true
											} else {
												m.push([ k, h ]);
												k++;
												if (k > l) {
													j = true
												}
											}
										}
									}
									c.push(m)
								}
							}
							return c
						},
						_cal_check : function(b, h, f, d) {
							var k = this, e, c = this.options, g = {}, j = new this._date(
									h, f, d, 0, 0, 0, 0).getDay();
							g.ok = true;
							g.iso = h + "-" + k._zPad(f + 1) + "-" + k._zPad(d);
							g.comp = parseInt(g.iso.replace(/-/g, ""), 10);
							g.theme = c.themeDate;
							g.recok = true;
							g.rectheme = false;
							if (c.blackDatesRec !== false) {
								for (e = 0; e < c.blackDatesRec.length; e++) {
									if ((c.blackDatesRec[e][0] === -1 || c.blackDatesRec[e][0] === h)
											&& (c.blackDatesRec[e][1] === -1 || c.blackDatesRec[e][1] === f)
											&& (c.blackDatesRec[e][2] === -1 || c.blackDatesRec[e][2] === d)) {
										g.recok = false
									}
								}
							}
							if (a.isArray(c.enableDates)
									&& a.inArray(g.iso, c.enableDates) < 0) {
								g.ok = false
							} else {
								if (b.checkDates) {
									if ((g.recok !== true)
											|| (c.afterToday === true && b.thisDate
													.comp() > g.comp)
											|| (c.beforeToday === true && b.thisDate
													.comp() < g.comp)
											|| (c.notToday === true && b.thisDate
													.comp() === g.comp)
											|| (c.maxDays !== false && b.maxDate
													.comp() < g.comp)
											|| (c.minDays !== false && b.minDate
													.comp() > g.comp)
											|| (a.isArray(c.blackDays) && a
													.inArray(j, c.blackDays) > -1)
											|| (a.isArray(c.blackDates) && a
													.inArray(g.iso,
															c.blackDates) > -1)) {
										g.ok = false
									}
								}
							}
							if (g.ok) {
								if (c.highDatesRec !== false) {
									for (e = 0; e < c.highDatesRec.length; e++) {
										if ((c.highDatesRec[e][0] === -1 || c.highDatesRec[e][0] === h)
												&& (c.highDatesRec[e][1] === -1 || c.highDatesRec[e][1] === f)
												&& (c.highDatesRec[e][2] === -1 || c.highDatesRec[e][2] === d)) {
											g.rectheme = true
										}
									}
								}
								if (c.calHighPick
										&& d === b.presetDay
										&& (k.d.input.val() !== "" | c.defaultValue !== false)) {
									g.theme = c.themeDatePick
								} else {
									if (c.calHighToday
											&& g.comp === b.thisDate.comp()) {
										g.theme = c.themeDateToday
									} else {
										if (a.isArray(c.highDatesAlt)
												&& (a.inArray(g.iso,
														c.highDatesAlt) > -1)) {
											g.theme = c.themeDateHighAlt
										} else {
											if (a.isArray(c.highDates)
													&& (a.inArray(g.iso,
															c.highDates) > -1)) {
												g.theme = c.themeDateHigh
											} else {
												if (a.isArray(c.highDays)
														&& (a.inArray(j,
																c.highDays) > -1)) {
													g.theme = c.themeDayHigh
												} else {
													if (a
															.isArray(c.highDatesRec)
															&& g.rectheme === true) {
														g.theme = c.themeDateHighRec
													}
												}
											}
										}
									}
								}
							}
							return g
						}
					});
	a
			.extend(
					a.mobile.datebox.prototype._build,
					{
						calbox : function() {
							var j = this, c = this.options, e, b = false, f = "ui-datebox-", l = false, n = false, d = false, k = false, h = false;
							if (typeof j.d.intHTML !== "boolean") {
								j.d.intHTML.remove()
							}
							j.d.headerText = ((j._grabLabel() !== false) ? j
									._grabLabel() : j
									.__("titleDateDialogLabel"));
							j.d.intHTML = a("<span>");
							a(
									'<div class="'
											+ f
											+ 'gridheader"><div class="'
											+ f
											+ 'gridlabel"><h4>'
											+ j._formatter(j
													.__("calHeaderFormat"),
													j.theDate)
											+ "</h4></div></div>").appendTo(
									j.d.intHTML);
							a(
									"<div class='" + f + "gridplus"
											+ (j.__("isRTL") ? "-rtl" : "")
											+ "'><a href='#'>"
											+ j.__("nextMonth") + "</a></div>")
									.prependTo(
											j.d.intHTML.find("." + f
													+ "gridheader"))
									.buttonMarkup({
										theme : c.themeDate,
										icon : "arrow-r",
										inline : true,
										iconpos : "notext",
										corners : true,
										shadow : true
									}).on(c.clickEventAlt, function(i) {
										i.preventDefault();
										if (j.calNext) {
											if (j.theDate.getDate() > 28) {
												j.theDate.setDate(1)
											}
											j._offset("m", 1)
										}
									});
							a(
									"<div class='" + f + "gridminus"
											+ (j.__("isRTL") ? "-rtl" : "")
											+ "'><a href='#'>"
											+ j.__("prevMonth") + "</a></div>")
									.prependTo(
											j.d.intHTML.find("." + f
													+ "gridheader"))
									.buttonMarkup({
										theme : c.themeDate,
										icon : "arrow-l",
										inline : true,
										iconpos : "notext",
										corners : true,
										shadow : true
									}).on(c.clickEventAlt, function(i) {
										i.preventDefault();
										if (j.calPrev) {
											if (j.theDate.getDate() > 28) {
												j.theDate.setDate(1)
											}
											j._offset("m", -1)
										}
									});
							if (c.calNoHeader === true) {
								j.d.intHTML.find("." + f + "gridheader")
										.remove()
							}
							b = {
								today : -1,
								highlightDay : -1,
								presetDay : -1,
								startDay : j.__("calStartDay"),
								thisDate : new j._date(),
								maxDate : j.initDate.copy(),
								minDate : j.initDate.copy(),
								currentMonth : false,
								weekMode : 0,
								weekDays : null
							};
							b.start = (j.theDate.copy([ 0 ], [ 0, 0, 1 ])
									.getDay()
									- j.__("calStartDay") + 7) % 7;
							b.thisMonth = j.theDate.getMonth();
							b.thisYear = j.theDate.getFullYear();
							b.wk = j.theDate.copy([ 0 ], [ 0, 0, 1 ]).adj(
									2,
									(-1 * b.start)
											+ (j.__("calStartDay") === 0 ? 1
													: 0)).getDWeek(4);
							b.end = 32 - j.theDate
									.copy([ 0 ], [ 0, 0, 32, 13 ]).getDate();
							b.lastend = 32 - j.theDate.copy([ 0, -1 ],
									[ 0, 0, 32, 13 ]).getDate();
							b.presetDate = (j.d.input.val() === "") ? j
									._startOffset(j._makeDate(j.d.input.val()))
									: j._makeDate(j.d.input.val());
							b.thisDateArr = b.thisDate.getArray();
							b.theDateArr = j.theDate.getArray();
							b.checkDates = (a.inArray(false, [ c.afterToday,
									c.beforeToday, c.notToday, c.maxDays,
									c.minDays, c.blackDates, c.blackDays ]) > -1);
							j.calNext = true;
							j.calPrev = true;
							if (b.thisDateArr[0] === b.theDateArr[0]
									&& b.thisDateArr[1] === b.theDateArr[1]) {
								b.currentMonth = true
							}
							if (b.presetDate.comp() === j.theDate.comp()) {
								b.presetDay = b.presetDate.getDate()
							}
							if (c.afterToday === true
									&& (b.currentMonth === true || (b.thisDateArr[1] >= b.theDateArr[1] && b.theDateArr[0] === b.thisDateArr[0]))) {
								j.calPrev = false
							}
							if (c.beforeToday === true
									&& (b.currentMonth === true || (b.thisDateArr[1] <= b.theDateArr[1] && b.theDateArr[0] === b.thisDateArr[0]))) {
								j.calNext = false
							}
							if (c.minDays !== false) {
								b.minDate.adj(2, -1 * c.minDays);
								if (b.theDateArr[0] === b.minDate.getFullYear()
										&& b.theDateArr[1] <= b.minDate
												.getMonth()) {
									j.calPrev = false
								}
							}
							if (c.maxDays !== false) {
								b.maxDate.adj(2, c.maxDays);
								if (b.theDateArr[0] === b.maxDate.getFullYear()
										&& b.theDateArr[1] >= b.maxDate
												.getMonth()) {
									j.calNext = false
								}
							}
							if (c.calUsePickers === true) {
								b.picker = a(
										"<div>",
										{
											"class" : "ui-grid-a ui-datebox-grid",
											style : "padding-top: 5px; padding-bottom: 5px;"
										});
								b.picker1 = a(
										'<div class="ui-block-a"><select name="pickmon"></select></div>')
										.appendTo(b.picker).find("select");
								b.picker2 = a(
										'<div class="ui-block-b"><select name="pickyar"></select></div>')
										.appendTo(b.picker).find("select");
								for (e = 0; e <= 11; e++) {
									b.picker1
											.append(a('<option value="'
													+ e
													+ '"'
													+ ((b.thisMonth === e) ? ' selected="selected"'
															: "") + ">"
													+ j.__("monthsOfYear")[e]
													+ "</option>"))
								}
								for (e = (b.thisYear - 6); e <= b.thisYear + 6; e++) {
									b.picker2
											.append(a('<option value="'
													+ e
													+ '"'
													+ ((b.thisYear === e) ? ' selected="selected"'
															: "") + ">" + e
													+ "</option>"))
								}
								b.picker1.on("change", function() {
									j.theDate.setMonth(a(this).val());
									j.refresh()
								});
								b.picker2.on("change", function() {
									j.theDate.setFullYear(a(this).val());
									j.refresh()
								});
								b.picker.find("select").selectmenu({
									mini : true,
									nativeMenu : true
								});
								b.picker.appendTo(j.d.intHTML)
							}
							l = a('<div class="' + f + 'grid">').appendTo(
									j.d.intHTML);
							if (c.calShowDays) {
								j._cal_days = j.__("daysOfWeekShort").concat(
										j.__("daysOfWeekShort"));
								b.weekDays = a("<div>", {
									"class" : f + "gridrow"
								}).appendTo(l);
								if (j.__("isRTL") === true) {
									b.weekDays.css("direction", "rtl")
								}
								if (c.calShowWeek) {
									a("<div>").addClass(
											f + "griddate " + f
													+ "griddate-empty " + f
													+ "griddate-label")
											.appendTo(b.weekDays)
								}
								for (e = 0; e <= 6; e++) {
									a(
											"<div>"
													+ j._cal_days[(e + b.startDay) % 7]
													+ "</div>").addClass(
											f + "griddate " + f
													+ "griddate-empty " + f
													+ "griddate-label")
											.appendTo(b.weekDays)
								}
							}
							b.gen = j._cal_gen(b.start, b.lastend, b.end,
									!c.calOnlyMonth, j.theDate.getMonth());
							for (var n = 0, m = b.gen.length; n < m; n++) {
								k = a("<div>", {
									"class" : f + "gridrow"
								});
								if (j.__("isRTL")) {
									k.css("direction", "rtl")
								}
								if (c.calShowWeek) {
									a(
											"<div>",
											{
												"class" : f + "griddate " + f
														+ "griddate-empty"
											}).text("W" + b.wk).appendTo(k);
									b.wk++;
									if (b.wk > 52
											&& typeof b.gen[parseInt(n, 10) + 1] !== "undefined") {
										b.wk = new Date(
												b.theDateArr[0],
												b.theDateArr[1],
												((j.__("calStartDay") === 0) ? b.gen[parseInt(
														n, 10) + 1][1][0]
														: b.gen[parseInt(n, 10) + 1][0][0]))
												.getDWeek(4)
									}
								}
								for (var d = 0, g = b.gen[n].length; d < g; d++) {
									if (c.calWeekMode) {
										b.weekMode = b.gen[n][c.calWeekModeDay][0]
									}
									if (typeof b.gen[n][d] === "boolean") {
										a(
												"<div>",
												{
													"class" : f + "griddate "
															+ f
															+ "griddate-empty"
												}).appendTo(k)
									} else {
										h = j._cal_check(b, b.theDateArr[0],
												b.gen[n][d][1], b.gen[n][d][0]);
										if (b.gen[n][d][0]) {
											a(
													"<div>"
															+ String(b.gen[n][d][0])
															+ "</div>")
													.addClass(
															b.thisMonth === b.gen[n][d][1] ? (f
																	+ "griddate ui-corner-all ui-btn ui-btn-"
																	+ (c.mobVer < 140 ? "up-"
																			: "")
																	+ h.theme + (h.ok ? ""
																	: " "
																			+ f
																			+ "griddate-disable"))
																	: (f
																			+ "griddate "
																			+ f + "griddate-empty"))
													.jqmData(
															"date",
															((c.calWeekMode) ? b.weekMode
																	: b.gen[n][d][0]))
													.jqmData(
															"theme",
															b.thisMonth === b.gen[n][d][1] ? h.theme
																	: "-")
													.jqmData("enabled", h.ok)
													.jqmData(
															"month",
															b.gen[n][((c.calWeekMode) ? c.calWeekModeDay
																	: d)][1])
													.appendTo(k)
										}
									}
								}
								if (c.calControlGroup === true) {
									k.find(".ui-corner-all").removeClass(
											"ui-corner-all").eq(0).addClass(
											"ui-corner-left").end().last()
											.addClass("ui-corner-right")
											.addClass("ui-controlgroup-last")
								}
								k.appendTo(l)
							}
							if (c.calShowWeek) {
								l.find("." + f + "griddate").addClass(
										f + "griddate-week")
							}
							if (c.calShowDateList === true
									&& c.calDateList !== false) {
								b.datelist = a("<div>");
								b.datelistpick = a(
										'<select name="pickdate"></select>')
										.appendTo(b.datelist);
								b.datelistpick
										.append('<option value="false" selected="selected">'
												+ j.__("calDateListLabel")
												+ "</option>");
								for (e = 0; e < c.calDateList.length; e++) {
									b.datelistpick
											.append(a('<option value="'
													+ c.calDateList[e][0]
													+ '">'
													+ c.calDateList[e][1]
													+ "</option>"))
								}
								b.datelistpick.on("change", function() {
									b.datelistdate = a(this).val().split("-");
									j.theDate = new j._date(b.datelistdate[0],
											b.datelistdate[1] - 1,
											b.datelistdate[2], 0, 0, 0, 0);
									j.d.input.trigger("datebox", {
										method : "doset"
									})
								});
								b.datelist.find("select").selectmenu({
									mini : true,
									nativeMenu : true
								});
								b.datelist.appendTo(j.d.intHTML)
							}
							if (c.useTodayButton || c.useClearButton) {
								k = a("<div>", {
									"class" : f + "controls"
								});
								if (c.useTodayButton) {
									a(
											'<a href="#">'
													+ j
															.__("calTodayButtonLabel")
													+ "</a>")
											.appendTo(k)
											.buttonMarkup({
												theme : c.theme,
												icon : "check",
												iconpos : "left",
												corners : true,
												shadow : true
											})
											.on(
													c.clickEvent,
													function(i) {
														i.preventDefault();
														j.theDate = new j._date();
														j.theDate = new j._date(
																j.theDate
																		.getFullYear(),
																j.theDate
																		.getMonth(),
																j.theDate
																		.getDate(),
																0, 0, 0, 0);
														j.d.input
																.trigger(
																		"datebox",
																		{
																			method : "doset"
																		})
													})
								}
								if (c.useClearButton) {
									a(
											'<a href="#">'
													+ j.__("clearButton")
													+ "</a>").appendTo(k)
											.buttonMarkup({
												theme : c.theme,
												icon : "delete",
												iconpos : "left",
												corners : true,
												shadow : true
											}).on(c.clickEventAlt, function(i) {
												i.preventDefault();
												j.d.input.val("");
												j.d.input.trigger("datebox", {
													method : "clear"
												});
												j.d.input.trigger("datebox", {
													method : "close"
												})
											})
								}
								if (c.useCollapsedBut) {
									k.addClass("ui-datebox-collapse")
								}
								k.appendTo(l)
							}
							j.d.intHTML
									.on(
											c.clickEventAlt
													+ " vmouseover vmouseout",
											"div." + f + "griddate",
											function(i) {
												if (i.type === c.clickEventAlt) {
													i.preventDefault();
													if (a(this).jqmData(
															"enabled")) {
														j.theDate
																.setD(2, 1)
																.setD(
																		1,
																		a(this)
																				.jqmData(
																						"month"))
																.setD(
																		2,
																		a(this)
																				.jqmData(
																						"date"));
														j.d.input
																.trigger(
																		"datebox",
																		{
																			method : "set",
																			value : j
																					._formatter(
																							j
																									.__fmt(),
																							j.theDate),
																			date : j.theDate
																		});
														j.d.input
																.trigger(
																		"datebox",
																		{
																			method : "close"
																		})
													}
												} else {
													if (a(this).jqmData(
															"enabled")
															&& typeof a(this)
																	.jqmData(
																			"theme") !== "undefined"
															&& c.mobVer < 140) {
														if (c.calWeekMode !== false
																&& c.calWeekHigh === true) {
															a(this)
																	.parent()
																	.find("div")
																	.each(
																			function() {
																				j
																						._hoover(this)
																			})
														} else {
															j._hoover(this)
														}
													}
												}
											});
							j.d.intHTML.on("swipeleft", function() {
								if (j.calNext) {
									j._offset("m", 1)
								}
							}).on("swiperight", function() {
								if (j.calPrev) {
									j._offset("m", -1)
								}
							});
							if (j.wheelExists) {
								j.d.intHTML.on("mousewheel", function(i, o) {
									i.preventDefault();
									if (o > 0 && j.calNext) {
										j.theDate.setD(2, 1);
										j._offset("m", 1)
									}
									if (o < 0 && j.calPrev) {
										j.theDate.setD(2, 1);
										j._offset("m", -1)
									}
								})
							}
						}
					})
})(jQuery);
/*
 * ! jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage CC 3.0 Attribution. May be relicensed without
 * permission/notification. https://github.com/jtsage/jquery-mobile-datebox
 */
(function(a) {
	a.extend(a.mobile.datebox.prototype.options, {
		themeButton : "a",
		themeInput : "a",
		useSetButton : true,
		validHours : false,
		repButton : true
	});
	a.extend(a.mobile.datebox.prototype, {
		_dbox_run : function() {
			var b = this;
			b.drag.didRun = true;
			b._offset(b.drag.target[0], b.drag.target[1], false);
			b._dbox_run_update();
			b.runButton = setTimeout(function() {
				b._dbox_run()
			}, 150)
		},
		_dbox_run_update : function() {
			var b = this, c = this.options;
			b._check();
			if (c.mode === "datebox") {
				b.d.intHTML.find(".ui-datebox-header").find("h4").text(
						b._formatter(b.__("headerFormat"), b.theDate))
			}
			if (c.useSetButton) {
				if (b.dateOK === false) {
					setBut.addClass("ui-disabled")
				} else {
					setBut.removeClass("ui-disabled")
				}
			}
			b.d.divIn.find("input").each(
					function() {
						switch (a(this).jqmData("field")) {
						case "y":
							a(this).val(b.theDate.getFullYear());
							break;
						case "m":
							a(this).val(b.theDate.getMonth() + 1);
							break;
						case "d":
							a(this).val(b.theDate.getDate());
							break;
						case "h":
							if (b.__("timeFormat") === 12) {
								if (b.theDate.getHours() > 12) {
									a(this).val(b.theDate.getHours() - 12);
									break
								} else {
									if (b.theDate.getHours() === 0) {
										a(this).val(12);
										break
									}
								}
							}
							a(this).val(b.theDate.getHours());
							break;
						case "i":
							a(this).val(b._zPad(b.theDate.getMinutes()));
							break;
						case "M":
							a(this).val(
									b.__("monthsOfYearShort")[b.theDate
											.getMonth()]);
							break;
						case "a":
							a(this).val(
									(b.theDate.getHours() > 11) ? b
											.__("meridiem")[1] : b
											.__("meridiem")[0]);
							break
						}
					})
		},
		_dbox_vhour : function(g) {
			var b = this, f = this.options, e, d = [ 25, 0 ], c = [ 25, 0 ];
			if (f.validHours === false) {
				return true
			}
			if (a.inArray(b.theDate.getHours(), f.validHours) > -1) {
				return true
			}
			e = b.theDate.getHours();
			a.each(f.validHours, function() {
				if (((e < this) ? 1 : -1) === g) {
					if (d[0] > Math.abs(this - e)) {
						d = [ Math.abs(this - e), parseInt(this, 10) ]
					}
				} else {
					if (c[0] > Math.abs(this - e)) {
						c = [ Math.abs(this - e), parseInt(this, 10) ]
					}
				}
			});
			if (d[1] !== 0) {
				b.theDate.setHours(d[1])
			} else {
				b.theDate.setHours(c[1])
			}
		},
		_dbox_enter : function(c) {
			var b = this;
			if (c.jqmData("field") === "M"
					&& a.inArray(c.val(), b.__("monthsOfYearShort")) > -1) {
				b.theDate.setMonth(a
						.inArray(c.val(), b.__("monthsOfYearShort")))
			}
			if (c.val() !== "" && c.val().toString().search(/^[0-9]+$/) === 0) {
				switch (c.jqmData("field")) {
				case "y":
					b.theDate.setFullYear(parseInt(c.val(), 10));
					break;
				case "m":
					b.theDate.setMonth(parseInt(c.val(), 10) - 1);
					break;
				case "d":
					b.theDate.setDate(parseInt(c.val(), 10));
					break;
				case "h":
					b.theDate.setHours(parseInt(c.val(), 10));
					break;
				case "i":
					b.theDate.setMinutes(parseInt(c.val(), 10));
					break
				}
			}
			b.refresh()
		}
	});
	a
			.extend(
					a.mobile.datebox.prototype._build,
					{
						timebox : function() {
							this._build.datebox.apply(this, [])
						},
						datebox : function() {
							var u = this, n = this.drag, f = this.options, l, s, m, h = -2, q = "ui-datebox-", r = a("<div>"), c = a("<fieldset>"), j = r
									.clone(), k = c.clone(), e = a(
									"<input type='" + u.inputType + "' />")
									.addClass(
											"ui-input-text ui-corner-all ui-shadow-inset ui-body-"
													+ f.themeInput), t = a(
									"<input type='text' />").addClass(
									"ui-input-text ui-corner-all ui-shadow-inset ui-body-"
											+ f.themeInput), p = a("<div></div>"), b = {
								theme : f.themeButton,
								icon : "plus",
								iconpos : "bottom",
								corners : true,
								shadow : true,
								inline : true
							}, d = a.extend({}, b, {
								icon : "minus",
								iconpos : "top"
							});
							if (typeof u.d.intHTML !== "boolean") {
								u.d.intHTML.empty().remove()
							}
							u.d.headerText = ((u._grabLabel() !== false) ? u
									._grabLabel() : ((f.mode === "datebox") ? u
									.__("titleDateDialogLabel") : u
									.__("titleTimeDialogLabel")));
							u.d.intHTML = a("<span>");
							if (u.inputType !== "number") {
								e.attr("pattern", "[0-9]*")
							}
							u.fldOrder = ((f.mode === "datebox") ? u
									.__("dateFieldOrder") : u
									.__("timeFieldOrder"));
							u._check();
							u._minStepFix();
							u
									._dbox_vhour(typeof u._dbox_delta !== "undefined" ? u._dbox_delta
											: 1);
							if (f.mode === "datebox") {
								a(
										'<div class="'
												+ q
												+ 'header"><h4>'
												+ u._formatter(u
														.__("headerFormat"),
														u.theDate)
												+ "</h4></div>").appendTo(
										u.d.intHTML)
							}
							for (l = 0; l <= u.fldOrder.length; l++) {
								m = [ "a", "b", "c", "d", "e", "f" ][l];
								switch (u.fldOrder[l]) {
								case "y":
								case "m":
								case "d":
								case "h":
									a("<div>").append(u._makeEl(e, {
										attr : {
											field : u.fldOrder[l],
											amount : 1
										}
									})).addClass("ui-block-" + m).appendTo(j);
									u._makeEl(p, {
										attr : {
											field : u.fldOrder[l],
											amount : 1
										}
									}).addClass("ui-block-" + m)
											.buttonMarkup(b).appendTo(c);
									u._makeEl(p, {
										attr : {
											field : u.fldOrder[l],
											amount : 1
										}
									}).addClass("ui-block-" + m)
											.buttonMarkup(d).appendTo(k);
									h++;
									break;
								case "a":
									if (u.__("timeFormat") === 12) {
										a("<div>").append(u._makeEl(t, {
											attr : {
												field : u.fldOrder[l],
												amount : 1
											}
										})).addClass("ui-block-" + m).appendTo(
												j);
										u._makeEl(p, {
											attr : {
												field : u.fldOrder[l],
												amount : 1
											}
										}).addClass("ui-block-" + m)
												.buttonMarkup(b).appendTo(c);
										u._makeEl(p, {
											attr : {
												field : u.fldOrder[l],
												amount : 1
											}
										}).addClass("ui-block-" + m)
												.buttonMarkup(d).appendTo(k);
										h++
									}
									break;
								case "M":
									a("<div>").append(u._makeEl(t, {
										attr : {
											field : u.fldOrder[l],
											amount : 1
										}
									})).addClass("ui-block-" + m).appendTo(j);
									u._makeEl(p, {
										attr : {
											field : u.fldOrder[l],
											amount : 1
										}
									}).addClass("ui-block-" + m)
											.buttonMarkup(b).appendTo(c);
									u._makeEl(p, {
										attr : {
											field : u.fldOrder[l],
											amount : 1
										}
									}).addClass("ui-block-" + m)
											.buttonMarkup(d).appendTo(k);
									h++;
									break;
								case "i":
									a("<div>").append(u._makeEl(e, {
										attr : {
											field : u.fldOrder[l],
											amount : f.minuteStep
										}
									})).addClass("ui-block-" + m).appendTo(j);
									u._makeEl(p, {
										attr : {
											field : u.fldOrder[l],
											amount : f.minuteStep
										}
									}).addClass("ui-block-" + m)
											.buttonMarkup(b).appendTo(c);
									u._makeEl(p, {
										attr : {
											field : u.fldOrder[l],
											amount : f.minuteStep
										}
									}).addClass("ui-block-" + m)
											.buttonMarkup(d).appendTo(k);
									h++;
									break
								}
							}
							c
									.addClass(
											"ui-grid-"
													+ [ "a", "b", "c", "d", "e" ][h])
									.appendTo(u.d.intHTML);
							j
									.addClass("ui-datebox-dboxin")
									.addClass(
											"ui-grid-"
													+ [ "a", "b", "c", "d", "e" ][h])
									.appendTo(u.d.intHTML);
							k
									.addClass(
											"ui-grid-"
													+ [ "a", "b", "c", "d", "e" ][h])
									.appendTo(u.d.intHTML);
							if (f.mobVer >= 140) {
								k.find("div").css({
									"min-height" : "2.3em"
								});
								c.find("div").css({
									"min-height" : "2.3em"
								})
							}
							j
									.find("input")
									.each(
											function() {
												switch (a(this)
														.jqmData("field")) {
												case "y":
													a(this)
															.val(
																	u.theDate
																			.getFullYear());
													break;
												case "m":
													a(this)
															.val(
																	u.theDate
																			.getMonth() + 1);
													break;
												case "d":
													a(this)
															.val(
																	u.theDate
																			.getDate());
													break;
												case "h":
													if (u.__("timeFormat") === 12) {
														if (u.theDate
																.getHours() > 12) {
															a(this)
																	.val(
																			u.theDate
																					.getHours() - 12);
															break
														} else {
															if (u.theDate
																	.getHours() === 0) {
																a(this).val(12);
																break
															}
														}
													}
													a(this)
															.val(
																	u.theDate
																			.getHours());
													break;
												case "i":
													a(this)
															.val(
																	u
																			._zPad(u.theDate
																					.getMinutes()));
													break;
												case "M":
													a(this)
															.val(
																	u
																			.__("monthsOfYearShort")[u.theDate
																			.getMonth()]);
													break;
												case "a":
													a(this)
															.val(
																	(u.theDate
																			.getHours() > 11) ? u
																			.__("meridiem")[1]
																			: u
																					.__("meridiem")[0]);
													break
												}
											});
							u.d.divIn = j;
							if (u.dateOK !== true) {
								j.find("input")
										.addClass(q + "griddate-disable")
							} else {
								j.find("." + q + "griddate-disable")
										.removeClass(q + "griddate-disable")
							}
							if (f.useSetButton || f.useClearButton) {
								s = a("<div>", {
									"class" : q + "controls"
								});
								if (f.useSetButton) {
									setBut = a(
											'<a href="#">'
													+ ((f.mode === "datebox") ? u
															.__("setDateButtonLabel")
															: u
																	.__("setTimeButtonLabel"))
													+ "</a>")
											.appendTo(s)
											.buttonMarkup({
												theme : f.theme,
												icon : "check",
												iconpos : "left",
												corners : true,
												shadow : true
											})
											.on(
													f.clickEventAlt,
													function(g) {
														g.preventDefault();
														if (u.dateOK === true) {
															u.d.input
																	.trigger(
																			"datebox",
																			{
																				method : "set",
																				value : u
																						._formatter(
																								u
																										.__fmt(),
																								u.theDate),
																				date : u.theDate
																			});
															u.d.input
																	.trigger(
																			"datebox",
																			{
																				method : "close"
																			})
														}
													})
								}
								if (f.useClearButton) {
									a(
											'<a href="#">'
													+ u.__("clearButton")
													+ "</a>").appendTo(s)
											.buttonMarkup({
												theme : f.theme,
												icon : "delete",
												iconpos : "left",
												corners : true,
												shadow : true
											}).on(f.clickEventAlt, function(g) {
												g.preventDefault();
												u.d.input.val("");
												u.d.input.trigger("datebox", {
													method : "clear"
												});
												u.d.input.trigger("datebox", {
													method : "close"
												})
											})
								}
								if (f.useCollapsedBut) {
									s.addClass("ui-datebox-collapse")
								}
								s.appendTo(u.d.intHTML)
							}
							if (f.repButton === false) {
								c.on(f.clickEvent, "div", function(g) {
									j.find(":focus").blur();
									g.preventDefault();
									u._dbox_delta = 1;
									u._offset(a(this).jqmData("field"), a(this)
											.jqmData("amount"))
								});
								k.on(f.clickEvent, "div", function(g) {
									j.find(":focus").blur();
									g.preventDefault();
									u._dbox_delta = -1;
									u._offset(a(this).jqmData("field"), a(this)
											.jqmData("amount")
											* -1)
								})
							}
							j.on("change", "input", function() {
								u._dbox_enter(a(this))
							});
							if (u.wheelExists) {
								j.on("mousewheel", "input", function(g, i) {
									g.preventDefault();
									u._dbox_delta = i < 0 ? -1 : 1;
									u
											._offset(a(this).jqmData("field"),
													((i < 0) ? -1 : 1)
															* a(this).jqmData(
																	"amount"))
								})
							}
							if (f.repButton === true) {
								c.on(u.drag.eStart, "div", function(g) {
									j.find(":focus").blur();
									m = [ a(this).jqmData("field"),
											a(this).jqmData("amount") ];
									u.drag.move = true;
									u._dbox_delta = 1;
									u._offset(m[0], m[1], false);
									u._dbox_run_update();
									if (!u.runButton) {
										u.drag.target = m;
										u.runButton = setTimeout(function() {
											u._dbox_run()
										}, 500)
									}
								});
								k.on(u.drag.eStart, "div", function(g) {
									j.find(":focus").blur();
									m = [ a(this).jqmData("field"),
											a(this).jqmData("amount") * -1 ];
									u.drag.move = true;
									u._dbox_delta = -1;
									u._offset(m[0], m[1], false);
									u._dbox_run_update();
									if (!u.runButton) {
										u.drag.target = m;
										u.runButton = setTimeout(function() {
											u._dbox_run()
										}, 500)
									}
								});
								c.on(n.eEndA, function(g) {
									if (n.move) {
										g.preventDefault();
										clearTimeout(u.runButton);
										u.runButton = false;
										n.move = false
									}
								});
								k.on(n.eEndA, function(g) {
									if (n.move) {
										g.preventDefault();
										clearTimeout(u.runButton);
										u.runButton = false;
										n.move = false
									}
								})
							}
						}
					})
})(jQuery);
/*
 * ! jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage CC 3.0 Attribution. May be relicensed without
 * permission/notification. https://github.com/jtsage/jquery-mobile-datebox
 */
(function(a) {
	a.extend(a.mobile.datebox.prototype.options, {
		themeDateHigh : "b",
		themeDatePick : "b",
		themeDate : "a",
		useSetButton : true,
		validHours : false,
		flen : {
			y : 15,
			m : 12,
			d : 15,
			h : 12,
			i : 15,
			a : 3
		}
	});
	a.extend(a.mobile.datebox.prototype, {
		_fbox_pos : function() {
			var b = this, f = null, e = null, d = this.d.intHTML.find(
					".ui-datebox-flipcontent").innerHeight(), c = null;
			b.d.intHTML.find(".ui-datebox-flipcenter").each(function() {
				f = a(this);
				e = f.innerHeight();
				f.css("top", ((d / 2) - (e / 2) + 4) * -1)
			});
			b.d.intHTML.find("ul").each(
					function() {
						f = a(this);
						d = f.parent().innerHeight();
						e = f.find("li").first();
						c = f.find("li").size() * e.outerHeight();
						e.css("marginTop", ((c / 2) - (d / 2) + (e
								.outerHeight() / 2))
								* -1)
					})
		}
	});
	a
			.extend(
					a.mobile.datebox.prototype._build,
					{
						timeflipbox : function() {
							this._build.flipbox.apply(this)
						},
						flipbox : function() {
							var l = this, d = this.options, e, j, m, f, k, g = (l.d.input
									.val() === "") ? l._startOffset(l
									._makeDate(l.d.input.val())) : l
									._makeDate(l.d.input.val()), h = "ui-datebox-", c = a("<div class='ui-overlay-shadow'><ul></ul></div>"), b = a(
									"<div>", {
										"class" : h + "flipcontent"
									});
							if (typeof l.d.intHTML !== "boolean") {
								l.d.intHTML.empty()
							}
							l.d.input.on("datebox", function(n, i) {
								if (i.method === "postrefresh") {
									l._fbox_pos()
								}
							});
							l.d.headerText = ((l._grabLabel() !== false) ? l
									._grabLabel() : ((d.mode === "flipbox") ? l
									.__("titleDateDialogLabel") : l
									.__("titleTimeDialogLabel")));
							l.d.intHTML = a("<span>");
							l.fldOrder = ((d.mode === "flipbox") ? l
									.__("dateFieldOrder") : l
									.__("timeFieldOrder"));
							l._check();
							l._minStepFix();
							if (d.mode === "flipbox") {
								a(
										'<div class="'
												+ h
												+ 'header"><h4>'
												+ l._formatter(l
														.__("headerFormat"),
														l.theDate)
												+ "</h4></div>").appendTo(
										l.d.intHTML)
							}
							l.d.intHTML.append(b);
							for (j = 0; j < l.fldOrder.length; j++) {
								switch (l.fldOrder[j]) {
								case "y":
									m = l._makeEl(c, {
										attr : {
											field : "y",
											amount : 1
										}
									});
									for (e = d.flen.y * -1; e < (d.flen.y + 1); e++) {
										f = (e !== 0) ? ((g.get(0) === (l.theDate
												.get(0) + e)) ? d.themeDateHigh
												: d.themeDate)
												: d.themeDatePick;
										a("<li>", {
											"class" : "ui-body-" + f
										})
												.html(
														"<span>"
																+ (l.theDate
																		.get(0) + e)
																+ "</span>")
												.appendTo(m.find("ul"))
									}
									m.appendTo(b);
									break;
								case "m":
									m = l._makeEl(c, {
										attr : {
											field : "m",
											amount : 1
										}
									});
									for (e = d.flen.m * -1; e < (d.flen.m + 1); e++) {
										k = l.theDate.copy([ 0 ], [ 0, 0, 1 ]);
										k.adj(1, e);
										f = (e !== 0) ? ((g.get(1) === k.get(1) && g
												.get(0) === k.get(0)) ? d.themeDateHigh
												: d.themeDate)
												: d.themeDatePick;
										a("<li>", {
											"class" : "ui-body-" + f
										})
												.html(
														"<span>"
																+ l
																		.__("monthsOfYearShort")[k
																		.getMonth()]
																+ "</span>")
												.appendTo(m.find("ul"))
									}
									m.appendTo(b);
									break;
								case "d":
									m = l._makeEl(c, {
										attr : {
											field : "d",
											amount : 1
										}
									});
									for (e = d.flen.d * -1; e < (d.flen.d + 1); e++) {
										k = l.theDate.copy();
										k.adj(2, e);
										f = (e !== 0) ? ((g.comp() === k.comp()) ? d.themeDateHigh
												: d.themeDate)
												: d.themeDatePick;
										if ((d.blackDates !== false && a
												.inArray(k.iso(), d.blackDates) > -1)
												|| (d.blackDays !== false && a
														.inArray(k.getDay(),
																d.blackDays) > -1)) {
											f += " " + h + "griddate-disable"
										}
										a("<li>", {
											"class" : "ui-body-" + f
										}).html(
												"<span>" + k.getDate()
														+ "</span>").appendTo(
												m.find("ul"))
									}
									m.appendTo(b);
									break;
								case "h":
									m = l._makeEl(c, {
										attr : {
											field : "h",
											amount : 1
										}
									});
									for (e = d.flen.h * -1; e < (d.flen.h + 1); e++) {
										k = l.theDate.copy();
										k.adj(3, e);
										f = (e !== 0) ? d.themeDate
												: d.themeDatePick;
										if (d.validHours !== false
												&& a.inArray(k.get(3),
														d.validHours) < 0) {
											f += " " + h + "griddate-disable"
										}
										a("<li>", {
											"class" : "ui-body-" + f
										})
												.html(
														"<span>"
																+ ((l
																		.__("timeFormat") === 12) ? ((k
																		.get(3) === 0) ? "12"
																		: ((k
																				.get(3) < 13) ? k
																				.get(3)
																				: (k
																						.get(3) - 12)))
																		: k
																				.get(3))
																+ "</span>")
												.appendTo(m.find("ul"))
									}
									m.appendTo(b);
									break;
								case "i":
									m = l._makeEl(c, {
										attr : {
											field : "i",
											amount : d.minuteStep
										}
									});
									for (e = d.flen.i * -1; e < (d.flen.i + 1); e++) {
										k = l.theDate.copy();
										k.adj(4, (e * d.minuteStep));
										f = (e !== 0) ? d.themeDate
												: d.themeDatePick;
										a("<li>", {
											"class" : "ui-body-" + f
										}).html(
												"<span>" + l._zPad(k.get(4))
														+ "</span>").appendTo(
												m.find("ul"))
									}
									m.appendTo(b);
									break;
								case "a":
									if (l.__("timeFormat") !== 12) {
										break
									}
									m = l._makeEl(c, {
										attr : {
											field : "a",
											amount : 1
										}
									});
									k = a("<li class='ui-body-" + d.themeDate
											+ "'><span> </span></li>");
									for (e = 0; e < d.flen.a; e++) {
										k.clone().appendTo(m.find("ul"))
									}
									if (l.theDate.get(3) < 12) {
										k.clone().appendTo(m.find("ul"))
									}
									f = (l.theDate.get(3) > 11) ? [
											d.themeDate, d.themeDatePick ] : [
											d.themeDatePick, d.themeDate ];
									a("<li>", {
										"class" : "ui-body-" + f[0]
									}).html(
											"<span>" + l.__("meridiem")[0]
													+ "</span>").appendTo(
											m.find("ul"));
									a("<li>", {
										"class" : "ui-body-" + f[1]
									}).html(
											"<span>" + l.__("meridiem")[1]
													+ "</span>").appendTo(
											m.find("ul"));
									if (l.theDate.get(3) > 11) {
										k.clone().appendTo(m.find("ul"))
									}
									for (e = 0; e < d.flen.a; e++) {
										k.clone().appendTo(m.find("ul"))
									}
									m.appendTo(b);
									break
								}
							}
							a("<div>", {
								"class" : h + "flipcenter ui-overlay-shadow"
							}).css("pointerEvents", "none").appendTo(
									l.d.intHTML);
							if (d.useSetButton || d.useClearButton) {
								j = a("<div>", {
									"class" : h + "controls"
								});
								if (d.useSetButton) {
									a(
											'<a href="#">'
													+ ((d.mode === "flipbox") ? l
															.__("setDateButtonLabel")
															: l
																	.__("setTimeButtonLabel"))
													+ "</a>")
											.appendTo(j)
											.buttonMarkup({
												theme : d.theme,
												icon : "check",
												iconpos : "left",
												corners : true,
												shadow : true
											})
											.on(
													d.clickEventAlt,
													function(i) {
														i.preventDefault();
														if (l.dateOK === true) {
															l.d.input
																	.trigger(
																			"datebox",
																			{
																				method : "set",
																				value : l
																						._formatter(
																								l
																										.__fmt(),
																								l.theDate),
																				date : l.theDate
																			});
															l.d.input
																	.trigger(
																			"datebox",
																			{
																				method : "close"
																			})
														}
													})
								}
								if (d.useClearButton) {
									a(
											'<a href="#">'
													+ l.__("clearButton")
													+ "</a>").appendTo(j)
											.buttonMarkup({
												theme : d.theme,
												icon : "delete",
												iconpos : "left",
												corners : true,
												shadow : true
											}).on(d.clickEventAlt, function(i) {
												i.preventDefault();
												l.d.input.val("");
												l.d.input.trigger("datebox", {
													method : "clear"
												});
												l.d.input.trigger("datebox", {
													method : "close"
												})
											})
								}
								if (d.useCollapsedBut) {
									j.addClass("ui-datebox-collapse")
								}
								j.appendTo(l.d.intHTML)
							}
							if (l.wheelExists) {
								l.d.intHTML.on("mousewheel",
										".ui-overlay-shadow", function(i, n) {
											i.preventDefault();
											l._offset(a(this).jqmData("field"),
													((n < 0) ? -1 : 1)
															* a(this).jqmData(
																	"amount"))
										})
							}
							l.d.intHTML
									.on(
											l.drag.eStart,
											"ul",
											function(n, i) {
												if (!l.drag.move) {
													if (typeof i !== "undefined") {
														n = i
													}
													l.drag.move = true;
													l.drag.target = a(this)
															.find("li").first();
													l.drag.pos = parseInt(
															l.drag.target
																	.css(
																			"marginTop")
																	.replace(
																			/px/i,
																			""),
															10);
													l.drag.start = l.touch ? n.originalEvent.changedTouches[0].pageY
															: n.pageY;
													l.drag.end = false;
													n.stopPropagation();
													n.preventDefault()
												}
											});
							l.d.intHTML
									.on(
											l.drag.eStart,
											"." + h + "flipcenter",
											function(i) {
												if (!l.drag.move) {
													l.drag.target = l.touch ? i.originalEvent.changedTouches[0].pageX
															- a(i.currentTarget)
																	.offset().left
															: i.pageX
																	- a(
																			i.currentTarget)
																			.offset().left;
													l.drag.tmp = l.d.intHTML
															.find(
																	"."
																			+ h
																			+ "flipcenter")
															.innerWidth()
															/ ((a.inArray("a",
																	l.fldOrder) > -1 && l
																	.__("timeFormat") !== 12) ? l.fldOrder.length - 1
																	: l.fldOrder.length);
													a(
															l.d.intHTML
																	.find("ul")
																	.get(
																			parseInt(
																					l.drag.target
																							/ l.drag.tmp,
																					10)))
															.trigger(
																	l.drag.eStart,
																	i)
												}
											})
						}
					});
	a
			.extend(
					a.mobile.datebox.prototype._drag,
					{
						timeflipbox : function() {
							this._drag.flipbox.apply(this)
						},
						flipbox : function() {
							var b = this, d = this.options, c = this.drag;
							a(document)
									.on(
											c.eMove,
											function(f) {
												if (c.move
														&& (d.mode === "flipbox" || d.mode === "timeflipbox")) {
													c.end = b.touch ? f.originalEvent.changedTouches[0].pageY
															: f.pageY;
													c.target
															.css(
																	"marginTop",
																	(c.pos
																			+ c.end - c.start)
																			+ "px");
													f.preventDefault();
													f.stopPropagation();
													return false
												}
											});
							a(document)
									.on(
											c.eEnd,
											function(f) {
												if (c.move
														&& (d.mode === "flipbox" || d.mode === "timeflipbox")) {
													c.move = false;
													if (c.end !== false) {
														f.preventDefault();
														f.stopPropagation();
														c.tmp = c.target
																.parent()
																.parent();
														b
																._offset(
																		c.tmp
																				.jqmData("field"),
																		(parseInt(
																				(c.start - c.end)
																						/ c.target
																								.innerHeight(),
																				10) * c.tmp
																				.jqmData("amount")))
													}
													c.start = false;
													c.end = false
												}
											})
						}
					})
})(jQuery);
/*
 * ! jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage CC 3.0 Attribution. May be relicensed without
 * permission/notification. https://github.com/jtsage/jquery-mobile-datebox
 */
(function(a) {
	a.extend(a.mobile.datebox.prototype.options, {
		themeButton : "a",
		themeInput : "a",
		useSetButton : true,
		repButton : true,
		durationSteppers : {
			d : 1,
			h : 1,
			i : 1,
			s : 1
		}
	});
	a.extend(a.mobile.datebox.prototype, {
		_durbox_run : function() {
			var b = this;
			b.drag.didRun = true;
			b._offset(b.drag.target[0], b.drag.target[1], false);
			b._durbox_run_update();
			b.runButton = setTimeout(function() {
				b._durbox_run()
			}, 100)
		},
		_durbox_run_update : function() {
			var c = this, e, b = [], d = {
				d : 60 * 60 * 24,
				h : 60 * 60,
				i : 60
			};
			e = c.theDate.getEpoch() - c.initDate.getEpoch();
			if (e < 0) {
				e = 0;
				c.theDate.setTime(c.initDate.getTime())
			}
			c.lastDuration = e;
			b[0] = parseInt(e / d.d, 10);
			e = e % d.d;
			b[1] = parseInt(e / d.h, 10);
			e = e % d.h;
			b[2] = parseInt(e / d.i, 10);
			b[3] = e % d.i;
			c.d.divIn.find("input").each(function() {
				switch (a(this).parent().jqmData("field")) {
				case "d":
					a(this).val(b[0]);
					break;
				case "h":
					a(this).val(b[1]);
					break;
				case "i":
					a(this).val(b[2]);
					break;
				case "s":
					a(this).val(b[3]);
					break
				}
			})
		},
		_durbox_valid : function(b) {
			if (b.toString().search(/^[0-9]+$/) === 0) {
				return parseInt(b, 10)
			}
			return 0
		},
		_durbox_enter : function(d) {
			var b = this, c = b.initDate.getEpoch();
			b.d.intHTML.find("input").each(function() {
				switch (a(this).parent().jqmData("field")) {
				case "d":
					c += (60 * 60 * 24) * b._durbox_valid(a(this).val());
					break;
				case "h":
					c += (60 * 60) * b._durbox_valid(a(this).val());
					break;
				case "i":
					c += (60) * b._durbox_valid(a(this).val());
					break;
				case "s":
					c += b._durbox_valid(a(this).val());
					break
				}
			});
			b.theDate.setTime(c * 1000);
			b.refresh()
		}
	});
	a
			.extend(
					a.mobile.datebox.prototype._build,
					{
						durationbox : function() {
							var u = this, n = this.drag, f = this.options, l, s, h = [
									0, 0, 0, 0 ], m, t = {
								d : 60 * 60 * 24,
								h : 60 * 60,
								i : 60
							}, q = "ui-datebox-", r = a("<div>"), c = a("<fieldset>"), j = r
									.clone().addClass("ui-datebox-dboxin"), k = c
									.clone(), e = a(
									"<input type='" + u.inputType + "' />")
									.addClass(
											"ui-input-text ui-corner-all ui-shadow-inset ui-body-"
													+ f.themeInput), p = a("<div><a href='#'> </a></div>"), b = {
								theme : f.themeButton,
								icon : "plus",
								iconpos : "bottom",
								corners : true,
								shadow : true
							}, d = a.extend({}, b, {
								icon : "minus",
								iconpos : "top"
							});
							if (typeof u.d.intHTML !== "boolean") {
								u.d.intHTML.empty().remove()
							}
							u.d.headerText = ((u._grabLabel() !== false) ? u
									._grabLabel() : u
									.__("titleDateDialogLabel"));
							u.d.intHTML = a("<span>");
							if (u.inputType !== "number") {
								e.attr("pattern", "[0-9]*")
							}
							u.fldOrder = u.__("durationOrder");
							for (l = 0; l <= u.fldOrder.length; l++) {
								switch (u.fldOrder[l]) {
								case "d":
								case "h":
								case "i":
								case "s":
									s = a.inArray(u.fldOrder[l], [ "d", "h",
											"i", "s" ]);
									a("<div>")
											.jqmData("field", u.fldOrder[l])
											.addClass(
													"ui-block-"
															+ [ "a", "b", "c",
																	"d" ][l])
											.append(e.clone())
											.appendTo(j)
											.prepend(
													"<label>"
															+ u
																	.__("durationLabel")[s]
															+ "</label>");
									u._makeEl(p, {
										attr : {
											field : u.fldOrder[l]
										}
									})
											.addClass(
													"ui-block-"
															+ [ "a", "b", "c",
																	"d" ][l])
											.buttonMarkup(b).appendTo(c);
									u._makeEl(p, {
										attr : {
											field : u.fldOrder[l]
										}
									})
											.addClass(
													"ui-block-"
															+ [ "a", "b", "c",
																	"d" ][l])
											.buttonMarkup(d).appendTo(k);
									break
								}
							}
							l = u.theDate.getEpoch() - u.initDate.getEpoch();
							if (l < 0) {
								l = 0;
								u.theDate.setTime(u.initDate.getTime())
							}
							u.lastDuration = l;
							h[0] = parseInt(l / t.d, 10);
							l = l % t.d;
							h[1] = parseInt(l / t.h, 10);
							l = l % t.h;
							h[2] = parseInt(l / t.i, 10);
							h[3] = l % t.i;
							j.find("input").each(function() {
								switch (a(this).parent().jqmData("field")) {
								case "d":
									a(this).val(h[0]);
									break;
								case "h":
									a(this).val(h[1]);
									break;
								case "i":
									a(this).val(h[2]);
									break;
								case "s":
									a(this).val(h[3]);
									break
								}
							});
							u.d.divIn = j;
							c
									.addClass(
											"ui-grid-"
													+ [ "a", "b", "c" ][u.fldOrder.length - 2])
									.appendTo(u.d.intHTML);
							j
									.addClass(
											"ui-grid-"
													+ [ "a", "b", "c" ][u.fldOrder.length - 2])
									.appendTo(u.d.intHTML);
							k
									.addClass(
											"ui-grid-"
													+ [ "a", "b", "c" ][u.fldOrder.length - 2])
									.appendTo(u.d.intHTML);
							if (f.mobVer >= 140) {
								k.find("div").css({
									"min-height" : "2.3em"
								});
								c.find("div").css({
									"min-height" : "2.3em"
								})
							}
							if (f.useSetButton || f.useClearButton) {
								s = a("<div>", {
									"class" : q + "controls"
								});
								if (f.useSetButton) {
									a(
											'<a href="#">'
													+ u
															.__("setDurationButtonLabel")
													+ "</a>")
											.appendTo(s)
											.buttonMarkup({
												theme : f.theme,
												icon : "check",
												iconpos : "left",
												corners : true,
												shadow : true
											})
											.on(
													f.clickEventAlt,
													function(g) {
														g.preventDefault();
														u.d.input
																.trigger(
																		"datebox",
																		{
																			method : "set",
																			value : u
																					._formatter(
																							u
																									.__fmt(),
																							u.theDate),
																			date : u.theDate
																		});
														u.d.input
																.trigger(
																		"datebox",
																		{
																			method : "close"
																		})
													})
								}
								if (f.useClearButton) {
									a(
											'<a href="#">'
													+ u.__("clearButton")
													+ "</a>").appendTo(s)
											.buttonMarkup({
												theme : f.theme,
												icon : "delete",
												iconpos : "left",
												corners : true,
												shadow : true
											}).on(f.clickEventAlt, function(g) {
												g.preventDefault();
												u.d.input.val("");
												u.d.input.trigger("datebox", {
													method : "clear"
												});
												u.d.input.trigger("datebox", {
													method : "close"
												})
											})
								}
								if (f.useCollapsedBut) {
									s.addClass("ui-datebox-collapse")
								}
								s.appendTo(u.d.intHTML)
							}
							if (f.repButton === false) {
								c.on(f.clickEvent, "div", function(g) {
									j.find(":focus").blur();
									g.preventDefault();
									u._offset(a(this).jqmData("field"),
											f.durationSteppers[a(this).jqmData(
													"field")])
								});
								k.on(f.clickEvent, "div", function(g) {
									j.find(":focus").blur();
									g.preventDefault();
									u._offset(a(this).jqmData("field"),
											f.durationSteppers[a(this).jqmData(
													"field")]
													* -1)
								})
							}
							j.on("change", "input", function() {
								u._durbox_enter(a(this))
							});
							if (u.wheelExists) {
								j
										.on(
												"mousewheel",
												"input",
												function(g, i) {
													g.preventDefault();
													u
															._offset(
																	a(this)
																			.parent()
																			.jqmData(
																					"field"),
																	((i < 0) ? -1
																			: 1)
																			* f.durationSteppers[a(
																					this)
																					.parent()
																					.jqmData(
																							"field")])
												})
							}
							if (f.repButton === true) {
								c.on(u.drag.eStart, "div", function(g) {
									j.find(":focus").blur();
									m = [
											a(this).jqmData("field"),
											f.durationSteppers[a(this).jqmData(
													"field")] ];
									u.drag.move = true;
									u._dbox_delta = 1;
									u._offset(m[0], m[1], false);
									u._durbox_run_update();
									if (!u.runButton) {
										u.drag.target = m;
										u.runButton = setTimeout(function() {
											u._durbox_run()
										}, 500)
									}
								});
								k.on(u.drag.eStart, "div", function(g) {
									j.find(":focus").blur();
									m = [
											a(this).jqmData("field"),
											f.durationSteppers[a(this).jqmData(
													"field")]
													* -1 ];
									u.drag.move = true;
									u._dbox_delta = -1;
									u._offset(m[0], m[1], false);
									u._durbox_run_update();
									if (!u.runButton) {
										u.drag.target = m;
										u.runButton = setTimeout(function() {
											u._durbox_run()
										}, 500)
									}
								});
								c.on(n.eEndA, function(g) {
									if (n.move) {
										g.preventDefault();
										clearTimeout(u.runButton);
										u.runButton = false;
										n.move = false
									}
								});
								k.on(n.eEndA, function(g) {
									if (n.move) {
										g.preventDefault();
										clearTimeout(u.runButton);
										u.runButton = false;
										n.move = false
									}
								})
							}
						}
					})
})(jQuery);
/*
 * ! jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage CC 3.0 Attribution. May be relicensed without
 * permission/notifcation. https://github.com/jtsage/jquery-mobile-datebox
 * 
 * Translation by: ChiElvis <elvis311@msn.com>, josher19 <crowdin>
 * 
 */
jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'zh-CN' : {
		setDateButtonLabel : "设置日期",
		setTimeButtonLabel : "设置时间",
		setDurationButtonLabel : "设置持续时间",
		calTodayButtonLabel : "选择今天日期",
		titleDateDialogLabel : "选择日期",
		titleTimeDialogLabel : "选择时间",
		daysOfWeek : [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ],
		daysOfWeekShort : [ "日", "一", "二", "三", "四", "五", "六" ],
		monthsOfYear : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月",
				"十月", "十一月", "十二月" ],
		monthsOfYearShort : [ "一", "二", "三", "四", "五", "六", "七", "八", "九", "十",
				"十一", "十二" ],
		durationLabel : [ "天", "小时", "分钟", "秒" ],
		durationDays : [ "天", "天" ],
		tooltip : "开启日期选取器",
		nextMonth : "下个月",
		prevMonth : "上个月",
		timeFormat : 24,
		headerFormat : '%A, %B %-d, %Y',
		dateFieldOrder : [ 'm', 'd', 'y' ],
		timeFieldOrder : [ 'h', 'i', 'a' ],
		slideFieldOrder : [ 'y', 'm', 'd' ],
		dateFormat : "%Y-%m-%d",
		useArabicIndic : false,
		isRTL : false,
		calStartDay : 0,
		clearButton : "清除",
		durationOrder : [ 'd', 'h', 'i', 's' ],
		meridiem : [ "上午", "下午" ],
		timeOutput : "%k:%M",
		durationFormat : "%Dd %DA, %Dl:%DM:%DS",
		calDateListLabel : "其他日期",
		calHeaderFormat : "%B %Y"
	}
});
jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang : 'zh-CN'
});
/*
 * ! mobile.common.js
 */
function confirmDialog(text, callback) {
	var popupDialogId = 'popupDialog';
	$(
			'<div data-role="popup" id="'
					+ popupDialogId
					+ '" data-confirmed="no" data-transition="pop" data-overlay-theme="b" data-theme="b" data-dismissible="false" style="max-width:500px;"> \
			<div data-role="header" class="ui-content myInfo">\
			提示\
	      </div>\
			<div data-role="content " id="myInfoContent" class="ui-content">\
			'
					+ text
					+ '\
	      </div>\
	      <div data-role="footer" data-theme="a">\
			 <div data-role="navbar">\
		      <ul>\
		        <li><a href="#" class="optionCancel" data-rel="back" data-transition="flow">取消</a></li>\
				<li><a href="#" class="optionConfirm" data-rel="back">确定</a></li>\
		      </ul>\
		    </div>\
	      </div>\
	  </div>')
			.appendTo($.mobile.pageContainer);
	var popupDialogObj = $('#' + popupDialogId);
	popupDialogObj.trigger('create');
	popupDialogObj
			.popup({
				afterclose : function(event, ui) {
					popupDialogObj.find(".optionConfirm").first().off('click');
					var isConfirmed = popupDialogObj.attr('data-confirmed') === 'yes' ? true
							: false;
					$(event.target).remove();
					if (isConfirmed && callback) {
						callback();
					}
				}
			});
	popupDialogObj.popup('open');
	popupDialogObj.find(".optionConfirm").first().on('click', function() {
		popupDialogObj.attr('data-confirmed', 'yes');
	});
}
function loadCss(id, url) {
	if (!document.getElementById(id)) {
		var elem = document.createElement("link");
		elem.id = id
		elem.rel = "stylesheet";
		elem.type = "text/css";
		elem.href = url;
		document.body.appendChild(elem);
	}
}
function loadJs(id, url) {
	if (!document.getElementById(id)) {
		var elem = document.createElement("script");
		elem.id = id;
		elem.src = url;
		document.body.appendChild(elem);
	}
}