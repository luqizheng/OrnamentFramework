/// <reference path="../views/areas/membership/user/index.js" />
var $ = require('jquery')
var page = require("../../../lib/page/page.js");


var navContainser = [];

function contentLoad(ctx,onEntry) {
    var strUrl = ctx.path;
    var loading = document.referrer == "" || location.pathname.toUpperCase() != strUrl.toUpperCase();
    if (loading) {
        $("#content").load(strUrl, function (responseText, textStatus, req) {
            if (req.status != 200) {
                $("#content").html(responseText);
            }
            else if ($.isFunction(onEntry)) {
                onEntry();
            }
        });
    }
}


function addPath(pathes, onEntry) {
    if (!$.isArray(pathes)) {
        page(pathes, function (ctx) {
            contentLoad(ctx,onEntry);
        });
    } else {
        $(pathes).each(function () {
            page(this, function (ctx) {
                contentLoad(ctx,onEntry);
            });

        })
    }
}
addPath("/")
page();

module.exports = {
    add: addPath
}