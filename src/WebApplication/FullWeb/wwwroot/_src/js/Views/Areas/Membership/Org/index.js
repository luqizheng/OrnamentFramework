/// <reference path="../../../../modules/membership/orgservice.js" />
/// <reference path="../../../../modules/avalon/ms-tree/ms-tree.js" />
/// <reference path="../../../../modules/membership/orgservice.js" />
/// <reference path="../../../../modules/vaform.js" />
var OrgService = require("../../../../modules/membership/orgservice.js");
require("../../../../modules/avalon/ms-tree/ms-tree.js");
require("../../../../modules/avalon/ms-panel/ms-panel.js")

var avalon = require('avalon');
var $ = require('jquery');

var OrgTree = require("./_orgTree");
var Editor = require("./_editor")


function Onload(contentLoadingArea) {
    var editorOrg=null;
    var editor = Editor.create("orgEditor",function(returnVal){
        avalon.mix(editorOrg,returnVal);
    })
    var tree = OrgTree.create('orgTree', function (el) {
        editorOrg=el;
        editor.org = el;
    })

    avalon.scan(contentLoadingArea)
}

function Unload() {
    OrgTree.destory('orgTree');
    Editor.destory('orgEditor');
}

module.exports = {
    load: Onload,
    unload: Unload
}