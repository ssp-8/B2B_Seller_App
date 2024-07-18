const express = require('express')
const JWT = require('../middleware/authentication')
const bodyparser = require('body-parser')

const reviewRoute = require('../controllers/Buyer/Product_Review')
const signUpRoute = require('../controllers/Buyer/Signup')
const cartRoute = require('../controllers/Buyer/Cart')
const ForgotPasswordRoute = require('../controllers/Buyer/ForgotPassword')
const RegisterRoute = require('../controllers/Buyer/Register')

const route = express.Router()
route.use(bodyparser.json())

route.use('/signup', signUpRoute)
route.use('/register',RegisterRoute)
route.use('/forgotpassword',ForgotPasswordRoute)

route.use(JWT.verifyJWT())

route.use('/reviews',reviewRoute)
route.use('/cart',cartRoute)

module.exports = route