/// <reference path="../Share/user.js" />
/// <reference path="../Share/dataTables.js" />
define(function(require) {
    
    require("/scripts/avalons/Pagination/pagination.js")(avalon);

    var lang = {};
    var $ = require("jquery"),
        userApi = require("/MemberShips/Scripts/Share/user.js"); //Seajs 合并引用不得不使用绝对路径
    //pm = require("/share/pm.js");
    //var pmDialog;

    var model = avalon.define("index", function(vm) {
        vm.users = [];
        //Search content
        vm.content = "";

        vm.retievePwd = function() {
            var loginId = this.$vmodel.el.LoginId;
            userApi.RetrievePassword(loginId, function(e) {
                alert(e.success ?
                    lang.retrievePwdMessage.success :
                    lang.retrievePwdMessage.fail);
            }, function() {
                //showLoading.call(self, false);
            });
        };
        vm.verifyEmail = function() {
            var model = this.$vmodel.el;
            userApi.VerifyEmail(model.Id, function(e) {
                alert(e.success ?
                    lang.verifyEmailMessage.success :
                    lang.verifyEmailMessage.fail);
            }, function() {
                showLoading.call(self, false);
            });
            return false;
        };
        vm.search = function(e) {
            avalon.vmodels.page.nav(0);
            e.preventDefault();
        };
        vm.$pageOpts = {
            pageSize: 50,
            search: function(pageIndex, pageSize, func) {
                find(pageIndex, pageSize, model.content, func);
            }
        };
        vm.lock = function(bLock) {
            var user = this.$vmodel.el.$model, self = this;
            if (typeof bLock !== "boolean") {
                bLock = !user.IsLocked;
            };
            userApi.Lock(user.Id, bLock, function(result) {
                if (result.success) {
                    self.$vmodel.el.IsLocked = bLock;
                }
            });
        };

        vm.deny = function(bDeny) {
            /// <summary>
            ///     锁定用户
            /// </summary>
            /// <param name="id"></param>
            /// <param name="bLock"></param>
            /// <param name="process"></param>
            var user = this.$vmodel.el.$model, self = this;
            if (typeof bDeny !== "boolean") {
                bDeny = !user.Deny;
            }
            userApi.Deny(user.Id, bDeny, function(result) {
                if (result.success) {
                    self.$vmodel.el.Deny = bDeny;
                }
            });
        };

    });


    function find(page, size, content, func) {
        $.get("/MemberShips/User/List", {
            page: page,
            search: content,
            size: size
        }, function(d) {
            model.users = [];
            for (var i = 0; i < d.data.length; i++) {
                model.users.push(d.data[i]);
            }
            func(d.totalRecords);
        });
    }

    return {
        init: function(lang1) {
            lang = lang1;
            avalon.scan();
        }
    };


})