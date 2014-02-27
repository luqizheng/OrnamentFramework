
/// <reference path="../Share/WebApi.js" />

define(function (require) {
    var webApi = require("/Scripts/combine/webapi.js");
    var url = "/Api/memberships/Friends";
    var friendApi = new webApi(url);
    
    function friend(obj, pmIns) {
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

    friend.ListFriends = function (func) {
        /// <summary>
        /// 列出当前用户的所有朋友信息
        /// </summary>
        /// <param name="func"></param>
        $.get(url, func);
    };
    friend.Add = function (userId, group, func) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="group"></param>
        /// <param name="func"></param>
        friendApi.Put({ friend: userId, group: group }, func);
    };
    friend.prototype.ListChat = function (func) {
        /// <summary>
        /// 列出对话
        /// </summary>
        /// <param name="func"></param>
        var self = this;
        pm.getChat(this.Id, 0, null, function (d) {
            if (d.length != 0) {
                self.lastCheckTime = d[0].createTime;
            }
            func(d);
        });
    };

    friend.prototype.Send = function (content, func) {
    	/// <summary>
    	/// 
    	/// </summary>
    	/// <param name="content"></param>
    	/// <param name="func"></param>
        pm.send(content, this.Id, func);
    };

    friend.prototype.GetNewer = function (func) {
        var self = this;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="func"></param>
        pm.getChat(this.Id, 0, self.lastCheckTime, function (d) {

            if (d.length != 0) {
                self.lastCheckTime = d[0].createTime;
            }
            func(d);
        });
    };

    return friend;
})