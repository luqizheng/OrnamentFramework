/// <reference path="forgetpassword.js" />
define(["bootbox", "vaform"], function (bootbox) {
    return function (message, loginUrl) {
        avalon.define({
            $id: "forgetPassword"
        });
        
        $("#forms").vaform({
            before: function (d) {
                if (d.Email == null && d.Account != null) {
                    d.Email = d.Account;
                }

                if (d.Account == null && d.Email != null) {
                    d.Account = d.Email;
                }
            },
            success: function (d) {
                bootbox.confirm(message[d.result], function (ar) {
                    if (d.success && ar) {
                        document.location.href = loginUrl;
                    }
                });
                
            }
        });
        avalon.scan();
    };

});