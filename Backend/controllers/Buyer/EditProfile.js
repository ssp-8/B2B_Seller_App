const express = require('express')
const client = require('../../connection')

const route = express.Router()
let PrimaryEdit = true
let SecondaryEdit = true

route.post('/',(req,res)=>{

    let profile = req.body

    if(!profile.BuyerID){
        res.sendStatus(500)
    }

    else{

    let ProfileEditQuery = `Update "Buyer"."T1_SignedUp" ` 
    let temp = ProfileEditQuery

    if(profile.Name) ProfileEditQuery+=`Set "Name" = '${profile.Name}'`

    if(profile.MailID){

        if(temp != ProfileEditQuery) ProfileEditQuery+=','
        else ProfileEditQuery+='Set'

        ProfileEditQuery+=` "MailID" = '${profile.MailID}'`
    } 

    if(temp != ProfileEditQuery){
        
        ProfileEditQuery+=` where "BuyerID" = '${profile.BuyerID}'`
        
        client.query(ProfileEditQuery,(err,result)=>{
            if(err){
                console.log(err)
                PrimaryEdit = false
                res.status(500)
            }
        })
    }

    if(PrimaryEdit){

    ProfileEditQuery = `Update "Buyer"."T3_Registered" `
    temp = ProfileEditQuery
    
    if(profile.Address01) {

        if(temp != ProfileEditQuery) ProfileEditQuery+=','
        else ProfileEditQuery+='Set'

        ProfileEditQuery+=` "AddressLine-01" = '${profile.Address01}'`
    }

    if(profile.Address02) {

        if(temp != ProfileEditQuery) ProfileEditQuery+=','
        else ProfileEditQuery+='Set'

        ProfileEditQuery+=` "AddressLine-02" = '${profile.Address02}'`
    }

    if(profile.Address03) {

        if(temp != ProfileEditQuery) ProfileEditQuery+=','
        else ProfileEditQuery+='Set'

        ProfileEditQuery+=` "AddressLine-03" = '${profile.Address03}'`
    }

    if(profile.City) {

        if(temp != ProfileEditQuery) ProfileEditQuery+=','
        else ProfileEditQuery+='Set'

        ProfileEditQuery+=` "City" = '${profile.City}'`
    }

    if(profile.State) {

        if(temp != ProfileEditQuery) ProfileEditQuery+=','
        else ProfileEditQuery+='Set'

        ProfileEditQuery+=` "State" = '${profile.State}'`
    }

    if(profile.PinCode) {

        if(temp != ProfileEditQuery) ProfileEditQuery+=','
        else ProfileEditQuery+='Set'

        ProfileEditQuery+=` "PinCode" = '${profile.PinCode}'`
    }

    if(temp != ProfileEditQuery){

        ProfileEditQuery+=` where "BuyerID" = '${profile.BuyerID}'`
        
        client.query(ProfileEditQuery,(err,result)=>{
            if(err){
                console.log(err)

                res.status(500).send(err)
            }
        })
    }

    res.status(200).json({"message":"Profile Edited Successfully"})
    }
}
})
module.exports = route