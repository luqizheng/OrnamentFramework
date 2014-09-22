(function() {
    //只对这个项目有效。
    (function(factory) {
        if (typeof define === 'function' && define.amd) {
            //Need ajax form 
            define(['jquery'], factory);
        } else if (jQuery && !jQuery.fn.vafrom) {
            factory(jQuery);
        }
    })(function ($) {

        $.fn.vaform = function (opt) {
            var $form = $(this)
                .removeData("validator")
                .removeData("unobtrusiveValidation"),
            opts = $.extend({}, widget, opt);
            $.validator.unobtrusive.parse(this);

            $form.validate().settings.submitHandler = function (form) {
                
                var data = $form.serializeObject();
                opts.before.call(form, data);
                $.post(opts.url, data, function (d) {
                    opts.success.call(this, d, form);
                }).done(function () {
                    opts.done.call(this, $form);
                }).fail(function (status) {
                    if (status.status == 400) {
                        var errors = {};
                        $(status.responseJSON).each(function () {
                            errors[this.key] = this.errors.join(";");
                        });
                        $form.validate().showErrors(errors);
                    }
                });
            };
            return $form;
        };

        var widget = {
            url:"",
            before: function() {},
            done: function() {},
            success: function() {},
        };
    });

})();