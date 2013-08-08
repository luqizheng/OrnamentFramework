define(function (require) {

    var api = require("/scripts/models/base/util/select2Helper.js");
    return function (selector, initData) { return api.select2(selector, { ajax: { url: "/api/Roles" } }, initData); };
});
