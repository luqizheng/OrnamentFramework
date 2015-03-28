/// <reference path='./typings/node/node.d.ts' />
/// <reference path='./typings/mongodb/mongodb.d.ts' />

var url = 'mongodb://localhost:27017/msg';
import mongo = require('mongodb');
var dbClient=mongo.MongoClient;

export function  provider  (collectionName) {

    this.db = null;
    this.do = function (action) {

        if (this.db == null) {
            dbClient.connect(url, function (err, db) {

                console.log("get collection from db name=" + collectionName);
                this.db = db;

                var collection = db.collection(collectionName);
                if (!collection) {
                    console.log("collection is empty, so create a new one for " + collectionName)
                    db.createCollection(collectionName);
                    collection = db.collection(collectionName);
                }
                console.log(collectionName + " is exist.")
                try {
                    action(collection);
                }
                catch (err) {
                    console.log("dao.js" + err);
                }
            });
        }
        else {
            var collection = this.db.collection(collectionName);
            action(collection);
        }
    }

    this.close = function () {
        this.db.close();
    }
}

export function getProvider  (collection) {
        return new provider(collection);

}
