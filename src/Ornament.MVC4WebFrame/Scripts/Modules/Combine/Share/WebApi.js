define(function (require) {
    var $ = require('jquery');

    function WebApi(url) {
        this.opts = {
            url: url,
            contentType: "application/json"
        };
    }

    WebApi.prototype.Put = function (data, func) {
        var opts = $.extend({}, this.opts, {
            data: data,
            type: "PUT",
            success: func
        });
        $.ajax(opts);
    };

    WebApi.prototype.Delete = function (data, func) {
        var opts = $.extend({}, this.opts, {
            data: data,
            type: "DELETE",
            success: func
        });
        $.ajax(opts);
    };
    WebApi.prototype.Post = function (data, func) {
        var opts = $.extend({}, this.opts, {
            data: data,
            type: "POST",
            success: func
        });
        $.ajax(opts);
    };
    WebApi.prototype.Get = function (data, func) {
        var opts = $.extend({}, this.opts, {
            data: data,
            type: "Get",
            success: func
        });
        $.ajax(opts);
    };

    return WebApi;


})