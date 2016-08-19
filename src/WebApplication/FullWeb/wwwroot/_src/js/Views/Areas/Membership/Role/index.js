
function createList(listId) {
    var model = avalon.define({
        $id: listId,
        roles: [],
        edit: function (el) {
            editor.role = el;
            $editorDialog.modal('show');
        },
        create: function () {
            editor.role = { Id: "", Name: "", Remark: "" }
            $editorDialog.modal('show');
        }
    });

    roleServices.list(0, 30)
        .done(function (result) {
            model.roles = result;

        });

    var $editorDialog = $('#role-editor-dialog')
        .modal({
            keyboard: false,
            show: false
        });


  
}

var listId="roleIndex";
var editorId="roleEditor";
var RoleEditor=require("./edit.js");
module.exports = {
    load: function (loadContent) {
        createList(listId);
        RoleEditor.create(editorId);
        avalon.scan(loadContent)
    },
    unload: function () {
        delete avalon.vmodels[listId];
        delete avalon.vmodels[editorId];
    }
}