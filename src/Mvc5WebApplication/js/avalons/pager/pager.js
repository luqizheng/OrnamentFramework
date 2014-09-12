define(["text!./pager.html"], function(template) {


    var widget = avalon.ui.pager = function(element, data, vmodels) {

        var options = data.pagerOptions,
            //方便用户对原始模板进行修改,提高制定性
            optionsTemplate = template;
        var vmodel = avalon.define(data.pagerId, function(vm) {

            avalon.mix(vm, options);

         
            vm.$init = function() {
                var pageHTML = optionsTemplate;
                element.style.display = "none";
                element.innerHTML = pageHTML;
                setTimeout(function() {
                    avalon.scan(element, [vmodel].concat(vmodels));
                    element.style.display = "";
                    if (vmodel.firstLoad) {
                        vmodel.nav(0);
                    }
                }, 100);
            };
            vm.$remove = function() { element.innerHTML = ""; };

            function calculatePage(totalRecord, pageSize) {
                if (totalRecord == 0)
                    return 1;
                var r = parseInt(totalRecord / pageSize);
                var remind = vm.totalRecord % vm.pageSize;
                if (remind == 0)
                    return r;
                return ++r;
            };

            vm.$skipArray = ["firstLoad", "dataLength", "totalPage"];
            vm.page = -1;
            vm.pages = [];
            vm.dataLength = 0; //现在页面显示多少数据
            vm.isNavMode = function() {
                //是否为导航模型,无法统计总数据的多寡
                return vm.totalRecords == 0 || (vm.dataLength != 0 && vm.dataLength == vm.pageSize);
            };


            vm.next = function() {

                var pageIndex = vm.page + 1;
                if (pageIndex < vm.totalPage || isNavMode()) {
                    vm.nav(pageIndex);
                }
                return false;
            };
            vm.pre = function() {
                var pageIndex = vm.page - 1;
                if (pageIndex >= 0)
                    vm.nav(vm.page - 1);
            };
            vm.navTo = function() {
                var index = parseInt(this.attributes["href"].value.substr(1));
                if (index != vm.page) {
                    vm.nav(index);
                }
            };
            vm.last = function() {
                var pageIndex = vm.totalPage - 1;
                if (pageIndex >= 0) {
                    vm.nav(pageIndex);
                }
            };
            vm.nav = function(pageIndex) {
                if (pageIndex < 0) {
                    return;
                }
                vm.search.call(vm, pageIndex, vm.pageSize, function(totalPages, dataLength) {
                    vm.page = pageIndex;
                    vm.totalRecords = totalPages;
                    vm.dataLength = dataLength;
                    createNav(totalPages);
                });
            };
            vm.could = function(pageAction) {
                if (pageAction == 'pre' || pageAction == 0 || pageAction == 'first') {
                    return vm.page != 0;
                } else if (pageAction == 'next' || pageAction == 'last') {
                    if (isNavMode) {
                        return vm.pageSize == vm.dataLength;
                    }
                    return (vm.page + 1) != vm.totalPage;
                } else {
                    var pageIndex = parseInt(pageAction);
                    return pageIndex && pageIndex > 0 && pageIndex < vm.totalPage;
                }
            };
            vm.startRecord = function() {
                return vm.page * vm.pageSize;
            };
            vm.endRecord = function() {
                return (vm.page + 1) * vm.pageSize;
            };
            vm.reload = function() {
                inner.nav(vm.page);
            };

            function createNav(totalRecord) {
                if (!totalRecord) {
                    return; // 没有totalRecord,因此不生成导航条,只有下一页,上一页等信息
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

        });


        return vmodel;
    };
    widget.defaults = {
        firstLoad: true,
        totalPage: 1,
        showPages: 10,
        pageSize: 25,
        totalRecords: 0,
        pages: [],
        search: function(pageIndex, pageSize, func) {
            alert('please set the search:function(pageIndex,pageSize,func) in the options.func is func(totalRecord, data length of ajaxReturn)');
        },

    };
    return avalon;


})