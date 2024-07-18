const express = require("express");
const app = express()


const SellerRoute = require('./routes/seller');
const BuyerRoute = require('./routes/buyer');
const AdminRoute = require('./routes/admin');

app.listen(3000,()=>{
    console.log("Listening at post 3000")
});

app.use(express.urlencoded({extended:false}))

app.use('/seller',SellerRoute);
app.use('/buyer',BuyerRoute);
app.use('/admin',AdminRoute);


/* What needs to be done?

Server Hosting or Firebase

1. Reply to Tickets - Add Photo/Description in the reply
5. Orders API
    5.1 Place Order - "Order ID" ,["Product ID - Qty - Price"] ,"Total Amount" ,"Discount"," Final Amount" , "Date/Time", "Status" -(Order Placed, Confirmed, Delivered)
    5.2 Notification to the seller that a product is ordered.
    5.3 Get My Orders - Seller & Buyer
    5.4 Status of order can be changed by admin/seller
    5.5 If Transaction Completed - Put Transaction ID from the transaction table - "Transaction ID","Service Provider Transaction ID","Amt of the transaction" ,"Date/Time","Bool done"

7. Payment API
10. Buyer Card Details Tokenization
12. What to do when Category is deleted? *** Products also need to be blocked?

14. Create the alternate for counter change of existing product in Cart

*/