﻿deinfe(function () {
    return {
        init: function (fileSetting) {
            avalon.define({
                $id: "edit"
            });
            avalon.define({
                $id: "column",
                columns: [],
                sampleData: [],
            });
        },
        clear: function () {
            delete avalon.vmodels["edit"];
            delete avalon.vmodels["columnIndex"];
        }

    };

})