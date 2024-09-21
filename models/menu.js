const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true
    },
    price : {
        type : Number
    },
    taste : {
        type : String,
        enum : ["sweet" , "spice" , "sour"],
        required : true
    },
    is_drink : {
        type : Boolean,
        default : false
    },
    ingredients : {
        type : String,
        enum : ["chicken" , "mutton" , "paneer"],
        default:[]
    },
    num_sales : {
        type : Number,
        default: 0
    }
})

//create Person model for testing purpose
const menu = mongoose.model("menu" , menuItemSchema);
module.exports = menu;
