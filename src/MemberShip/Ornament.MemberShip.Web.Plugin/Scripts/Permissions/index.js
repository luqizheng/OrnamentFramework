define(function (require) {
    var $ = require("jquery");
    if ($.fn.tooltip) {
        require("bootstrap")($);
    }
    
    return function (opts) {
        $(".delete").on('click', function () {
            if (confirm(opts.warnDel)) {
                var target = $(this);
                $.getJSON(opts.delUrl + '/' + target.attr("href"), {}, function (result) {
                    alert(result.Message);
                    if (result.Success) {
                        target.parent().parent().remove();
                    }
                });
            }
            return false;
        });
    };
});
