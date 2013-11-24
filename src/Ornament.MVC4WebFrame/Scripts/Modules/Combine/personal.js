/// <reference path="../Base/Memberships/friend.js" />
/*凡是和login有关的api都放在这里*/

define(function (require) {
    require("/bundles/jquery.js");
    var url = "/Api/PersonalMessages",
        clientUrl = "/Api/Client",
        friendLib = require("/scripts/Modules/Combine/Memberships/friend.js"),
    getCookie = function (cName) {
        if (document.cookie.length > 0) {
            var cStart = document.cookie.indexOf(cName + "=");
            if (cStart != -1) {
                cStart = cStart + cName.length + 1;
                var cEnd = document.cookie.indexOf(";", cStart);
                if (cEnd == -1) cEnd = document.cookie.length;
                return unescape(document.cookie.substring(cStart, cEnd));
            }
        }
        return "";
    };

    function Personal(my) {

        this.Name;
           
        if (my.Name) {
            this.Name = my.Name;
        }
        this.Frends = [];
    }

    Personal.prototype.getChat = function (relativeUserId, pageIndex, lastTime, func) {
        /// <summary>
        /// 获取login用户和relativeUserId之间数据
        /// </summary>
        /// <param name="relativeUserId">对方Id</param>
        /// <param name="pageIndex">pageIndex of chat</param>
        /// <param name="lastTime">最后一次获取时间</param>
        /// <param name="func"></param>
        $.get(url, { relativeUserId: relativeUserId, lastTime: lastTime, page: pageIndex }, func);
    },
    
    Personal.prototype.sendPm = function (content, receiver, func) {
        /// <summary>
        /// 发送pm给用户
        /// </summary>
        /// <param name="content"></param>
        /// <param name="receiver"></param>
        /// <param name="lastTime"></param>
        /// <param name="func"></param>
        $.post(url, { userId: receiver, content: content }, func);
    };

    Personal.prototype.GetFriends = function (func) {
        /// <summary>
        /// 刷新好友列表
        /// </summary>
        /// <param name="func"></param>
        ///<returns type="Frends">Personal.Frends</returns>
        var self = this;
        $.get("/Api/Friends", function (data) {
            self.Frends = data;
            func(self.Frends);
        });
    };


    function autoChecking(time, func) {
        /// <summary>
        /// auto checking class;
        /// </summary>
        /// <param name="time"></param>
        /// <param name="func"></param>
        this.time = time;
        this.func = func;
        this.start = function () {
            var cbFunc = this.func;
            var ins = this;
            function clientAttach() {
                var data = {};

                if (getCookie("offsetHour")) {
                    data.utcOffset = new Date().getTimezoneOffset() / 60 * -1;
                }

                $.post(clientUrl, function (d) {
                    if (!cbFunc(d)) {
                        ins.stop();
                    }
                });
            }

            if (!this.time)
                this.time = 30000;
            clientAttach();
            this.ticket = setInterval(clientAttach, this.time);
        };
        this.stop = function () {
            clearInterval(this.ticket);
        };
    };
    var autocheckIns = null;
    return Personal;
    return {
        watch: function (internal, func) {
            if (autocheckIns == null) {
                autocheckIns = new autoChecking(internal, func);
            }
            autocheckIns.start();
        },
        unWatch: function () {
            if (autocheckIns != null)
                autocheckIns.stop();
        }
    };
})


