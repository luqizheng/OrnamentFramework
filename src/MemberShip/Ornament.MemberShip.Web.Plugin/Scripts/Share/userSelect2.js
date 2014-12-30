define(function (require) {

    var userOpts = {
        minimumInputLength: 1,
        multiple: true,
        placeholder: "请输入关键字进行查询",
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
            url: "/api/memberships/users/Match",
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
    };

 
    return {
        Init: function ($selector,data) {
            require(["select2"], function () {
                userOpts.initSelection = function (ele, callback) {
                    if (data) {
                        callback(data);
                    }
                };
                $($selector).select2(userOpts).css("width","100%");
            });
        }
    }
})