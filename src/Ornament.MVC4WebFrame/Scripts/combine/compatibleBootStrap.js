(function ($) {

    $.fn.bootstrapMakeUp = function () {
        try {
            return $(this).each(function () {
                bootstrapError.call(this);
            });
        }
        finally {
            bootstrapSummary();
        }
    };

    function bootstrapError() {
        $(this).find('div.control-group').each(function () {
            $(this).toggleClass('error', $(this).find('span.field-validation-error').length > 0);
        });
        $(this).find('span.field-validation-valid, span.field-validation-error').addClass('help-inline');
    }

    function bootstrapSummary() {
        $(".validation-summary-errors ul li[style!='display:none']").closest(".validation-summary-errors").addClass("alert alert-error");
    }
})(jQuery)
