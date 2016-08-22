

var roleServices = require("../../../../modules/Memberships/RoleService.js")
var editor = null; //roleEditor;
var $editorDialog; //dialog of editor
function createList(listId) {
    var model = avalon.define({
        $id: listId,
        roles: [],
        edit: function (el) {
            editor.role = el;
            editor.title="編輯角色"
            $editorDialog.modal('show');
        },
        create: function () {
            editor.title="新增角色"
            editor.role = { Id: "", Name: "", Remark: "" }
            $editorDialog.modal('show');
        }
    });

    roleServices.list(0, 30)
        .done(function (result) {
            model.roles = result;

        });

 $editorDialog = $('#role-editor-dialog')
        .modal({
            keyboard: false,
            show: false
        });



}

var listId = "roleIndex";
var editorId = "roleEditor";
var RoleEditor = require("./edit.js");
module.exports = {
    load: function (loadContent) {
        createList(listId);
        editor = RoleEditor.create(editorId,function(){
            $editorDialog.modal('close')
        });
        avalon.scan(loadContent)
    },
    unload: function () {
        delete avalon.vmodels[listId];
        delete avalon.vmodels[editorId];
    }
}