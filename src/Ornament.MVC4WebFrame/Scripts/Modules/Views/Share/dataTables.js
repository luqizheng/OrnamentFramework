/* a helper class for DataTables jquery plugin */

define(function (require) {

    var $ = require("jquery");
    require("table")($);
    var defOpts = {
        "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
        "bProcessing": true,
        "bServerSide": true,
        //"bJQueryUI": false,
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
        this.boolColEvent = {};

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

            function (sPropertyName, idProperty, trueIcon, falseIcon, func) {

                var tableNetsCols = {
                    mData: sPropertyName,
                    bSortable: false,
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        var $td = $(nTd), $tr = $td.closest("tr");
                        $tr.attr("data", oData[idProperty]);
                        $(nTd).html(build(sData));
                    }
                };

                function build(bData) {
                    var html = [];
                    html.push('<div class="btn-group" data="' + sPropertyName + '">');
                    html.push('<a class="btn btn-primary btn-mini switch" href="#"><i class="' + (bData ? trueIcon.icon : falseIcon.icon) + ' icon-white"></i></a>');
                    html.push('<a class="btn btn-primary btn-mini dropdown-toggle" data-toggle="dropdown" href="#"><i class="icon-caret-down icon-white"></i></a>');
                    html.push('<ul class="dropdown-menu">');
                    html.push('<li><a href="#" ><i class="' + trueIcon.icon + '"></i> ' + trueIcon.name + ' </a></li>');
                    html.push('<li><a href="#" ><i class="' + falseIcon.icon + '"></i> ' + falseIcon.name + ' </a></li>');
                    html.push('</ul></div>');
                    return $(html.join(""));
                }
                this.col.push(tableNetsCols);

                if (func) {
                    this.boolColEvent[sPropertyName] = {
                        trueData: trueIcon,
                        falseData: falseIcon,
                        func: func
                    };
                }

            };

        this.BuildTable = function (selector) {
            var ins = this;
            var d = $(selector)
                .dataTable($.extend({}, defOpts, {
                    sAjaxSource: this.url,
                    aoColumns: this.col
                }))
                .on("click", "div.btn-group a", function (e) {

                    //DropDown Menu
                    var self = $(this);

                    if (self.hasClass("dropdown-toggle"))
                        return;

                    var id = self.closest("tr").attr("data"),
                        propertyName = self.closest(".btn-group").attr("data"),
                        colSetting = ins.boolColEvent[propertyName],
                        iconPlace = self.find("i:first"),
                        execute = colSetting.trueData,
                        removeExecute = colSetting.falseData, trueOrfalse = true;


                    if (self.hasClass("switch")) { //主按钮自动切换
                        if (iconPlace.hasClass(colSetting.trueData.icon)) {
                            execute = colSetting.falseData;
                            removeExecute = colSetting.trueData;
                            trueOrfalse = false;
                        }

                    } else { //下拉框按钮

                        if (!iconPlace.hasClass(execute.icon)) {
                            execute = colSetting.falseData;
                            trueOrfalse = false;
                        }
                                                                                                                        ++++++++++++++++++++++++++++++++                        
                        iconPlace = self.closest(".btn-group").find("a:first i");
                    }

                    colSetting.func(id, trueOrfalse, function (bChange) {
                        if (bChange) {
                            iconPlace.removeClass(removeExecute.icon)
                                .addClass(execute.icon);
                        }
                    });
                    e.preventDefault();
                });

            //只是为metrlab UI 而做的
            return d;
        };


    };
})