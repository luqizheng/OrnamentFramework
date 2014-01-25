define(function (require) {
    var $ = require('jquery');
    require("/scripts/modules/combine/pagination.js")(avalon);
    avalon.define('role', function (vm) {
        vm.roles = [];
        vm.$pageOpts = {
            pageSize: 10,
            search: function (index, maxRecords, func) {
                $.get("/MemberShips/Role/List", {
                    PageSize: maxRecords,
                    CurrentPage: index
                }, function (d) {
                    vm.roles = [];
                    for (var key in d.data) {
                        vm.roles.push(d.data[key]);
                    }
                    func(d.totalRecords);
                });
            }
        };
    });

    avalon.scan();
})