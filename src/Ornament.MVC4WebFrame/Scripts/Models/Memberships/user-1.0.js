define(function () {
    return {
        select2: function (selector, initFunc) {
            $(selector).select2({
                minimumInputLength: 1,
                multiple: true,
                ajax: {
                    url: "/api/Users/Match",
                    data: function (term, page) { // page is the one-based page number tracked by Select2
                        return {
                            name: term + "%",
                            email: term + "%",
                            loginId: term + "%",
                            pageSize: 10,
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
                },
                initSelection: function (ele, callback) {
                    callback(initFunc());
                }
            });
        },
        quickSearch: function (search, func) {
            var a = $.extend({}, { pageSize: 30, pageIndex: 0 }, search);
            $.post("/api/Users/Match", a, func);
        },
        verifyEmail: function (id, func) {
            $.post("/api/Users/", "=" + id, func);
        }
    };
});


