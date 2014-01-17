/// <reference path="../../Combine/Share/WebApi.js" />
define(function (require) {
    var $ = require("jquery"),
        webApi = require("/Scripts/Modules/Combine/WebApi.js"),
        createDdl = function (responseCtrl, data) {
            var ary = [];
            $(data).each(function (i) {
                ary.push("<option value='" + this.id + "'>" + this.text + "</option>");
            });
            responseCtrl.html(ary.join(""));
            $(responseCtrl).val(data[0].id);
        };

    return function (provinceSelector, citySelector, areaSelector) {

        var $city = $(citySelector).change(function () {
            var areaApi = new webApi("/api/area/" + $(this).val());
            areaApi.Get(function (d) {
                createDdl($area, d);
            });
            
        }),
        $area = $(areaSelector);

        $(provinceSelector).change(function () {
            var cityApi = new webApi("/api/city/" + $(this).val());
            cityApi.Get(function (d) {
                createDdl($city, d);
                $city.change();
            });
        }).change();
    };




})