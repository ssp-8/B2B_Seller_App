const jwt = require('jsonwebtoken')
require('dotenv').config()

function pass_reset_token (mailID){
    let token = jwt.sign({
        mailID:mailID},
        process.env.RESET_TOKEN_SECRET,
        {expiresIn:'5m'}
        )
        return token

}

function coupon_access_token (CouponCode,Validity){
    // Every coupon validity will be till 23:59 Hrs
    // Validity String Format yyyy-mm-dd

    let token = jwt.sign({
        CouponCode:CouponCode,
    },
    process.env.COUPON_ACCESS_TOKEN_SECRET,
    {expiresIn: Date.parse(Validity)-Date.now()}
)

return token
}
module.exports = {pass_reset_token,coupon_access_token}