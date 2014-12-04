
define(function (require) {

    var model;
    function definedAvalon(editor) {
        model = avalon.define("editTemp", function (vm) {
            vm.Name = "";
            vm.Remark = "";
            vm.Contents = {}; //key is language, value please refer vm.content;
            vm.content = { //current editing content.
                Value: "",
                Subject: "",
                Language: ""
            };
            vm.Language = "";
            vm.$watch("Language", function (newValue) {
                var content = model.Contents[newValue];
                if (!content) {
                    content = {
                        Value: "",
                        Subject: "",
                        Language: newValue
                    }
                    model.Contents[newValue] = content;
                }
                vm.content = content;
                editor.setData(content.Value);
            });
        });

    }
    function Init(template, editor) {

     
        model.Name = template.Name;
        model.Remark = template.Remark;
        model.Contents = template.Contents;
        for (var key in template.Contents) {
            console.log(key);
            model.Language = key;
            break;
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
            before: function (postData) {
                postData.Contents = [];
                for (var language in model.Contents) {
                    console.log(language);
                    var content = model.Contents[language];
                    if (content && content.Subject != "" && content.Value != "") {
                        postData.Contents.push(content);
                    }
                }
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