/* 所有与form有关的 的UI 都在这里定义*/

define(function (require) {
    //input mask
    var $ = require("jquery");
    require("jqueryui")($);
    require("inputmask")($);
    require("timepicker")($);
    require("validate")($);
    require("unobtrusive")($);
    

    //form for boostratp
    $('form').bootstrapMakeUp().submit(function () {
        $(this).valid(); $(this).bootstrapMakeUp();
    });

    $(document).ready(function () {
        //for time input.
        $('input.jqui-time').each(function () {
            var $this = $(this), format = $this.attr("timeFormat"), inputMask = $this.attr("inputmask-format");
            $this.timepicker({ 'timeFormat': format }).inputmask(inputMask);
        });

        //for date input
        $(".jqui-spinner").each(function () {
            var $this = $(this), min = $this.attr("data-val-range-min"), max = $this.attr("data-val-range-max");
            $(this).spinner({
                numberFormat: "n",
                step: $this.attr("jq-step"),
                max: max ? max : 32000000,
                min: min ? min : -3200000
            });
        });
        $(".jqui-date input").each(function () {
            var $this = $(this), format = $this.attr("data-date-format");
            $this.datepicker({ dateFormat: format });
        });
        
        $("textarea[max]").each(function () {
            require("inputlimiter")($);
            $(this).inputlimiter({ limit: $(this).attr("max") });
        });
    });

});