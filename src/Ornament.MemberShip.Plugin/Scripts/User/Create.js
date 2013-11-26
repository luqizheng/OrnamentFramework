/// <reference path="../../_appLayout.js" />
define(function (require) {
    require("/scripts/views/_appLayout.js");
    var $ = require("jquery");
    require("validate")($);
    $("form").bootstrapMakeUp();
});