/// <reference path="../_appLayout.js" />
define(function (require) {
    require("../_applayout.js");
    var $ = require("jquery");
    
    $('a[data-toggle="tab"]').on('shown', function (e) {
        $($(this).attr("href")).find("input:first").focus();
    });
});

