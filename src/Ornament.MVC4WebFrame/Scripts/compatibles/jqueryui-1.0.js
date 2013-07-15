/*
由于使用jqueryui，因此这个方法是避免大量产生js代码而创建的。
一些输入参数全部会以attr的方式插入到element中。然后通过这个js来生成jq对象
*/
$(document).ready(function () {
    $(".jqui-spinner").each(function () {
        var $this = $(this), min = $this.attr("data-val-range-min"), max = $this.attr("data-val-range-max");
        $(this).spinner({
            numberFormat: "n",
            step: $this.attr("jq-step"),
            max: max ? max : 32000000,
            min: min ? min : -3200000
        });
    });
});
