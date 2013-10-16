define(function (require) {
    require("../../_applayout.js");
    return function (config) {

        var $ = require('jquery'),
            table = require("table")($);

        $("#table").dataTable({
            "bJQueryUI": false,
            "bAutoWidth": false,
            "bProcessing": true,
            "bServerSide": true,
            "sAjaxSource": config.url,
            "aaSorting": [[0, false], [1, 'asc']],
        });
    };
})