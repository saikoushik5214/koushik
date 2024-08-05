const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Listing = require("./modals/listing.js");
const path = require('path');

const app = express();
const port = 8080;

app.set("view engine" , "ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : true }));
app.engine('ejs',ejsMate);

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

main().then(()=>{
    console.log("Connection Successful");
}).catch((err)=>{
    console.log(err);
})

app.listen(port,()=>{
    console.log("App is Listening.");
})


app.get("/",(req,res)=>{
    res.send("Hi i am root node")
})


app.get("/listings", async (req,res)=>{
     let Alllistings = await Listing.find({});
    //  console.log(Alllistings);
     res.render("index.ejs",{Alllistings});
})

app.get("/listings/new",(req,res)=>{
    // res.send("gngwoig");
    res.render("add.ejs");
})

app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let data = await Listing.findById(id);
    // console.log(data);
    res.render("show.ejs",{data});
})

app.post("/listings",async (req,res)=>{
    let {title,description,image,price,country,location} = req.body;

    let add = new Listing({
         title : title,
         description : description,
         image : image,
         price : price,
         country : country,
         location : location
    });

    await add.save();
    res.redirect("/listings");
})

app.get("/listings/:id/edit", async (req,res)=>{
    let {id} = req.params;
    let data = await Listing.findById(id);
    res.render("edit.ejs",{data});
})

app.put("/listings/:id",async (req,res) => {
    let {title,description,image,price,country,location} = req.body;
    let {id} = req.params;
    await Listing.findByIdAndUpdate({_id : id},{
         title : title,
         description : description,
         image : image,
         price : price,
         country : country,
         location : location
    })
    // console.log(data);
    res.redirect("/listings/"+id);

})

app.delete("/listings/:id", async (req,res)=>{
    let {id} = req.params;
    let data = await Listing.findByIdAndDelete(id);
    console.log(data);
    res.redirect("/listings");
})