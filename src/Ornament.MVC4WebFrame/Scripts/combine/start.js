// boot strap error mearge for mvc
$(document).ready(function() {
    $('form').bootstrapMakeUp().submit(function() {

        try {
            $(this).valid();
            $(this).bootstrapMakeUp();
        } catch(e) {
        }
    });
});