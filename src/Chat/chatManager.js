/**
 * Created by leo on 2014/10/21.
 */
var db = require("./dao").getProvider("chat");

saveChat = function (chatMessage, callback) {
    var msgs
    [{
        To: chatMessage.To,
        From: chatMessage.LoginId,
        CreateTime: new Date(),
        Owner: chatMessage.loginId,
        Read: true
    },
        {
            To: chatMessage.To,
            From: chatMessage.LoginId,
            CreateTime: new Date(),
            Owner: chatMessage.To,
            Read: false
        }];
    exports.save(msgs, function (messages) {
        console.log("_id:" + msgs[1]._id);
        callback(msgs[1]);
    });
}

save = function (sampleMessage, callback) {
    /* {
     To:"joe",
     From:"hellen",
     Content:"xkxie",
     CreateTime:"kkkdd",
     Read:false,,
     ReadTime:"createTime",
     Owner:"joe" //message 所属的联系的人
     _id:build by db
     } */
    db.do(function (collection) {
        collection.insert(sampleMessage, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            if (s.nInserted > 1) {
                callback(sampleMessage);
            }

        })
    })
}

var list = function (loginId, pageIndex, pageSize, callback) {
    db.do(function (collection) {
        var result = collection.find({to: loginId}).sort({CreateDate: 1}).skip(pageSize * pageIndex).limit(pageSize).toArray();
        callback(result)
    })
}
/**
 * 初始化chatManger和socket的关系
 * @param socket
 * @param userManager
 * @constructor
 */
exports.Init = function (socket, userManager) {

    socket.on('send chat', function (chatMsg) {
        /*\
         chatMsg={
         Content:"content",
         To:"loginid"，
         Token:publicKey
         }
         * */
        //发送对话给某个user
        var user = userManager.getUser(data.Token);
        if (user == null) {
            socket.emit("login error");
        }
        saveChat({Content: chatMsg.Content, To: chatMsg.To, LoginId: user.loginId}, function (toMessage) {
            var toUser = userManager.get(data.to); //获取发送的online uer
            if (toUser != null) { //如果user 在线，那么直接发给他。
                toUser.socket.emit('new chat', toMessage)
            }
        });
    })

    socket.on('list chat', function (search) {
        /*
         search={
         PageIndex:0,
         PageSize=40,
         Target:'loginid'
         Token:'public key'
         }
         */
        var user = userManager.getUser(data.Token);
        list(user.loginId, search.PageIndex, search.PageSize, function (data) {
            user.socket.emit("list chat", result);
        });
    });


}
