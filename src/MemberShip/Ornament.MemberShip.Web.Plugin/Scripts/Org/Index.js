﻿define(function (require) {
    var org = require("/MemberShips/Scripts/Share/Org.js");

    function Init() {
        indexModel = avalon.define('index', function (vm) {
            vm.treeRender = function () {
                return arguments[0];
            };
            vm.orgs = [{ Name: "", Id: "", Childs: [] }];
            vm.addSub = function (el, e) {
                var self = el || null;
                var newOrg = {
                    Name: "The Org",
                    Remarks: "",
                    Parent: self ? self.Id : null,
                    Roles: []
                };

                org.save(newOrg.Name, newOrg.Remarks, newOrg.Parent, "", newOrg.Roles, function (d) {
                    if (d) {
                        var newItem = {
                            Name: d.Data.Name,
                            Id: d.Data.Id,
                            Childs: []
                        };
                        if (newOrg.Parent == null) {
                            vm.orgs.push(newItem);
                        } else {
                            self.Childs.push(newItem);
                        }
                    }
                });

                e.preventDefault();
            };

            vm.del = function (el, e) {
                var self = el;
                if (confirm("是否删除组织单元" + self.el.Name)) {
                    org.del(self.el.Id, function () {
                        self.$model.$remove();
                    });
                }
                e.preventDefault();
            };

            vm.editModel = null;
            vm.edit = function (el, e) {
                vm.editModel = el;
                org.get(el.Id, function (data) {
                    var model = avalon.vmodels["edit"];
                    model.Id = data.Id;
                    model.Name = data.Name;
                    model.Remarks = data.Remarks;
                    model.Parent = data.Parent.Id;
                    model.ParentName = data.Parent.Name;
                    model.Roles = data.Roles;
                });

                e.preventDefault();
            };
            vm.updateModel = function (name) {
                vm.editModel.Name = name;
            };
            vm.toggle = function (el, e) {
                if (el.Hide) {
                    $(this).closest("li").find("ul:first").show('fast');
                } else {
                    $(this).closest("li").find("ul:first").hide('fast');
                }
                el.Hide = !el.Hide;
            };
            vm.$skipArray = ["editModel"];
        });

        avalon.define('edit', function (vm) {
            vm.Name = "";
            vm.Remarks = "";
            vm.Parent = null; //Parent Org's Id
            vm.ParentName = "";
            vm.Id = "";
            vm.Roles = [];//Role's id

            vm.save = function (e) {
                org.save(vm.Name, vm.Remarks, vm.Parent, vm.Id, vm.Roles, function (d) {

                    indexModel.updateModel(vm.Name);
                    if (d.Success) {
                        alert("save success.");
                    }
                });
                e.preventDefault();
            };
        });
    }

    return {
        init: function (orgDTO) {
            Init();
            avalon.vmodels["index"].orgs = orgDTO;
            avalon.scan($("#content")[0]);

        }, clear: function () {
            delete avalon.vmodels["edit"];
            delete avalon.vmodels["index"];
        }
    };
})