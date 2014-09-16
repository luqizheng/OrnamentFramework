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
            $.post("/Memberships/user/Save", data, function (rData) {
                if (rData.success) {
                    alert('保存成功');
                } else {
                    alert(rData.Message);
                }
            });
        };


        avalon.define("BasicInfoEditor", function (vm) { });
    }

    return {
        Init: function () {
            init();
            avalon.scan();
        },
        Clear: function () {
            delete avalon.vmodels["BasicInfoEditor"];
        }

    };

});