const express = require("express");
const app = express()


const UserRoute = require('./routes/seller')

app.listen(3000,()=>{
    console.log("Started to listen")
});

app.use('/users',UserRoute);