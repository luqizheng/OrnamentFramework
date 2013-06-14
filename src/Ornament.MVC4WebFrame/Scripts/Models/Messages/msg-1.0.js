//jquery.js
define("msg", function (require, exports, module) {

    var def = {
        PageIndex: 0,
        PageSize: 10,
        language: "en",
        readStates: "UnRead"
    };

    var msg = function() {

        var url = "/Api/Messages";
        this.list = function(opts, func) {
            opts = $.extends({}, def, opts);
            $.post(inner.url + "/index", opts, func);
        };
        this.get = function(id, func) {
            $.get(inner.url + "/get", { id: id }, func);
        };
    };


    module.exports = msg;

});