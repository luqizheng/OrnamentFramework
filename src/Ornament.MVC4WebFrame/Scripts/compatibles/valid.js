/*
mvc和bootstrap的报错
*/

define(function (require) {
   require("uniform")
    $.fn.bootstrapMakeUp = function () {
        try {
            return $(this).each(function () {
                bootstrapError.call(this);
            });
        } finally {
            //summary
            $(".validation-summary-errors ul li[style!='display:none']").closest(".validation-summary-errors").addClass("alert alert-error").prepend('<button type="button" class="close" data-dismiss="alert">×</button>');
        }
    };

    function bootstrapError() {
        $(this).find('div.control-group').each(function () {
            $(this).toggleClass('error', $(this).find('span.field-validation-error').length > 0);
        });
        $(this).find('span.field-validation-valid, span.field-validation-error').addClass('help-block');
    }

    $(document).ready(function () {
        $('form').bootstrapMakeUp().submit(function () {
            $(this).valid(); $(this).bootstrapMakeUp();
        });

    });

    $.validator.setDefaults({
        highlight: function (element) {
            $(element).closest(".control-group").addClass("error");
        },
        unhighlight: function (element) {
            $(element).closest(".control-group").removeClass("error");
        }
    });

});

