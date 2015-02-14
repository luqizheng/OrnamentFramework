define(["bootstrap"],function () {
    //ajax login


    $(document).ready(function () {
        $("#ajaxlogin").modal({
            remote: "/Account/AjaxLogon",
            show: false,
            backdrop: false
        });





    });

})
