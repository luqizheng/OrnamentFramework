define(['socketio'], function (io) {

    var createEvent = function (socket) {

        socket.on("msg", function () {

        });
        socket.on("send", function () {

        });
    }

    function Chat(socket, userObj) {

        this.Socket = socket;
        this.userObj = userObj;
        this.isConnect = false;
        var self = this;

        socket.on("valid", function () {
            socket.emit("reg user", self.userObj);
        });

        socket.on("valid-result", function (data) {
            console.log('reg user success=' + data.success);
            if (data.success) {
                self.isConnect = true;
            } else {
                alert(data.error);
            }
        });
    }

    Chat.prototype.send = function (msgObj, callback) {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="msgObj"></param>
        /// <param name="callback"></param>
    }

    return function (host, publicKey, loginId) {


        var socket = io.connect(host);
        var result =new Chat(socket, {
            publicKey: publicKey,
            loginId: loginId
        });
        socket.on("valid", function () {
            socket.emit("valid", result.userObj);
        });
        return result;
    };
})