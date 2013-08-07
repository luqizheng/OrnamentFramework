define(function (require) {
    /* for user ajax search */
    var $ = require("jquery");
    require("/bundles/bootstrap.js")($);
    var api = require("/scripts/models/base/util/select2Helper.js");
    return {
        select2: {
            org: function (selector, initData) {
                var opts = {
                    ajax: { url: "/api/Orgs" }, multiple: false
                };
                return api.select2(selector, opts, initData);
            },
            user: function (selector, initData) {
                return api.select2(selector, { url: "/api/Users" }, initData);
            },
            role: function (selector, initData) {
                return api.select2(selector, { ajax: { url: "/api/Roles" } }, initData);
            },
            userGroup: function (selector, initData) {
                return api.select2(selector, { ajax: { url: "/api/usergroups" } }, initData);
            }
        },
        typeHeader: {
            user: function (selector) {
                /// <summary>
                /// auto complete 
                /// </summary>
                /// <param name="selector"></param>

                $(selector).typeahead({
                    source: function (query, process) {
                        query += "%";
                        var rs = [], data = {
                            name: query,
                            email: query,
                            loginId: query,
                            phone: query,
                        };
                        $.get("/api/Users", data, function (d) {
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
                        return item.toLocaleLowerCase().indexOf(this.query.toLocaleLowerCase()) != -1;
                    }
                });
            }
        }
    };
});

