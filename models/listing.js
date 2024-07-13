const mongoose = require("mongoose");
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

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;