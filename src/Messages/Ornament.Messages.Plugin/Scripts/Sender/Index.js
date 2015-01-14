define(["jquery", "vaform", "/MemberShips/Scripts/Org/Org.js"], function(a, b, org) {
    return {
        init: function(config) {
            var editModel = avalon.define("editSender", function(vm) {
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
                        $.get(config.get + "/" + vm.Id, function(d) {
                            avalon.mix(editModel, d);
                            editModel.disabled = false;
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
            var listModel = avalon.define("senderList", function(vm) {
                vm.Senders = [];
                vm.Edit = function(id) {
                    editModel.Id = id;
                    editModel.reload();

                };
                vm.create = function() {
                    editModel.clear();
                };
            });
            $.get("/Messages/Sender/List", function(d) {
                listModel.Senders = d;
            });

            //保存Sender的方法用vaform处理

            $("#editSender").vaform({
                success: function(d) {
                    if (d.success) {
                        editModel.Id = d.Id; //返回的Id
                        var modifiedSender = editModel.get();
                        var findIt = false;
                        for (var i = 0; i < listModel.Senders.length; i++) {
                            var item = listModel.Senders[i];
                            if (item.Id == modifiedSender.Id) {
                                item.Name = modifiedSender.Name;
                                item.Remarks = modifiedSender.Remarks;
                                item.Id = modifiedSender.Id;
                                findIt = true;
                                break;
                            }
                        }
                        if (!findIt) {
                            listModel.Senders.push(modifiedSender);
                        }
                        alert('success to save');
                    } else {
                        alert(d.message);
                    }
                }
            });

            avalon.scan();
        },
        clear: function() {
            delete avalon.vmodels["editSender"];
            delete avalon.vmodels["senderList"];
        }
    };
})