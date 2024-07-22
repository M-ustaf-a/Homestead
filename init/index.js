const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONG_URL = "mongodb://127.0.0.1:27017/PROJECT";

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
   await mongoose.connect(MONG_URL);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj,
        owner:"669b6cec7f90d46051615414",
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized")
}

initDB();