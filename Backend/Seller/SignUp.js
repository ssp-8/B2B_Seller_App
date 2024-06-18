// Database connection established and ready to listen
const client = require('../database/User_Tables')
const { sha512, sha384, sha512_256, sha512_224 } = require('js-sha512');
const {v4 : uuidv4} = require('uuid')


const bodyparser = require('body-parser');


// getting the route set up
const express = require('express')
const SignUpRoute = express.Router()
SignUpRoute.use(bodyparser.json())

// Setting up the Post Request
SignUpRoute.post('/', (req, res)=>{
    console.log(req);

    // Taking the post request body
    let user = req.body;

    console.log(user);
    // Encrypting the password
    let password = sha512(user.password)

    // Seller ID is the UUID

    
    // The insert query being written here
    let insertQuery = `insert into "Seller"."T1_SignedUp"("SellerID", "Seller_Referral_Code", "Mail_ID" ,"Phone", "Password","Seller_Name") 
    values('${user.name}' ,'${user.referral_code}' ,'${user.mailid}' , '${user.phone}', '${password}','${user.seller_name}')`

    // query written here
    client.query(insertQuery,(error,result)=>{

    // if insertion is done and no error exists

    if(!error){
        
        // a console log and response code is sent
        console.log("Insertion done");
        res.status(200).send(user);

        }
    
    else{

            // if error exists, 505 error code sent
            console.log(err);
            res.statusCode(505);
        }
        client.end;
    })

})

module.exports = SignUpRoute

// Need to ensure that mail ID and Phone number are verified
// Need to do something about referral code
