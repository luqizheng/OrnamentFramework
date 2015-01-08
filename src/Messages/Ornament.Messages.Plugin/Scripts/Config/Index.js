define(["jquery","bootbox"],function ($,bootbox) {
    var model = avalon.define('index', function (vm) {
        vm.data = [];
        vm.add = function () {
            vm.data.push({ Name: "", Value: "" });
        };
        vm.reload = function () {
            $.get("/Messages/Config/Reload", function (data) {
                vm.data = data;
            });
        };
        vm.del = function (el, removeFunc) {
            removeFunc();
        }
        vm.save = function () {

            var obj = {
                Variables: []
            };

            for (var i = 0; i < vm.data.length; i++) {
                obj.Variables.push(vm.data[i].$model);
            }
            $.ajax({
                url: "/Messages/Config/SaveVariable",
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(obj),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    bootbox.alert('save success.');
                }
            });
        };
    });

    return function (data) {
        model.data = data;
        avalon.scan();
    };
});