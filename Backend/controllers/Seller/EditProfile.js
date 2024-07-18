const express = require('express')
const client = require('../../connection')

const route = express.Router()
let PrimaryEdit = true
let SecondaryEdit = true

route.post('/',(req,res)=>{

    let profile = req.body

    if(!profile.SellerID){
        res.sendStatus(500)
    }
    else{

    let ProfileEditQuery = `Update "Seller"."T2_Registered" ` 
    let temp = ProfileEditQuery

    if(profile.CompanyAddress) ProfileEditQuery+=`Set "CompanyAddress" = '${profile.CompanyAddress}'`

    if(profile.CompanyDescription){

        if(temp != ProfileEditQuery) ProfileEditQuery+=','
        else ProfileEditQuery+='Set'

        ProfileEditQuery+=` "CompanyDescription" = '${profile.CompanyDescription}'`
    } 

    if(profile.BankAccountNumber){

        if(temp != ProfileEditQuery) ProfileEditQuery+=','
        else ProfileEditQuery+='Set'

        ProfileEditQuery+=` "BankAccountNumber" = '${profile.BankAccountNumber}'`
    } 

    if(temp != ProfileEditQuery){
        
        ProfileEditQuery+=` where "SellerID" = '${profile.SellerID}'`
        
        client.query(ProfileEditQuery,(err,result)=>{
            if(err){
                console.log(err)
                PrimaryEdit = false
                res.status(500)
            }
        })
    }

    if(PrimaryEdit){

    ProfileEditQuery = `Update "Seller"."T3_BankDetails" `
    temp = ProfileEditQuery
    if(profile.BankAccountNumber) {

        if(temp != ProfileEditQuery) ProfileEditQuery+=','
        else ProfileEditQuery+='Set'

        ProfileEditQuery+=` "BankAccountNumber" = '${profile.BankAccountNumber}'`
    }

    if(profile.BankName){

        if(temp != ProfileEditQuery) ProfileEditQuery+=','
        else ProfileEditQuery+='Set'
        ProfileEditQuery+=`  "BankName" = '${profile.BankName}'`
    }

    if(profile.BankBranch){
        if(temp != ProfileEditQuery) ProfileEditQuery+=','
        else ProfileEditQuery+='Set'
        ProfileEditQuery+=` "BankBranch" = '${profile.BankBranch}'`
    }

    if(profile.IFSC) {
        if(temp != ProfileEditQuery) ProfileEditQuery+=','
        else ProfileEditQuery+='Set'
        ProfileEditQuery+=` "IFSC" = '${profile.IFSC}'`
    }

    if(temp != ProfileEditQuery){

        ProfileEditQuery+=` where "SellerID" = '${profile.SellerID}'`
        
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