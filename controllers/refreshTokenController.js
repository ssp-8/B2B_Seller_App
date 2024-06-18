const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleRefreshToken = (req,res) =>{
    const cookies = req.cookies

    if(!cookies?.jwt) return res.status(401)
    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=>{
            if(err) return res.status(401)
            
            const accessToken = jwt.sign(
                {"username":decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : '30s'} 
            )
            res.json({accessToken})
        }
    )

}

module.exports = handleRefreshToken