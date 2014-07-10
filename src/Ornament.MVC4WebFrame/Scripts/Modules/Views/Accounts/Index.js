
define(function (require) {
    
    var $ = require("jquery"),
        User = require('/MemberShips/Scripts/Share/user.js');
    require('bootstrap')($);
    require("validate")($);
    var messages;
    /*
    message={
    pwdSuccess:'',
    pwdFiale:'',
    saveSuccess:''
}
    */
    $('a[data-toggle="tab"]').on('shown', function (e) {
        $($(this).attr("href")).find("input:first").focus();
    });

    var baseInfo = avalon.define("basicInfo", function (vm) {
        vm.user = new User();
        vm.save = function (e) {
            vm.user.$model.save(function (data) {
                if (data.success) {
                    alert(messages.saveSuccess);
                }
            });
            e.preventDefault();
        };
    });

    avalon.define('pwd', function (vm) {
        vm.currentPwd = "";
        vm.newPwd = "";
        vm.confirmPwd = "";
        vm.save = function (e) {
            {
                User.ChangePassword(vm.newPwd, vm.confirmPwd, vm.currentPwd, function (d) {
                    alert(d ? messages.pwdSuccess : messages.pwdFiale);
                });
                e.preventDefault();

            }
        };
    });
    avalon.scan();
    return function (opts) {
        //初始化
        baseInfo.user.load();
        messages = opts.messages;
        
    };


});

