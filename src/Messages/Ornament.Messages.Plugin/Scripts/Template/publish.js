define(["vaform", "/MemberShips/Scripts/Org/Org.js"], function() {

    return {
        init: function(contents) {

            //controller
            var model = avalon.define("example", function(vm) {

                vm.Contents = [];

                vm.getDemo = function() {
                    var json = $("#templateForms").serializeObject();

                    $.post("/messages/template/GetContent", json, function(d) {
                        model.Contents = d;
                    });
                };
            });

            //init
            model.Contents = contents;
            $("#templateForms").vaform({
                success: function(d) {
                    alert(d.message);
                }});
            avalon.scan();
        },
        clear: function() {
            delete avalon.vmodels["example"];
        }
    };
});