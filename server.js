require("dotenv").config();
const express = require("express");
const app = express();	   // express is the server of the project
const hbs = require("hbs");
const path = require("path"); // The path module provides utilities for working with file and directory paths

// PostgreSQL / MongoDB
const aSessionStored = require("express-session"); // Storing user information via the session mechanism (used for Express 4.x)
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")(aSessionStored); // MongoDB session store for Connect/Express

// Lier à la DataBase + Cookies de session
require("./config/sqlConnection");

// const bodyParser = require('body-parser')

app.use(aSessionStored({
    secret: process.env.SESSION_SECRET, // This is the secret used to sign the session ID cookie (crypte les cookies)
    cookie: { maxAge: 6000000 },
    // store: new (SQLStore)(), // The session store instance = la DataBase
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
    }),
    resave: true, // If your store implements the touch method, then you can safely set resave: false. If it does not implement the touch method and your store sets an expiration date on stored sessions, then you likely need resave: true.
    // Touch method is primarily used when the store will automatically delete idle sessions and this method is used to signal to the store the given session is active, potentially resetting the idle timer.
    // no touch method here so I set "resave" to "true"?
    saveUninitialized: true, // Forces a session that is "uninitialized" (new & unmodified) to be saved to the store => Set to "true" <hen you want to be able to identify recurring visitors
}))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// “cookie-parser” is Express middleware. It is enabled for all routes through using the App.use() function.
// Within a common structure, it would be used before any other routes.
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Link our stylesheets, scripts and images starting from public automatically, ex: <img src="/images/cat.jpg">
app.use(express.static(path.join(__dirname, 'public')));

const createError = require('http-errors'); // for errors (.then() statements)

app.listen(process.env.DB_PORT, () => {
    console.log("Server running");
})

// The default engine extension to use when omitted (https://expressjs.com/en/api.html#app.set) =>
app.set("view engine", "hbs");

app.set('views', __dirname + '/views'); // Indicates to ExpressJS where to find our views


// My routes =>

const User = require("./models/User");

app.get("/", (req, res) => {
    User.find({})
        .then((dbresult) => {
            console.log(req.sessionID)  // express-session
            res.render("index", {
                allInfo: dbresult,
                title: "Test Technique Node.js + SQL",
                styles: ["styles.css"]
            });
        })
        .catch((dberror) => {
            console.log(dberror)
        })
});

app.post("/", (req, res) => {
    console.log(req.body)
    const { name, age } = req.body;
    const newUser = { name, age };

    User.create(newUser)
        .then(() => {
            res.redirect('/')
        })
        .catch(() => {
            createError(404);
        })
})