
const mongoose = require('mongoose');
const inidata = require("./data.js");
const Listings = require("../modals/listing.js");


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

main().then(()=>{
    console.log("Connection Successful");
}).catch((err)=>{
    console.log(err);
})

const initdata = async ()=>{
    await Listings.deleteMany({});
    await Listings.insertMany(inidata.data);
    console.log("Data is initialized");
}

initdata();

module.exports = Listings;
