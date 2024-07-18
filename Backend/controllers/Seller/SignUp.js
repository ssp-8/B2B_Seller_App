// Database connection established and ready to listen
const client = require('../../connection')
const { sha512, sha384, sha512_256, sha512_224 } = require('js-sha512');
const {v4 : uuidv4, v4} = require('uuid')




// getting the route set up
const express = require('express')
const SignUpRoute = express.Router()

// Setting up the Post Request
SignUpRoute.post('/', (req, res)=>{
    

    // Taking the post request body
    let user = req.body;

    console.log(user);
    // Encrypting the password
    let password = sha512(user.Password)

    // Seller ID is the UUID

    if(user == null) res.statusCode(401);

    
    let SellerID = uuidv4()
    
    // The insert query being written here
    let insertQuery = `insert into "Seller"."T1_SignedUp"("SellerID", "MailID" ,"Phone", "Password","SellerName") 
    values('${SellerID}' ,'${user.MailID}' , '${user.Phone}', '${password}','${user.Name}')`

    // query written here
    client.query(insertQuery,(error,result)=>{

    // if insertion is done and no error exists

    if(!error){
        
        // a console log and response code is sent
        console.log("Insertion done");
        res.status(200).send({SellerID,user});

        }
    
    else{

            // if error exists, 505 error code sent
            console.log(error);
            res.statusCode(505);
        }
        client.end;
    })

})

module.exports = SignUpRoute

// Need to ensure that mail ID and Phone number are verified
// Need to do something about referral code
