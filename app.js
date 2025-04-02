const express =require('express');
const app = express();

const cookieparser = require('cookie-parser');
const path = require('path');

const db = require('./config/mongoose-connection');

//aquire routes
const ownersRoute = require('./routes/ownersRoutes');
const usersRoute = require('./routes/usersRoutes');
const productsRoute = require('./routes/productsRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use("/owners",ownersRoute);
app.use("/users",usersRoute);
app.use("/products",productsRoute);


app.get("/",(req,res)=>{
    res.send("started")
});

app.listen(3000,()=>{
    console.log("server started at port 3000")
});