/// <reference path="../../_appLayout.js" />
define(function (require) {
    require("../../_appLayout.js");
    var $ = require("jquery");
    require("validate")($);
    require("formInput");
    $("form").bootstrapMakeUp();
});