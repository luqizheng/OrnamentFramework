define(function (require) {
    require("form");
    var js = require("js/webapi.js");
    require("/MemberShips/Scripts/Org/Org.js");
   

    function init() {

        $("form").removeData("validator");
        $("form").removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parseElement("#BasicInfo");
       
        $("#BasicInfo").submit(function (e) {
            
            var data = $(this).serializeObject();
            var webApi = new js("/Api/Memberships/users/Save");
            webApi.Post(data, function() {
                alert('保存成功');
            });
            e.preventDefault();
        });

        avalon.define("BasicInfoEditor", function(vm) {});
    }

    return {
        Init: function () {
            init();
            avalon.scan();
        }
    };

});