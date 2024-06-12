const mongoose = require("mongoose")
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

main().then(res=>{console.log("connection with mongo successful")})
.catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/bucketbliss');
// }

const initdb = async ()=>{
   await  Listing.deleteMany({});
   initdata.data= initdata.data.map((obj)=>({...obj, owner : "666353d52147bdeae5109a2a"}))
   await  Listing.insertMany(initdata.data);
   console.log("data was initialised");
}
initdb();