var url = "/api/orgs";
var webapi = require("../webapi.js").create(url);
module.exports = {
    list: function (pageIndex, pageSize) {
        return webapi.Get({
            pageIndex: pageIndex,
            pageSize: pageSize
        });
    },
    save: function (org,parentOgId) {
        return webapi.Post({
            org: org,
            parentOrgId: parentOgId
        });
    }
}