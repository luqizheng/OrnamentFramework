deinfe(function () {
    return {
        init: function (fileSetting) {
            avalon.define({
                $id: "edit",
                name:fileSetting,
            });
            avalon.define({
                $id: "column",
                columns: [],
                sampleData: [],
            });

            avalon.scan(document.getElementById("content"));
        },
        clear: function () {
            delete avalon.vmodels["edit"];
            delete avalon.vmodels["columnIndex"];
        }

    };

})