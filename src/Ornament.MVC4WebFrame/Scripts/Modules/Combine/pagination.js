define(function () {

    return function (avalon) {
        var widget = avalon.ui["pagination"] = function (element, data, vmodels) {

            var innerHTML = element.innerHTML;
            avalon.clearHTML(element);
            avalon.$skipArray = ["totalPage"];
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


                var inner = {
                    next: function () {
                        vm.nav(vm.page + 1);
                        return false;
                    },
                    pre: function () {
                        vm.nav(vm.page - 1);
                    },
                    navTo: function () {
                        var index = parseInt(this.attributes["href"].value.substr(1));
                        vm.nav(index);
                    },
                    last: function () {
                        vm.nav(vm.totalPage - 1);
                    },
                    nav: function (pageIndex) {
                        if (pageIndex < 0 || pageIndex >= vm.totalPage || pageIndex == vm.page)
                            return;
                        vm.search.call(vm, pageIndex, vm.pageSize, function (totalPages) {
                            vm.page = pageIndex;


                            vm.totalRecords = totalPages;
                        });
                    },
                    could: function (pageAction) {
                        if (pageAction == 'pre' || pageAction == 0 || pageAction == 'first') {
                            return vm.page != 0;
                        }
                        else if (pageAction == 'next' || pageAction == 'last') {
                            return (vm.page + 1) != vm.totalPage;
                        } else {
                            var pageIndex = parseInt(pageAction);
                            return pageIndex && pageIndex > 0 && pageIndex < vm.totalPage;
                        }
                    }
                };
                vm.pages = [];
                vm.$watch("totalRecords", function (newValue, oldValue) {
                    vm.totalPage = calculatePage(newValue, vm.pageSize);
                    var showPage = vm.showPage / 2;
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


                avalon.mix(vm, inner);
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
            pageSize: 5,
            totalRecords: 0,
            pages: [],
            search: function (pageIndex, pageSize, func) {
                alert('please set this function for getting data.');
            },
            page: -1 //Current PgaeIndex
        };
        return avalon;
    };


})