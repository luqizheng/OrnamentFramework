define(function (require) {
    
    require("form");
    $("form").removeData("validator");
    $("form").removeData("unobtrusiveValidation");
    $.validator.unobtrusive.parse("form");

    $("form").ajaxForm({
        beforeSubmit: function (arr, $form, options) {
            $form.prop("disabled", true);
        },
        success: function (responseText, statusText, xhr, $form) {
            $form.prop("disabled", false);
        }
        
    });

});