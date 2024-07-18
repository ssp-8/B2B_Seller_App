const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyCoupon (CouponToken) {

    jwt.verify(CouponToken,process.env.COUPON_ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err) return false
        return true
    })
}

function verifyJWT_reset(){
    return (req,res,next)=>{
        
        const authHeader = req.header('authorization')
        if(!authHeader) return res.sendStatus(401)
        jwt.verify(authHeader.split(' ')[1],process.env.RESET_TOKEN_SECRET,(err, decoded)=>{
            if(err) return res.sendStatus(403)
            else{next()}
        })
    }
}

function signJWT (user) {
    let token = null
    if(user.admin == true){

        token = jwt.sign( {
            user : user.name,
            password :  user.password,
            admin : user.admin
        },
        process.env.ADMIN_TOKEN_SECRET,
        {expiresIn:'30d'}
        )

        return token
    }
       token  = jwt.sign(
            {
                user: user.name,
                password: user.password
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'30d'}
        )

        return token;
}

function verify_authorize_Admin(){
    return (req, res, next)=>{
        const authHeader = req.header('authorization')

        if(!authHeader) return res.sendStatus(401);

        const token = authHeader.split(' ')[1]

    

        jwt.verify(
            token,
            process.env.ADMIN_TOKEN_SECRET,
            (err, result)=>{
                if(err) return res.sendStatus(403)
                
                next();
            }
        )
    }
}

function verifyJWT (){
    return (req, res, next) => {

    const authHeader = req.header('authorization')


    if(!authHeader) return res.sendStatus(401);

    

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded)=>{
                if(err) return res.sendStatus(403);
        
                next();
            }
        )
    }
}

module.exports = {signJWT, verifyJWT, verify_authorize_Admin,verifyJWT_reset,verifyCoupon}


