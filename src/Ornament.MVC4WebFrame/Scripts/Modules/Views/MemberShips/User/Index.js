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

    //Table List checkbox.
    $(".actionCheckbox").uniform().change(function () {
        $("#BtnApply").prop("disabled", $(".actionCheckbox:checked").length == 0);
    }).change();

    $("#selApplyAction").select2();

    userTypeahead.typeahead("#searchContent");



    function showLoading(enable) {
        var parent = $(this).closest("ul"),
        $loading = $("[role=loading]", parent);
        if ($loading.length == 0) {
            $loading = $("<li role='loading'><img style='float: left; margin: 5px ;' src=\"/Content/templates/pannonia/img/elements/loaders/10s.gif\"></li>")
            $loading.appendTo(parent);
        }
        $loading.toggle(enable);
    }
    return {
        init: function (verifyEmailMessage, retrievePwdMessage, currentUser) {

            //Table Verify User.
            $("table a[role=verifyEmail]").click(function () {
                var loginId = $("td:first input", $(this).closest("tr")).val();
                var self = this;
                showLoading.call(self, true);
                userApi.VerifyEmail(loginId, $(this).attr("href").substr(1), function (e) {
                    alert(e.success ?
                        verifyEmailMessage.success :
                        verifyEmailMessage.fail);

                }, function () {
                    showLoading.call(self, false);
                });
                return false;
            });

            $("table [role=retievePwd]").click(function () {
                var self = this, loginId = $("td:first input", $(this).closest("tr")).val();
                showLoading.call(this, true);
                userApi.RetrievePassword(loginId, function (e) {
                    alert(e.success ?
                        retrievePwdMessage.success :
                        retrievePwdMessage.fail);
                }, function () {
                    showLoading.call(self, false);
                });
            });

            pmDialog = new pm($("#pmEditor"), currentUser);
            $("table a[role=pm]").click(function () {
                pmDialog.show($(this).attr("href").substr(1));
            });
        }
    };


})
