define(function(require) {
    var $ = require('jquery'),
        table = require("table")($);
    $("#table").dataTable({
        "bProcessing": true,
        "bServerSide": true,
        "sAjaxSource": "../server_side/scripts/server_processing.php",
        "aoColumns": [
            { "mData": "engine" },
            { "mData": "browser" },
            { "mData": "platform" },
            { "mData": "version" },
            { "mData": "grade" }
    ]
    });
})