const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedin');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

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
    
    const bill = Number(user.cart[0].price) +20 - Number(user.cart[0].discount);

    res.render('cart', {user, bill}); // This route renders the cart page with products

})


router.get('/addtocart/:productid',isLoggedin ,async (req, res) =>  {
    let user =await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.productid)
    await user.save();
    req.flash("success","Product added to cart")
    res.redirect('/shop')

})

router.get('/logout', (req, res) =>  {
    res.redirect('/login');
})

module.exports = router