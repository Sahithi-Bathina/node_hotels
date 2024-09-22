const mongoose = require("mongoose");
require('dotenv').config();
//Define the MongoDB connection URL
//const mongoURL = process.env.mongoDB_local;
const mongoURL = process.env.mongoDB_Online;
//setup mongoDB connection
mongoose.connect(mongoURL , {
    useNewUrlParser : true , 
    useUnifiedTopology : true
})

//Mongoose represents the MongoDb connection
const db = mongoose.connection;

//Define Event listners tot he database
db.on("connected" , () => {
    console.log("connected to mongodb server");
});
db.on("error" , (err) => {
    console.error("Mongodb connection error : " , err);
});
db.on("disconnected" , () => {
    console.log("Mongodb disconnected");
});

//Export database connection
module.exports = db;
