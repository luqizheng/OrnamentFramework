var url = "/api/orgs";
var webapi = require("../webapi.js").create(url);
module.exports = {
    list: function (parentId) {
        return webapi.Get({ parentId: parentId });
    },
    save: function (org,parentOgId) {
        return webapi.Post({
            org: org,
            parentOrgId: parentOgId
        });
    }
}