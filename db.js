const mongoose = require("mongoose");

//Define the MongoDB connection URL
const mongoURL = "mongodb://127.0.0.1:27017/hotels"

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