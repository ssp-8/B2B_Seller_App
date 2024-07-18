const express = require('express')
const client = require('../../connection')
const bodyparser = require('body-parser')
const pass = require('js-sha512')
const {v4: uuidv4} = require('uuid')

const route = express.Router()
route.use(bodyparser.json())

route.post('/', (req, res)=>{
    let buyer = req.body

    let BuyerID = uuidv4()
    

    Keys = Object.keys(buyer)
    let signupQuery = `insert into "Buyer"."T1_SignedUp" ("BuyerID" ,"Name","MailID","Phone","Password")
    values ('${BuyerID}','${buyer.Name}','${buyer.MailID}','${buyer.Phone}','${pass.sha512(buyer.Password)}')`
    console.log(signupQuery)
    client.query(signupQuery, (err, result)=>{
        if(err){
            console.log(err)
            res.status(500)
        }

        else{
            let query = `insert into "Buyer"."T2_Cart" ("BuyerID") values ('${BuyerID}')`

            client.query(query, (e,r)=> {
                if(e) res.status(505)
                
                res.json({BuyerID,buyer})
            })

           
        }

    })
})

module.exports = route