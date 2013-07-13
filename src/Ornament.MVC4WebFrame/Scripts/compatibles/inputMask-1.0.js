$(document).ready(function () {
    if ($.fn.inputmask) {
        $("[inputMask-format]").each(function () {
            $(this).inputmask($(this).attr("inputMask-format"));
        });
    }
})