const express = require('express')
const client = require('../../../connection')


const route = express.Router()


route.get('/',(req,res)=>{

    let query = req.query
    let ProductQuery = `Select * from "Product"."T1_Product_Information"`

    let queryKeys = Object.keys(query)
    if(queryKeys.length > 0) ProductQuery+=' where'

    for(i = 0; i < queryKeys.length;i++){
        ProductQuery+=` "${queryKeys[i]}" = '${query[queryKeys[i]]}'`
        if(i != queryKeys.length-1) ProductQuery+='and'
    }
    
    client.query(ProductQuery,(err, result)=>{

        if(err) {
            console.log(err)
            res.sendStatus(500)
        }
        else res.json(result.rows)
    })

})

route.get('/:ProductID',(req,res)=>{
    let ProductID = req.params.ProductID

    let ProductQuery = `Select * from "Product"."T1_Product_Information" where "ProductID" = '${ProductID}'`
    console.log(ProductQuery)


    client.query(ProductQuery,(err,result)=>{
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