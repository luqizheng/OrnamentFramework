define(function (require) {


    require("/js/avalons/pager/pager.js");

    function init() {
        $("#listRole").nestable();
        var model = avalon.define('index', function (vm) {
            vm.edit = function () {
                var m = this.$vmodel.el;
                editable.Id = m.Id;
                editable.Name = m.Name;
                editable.Remarks = m.Remarks;
                editable.Permissions = m.Permissions;
                vm.editing = true;
            };
            vm.editing = false;
            vm.roles = [{ Id: "", Name: "", Remarks: "" }];
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

        var editable = avalon.define('edit', function (vm) {
            vm.Id = "";
            vm.Name = "";
            vm.Remarks = "";
            vm.Permissions = [];
            vm.save = function () {
                var $form = $('roleEdit');
                var data = $form.serializeObject();
                $.post('/memberShips/Role/Save', data, function (rData) {
                    alert(rData.success ? "保存成功" : rData.Message);
                }).done(function () {
                    $form.find("input").prop("disabled", false);
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
        });
    }

    return {
        init: function () {
            init();
            avalon.scan();
        },
        clear: function () {
            delete avalon.vmodels['role'];
        }
    };

})