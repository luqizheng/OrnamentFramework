define(function (require) {

    var $ = require("jquery");
    require("select2")($);

    /* for user ajax search */

    var defaults = {
        minimumInputLength: 1,
        multiple: true,
        placeholder: "请输入关键字进行查询"
    },
    orgOpts = {
        ajax:
            { url: "/api/Orgs" },
        multiple: false
    },
    ugOpts = {
        ajax: { url: "/api/usergroups" }
    },
    roleOpts = {
        ajax: { url: "/api/Roles" }
    },
    userOpts = {
        ajax: {
            data: function (term, page) { // page is the one-based page number tracked by Select2
                return {
                    Name: term,
                    Email: term,
                    LoginId: term,
                    Phone: term,
                    page: (page - 1), // page number
                };
            },
            url: "/api/users",
            results: function (data, page) {
                var more = (page * 10) < data.total; // whether or not there are more results available
                // notice we return the value of more so Select2 knows if more results can be loaded
                var r = [];
                $(data).each(function () {
                    r.push({ id: this.id, text: this.name });
                });
                return { results: r, more: more };
            }
        }
    },
     ajaxOpts = {
         data: function (term, page) { // page is the one-based page number tracked by Select2
             return {
                 name: term + "%",
                 page: (page - 1), // page number
             };
         },
         results: function (data, page) {
             var more = (page * 10) < data.total; // whether or not there are more results available
             // notice we return the value of more so Select2 knows if more results can be loaded
             var r = [];
             $(data).each(function () {
                 r.push({ id: this.id, text: this.Name });
             });
             return { results: r, more: more };
         }
     };

    var forData = function (selector, opts, data) {
        var $tag = $(selector),
            $form = $tag.closest("form"),
            options = $.extend({}, defaults, opts);
        options.ajax = $.extend({}, ajaxOpts, opts.ajax);
        options.initSelection = function (ele, callback) {
            if (data) {
                callback(data);
            }
        };
        $tag.select2(options);
        $(document).ready(function () {
            $form.submit(function () {
                var items = $tag.select2('val'),
                    ary = [],
                    tmp = "<input type='hidden' name='" + $tag.attr("name") + "' class='_mbs_hide_post'/>";

                $("._mbs_hide_post").remove();
                if (items !== "") {
                    $tag.val(items.shift());
                    $(items).each(function () {
                        ary.push($(tmp).val(this));
                    });
                    $form.append(ary);
                }
                return true;
            });
        });
        return $tag;
    };

    var orgTree = function (selector, boxSelector, zNodes) {
        require("ztree")($);
        var setting = {
            callback: {
                onClick: function (event, treeId, treeNode, clickFlag) {
                    $(boxSelector).val(treeNode.id).next().text(treeNode.name);
                }
            }
        };
        $.fn.zTree.init($(selector), setting, zNodes);
    };

    return {
        select2: {
            org: function (selector, initData) {
                return forData(selector, orgOpts, initData);
            },
            roles: function (selector, initData) {
                return forData(selector, roleOpts, initData);
            },
            user: function (selector, initData) {
                userOpts.maximumSelectionSize = 1;
                return forData(selector, userOpts, initData);
            },
            users: function (selector, initData) {
                return forData(selector, userOpts, initData);
            },
            userGroups: function (selector, initData) {
                return forData(selector, ugOpts, initData);
            }
        },
        tree: {
            org: function (treeSelector, boxSelector, initData) {
                orgTree(treeSelector, boxSelector, initData);
            }
        }
    };
})