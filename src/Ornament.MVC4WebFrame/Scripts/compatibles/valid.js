/*
mvc和bootstrap的报错
*/
(function ($) {

    $.fn.bootstrapMakeUp = function (cmd) {
        cmd = cmd ? cmd : "error";
        try {
            return $(this).each(function () {
                inner[cmd].call(this);
            });

        } finally {
            //summary
            $(".validation-summary-errors ul li[style!='display:none']")
                .closest(".validation-summary-errors")
                .addClass("alert alert-error margin")
                .prepend('<button type="button" class="close" data-dismiss="alert">×</button>');
        }
    };
    var inner = {
        error: function () {
            $(this).find('div.control-group').each(function () {
                $(this).toggleClass('error', $(this).find('span.field-validation-error').length > 0);
            });
            $(this).find('span.field-validation-valid, span.field-validation-error')
                .addClass('help-block');
        },
        clear: function () {
            $("div.control-group", this).each(function () {
                $(this).removeClass("error");
            });
            $(this).find('span.field-validation-valid, span.field-validation-error').text("")
            .removeClass('help-block');
        }
    };

    $.validator.setDefaults({
        highlight: function (element) {
            $(element).closest(".control-group").addClass("error");
        },
        unhighlight: function (element) {
            $(element).closest(".control-group").removeClass("error");
        }
    });

})($)

