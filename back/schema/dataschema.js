const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const dataSchema=new Schema({
    prodname:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
        
    },
    category:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    desp:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
    },
    person_idupload:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    cartpresent:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
module.exports=dataSchema;