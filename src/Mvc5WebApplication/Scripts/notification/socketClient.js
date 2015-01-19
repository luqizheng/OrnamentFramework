define(['socketio', 'json2'], function (io) {

    function msgClient(socket, userObj, options) {

        this.Socket = socket;
        this.userObj = userObj;
        this.isConnect = false;
        var self = this;


        socket.on("valid", function () {
            socket.emit("reg user", self.userObj);
        });

        socket.on("valid-result", function (rdata) {
            if (rdata.success) {
                self.isConnect = true;
                options.validSuccess.call(self, rdata);
            } else {
                alert(data.error);
            }
        });
    }

    return {
        create: function (host, strLoginId, strName, strPublickKey) {
            var options = {
                validSuccess: function (r) {
                    console.log("connect:"+host+ " , " +JSON.stringify(r));
                    //alert(JSON.stringify(r));
                }
            };
            var socket = io.connect(host),
                userObj = {
                    publicKey: strPublickKey,
                    loginId: strLoginId,
                    name: strName
                },
              client = new msgClient(socket, userObj, options);

            socket.on("valid", function () {
                socket.emit("valid", userObj);
            });
            return client;
        }
    }
});