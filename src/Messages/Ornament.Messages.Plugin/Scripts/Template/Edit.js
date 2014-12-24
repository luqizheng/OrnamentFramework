﻿
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
                var findContent = false;
                for (var i = 0; i < vm.Contents.length; i++) {
                    if (vm.Contents[i].Language == newValue) {
                        findContent = true;
                        vm.content = vm.Contents[i];
                        break;
                    }
                }
                if (!findContent) {
                    vm.content = {
                        Value: "",
                        Language: newValue,
                        Subject:"",
                    };
                    vm.Contents.push(vm.content);
                }

                editor.setData(vm.content.Value);
            });
        });

    }
    function Init(template, editor) {

        model.Name = template.Name;
        model.Remark = template.Remark;
        model.Contents = template.Contents;
        if (template.Contents&&template.Contents[0]) {
            model.Language = template.Contents[0].Language;
        }


        editor.on("blur", function () {
            if (model.content.Subject != "") {
                model.content.Value = editor.getData();
            }
        });

        $("#editTemp").vaform({
            success: function (rdata) {
               
                alert(rdata.success ? "Save success." : rdata.message);
            },
            done: function (postData) {
               
                $("#subMitData").prop('disabled', false);
            },
            before: function (postData) {
                postData.Contents = [];
                for (var i = 0; i < model.Contents.length; i++) {
                    postData.Contents.push({
                        Subject: model.Contents[i].Subject,
                        Language: model.Contents[i].Language,
                        Value: model.Contents[i].Value
                    });
                }
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