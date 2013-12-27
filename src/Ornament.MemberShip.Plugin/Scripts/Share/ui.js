                                               define(function (require) {

    var $ = require("jquery");
    require("select2")($);

    /* for user ajax search */

    var defaults = {
        minimumInputLength: 1,
        multiple: true,
        placeholder: "Please input a char"
    };
    var ajaxOpts = {
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
                    tmp = "<input type='hidden' name='" + $tag.attr("name") + "'/>";
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


    return {
        select2: {
            org:
                function (selector, initData) {
                    var opts = {
                        ajax:
                            { url: "/api/Orgs" },
                        multiple: false
                    };
                    return forData(selector, opts, initData);
                },
            role: function (selector, initData) {
                return forData(selector, { ajax: { url: "/api/Roles" } }, initData);
            },
            users: function (selector, initData) {
                return forData(selector, {
                    ajax: {
                        data: function (term, page) { // page is the one-based page number tracked by Select2
                            return {
                                name: term + "%",
                                email: term + "%",
                                loginId: term + "%",
                                phone: term + "%",
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
                }, initData);
            },
            userGroup: function (selector, initData) {
                return forData(selector, { ajax: { url: "/api/usergroups" } }, initData);

            }
        }
    };
})