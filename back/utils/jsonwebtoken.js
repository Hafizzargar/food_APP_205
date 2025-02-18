const jwt=require('jsonwebtoken');
const gentoken=(email)=>{
    return jwt.sign({email},process.env.tokenkey);

}
module.exports=gentoken;