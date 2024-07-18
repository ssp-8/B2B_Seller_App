const express = require('express')
const client = require('../../connection')
const tokens = require('../../middleware/tokens')

const route = express.Router()

// Coupon ID, Coupon Name, Validity Date, '% - Percentage (int)' && 'If int - then amt'

route.post('/',(req,res)=>{
    let Coupon = req.body

    let CouponCode = Coupon.Code
    let token = tokens.coupon_access_token(CouponCode,Coupon.Validity)

    let query = `insert into "Admin"."T3_Coupons" ("CouponCode","CouponName","Validity","Discount","AccessToken") 
    values ('${CouponCode}','${Coupon.Name}','${Coupon.Validity}','${Coupon.Discount}','${token}')`

    client.query(query,(err,result)=>{
        if(err){
            console.log(err);
            res.statusCode(500);
            res.send(err);
        }
        else{
            res.setHeader("X-CouponToken",token)
            res.json(Coupon)
        }

    })
})

module.exports = route