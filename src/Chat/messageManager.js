/**
 * Created by leo on 2014/10/21.
 */
var db=require("./dao")("messages");
var val=require(".validRequestData");


exports.save=function(sampleMessage,callback){
    /* {
     To:"joe",
     From:"hellen",
     Content:"xkxie",
     CreateTime:"kkkdd",
     Read:true,
     ReadTime:"createTime"
     _id:build by db
     } */
     db.do(function(collection){
         collection.insert(sampleMessage,function(err,result){
             if(err){
                 console.log(err);
             }
             callback(result);
         })
     })
}

exports.list=function(data,callback){

    /*{
    size:40,
    index:0,
    loginId:loginid,
    pubKey:pubKey
    } */
    val.validUser(data,function(validateResult){
        if(validateResult) {
            db.do(function (collection) {
                var result = collection.find({to: data.loginId}).sort({CreateDate: 1}).skip(data.size * data.index).limit(data.size).toArray();
                callback(result)
            })
        }
    })
}
