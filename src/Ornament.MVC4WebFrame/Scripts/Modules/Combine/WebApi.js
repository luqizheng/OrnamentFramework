define(function (require) {
    var $ = require('jquery');
    require("/Components/json2.js");

    return function (url) {
        /// <summary>
        /// ajax 请求结束之后的回调方法
        /// </summary>
        /// <param name="url"></param>
        /// <returns type=""></returns>
        this.CompleteCallBack = null;

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
            var opts = this.ext.call(this, "GET", data, func);
            $.ajax(opts);
        };



        this.ext = function (method, data, func) {

            var a = $.extend({}, this.opts, {
                type: method,
            });

            if ($.isFunction(data)) {
                a.success = data;
            } else {
                a.data = JSON.stringify(data),
                    a.success = func;
            }
            if (this.CompleteCallBack) {
                a.complete = this.CompleteCallBack;
            }
            return a;
        };
    }




})