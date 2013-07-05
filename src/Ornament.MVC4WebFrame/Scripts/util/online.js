
var online =
{
    start: function () {
        this.ticket = setInterval(function () {
            $.get("/api/Online", function () {
            });
        }, 3 * 1000);
    },
    stop: function () {
        clearInterval(this.ticket);
    }
}


