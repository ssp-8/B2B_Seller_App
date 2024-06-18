const express = require('express')

const client = require('../database/User_Tables');

const RegistrationRoute = express.Router()
const bodyparser = require('body-parser')
RegistrationRoute.use(bodyparser.json())



// Creating a registration record of the User

RegistrationRoute.post('/', (req,res)=>{

    let user = req.body;

    let registrationquery = `insert into "Seller"."T2_Registered" ("SellerID", "PanCard_ID", "Aadhar", "Company_Name", "Bank_Account_Number" , "GST_IN","Company_Address","Country","Company_Description") 
    values ('${user.sellerID}' , '${user.pancard}', '${user.aadhar}', '${user.company_name}', '${user.bank_account_number}', '${user.GST}' , '${user.company_address}','${user.country} , '${user.company_description}')`;

    let bankquery = `insert into "Seller"."T3_BankDetails" ("SellerID","Bank_Account_Number","Bank_Name","Bank_Branch","IFSC_Code")
    values ('${user.sellerID}','${user.bank_account_number}','${user.bank_name}','${user.bank_branch}','${user.IFSC_Code}')`;

    // First creating the Registration account
    client.query(registrationquery, (err, result)=>{

    // if no error in registration
        if(!err){
            
    // then adding user bank account details

            client.query(bankquery,(error,result2)=> {
    
    // if no error in adding bank account details
                if(!error){

                    res.status(200).json({
                        "message" :"Registration Successful"
                    })
                }
    
    // else send the errors
                else
                {
                    res.status(505).json({
                        "message":error
                    })
                }
            })
            
        }
        else
        {
            res.status(505).json({
                "message":err
            });
        }
    })
    
})


module.exports = RegistrationRoute

// Need to set up handle the exceptions
// Need to set up verification of bank details
// Need to set up verification of company details