define(function (require) {
    var $ = require("jquery");
    require("bootstrap")($);
    require("uniform")($);
    $(".styled").uniform({ radioClass: 'choice' });
    $('.tip').tooltip();

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