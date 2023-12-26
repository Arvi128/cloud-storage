const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

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


userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})


const User=mongoose.model('user',userSchema)

module.exports = User;