const express = require('express')
const client = require('../../connection')
const {v4:uuidv4} = require('uuid')

const route = express.Router()

route.post('/',(req,res)=>{
    let ticket = req.body

    if(!ticket.Date || !ticket.SellerID || !ticket.Title || !ticket.Description){
        res.sendStatus(500)
    }
    else {

    ticketID = uuidv4()
    Status = "Active"


    let ticketQuery = `insert into "Admin"."T2_Tickets" ("Status","TicketID","Date","SellerID","Title","Description"`

    if(ticket["CategoryID"]) ticketQuery+=',"CategoryID" '
    if(ticket["ProductID"]) ticketQuery+=',"ProductID"'
    ticketQuery+=')'

    ticketQuery+=` values ('${Status}','${ticketID}','${ticket.Date}','${ticket.SellerID}','${ticket.Title}','${ticket.Description}'`

    if(ticket["CategoryID"]) ticketQuery+=`'${ticket.CategoryID}',`
    if(ticket["ProductID"]) ticketQuery+=`'${ticket.ProductID}'`
    ticketQuery+=')'

    console.log(ticketQuery)
    client.query(ticketQuery,(err, result)=>{

        if(err) {
            console.log(err)
            res.sendStatus(403)
        }

        else res.json({ticketID,Status,ticket})
    })
}  
})
module.exports = route