// boot strap error mearge for mvc
$(document).ready(function() {

    $('form').bootstrapMakeUp().submit(function() {

        try {
            $(this).valid();
            $(this).bootstrapMakeUp();
        } catch(e) {
        }
    });

    if ($.fn.inputmask) {
        $("[inputMask-format]").each(function() {
            $(this).inputmask($(this).attr("inputMask-format"));
        });
    }
});