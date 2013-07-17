﻿
define(function (require) {
    /* for user ajax search */
    var api = require("/models/util/select2Helper.js");
    return {
        select2: function (selector, initData) {
            return api.select2(selector, { ajax: { url: "/api/usergroups" } }, initData);
        }
    };
});




