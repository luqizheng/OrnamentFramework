﻿(function () {

   /* for user ajax search */

    $.orgs = {
        select2: function (selector) {
            $(selector).select2({
                minimumInputLength: 1,
                multiple: true,
                ajax: {
                    url: "/api/orgs/Match",
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
                }
            });
        }
    };
    return $;
})($)

