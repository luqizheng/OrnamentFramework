﻿/*

  //View is  /Views/Shared/Layout/_notifyMsg.cshtml 

  */
define(function () {
    return {
        init: function (client) {
            var notifyModel = avalon.define({
                $id: "_notifyCount",
                notifyCount: 0,
                taskCount: 0,
                msgsCount:0,
                lastUpdate: new Date(),
                $init: function () {
                    console.log("countComm.js init successfuly.");
                    client.Socket.on("count", function (d) {
                        notifyModel.notifyCount = d;
                        notifyModel.lastUpdate = new Date();
                        console.log(d);
                    });
                }
            });

            avalon.scan($("#_notify")[0]);
            notifyModel.$init();
        },
        clear: function () {
            delete avalon.vmodels['_notifyCount'];
        }
    }

})