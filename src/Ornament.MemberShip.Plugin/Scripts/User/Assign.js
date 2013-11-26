define(function (require) {
    require("jquery");
    require("/scripts/views/_appLayout.js");
    return function (userGroupMap, roleGroupMap) {
        $("#UserGroups input").change(function () {
            $("#Roles label").removeClass("active");
            $("#UserGroups input:checked").each(function () {
                var groupId = $(this).attr("id");
                $.each(userGroupMap[groupId], function () {
                    var roleId = $("#Roles label[for=" + this + "]").children().attr("id");
                    $.each(roleGroupMap[roleId], function () {
                        $("#permissionPanel li[id=" + this + "]").addClass("active");
                    });
                });
            });
        }).change();

        $("#Roles input").change(function () {
            $("#permissionPanel li").removeClass("active");
            $("#Roles input:checked").each(function () {
                var roleId = $(this).attr("id");
                $.each(roleGroupMap[roleId], function () {
                    $("#permissionPanel li[id=" + this + "]").addClass("active");
                });
            });
        }).change();
    };

});