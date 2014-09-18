define(function (require) {
    require("form");

    require("/MemberShips/Scripts/Org/Org.js");
    function init() {

        var $form = $("#editUser")
            .removeData("validator")
            .removeData("unobtrusiveValidation");
        //$.validator.unobtrusive.parse("#editUser");

        $form.submit(function (e) {
            var data = $(this).serializeObject();
            $.post("/Memberships/user/Save", data, function (rData) {
                alert(rData.success ? rData.Message : '保存成功');
            });
            e.preventDefault();
        });

        //$form.validate().settings.submitHandler = function (form) {
        //    var data = $(form).serializeObject();
        //    $(form).find("input").prop("disabled", true);
        //    $.post("/Memberships/user/Save", data, function (rData) {
        //        $(form).find("input").prop("disabled", false);
        //        alert(rData.success ? rData.Message : '保存成功');
        //    });
        //};

        $("#jusTest").affix({
            top: 10
        });
        avalon.define("edit", function (vm) {

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