define(function () {

    return function (avalon) {
        avalon.ui["pagination"] = function (element, data, vmodels) {

            var innerHTML = element.innerHTML;
            avalon.clearChild(element);

            var model = avalon.define(data.paginationId, function (vm) {

                avalon.mix(vm, data.paginationOptions);

                vm.totalPage = function () {

                    var r = vm.totalRecord / vm.pageSize;
                    var remind = vm.totalRecord % vm.pageSize;
                    if (remind == 0)
                        return r;
                    return ++r;
                };

                vm.totalRecords = 0;
                vm.page = 1;
                vm.first = function () {
                    vm.search(vm.page, vm.size);
                };
                vm.next = function () { };
                vm.previous = function () { };
                vm.last = function () { };
                vm.size = 40;
                vm.search = function() {
                    
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