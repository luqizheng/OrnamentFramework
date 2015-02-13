define(["vaform","bootbox"],function(a,bootbox) {
    var messages = {};
    $("form").vaform({
        success: function (d) {
            if (d.success) {
                bootbox.alert(messages[d.result], function() {
                    document.location.href = "/";
                });
            } else {
                bootbox.alert(messages.faile);
            }
        }
    });

    return function (message) {
        messages = message;
    }

})