const express = require('express')
const { signJWT, verifyJWT } = require('../middleware/authentication')
const bodyparser = require('body-parser')

const reviewRoute = require('../controllers/Buyer/Product_Review')
const signUpRoute = require('../controllers/Buyer/Signup')
const cartRoute = require('../controllers/Buyer/Cart')

const route = express.Router()
route.use(bodyparser.json())

route.use('/signup', signUpRoute)

route.use(verifyJWT())

route.use('/reviews',reviewRoute)
route.use('/cart',cartRoute)

module.exports = route