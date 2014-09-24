﻿define(function (require) {
   

    var bootbox = require("bootbox");
    var messages = {
        success: '保存成功',
        createTitle: "创建",
        editTitle: "编辑"
    }, $form, editor, list;

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
                done: function (form) {
                    form.find("input").prop("disabled", false);
                    editor.loading = false;
                }
            });
        });

    }

    function defineAvalon() {


        list = avalon.define('index', function (vm) {
            vm.userGroups = [{ "Id": "", "Name": "", "Remarks": "", "Roles": [] }];

            vm.del = function () {

            };
            vm.refresh = function () {
                avalon.vmodels["ugList"].nav(0);
            };
            vm.create = function () {
                editor.clear();
                editor.editing = true;
            };
            vm.edit = function () {
                var ug = this.$vmodel.el;
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

        editor = avalon.define('edit', function (vm) {
            vm.Id = "";
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
            vm.editTitle =
            {
                get: function () {
                    return vm.editing ? messages.editTitle : messages.createTitle;
                }
            };
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
                messages = message;
            }

            require(['pager'], function() {
                changeVal();
                defineAvalon();
                avalon.scan();
            });
        },
        clear: function () {
            console.log('clean up');
            delete avalon.vmodels['index'];
            delete avalon.vmodels['edit'];
        }
    };
})