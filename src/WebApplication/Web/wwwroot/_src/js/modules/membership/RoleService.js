/// <reference path="../webapi.js" />

var url = "/api/roles";
var webapi = require("../webapi.js").create(url);



module.exports = {
    list: function (pageIndex, pageSize) {
        return webapi.Get({
            pageIndex: pageIndex,
            pageSize: pageSize
        });
    },
    save: function (applicationRole) {
        return webapi.Post(applicationRole);
    }

}