define(["jquery","vaform"],function () {
    return {
        init: function () {
            var editModel = avalon.define("editSender", function (vm) {
                vm.Id = "";
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
                vm.editing = false;
                vm.clear = function() {
                    vm.Id = "";
                    vm.SenderType = "email";
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
                    vm.editing = false;
                };

                vm.save = function() {
                    var data = {
                        Id: vm.Id,
                        SenderType: vm.SenderType,
                        EmailSender: this.$vmodel.EmailSender
                    };
                    
                    $.post("/Messages/Sender/Save", data, function(returnValue) {
                        alert(returnValue.success);
                    });
                };
                vm.cancel = function() {

                };
                vm.reload = function() {

                };

            });
            var listModel = avalon.define("index", function (vm) {
                vm.Senders = [];
                vm.Edit = function () {
                    avalon.mix(editModel, this.$vmodel.el);
                    editModel.editing = true;
                };
                vm.Create = function () {
                    editModel.clear();
                };
            });
            $.get("/Messages/Sender/List", function (d) {
                listModel.Senders = d;
            });
            avalon.scan();
        },
        clear: function () {
            delete avalon.vmodels["editSender"];
            delete avalon.vmodels["senderList"];
        }
    };
})