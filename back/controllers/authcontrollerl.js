const userModel = require("../model/authModel");
const bcrypt=require('bcryptjs');
const gentoken = require("../utils/jsonwebtoken");
const sendemailverfication = require("../utils/nodemailer");
const jsonwebtoken = require("jsonwebtoken");
const jwt=require("jsonwebtoken");
const sendotpverf = require("../utils/nodmailerotp");

const logincontroller=async(req,res)=>{
  
    const {email,password}=req.body;
    try{
        const userexist=await userModel.findOne({email});
        if(!userexist){
            return res.json({message:'Invalid email',status:200});
        }
        const correctpwd=await bcrypt.compare(password,userexist.password);
      
        if(!correctpwd){
            return res.json({message:'invalid password',status:400});
        }
     
        if(!userexist.isEmailvalid){
            return res.json({message:'Email is not verfied first verfied then login'})
        }
        req.session.isAuth=true;
        const token=gentoken(email);

        req.session.user={
            S_id:userexist._id,
            name:userexist.name,
            email:userexist.email,
        }
        res.cookie("auth_token", token, {
            httpOnly: true, // Prevent access from JavaScript
            secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
            sameSite: "strict",
            maxAge: 60 * 60 * 1000, // 1 hour
        });
        if(userexist.userwork!=='user'){
            return res.json({message:"login done by employee successfully done",status:201,user:userexist,Token:token})
            
        }
        if(userexist.userwork==='user'){
            return res.json({message:"login done",status:201,user:userexist,Token:token})
        }
        return res.json({message:'error by serverside'})

    }
    catch(err){
        console.log('err in the login',error);
        return res.json()
    }
    
}
const registercontroller=async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.send('invalid cred.... Enter data again')
    }
   
    try{
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.json({message:"invalid email try a valid email format",status:'400'})
        }
        const hashpwd=await bcrypt.hash(password,Number(process.env.salt));
        const userexist=await userModel.findOne({email});
        if(userexist){
            return res.json({message:"User exist with tis email .Please try other email for register"})
        }
        const newuser=new userModel({
            name,
            email,
            password:hashpwd
        })
        await newuser.save();
        const token=await gentoken(email);

        await sendemailverfication({email,token});
        
        
        return res.json({message:'register done and verfication token has send to your email',status:"201",Token:token})
        
    

    }
    catch(err){
        console.log('err in the register',err);
        return res.json({message:'server-side error',status:500})
    }
    

}
const verifiedemailcontroller=async(req,res)=>{
    const {Token}=req.query;

    try{
        const getdata=await jwt.verify(Token,process.env.tokenkey)
        const email=getdata.email;
        const validuser=await userModel.findOne({email});
        
        if(!validuser){
            return res.json({message:'Token invalid',status:400})
        }
        validuser.isEmailvalid=true;
        await validuser.save();
        return res.json({message:'Email verfication done'})
    }
    catch(err){
        console.log('err in verfiedemailcontroller');
        
        
    }
    
}
const verificationagain=async(req,res)=>{
   
    const {email}=req.body;
    try{
        const userexist=await userModel.findOne({email});
        if(!userexist){
            return res.json({message:'user email not exist'});
        }
        if(userexist.isEmailvalid){
            return res.json({mesage:'user email is verfied before you have no need to todo'});
        }

        const token=await gentoken(email);

        await sendemailverfication({email,token});

        return res.json({ message: "email verification token has been sent" });

        
    }
    catch(err){
        console.log('err insendemailagain controllor');
        res.jsonn({mesage:"serverside error",status:500});
        
    }
    
}
const changepwdcontroller=async(req,res)=>{
    const {email}=req.body;
    console.log(email);
    try{
        const uservalid=await userModel.findOne({email});
        if(!uservalid){
            return res.json({message:"user not found"})
        }
         const otp = Math.floor(100000 + Math.random() * 900000);
        
            console.log(otp);
            
        uservalid.otp = otp;
        uservalid.otpExpires = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        await uservalid.save();
        await sendotpverf({email,otp});
        return  res.json({message:'Otp has been send succesfully done'})

    }
    catch(err){
        console.log(err);
        return res.json({message:"server side error"});
        
    }

}
const chechmatchotp=async(req,res)=>{
    const {email,otp,password}=req.body;
    console.log(req.body);
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({message:'invalid email please enter valid email'})
        }
        console.log(user);
        const hashpwdcge=await bcrypt.hash(password,Number(process.env.salt))
        
        if(user.otp!==otp){
            return res.json({message:'invalid Otp '})
        }
        user.password=hashpwdcge;
        user.otp='';
        await user.save();

        return res.json({message:'password has been change'})


    }
    catch(err){
        console.log(err);
        return res.json({message:"server side error"});

    }
    
}
const logout = (req, res) => {
    console.log("check");
    // localStorage.removeItem("auth_token");
    res.clearCookie("auth_token");
    res.json({ message: "Logged out successfully" });
};
module.exports={logincontroller,registercontroller,verifiedemailcontroller,verificationagain,changepwdcontroller,chechmatchotp,logout};