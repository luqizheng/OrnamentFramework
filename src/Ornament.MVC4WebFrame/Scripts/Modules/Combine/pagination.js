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
                    var r = parseInt(totalRecord / pageSize);
                    var remind = vm.totalRecord % vm.pageSize;
                    if (remind == 0)
                        return r;
                    return ++r;
                };

                vm.page = -1;
                vm.pages = [];
                vm.dataLength = 0;//现在页面显示多少数据
                isNavMode = function () {
                    //是否为导航模型,无法统计总数据的多寡
                    return vm.totalRecords == 0;
                };
                var inner = {
                    next: function () {

                        var pageIndex = vm.page + 1;
                        if (pageIndex < vm.totalPage || isNavMode()) {
                            vm.nav(pageIndex);
                        }
                        return false;
                    },
                    pre: function () {
                        var pageIndex = vm.page - 1;
                        if (pageIndex >= 0)
                            vm.nav(vm.page - 1);
                    },
                    navTo: function () {
                        var index = parseInt(this.attributes["href"].value.substr(1));
                        if (index != vm.page) {
                            vm.nav(index);
                        }
                    },
                    last: function () {
                        var pageIndex = vm.totalPage - 1;
                        if (pageIndex >= 0) {
                            vm.nav(pageIndex);
                        }
                    },
                    nav: function (pageIndex) {
                        if (pageIndex < 0) {
                            return;
                        }
                        vm.search.call(vm, pageIndex, vm.pageSize, function (totalPages, dataLength) {
                            vm.page = pageIndex;
                            vm.totalRecords = totalPages;
                            vm.dataLength = dataLength;
                            createNav(totalPages);
                        });
                    },
                    could: function (pageAction) {
                        if (pageAction == 'pre' || pageAction == 0 || pageAction == 'first') {
                            return vm.page != 0;
                        }
                        else if (pageAction == 'next' || pageAction == 'last') {
                            return (isNavMode() && vm.pageSize == vm.dataLength) || (vm.page + 1) != vm.totalPage;
                        } else {
                            var pageIndex = parseInt(pageAction);
                            return pageIndex && pageIndex > 0 && pageIndex < vm.totalPage;
                        }
                    },
                    startRecord: function () {
                        return vm.page * vm.pageSize;
                    },
                    endRecord: function () {
                        return (vm.page + 1) * vm.pageSize;
                    }

                };

                function createNav(totalRecord) {
                    if (!totalRecord) {
                        return;// 没有totalRecord,因此不生成导航条,只有下一页,上一页等信息
                        //totalRecord = 0;
                    }
                    vm.totalPage = calculatePage(totalRecord, vm.pageSize);
                    var showPage = vm.showPages / 2;
                    vm.pages = [];
                    var min = vm.page - showPage, max = vm.page + showPage;
                    if (min < 0) {
                        max -= min;
                        min = 0;
                    }
                    if (max > vm.totalPage) {
                        var remind = max - vm.totalPage;
                        max = vm.totalPage;
                        min = min - remind;
                        if (min < 0) {
                            min = 0;
                        }
                    }

                    for (var i = min; i < max; i++) {
                        vm.pages.push({
                            text: (i + 1),
                            index: i
                        });
                    }
                };


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
            pageSize: 25,
            totalRecords: 0,
            pages: [],
            search: function (pageIndex, pageSize, func) {
                alert('please set the search:function(pageIndex,pageSize,func) in the options.');
            },

        };
        return avalon;
    };


})