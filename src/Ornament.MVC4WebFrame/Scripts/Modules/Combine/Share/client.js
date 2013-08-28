/// <reference path="cookie.js" />
/// <reference path="time.js" />


define(function (require) {
    var cookie = require("./cookie.js");
    require("./time.js");
    // get cookie setting

    function client(time, func) {
        /// <summary>
        /// auto checking class;
        /// </summary>
        /// <param name="time"></param>
        /// <param name="func"></param>
        this.time = time;
        this.func = func;
        this.ticket = null;

        this.start = function () {
            /// <summary>
            /// start to checking 
            /// </summary>
            var cbFunc = this.func;
            var ins = this;

            function clientAttach() {
                var data = {};

                if (!cookie.get("offsetHour")) {
                    data.utcOffset = new Date().getTimezoneOffset() / 60 * -1;
                }

                $.post("/Api/Client", data, function (d) {

                    if (!cbFunc(d) || !d.refresh) {
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
            /// <summary>
            /// stop to checking.
            /// </summary>
            clearInterval(this.ticket);
        };

        this.toClientTime = function (serverTime) {
            /// <summary>
            /// 服务器时间改为客户端时间
            /// </summary>
            /// <param name="serverTime">服务器时间</param>
            var f = cookie.get("offsetHour");
            if (f != "") {
                if (f != "0") {
                    serverTime.addHours(parseInt(f));
                }
            } else {
                alert('not offsetHour cookie find.');
            }
        };
    };


    return client;
})