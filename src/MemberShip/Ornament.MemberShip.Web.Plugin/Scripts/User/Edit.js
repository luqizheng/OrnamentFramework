define(function (require) {
    function init() {

        $("#editUser").vaform({
            url: "/Memberships/user/Save",
            success:function() {
                alert(rData.success ? "保存成功" : rData.Message);
            },
            before: function ($form) {
                $form.find("input").prop("disabled", true);
            },
            done: function($form) {
                $form.find("input").prop("disabled", false);
            }
        });

        $("#jusTest").affix({ top: 10 });
        
    
    }

    return {
        Init: function () {
            require(["vaform", "/MemberShips/Scripts/Org/Org.js"], function () {
                init();
            });


        },
        Clear: function () { //要delete controller
    
        }

    };

});