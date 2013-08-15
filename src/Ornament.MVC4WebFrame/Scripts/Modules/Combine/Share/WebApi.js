﻿define(function (require) {
    var $ = require('jquery');

    function WebApi(url) {
        this.opts = {
            url: url,
            contentType: "application/json"
        };
    }
    function ext(method, data, func) {
        return $.extend({}, this.opts, {
            data: data,
            type: method,
            success: func
        });
    }

    WebApi.prototype.Put = function (data, func) {
        var opts = ext.call(this, "PUT", data, func);
        $.ajax(opts);
    };

    WebApi.prototype.Delete = function (data, func) {
        var opts = ext.call(this, "DELETE", data, func);
        if (data.id) {
            opts.url += "/" + data.id;
        }
        $.ajax(opts);
    };
    WebApi.prototype.Post = function (data, func) {
        var opts = ext.call(this, "POST", data, func);
        $.ajax(opts);
    };
    WebApi.prototype.Get = function (data, func) {
        var opts = ext.call(this, "GET", data, func);
        $.ajax(opts);
    };

    return WebApi;


})