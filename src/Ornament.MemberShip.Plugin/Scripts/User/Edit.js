
define(function (require) {
    
    
    var $ = require("jquery");
    require("validate")($);
    require("formInput");
    $("form").bootstrapMakeUp();
});