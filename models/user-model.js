const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    isAdmin: Boolean,
    orders:{
        type: Array,
        default: []
    },
    contact: Number,
    pictures: String,
});

module.exports = mongoose.model('User', userSchema);
