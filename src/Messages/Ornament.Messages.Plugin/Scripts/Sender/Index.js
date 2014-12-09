define(function() {
    return {
        init: function() {
            var editModel=avalon.define("editSender", function(vm) {
                vm.SenderType = "email";
                vm.Remarks = "";
                vm.ClientSender = {                    
                    Server: "",
                    PrivateCode:""
                };
                vm.EmailSender = {
                    Account: "",
                    Password: "",
                    SmtpServer: "",
                    Port:25
                };
            });
            var listModel=avalon.define("index", function(vm) {
                vm.Senders = [];
                vm.Edit = function () {
                    avalon.mix(editModel, this.$vmodel.el);
                }
            });
            $.get("/Messages/Sender/List", function(d) {
                listModel.Senders = d;
            });
            avalon.scan();
        },
        clear: function() {
            delete avalon.vmodels["editSender"];
            delete avalon.vmodels["senderList"];
        }
    };
})