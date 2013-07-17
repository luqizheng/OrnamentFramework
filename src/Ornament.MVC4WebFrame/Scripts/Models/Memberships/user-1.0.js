define(function (require) {
    var api = require("/models/util/select2Helper.js");
    return {
        select2: function (selector, initFunc) {
            return api.select2(selector, { url: "/api/Users" }, initData);
        },
        quickSearch: function (search, func) {
            var a = $.extend({}, { pageSize: 30, pageIndex: 0 }, search);
            $.post("/api/Users/Match", a, func);
        },
        verifyEmail: function (id, func) {
            $.post("/api/Users/", "=" + id, func);
        }
    };
});


