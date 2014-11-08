/**
 * Created by leo on 2014/10/21.
 */
var db = require("./dao").getProvider("messages"),
    val = require("./validRequestData");


exports.save = function (sampleMessage, callback) {
    /* {
     To:"joe",
     From:"hellen",
     Content:"xkxie",
     CreateTime:"kkkdd",
     Read:false,,
     ReadTime:"createTime"
     _id:build by db
     } */
    db.do(function (collection) {
        collection.insert(sampleMessage, function (err, result) {
            if (err) {
                console.log(err);
            }
            callback(result);
        })
    })
}

exports.list = function (loginId, pageIndex, pageSize, callback) {
    db.do(function (collection) {
        var result = collection.find({to: loginId}).sort({CreateDate: 1}).skip(pageSize * pageIndex).limit(pageSize).toArray();
        callback(result)
    })
}
