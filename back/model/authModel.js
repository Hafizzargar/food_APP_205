const mongoose=require('mongoose');
const userSchema = require('../schema/authschema');

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;