define(function () {

    return function($) {
        //modal
        $(document).ajaxError(function(event, jqxhr, settings, exception) {

            var url = "/HttpErrors/AjaxPageError";
            if (settings.url.indexOf(url) != -1)
                return;

            var data = { text: jqxhr.responseText };
            if (jqxhr.responseJSON) {
                data = jqxhr.responseJSON;
                url = "/HttpErrors/AjaxError";
            }
            $.ajax(url, {
                data: data,
                success: function(d) {
                    var $dialog = $("#ajaxerror");
                    if ($dialog.length == 0) {
                        $("body").append(d);
                    } else {
                        $dialog.replaceWith(d);
                    }
                    $("#ajaxerror").modal();
                }
            });
        });
    };
});