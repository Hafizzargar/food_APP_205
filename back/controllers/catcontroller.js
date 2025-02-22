const { default: mongoose } = require("mongoose");
const cartModel = require("../model/cartModel");
const dataModel = require("../model/dataModel");

const cartaddcontroller = async (req, res) => {
   
    if (!req.session.isAuth) {
        return res.json({ message: "Session expired, please login again" });
    }
    const { _id } = req.body;
    try {
        const item_id = new mongoose.Types.ObjectId(_id);
        const item = await dataModel.findById(item_id);
        if (!item) {
            console.log("item not present");
            return res.json({ message: "Item not present in DB" });
        }
        // Check if item is already present in the cart for this user
        const itempresentcart = await cartModel.findOne({
            item_id: item_id,
            user_id: req.session.user.S_id
        });
        
        if (itempresentcart) {
            return res.json({ message: "Item is already present in cart" });
        }

        // If not present, create new cart item
        const addcart = new cartModel({
            user_id: req.session.user.S_id,
            item_id: item_id,
            prodname: item.prodname,
            price: item.price,
            cartpresent: true
        });
       
        await addcart.save();
       
        
        res.json({ message: "Item successfully added to cart" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const removefromcartcont = async (req, res) => {
    const { _id } = req.body;
    if (!req.session.isAuth) {
        return res.json({ message: "Session expired, please login again" });
    }
    try {
        const item_id = new mongoose.Types.ObjectId(_id);
        const user_id = new mongoose.Types.ObjectId(req.session.user.S_id);

        // Check if item exists in cart for the specific user
        const data = await cartModel.findOne({ item_id, user_id });
        if (!data) {
            return res.json({ message: "Item not found in cart" });
        }

        // Update cartpresent to false
        data.cartpresent = false;
        await data.save();

        // Remove item from cart
        const deletefromcart = await cartModel.findOneAndDelete({ item_id, user_id });
        
        return res.json({ message: 'Item removed from cart successfully' });
    }
    catch (err) {
       
        res.status(500).json({ message: "Error occurred while removing from cart" });
    }
};

//get cart data
const getallcartdata=async(req,res)=>{
    if(!req.session.isAuth){
        return res.json({message:"session expire"});

    }
    const user_id=req.session.user.S_id;
    
    try{
        const getdatas=await cartModel.find({user_id});
        
        return res.json({message:"get cart data",cartdata:getdatas});
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Error occurred while get from cart" });

    }
}

module.exports={cartaddcontroller,removefromcartcont,getallcartdata}

