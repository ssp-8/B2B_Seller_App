const express = require('express')
const client = require('../../connection')
const route = express.Router()

route.post('/',(req,res) => {

    let review = req.body

    console.log(review)

    let reviewQuery = 'insert into "Product"."T3_Product_Reviews" ('

    keys = Object.keys(review)
    for(i = 0; i < keys.length;i++){
        reviewQuery+=`"${keys[i]}" `
        if(i != keys.length - 1) reviewQuery+=','
    }
    reviewQuery+=') values ('
    for(i = 0; i < keys.length;i++){
        reviewQuery+=`'${review[keys[i]]}' `
        if(i != keys.length - 1) reviewQuery+=','
    }
    reviewQuery+=' )'

    console.log(reviewQuery)
    client.query(reviewQuery, (err, result)=>{
        console.log(err)

        if(err) return res.status(505);

        res.json(review);
    })
})

module.exports = route

