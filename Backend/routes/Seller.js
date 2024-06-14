const express = require("express")


const UserRoute = express.Router()
const SignUpRoute = require("../Seller/SignUp")
const LoginRoute = require("../Seller/Login")
const RegistrationRoute = require('../Seller/Registration')
const OrdersRoute = require('../Seller/Orders')

// Different Routes being used for different paths

// Sign Up Route
UserRoute.use('/signup',SignUpRoute);

// Login Route
UserRoute.use('/login',LoginRoute);

// Registration Route
UserRoute.use('/registration',RegistrationRoute);

// Orders Route
UserRoute.use('/myorders',OrdersRoute)

module.exports = UserRoute