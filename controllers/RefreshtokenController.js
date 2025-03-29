const User =require('../model/User')

const jwt = require('jsonwebtoken')


const RefreshToken =async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ "message": "No cookies Found"})
    const refreshToken = cookies.jwt;
    const isUser = await User.findOne({refreshToken:refreshToken}).exec()
    if (!isUser) return res.status(403).json({ "message": "No user Found respect to the cookies " })
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY,
        (err, decoded) => {
            if (err || isUser.username !== decoded.username) return res.sendStatus(403)
                const roles=Object.values(isUser.roles);
            const Access_Token = jwt.sign(
                
                { "userInfo":{
                    "username": decoded.username
                    ,"roles":roles
                }
                },
                process.env.ACCESS_TOKEN_SECRET_KEY,
                { expiresIn: '30s' })
                console.log("Generated Access Token:", Access_Token);
                return res.json({Access_Token})
        }
    )
}
module.exports={RefreshToken};