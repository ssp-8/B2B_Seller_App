const express = require('express')
const LoginRoute = express.Router()
const { sha512, sha384, sha512_256, sha512_224 } = require('js-sha512');
const client = require('../database/User_Tables')

const jwt = require('jsonwebtoken')

require('dotenv').config()

const bodyparser = require('body-parser');

LoginRoute.use(bodyparser.json());
// Login Route is set up


LoginRoute.get('/', (req,res)=>{

    let user = req.body;
    console.log(user);

    // Access token needs to be generated - needs to be linked to Users' UUID
    // How to handle the access token
    
    // the authentication query
    let authenticatequery = `Select * from "Seller"."T1_SignedUp" where sellername = '${user.name}' and password = '${sha512(user.password)}'` ;

    client.query(authenticatequery, (err, result)=>{
        console.log(result.rowCount);

        // if error doesn't exist        
        if(!err){

        // If passoword matching exists
        if(result.rowCount == 1){

            const accessToken = jwt.sign(
                { "username": user.name},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : '30s'})

            const refreshToken = jwt.sign(
                { "username": user.name},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn : '1d'})

            res.cookie('jwt',refreshToken,{httpOnly:true,maxAge: 24*60*60*1000})
            res.status(200).json({accessToken})
        }

        // Otherwise, send not matching code
        else{
                res.status(401).json(
                    {
                        message:"Login not successful"
                    }
                );
            }
        }

        // if error exists
        else{
            res.statusCode(505);
        }
    })

    client.end;
})

module.exports = LoginRoute