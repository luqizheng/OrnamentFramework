define(function (require) {

    //require("form");
    require("pager");
    var bootbox = require("bootbox");
    var messages = {
        saveBtnCreate: "添加",
        saveBtnEdit: "保存",
        createTitle: "创建新的角色",
        editTitle: "编辑角色"
    };
    function init() {

        var model = avalon.define('index', function (vm) {
            vm.edit = function (e) {
                var m = this.$vmodel.el;
                vm.curRole = m;
                avalon.mix(editable, vm.curRole);
                editable.editing = true;
                editable.editTitle = messages.editRole;
                e.preventDefault();
            };
            vm.create = function (e) {
                editable.editTitle = messages.createRole;
                editable.editing = true;
                editable.clear();
            };
            vm.curRole = null;
            vm.del = function () {

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

        var $form = $("#roleEdit")
           .removeData("validator")
           .removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse("#roleEdit");

        /* update Role */
        $form.validate().settings.submitHandler = function (form) {

            var data = $form.serializeObject();
            editable.loading = true;
            $.post('/memberShips/Role/Save', data, function (rData) {
                bootbox.alert(rData.success ? "保存成功" : rData.Message);
            }).done(function () {
                $form.find("input").prop("disabled", false);
                editable.loading = false;
            }).fail(function (status) {
                if (status.status == 400) {
                    var errors = {};
                    $(status.responseJSON).each(function () {
                        errors[this.key] = this.errors.join(";");
                    });
                    $form.validate().showErrors(errors);
                }
            });
        };

        var editable = avalon.define('edit', function (vm) {
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
        });
    }


    return {
        init: function (message) {
            if (message) {
                messages =avalon.mix(messages,message);
            }
            init();
            avalon.scan();
        },
        clear: function () {
            delete avalon.vmodels['index'];
            delete avalon.vmodels['edit'];
        }
    };

})