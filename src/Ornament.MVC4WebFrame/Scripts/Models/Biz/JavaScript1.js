define("/scripts/models/biz/javascript1.js", ["/scripts/models/biz/user-1.0.js", "/scripts/models/biz/select2helper.js"], function (require) {
    /* for user ajax search */
    var user = require("/scripts/models/biz/user-1.0.js");
     
    return {
        select2: {
            org: function (select2, a) {
                user.select2(select2, a);
            },
            user: function (selector, data) { user.select2(selector, data); },
            role: function (selector, data) { user.select2(selector, data); },
            userGroup: function (selector, data) { user.select2(selector, data); },
        }
    };
});

;
define("/scripts/models/biz/user-1.0.js", ["/scripts/models/base/util/select2helper.js", "/bundles/bootstrap.js"], function (require) {
    var api = require("/scripts/models/biz/select2Helper.js");
    var userUrl = "/api/Users";
    var secrityUrl = "/api/security";
    return {
        select2: function (selector, initData) {
            return api.select2(selector, { url: "/api/Users" }, initData);
        },
        quickSearch: function (search, func) {
            var a = $.extend({}, { pageSize: 30, pageIndex: 0 }, search);
            $.post(userUrl + "/Match", a, func);
        },
        verifyEmail: function (loginId, email, func) {
            $.post(userUrl, {
                loginId: loginId, email: email
            }, func)
            ;
        },
        retrievePassword: function (accountOrEmail, func) {
            $.post(secrityUrl, {
                AccountOrEmail: accountOrEmail
            }, func);
        },
        typeHeader: function (selector) {
            require("/bundles/bootstrap.js");
            $(selector).typeahead({
                source: function (query, process) {
                    query += "%";
                    var rs = [], data = {
                        name: query,
                        email: query,
                        loginId: query,
                        phone: query,
                    };
                    $.get(userUrl, data, function (d) {
                        var qu = query.substr(0, query.lengh - 1);
                        $(d).each(function (i) {
                            if (d[i].loginId.indexOf(qu) != -1) {
                                rs.push(d[i].loginId);
                            }
                            if (d[i].name.indexOf(qu) != -1) {
                                rs.push(d[i].name);
                            }
                            if (d[i].email.indexOf(qu) != -1) {
                                rs.push(d[i].email);
                            }
                        });
                        process(rs);
                    });
                },
                matcher: function (item) {
                    return item.toLocaleLowerCase().indexOf(this.query.toLocaleLowerCase()) != -1
                }
            });
        }
    };
});


define("/scripts/models/biz/select2helper.js", ["/scripts/plugins/forms/jquery.select2.min.js"], function (require) {
    require("/scripts/plugins/forms/jquery.select2.min.js");
    var defaults = {
        minimumInputLength: 1,
        multiple: true,
        placeholder: "Please input a char"
    };
    var ajaxOpts = {
        data: function (term, page) { // page is the one-based page number tracked by Select2
            return {
                name: term + "%",
                pageIndex: (page - 1), // page number
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
    return {
        select2: function (selector, opts, data) {
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
        }
    };
});

