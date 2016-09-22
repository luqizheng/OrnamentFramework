/// <reference path="../../../../modules/membership/orgservice.js" />
/// <reference path="../../../../modules/avalon/ms-tree/ms-tree.js" />
/// <reference path="../../../../modules/membership/orgservice.js" />
/// <reference path="../../../../modules/vaform.js" />

var OrgTree = require("../../../../modules/avalon/ms-tree/ms-tree.js");
var Panel=require("../../../../modules/avalon/ms-panel/ms-panel.js")
var OrgService = require("../../../../modules/membership/orgservice.js");
var avalon = require('avalon');
var $ = require('jquery');

function InitVaForm(fnSavedCallback) {
  
    require.ensure(["../../../../modules/vaform.js"],

        function () {
            var strEditorId = "orgEditor";
            var vaform = require("../../../../modules/vaform.js");
            var $form = $("#" + strEditorId);

            vaform.forWebApi($form,
                function () {
                    var org=avalon.vmodels[strEditorId].org.$model;
                    var postData={
                        id:org.id,
                        name:org.name,
                        remark:org.remark,
                        parent:org.parentId
                    };
                    OrgService.save(postData).done(function () {
                        alert("保存成功");
                        fnSavedCallback && fnSavedCallback();
                    });

                });
        });
}

function Init() {
    var result = avalon.define({
        $id: 'orgTree',
        orgConfig: {
            subPropName: "subOrgs",
            getText: function (el) {
                return el.name
            },
            onSelect: function (el) {
                editor.org=el;
            }
        },
      
        orgs: [{ name: '', subOrgs: [], open: false,id:0 }] //avalon无法自动parse，因此要处理好对象接哦古
    }),
        editor = avalon.define({
            $id: 'orgEditor',
            org: {
                id:0,
                name: "",
                remark: "",
                parentId: ""
            }
        });

    InitVaForm();
    OrgService.list(null).done(function (data) {
        result.orgs = data;
    })
    return result;
}


function Onload(contentLoadingArea) {
    Init();
    avalon.scan(contentLoadingArea)
}

function Unload() {
    delete avalon.vmodels["orgTree"];
    delete avalon.vmodels["orgEditor"];
}

module.exports = {
    load: Onload,
    unload: Unload
}