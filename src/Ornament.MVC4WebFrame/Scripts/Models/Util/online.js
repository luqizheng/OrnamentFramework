define(function (require) {
    function f() {
        $.get("/api/Online", function () { console.log("success"); });
    }
    return {
        check: function () {
            setInterval(f, 30 * 1000);
        }
    };
});