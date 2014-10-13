define(function (require) {

    return function (opts) {
        $(".delete").on('click', function () {
            if (confirm(opts.warnDel)) {
                var target = $(this);
                $.getJSON(opts.delUrl + '/' + target.attr("href"), {}, function (result) {
                    alert(result.Message);
                    if (result.Success) {
                        target.parent().parent().remove();
                    }
                });
            }
            return false;
        });
    };
});
