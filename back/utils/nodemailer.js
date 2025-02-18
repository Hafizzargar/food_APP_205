const nodemailer=require('nodemailer');
const sendemailverfication=async({email,token})=>{
    const transporter=nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false, // Required for Gmail on port 587
        auth:{
            user:process.env.email,
            pass:process.env.pass
        }
    })
    console.log("checking");
    const mailOption={
        from:process.env.email,
        to:email,
        subject:'Sending email verfication token',
        text:`Email verfication token for verfication email click on the link http://localhost:${process.env.port}/api/auth/verfiedemail?Token=${token}`
    }
    
   const getting= await transporter.sendMail(mailOption);
//    console.log(getting);
   if(getting){
    console.log("email verfication has been send to your email");
   }
   else{
    console.log("not send email verfication by some error");
    
   }
    

}
module.exports=sendemailverfication