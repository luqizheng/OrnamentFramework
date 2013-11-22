/// <reference path="../Combine/user.js" />


define(function (require) {
    require("/scripts/_appLayout.js");
    var $ = require("jquery"),
        userApi = require("../Combine/user.js"),
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
        table.AddBoolCol("IsLockout", 'Id', {
            icon: "icon-lock",
            name: "锁定"
        },
            {
                icon: "icon-unlock",
                name: "解锁"
            }, lockUser);
        table.AddBoolCol("IsApproved", 'Id',
            { icon: "icon-ok", name: "批准" }, { icon: "icon-remove", name: "拒绝" }, approve);
        table.AddCol("LastActivityDate", false);

        table.BuildTable("#table");

        function lockUser(id, bLock, process) {
            /// <summary>
            /// 锁定用户
            /// </summary>
            /// <param name="id"></param>
            /// <param name="bLock"></param>
            /// <param name="process"></param>
            var url = bLock ? "/memberships/user/lock" : "/memberships/user/unlock";
            $.post(url, { ids: id }, function (result) {
                process(result.success);
            });
        }

        function approve(id, bApprove, process) {
            /// <summary>
            /// 锁定用户
            /// </summary>
            /// <param name="id"></param>
            /// <param name="bLock"></param>
            /// <param name="process"></param>
            var url = bApprove ? "/memberships/user/Approve" : "/memberships/user/reject";
            $.post(url, { ids: id }, function (result) {
                process(result.success);
            });
        }
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
