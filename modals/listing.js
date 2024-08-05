
const mongoose = require('mongoose');


const list = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : String,
    image : {
        type : String,
        default : "https://skift.com/wp-content/uploads/2023/04/zany-jadraque-ZCRtfop2hZY-unsplash.jpg",
        set : (v)=> v === "" ? "https://skift.com/wp-content/uploads/2023/04/zany-jadraque-ZCRtfop2hZY-unsplash.jpg" : v
    },
    price : Number,
    location : String,
    country : String
})


const Listings = new mongoose.model("Listings",list);

module.exports = Listings;