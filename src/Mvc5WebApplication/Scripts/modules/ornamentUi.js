define(["jquery", "bsvalid", "vaform"], function ($) {
    //jquery ui datepicket and dateRange 
    return {
        //每次ajax loading page 的时候都会执行，主要是根据attribute 生成控件
        setup: function () {
            $("#content input,#content textarea").each(function () {
                var $this = $(this);
                dateRange($this) || setupSpinner($this) || txtMaxLength($this);
            });

        },
        registry: function () {//加载基本框架的时候进行加载。
            RegistryDate();
        }
    };

    function txtMaxLength($this) {
        //console.log("maxlength:" + $this.context.nodeName);
        var maxlength = $this.attr("maxlength");
        if (!maxlength) {
            maxlength = $this.attr("data-val-maxlength-max");
            if (maxlength) {
                $this.attr("maxlength", maxlength);
            }
        }
        if (maxlength) {
            //console.log($this.context.nodeName + "_" + $this.attr("id") + ": maxlength inited");

            require(["maxlength"], function () {
                $this.maxlength({
                    alwaysShow: true
                });
            });
            return true;
        }
        return false;
    }

    function dateRange($this) {
       // console.log("dateRange:" + $this.context.nodeName + "_" + $this.attr("id"));
        //return;
        //初始化-jqueryui datepicker需要修改的。
        // -- 在 app.js中，smartAdmin使用 datepicket来自动初始化jqueryui的datepicker，而且ornamenui实在初始化之后再次更新dateRange的，因此需要重新执行一次
        if ($this.hasClass("orn-datepicker")) {
            var format = $this.data("valRangedateDateformat") || "yy/mm/dd";
            var options= {
                maxDate: $this.data("valRangedateMax"),
                minDate: $this.data("valRangedateMin"),
                dateFormat: format
            }
            $this.datepicker(options);
           // console.log($this.context.nodeName + "_" + $this.attr("id") + ": dateRange inited");
            return true;
        }
        return false;

    }

    function setupSpinner($this) {
        //console.log("setupSpinner:" + $this.context.nodeName + "_" + $this.attr("id"));
        if ($this.hasClass("spinner")) {
            var options = {
                min: $this.data("valRangeMin") || -999999,
                max: $this.data("valRangeMax") || 999999,
                step: $this.data("valRangeStep") || 1,
            }
            if ($this.hasClass("money")) {
                options.numberFormat = "c";
            }
            //console.log($this.context.nodeName + "_" + $this.attr("id") + ":" + JSON.stringify(options));
            $this.spinner(options);
            return true;
        }
        return false;
    }


    function RegistryDate() {
        //增加 新的rangeDate的 validator。
        $.validator.addMethod('rangeDate',
            function (value, element, param) {
                if (!value) {
                    return true; // not testing 'is required' here!
                }
                try {
                    var format = $(element).data("valRangedateDateformat");
                    var dateValue = $.datepicker.parseDate(format, value);
                }
                catch (e) {
                    return false;
                }
                return param.min <= dateValue && dateValue <= param.max;
            });

        // The adapter to support ASP.NET MVC unobtrusive validation
        $.validator.unobtrusive.adapters.add('rangedate', ['min', 'max', "dateformat", "maxdate", "mindate"],
            function (options) {
                options.params.dateformat = options.params.dateformat || "yy/mm/dd";
                options.params.mindate = options.params.mindate || "1901/01/01";
                options.params.maxdate = options.params.maxdate || "2099/12/31";
                var params = {
                    min: $.datepicker.parseDate(options.params.dateformat, options.params.mindate),
                    max: $.datepicker.parseDate(options.params.dateformat, options.params.maxdate),
                    format: options.params.format
                };

                options.rules['rangeDate'] = params;
                if (options.message) {
                    options.messages['rangeDate'] = options.message;
                }
            });
    }
})