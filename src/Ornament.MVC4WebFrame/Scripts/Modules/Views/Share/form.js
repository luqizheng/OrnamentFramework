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
        $(this).valid();
        $(this).bootstrapMakeUp();
    });

    $(document).ready(function () {

        //for time input.
        $('input.jqui-time,input.jqui-spinner,textarea[max],.jqui-date').each(function () {

            var $this = $(this), format, max;
            if ($this.hasClass("jqui-time")) {
                format = $this.attr("timeFormat");
                var inputMask = $this.attr("inputmask-format");
                $this.timepicker({ 'timeFormat': format }).inputmask(inputMask);
                return true;
            }

            if ($this.hasClass("jqui-spinner")) {
                var min = $this.attr("data-val-range-min");
                max = $this.attr("data-val-range-max");
                $(this).spinner({
                    numberFormat: "n",
                    step: $this.attr("jq-step"),
                    max: max ? max : 32000000,
                    min: min ? min : -3200000
                });
                return true;
            }

            if ($this.hasClass("jqui-date")) {
                
                var $target=$("input", $this);
                format = $target.attr("data-date-format");
                $target.datepicker({ dateFormat: format });
                return true;
            }

            max = $this.attr("max");
            if ($this[0].nodeName == "TEXTAREA" && max) {
                require("inputlimiter")($);
                $this.inputlimiter({ limit: max });
                return true;
            }
        });


    });


});