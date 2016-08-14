/// <reference path="../views/areas/membership/user/index.js" />
var $ = require('jquery')
var page = require("../../../lib/page/page.js");


var navContainser = [];

function contentLoad(ctx,onEntry) {
    var strUrl = ctx.path;
    var loading = location.pathname.toUpperCase() != strUrl.toUpperCase();
    if (loading) {
        $("#content").load(strUrl, function (responseText, textStatus, req) {
            if (req.status != 200) {
                $("#content").html(responseText);
            }
            else if ($.isFunction(onEntry)) {
                onEntry();
            }
        });
    } else if ($.isFunction(onEntry)) {
        onEntry();
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

module.exports = {
    add: addPath,//添加nav导航的设置
    startNav: function () { //开始初始化导航的体系
        addPath("/")
        page();
    }
}