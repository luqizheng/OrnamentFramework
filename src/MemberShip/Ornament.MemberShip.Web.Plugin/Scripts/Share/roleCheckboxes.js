define(function (require) {
    webApi = new (require("/Scripts/Modules/Combine/WebApi"))('/api/memberships/roles/match');
    avalon.define('roleCheckboxes', function (vm) {
        vm.roles = [];
        vm.name = '';
        vm.search = function () {
            webApi.get({ name: vm.name }, function (retrunData) {
                vm.roles = retrunData.data;
            });
        };
    });
    return function () {

    };
});