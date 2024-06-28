const express = require("express");
const app = express()


const SellerRoute = require('./routes/seller');

app.listen(3000,()=>{
    console.log("Listening at post 3000")
});

app.use(express.urlencoded({extended:false}))

app.use('/seller',SellerRoute);