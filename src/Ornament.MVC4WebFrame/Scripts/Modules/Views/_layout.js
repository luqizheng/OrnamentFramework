
define(function (require) {

    var $ = require("jquery");
    require("easytabs")($);
    require("collapsible")($);
    require("bootstrap")($);
    require('../Combine/ajaxErrorHandler.js')($);
    $('.tip').tooltip();
    $('.focustip').tooltip({ 'trigger': 'focus' });

    $('.sidebar-tabs').easytabs({
        animationSpeed: 150,
        collapsible: false,
        tabActiveClass: "active"
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

    $("#mainMenu > li.active > ul").attr("style", "");
    $("#mainMenu > li.active a").click();



    //提示
    var clientChecking = require("../Combine/client.js");
    var api = new clientChecking(30 * 1000, function (d) {
        if (d.HasMessage) {
            //#msgAlert 在\Views\Shared\_topMenu.cshtml
            $("#msgAlert").append('<i class="new-message"></i>');
        }
    });

    api.start();
    return {
        message: api
    };

});