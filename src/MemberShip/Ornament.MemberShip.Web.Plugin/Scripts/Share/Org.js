define(function (require) {
    var orgUrl = "/api/memberships/org",
         api = require("WebApi"),
    webApi = new api(orgUrl);

    return {
        save: function (name, remarks, parentId, id,roles, func) {
            webApi.Post({
                Name: name,
                Remarks: remarks,
                ParentId: parentId,
                Id: id,
                Roles:roles

            }, func);
        },
        del: function (id, func) {
            webApi.Delete({ id: id }, func);
        },
        get:function(id, func) {
            webApi.Get({ id: id }, func);
        }
    };
})