define(function () {

    return function (avalon) {
        avalon.ui["pagination"] = function (element, data, vmodels) {

            var innerHTML = element.innerHTML;
            avalon.clearHTML(element);

            var model = avalon.define(data.paginationId, function (vm) {
                //此时此刻代入
                defaultIt(vm);
                avalon.mix(vm, data.paginationOptions);

                function calPage() {
                    var r = (vm.totalRecord / vm.pageSize) + 1 //从1开始;
                    var remind = vm.totalRecord % vm.pageSize;
                    if (remind == 0)
                        return r;
                    return ++r;
                };

                function defaultIt(viewModel) {
                    viewModel.totalPage = 0;
                    viewModel.totalRecords = 0;
                    viewModel.page = 1;
                    //function for nav
                    viewModel.first = function () {
                        if (viewModel.totalPage == 0)
                            return;
                        viewModel.page = 1;
                        viewModel.search.call(viewModel, viewModel.page - 1, viewModel.pageSize);
                    };

                    viewModel.next = function () {
                        if (viewModel.page + 1 > viewModel.totalPage)
                            return;
                        viewModel.page += 1;

                        viewModel.search.call(viewModel, viewModel.page - 1, viewModel.pageSize);
                    };

                    viewModel.previous = function () {
                        if (viewModel.page - 1 > 1)
                            return;
                        viewModel.page -= 1;
                        viewModel.search.call(viewModel, viewModel.page - 1, viewModel.pageSize);
                    };

                    viewModel.last = function () {
                        if (viewModel.totalPage == 0)
                            return;
                        viewModel.page = viewModel.totalPage;
                        viewModel.search.call(viewModel, viewModel.page - 1, viewModel.pageSize);
                    };

                    viewModel.pageSize = 5;
                    viewModel.pages = [{}];
                    viewModel.search = function () {
                        alert('please set this function for getting data');
                    };
                    viewModel.$watch("totalRecords", function (newValue, oldValue) {
                        if (newValue != 0) {
                            viewModel.totalPage = calPage();
                        } else {
                            viewModel.totalPage = 0;
                        }
                    });
                    viewModel.$watch("totalPage", function(newValue, oldValue) {
                        $("")
                    });
                }
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