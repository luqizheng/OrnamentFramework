(function ($) {

    var defaults = {
        success: false
    };
  
    $.fn.periodDailog = function (options) {

        var result, args = arguments,

            target = $(this).each(function () {
                var $this = $(this), data = $this.data('periodDailog');
                if (!data) {
                    var inc = new periodDailog($(this), $.extend({}, defaults, options));
                    $(this).data("periodDailog", inc);
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

    function periodDailog($element, option) {

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
        $element.on("hide", { inc: self }, events.validation)
            .find("[role=ok],[role=cancel]").click(function () {
                self.dialogCancel = $(this).attr("role") == "cancel";
                $element.modal("hide");
            });
    }

    periodDailog.prototype = {
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
        show: function (bDateChoice, data) {

            this.element.find("[role=dateSelector]").toggle(bDateChoice);
            this.element.find("input,textarea").val("")
                .closest(".control-group").removeClass("error");

            if (data) {
                this.setPeriodDailogValue(data);
            }
            this.element.modal("show");
        }
    };

    var events = {
        validation: function (e) {

            if (e.data.inc.dialogCancel)
                return true;

            var inc = e.data.inc, result = inc.getPeriodDailogValue();
            var vStart = result.start != "" && result.start <= result.end;
            var vEnd = result.end != "", inputs = $(this).find("input,textarea");
            if (!vStart) {
                $(inputs[1]).closest(".control-group").addClass("error");
            }
            if (!vEnd) {
                $(inputs[2]).closest(".control-group").addClass("error");
            }
            if (!vEnd || !vStart) {
                return false;
            }
            inc.options.success(result);
        }
    };



})(jQuery);