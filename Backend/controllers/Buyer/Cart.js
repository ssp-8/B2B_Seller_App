const express = require('express')
const bodyparser = require('body-parser')
const client = require('../../connection')

const route = express.Router()


// Can CartID be stored in the cache, so that an extra query can be stopped here ?


route.post('/:BuyerID',(req, res)=>{
    let buyerID = req.params.BuyerID

    let select = `Select "CartID" from "Buyer"."T1_SignedUp" where "BuyerID" = '${buyerID}'`

    // query 01
    client.query(select, (err, result_1) => {
        if(err) res.status(404).json({"err": "Buyer Not Found"})
        
        let CartID = result_1.rows[0]["CartID"]

        let selectQuery = `Select "Products" from "Buyer"."T2_Cart" where "CartID" = '${CartID}'`

        // query 02
        client.query(selectQuery, (error, result_2)=> {
            
            let Products = ''
            if(result_2.rows[0]["Products"]) {
                Products = result_2.rows[0]["Products"] 
                Products+=','}

            ProductIDs = Object.keys(req.body)
            console.log(result_2.rows)

            for(i = 0; i< ProductIDs.length;i++){
                Products+=`(${ProductIDs[i]},${req.body[ProductIDs[i]]})`
                if(i != ProductIDs.length - 1) Products+=','
            }

            let UpdateQuery = `Update "Buyer"."T2_Cart" Set "Products" = '${Products}' where "CartID" = '${CartID}'`

            console.log(UpdateQuery)

            // query 03
            client.query(UpdateQuery, (error_2, result_update)=>{
                if(error_2) res.status(505)
                
                res.json(Products)
                res.end()
            })
        })
    })
})
module.exports = route