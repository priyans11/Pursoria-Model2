const mongoose = require('mongoose');


const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: String,
    password: String,
 
    
    products:{
        type: Array,
        default: []
    },
    pictures: String,
    gstin:Number,
});

module.exports = mongoose.model('Owner', ownerSchema);
