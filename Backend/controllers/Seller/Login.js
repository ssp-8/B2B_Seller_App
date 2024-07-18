const express = require('express')
const LoginRoute = express.Router()
const { sha512, sha384, sha512_256, sha512_224 } = require('js-sha512');
const JWT = require('../../middleware/authentication')
const client = require('../../connection')

// Login Route is set up


LoginRoute.get('/', (req,res)=>{

    let user = req.body;
    console.log(user);

    if(user == null) res.sendStatus(500);

    // the authentication query
    let authenticatequery = `Select * from "Seller"."T1_SignedUp" where "Name" = '${user.Name}' and "Password" = '${sha512(user.Password)}'` ;

    client.query(authenticatequery, (err, result)=>{
       
        // if error doesn't exist        
        if(!err){

        // If passoword matching exists
        if(result.rowCount == 1){

           
            let token = JWT.signJWT(user)
            
            res.setHeader("X-access_token",token)
            res.end()
        }

        // Otherwise, send not matching code
        else{
                res.status(401);
            }
        }

        // if error exists
        else{
            console.log(err);

            res.status(505);
        }
    })
})

module.exports = LoginRoute