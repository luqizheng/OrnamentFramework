define(function(require) {
    //ajax login
    require(['vaform'], function() {

        $("#login-ajax-form").vaform({
            success: function(data) {
                if (data) {
                    location = location;
                } else {
                    alert('login faile');
                }
            }
        });
        $("#login-submit").click(function() {
            $("#login-ajax-form").submit();
        });

    });

})
    