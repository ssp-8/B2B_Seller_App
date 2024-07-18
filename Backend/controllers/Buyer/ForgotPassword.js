const express = require('express')
const client = require('../../connection')
const sendMail = require('../../utils/sendMail')
const {pass_reset_token,coupon} = require('../../middleware/tokens')
const JWT = require('../../middleware/authentication')
const { sha512, sha384, sha512_256, sha512_224 } = require('js-sha512');
const route = express.Router();

route.post('/', async (req, res)=>{
    let forgetQuery = `Select "BuyerID" from "Buyer"."T1_SignedUp" where "MailID" = '${req.body.mailID}'`

    client.query(forgetQuery,async (err, result)=>{
        if(err) res.status(403).end("Wrong mailID")
        else if(result.rowCount == 0) res.status(403).end("Wrong mailID")
        else{
            let token = pass_reset_token(req.body.mailID)
            const link = `${token}`
            await sendMail(req.body.mailID,"Password reset",`
                Dear Buyer, Here is your Password Reset Link : ${link}\n
                `)
            res.end()
            
            
    }
    })
})

route.post('/:buyerID',JWT.verifyJWT_reset(), async (req, res) => {
    
    
    let query = `Update "Buyer"."T1_SignedUp" Set "Password"  = '${sha512(req.body.Password)}' where "BuyerID" = '${req.params.buyerID}'`
    client.query(query,(err, result)=>{
        if(err) res.statusCode(403)
        else{
            if(result.rowCount == 1) res.json({"Message":"Password Reset"})
        }
    })
    
})
module.exports = route