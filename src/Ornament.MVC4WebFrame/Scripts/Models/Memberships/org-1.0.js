define(function (require) {
    /* for user ajax search */
    var api = require("/models/util/select2Helper.js");
    return {
        select2: function (selector, initData) {
            var opts = {
                url: "/api/Orgs/Match",
                multiple: false
            };
            return api.select2(selector, opts, initData);
        }
    };
});

