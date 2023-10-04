const express = require('express')
const postRoutes = require("./app/routes/post.route")
const mongoose = require('mongoose')
const cors = require('cors')
const userController = require("./app/controllers/user.controller")
const app = express()
const createUser = require('./app/routes/user.route')
require('./config/env.config')
// const dotenv = require('dotenv')
// dotenv.config()


// DB CONNECTION

mongoose.connect(process.env.MONGODB_URL, {}, (err)=>{
    if(err){
        console.log(err);
    }
    console.log("database connected");
})

// MIDDLEWARE
app.use(cors())
app.use(express.json()) // 

const PORT = process.env.PORT || 5500


app.get('/', (req, res)=>{
    res.setHeader("Content-Type","text/html")
    res.status(200).json({status: true})
})

app.use("/posted", postRoutes)
app.post("/users", userController.createUser)

// app.get('/login', (req, res)=>{
//     res.send('logged in')
// })

app.listen(PORT, (req, res)=>{
    console.log(`${process.env.APP_NAME} created on port ${PORT}`);
})