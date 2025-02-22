const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    isEmailvalid:{
        type:Boolean,
        default:false
    },
      // OTP Fields
      otp: {
         type: String
         }, // Store OTP as a string
      otpExpires: { 
        type: Date
     }, // Expiration time for OTP

    userwork:{
        type:String,
        default:"user"
    },
    // cartpresent:{
    //     type:Boolean,
    //     default:false
    // }


})
module.exports=userSchema;
