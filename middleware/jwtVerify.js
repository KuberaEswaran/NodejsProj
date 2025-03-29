const jwt=require('jsonwebtoken')


const jwtVerify=(req,res,next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Unauthorized: No token provided' });
    }
    const token=authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET_KEY,
    (err,decoded)=>{
        if(err) return res.status(403)
        req.user=decoded.userInfo.username
        req.roles=decoded.userInfo.roles
        next()
    }
)
}

module.exports=jwtVerify;