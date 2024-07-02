const express = require('express')
const client = require('../../connection')
const bodyparser = require('body-parser')
const {v4: uuidv4} = require('uuid')

const route = express.Router()
route.use(bodyparser.json())

route.post('/', (req, res)=>{
    let buyer = req.body

    let BuyerID = uuidv4()
    let CartID = uuidv4()

    Keys = Object.keys(buyer)
    let signupQuery = 'insert into "Buyer"."T1_SignedUp" ("BuyerID" , "CartID" ,'
    for(i = 0; i < Keys.length; i++){
        signupQuery+=`"${Keys[i]}"`
        if(i != Keys.length -1) signupQuery+=', '
    }
    signupQuery+=`) values ( '${BuyerID}' , '${CartID}' ,`
    for(i = 0; i < Keys.length; i++){
        signupQuery+=`'${buyer[Keys[i]]}'`
        if(i != Keys.length -1) signupQuery+=', '
    }
    signupQuery+=')'

    console.log(signupQuery)
    client.query(signupQuery, (err, result)=>{
        if(err){
            console.log(err)
            res.status(500)
        }

        else{
            let query = `insert into "Buyer"."T2_Cart" ("CartID") values ('${CartID}')`

            client.query(query, (e,r)=> {
                if(e) res.status(505)
                
                res.json({BuyerID,buyer,CartID})
            })

           
        }

    })
})

module.exports = route