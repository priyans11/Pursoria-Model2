const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' //id jo aye gi wo product ki hogi
    }],
    
    orders:{
        type: Array,
        default: []
    },
    contact: Number,
    pictures: String,
});

module.exports = mongoose.model('User', userSchema);
