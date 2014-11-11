define(['socketio', 'json2'], function (io) {

    function createEvent(socket) {

        socket.on("msg", function () {

        });
        socket.on("send", function () {

        });
    }

    function Chat(socket, userObj) {

        this.Socket = socket;
        this.userObj = userObj;
        this.isConnect = false;
        createEvent(this.Socket);
        var self = this;

        socket.on("valid", function () {
            socket.emit("reg user", self.userObj);
        });

        socket.on("valid-result", function (rdata) {
            var data = JSON.parse(rdata);
            if (data.success) {

                self.isConnect = true;
            } else {
                alert(data.error);
            }
        });

    }

    Chat.prototype.send = function (strMsg, strToSomeOne, strMsgType, callback) {

        /* {
     To:"joe",
     From:"hellen",
     Content:"xkxie",
     CreateTime:"kkkdd",
     Read:false,,
     ReadTime:"createTime"
     _id:build by db
     } */
        var msg = {
            Content: strMsg,
            To: strMsgType,
            Type: strMsgType
        };
        this.Socket.emit("send", msg, function (result) {
            var returnData = {
                success: result.success,
                msg: msg
            };
            callback(returnData);
        });
    };

    return function (host, publicKey, loginId) {


        var socket = io.connect(host);
        var result = new Chat(socket, {
            publicKey: publicKey,
            loginId: loginId
        });
        socket.on("valid", function () {
            socket.emit("valid", result.userObj);
        });
        return result;
    };
})