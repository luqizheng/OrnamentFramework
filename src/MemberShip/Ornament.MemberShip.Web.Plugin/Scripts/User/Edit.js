define(function (require) {
    require("form");

    require("/MemberShips/Scripts/Org/Org.js");
    function init() {

        var $form = $("#editUser")
            .removeData("validator")
            .removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse("#editUser");
        
        $form.validate().settings.submitHandler = function (form) {
            var data = $(form).serializeObject();
            $(form).find("input").prop("disabled", true);

            $.post("/Memberships/user/Save", data, function (rData) {
              
                if (rData.success) {
                    alert('保存成功');
                } else {
                    alert(rData.Message);
                }
            }).done(function() {
                $(form).find("input").prop("disabled", false);
            }).fail(function (status) {
                if (status.status == 400) {
                    var errors = {};
                    $(status.responseJSON).each(function () {
                        errors[this.key] = this.errors.join(";");
                    });
                    $form.validate().showErrors(errors);
                }
            });;
            
        };

       

        $("#jusTest").affix({
            top: 10
        });
        avalon.define("edit", function(vm) {
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
            delete avalon.vmodels["edit"];
        }

    };

});