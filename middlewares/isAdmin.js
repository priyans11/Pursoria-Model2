const jwt = require('jsonwebtoken');
const ownerModel = require('../models/owners-model');

module.exports = async (req, res, next) => {
    if (!req.cookies.adminToken) {
        req.flash('error', 'Admin authentication required');
        return res.redirect('/owners/login');
    }
    
    try {
        // Verify the admin token with fallback secret
        const decoded = jwt.verify(req.cookies.adminToken, process.env.JWT_KEY || 'default-secret-key');
        
        // Check if there's an isAdmin flag and it's true
        if (!decoded.isAdmin) {
            req.flash('error', 'Admin privileges required');
            return res.redirect('/owners/login');
        }
        
        // Find the owner in database
        const owner = await ownerModel
            .findOne({ email: decoded.email })
            .select('-password'); // exclude password from the result
        
        if (!owner) {
            req.flash('error', 'Admin not found');
            return res.redirect('/owners/login');
        }
        
        // Set owner object on request for use in route handlers
        req.owner = owner;
        next();
    } catch (err) {
        
        req.flash('error', 'Admin authentication failed');
        res.redirect('/owners/login');
    }
};
