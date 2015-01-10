/// <reference path="forgetpassword.js" />
define(["bootbox", "vaform"], function (bootbox) {
    return function (message) {
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
                bootbox.alert(message[d.result]);
            }
        });
        avalon.scan();
    };

});