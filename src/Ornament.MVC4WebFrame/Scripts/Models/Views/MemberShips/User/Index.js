/// <reference path="../../../Base/Views/user.typeahead.js" />
/// <reference path="../../../Base/Views/userGroup.select2.js" />

define(function (require) {
    var $ = require("jquery"),
        userTypeahead = require("../../../Base/Views/user.typeahead.js"),
        user = require("/scripts/models/base/memberships/user.js"),
        pm = require("/scripts/models/base/views/pm.js");

    var pmDialog;
    require("uniform")($);
    require('select2')($);

    //Table List checkbox.
    $(".actionCheckbox").uniform().change(function () {
        $("#BtnApply").prop("disabled", $(".actionCheckbox:checked").length == 0);
    }).change();

    $("#selApplyAction").select2();

    userTypeahead.typeahead("#searchContent");

    return {
        init: function (verifyEmailMessage, retrievePwdMessage, currentUser) {
            //Table Verify User.
            $("table [role=verifyEmail]").click(function () {
                var loginId = $("td:first input", $(this).closest("tr")).val();
                var loadder = $("<li style='display:none'><img style='float: left; margin: 5px ;' src=\"/Content/templates/pannonia/img/elements/loaders/10s.gif\"></li>");
                var parent = $(this).closest("ul");

                var img = $("img", parent);
                if (img.length == 0) {
                    img = loadder.appendTo(parent);
                }
                img.show();
                user.VerifyEmail(loginId, $(this).attr("href").substr(1), function (e) {
                    img.hide();
                    alert(e.success ?
                        verifyEmailMessage.success :
                        verifyEmailMessage.fail);

                });
                return false;
            });

            $("table [role=retievePwd]").click(function () {
                var loginId = $("td:first input", $(this).closest("tr")).val();
                user.RetrievePassword(loginId, function (e) {
                    alert(e.success ?
                        retrievePwdMessage.success :
                        retrievePwdMessage.fail);
                });
            });

            pmDialog = new pm($("#pmEditor"), currentUser);
            $("table [role=pm]").click(function() {
                pmDialog.show();
            });
        }
    };


})
