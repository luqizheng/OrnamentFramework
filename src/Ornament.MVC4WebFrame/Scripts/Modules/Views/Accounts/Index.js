/// <reference path="../_appLayout.js" />
define(function (require) {
    require("../_applayout.js");
    var $ = require("jquery"),
        User = require('/MemberShips/Scripts/Share/user.js');
    require('bootstrap')($);
    require("validate")($);

    $('a[data-toggle="tab"]').on('shown', function (e) {
        $($(this).attr("href")).find("input:first").focus();
    });

    var baseInfo = avalon.define("basicInfo", function (vm) {


        vm.user = new User();

        vm.save = function () {
            vm.user.$model.save(function (data) {
                alert('保存成功');
            });
        };
    });

    avalon.define('pwd', function (vm) {
        vm.currentPwd = "";
        vm.newPwd = "";
        vm.confirmPwd = "";
        vm.save = function () {
            {
                alert($("#pwd").valid());
                return;
                User.ChangePassword(vm.newPwd, vm.confirmPwd, vm.currentPwd, function (d) {
                    alert(d ? '修改密码成功' : '修改密码失败');
                });
            }
        };
    });
    avalon.scan();
    //初始化
    baseInfo.user.load();
    return function(opts) {
       
    };


});

