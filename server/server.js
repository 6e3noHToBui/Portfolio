const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
require('dotenv').config();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
});

app.use(express.json())
app.use(cors())
app.use("/api/portfolio", limiter);
app.use('/api/portfolio', require('./routes/routes'))

const start = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('DB connected')
        app.listen(process.env.PORT, ()=>{console.log('Server running on PORT:', process.env.PORT)})
    } catch (error) {
        console.log('DB connection error:', error)
    }
}

start()