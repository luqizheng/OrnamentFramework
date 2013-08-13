﻿
/// <reference path="../Share/WebApi.js" />

define(function (require) {
    var webApi = require("../share/webapi.js");
    var url = "/Api/Friends";
    var friendApi = new webApi(url);
    function Friend(obj, pmIns) {
        /// <summary>
        /// obj是Friend对象，可以从/Api/Friends获取到 
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="pmIns">Personal Message的instance</param>
        this.Id = obj.Id;
        this.Name = obj.Name;
        this.Group = obj.Group;
        this.Memo = obj.Memo;
        this.lastCheckTime = null;
        this.page = 0;

        pm = pmIns;
    }

    Friend.ListFriends = function (func) {
        /// <summary>
        /// 列出当前用户的所有朋友信息
        /// </summary>
        /// <param name="func"></param>
        $.get(url, func);
    };
    Friend.Add = function(userId, group, func) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="group"></param>
        /// <param name="func"></param>
        friendApi.Put({ friend: userId, group: group }, func);
    };
    Friend.prototype.ListChat = function (func) {
        /// <summary>
        /// 列出对话
        /// </summary>
        /// <param name="func"></param>
        var self = this;
        pm.getChat(this.Id, 0, null,function(d) {
            if (d.length != 0) {
                self.lastCheckTime = d[length - 1].createTime;
            }
            func(d);
        });
    };

    Friend.prototype.Send = function (content, func) {
        pm.send(content, this.Id, func);
    };

    Friend.prototype.GetNewer = function(func) {
        pm.getChat(this.Id, 0, this.lastCheckTime, func);
    };

    return Friend;
})