define(function (require) { 
    var $ = require("jquery"),
     url = "/Api/PersonalMessages";

    function pm(){};

    pm.prototype.send = function (content, receiver, func) {
        /// <summary>
        /// 发送pm给用户
        /// </summary>
        /// <param name="content"></param>
        /// <param name="receiver"></param>
        /// <param name="lastTime"></param>
        /// <param name="func"></param>
        $.post(url, { userId: receiver, content: content }, func);
    };

    pm.prototype.getChat = function (relativeUserId, pageIndex, lastTime, func) {
        /// <summary>
        /// 获取login用户和relativeUserId之间数据
        /// </summary>
        /// <param name="relativeUserId">对方Id</param>
        /// <param name="pageIndex">pageIndex of chat</param>
        /// <param name="lastTime">最后一次获取时间</param>
        /// <param name="func"></param>
        $.get(url, { relativeUserId: relativeUserId, lastTime: lastTime, page: pageIndex }, func);
    };

    return pm;


});