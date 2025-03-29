const allowedOrgin=require('./../config/allowedOrgin');

const credentials=(req,res,next)=>{
    const origin=req.headers.origin;
    if(allowedOrgin.includes(origin)){
        res.header('Access-Control-Allow-Credentials',true)
    }
    next();
}

module.exports=credentials