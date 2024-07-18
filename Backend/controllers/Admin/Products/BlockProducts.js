const express = require('express')
const client = require('../../../connection')

const route = express.Router()

route.post('/',(req, res)=>{

    let BlockQuery = `Update "Product"."T1_Product_Information" Set "Blocked" = 'true' where "ProductID" = '${req.body.ProductID}'`

    client.query(BlockQuery,(err, result)=>{
        if(err) res.sendStatus(403)
        
        else res.json({"message":`${req.body.ProductID} is Blocked`})
    })
})

module.exports = route