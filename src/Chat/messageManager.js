/**
 * Created by leo on 2014/10/21.
 */
var db=require("./dao")("messages");

exports.save=function(sampleMessage,callback){
    /* {
     to:"joe",
     from:"hellen",
     content:"xkxie",
     createTime:"kkkdd",
     read:true,
     readTime:"createTime"
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
