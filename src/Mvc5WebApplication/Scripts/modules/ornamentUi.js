define(["jquery", "bsvalid"], function ($) {
    //jquery ui datepicket and dateRange 

    return {
        //每次ajax loading page 的时候都会执行，主要是根据attribute 生成控件
        setup: function () {
            dateRange();
            setupSpinner();
            txtMaxLength();
        },
        registry: function () {//加载基本框架的时候进行加载。
            RegistryDate();
        }
    };

    function txtMaxLength() {

        var inputMaxLength = $("#content input[type=text][maxlength],textarea[maxlength]");
        /*console.log(inputMaxLength.length + "found in type=text");*/
        if (inputMaxLength.length != 0) {
            require(["maxlength"], function () {
                inputMaxLength.maxlength({
                    alwaysShow: true
                });
            });
        }
    }

    function dateRange() {

        //return;
        //初始化-jqueryui datepicker需要修改的。
        // -- 在 app.js中，smartAdmin使用 datepicket来自动初始化jqueryui的datepicker，而且ornamenui实在初始化之后再次更新dateRange的，因此需要重新执行一次
        $("#content [data-val-rangedate]").each(function () {
            var $this = $(this);
            var format = $this.data("valRangedateDateformat")||"yy/mm/dd";
            var min = $.datepicker.parseDate(format, $this.data("valRangedateMin"));
            var max = $.datepicker.parseDate(format, $this.data("valRangedateMax"));
            $this.datepicker("option", 'dateFormat', format);
            $this.datepicker("option", 'minDate', min);
            $this.datepicker("option", 'maxDate', max);
        });

    }

    function setupSpinner() {
        $("#content .spinner").each(function() {
            var $this = $(this),
             options= {
                min: $this.data("valRangeMin") || -999999,
                max: $this.data("valRangeMax")||999999,
                step: $this.data("valRangeStep")||1,
             }
            console.log(JSON.stringify(options));
            $this.spinner(options);

        });
    }


    function RegistryDate() {
        //增加 新的rangeDate的 validator。
        $.validator.addMethod('rangeDate',
            function (value, element, param) {
                if (!value) {
                    return true; // not testing 'is required' here!
                }
                try {
                    var dateValue = $.datepicker.parseDate("dd/mm/yy", value);
                }
                catch (e) {
                    return false;
                }
                return param.min <= dateValue && dateValue <= param.max;
            });

        // The adapter to support ASP.NET MVC unobtrusive validation
        $.validator.unobtrusive.adapters.add('rangedate', ['min', 'max', "format"],
     function (options) {
         var params = {
             min: $.datepicker.parseDate(options.params.format, options.params.min),
             max: $.datepicker.parseDate(options.params.format, options.params.max),
             format: param.format
         };

         options.rules['rangeDate'] = params;
         if (options.message) {
             options.messages['rangeDate'] = options.message;
         }
     });
    }
})