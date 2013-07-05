
var online =
{
    start: function (time) {
        if (!time)
            time = 30000;
        this.ticket = setInterval(function () {
            $.get("/api/Online", function () {
            });
        }, time);
    },
    stop: function () {
        clearInterval(this.ticket);
    }
}


