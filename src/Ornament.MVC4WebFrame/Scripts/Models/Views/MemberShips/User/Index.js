
define(function (require) {
    var $ = require("jquery"),
        userTypeahead = require("/scripts/models/base/views/user.typeahead.js");;

    require("uniform")($);
    require('select2')($);

    //Table List checkbox.
    $(".actionCheckbox").uniform().change(function () {
        $("#BtnApply").prop("disabled", $(".actionCheckbox:checked").length == 0);
    }).change();

    $("#selApplyAction").select2();


    userTypeahead.typeahead("#searchContent");



    return {
        init: function (verifyEmailMessage, retrievePwdMessage) {
            //Table Verify User.
            $("table [role=verifyEmail]").click(function () {
                var loginId = $("td:first input", $(this).closest("tr")).val();
                user.verifyEmail(loginId, $(this).attr("href").substr(1), function (e) {
                    alert(e.success ?
                        verifyEmailMessage.success :
                        verifyEmailMessage.fail);
                });
                return false;
            });

            $("table [role=retievePwd]").click(function () {
                var loginId = $("td:first input", $(this).closest("tr")).val();
                user.retrievePassword(loginId, function (e) {
                    alert(e.success ?
                        retrievePwdMessage.success :
                        retrievePwdMessage.fail);
                });
            });
        }
    };


})
