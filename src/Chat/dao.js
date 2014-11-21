var url = 'mongodb://localhost:27017/msg';

var MongoClient = require('mongodb').MongoClient;

var provider = function (collectionName) {

    this.db = null;
    this.do = function (action) {

        if(this.db==null) {
            MongoClient.connect(url, function (err, db) {

                console.log("get collection from db name=" + collectionName);
                this.db = db;

                var collection = db.collection(collectionName);
                if (!collection) {
                    console.log("collection is empty, so create a new one for " + collectionName)
                    db.createCollection(collectionName);
                    collection = db.collection(collectionName);
                }
                console.log(collectionName + " is exist.")
                action(collection);
            });
        }
        else{
            var collection = this.db.collection(collectionName);
            action(collection);
        }
    }

    this.close = function () {
        this.db.close();
    }
}

exports.getProvider = function (collection) {
    return new provider(collection);
}
