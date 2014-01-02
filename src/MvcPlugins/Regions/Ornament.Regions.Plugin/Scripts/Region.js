/// <reference path="../../Combine/Share/WebApi.js" />
define(function (require) {
    var $ = require("jquery"),
        webApi = require("../../Combine/Share/WebApi.js"),
        createDDL = function (responseCtrl, data) {
            var ary = [];
            $(data).each(function () {
                ary.push("<option value='" + this.id + "'>" + this.text + "</option>");
            });
            responseCtrl.html(ary.join(""));
        };

    require("select2")($);

    return function (provinceSelector, citySelector, areaSelector) {
        var $city = $(citySelector).change(function () {
            var areaApi = new webApi("/api/area/" + $(this).val());
            areaApi.Get(null, function (d) {
                createDDL($area, d);
            });
        }),
        $area = $(areaSelector);
        $(provinceSelector).change(function () {
            var cityApi = new webApi("/api/city/" + $(this).val());
            cityApi.Get(null, function (d) {
                createDDL($city, d);
            });
        }).change();
    };




})