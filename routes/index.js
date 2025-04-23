const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const ownerModel = require('../models/owners-model');

router.get('/', (req, res) =>  {
    let error = req.flash("error")
    res.render('index',{error, loggedin:false});
})

router.get('/shop',isLoggedin ,async (req, res) =>  {
   let products =await productModel.find()
   let success = req.flash("success")
    res.render('shop', {products, success}); // This route renders the shop page with products and success message
})

router.get('/cart',isLoggedin ,async (req, res) =>  {
    let user =await userModel
    .findOne({email:req.user.email})
    .populate("cart")
    let bill =0;
    if(user.cart && user.cart.length > 0){
        user.cart.forEach((product)=>{
            bill=user.cart.reduce((total,items)=>{
                return total + (Number(items.price) - Number(items.discount || 0))
            },0);

            bill=bill+20;
        })
    };

    res.render('cart', {user, bill}); // This route renders the cart page with products

})


router.get('/addtocart/:productid',isLoggedin ,async (req, res) =>  {
    let user =await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.productid)
    await user.save();
    req.flash("success","Product added to cart")
    res.redirect('/shop')

})

// Development admin account setup
if (process.env.NODE_ENV === 'development') {
    router.get('/setup-admin', async (req, res) => {
        try {
            let admin = await ownerModel.findOne({ email: 'admin@pursoria.com' });
            
            if (!admin) {
                admin = await ownerModel.create({
                    fullname: 'Admin User',
                    email: 'admin@pursoria.com',
                    password: 'admin123'  // Plain text for development
                });
            
            }
            
            res.json({
                message: admin ? 'Admin exists' : 'Admin created',
                credentials: {
                    email: 'admin@pursoria.com',
                    password: 'admin123'
                }
            });
        } catch (error) {
            res.status(500).json({ error: 'Admin setup failed' });
        }
    });
}

router.get('/logout', (req, res) =>  {
    res.redirect('/login');
})

module.exports = router