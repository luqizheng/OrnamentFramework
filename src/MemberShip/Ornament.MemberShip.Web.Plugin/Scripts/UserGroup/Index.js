define(['pager'], function (require) {
   

    var bootbox = require("bootbox");
    var messages = {
        success: '保存成功',
        createTitle: "创建新的用户组",
        editTitle: "编辑用户组",
        deleteWarning: "是否删除用户组",
        delSuccess: "删除用户组成功",
        delFail:"删除用户组失败",
        saveBtnEdit:"保存",
        saveBtnCreate:"创建"

    }, $form, editor, list,warningDialog;

    function changeVal() {
        require(["vaform"], function () {

            $form = $("#ugEditor").vaform({
                url: '/memberShips/UserGroup/Save',
                before: function () {
                    editor.loading = true;
                },
                success: function (rData) {
                    var isCreated = editor.Id=="";
                    editor.Id = rData.Id;
                    if (isCreated) {
                        list.AddToCur(editor.getPureModel());
                    } else {
                        avalon.mix(list.curUg , editor.getPureModel());
                    }
                    
                    bootbox.alert(rData.success ? messages.success : rData.Message);
                },
                done: function () {
                    this.find("input").prop("disabled", false);
                    editor.loading = false;
                }
            });
        });

        function call() {
            bootbox.dialog({
                message: messages.deleteWarning,
                title: "Warning",
                buttons: {
                    success: {
                        label: "否",
                        className: "btn-success",
                        callback: function() {
                            warningDialog.modal("hide");
                        }
                    },
                    danger: {
                        label: "是",
                        className: "btn-danger",
                        callback: function() {
                            $.get("/memberships/usergroup/delete/" + list.curUg.Id, function(rData) {
                                bootbox.alert(rData.success ? messages.delSuccess : messages.delFail);
                                list.delete(list.curUg.Id);
                            });
                        }
                    }
                }
            });
        }

    }

    function defineAvalon() {


        list = avalon.define('userGroupIndex', function (vm) {
            vm.userGroups = [{ "Id": "", "Name": "", "Remarks": "", "Roles": [] }];
            vm.loading = false;
            vm.del = function (el) {
                vm.curUg =el;
                call();
            };
            vm.delete = function (id) {
                var ary = [];
                for (var i = 0; i < vm.userGroups.length; i++) {
                    if (vm.userGroups[i].Id != id) {
                        ary.push(vm.userGroups[i]);
                    }
                }
                vm.userGroups = ary;
            };
            vm.refresh = function () {
                avalon.vmodels["ugList"].nav(0);
            };
            vm.create = function () {
                editor.clear();
                editor.editing = true;
                vm.curUg = null;
            };
            vm.edit = function (ug) {
                
                avalon.mix(editor, ug);
                editor.editing = true;
                vm.curUg = ug;

            };
            vm.AddToCur = function (ugModel) {
                vm.userGroups.push(ugModel);
                vm.curUg = ugModel;
            };
            vm.curUg = null;
            vm.pager = {
                search: function (index, maxRecords, func) {
                    $.get("/MemberShips/UserGroup/List", {
                        size: maxRecords,
                        index: index
                    }, function (d) {
                        list.userGroups = d.data;
                        func(d.totalRecords);
                    });

                }
            };
        });

        editor = avalon.define('userGroupEdit', function (vm) {
            var _id;
            vm.Id = {
                get: function() { return _id },
                set: function(v) {
                    _id = v;
                    editor.saveBtnText = _id != "" ? messages.saveBtnEdit : messages.saveBtnCreate;
                    editor.editTitle = _id != "" ? messages.editTitle : messages.createTitle;
                }

            };

            vm.Name = "";
            vm.Roles = [];
            vm.Remarks = "";
            vm.editing = false;
            vm.loading = false;
            vm.cancel = function () {
                vm.editing = false;
                vm.clear();
            };
            vm.reset = function() {
                avalon.mix(vm, list.curUg);
            };
            vm.editTitle = messages.editTitle;
            vm.saveBtnText = messages.saveBtnEdit;
            vm.clear = function () {
                avalon.mix(vm, {
                    Id: "",
                    Name: "",
                    Roles: [],
                    Remarks: ""
                });
            };
            vm.IsCreated = {
                get: function () {
                    return vm.Id == "";
                }
            };
            vm.getPureModel = function () {
                return {
                    Id: vm.Id,
                    Name: vm.Name,
                    Remarks: vm.Remarks,
                    Roles: vm.Roles
                };

            };
        });
    }


    return {
        init: function (message) {
            if (message) {
                avalon.mix(messages,message);
            }
            changeVal();
            defineAvalon();
            avalon.scan();
          
        },
        clear: function () {
            delete avalon.vmodels['userGroupIndex'];
            delete avalon.vmodels['userGroupEdit'];

        }
    };
})