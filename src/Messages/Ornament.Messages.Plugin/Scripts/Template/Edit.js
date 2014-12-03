
define(function (require) {



    function Init(template, editor) {

        var model = avalon.define("editTemp", function (vm) {
            vm.Name = "";
            vm.Remark = "";
            vm.Contents = "";
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

        model.Name = template.Name;
        model.Remark = template.Remark;
        model.Contents = template.Contents;
        for (var key in model.Contents) {
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
                for (var key in model.Contents) {
                    var content = model.Contents[key];
                    if (content && content.Subject != "" && content.Value != "") {
                        postData.Contents.push(content);
                    }
                }
            }
        });
       
    };

    return {
        init: function (template) {

            require(["vaform"], function () {
                var editor = CKEDITOR.instances["Content"];
                Init(template, editor);
                avalon.scan();


            });
        },
        clear:function() {
            delete avalon.vmodels["editTemp"];
        }

    }

})