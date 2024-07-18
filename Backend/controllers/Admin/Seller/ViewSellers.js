const express = require('express')
const client = require('../../../connection')

// Search by Seller Name
// Sort by Date of Registration

const route = express.Router()


route.get('/',(req,res)=>{

    let query = req.query
    let SellerQuery = `Select * from "Seller"."T2_Registered"`

    let queryKeys = Object.keys(query)
    if(queryKeys.length > 0) SellerQuery+=' where'

    for(i = 0; i < queryKeys.length;i++){
        SellerQuery+=` "${queryKeys[i]}" = '${query[queryKeys[i]]}'`
        if(i != queryKeys.length-1) SellerQuery+='and'
    }
    
    client.query(SellerQuery,(err, result)=>{
        if(err) res.sendStatus(500)
        else res.json(result.rows)
    })

})

route.get('/:SellerID',(req,res)=>{
    let SellerID = req.params.SellerID

    let SellerQuery = `Select * from "Seller"."T2_Registered" where "SellerID" = '${SellerID}'`
    console.log(SellerQuery)


    client.query(SellerQuery,(err,result)=>{
        if(err){
            console.log(err)
            res.status(500)
            res.send(err)
        }
        else{
            res.json(result.rows)
        }
    })
})
module.exports = route