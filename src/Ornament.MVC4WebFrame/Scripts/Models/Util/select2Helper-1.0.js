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
        select2: function (selector, opts, data) {
            var $tag = $(selector),
                $form = $tag.closest("form"),
                options = $.extend({}, defaults, opts);
            options.ajax.url = opts.url;
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
                    $tag.val(items.shift());
                    $(items).each(function () {
                        var $hid = $(tmp).val(this);
                        ary.push($hid);
                    });
                    $form.append(ary);
                });
            });
            return $tag;
        }
    };
});