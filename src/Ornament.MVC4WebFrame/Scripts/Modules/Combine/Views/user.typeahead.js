define(function (require) {
    var $ = require("jquery");
    require("/bundles/bootstrap.js")($);

    return {
        typeahead: function (selector) {
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
                }
            });

        }
    };
});