const express = require('express')
const client = require('../../connection')

const route = express.Router()

route.post('/',(req,res)=>{

    let buyer = req.body

    if(!buyer.BuyerID){
        res.status(401)
        res.json({"message":"BuyerID isn't there"})
    }

    if(!buyer.City || !buyer.Address01 || !buyer.PinCode || !buyer.State){
        res.status(401)
        res.json({"message":"Incomplete Information"})
    }

    if(!buyer.Address02) buyer.Address02=""
    if(!buyer.Address03) buyer.Address03=""


    let query = `insert into "Buyer"."T3_Registered" ("BuyerID","AddressLine-01","AddressLine-02","AddressLine-03","City","State","PinCode","Blocked")
    values ('${buyer.BuyerID}','${buyer.Address01}','${buyer.Address02}','${buyer.Address03}','${buyer.City}','${buyer.State}','${buyer.PinCode}','false')`

    client.query(query,(err,result)=>{
        if(err) {
            console.log(err)
            res.status(500)
            res.send(err)
        }
        else{
            res.json(buyer)
        }
    })
})

module.exports=route