const nodemailer=require('nodemailer');
const sendotpverf=async({email,otp})=>{
    console.log(email);
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
        subject:'OTP send for change password',
        text:`OTP has been send is ${otp}`
    }
    
   const getting= await transporter.sendMail(mailOption);
   console.log(getting);
   if(getting){
    console.log("Sending oTp to email");
   }
   else{
    console.log("not sending OTP by some error");
    
   }
    

}
module.exports=sendotpverf