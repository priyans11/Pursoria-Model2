const express = require('express');
const app = express();

const cookieparser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');

const db = require('./config/mongoose-connection');
require('dotenv').config();

// Acquire routes
const index = require('./routes/index');
const ownersRoute = require('./routes/ownersRoutes');
const usersRoute = require('./routes/usersRoutes');
const productsRoute = require('./routes/productsRoutes');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET || 'pursuriasecret',
        cookie: {
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }
    })
);
app.use(flash());

// Add flash messages and environment to res.locals
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.process = { env: { NODE_ENV: process.env.NODE_ENV } };
    next();
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use("/", index);
app.use("/owners", ownersRoute);
app.use("/users", usersRoute);
app.use("/products", productsRoute);

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { 
        title: 'Page Not Found',
        loggedin: req.cookies.token ? true : false
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        title: 'Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {},
        loggedin: req.cookies.token ? true : false
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});