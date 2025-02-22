const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'data',
        unique:true
    },
    image: {
        data: Buffer,
        contentType: String  // Fixed typo here
    },
    prodname: {
        type: String,
        required: true
    },
    cartpresent: {
        type: Boolean,
        default: false
    },
    price:{
        type:Number,
        required:true
    }
});

module.exports=cartSchema;