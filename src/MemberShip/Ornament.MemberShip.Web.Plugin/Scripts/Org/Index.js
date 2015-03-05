define(["../Share/Org.js"],function (org) {
    

    function Init() {
        
        var indexModel=avalon.define({
            $id:'index',
            treeRender :function () {
                return arguments[0];
            },
            orgs :[{ Name: "", Id: "", Childs: [] }],
            addSub : function (el, e) {
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
                            indexModel.orgs.push(newItem);
                        } else {
                            self.Childs.push(newItem);
                        }
                    }
                });

                e.preventDefault();
            },

            del: function (self, e, removeFunc) {
                if (confirm("是否删除组织单元" + self.Name)) {
                    org.del(self.Id, function () {
                        removeFunc();
                    });
                }
                e.preventDefault();
            },

            editModel : null,
            edit : function (el, e) {
                indexModel.editModel = el;
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
            },
            updateModel : function (name) {
                indexModel.editModel.Name = name;
            },
            toggle : function (el) {
                var tagle = $(this).closest("li").find("ul:first");
                if (el.Hide) {
                    tagle.show('fast');
                } else {
                    tagle.hide('fast');
                }
                el.Hide = !el.Hide;
            },
            $skipArray : ["editModel"],
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