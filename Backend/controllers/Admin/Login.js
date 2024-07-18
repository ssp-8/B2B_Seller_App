const express = require('express')
const client = require('../../connection')
const JWT = require('../../middleware/authentication')
require('dotenv').config()

const route = express.Router()

route.get('/' ,(req, res) => {

    let admin = req.body
    
    if(admin.Username == process.env.ADMIN && admin.Password  == process.env.PASSWORD){
        admin.admin = true
            let token = JWT.signJWT(admin)
            res.setHeader('X-accesstoken', token)
            res.sendStatus(200)
    }
    else{
        res.status(403)
        res.send("UserID or Password Incorrect")
    }
      
})

module.exports = route