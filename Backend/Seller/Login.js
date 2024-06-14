const express = require('express')
const LoginRoute = express.Router()
const { sha512, sha384, sha512_256, sha512_224 } = require('js-sha512');
const client = require('../database/User_Tables')

const bodyparser = require('body-parser');

LoginRoute.use(bodyparser.json());
// Login Route is set up


LoginRoute.get('/', (req,res)=>{

    let user = req.body;
    console.log(user);
    
    // the authentication query
    let authenticatequery = `Select * from signup_users where sellername = '${user.name}' and password = '${sha512(user.password)}'` ;

    client.query(authenticatequery, (err, result)=>{
        console.log(result.rowCount);

        // if error doesn't exist        
        if(!err){

        // If passoword matching exists
        if(result.rowCount == 1){
            res.status(200).json(
                {
                    message: "Login Successful"
                }
            );
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