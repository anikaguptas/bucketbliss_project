const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructuring mongoose.Schema is unnecessary here
const Review = require('./review'); // Corrected import statement for the Review model
const User = require('./user'); // Corrected import statement for the Review model

// async function main() {
//     try {
//         await mongoose.connect(process.env.MONGO_URL);
//         console.log("Connection with MongoDB successful");
//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err);
//     }
// }

// main();

const listingschema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: String,
        url: String
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review" 
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
}
});
listingschema.post("findOneAndDelete", async(listing)=>{
    if(listing){
    await Review.deleteMany({
        _id: {$in: listing.reviews}})
    }
    })

const Listing = mongoose.model("Listing", listingschema);

module.exports = Listing;
