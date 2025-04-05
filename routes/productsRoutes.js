const express = require('express');
const router = express.Router();
const upload= require("../config/multer-config")
const productModel= require('../models/product-model');

router.post('/create',upload.single("image"),async (req, res) => { // This route is for creating a product
    //("image") is the name of the file input in the form
    // res.send(req.file); 
    //req.file tbhi hoga jb apka file encryption multipart form data hoga
   try{

       let {  name, price, discount, bgcolor, panelcolor, textcolor:textcolor } = req.body; // Destructuring the request body
       //image is already in req.file.buffer 

    let product = await productModel.create({
    
    name:name,
    price:price,
    discount:discount,
    bgcolor:bgcolor,
    panelcolor:panelcolor,
    textcolor:textcolor,
    image: req.file.buffer
    });
    req.flash("success","product created successfully")
    res.redirect('/owners/admin'); // Redirecting to the admin page after creating the product
}
    catch(err){
     
        return res.status(500).send("Internal Server Error")
    }
});

module.exports = router;