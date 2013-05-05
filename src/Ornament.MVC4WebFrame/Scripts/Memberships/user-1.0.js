(function () {

    $.fn.userEditor = function (cmd) {
        if (typeof cmd == "string") {
            inner[cmd].call(this);
        }
        return this;
    };

    var inner = {
        reset: function () {
            $("input", $(this)).val("");
            $(this).bootstrapMakeUp("clear");
        }
    };
    return $;
})($)


