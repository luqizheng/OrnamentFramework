﻿define(["jquery","vaform"],function () {
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
                vm.Sender = {
                    Account: "",
                    Password: "",
                    SmtpServer: "",
                    Port: 25
                };
                vm.disabled = true;
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
                    vm.disabled = false;
                };
                vm.Name = "";
                vm.cancel = function() {

                };
                vm.reload = function() {
                    if (vm.Id != null) {
                        $.get("/Message/Sender/Get/" + vm.Id, function(d) {
                            editModel.mix(this, d);
                        });
                    }
                };

                vm.get = function() {
                    return {
                        Id: vm.Id,
                        Name: vm.Name,
                        Remarks: Remarks
                    };
                };

            });
            var listModel = avalon.define("senderList", function (vm) {
                vm.Senders = [];
                vm.Edit = function (id) {
                    editModel.Id = id;
                    editModel.reload();
                    editModel.disabled = false;
                };
                vm.create = function () {
                    editModel.clear();
                };
            });
            $.get("/Messages/Sender/List", function (d) {
                listModel.Senders = d;
            });


            $("#editSender").vaform({
                success: function(d) {
                    if (d.success) {
                        editModel.Id = d.SenderId;
                        listModel.Senders.push(editModel.get());
                        alert('success to save');
                    } else {
                        alert(d.message);
                    }
                } 
            });

            avalon.scan();
        },
        clear: function () {
            delete avalon.vmodels["editSender"];
            delete avalon.vmodels["senderList"];
        }
    };
})