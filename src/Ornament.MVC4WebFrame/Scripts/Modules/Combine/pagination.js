define(function () {

    return function (avalon) {
        var widget = avalon.ui["pagination"] = function (element, data, vmodels) {

            var innerHTML = element.innerHTML;
            avalon.clearHTML(element);

            var model = avalon.define(data.paginationId, function (vm) {



                function calculatePage(totalRecord, pageSize) {
                    if (totalRecord == 0)
                        return 1;
                    var r = (totalRecord / pageSize);
                    var remind = vm.totalRecord % vm.pageSize;
                    if (remind == 0)
                        return r;
                    return ++r;
                };






                vm.next = function () {
                    alert(vm.showPages);
                    if (vm.page + 1 >= vm.totalPage)
                        return;
                    vm.page += 1;
                    vm.nav();
                };

                vm.previous = function () {
                    if (vm.page - 1 < 0) {
                        return;
                    }
                    vm.page -= 1;
                    vm.nav();
                };

                vm.last = function () {
                    vm.page = totalPage;
                    vm.nav();
                };

                vm.navTo = function () {
                    var index = parseInt(this.attributes["href"].value.substr(1));
                    if (index != vm) {
                        vm.page = index;
                        vm.nav();
                    }

                };

                vm.nav = function (pageIndex) {
                    if (!pageIndex) {
                        pageIndex = vm.page;
                    }
                    if (pageIndex < 0 || pageIndex >= vm.pageSize)
                        return;
                    vm.search.call(vm, pageIndex, vm.pageSize, function (totalPages) {
                        vm.totalRecords = totalPages;
                    });
                };

                vm.pageSize = 5;
                vm.pages = [];
                vm.search = function (pageIndex, pageSize, func) {
                    alert('please set this function for getting data.');
                };

                vm.$watch("totalRecords", function (newValue, oldValue) {
                    vm.totalPage = calculatePage(newValue, vm.pageSize);
                    var showPage = 10 / 2;
                    vm.pages = [];
                    var min = vm.page - showPage, max = vm.page + showPage;
                    if (min < 0) {
                        min = 0;
                    }
                    if (max > vm.totalPage) {
                        max = vm.totalPage;
                    }

                    for (var i = min; i < max; i++) {
                        vm.pages.push({
                            text: (i + 1),
                            index: i
                        });
                    }
                });



                avalon.mix(vm, data.paginationOptions);
            });

            avalon.nextTick(function () {
                //widget的VM已经生成，可以添加回去让它被扫描
                element.innerHTML = innerHTML;
                avalon.scan(element, [model].concat(vmodels));
                model.nav(0);
            });
            return model;
        };
        widget.defaults = {
            totalPage: 1,
            showPages: 10,
            totalRecords: 0,
            pages: [],
            page: 0 //Current PgaeIndex
        };
        return avalon;
    };


})