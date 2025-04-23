const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owners-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const productModel = require('../models/product-model');

// Development-only owner creation route
if(process.env.NODE_ENV=="development"){
   router.post("/create", async (req, res) => {
      let owners = await ownerModel.find();
      if(owners.length > 0){
            return res.status(503).send("owner already exists");
      }
      
      let { fullname, email, password } = req.body;
      let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
      });
      res.status(201).send(createdOwner);
    });
}

// Render admin login page
router.get('/login', (req, res) => {
    const error = req.flash('error');
    res.render('owner-login', { error, loggedin: false });
});

// Handle admin login POST request
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find owner by email
        const owner = await ownerModel.findOne({ email });
        
        if (!owner) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/owners/login');
        }
        
        // For development mode, allow plain text comparison
        if (process.env.NODE_ENV === 'development') {
            if (password === owner.password) {
                const token = jwt.sign(
                    { email: owner.email, id: owner._id, isAdmin: true },
                    process.env.JWT_KEY || 'default-secret-key',
                    { expiresIn: '24h' }
                );
                
                res.cookie('adminToken', token);
                return res.redirect('/owners/admin/products');
            }
        }
        
        // For production, use bcrypt
        bcrypt.compare(password, owner.password, function(err, result) {
            if (err || !result) {
                req.flash('error', 'Invalid email or password');
                return res.redirect('/owners/login');
            }
            
            const token = jwt.sign(
                { email: owner.email, id: owner._id, isAdmin: true },
                process.env.JWT_KEY || 'default-secret-key',
                { expiresIn: '24h' }
            );
            
            res.cookie('adminToken', token);
            return res.redirect('/owners/admin/products');
        });
        
    } catch (error) {
        req.flash('error', 'Internal server error');
        return res.redirect('/owners/login');
    }
});

// Display all products for admin
router.get('/admin/products', async (req, res) => {
    try {       
        // Later, protect this with isAdmin middleware
        const products = await productModel.find();
        const success = req.flash('success');
        res.render('admin', { products, success });
    } catch (error) {
        req.flash('error', 'Failed to fetch products');
        res.redirect('/owners/admin');
    }
});

// Render admin product creation page
router.get('/admin', (req, res) => {
    let success = req.flash("success");
    res.render('createproducts', { success }); 
});

// Admin logout
router.get('/logout', (req, res) => {
    res.clearCookie('adminToken');
    res.redirect('/owners/login');
});

module.exports = router;