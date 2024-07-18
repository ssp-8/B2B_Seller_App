const express = require('express')

const client = require('../../connection')

const RegistrationRoute = express.Router()




// Creating a registration record of the Seller

RegistrationRoute.post('/', (req,res)=>{

    let Seller = req.body;

    if(!Seller.SellerID || !Seller.Name || !Seller.PanCard || !Seller.GST || !Seller.IFSC || !Seller.Aadhar 
        || !Seller.CompanyName || !Seller.BankName || !Seller.BankAccountNumber || !Seller.CompanyAddress || !Seller.Country) {
        res.sendStatus(500)
    }
    else {
    
        if(!Seller.CompanyDescription) Seller.CompanyDescription=""
        if(!Seller.BankBranch) Seller.BankBranch=""

    let registrationquery = `insert into "Seller"."T2_Registered" ("Name","SellerID", "PanID", "Aadhar", "CompanyName", "BankAccountNumber" , "GSTIN","CompanyAddress","Country","CompanyDescription","Blocked") 
    values ('${Seller.Name}','${Seller.SellerID}' , '${Seller.PanCard}', '${Seller.Aadhar}', '${Seller.CompanyName}', '${Seller.BankAccountNumber}', '${Seller.GST}' , '${Seller.CompanyAddress}','${Seller.Country}' , '${Seller.CompanyDescription}','false')`;

    let bankquery = `insert into "Seller"."T3_BankDetails" ("SellerID","BankAccountNumber","BankName","BankBranch","IFSC")
    values ('${Seller.SellerID}','${Seller.BankAccountNumber}','${Seller.BankName}','${Seller.BankBranch}','${Seller.IFSC}')`;

    // First creating the Registration account
    client.query(registrationquery, (err, result)=>{

    // if no error in registration
        if(!err){
            
    // then adding Seller bank account details

            client.query(bankquery,(error,result2)=> {
    
    // if no error in adding bank account details
                if(!error){

                    res.status(200).json({
                        "message" :"Registration Successful"
                    })
                }
    
    // else send the errors
                else
                {   console.log(error)

                    res.status(500).json({
                        "message":error
                    })
                }
            })
            
        }
        else
        {   console.log(err)
            res.status(500).json({
                "message":err
            });
        }
    })
}   
})


module.exports = RegistrationRoute

// Need to set up handle the exceptions
// Need to set up verification of bank details
// Need to set up verification of company details