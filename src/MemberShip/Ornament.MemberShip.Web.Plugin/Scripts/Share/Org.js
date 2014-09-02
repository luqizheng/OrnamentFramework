define(function (require) {
    var orgUrl = "/api/memberships/org",
         api = require("/js/WebApi.js"),
    webApi = new api(orgUrl);

    return {
        save: function (name, remarks, parentId, id, func) {
            webApi.Post({
                Name: name,
                Remarks: remarks,
                Parent: parentId,
                id: id
            }, func);
        },
        get:function(id, func) {
            webApi.Get({ id: id }, func);
        }
    };
})