define(function (require) {
    
    var bootbox = require("bootbox");
    var messages = {
        success: '保存成功'
    }, $form, editor;

    function changeVal() {
        $form = $("#editor")
          .removeData("validator")
          .removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse("#editor");

        /* update Role */
        $form.validate().settings.submitHandler = function (form) {

            var data = $form.serializeObject();
            editor.loading = true;
            $.post('/memberShips/UserGroup/Save', data, function (rData) {
                bootbox.alert(rData.success ? messages.success : rData.Message);
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
    }

    function defineAvalon() {
        changeVal();
        var index = avalon.define('index', function(vm) {
            vm.userGroups = [];

            vm.del = function() {

            };
            vm.create = function() {
                editor.clear();
                editor.editing = true;
            };
            vm.edit = function() {
                var ug = this.$vmodel.el;
                avalon.mix(editor, ug);
                editor.editing = true;
            };
            $.pager = {
                search: function(index, maxRecords, func) {
                    $.get("/MemberShips/UserGroup/List", {
                        size: maxRecords,
                        index: index
                    }, function(d) {
                        index.userGroups = d.data;
                        func(d.totalRecords);
                    });
                }
            };
        });

        editor = avalon.define('edit', function(vm) {
            vm.Id = "";
            vm.Name = "";
            vm.Roles = [];
            vm.Remarks = "";
            vm.editing = false;
            vm.loading = false;

            vm.clear = function() {
                avalon.mix(vm, {
                    Id: "",
                    Name: "",
                    Roles: [],
                    Remarks: ""
                });
            };

            vm.submit = function() {
                vm.loading = true;
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

        clear: function() {
            delete avalon.vmodels['index'];
            delete avalon.vmodels['edit'];
        }
    };
})