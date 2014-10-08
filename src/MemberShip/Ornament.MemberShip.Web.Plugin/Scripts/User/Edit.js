define(function (require) {
    function init() {

        $("#editUser").vaform({
            url: "/Memberships/user/Save",
            success:function(rData) {
                alert(rData.success ? "保存成功" : rData.Message);
            },
            before: function () {
                this.find("input").prop("disabled", true);
            },
            done: function() {
                this.find("input").prop("disabled", false);
            }
        });

        $("#jusTest").affix({ top: 10 });

        avalon.define("edit", function() {

        });


    }

    return {
        Init: function () {
            require(["vaform", "/MemberShips/Scripts/Org/Org.js"], function () {
                init();
                avalon.scan();
            });


        },
        Clear: function () { //要delete controller
            delete avalon.vmodels["edit"];
        }

    };

});