/// <reference path="../Personal/PersonalMessage.js" />

define(function (require) {
    var url = "/Api/Friends";
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
    Friend.prototype.ListChat = function (func) {
        /// <summary>
        /// 列出对话
        /// </summary>
        /// <param name="func"></param>
        pm.getChat(this.Id, 0, null, func);
    };
    Friend.prototype.NextChat = function (func) {
        /// <summary>
        /// 显示下一批留言
        /// </summary>
        /// <param name="func"></param>
        var self = this;
        self.page += 1;
        pm.getChat(self.Id, self.page, null, func);
    };
    
    Friend.prototype.SendPm = function (content, func) {
        pm.send(content, this.Id, func);
    };
    return Friend;
})