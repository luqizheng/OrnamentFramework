define(function() {
    /* for user ajax search */
    var api = require("../Util/select2Helper.js");
    return {
        select2: function (selector, initData) {
            var opts = {
                ajax:
                    { url: "/api/Orgs" },
                multiple: false
            };
            return api.select2(selector, opts, initData);
        }
    };
})