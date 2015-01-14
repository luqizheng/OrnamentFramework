/**
 * Created by leo-home on 2014/11/15.
 */
define(['socketio', 'json2'], function (io) {

    function msgClient(socket, userObj) {

        this.Socket = socket;
        this.userObj = userObj;
        this.isConnect = false;
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

        socket.on("list friend", function (data) {

        })
    }

    msgClient.prototype.listFriend = function () {
        this.Socket.emit('list friend')
    }

    msgClient.prototype.ListChat = function (friend, pageSize, pageIndex, callback) {
        this.Socket.emit("list chat", {
            to: friend,
            pageIndex: pageIndex,
            pageSize: pageSize
        }, function (data) {
            callback(data);
        });
    }

    msgClient.prototype.sendChat = function (strMsg, strToSomeOne, callback) {

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
        receiver: {
            "notify": function () {

            },
            "chat": function () {

            }
        },
        listFriend: function () {

        }
    }
    return function (host, publicKey, loginId, options) {

        options = options || {};

        var socket = io.connect(host),
            result = new msgClient(socket, {
                publicKey: publicKey,
                loginId: loginId
            });

        socket.on("valid", function () {
            socket.emit("valid", result.userObj);
        });

        for (var receiver in options.recever) {
            socket.on("new " + receiver, options.recever[receiver])
        }

        socket.on("list friend", options.listFriend)

        return result;
    };

})