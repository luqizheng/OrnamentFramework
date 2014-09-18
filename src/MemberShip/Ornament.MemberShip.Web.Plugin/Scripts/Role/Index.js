define(function (require) {
    
    
    require("/js/avalons/pager/pager.js");

    function init(){
       var model= avalon.define('index', function(vm) {
            vm.roles = [{Id:"",Name:"",Remarks:""}];
            vm.pager = {
                pageSize: 50,
                search: function(index, maxRecords, func) {
                    $.get("/MemberShips/Role/List", {
                            PageSize: maxRecords,
                            CurrentPage: index
                        }, function(d) {
                            model.roles = d.data;
                            func(d.totalRecords);
                        });
                }
            };
        });
    }

    return {
        init: function () {
            init();
            avalon.scan();
        },
        clear: function () {
            delete avalon.vmodels['role'];
        }
    };

})