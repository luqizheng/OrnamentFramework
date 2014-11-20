var url = 'mongodb://localhost:27017/msg';

var MongoClient = require('mongodb').MongoClient;

var provider = function (collectionName) {

    this.do = function (action) {

        MongoClient.connect(url, function (err, db) {

            console.log("get collection from db name=" + collectionName);
            var collection = db.collection(collectionName);
            if (!collection) {
                console.log("collection is empty, so create a new one for " + collectionName)
                db.createCollection(collectionName);
                collection = db.collection(collectionName);
            }
            console.log(collectionName+" is exist.")
            action(collection);
            db.close();
        });
    }
}

exports.getProvider = function (collection) {
    return new provider(collection);
}
