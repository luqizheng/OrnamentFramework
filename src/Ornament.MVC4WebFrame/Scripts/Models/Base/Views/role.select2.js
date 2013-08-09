define(function (require) {
    var api = require("../Util/select2Helper.js");
    return function (selector, initData) { return api.select2(selector, { ajax: { url: "/api/Roles" } }, initData); };
});
