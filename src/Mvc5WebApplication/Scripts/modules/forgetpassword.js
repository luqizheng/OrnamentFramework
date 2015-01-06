/// <reference path="forgetpassword.js" />
define(["vaform"], function () {
    
    return function(message,loginUrl) {
        avalon.define({
            $id: "forgetPassword"
        });
        $("#login").vaform({
            before:function(d) {
                if (d.Email == null && d.Account != null) {
                    d.Email = d.Account;
                }
                
                if (d.Account == null && d.Email != null) {
                    d.Account = d.Email;
                }
            },
            success: function(d) {
                alert(message[d.Result]);
                if (d.success) {
                    location = loginUrl;
                }
            }
        });
        avalon.scan();
    };
});