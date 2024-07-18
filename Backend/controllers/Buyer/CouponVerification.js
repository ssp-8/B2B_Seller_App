const express = require('express')
const verify = require('../../middleware/authentication')
const client = require('../../connection')

const route = express.Router()

// Should I write Delete query separately?


route.get('/',(req,res)=>{

    let CouponCode = req.body.Code

    let query = `Select "AccessToken" from "Admin"."T3_Coupons" where "CouponCode" = '${CouponCode}'`

    client.query(query,(err,result)=>{
        if(err){
            console.log(err)
            res.status(500)
            res.send(err)
        }
        else if(result.rowCount == 0){
            res.status(401)
            res.send("Unautorized Coupon Code")
        }
        else{
            let AccessToken = result.rows[0]

            if(verify.verifyCoupon(AccessToken) == true){
                res.json("Coupon Verified")
            }

            else {
                res.json("Coupon Expired")
            }
        }
    })
})

// Every Coupon is applicable only once (?)

module.exports = route