const express = require('express')
const bodyparser = require('body-parser')
const JWT = require('../middleware/authentication')

const LoginRoute = require('../controllers/Admin/Login')
const GetSellersRoute = require('../controllers/Admin/Seller/ViewSellers')
const GetTicketsRoute = require('../controllers/Admin/Seller/ViewTickets')
const categoryRoute = require('../controllers/Admin/Products/Category')
const GetProductsRoute = require('../controllers/Admin/Products/ViewProducts')
const GetBuyersRoute = require('../controllers/Admin/Buyer/ViewBuyers')
const PushNotificationRoute = require('../controllers/Admin/PushNotification')
const GenerateCouponsRoute = require('../controllers/Admin/GenerateCoupon')
const BlockBuyersRoute = require('../controllers/Admin/Buyer/BlockBuyers')
const BlockSellerRoute = require('../controllers/Admin/Seller/BlockSellers')

const route = express.Router()
route.use(bodyparser.json())


// Coupon generation (?)       --------Today
// Push notifications           ----- Today
// Update Profiles (?)         ------ Today

//Image Encoding ------ base64 && Store images in a file, their root directory in the database (?)

// Orders - All things ----------- Need to know what all needs to be done
// Inventory management ---------- What to do?

route.use('/login',LoginRoute)

route.use(JWT.verify_authorize_Admin())

route.use('/blockbuyers',BlockBuyersRoute)

route.use('/blocksellers',BlockSellerRoute)

route.use('/viewsellers',GetSellersRoute)

route.use('/viewtickets',GetTicketsRoute)

route.use('/category',categoryRoute)

route.use('/viewbuyers',GetBuyersRoute)

route.use('/viewproducts',GetProductsRoute)

route.use('/notify',PushNotificationRoute)

route.use('/coupon',GenerateCouponsRoute)

module.exports = route