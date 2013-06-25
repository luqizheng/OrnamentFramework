define(function (require) {
    require("/scripts/plugins/forms/jquery.select2.min.js");
    var defaults = {
        minimumInputLength: 1,
        multiple: true,
        ajax: {
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
    };
    return {
        select2: function (selector, opts) {
            var $tag = $(selector),
                $form = $tag.closest("form"), options = $.extend({}, defaults);
            options.ajax.url = opts.url;
            //options.data = opts.data;
            options.initSelection = function (ele, callback) {
                callback(opts.data);
                //callback({ id: "f61ac372fb534f3fb003baed8bea44b5", text: "aaa" });
            };
            $tag.select2(options);
            $tag.on("change", function (e) {
                var a =  $tag.val().replace(e.val, "");
                $tag.val(a);
            });
            $(document).ready(function () {
                $form.submit(function () {
                    var roles = $tag.val().split(","),
                        ary = [],
                        tmp = "<input type='hidden' name='" + $tag.attr("name") + "'/>";

                    $tag.val(roles.shift());
                    $(roles).each(function () {
                        var $hid = $(tmp).removeAttr("id").val(this);
                        ary.push($hid);
                    });
                    $form.append(ary);
                });
                return $tag;
            });
        }
    };
});