

(function ($) {

    var defaults = {
        success: false,
        validate: function() {
            return true;
        },
        onShow: function() {
            return true;
        }
    };
    $.fn.confirm = function (options) {

        var result, args = arguments,

            target = $(this).each(function () {
                var $this = $(this), data = $this.data('confirm');
                if (!data) {
                    var inc = new confirm($(this), $.extend({}, defaults, options));
                    $(this).data("confirm", inc);
                }

                if (typeof options == 'string') {
                    var a = $.makeArray(args);
                    a.shift();
                    var func = data[options];
                    if ($.isFunction(func)) {
                        result = data[options].apply(data, a);
                    }
                    //it should be set or get option.
                    if (args.length > 1)
                        data.options[options] = args[1];
                    else
                        result = data.options[options];
                }
                return result || target;
            });
    };

    function confirm($element, option) {

        this.options = option;
        this.dialogCancel = false;
        this.element = $element;
        var self = this;
        this.element.keypress(function (e) {
            if (e.keyCode == 13) {
                $element.find("[role=ok]").click();
                e.preventDefault();
                e.stopPropagation();
            }
        });

        $element.on("hide", { inc: self },
            function (e) {
                var inc = e.data.inc,
                 uiObject = inc.getPeriodDailogValue();
                var r = option.validate.call(this, uiObject);
                if (r && !inc.dialogCancel) {
                    self.options.success.call(this, uiObject);
                }
                return r;
            })
            .on("show", { inc: self }, option.onShow)
                .find("[role=ok],[role=cancel]").click(function () {
                    self.dialogCancel    = $(this).attr("role") == "cancel";
                    $element.modal("hide");
                });
    }

    confirm.prototype = {
        element: false,
        options: false,
        dialogCancel: false,
        getPeriodDailogValue: function () {
            var result = {};

            $(this.element).find("input,textarea").each(function () {
                var $this = $(this), $group = $this.closest("control-group");
                if (!$group.hasClass("hide")) {
                    result[$this.attr("role")] = $this.val().replace(/\_/g, "0");
                }
            });
            return result;
        },
        setPeriodDailogValue: function (r) {
            $(this.element).find("input,textarea").each(function () {
                var $this = $(this), role = $this.attr("role");
                $this.val(r[role]);
            });
        },
        show: function (data) {
            if (data) {
                this.setPeriodDailogValue(data);
            }
            this.element.modal("show");
        }
    };
})(jQuery);