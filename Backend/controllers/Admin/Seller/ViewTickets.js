const express = require('express')
const client = require('../../../connection')

// Search by Ticket Name
// Sort by Date of Registration

const route = express.Router()


route.get('/',(req,res)=>{

    let query = req.query
    let TicketQuery = `Select * from "Admin"."T2_Tickets"`

    let queryKeys = Object.keys(query)
    if(queryKeys.length > 0) TicketQuery+=' where'

    for(i = 0; i < queryKeys.length;i++){
        TicketQuery+=` "${queryKeys[i]}" = '${query[queryKeys[i]]}'`
        if(i != queryKeys.length-1) TicketQuery+='and'
    }
    
    client.query(TicketQuery,(err, result)=>{
        if(err) res.sendStatus(500)
        else res.json(result.rows)
    })

})

route.get('/:TicketID',(req,res)=>{
    let TicketID = req.params.TicketID

    let TicketQuery = `Select * from "Admin"."T2_Tickets" where "TicketID" = '${TicketID}'`

    client.query(TicketQuery,(err,result)=>{
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