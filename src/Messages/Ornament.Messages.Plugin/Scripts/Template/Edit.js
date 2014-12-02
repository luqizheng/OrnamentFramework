
define(function (require) {



    function Init(template) {

        var model = avalon.define("editTemp", function (vm) {
            vm.Name = "";
            vm.Remark = "";
            vm.Contents = "";
            vm.content = {
                Value: "",
                Subject: "",
                Language: ""
            };
            vm.Language = "";
            vm.$watch("Language", function(newValue) {
                var content = model.Contents[newValue];
                if (!content) {
                    content= {
                        Value: "",
                        Subject: "",
                        Language:newValue
                    }
                }
                vm.content = content;

            });
        });

        model.Name = template.Name;
        model.Remark = template.Remark;
        model.Contents = template.Contents;
        for (var a in template.Contents) {
            model.Language = a;
            break;
        }
        
        //var editor = CKEDITOR.replace('editor');
        //editor.on("blur", function () {
        //    content[$("#Language").val()] = {
        //        content: editor.getData(),
        //        subject: $("#subject").val()
        //    };
        //});

        //$("#Language").change(function () {
        //    var cont = content[$(this).val()];
        //    editor.setData(cont ? cont.content : "");
        //    $("#subject").val(cont ? cont.subject : "");
        //}).change().next().click(function () {
        //    delete content[$("#Language").val()];
        //});


        //$("form").submit(function () {
        //    //Make sure the editor save to content.
        //    content[$("#Language").val()] = {
        //        content: editor.getData(),
        //        subject: $("#subject").val()
        //    };

        //    var ary = [];
        //    for (var key in content) {
        //        ary.push("<input type='hidden' value='" + content[key].content + "' name='Contents[" + key + "].Value'/>");
        //        ary.push("<input type='hidden' value='" + content[key].subject + "' name='Contents[" + key + "].Subject'/>");
        //        ary.push("<input type='hidden' value='" + key + "' name='Contents[" + key + "].Language'/>");
        //    }
        //    $("[name=editor]").remove();
        //    $("form").append(ary.join(""));
        //});
    };

    return function (template) {
        Init(template);
        avalon.scan();
    }

})