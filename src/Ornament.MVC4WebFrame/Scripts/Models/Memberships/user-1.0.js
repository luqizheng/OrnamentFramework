define(function (require) {
    var api = require("/models/util/select2Helper.js");
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


