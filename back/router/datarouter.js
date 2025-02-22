const express=require('express');
const { addproductcontroller, getproductscontroller, removeprodcontoller, singleprodcont } = require('../controllers/datacontroller');
const datarouters=express.Router();
const multer=require('multer');
const storage = multer.memoryStorage(); // Store image in buffer
const upload = multer({ storage: storage });

datarouters.post('/addproduct',upload.single('image'),addproductcontroller);
datarouters.get("/getproducts",getproductscontroller);
datarouters.post('/removeproduct',removeprodcontoller);
datarouters.post('/getsingleproduct',singleprodcont)


module.exports=datarouters;
