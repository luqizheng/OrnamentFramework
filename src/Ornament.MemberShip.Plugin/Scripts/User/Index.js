/// <reference path="../Share/user.js" />
/// <reference path="../Share/dataTables.js" />


define(function (require) {
    require("/scripts/views/_appLayout.js");
    require("/scripts/modules/combine/pagination.js")(avalon);

    var $ = require("jquery"),
       userApi = require("/MemberShips/Scripts/Share/user.js"); //Seajs 合并引用不得不使用绝对路径
    //pm = require("/share/pm.js");
    var pmDialog;

    var model = avalon.define("index", function (vm) {
        vm.users = [];

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
            var id = $(self.target).closest("tr").attr("data");
            var url = bApprove ? "/memberships/user/Approve" : "/memberships/user/reject";
            $.post(url, { ids: id }, function (result) {
                if (result.success) {
                    self.$vmodel.el.IsApprove = bApprove;
                }
            });
        }

    }); 

    var page = avalon.define("page", function (vm) {

        vm.search = function (pageIndex, pageSize) {
            find(pageIndex, model.content);
        };
    });

    function find(page, content) {
        $.get("/MemberShips/User/List", {
            page: page,
            search: content
        }, function (d) {
            model.users = [];
            for (var i = 0; i < d.data.length; i++) {
                model.users.push(d.data[i]);
            }
            page.totalRecords = d.TotalRecords;
        });
    }



    find(0, null);


    return {
        init: function (lang, currentUser, tableConfig) {

            //Table Verify User.
            $("#table").on("click", "a[role=verifyEmail]", function () {
                var loginId = $("td:first input", $(this).closest("tr")).val();
                var self = this;
                showLoading.call(self, true);
                userApi.VerifyEmail(loginId, $(this).attr("href").substr(1), function (e) {
                    alert(e.success ?
                        lang.verifyEmailMessage.success :
                        lang.verifyEmailMessage.fail);

                }, function () {
                    showLoading.call(self, false);
                });
                return false;
            }).on("click", "a[role=pm]", function () {
                pmDialog.show($(this).attr("href").substr(1));
            }).on('click', "[role=retievePwd]", function () {
                var self = this, loginId = $("td:first input", $(this).closest("tr")).val();
                showLoading.call(this, true);
                userApi.RetrievePassword(loginId, function (e) {
                    alert(e.success ?
                        lang.retrievePwdMessage.success :
                        lang.retrievePwdMessage.fail);
                }, function () {
                    showLoading.call(self, false);
                });
            });

            avalon.scan();

        }
    };


})