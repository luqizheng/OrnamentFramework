﻿/// <reference path="../views/areas/membership/user/index.js" />
var $ = require('jquery');
var page = require("../../../lib/page/page.js");
var $content; //加载element;



function ContentLoad(ctx, onEntry) {
    var strUrl = ctx.path;
    var loading = location.pathname.toUpperCase() != strUrl.toUpperCase();
    var bIsFunc = $.isFunction(onEntry);
    if (loading) {
        content.load(strUrl, function (responseText, textStatus, req) {
            if (req.status != 200) {
                content.html(responseText);
                return;
            }
            bIsFunc && onEntry.calal(this, $content);
        });
    } else if ($.isFunction(onEntry)) {
        bIsFunc && onEntry.calal(this, $content);
    }
}


function AddPath(pathes, onEntry, onLeave) {

    if (!$.isArray(pathes)) {

        AddSinglePath(pathes, onEntry, onLeave);

    } else {
        $(pathes).each(function () {
            AddSinglePath(this, onEntry, onLeave);
        });
    }
}

function AddSinglePath(pathes, onEntry, onLeave) {
    page(pathes, function (ctx) {
        ContentLoad(ctx, onEntry);
    });

    if ($.isFunction(onLeave)) {
        page.exit(pathes, function (ctx, next) {
            try {
                onLeave($content);
            } catch (e) {
                console.log('on leavel ', pathes, 'failed.', e);
            }
            next();
        });
    }
}

module.exports = {
    add: AddPath,//添加nav导航的设置
    startNav: function ($ajaxLoadContent) { //开始初始化导航的体系
        $content = $ajaxLoadContent
        AddPath("/");
        page();
    },

}