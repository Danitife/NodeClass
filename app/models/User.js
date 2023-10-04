const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        require: [true, "Please provide a valid email"],
        unique: true
    },
    password: {
        type: String,
        default: true
    },
    confirmPassword: {
        type: String,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    address: {
            state: {
                type: String,
                trim: true
            },
            city: {
                type: String,
                trim: true
            },
            country: {
                type: String,
                trim: true
            }
    }
    
})

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt)
    next()
})

const LoginSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, "Please supply email"],
        unique: true
    },
    password: {
        type: String,
        default: true
    }
},
    {timestamps: true}
)

LoginSchema.pre('save', async function(next){
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)    
        next()
})

const User = mongoose.model("User", LoginSchema)
const UserInfo = mongoose.model("UserInfo", UserSchema)

module.exports = {User, UserInfo}
