define(function (require) {
   
    return function(currentUser, makeReadUrl) {
        var $ = require("jquery"), pmDialog = require("/share/pm.js"),
            pm = new pmDialog($("#pmEditor"), currentUser);
        require("../_appLayout.js");
        if (!$.fn.popover) {
            require("bootstrap")($);
        }


        $("[role=pmReplay]").on("click", function() {
            var relativeUserId = $(this).attr("href").substr(1);
            pm.show(relativeUserId);
            return false;
        });

        $(".unRead").on("mouseover", function(e) {
            var self = $(this);
            $.get(makeReadUrl + "/" + $(this).attr("val"), function(d) {
                if (d) {
                    self.removeClass("unRead").off("mouseover");
                }
            });
            return false;
        });
    };
})