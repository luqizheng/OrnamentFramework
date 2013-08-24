/// <reference path="../../../Views/Shared/_topMenu.cshtml" />
/// <reference path="../../../Views/Shared/_topMenu.cshtml" />
/// <reference path="../Combine/Share/client.js" />
/// <reference path="jquery-1.9.1.js" />
/// <reference path="plugins/ui/jquery.easytabs.min.js" />
define(function (require) {

    var $ = require("jquery");
    require("easytabs")($);
    require("collapsible")($);
    require("bootstrap")($);
    require("uniform")($);


    $(".styled").uniform({ radioClass: 'choice' });

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

    //modal
    $(document).ajaxError(function (event, jqxhr, settings, exception) {
        var url = "/HttpErrors/AjaxPageError";

        var data = { text: jqxhr.responseText };
        if (jqxhr.responseJSON) {
            data = jqxhr.responseJSON;
            url = "/HttpErrors/AjaxError";
        }
        $.post(url, data, function (d) {
            var $dialog = $("#ajaxerror");
            if ($dialog.length == 0) {
                $("body").append(d);
            } else {
                $dialog.replaceWith(d);
            }
            $("#ajaxerror").modal();
        });
    });


    //提示
    var clientChecking = require("../Combine/Share/client.js");
    var api = new clientChecking(1000, function (d) {
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