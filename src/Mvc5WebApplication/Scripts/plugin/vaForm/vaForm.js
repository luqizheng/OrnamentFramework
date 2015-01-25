//只对这个项目有效。
(function () {
    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            //Need ajax form 
            define(['jquery'], factory);
        } else if (jQuery && !jQuery.fn.vafrom) {
            factory(jQuery);
        }
    })(function ($) {

        $.fn.serializeObject = function () {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };

        $.fn.vaform = function (opt) {
            var $form = $(this);//.removeData("validator").removeData("unobtrusiveValidation");
            var opts = $.extend({}, defaultSetting, opt);
            if (!opts.url) {
                opts.url = $(this).attr("action");
            }
            //$.validator.unobtrusive.parse($form.parent());
            var $formSetting = $form.data("validator");
            /*var current = $form;
            while (!$formSetting) {
                current = current.parent();
                $formSetting = current.data("validator");
                if (!$formSetting && current.context.nodeName == "#document") {
                    return $form;
                }
            }*/
            //$.validator.unobtrusive.parse(document);
            
            try {
                $formSetting.settings.submitHandler = function (e) {

                    var data = $form.serializeObject();
                    try {
                        opts.before.call($form, data);
                    } catch (e) {
                        console.log("before fails.");
                    }

                    $.post(opts.url, data, function (d) {

                        opts.success.call($form, d);

                    }).done(function () {

                        opts.done.call($form);

                    }).fail(function (status) {
                        opts.done.call($form);
                        if (status.status == 400) {
                            var errors = {};
                            $(status.responseJSON).each(function () {
                                errors[this.key] = this.errors.join(";");
                            });
                            $form.validate().showErrors(errors);

                        }
                    });

                };
            } catch (e) {
                console.log($form.attr("id")+" hasn't find validation plugin.error:"+e);
            }


            return $form;
        };

        var defaultSetting = {
            url: false,
            before: function () { },
            done: function () { },
            success: function () { },
        };

        return $;
    });

})();