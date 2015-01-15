/**
 * Created by leo-home on 2014/11/15.
 */
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

    msgClient.prototype.listFriend = function (callback) {
        var innerCallback = function(data) {
            callback(data);
        };
        this.Socket.on("list friend", innerCallback);
        this.Socket.emit('list friend', this.userObj.publicKey);
    };

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
    /**
     * 发送通知信息，如果发送后，请设置options.recever注册监听事件，否则无法处理这个type类型
     *
     * @param content
     * @param type
     * @param strContent
     * @param aryStrLoginids
     * @param callback
     */
    msgClient.prototype.sendNotify = function (content, type, strContent, aryStrLoginids) {
        /* msg={
         Content:"content",
         Type="notify",
         LoginIds=[] //接受者
         Token:publicKey,
         TemplateData=[], tempalte data,
         IsTemplate:false or not defined,
         */
        this.Socket.emit("send msg", {
            Content: content,
            Type: type,
            LoginIds: aryStrLoginids,
            IsTemplate: false
        });
    }

    var defaultOptions = {
        /*receiver: {
            "notify": function () {

            },
            "chat": function () {

            }
        },
        validSuccess: function () { //服务器能够通过验证之后，会回调这个方法

        }*/
    }
    return function (host, publicKey, loginId, name, options) {

        options = options || {};

        var socket = io.connect(host),
            result = new msgClient(socket, {
                publicKey: publicKey,
                loginId: loginId,
                name: name
            }, options);

        socket.on("valid", function () {
            socket.emit("valid", result.userObj);
        });

        for (var receiver in options.recever) {
            socket.on("new " + receiver, options.recever[receiver]);
        }

        return result;
    };

})