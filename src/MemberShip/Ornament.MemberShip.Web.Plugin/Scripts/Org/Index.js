define(function (require) {
    var org = require("/MemberShips/Scripts/Share/Org.js");
    
    avalon.define('index', function (vm) {
        vm.addSub = function (e) {
            var id = $(this).parent().attr("id");
            $(this).
            e.preventDefault();
        };

        vm.delete = function (e) {
            var id = $(this).parent().attr("id");
            e.preventDefault();
        };

        vm.edit = function(e) {
            var id = $(this).parent().attr("id");
            org.get(id, function(data) {
                var model = avalon.vmodels["edit"];
                model.Name = data.Name;
                model.Remarks = data.Remarks;
                model.Parent = data.Parent.Id;
                model.ParentName = data.Parent.Name;
                model.Roles = data.Roles;
            });
            e.preventDefault();
        };
    });

    avalon.define('edit', function (vm) {
        vm.Name = "";
        vm.Remarks = "";
        vm.Parent = null; //Parent Org's Id
        vm.ParentName = "";
        vm.Id = "";
        vm.Roles = [];//Role's id
        
        vm.save = function (e) {
            var roles = [];
            $("#roleList :checked").val();
            org.save(vm.Name, vm.Remarks, vm.Parent, vm.Id, roles, function (d) {
                if (d) {
                    alert("save success.");
                }
            });
            e.preventDefault();
        };
    });

    $('.tree > ul').attr('role', 'tree').find('ul').attr('role', 'group');
    $('.tree').find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem').find(' > span')
        .attr('title', 'Collapse this branch')
        .on('click', function (e) {
            var children = $(this).parent('li.parent_li').find(' > ul > li');
            if (children.is(':visible')) {
                children.hide('fast');
                $(this).attr('title', 'Expand this branch').find(' > i').removeClass()
                    .addClass('fa fa-lg fa-plus-circle');
            } else {
                children.show('fast');
                $(this).attr('title', 'Collapse this branch').find(' > i').removeClass()
                    .addClass('fa fa-lg fa-minus-circle');
            }
            e.stopPropagation();
        });

    return function() {
        avalon.scan();
    };
})