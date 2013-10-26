/* a helper class for DataTables jquery plugin */

define(function (require) {

    var $ = require("jquery");
    require("table")($);

    var defOpts = {
        "bProcessing": true,
        "bServerSide": true,
        "bJQueryUI": false,
        "bAutoWidth": false,
        "sPaginationType": "full_numbers",
        "oLanguage": {
            "sSearch": "<span>查询:</span> _INPUT_",
            "sLengthMenu": "<span>显示数据:</span> _MENU_",
            "oPaginate": { "sFirst": "首页", "sLast": "最后一页", "sNext": ">", "sPrevious": "<" },
            "sInfo": "合计_TOTAL_ ,显示其中的(_START_ 至 _END_)",
            "sInfoFiltered": ""
        }
    };

    return function (url) {

        this.url = url;

        this.AddCol = function (col) {

        };


        this.BuildTable = function(selector) {
            return $(selector)
                .dataTable($.extend({}, defOpts, config, { url: this.url }));
        };
    };
})
