(function () {

    /* for editor */
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

    /* for user ajax search */

    $.users = {
        search: function (search, pgIndex, func) {
            $.get("/api/Users/Match", {
                nameOrEmailOrLoginId: search,
                pageIndex: pgIndex
            }, function (data) {
                func(data);
            });
        }
    };
    return $;
})($)

