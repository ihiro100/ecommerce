
const mongoClient = require('mongodb').MongoClient;
const usermodels = require('../models/user');
const url = "mongodb://ihiro:ecommerce1@ds217921.mlab.com:17921/ecommerce";

const dbName = "ecommerce";

function initDb(){
    mongoClient.connect(url,async (err, client) => {

        if(err) throw err;

        //console.log("Connected to database");

        // const database = await client.db(dbName);
        console.log("Connected to Mongo database");
        global.MongoConn = client;
        usermodels.createUserSchema();
    });
}

module.exports = initDb;
