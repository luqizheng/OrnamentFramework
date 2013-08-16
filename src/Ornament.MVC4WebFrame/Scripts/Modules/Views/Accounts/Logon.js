define(function (require) {
    var $ = require("jquery");
    if (!$.fn.modal) {
        require("bootstrap")($);
    }
    require("validate")($);

})