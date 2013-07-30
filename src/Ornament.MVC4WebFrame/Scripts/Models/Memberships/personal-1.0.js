/*凡是和login有关的api都放在这里*/

define(function (require) {
    require("/bundles/jquery.js");
    var url = "/Api/PersonalMessages",
     clientUrl = "/Api/Client",
        autoChecking =
    {
        start: function (time, func) {
            function clientAttach() {
                var data = {};
                if (getCookie("offsetHour")) {
                    data.utcOffset = new Date().getTimezoneOffset() / 60 * -1;
                }
                $.post(clientUrl, func);
            }
            if (!time)
                time = 30000;
            clientAttach();
            this.ticket = setInterval(clientAttach, time);
        },
        stop: function () {
            clearInterval(this.ticket);
        }
    },
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

    return {
        getChat: function (receiverUserId, pageIndex, func) {
            $.get(url, { userId: receiverUserId, page: pageIndex }, func);
        },
        sendPm: function (content, receiver, func) {
            $.post(url, { userId: receiver, content: content }, func);
        },
        watch: function (func) {
            autoChecking.start(func);
        },
        unWatch: function () {
            autoChecking.stop();
        }
    };
})


