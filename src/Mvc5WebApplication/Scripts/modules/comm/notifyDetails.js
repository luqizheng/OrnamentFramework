define(function (msgClient) {
    return {
        init: function () {
            var model = avalon.define({
                $id: "notifyDetails",
                contents: [{ content: "", date: new Date() }]
            });

            msgClient.on("new notify", function () {

            });
            msgClient.on("get notify", function (data) {
                console.log(JSON.stringify(data));
            });

            msgClient.emit("get notify",{pageIndex:0,pageSize:10});

            model.contents = [];
        },
        clear: function () {
            delete avalon.vmodels['notifyDetails'];
        }
    }

})