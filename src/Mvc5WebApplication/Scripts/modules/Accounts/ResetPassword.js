define(["vaform","bootbox"],function(a,bootbox) {
    var messages = {};
    $("form").vaform({
        success: function (d) {
            if (d.success) {
                bootbox.confirm(messages.success, function (ok) {
                    if (ok) {
                        document.location.href = "/";
                    }
                });
            }
        }
    });

    return function (message) {
        messages = message;
    }

})