/// <reference path="../../../../modules/avalon/ms-tree/ms-tree.js" />
/// <reference path="../../../../modules/membership/orgservice.js" />
/// <reference path="../../../../modules/vaform.js" />
var OrgTree = require("../../../../modules/avalon/ms-tree/ms-tree.js");
var OrgService = require("../../../../modules/membership/orgservice.js");
var avalon = require('avalon');

function InitVaForm(fnSavedCallback) {
    var strEditorId = "orgEditor";
    require.ensure(["../../../../modules/vaform.js"],
        function () {
            var vaform = require("../../../../modules/vaform.js");
            var $form = $("#" + strEditorId);
           
            vaform.forWebApi($form,
                function () {
                    OrgService.save(avalon.vmodels[strEditorId].org.$model).done(function () {
                        alert("保存成功");
                        fnSavedCallback && fnSavedCallback();
                    });

                });
        });
}

function init() {
    var result = avalon.define({
        $id: 'orgTree',
        orgs: []
    });
    var editor = avalon.define({
        $id: 'orgEditor',
        org: {
            name: "",
            remark: "",
            parentId: ""
        }
    });

    InitVaForm(function() {
        
    });
    return result;
}


function onload(contentLoadingArea) {
    init();
    avalon.scan(contentLoadingArea)
}

function unload() {
    delete avalon.vmodels["orgTree"];
}

module.exports = {
    load: onload,
    unload: unload
}