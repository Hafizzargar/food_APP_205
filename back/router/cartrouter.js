const express=require("express");
const { cartaddcontroller, removefromcartcont, getallcartdata } = require("../controllers/catcontroller");
const cartrouter=express.Router();

cartrouter.post('/additemcart',cartaddcontroller)
cartrouter.post('/removefromcart', removefromcartcont);
cartrouter.get("/getcartitem",getallcartdata);

module.exports=cartrouter;