
define(function () {
    var pmUrl = "/Api/PersonalMessages";
    function Friend(obj) {
        this.Id = obj.Id;
        this.Name = obj.Name;
        this.Group = obj.Group;
        this.Memo = obj.Memo;
        this.lastCheckTime = null;
        this.pageIndex = 0;
    }

    Friend.prototype.ListChat = function (func) {
    	/// <summary>
    	/// 列出对话
    	/// </summary>
    	/// <param name="func"></param>
        $.get(pmUrl, {
            relativeUserId: this.Id,
            lastTime: null,
            page: 0
        }, func);
    };
    Friend.prototype.NextChat = function (func) {
    	/// <summary>
    	/// 显示下一批留言
    	/// </summary>
    	/// <param name="func"></param>
        var self = this;
        self.pageIndex += 1;
        $.get(pmUrl, {
            relativeUserId: this.Id,
            lastTime: null,
            page: self.pageIndex
        }, func);
    };
    Friend.prototype.SendPm = function (content, func) {
        $.post(pmUrl, { userId: this.Id, content: content }, func);
    };
    return Friend;
})