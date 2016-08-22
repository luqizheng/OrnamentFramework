
var roleServices = require("../../../../modules/Memberships/RoleService.js")
function getForm(strEditorId)
{
    return $("form",$("#"+strEditorId));
}
function InitVaForm(strEditorId, fnSavedCallback) {
    require.ensure(["../../../../modules/vaform.js"],
        function () {
            var vaform = require("../../../../modules/vaform.js");
            var $form=getForm(strEditorId);
            vaform.forWebApi($form,
                function () {
                    roleServices.save(avalon.vmodels[strEditorId].role.$model).done(function () {
                        alert("保存成功");
                        fnSavedCallback();
                    });

                });
        });
}


function CreateEditor(strEditorId) {
    var editor = avalon.define({
        $id: strEditorId,
        role: { Id: "", Name: "", Remark: "" },
        save: function () {
            getForm(strEditorId).submit();
        },
        title:""
    });
    return editor;
}

module.exports = {
    create: function (editorId, fnSavedCallback) {       
        InitVaForm(editorId, fnSavedCallback);
        return CreateEditor(editorId);

    } //editorId 也是form的Id，也是controller的Id
}