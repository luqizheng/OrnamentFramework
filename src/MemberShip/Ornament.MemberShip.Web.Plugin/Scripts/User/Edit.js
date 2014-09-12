define(function (require) {
    require("form");
    var js = require("js/webapi.js");
   

    function Init() {

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
    }

    return {
        Init: function () {
            Init();
        }
    };

});