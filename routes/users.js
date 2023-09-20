const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/hellu");

const userSchema = mongoose.Schema({
  image:String,
  username:String,
  profilelike:{
    type:String,
    default: 0
  },
  age:Number,
  contact:String,
  about:String
  
});
module.exports = mongoose.model("user",userSchema);
 
