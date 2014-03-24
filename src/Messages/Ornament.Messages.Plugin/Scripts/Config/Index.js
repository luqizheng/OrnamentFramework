define(function (require) {
    var $ = require("jquery");
    require('bootbox')($);
    var model = avalon.define('index', function (vm) {
        vm.data = [];
        vm.save = function() {
            var key = this.$vmodel.el.key, val = this.$vmodel.el.val;

            $.post("/Messages/Config/SaveVariable", { key: key, val: val }, function (result) {
                bootbox.alert('save success.');
            });
        };
    });

    return function(data) {
        model.data = data;
    };
});