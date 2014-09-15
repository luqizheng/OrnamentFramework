define(function (require) {
    require("form");
    
    require("/MemberShips/Scripts/Org/Org.js");
    function init() {

        $("form").removeData("validator");
        $("form").removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parseElement("#BasicInfo");
       
        $("#BasicInfo").submit(function (e) {
            
            var data = $(this).serializeObject();
            $.post("/Memberships/user/Save",data,function(rData) {
                if (rData.success) {
                    alert('保存成功');
                } else {
                    alert(rData.Message);
                }
            });
            e.preventDefault();
        });

        avalon.define("BasicInfoEditor", function(vm) {});
    }

    return {
        Init: function () {
            init();
            avalon.scan();
        },
        Clear:function() {
            delete avalon.vmodels["BasicInfoEditor"];
        }
        
    };

});