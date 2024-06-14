const express = require('express')
const OrdersRoute = express.Router()
const client = require('../database/User_Tables')

const bodyparser = require('body-parser')

OrdersRoute.use(bodyparser.json())

OrdersRoute.get('/',(req,res)=>{

    let user = req.body;
    
    let getquery = `select * from "T4_Orders" where "SellerID" = '${user.seller_id}'`

    client.query(getquery,(err,result)=>{

        if(!err){
            res.status(200).send(result.rows)
        }

        else{
            res.statusCode(505).json({
                "message" : err
            })
        }
    })
})

module.exports = OrdersRoute

// Need to set up other query parameters as well