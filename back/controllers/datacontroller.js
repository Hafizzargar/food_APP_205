
const { default: mongoose } = require("mongoose");
const dataModel = require("../model/dataModel");

const  addproductcontroller=async(req,res)=>{
    const {prodname,price,category,rating,desp}=req.body;
    if(!req.session.isAuth){
        return res.json({message:'expire session'})
    }
    try{
        const newproduct=new dataModel({
            prodname,
            price,
            category,
            rating,
            desp,
            image:{
                data:req.file.buffer,
                contentType:req.file.buffer
            },
            person_idupload:req.session.user.S_id
        })
        await newproduct.save();
      return res.json({message:'New Product has been save to data',status:200});
    }
    catch(err){
        console.log("err");
        return res.json({message:"server side error",status:5000})
        
    }
}
const getproductscontroller=async(req,res)=>{
    if(!req.session.isAuth){
        return res.json({messaeg:"expires session"});
    }
    try{
        const dataproducts=await dataModel.find({});
        // console.log(dataproducts);
        return res.json({message:'getting data',dataproducts:dataproducts})
        

    }
    catch(err){
        console.log(err);
        

    }
}
const removeprodcontoller=async(req,res)=>{
    // console.log(req.body);
    const {_id}=req.body;
    console.log(_id);
    if(!(req.session.isAuth)){
        return res.json({message:'session expire login again'})
    }
    
    try{
        const remove=await dataModel.findByIdAndDelete({_id});
        // console.log(remove);
        
        if(!remove){
            return res.json({message:'cannot find product'})
        }
        return res.json({message:'Product has removed'})

    }
   
    catch(err){
        console.log("error in reemoveprodcontroller");
        return res.json({message:"server-side error"})
        
    }
}

//gets single product
const singleprodcont=async(req,res)=>{
    console.log(req.body);
    const {_id}=req.body;
    const itemid=_id;
    try{
        const _id=new mongoose.Types.ObjectId(itemid);
        const getdata=await dataModel.findById(_id);
        console.log(getdata);
        return res.json({message:"product get here",getdata:getdata})
        
    }
    catch(err){
        console.log("error in prodcontroller");
        return res.json({message:"server-side error"})
    }
}

module.exports={addproductcontroller,getproductscontroller,removeprodcontoller,singleprodcont};