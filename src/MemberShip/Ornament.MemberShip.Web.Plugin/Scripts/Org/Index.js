define(function (require) {
    var org = require("/MemberShips/Scripts/Share/Org.js");

    var indexModel=avalon.define('index', function (vm) {
        vm.treeRender = function () {
            return arguments[0];
        };
        vm.orgs = null;
        vm.addSub = function (e) {
            var parentItem = $(this).parent();

            var id = parentItem.attr("id");
            var child = parentItem.siblings("ul");
            if (child.length == 0) {
                child = $("<ul/>").appendTo(parentItem.parent());
            }
            var newOrg = {
                Name: "New Org",
                Remarks: "",
                Parent: id,
                Roles: []
            };
            org.save(newOrg.Name, newOrg.Remarks, newOrg.Parent, newOrg.Roles, function (d) {
                var returnOrg = d.Data;
                if (d) {
                    var span = [];
                    span.push('<li>');
                    span.push('<span style="cursor: pointer"><i class="fa fa-lg fa-users"></i>' + returnOrg.Name + '</span>');
                    span.push('<div id="' + returnOrg.Id + '" class="btn-group">');
                    span.push('<a href="javascript:;" ms-click="edit" class="btn btn-xs btn-info">');
                    span.push('<i class="fa fa-edit"></i>');
                    span.push('</a>');
                    span.push('<a href="javascript:;" ms-click="addSub" class="btn btn-xs btn-info">');
                    span.push('<i class="fa fa-plus "></i>');
                    span.push('</a>');
                    span.push('<a href="javascript:;" ms-click="delete" class="btn btn-xs btn-danger">');
                    span.push('<i class="fa fa-remove"></i>');
                    span.push('</a>');
                    span.push('</div></li>');
                    child.append(span.join(""));
                }
                avalon.scan($("#orgTreeView")[0]);
            });


            e.preventDefault();
        };

        vm.del = function (e) {
            var id = $(this).parent().attr("id");
            var self = $(this).closest("li");
            if (confirm("是否删除组织单元" + $(this).closest("li").find("span").text())) {
                org.del(id, function () {
                    self.remove();
                });
            }
            e.preventDefault();
        };

        vm.edit = function (e) {
            var id = $(this).parent().attr("id");
            org.get(id, function (data) {
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

    return function (orgDTO) {
        indexModel.orgs = orgDTO;
        avalon.scan();
    };
})