const isAuth=(req,res,next)=>{
    if(req.session.isAuth){
        next();
    }else{
        res.json({message:'expire or timeout'})
    }
}
module.exports=isAuth;