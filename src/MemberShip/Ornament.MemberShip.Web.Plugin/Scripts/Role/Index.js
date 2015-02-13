define(function (require) {

    var bootbox = require("bootbox"), $form, model, editable
    , messages = {
        saveBtnCreate: "添加",
        saveBtnEdit: "保存",
        createTitle: "创建新的角色",
        editTitle: "编辑角色"
    };

    function changeVal() {

        require(["vaform"], function () {
            $form = $("#roleEdit").vaform({
                url: '/memberShips/Role/Save',
                before: function () {
                    editable.loading = true;
                },
                success: function (rData) {
                    bootbox.alert(rData.success ? "保存成功" : rData.Message);
                    var isCreated = editable.Id == "";
                    editable.Id = rData.Id;
                    if (isCreated) {
                        model.AddToCur(editable.getPureModel());
                    } else {
                        avalon.mix(editable.curUg, editable.getPureModel());
                    }

                    bootbox.alert(rData.success ? messages.success : rData.Message);
                },
                done: function () {
                    this.find("input").prop("disabled", false);
                    editable.loading = false;
                }
            });
        });
    }

    function init() {
        model = avalon.define('index', function (vm) {
            vm.edit = function (el,e) {
                vm.curRole = el;
                avalon.mix(editable, vm.curRole);
                editable.editing = true;
                editable.editTitle = messages.editRole;
                e.preventDefault();
            };
            vm.create = function (e) {
                editable.editTitle = messages.createRole;
                editable.editing = true;
                editable.clear();
                vm.curRole = null;
            };
            vm.curRole = null;
            vm.del = function () {
                var ary = [];
                for (var i = 0; i < vm.roles.length; i++) {
                    if (vm.roles[i].Id != id) {
                        ary.push(vm.roles[i]);
                    }
                }
                vm.roles = ary;
            };
            vm.AddToCur = function (role) {
                vm.roles.push(role);
                vm.curRole = role;
            };
            vm.roles = [{ Id: "", Name: "", Remarks: "", Permissions: [] }];
            vm.pager = {
                pageSize: 50,
                search: function (index, maxRecords, func) {
                    $.get("/MemberShips/Role/List", {
                        PageSize: maxRecords,
                        CurrentPage: index
                    }, function (d) {
                        model.roles = d.data;
                        func(d.totalRecords);
                    });
                }
            };
        });

        editable = avalon.define('edit', function (vm) {
            var _id;
            vm.Id = {
                get: function () {
                    return _id;
                },
                set: function (v) {
                    _id = v;
                    editable.title = _id != "" ? messages.editTitle : messages.createTitle;
                    editable.saveBtnText = _id != "" ? messages.saveBtnEdit : messages.saveBtnCreate;
                }
            };
            vm.saveBtnText = "";
            vm.Name = "";
            vm.Remarks = "";
            vm.Permissions = [];
            vm.editing = false;
            vm.loading = false;
            vm.title = "";
            vm.save = function () {
                model.curRole.Name = vm.Name;
                model.curRole.Remarks = vm.Remarks;
                model.curRole.Permissions = vm.Permissions;

            };
            vm.clear = function () {
                avalon.mix(editable, { Name: "", Id: "", Remarks: "", Permissions: [] });
            };
            vm.IsCreated = {
                get: function () {
                    return !vm.Id;
                }
            };
            vm.reset = function () {
                avalon.mix(editable, model.curRole);
            };
            vm.cancel = function () {
                vm.editing = false;
                editable.clear();
            };
            vm.getPureModel = function () {
                return {
                    Id: vm.Id,
                    Name: vm.Name,
                    Remarks: vm.Remarks,
                    Permissions: vm.Permissions
                };
            };
        });

    }


    return {
        init: function (message) {
            if (message) {
                messages = avalon.mix(messages, message);
            }

            changeVal();
            require(["pager"], function () {
                init();
                avalon.scan();
            });

        },
        clear: function () {
            delete avalon.vmodels['index'];
            delete avalon.vmodels['edit'];
        }
    };

})