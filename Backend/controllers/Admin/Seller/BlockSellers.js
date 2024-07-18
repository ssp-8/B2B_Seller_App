const express = require('express')
const client = require('../../../connection')

const route = express.Router()

route.post('/',(req, res)=>{

    let blockMessage = ""
    if(!req.body.SellerID){
       
        res.sendStatus(500)
    
    }
    else if(!req.body.Block){
        res.sendStatus(500)
    }
    else {

    if(req.body.Block == "true"){
        blockMessage = "Blocked"
    }
    else{
        blockMessage = "Unblocked"
    }

    let BlockQuery = `Update "Seller"."T2_Registered" Set "Blocked" = '${req.body.Block}' where "SellerID" = '${req.body.SellerID}'`

    client.query(BlockQuery,(err, result)=>{
        if(err) res.sendStatus(403)
        
        else res.json({"message":`${req.body.SellerID} is ${blockMessage}`})
    })
}
})

module.exports = route