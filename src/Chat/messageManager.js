/**
 * Created by leo on 2014/10/21.
 */
var db = require("./dao").getProvider("messages");

exports.saveChat = function (chatMessage, callback) {
    var msgs
    [{
        To: data.To,
        From: user.LoginId,
        Type: 'Chat',
        CreateTime: new Date(),
        Owner: user.loginId,
        Read: true
    },
        {
            To: data.To,
            From: user.LoginId,
            Type: 'Chat',
            CreateTime: new Date(),
            Owner: data.To,
            Read: false
        }];
    exports.save(msgs, function (messages) {
        console.log("_id:" + msgs[1]._id);
        callback(msgs[1]);
    });
}

exports.listChat = function (loginId, pageSize, pageIndex, callback) {

}

exports.save = function (sampleMessage, callback) {
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

exports.list = function (loginId, pageIndex, pageSize, callback) {
    db.do(function (collection) {
        var result = collection.find({to: loginId}).sort({CreateDate: 1}).skip(pageSize * pageIndex).limit(pageSize).toArray();
        callback(result)
    })
}
