const express=require("express");
const { paymentcontroller } = require("../controllers/paymentcontroller");
const payrouter=express.Router();

payrouter.post('/payment',paymentcontroller)

module.exports=payrouter;