const jwt = require('jsonwebtoken')
require('dotenv').config()

function signJWT (user) {
    
        const token = jwt.sign(
            {
                user: user.name,
                password: user.password
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'30d'}
        )

        return token;
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

module.exports = {signJWT, verifyJWT}


