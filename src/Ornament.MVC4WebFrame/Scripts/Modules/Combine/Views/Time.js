defined(function (require) {
    var $ = require("jquery");
    require("/scripts/plugins/jquery.inputmask.js");
    $(document).ready(function () {
        $('input.jqui-time').each(function () {
            var $this = $(this), format = $this.attr("timeFormat"), inputMask = $this.attr("inputmask-format");
            $this.timepicker({ 'timeFormat': format }).inputmask(inputMask);
        });
    });
})
