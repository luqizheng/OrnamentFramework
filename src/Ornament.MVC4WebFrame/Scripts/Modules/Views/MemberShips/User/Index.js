/// <reference path="../../../Combine/Views/user.typeahead.js" />
/// <reference path="../../../Combine/Views/userGroup.select2.js" />
/// <reference path="../../_appLayout.js" />
/// <reference path="../../../Combine/Views/user.typeahead.js" />
/// <reference path="../../../Combine/Memberships/user.js" />
/// <reference path="../../_appLayout.js" />


define(function (require) {
    require("../../_appLayout.js");

    var $ = require("jquery"),
        userTypeahead = require("../../../Combine/Views/user.typeahead.js"),
        userApi = require("../../../Combine/Memberships/user.js"),
        pm = require("/share/pm.js");
    var pmDialog;
    require("uniform")($);
    require('select2')($);
    require("table")($);

    //Table List checkbox.
    $("#table").on('click', 'input', function () {
        $("#BtnApply").prop("disabled", $("#table input:checked").length == 0);
    });

    $("#selApplyAction").select2();

    userTypeahead.typeahead("#searchContent");



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
        var oTable = $("#table").dataTable({
            "bProcessing": true,
            "bServerSide": true,
            "sAjaxSource": config.url,
            "aaSorting": [[0, false], [1, 'asc']],
            "aoColumns": [
               {
                   mData: "Id",
                   bSortable: false,
                   fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                       $(nTd).html("<input type='checkbox' class='actionCheckbox' value=\"" + sData + "\">");
                   }
               },
                {
                    bSortable: false,
                    mData: "Id",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        $(nTd).html(createBtn(oData));
                    }
                },
                { "mData": "LoginId", bSortable: true },
                { "mData": "Email", bSortable: true },
                { "mData": "IsLockout", bSortable: false },
                { "mData": "IsApproved", bSortable: false },
                { "mData": "Name", bSortable: true },
                { "mData": "LastActivityDate", bSortable: true }

            ],
            "bJQueryUI": false,
            "bAutoWidth": false,
            "sPaginationType": "full_numbers",
            "oLanguage": {
                "sSearch": "<span>查询:</span> _INPUT_",
                "sLengthMenu": "<span>显示数据:</span> _MENU_",
                "oPaginate": { "sFirst": "首页", "sLast": "最后一页", "sNext": ">", "sPrevious": "<" }
            }

        });

        $("#add").click(function (e) {
            e.preventDefault();
            oTable.fnAddData({ Id: 0, Name: "" });
        });
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
            });

            $("#table").on('click', "[role=retievePwd]", function () {
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
            $("#table").on("click", "a[role=pm]", function () {
                pmDialog.show($(this).attr("href").substr(1));
            });

            tableEdit(tableConfig);
        }
    };


})
