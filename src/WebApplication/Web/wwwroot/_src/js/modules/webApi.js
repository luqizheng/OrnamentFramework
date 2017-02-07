var $ = require('jquery');

function WepApi(url) {
    this.opts = {
        url: url,
        contentType: "application/json; charset=utf-8"
    };

    this.Put = function (data) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <param name="func"></param>

        var opts = this.ext.call(this, "PUT", data);

        return $.ajax(opts);
    };

    this.Delete = function (data) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <param name="func"></param>
        var opts = this.ext.call(this, "DELETE", data);
        if (data.id) {
            opts.url += "/" + data.id;
        }
        return $.ajax(opts);
    };
    this.Post = function (data) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <param name="func"></param>
        var opts = this.ext.call(this, "POST", data);
        return $.ajax(opts);
    };
    this.Get = function (data) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <param name="func"></param>
        var opts = this.ext.call(this, "GET", data);
        return $.ajax(opts);
    };


    this.ext = function (method, data) {

        var a = $.extend({}, this.opts, { type: method });

        a.data = method !== "GET" ? JSON.stringify(data) : data;

        return a;
    };
};


module.exports = {
    create: function (url) {
        return new WepApi(url);
    }
}
