define(function (require) {
    var $ = require('jquery');
    require("table")($);
    require("../../_applayout.js");

    function createBtn() {
        return "<button type='button' class='btn'>edit</button> <button type='button' class='btn danger'>delete</button>";
    }
    function tableEdit(config) {
        var oTable = $("#table").dataTable({
            "bProcessing": true,
            "bServerSide": true,
            "sAjaxSource": config.url,
            "aaSorting": [[0, false], [1, 'asc']],
            "aoColumns": [
                { "mData": "Name" },
                {
                    mData: "Id",
                    fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
                        $(nTd).html(createBtn())
                            .closest("tr").attr("id", sData);
                    }
                }
            ],
            "bJQueryUI": false,
            "bAutoWidth": false,
            "sPaginationType": "full_numbers",
            "oLanguage": {
                "sSearch": "<span>Filter records:</span> _INPUT_",
                "sLengthMenu": "<span>Show entries:</span> _MENU_",
                "oPaginate": { "sFirst": "首页", "sLast": "最后一页", "sNext": ">", "sPrevious": "<" }
            }

        });

        $("#add").click(function (e) {
            e.preventDefault();
            oTable.fnAddData({Id:0,Name:""});
        });
    }

    return function (config) {
        tableEdit(config);
    };
})