const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructuring mongoose.Schema is unnecessary here
const passportlocalmongoose= require("passport-local-mongoose");
const dburl =  process.env.ATLASDB_URL;

// async function main() {
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/bucketbliss');
//         console.log("Connection with MongoDB successful");
//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err);
//     }
// }

// main();

const userschema= new Schema({
    email : {
        type: String,
        required : true
    },

})  
userschema.plugin(passportlocalmongoose);

module.exports= mongoose.model('User', userschema); 
