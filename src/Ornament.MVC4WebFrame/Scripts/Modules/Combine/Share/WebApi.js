define(function (require) {
    var $ = require('jquery');
    require("/Components/json2.js");

    function WebApi(url) {

        this.opts = {
            url: url,
            contentType: "application/json"
        };

        this.Put = function (data, func) {
            /// <summary>
            /// 
            /// </summary>
            /// <param name="data"></param>
            /// <param name="func"></param>
            var opts = ext.call(this, "PUT", data, func);
            $.ajax(opts);
        };

        this.Delete = function (data, func) {
            /// <summary>
            /// 
            /// </summary>
            /// <param name="data"></param>
            /// <param name="func"></param>
            var opts = ext.call(this, "DELETE", data, func);
            if (data.id) {
                opts.url += "/" + data.id;
            }
            $.ajax(opts);
        };
        this.Post = function (data, func) {
            /// <summary>
            /// 
            /// </summary>
            /// <param name="data"></param>
            /// <param name="func"></param>
            var opts = ext.call(this, "POST", data, func);
            $.ajax(opts);
        };
        this.Get = function (data, func) {
            /// <summary>
            /// 
            /// </summary>
            /// <param name="data"></param>
            /// <param name="func"></param>
            var opts = ext.call(this, "GET", data, func);
            $.ajax(opts);
        };

        this.CompleteCallBack = null;
    }

    function ext(method, data, func) {

        var a = $.extend({}, this.opts, {
            data: JSON.stringify(data),
            type: method,
            success: func
        });
        if (this.CompleteCallBack) {
            a.complete = this.CompleteCallBack;
        }
        return a;
    }



    return WebApi;


})