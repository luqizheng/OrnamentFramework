/// <reference path="../../Views/Shared/Layout/_notifyMsg.cshtml" />
define(["/Scripts/notification/socketClient.js", "socketio"], function (msgClient) {

    var notifyModel;
    //View is  /Views/Shared/Layout/_notifyMsg.cshtml
    function defineController() {
        notifyModel = avalon.define({
            $id: "_notifyCount",
            notifyCount: 0,
            lastUpdate: new Date()
        });

        avalon.scan($("#_notify")[0]);

    }

    function defineSocketIo(host, strLoginId, strName, strPublickKey) {

        var client = msgClient.create(host, strLoginId, strName, strPublickKey);
        client.Socket.on("count", function (d) {
            notifyModel.notifyCount = d;
            notifyModel.lastUpdate = new Date();
            console.log(d);
        });
    }

    return {
        init: function (host, strLoginId, strName, strPublickKey) {
            console.log("init " + host + "；" + strLoginId + ";" + strName + ";");
            //defineController();
            //defineSocketIo(host, strLoginId, strName, strPublickKey);
        }
    }
});