
define(function (require) {

    var model;
    function definedAvalon(editor) {
        model = avalon.define("editTemp", function (vm) {
            vm.Name = "";
            vm.Remark = "";
            vm.Contents = [];
            vm.content = { //current editing content.
                Value: "",
                Subject: "",
                Language: ""
            };

            vm.Language = "";
            vm.$watch("Language", function (newValue) {
                var content = null;
                for (var i = 0; i < vm.Contents.length; i++) {
                    if (vm.Contents[i].Language == newValue) {
                        content = vm.Contents[i];
                        vm.content = vm.Contents[i];
                        break;
                    }
                }
                if (content == null) {
                    content = {
                        Value: "",
                        Name: "",
                        Language: newValue
                    };
                    vm.Contents.push(content);
                }

                editor.setData(content.Value);
            });
        });

    }
    function Init(template, editor) {

        model.Name = template.Name;
        model.Remark = template.Remark;
        model.Contents = template.Contents;
        if (template.Contents.length != 0) {
            model.Language = template.Contents[0].Language;
        }


        editor.on("blur", function () {
            if (model.content.Subject != "") {
                model.content = editor.getData();
            }
        });

        $("#editTemp").vaform({
            success: function (rdata) {
                alert(rdata.success ? "Save success." : rdata.message);
            },
            done: function () {
                $("#subMitData").prop('disabled', false);
            },
            before: function () {
                $("#subMitData").prop('disabled', true);
            }
        });

    };

    return {
        init: function (template) {

            require(["vaform", "ckeditor"], function () {

                var editor = CKEDITOR.instances["Content"];
                definedAvalon(editor);
                avalon.scan();
                Init(template, editor);
            });
        },
        clear: function () {
            delete avalon.vmodels["editTemp"];
        }

    }

})