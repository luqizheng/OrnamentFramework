define(function(require) {
    function Init() {
        var model = avalon.define("templateIndex", function(vm) {
            vm.loading = false;
            vm.templates = [];
            vm.total = 0;
            vm.pager = {
                pageSize: 50,
                search: function(pageIndex, pageSize, func) {
                    find(pageIndex, pageSize, "", func);
                }
            };

            function find(page,size, content, func) {
                vm.loading = true;
                $.get("/Messages/Template/List", {
                    page: page,
                    search: content,
                    size: size
                }, function(d) {
                    vm.loading = false;
                    model.users = [];
                    for (var i = 0; i < d.data.length; i++) {
                        model.templates.push(d.data[i]);
                    }
                    model.total = d.total;
                    func(d.total);

                });
            }

        });
        avalon.scan();
    }


    return{
        init:
            function() {
                require(["pager"], Init);
            },
        clear:function() {
            delete avalon.vmodels["templateIndex"];
        }

    };
})