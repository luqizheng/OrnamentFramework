/// <reference path="cookie.js" />


define(function (require) {
    var cookie = require("./cookie.js");
    // get cookie setting

    function autoChecking(time, func) {
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
            /// 
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
            clearInterval(this.ticket);
        };
    };


    return autoChecking;
})