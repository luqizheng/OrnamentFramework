/// <reference path="../Share/user.js" />
/// <reference path="../Share/dataTables.js" />


define(function (require) {
    require("/scripts/views/_appLayout.js");
    require("/scripts/modules/combine/pagination.js")(avalon);

    var lang = {};
    var $ = require("jquery"),
       userApi = require("/MemberShips/Scripts/Share/user.js"); //Seajs 合并引用不得不使用绝对路径
    //pm = require("/share/pm.js");
    //var pmDialog;

    var model = avalon.define("index", function (vm) {
        vm.users = [];
        //Search content
        vm.content = "";
        vm.swtchLock = function () {
            var mySet = this.$vmodel.el.IsLockout;
            lock(this, !mySet);
        };
        vm.lock = function () {
            lock(data, true, this);
        };
        vm.unlock = function () {
            lock(this, false);
        };
        vm.switchApprove = function () {
            var mySet = this.$vmodel.el.IsApprove;
            approve(this, !mySet);
        };
        vm.approve = function () {
            approve(this, true);
        };
        vm.verify = function () {
            approve(this, false);
        };
        vm.retievePwd = function () {
            userApi.RetrievePassword(loginId, function (e) {
                alert(e.success ?
                    lang.retrievePwdMessage.success :
                    lang.retrievePwdMessage.fail);
            }, function () {
                //showLoading.call(self, false);
            });
        };
        vm.verifyEmail = function () {

            var email = $(this).attr("href").substr(1);
            var loginId = $("td:first input", $(this).closest("tr")).val();
            userApi.VerifyEmail(loginId, email, function (e) {
                alert(e.success ?
                    lang.verifyEmailMessage.success :
                    lang.verifyEmailMessage.fail);

            }, function () {
                showLoading.call(self, false);
            });
            return false;
        };

        vm.$pageOpts = {
            pageSize: 10,
            search: function (pageIndex, pageSize, func) {
                find(pageIndex, pageSize, model.content, func);
            }
        };

        function lock(self, bLock) {
            /// <summary>
            ///     锁定用户
            /// </summary>
            /// <param name="id"></param>
            /// <param name="bLock"></param>
            /// <param name="process"></param>
            var id = $(self).closest("tr").attr("data");
            var url = bLock ? "/memberships/user/lock" : "/memberships/user/unlock";
            $.post(url, { ids: id }, function (result) {
                if (result.success) {
                    self.$vmodel.el.IsLockout = bLock;
                }
            });
        }

        function approve(self, bApprove) {
            /// <summary>
            ///     锁定用户
            /// </summary>
            /// <param name="id"></param>
            /// <param name="bLock"></param>
            /// <param name="process"></param>
            var id = $(self).closest("tr").attr("data");
            var url = bApprove ? "/memberships/user/Approve" : "/memberships/user/reject";
            $.post(url, { ids: id }, function (result) {
                if (result.success) {
                    self.$vmodel.el.IsApproved = bApprove;
                }
            });
        }

    });


    function find(page, size, content, func) {
        $.get("/MemberShips/User/List", {
            page: page,
            search: content,
            size: size
        }, function (d) {
            model.users = [];
            for (var i = 0; i < d.data.length; i++) {
                model.users.push(d.data[i]);
            }
            func(d.totalRecords);
        });
    }

    return {
        init: function (lang1, currentUser, tableConfig) {
            lang = lang1;
            avalon.scan();
        }
    };


})