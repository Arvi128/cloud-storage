const mongoose = require('mongoose')
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is a required field"],
        unique:[true,"Email is already in use"],
        lowercase:true,
        validate:[isEmail,"Email is invalid"]
    },
    password:{
        type:String,
        required:[true,"Password is a required field"],
        minlength:[6,"Password must be minimum 6 characters"]
    }
})

const User=mongoose.model('user',userSchema)

module.exports = User;