define(["vaform"],function() {
    return {
        init: function() {
            var editModel=avalon.define("editSender", function(vm) {
                vm.disabled = true;
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
                vm.clear=function() {
                    vm.disabled = false;
                    vm.SenderType = "email";
                    vm.Remarks = "";
                    vm.ClientSender = {
                        Server: "",
                        PrivateCode: ""
                    };
                    vm.EmailSender = {
                        Account: "",
                        Password: "",
                        SmtpServer: "",
                        Port: 25
                    };
                }
                vm.getSender = function () {
                    return $("#editSender").serializeObject();
                }
            });

            var listModel=avalon.define("index", function(vm) {
                vm.Senders = [];
                vm.Edit = function () {
                    avalon.mix(editModel, this.$vmodel.el);
                }
                vm.create=function() {
                    editModel.clear();
                }
                vm.add=function(obj) {
                    vm.Senders.push(obj);
                }
            });
            $.get("/Messages/Sender/List", function(d) {
                listModel.Senders = d;
            });
            avalon.scan();

            $("#editSender").vaform({
                success: function (d) {
                    if (d.success) {
                        listModel.add(editModel.getSender());
                        alert('success to save.');
                    } else {
                        alert(d.message);
                    }
                }
            });
        },
        clear: function() {
            delete avalon.vmodels["editSender"];
            delete avalon.vmodels["senderList"];
        }
    };
})