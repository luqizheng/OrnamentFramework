define(function() {
    return {
        init: function() {
            avalon.define("editSender", function(vm) {
                vm.senderType = "email";
                vm.Remarks = "";
                vm.Client = {                    
                    Server: "",
                    PrivateCode:""
                };
                vm.Email = {
                    Account: "",
                    Password: "",
                    SmtpServer: "",
                    Port:25
                };
            });

            avalon.scan();
        },
        clear: function() {

        }
    };
})