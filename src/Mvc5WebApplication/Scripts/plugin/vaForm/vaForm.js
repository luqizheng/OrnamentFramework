(function () {
    //只对这个项目有效。
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
            var $form = $(this)
                .removeData("validator")
                .removeData("unobtrusiveValidation"),
            opts = $.extend({}, widget, opt);
            if (!opts.url) {
                opts.url = $(this).attr("action");
            }
            $.validator.unobtrusive.parse(this);

            $form.validate().settings.submitHandler = function (e) {
                var data = $form.serializeObject();
                opts.before.call($form,data);

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
                e.preventDefault();
            };
            return $form;
        };

        var widget = {
            url: false,
            before: function () { },
            done: function () { },
            success: function () { },
        };
        
        return $;
    });

})();