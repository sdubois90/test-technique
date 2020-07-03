// require("dotenv").config();

// const { Pool } = require("pg");

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
// })

// module.exports = { pool }

require("dotenv").config()
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () =>
    console.log("Mongodb connected :)")
);

mongoose.connection.on("error", () =>
    console.log("DB connection error :(")
);