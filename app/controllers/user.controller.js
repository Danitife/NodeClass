const User = require("../models/User")
const mongoose = require('mongoose')
const { collection } = require("../models/User")
require("../../config/env.config")

mongoose.connect(process.env.MONGODB_URL)

mongoose.connection.on('error', ()=>{
    console.log("Error in connecting to database");
})

mongoose.connection.once("open", ()=>{
    console.log("Connected to database");
})

function index(req, res){
    res.status(200).json({route: "USER"})
}

function create(req, res){
    res.status(200).json({route: "USER CREATED"})
}

function deleteUser(req, res){
    res.status(200).json({route: "USER DELETED"})
}

 async function createUser(req,res){
    const email = req.body.email
    const password = req.body.password
    try {
        const user = await User.create({
            // firstName: "Daniel",
            // lastName: "Tife",
            email: email,
            password: password
            // isActive: true,
            // address: {
            //     state: null,
            //     city: null
            // } 
        })

        mongoose.connection.collection('usered').insertOne(user, (err, collection)=>{
            if(err){
                throw err
            }
            console.log("User Registered");
        })
        res.status(200).json(user.body)
    } catch (error) {
        console.log(error);
    }
    
    
}

module.exports = {
    index, create, deleteUser, createUser
}