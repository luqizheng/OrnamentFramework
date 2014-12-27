/// <reference path="../Share/user.js" />
/// <reference path="../Share/dataTables.js" />
define(function (require) {

    
    

    var lang = {};
    var userApi = require("/MemberShips/Scripts/Share/user.js"); //Seajs 合并引用不得不使用绝对路径
    //require('validate');


    function  Init() {
        var model = avalon.define("index", function (vm) {
            vm.users = [];
            //Search content
            vm.content = "";

            vm.retievePwd = function (el) {
                var loginId = el.LoginId;
                userApi.RetrievePassword(loginId, function (e) {
                    alert(e.success ?
                        lang.retrievePwdMessage.success :
                        lang.retrievePwdMessage.fail);
                }, function () {
                    //showLoading.call(self, false);
                });
            };
            vm.verifyEmail = function (model) {
                
                userApi.VerifyEmail(model.Id, function (e) {
                    alert(e.success ?
                        lang.verifyEmailMessage.success :
                        lang.verifyEmailMessage.fail);
                }, function () {
                    showLoading.call(self, false);
                });
                return false;
            };
            
            vm.search = function (e) {
                avalon.vmodels.pager.nav(0);
                e.preventDefault();
            };
            vm.pager = {
                pageSize: 50,
                search: function (pageIndex, pageSize, func) {
                    find(pageIndex, pageSize, model.content, func);
                }
            };
            vm.lock = function (user, bLock) {
                
                if (typeof bLock !== "boolean") {
                    bLock = !user.IsLocked;
                };
                userApi.Lock(user.Id, bLock, function (result) {
                    if (result.success) {
                        user.IsLocked = bLock;
                    }
                });
            };
            vm.total =7;
            vm.deny = function (user, bDeny) {
                /// <summary>
                ///     锁定用户
                /// </summary>
                /// <param name="id"></param>
                /// <param name="bLock"></param>
                /// <param name="process"></param>
                if (typeof bDeny !== "boolean") {
                    bDeny = !user.Deny;
                }
                userApi.Deny(user.Id, bDeny, function (result) {
                    if (result.success) {
                        user.Deny = bDeny;
                    }
                });
            };
            vm.loading = false;
            function find(page, size, content, func) {
                vm.loading = true;
                $.get("/MemberShips/User/List", {
                    page: page,
                    search: content,
                    size: size
                }, function (d) {
                    vm.loading = false;
                    model.users = [];
                    for (var i = 0; i < d.data.length; i++) {
                        model.users.push(d.data[i]);
                    }
                    model.total = d.TotalRecords;
                    func(d.TotalRecords);

                });
            }
        });
    }
    


   

    return {
        init: function (lang1) {
            lang = lang1;
            require(["pager"],function() {
                Init();
                avalon.scan();
            });
        },
        clear: function () {
            console.log("clear unser index.");
            delete avalon.vmodels["index"];
        }
    };


})