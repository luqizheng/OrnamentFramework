/// <reference path="../../Views/Shared/Layout/_notifyMsg.cshtml" />
/// <reference path="comm/countComm.js" />
define(['require', "/Scripts/notification/socketClient.js"],

    function (require, msgClient) {
        /*用于header的提示，这里并不立刻获取message，而是获取数字。*/
        
      
        function defineController(client) {

            require([
                '/scripts/modules/comm/notifyDetails.js',
                '/scripts/modules/comm/countComm.js'
            ], function(notify,count) {
                count.init(client);
                notify.init(client);
            });
        }



        function defineSocketIo(host, strLoginId, strName, strPublickKey) {

            var client = msgClient.create(host, strLoginId, strName, strPublickKey);
          
            return client;
        }

        return {
            init: function (host, strLoginId, strName, strPublickKey) {
                //console.log("init " + host + "；" + strLoginId + ";" + strName + ";");
                var client = defineSocketIo(host, strLoginId, strName, strPublickKey);
                defineController(client);

            }
        }
    });