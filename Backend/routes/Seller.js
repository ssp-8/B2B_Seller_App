const express = require("express")


const SellerRoute = express.Router()
const SignUpRoute = require("../Seller/SignUp")
const LoginRoute = require("../Seller/Login")
const RegistrationRoute = require('../Seller/Registration')
const OrdersRoute = require('../Seller/Orders')
const verifyJWT = require("../middleware/authentication")
const ProductRoute = require("../Seller/Product")

// Different Routes being used for different paths

/* 
Product Table needs to be created
// Create Product
// Get Product
// Update Product
// Delete Product

*/


// Sign Up Route
SellerRoute.use('/signup',SignUpRoute);

// Login Route
SellerRoute.use('/login',LoginRoute);

// Registration Route
SellerRoute.use('/registration',RegistrationRoute);

SellerRoute.use(verifyJWT);

// Orders Route
SellerRoute.use('/myorders',OrdersRoute)

//Product Route
SellerRoute.use('/myproducts',ProductRoute)

module.exports = SellerRoute