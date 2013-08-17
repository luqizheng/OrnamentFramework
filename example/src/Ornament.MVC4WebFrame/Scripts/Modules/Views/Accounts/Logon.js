define(function (require) {
    var $ = require("jquery");
    if (!$.fn.modal) {
        require("bootstrap")($);
    }
    //form for boostratp
    $('form').bootstrapMakeUp().submit(function () {
        $(this).valid(); $(this).bootstrapMakeUp();
    });

})