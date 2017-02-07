var Webapi = require("../webapi.js").create("/api/orgs");
module.exports = {
    list: function (parentId) {
        return Webapi.Get({ parentId: parentId });
    },
    save: function (org) {      
        return Webapi.Post(org);
    }
}