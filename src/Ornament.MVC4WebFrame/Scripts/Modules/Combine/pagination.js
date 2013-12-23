define(function () {

    return function (avalon) {
        avalon.ui["pagination"] = function (element, data, vmodels) {

            var innerHTML = element.innerHTML;
            avalon.clearChild(element);

            var model = avalon.define(data.paginationId, function (vm) {
                vm.totalPage = 0;
                vm.totalRecords = 0;
                vm.page = 1;

                vm.first = function () {
                    if (vm.totalPage == 0)
                        return;
                    vm.page = 1;
                    vm.search.call(vm, vm.page - 1, vm.size);
                };
                
                vm.next = function () {
                    if (vm.page + 1 > vm.totalPage)
                        return;
                    vm.page += 1;

                    vm.search.call(vm, vm.page - 1, vm.size);
                };

                vm.previous = function () {
                    if (vm.page - 1 > 1)
                        return;
                    vm.page -= 1;
                    vm.search.call(vm, vm.page - 1, vm.size);
                };

                vm.last = function () {
                    if (vm.totalPage == 0)
                        return;
                    vm.page = vm.totalPage;
                    vm.search.call(vm, vm.page - 1, vm.size);
                };

                vm.size = 5;

                vm.search = function () {
                    alert('please set this function for getting data');
                };
                avalon.mix(vm, data.paginationOptions);
                vm.$watch("totalRecords", function (newValue, oldValue) {
                    if (newValue != 0) {
                        vm.totalPage = calPage();
                    }
                    vm.totalPage = 0;

                });

                function calPage() {
                    var r = (vm.totalRecord / vm.pageSize) + 1 //从1开始;
                    var remind = vm.totalRecord % vm.pageSize;
                    if (remind == 0)
                        return r;
                    return ++r;
                };
            });

            avalon.nextTick(function () {
                //widget的VM已经生成，可以添加回去让它被扫描
                element.innerHTML = innerHTML;
                avalon.scan(element, [model].concat(vmodels));
            });
            return model;
        };

        return avalon;
    };


})