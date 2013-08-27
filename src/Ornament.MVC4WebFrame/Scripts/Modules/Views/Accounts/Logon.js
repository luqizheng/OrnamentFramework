define(function (require) {
    var $ = require("jquery");
    require("bootstrap")($);
    require("validate")($);
    //form for boostratp
    $('form').bootstrapMakeUp().submit(function () {
        $(this).valid(); $(this).bootstrapMakeUp();
    });

})