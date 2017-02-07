var avalon = require('avalon');
var $ = require('jquery');
var OrgService = require("../../../../modules/membership/orgservice.js");

module.exports = {
    destory:function(strEditorId){
        delete avalon.vmodels[strEditorId];
    },
    create: function (strEditorId,fnSavedCallback) {
        var editor = avalon.define({
            $id: strEditorId,
            org: {
                id: 0,
                name: "",
                remark: "",
                parentId: ""
            }
        });

        require.ensure(["../../../../modules/vaform.js"],
            function () {
                var vaform = require("../../../../modules/vaform.js");
                var $form = $("#" + strEditorId);

                vaform.forWebApi($form,
                    function () {
                        var org = avalon.vmodels[strEditorId].org.$model;
                        var postData = {
                            id: org.id,
                            name: org.name,
                            remark: org.remark,
                            parent: org.parentId
                        };
                        OrgService.save(postData).done(function (returnData) {
                            alert("保存成功");
                            fnSavedCallback && fnSavedCallback(returnData);
                        });

                    });
            });
        return editor;
    }
}