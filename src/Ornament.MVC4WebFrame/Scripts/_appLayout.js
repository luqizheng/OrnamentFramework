/// <reference path="jquery-1.9.1.js" />
/// <reference path="plugins/ui/jquery.easytabs.min.js" />
define(function (require) {

    var $ = require("/bundles/jquery.js");
    var a = require("/bundles/jquery.easytabs.js");
    require("collapsible")($);
    require("bootstrap")($);
    require("uniform")($);


    $(".styled").uniform({ radioClass: 'choice' });
    $("#mainMenu > li.active > ul").attr("style", "");
    $('.tip').tooltip();
    $('.focustip').tooltip({ 'trigger': 'focus' });

    $('.sidebar-tabs').easytabs({
        animationSpeed: 150,
        collapsible: false,
        tabActiveClass: "active"
    });

    //form for boostratp
    $('form').bootstrapMakeUp().submit(function () {
        $(this).valid(); $(this).bootstrapMakeUp();
    });

    // ==== Action Wizard ===
    $('.actions').easytabs({
        animationSpeed: 300,
        collapsible: false,
        tabActiveClass: "current"
    });

    //===== Collapsible plugin for main nav =====//
    $('.expand').collapsible({
        defaultOpen: 'current,third',
        cookieName: 'navAct',
        cssOpen: 'subOpened',
        cssClose: 'subClosed',
        speed: 200
    });
    $('.showmenu').click(function () {
        $('.actions-wrapper').slideToggle(100);
    });
    $('.fullview').click(function () {
        $("body").toggleClass("clean");
        $('#sidebar').toggleClass("hide-sidebar mobile-sidebar");
        $('#content').toggleClass("full-content");
    });
});