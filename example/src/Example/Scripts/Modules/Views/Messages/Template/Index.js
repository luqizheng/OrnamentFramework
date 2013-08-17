define(function (require) {
    var $ = require("jquery");
    require("../../_appLayout.js");
    if (!$.fn.popover) {
        require('bootstrap')($);
    }
    return function (deleteUrl) {
        var $popver = $("[data-toggle=popover]").popover({ html: true, content: $("#warning").html(), placement: "top", title: "Warning" });
        $(document)
            .delegate("button.deleteYes", "click", function (e) {
                $("[data-toggle=popover]").popover("hide");
                var $td = $(this).closest("td"),
                    id = $td.find("a:eq(1)").attr("data-val");

                $.get(deleteUrl + "/" + id, function (data) {
                    if (data.success) {
                        $td.closest("tr").remove();
                    } else {
                        alert(data.message);
                    }
                });
                return false;
            })
            .delegate("button.deleteNo", "click", function () {
                $popver.popover("hide");
                return false;
            });
    };


})