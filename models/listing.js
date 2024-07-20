const mongoose = require("mongoose");
const Review = require( "./review" );
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
     type: String,
     required: true
    },
    description: String,
    image: {
        type: String,
        default: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
        set: (v)=> v===""?"https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg":v
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.review}}); 
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;