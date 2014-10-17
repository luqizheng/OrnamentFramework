var url='mongodb://localhost:27017/msg';

var  MongoClient  = require('mongodb').MongoClient;

var provider=function(collectionName){

  this.collectionName=collectionName;
  this.do=function(action){

    MongoClient.connect(url,function(err,db){
      var collection = db.collection(this.collectionName);
      action(collection);
      db.close();
    });
  }
}

exports.getProvider=function(collection){
  return ins=new provider(collection);
}
