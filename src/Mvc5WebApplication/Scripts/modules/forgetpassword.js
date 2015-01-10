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
                if (d.success) {
                    bootbox.alert(message[d.result]);
                }
            }
        });
        avalon.scan();
    };

});