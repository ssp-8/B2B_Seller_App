const admin = require('firebase-admin')
const express = require('express')
const route = express.Router()
const serviceAccount = require('../../../serviceAccount.json')

// need Firebase 

const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

route.post('/',(req, res)=>{
    const receivedToken = req.body.fcmToken;

    const message = {
        notification:{
        title: "Notification",
        body: "This is a Test Notification"
        },
        token:"fIKkcxK4SZqLH8OiM7tmac:APA91bEmHiNKNbzuWfnf2PpYqUnJ1yJhmm8kVaF4hIOz1mkaqhTUUgUaFduAOGpoZvKP6JDifd6FbNC0Uydx_F7SXfRUnYy05_BILROmjB0MnhBj06F1TcWAG4cNFnIactGuZ7NiJfxt"
    }

   firebaseAdmin.messaging()
    .send(message)
    .then((response)=>{
        res.status(200).json({
            message:"Successfully sent message",
            token:"fIKkcxK4SZqLH8OiM7tmac:APA91bEmHiNKNbzuWfnf2PpYqUnJ1yJhmm8kVaF4hIOz1mkaqhTUUgUaFduAOGpoZvKP6JDifd6FbNC0Uydx_F7SXfRUnYy05_BILROmjB0MnhBj06F1TcWAG4cNFnIactGuZ7NiJfxt",
        });
    console.log("Successfully sent message: ",response);
    
    })
    .catch((error)=>{
        res.status(400);
        res.send(error);
        console.log(error);
    })
})
module.exports = route

