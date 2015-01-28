define(function () {
    return {
        init: function (msgClient) {
            var model = avalon.define({
                $id: "notifyDetails",
                contents: [{ content: "", date: new Date() }]
            });

            msgClient.Socket.on("new notify", function () {

            });
            msgClient.Socket.on("get notify", function (data) {
                console.log(JSON.stringify(data));
            });
                
            msgClient.Socket.emit("get notify",{pageIndex:0,pageSize:10});

            model.contents = [];
        },
        clear: function () {
            delete avalon.vmodels['notifyDetails'];
        }
    }

})