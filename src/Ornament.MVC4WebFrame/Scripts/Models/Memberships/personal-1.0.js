/*凡是和login有关的api都放在这里*/

define(function (require) {
    require("/bundles/jquery.js");
    var url = "/Api/PersonalMessages",
        clientUrl = "/Api/Client",
    
        
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
    
    function AutoChecking(time, func) {
    	/// <summary>
    	/// auto checking class;
    	/// </summary>
    	/// <param name="time"></param>
    	/// <param name="func"></param>
        this.time = time;
        this.func = func;
        this.start = function() {
            var cbFunc = this.func;
                
            function clientAttach() {
                var data = {};
                    
                if (getCookie("offsetHour")) {
                    data.utcOffset = new Date().getTimezoneOffset() / 60 * -1;
                }
                    
                $.post(clientUrl, function(d) {if (!cbFunc(d)) {AutoChecking.stop();}});
            }

            if (!this.time)
                this.time = 30000;
            clientAttach();
            this.ticket = setInterval(clientAttach, this.time);
        };
        this.stop = function() {
            clearInterval(this.ticket);
        };
    };
    var autocheckIns=null;
    return {
        getChat: function (relativeUserId, pageIndex, lastTime, func) {
        	/// <summary>
        	/// 获取login用户和relativeUserId之间数据
        	/// </summary>
        	/// <param name="relativeUserId"></param>
        	/// <param name="pageIndex"></param>
        	/// <param name="lastTime"></param>
        	/// <param name="func"></param>
            $.get(url, { relativeUserId: relativeUserId,lastTime:lastTime, page: pageIndex }, func);
        },
        sendPm: function (content, receiver, func) {
        	/// <summary>
        	/// 发送pm给用户
        	/// </summary>
        	/// <param name="content"></param>
        	/// <param name="receiver"></param>
        	/// <param name="lastTime"></param>
        	/// <param name="func"></param>
            $.post(url, { userId: receiver, content: content }, func);
        },
        watch: function (internal, func) {
            if (autocheckIns == null) {
                autocheckIns = new AutoChecking(internal, func);
            }
            autocheckIns.start();
        },
        unWatch: function () {
            autocheckIns.stop();
        }};
})


