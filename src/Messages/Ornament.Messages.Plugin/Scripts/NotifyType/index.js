
define(function (require) {
    var $ = require("jquery");
    
    if (!$.fn.popover) {
        require("bootstrap")($);
    }
    var $popver = $("[data-toggle=popover]").popover({ html: true, content: $("#warning").html(), placement: "top", title: "Warning" });
    return function (opts) {
        $(document)
            .delegate("button.deleteYes", "click", function () {
                $("[data-toggle=popover]").popover("hide");
                var $td = $(this).closest("td"),
                    id = $td.find("a:eq(1)").attr("data-val");

                $.get(opts.delUrl + "/" + id, function (data) {
                    if (data.success) {
                        $td.closest("tr").remove();
                    } else {
                        alert(data.message);
                    }
                });
                $popver.popover("hide");
            })
            .delegate("button.deleteNo", "click", function () {
                $popver.popover("hide");
            });
    };
})