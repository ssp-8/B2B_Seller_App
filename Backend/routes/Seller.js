const express = require("express")

const SellerRoute = express.Router()
const SignUpRoute = require("../controllers/Seller/SignUp")
const LoginRoute = require("../controllers/Seller/Login")
const RegistrationRoute = require('../controllers/Seller/Register')
const OrdersRoute = require('../controllers/Seller/Orders')
const ProductRoute = require("../controllers/Seller/Product")
const TicketRoute = require('../controllers/Seller/GenerateTicket')
const PasswordResetRoute = require('../controllers/Seller/ForgetPassword')
const EditProfileRoute = require('../controllers/Seller/EditProfile')

const JWT = require("../middleware/authentication")

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
SellerRoute.use('/register',RegistrationRoute);

SellerRoute.use('/forgotpassword',PasswordResetRoute);

SellerRoute.use(JWT.verifyJWT());

// Orders Route
SellerRoute.use('/myorders',OrdersRoute)

//Product Route
SellerRoute.use('/myproducts',ProductRoute)

//EditProfile
SellerRoute.use('/edit',EditProfileRoute)

//Generate Ticket
SellerRoute.use('/ticket',TicketRoute)

module.exports = SellerRoute