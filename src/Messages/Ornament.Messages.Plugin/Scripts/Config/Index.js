define(function (require) {
    var $ = require("jquery");
    var model = avalon.define('index', function (vm) {
        vm.data = [];
        vm.save = function() {
            var key = this.$vmodel.el.key, val = this.$vmodel.el.val;

            $.post("/Messages/Config/SaveVariable", { key: key, val: val }, function(result) {

            });
        };
    });

    return function(data) {
        model.data = data;
    };
});