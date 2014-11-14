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

    Chat.prototype.ListChat = function (friend, pageSize, pageIndex, callback) {
        this.Socket.emit("list chat", {
            to: friend,
            pageIndex: pageIndex,
            pageSize: pageSize
        }, function (data) {
            callback(data);
        });
    }

    Chat.prototype.send = function (strMsg, strToSomeOne, strMsgType, callback) {

        /* {
     To:"joe",     
     Content:"xkxie",     
     
     } */
        var msg = {
            Content: strMsg,
            To: strToSomeOne,
            Token: this.userObj.publicKey
        };
        this.Socket.emit("send chat", msg, function (result) {
            var returnData = {
                success: result.success,
                msg: msg
            };
            callback(returnData);
        });

    };
    var defaultOptions = {
        newChat: function (data) {
            console.log("Chat " + JSON.stringify(data));
        }

    }
    return function (host, publicKey, loginId, options) {
        options = options ? options : {};
        var socket = io.connect(host),
            result = new Chat(socket, {
                publicKey: publicKey,
                loginId: loginId
            });

        socket.on("valid", function () {
            socket.emit("valid", result.userObj);
        });

        socket.on('new chat', options.newChat ? options.newChat : defaultOptions.newChat);

        return result;
    };
})