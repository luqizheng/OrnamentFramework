define(function(require) {
    var $ = require('jquery');
    require('bootstrap')($);
    require('select2')($);
    require('ckeditor');
    
    var editor = CKEDITOR.replace('editor', {
        filebrowserBrowseUrl: '/Files/Manager/FileCtrl'
    });
    editor.on("blur", function () {
        content[$("#Language").val()] = {
            content: editor.getData(),
            subject: $("#subject").val()
        };
    });

    $("#Type").select2();
    $("#Language").select2().change(function () {
        var cont = content[$(this).val()];
        editor.setData(cont ? cont.content : "");
        $("#subject").val(cont ? cont.subject : "");
    }).change().next().click(function () {
        delete content[$("#Language").val()];
    });


    $("form").submit(function () {
        //Make sure the editor save to content.

        content[$("#Language").val()] = {
            content: editor.getData(),
            subject: $("#subject").val()
        };

        var ary = [];
        for (var key in content) {
            ary.push("<input type='hidden' value='" + content[key].content + "' name='NewContents[" + key + "]'/>");
            ary.push("<input type='hidden' value='" + content[key].subject + "' name='NewSubjects[" + key + "]'/>");
        }
        $("form").append(ary.join(""));
    });
});