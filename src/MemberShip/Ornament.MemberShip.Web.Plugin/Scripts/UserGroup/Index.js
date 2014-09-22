define(function (require) {
    require("pager");
 
    var bootbox = require("bootbox");
    var messages = {
        success: '保存成功',
        createTitle: "创建",
        editTitle: "编辑"
    }, $form, editor;

    function changeVal() {
        require(["vaform"], function () {

            $form = $("#ugEditor").vaform({
                url: '/memberShips/UserGroup/Save',
                before: function () {
                    editor.loading = true;
                },
                success: function (rData) {
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
        

        var list = avalon.define('index', function (vm) {
            vm.userGroups = [{"Id":"","Name":"","Remarks":"","Roles":[]}];
          
            vm.del = function () {

            };
            vm.create = function () {
                editor.clear();
                editor.editing = true;
            };
            vm.edit = function () {
                var ug = this.$vmodel.el;
                avalon.mix(editor, ug);
                editor.editing = true;
            };
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
            vm.editTitle =
            {
                get: function() {
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

            vm.save = function () {

            };
        });
    }


    return {
        init: function (message) {
            if (message) {
                messages = message;
            }
            changeVal();
            defineAvalon();
            avalon.scan();
        },

        clear: function () {
            delete avalon.vmodels['index'];
            delete avalon.vmodels['edit'];
        }
    };
})