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
        this.col = [];

        this.AddCol = function (sPropertyName, bSortable, func) {
            var a = {
                mData: sPropertyName,
                bSortable: bSortable === false ? false : true,
            };
            if ($.isFunction(func)) {
                a.fnCreatedCell = func;
            }
            this.col.push(a);
        };
        this.AddBoolCol =
            function (sPropertyName, idProperty, trueIcon, falseIcon) {

                var a = {
                    mData: sPropertyName,
                    bSortable: false,
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        $(nTd).addClass("cs").attr("data", oData[idProperty]);
                        $(nTd).html(build(sData));

                    }
                };

                function build(bData) {
                    var html = [];
                    html.push('<div class="btn-group">');
                    html.push('<a class="btn btn-primary btn-mini" href="#"><i class="' + (bData ? trueIcon.icon : falseIcon.icon) + ' icon-white"></i></a>');
                    html.push('<a class="btn btn-primary btn-mini dropdown-toggle" data-toggle="dropdown" href="#"><i class="icon-caret-down icon-white"></i></a>');
                    html.push('<ul class="dropdown-menu">');
                    html.push('<li><a href="javascript:;"><i class="' + trueIcon.icon + '"></i> ' + trueIcon.name + ' </a></li>');
                    html.push('<li><a href="javascript:;"><i class="' + falseIcon.icon + '"></i> ' + falseIcon.name + ' </a></li>');
                    html.push('</ul></div>');
                    return $(html.join(""));
                }

                this.col.push(a);
            };
        this.BuildTable = function (selector) {
            return $(selector)
                .dataTable($.extend({}, defOpts, {
                    sAjaxSource: this.url,
                    "aoColumns": this.col
                }));
        };


    };
})
