/// <reference path="../../../../../../lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js" />
/// <reference path="../../../../../../lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js" />
/// <reference path="../../../../../../lib/jquery-validation/dist/jquery.validate.min.js" />
/// <reference path="../../../../../../lib/jquery-validation/dist/jquery.validate.js" />
/// <reference path="../../../../modules/vaform.js" />
var avalon = require('avalon');

var model = avalon.define({
    $id: "editUser",
    vm: {
        EmailConfirmed: $("#EmailConfirmed").val() == 'True',
        PhoneNumberConfirmed: $("#PhoneNumberConfirmed").val() == 'True'
    },
    changeEmailState: function () {
        model.vm.EmailConfirmed = !model.vm.EmailConfirmed;
    },
    changePhoneState: function () {
        model.vm.PhoneNumberConfirmed = !model.vm.PhoneNumberConfirmed;
    }
});


function InitVaForm() {
    require.ensure(["../../../../modules/vaform.js"],
        function () {
            var vaform = require("../../../../modules/vaform.js");
            vaform.for("#user-edit-form",
                function () {
                    alert("保存成功");
                });
        });
}



module.exports = {
    onEntry: function () {
        InitVaForm();
        avalon.scan($("#content")[0]);
    },
    onLeave: function () {
        try {
            model = null;
            delete avalon.vmodels["editUser"];
        } catch (e) {
            console.warn(e);
        }
    }
}