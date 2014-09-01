﻿define(function (require) {
    avalon.define('index', function (vm) {
        vm.add = function () {

        };
    });

    avalon.define('edit', function (vm) {
        vm.Name = "";
        vm.Remarks = "";
        vm.Parent = null;
        vm.Id = "";
        vm.save = function () {
            var org = require("/MemberShips/Scripts/Share/Org.js");
            org.save(vm.Name, vm.Remarks, vm.Parent, vm.Id, function (d) {
                if (d) {
                    alert("save success.");
                }
            });
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

    return function () {

    }
})