var url = 'mongodb://localhost:27017/msg';

var MongoClient = require('mongodb').MongoClient;

var provider = function (collectionName) {

    this.collectionName = collectionName + "";

    this.do = function (action) {

        MongoClient.connect(url, function (err, db) {

            console.log("get collection from db name=" + this.collectionName);
            var collection = db.collection(this.collectionName+"");
            if (collection) {
                console.log("collection is empty, so create a new one for " + this.collectionName)
                db.createCollection(this.collectionName+"");
                collection = db.collection(this.collectionName+"");
            }
            action(collection);
            db.close();
        });
    }
}

exports.getProvider = function (collection) {
    return new provider(collection);
}
