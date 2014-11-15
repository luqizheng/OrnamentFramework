/**
 * Created by leo-home on 2014/11/15.
 */
var db = require("./dao").getProvider("sendBox"),
    tmp = require("./template");
/*公告，通知，不需要回的*/

function sendMessage(msg, callback) {
    db.do(function (collection) {
        var msg = [];
        for (var i = 0; i < msg.LoginIds.length; i++) {
            msg.push({
                Content: msg.IsTemplate ? tmp(msg.Content, msg.TemplateData) : msg.Content,
                Type: msg.Type || "notify",
                Owner: msg.Loginids[i],
                CreateTime: new Date(),
                IsRead: false
            })
        }

        collection.insert(msg, function (err, s) {
            if (err) {
                console.log(err);
                callback({success: false, error: err});
                return;
            }
            if (s.nInserted > 1) {
                callback({success: true, messages: msg});
            }
            else {
                callback({success: false, count: s.nInserted})
            }
        });
    });
}

exports.Init = function (socket, userManager) {

    socket.on('send msg', function (msg) {
        //发送notify信息

        /* msg={
         Content:"content",
         Type="notify",
         LoginIds=[] //接受者
         Token:publicKey,
         TemplateData=[], tempalte data,
         IsTemplate:false or not defined,
         */
        var user = userManager.getUser()
        sendMessage(msg, function (data) {
            if (data.success) {
                for (var i = 0; i < data.messages.length; i++) {
                    var msg = data.messages[i];
                    var receiver = userManager.getUserByLoginId(msg.Owner)
                    receiver.socket("new " + msg.Type, msg)
                }
            }
        })


    })
}
