const isAuth=(req,res,next)=>{
    if(req.session.isAuth){
        next();
    }else{
        res.json({message:'expire sessio or timeout'})
    }
}
module.exports=isAuth;