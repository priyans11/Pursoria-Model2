const userModel= require("../models/user-model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require("../utils/generateToken")


module.exports.registerUser =  async (req, res) => {

    try {
        let { email,fullname, password} = req.body;
        let user = await userModel.findOne({email: email })
        if(user){
            req.flash("error","user already exists")
            return res.redirect("/")
        }

        
        bcrypt.genSalt(10,function (err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err)
                {
                    return res.status(500).send("Internal Server Error")
                }
                else {
                    let user = await userModel.create({
                        email,
                        fullname,
                        password:hash
                    });
                   let token = generateToken(user)
                    res.cookie("token",token)
                    res.redirect("/shop")
                }
            })
        })

      
        // res.send(user);
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).send("Internall Server Error")
    }

}

module.exports.loginUser = async (req, res) => {
    let {email,password} = req.body;

   let user =await userModel.findOne({email: email})
    if(!user){
        req.flash("error","email or password is incorrect")
        return res.redirect("/");
    }
    
    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token = generateToken(user)
            res.cookie("token",token)
            res.redirect("/shop")
        }
        else{
            req.flash("error","password or email is incorrect")
            res.redirect("/")
        }
    })
}

module.exports.logout = async (req, res) => {
    res.cookie("token","")
    res.redirect("/")
}