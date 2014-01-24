define(function () {

    return function (avalon) {
        var widget = avalon.ui["pagination"] = function (element, data, vmodels) {

            var innerHTML = element.innerHTML;
            avalon.clearHTML(element);

            var model = avalon.define(data.paginationId, function (vm) {
                //此时此刻代入
                defaultIt(vm);
                avalon.mix(vm, data.paginationOptions);
                function calculatePage(totalRecord, pageSize) {
                    if (totalRecord == 0)
                        return 1;
                    var r = (totalRecord / pageSize);
                    var remind = vm.totalRecord % vm.pageSize;
                    if (remind == 0)
                        return r;
                    return ++r;
                };

                function defaultIt(viewModel) {

                    var totalPage = 1;
                    viewModel.totalRecords = 0;
                    viewModel.page = 0;//Current PgaeIndex

                    viewModel.next = function () {
                        alert(viewModel.showPages);
                        if (viewModel.page + 1 >= viewModel.totalPage)
                            return;
                        viewModel.page += 1;
                        viewModel.nav();
                    };

                    viewModel.previous = function () {
                        if (viewModel.page - 1 < 0) {
                            return;
                        }
                        viewModel.page -= 1;
                        viewModel.nav();
                    };

                    viewModel.last = function () {
                        viewModel.page = totalPage;
                        viewModel.nav();
                    };

                    viewModel.navTo = function () {
                        var index = this.attributes["href"].value.substr(1);
                        if (index != viewModel) {
                            viewModel.page = index;
                            viewModel.nav();
                        }

                    };

                    viewModel.nav = function (pageIndex) {

                        if (pageIndex < 0 || pageIndex >= viewModel.pageSize)
                            return;
                        viewModel.search.call(viewModel, pageIndex, viewModel.pageSize, function (totalPages) {
                            viewModel.totalRecords = totalPages;
                        });
                    };

                    viewModel.pageSize = 5;
                    viewModel.pages = [];
                    viewModel.search = function (pageIndex, pageSize, func) {
                        alert('please set this function for getting data.');
                    };

                    viewModel.$watch("totalRecords", function (newValue, oldValue) {
                        totalPage = calculatePage(newValue, viewModel.pageSize);
                        var showPage = 10 / 2;
                        viewModel.pages = [];
                        var min = viewModel.page - showPage, max = viewModel.page + showPage;
                        if (min < 0) {
                            min = 0;
                        }
                        if (max > totalPage) {
                            max = totalPage;
                        }

                        for (var i = min; i < max; i++) {
                            viewModel.pages.push({
                                text: (i + 1),
                                index: i
                            });
                        }
                    });
                }
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
            showPages: 10
        };
        return avalon;
    };


})