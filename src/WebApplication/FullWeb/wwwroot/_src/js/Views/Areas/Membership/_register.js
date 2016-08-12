/// <reference path="user/edit.js" />
/// <reference path="user/index.js" />
/// <reference path="../../../modules/nav.js" />

var nav = require("../../../modules/nav.js")

nav.add(["/Membership/User", "/Membership/User/Index"], function () {

    require.ensure(['./user/index.js'],
        function ($index) {
            console.log("load user index success.")
        })
});


nav.add("/MemberShip/User/Edit/:id", function () {
    require.ensure(["./user/edit.js"], function () {
        console.log("load user edit success.")
       require("./user/edit.js")
    })
})