const mongoose=require("mongoose");
const cartSchema = require("../schema/cartSchema");
const cartModel=mongoose.model("cartitem",cartSchema);
module.exports=cartModel;