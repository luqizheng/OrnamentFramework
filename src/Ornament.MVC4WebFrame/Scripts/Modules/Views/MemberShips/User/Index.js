/// <reference path="../../../Combine/Views/user.typeahead.js" />
/// <reference path="../../../Combine/Views/userGroup.select2.js" />
/// <reference path="../../_appLayout.js" />
/// <reference path="../../../Combine/Views/user.typeahead.js" />
/// <reference path="../../../Combine/Memberships/user.js" />
/// <reference path="../../_appLayout.js" />
/// <reference path="../../Share/dataTables.js" />


define(function (require) {
    require("../../_appLayout.js");
    var $ = require("jquery"),
        userApi = require("../../../Combine/Memberships/user.js"),
        pm = require("/share/pm.js");
    var pmDialog;
    require("uniform")($);
    require('select2')($);
    require("table")($);
    var tableHelper = require("../../share/dataTables.js");
    //Table List checkbox.
    $("#table").on('click', 'input', function () {
        $("#BtnApply").prop("disabled", $("#table input:checked").length == 0);
    });

    $("#selApplyAction").select2();

    function showLoading(enable) {
        var parent = $(this).closest("td"),
        $loading = $("[role=loading]", parent);
        if ($loading.length == 0) {
            $loading = $("<a role='loading'><img style='float: left; margin: 5px ;' src=\"/Content/templates/pannonia/img/elements/loaders/10s.gif\" ></a>");
            $loading.appendTo(parent);
        }
        $loading.toggle(enable);
    }

    function tableEdit(config) {

        var setting = {
            "icon-lock": {
                url: "/memberships/user/lock",
                removeClass: "icon-unlock",
                addClass: "icon-lock"
            },
            "icon-unlock": {
                url: "/memberships/user/unlock",
                removeClass: "icon-lock",
                addClass: "icon-unlock"
            },
            "icon-ok": {
                url: "/memberships/user/Approve",
                removeClass: "icon-remove",
                addClass: "icon-ok"
            },
            "icon-remove": {
                url: "/memberships/user/reject",
                addClass: "icon-remove",
                removeClass: "icon-ok"
            }

        };
        
        var table = new tableHelper(config.url);
        table.AddCol("Id", false,
            function (nTd, sData, oData, iRow, iCol) {
                $(nTd).html(createBtn(oData))
                    .addClass("op")
                    .before("<td><input type='checkbox' class='actionCheckbox' value=\"" + sData + "\" /></td>")
                    .closest("tr").attr("data", sData);
            });

        table.AddCol("LoginId", true);
        table.AddCol("Name", true);
        table.AddCol("Email", true);
        table.AddBoolCol("IsLockout", 'Id', { icon: "icon-lock", name: "锁定" }, { icon: "icon-unlock", name: "解锁" });
        table.AddBoolCol("IsApproved", 'Id', { icon: "icon-ok", name: "批准" }, { icon: "icon-remove", name: "拒绝" });
        table.AddCol("LastActivityDate", false);

        var oTable = table.BuildTable("#table")
            .on("click", "ul.dropdown-menu a", function () {
                //DropDown Menu
                var id = $(this).closest("tr").attr("data"),
                self = $(this),target = setting[$("i", this).attr("class")];
                
                $.post(target.url, { ids: id }, function (result) {
                    if (result.success) {
                        self.closest(".btn-group")
                            .find("a:first i")
                            .removeClass(target.removeClass)
                            .addClass(target.addClass);
                    }
                });
            });



        /*$("#add").click(function (e) {
            e.preventDefault();
            oTable.fnAddData({ Id: 0, Name: "" });
        })*/;
    }


    function createBtn(oObj) {
        var ary = [];

        ary.push('<a href="/MemberShips/User/Edit/' + oObj.LoginId + '" class="btn tip"><i class="fam-user-edit"></i></a>'); //edit User
        ary.push('<a href="/MemberShips/User/Assign/' + oObj.LoginId + '" class="btn tip" title="" role="retievePwd"><i class="fam-group-gear"></i></a>'); //assign role and ug and org
        ary.push('<a href="#' + oObj.Id + '" class="btn tip" title="" role="pm"><i class="fam-email-edit"></i></a>'); //PM
        ary.push('<a href="#' + oObj.Email + '" class="btn tip" title="" role="verifyEmail"><i class="fam-email-go"></i></a>'); //VerifyEmail
        ary.push('<a href="#' + oObj.Email + '" class="btn tip" title="Retrieve Password" role="retievePwd"><i class="fam-key-go"></i></a>');//Retrew password
        return ary.join("");

    }

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

            pmDialog = new pm($("#pmEditor"), currentUser);
            tableEdit(tableConfig);

        }
    };


})
