const express = require('express')
const client = require('../../../connection')

// Search by Buyer Name
// Sort by Date of Registration

const route = express.Router()


route.get('/',(req,res)=>{

    let query = req.query
    let BuyerQuery = `Select * from "Buyer"."T3_Registered"`

    let queryKeys = Object.keys(query)
    if(queryKeys.length > 0) BuyerQuery+=' where'

    for(i = 0; i < queryKeys.length;i++){
        BuyerQuery+=` "${queryKeys[i]}" = '${query[queryKeys[i]]}'`
        if(i != queryKeys.length-1) BuyerQuery+='and'
    }
    
    client.query(BuyerQuery,(err, result)=>{
        if(err) res.sendStatus(500)
        else res.json(result.rows)
    })

})

route.get('/:BuyerID',(req,res)=>{
    let BuyerID = req.params.BuyerID

    let BuyerQuery = `Select * from "Buyer"."T3_Registered" where "BuyerID" = '${BuyerID}'`

    client.query(BuyerQuery,(err,result)=>{
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