const User=require('./../model/User')

const  LogOutControl=async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204)
    const refreshToken = cookies.jwt;

    const isUser =await  User.findOne({refreshToken:refreshToken}).exec()

    console.log(isUser)
    if (!isUser){
        res.clearCookie('jwt',{
            httpOnly: true,
        sameSite:'None',
        secure: false
        })
         return res.status(204)
        }
        const result=await isUser.updateOne({refreshToken:refreshToken}, {refreshToken:""})
        console.log(result)
    res.clearCookie('jwt',{
        httpOnly: true,
        sameSite:'None',
        secure: false
    })
    return res.json({"mes":"logout success"})
}
module.exports={LogOutControl};