/// <reference path="user/edit.js" />
/// <reference path="user/index.js" />
/// <reference path="../../../modules/nav.js" />

/*
这是一个注册过程，注册相关的导航信息以及一切何模块相关的数据。
*/
var nav = require("../../../modules/nav.js");


// users 相关
// index/
nav.add(["/Membership/User", "/Membership/User/Index"],
    function() {

        require.ensure(["./User/index.js"],
            function() {
                console.log("load user index success.");
            });
    });


// User editor;
//ensure can not be used variabled, because it should compli by webpack
function callUserEditFunc(funcName, content) {
    require.ensure(["./User/edit.js"],
        function() {
            {
                var userEditor = require("./User/edit.js");
                userEditor[funcName](content);
            };
        });
}

var userEditor = require("./User/edit.js");
nav.add("/MemberShip/User/Edit/:id",
    function(content) {
        callUserEditFunc("load", content);
    },
    function(content) {
        callUserEditFunc("unload", content);
    });


// role 相关
function callRoleMethod(funcName, content) {
    require.ensure(["./Role/index.js"],
        function() {
            {
                var userEditor = require("./Role/index.js");
                userEditor[funcName](content);
            };
        });
}

nav.add("/MemberShip/Role",
    function(content) {
        callRoleMethod("load", content);
    },
    function(content) {
        callRoleMethod("unload", content);
    });
//org relative
function callOrgMethod(funcName, content) {
    require.ensure(["./Org/index.js"],
        function () {
            {
                var userEditor = require("./Org/index.js");
                userEditor[funcName](content);
            };
        });
}

nav.add("/MemberShip/Org", function(content) {
    callOrgMethod("load", content)
}, function(content) {
    callOrgMethod('unload',content)
});