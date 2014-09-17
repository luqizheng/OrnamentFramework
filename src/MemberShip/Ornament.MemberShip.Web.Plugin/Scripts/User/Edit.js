define(function (require) {
    require("form");

    require("/MemberShips/Scripts/Org/Org.js");
    function init() {

        var $form = $("#BasicInfo")
            .removeData("validator")
            .removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse("#BasicInfo");

        $form.validate().settings.submitHandler = function (form) {
            var data = $(form).serializeObject();
            $(form).find("input").prop("disabled", true);
            $.post("/Memberships/user/Save", data, function (rData) {
                $(form).find("input").prop("disabled", false);
                if (rData.success) {
                    alert('保存成功');
                } else {
                    alert(rData.Message);
                }
            });
        };

        $("#jusTest").affix({
            top: 100
        });

        avalon.define("BasicInfoEditor", function (vm) { });
    }

    return {
        Init: function () {
            init();
            avalon.scan();
        },
        Clear: function () { //要delete controller
            delete avalon.vmodels["BasicInfoEditor"];
        }

    };

});