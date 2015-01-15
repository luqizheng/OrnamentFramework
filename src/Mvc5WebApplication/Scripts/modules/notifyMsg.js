/// <reference path="../../Views/Shared/Layout/_notifyMsg.cshtml" />
define(["/Scripts/notification/socketClient.js", "socketio"], function (msgClient) {

    var notifyModel;
    //View is  /Views/Shared/Layout/_notifyMsg.cshtml
    function defineController() {
        notifyModel = avalon.define({
            $id: "_notify",
            notifyCount: 0,
            lastUpdate: new Date()
        });

        avalon.scan($("#notify"));

    }

    function defineSocketIo(host, strLoginId, strName, strPublickKey) {

        var client = msgClient.create(host, strLoginId, strName, strPublickKey);
        client.Socket.on("get notify", function (d) {
            console.log(d);
        });
    }

    return {
        init: function (host, strLoginId, strName, strPublickKey) {
            defineController();
            defineSocketIo(host, strLoginId, strName, strPublickKey);
        }
    }
});