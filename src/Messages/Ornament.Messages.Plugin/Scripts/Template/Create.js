define(function(require) {
    var $ = require('jquery');

    require('select2')($);

    require("bootstrap")($);
    require('ckeditor');
    require('validate')($);


    var editor = CKEDITOR.replace('editor');
    editor.on("blur", function() {
        content[$("#Language").val()] = {
            content: editor.getData(),
            subject: $("#subject").val()
        };
    });

    $("#Language").select2({ allowClear: false }).change(function() {
        var cont = content[$(this).val()];
        editor.setData(cont ? cont.content : "");
        $("#subject").val(cont ? cont.subject : "");
    }).change().next().click(function() {
        delete content[$("#Language").val()];
    });

    $("#Notify").select2({ allowClear: false });

    $("form").submit(function() {
        //Make sure the editor save to content.
        content[$("#Language").val()] = {
            content: editor.getData(),
            subject: $("#subject").val()
        };

        var ary = [];
        for (var key in content) {
            ary.push("<input type='hidden' value='" + content[key].content + "' name='Contents[" + key + "].Value'/>");
            ary.push("<input type='hidden' value='" + content[key].subject + "' name='Contents[" + key + "].Subject'/>");
            ary.push("<input type='hidden' value='" + key + "' name='Contents[" + key + "].Language'/>");
        }
        $("[name=editor]").remove();
        $("form").append(ary.join(""));
    });

})