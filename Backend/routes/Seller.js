const express = require("express")


const SellerRoute = express.Router()
const SignUpRoute = require("../controllers/Seller/SignUp")
const LoginRoute = require("../controllers/Seller/Login")
const RegistrationRoute = require('../controllers/Seller/Registration')
const OrdersRoute = require('../controllers/Seller/Orders')
const JWT = require("../middleware/authentication")
const ProductRoute = require("../controllers/Seller/Product")
const bodyparser = require('body-parser')


// Different Routes being used for different paths

/* 
Product Table needs to be created
// Create Product
// Get Product
// Update Product
// Delete Product

*/
SellerRoute.use(bodyparser.json())

// Sign Up Route
SellerRoute.use('/signup',SignUpRoute);

// Login Route
SellerRoute.use('/login',LoginRoute);

// Registration Route
SellerRoute.use('/registration',RegistrationRoute);

SellerRoute.use(JWT.verifyJWT());

// Orders Route
SellerRoute.use('/myorders',OrdersRoute)

//Product Route
SellerRoute.use('/myproducts',ProductRoute)

module.exports = SellerRoute