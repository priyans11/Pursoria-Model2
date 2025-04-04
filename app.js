const express =require('express');
const app = express();

const cookieparser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');

const db = require('./config/mongoose-connection');
require ('dotenv').config();
//aquire routes
const index = require('./routes/index');
const ownersRoute = require('./routes/ownersRoutes');
const usersRoute = require('./routes/usersRoutes');
const productsRoute = require('./routes/productsRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(
    expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash());


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.use("/",index)
app.use("/owners",ownersRoute);
app.use("/users",usersRoute);
app.use("/products",productsRoute);


app.get("/",(req,res)=>{
    res.send("started")
});

app.listen(3000,()=>{
    console.log("server started at port 3000")
});