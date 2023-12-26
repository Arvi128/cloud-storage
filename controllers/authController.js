const User = require('../models/User')
const jwt = require('jsonwebtoken')

const handleErrors = (err) =>{
    const errors = {email:'',password:''}
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(properties=>{
            errors[properties.path] = properties.message
        })
    }
    if(err.code===11000){
        errors.email = "Email is already registered"
    }
    return errors
}

const MAX_AGE = 1*24*60*60
const createToken = (id) =>{
    return jwt.sign({id},process.env.SECRET_KEY,{
        expiresIn:MAX_AGE
    })
}


const signup_post=async(req,res)=>{
    const {email,password} = req.body
    try {   
        const user = await User.create({email,password})
        const token = createToken(user._id)
        res.status(201).json({id:user._id,email:user.email,access_token:token})
    }catch(error){
        const errors = handleErrors(error)
        res.status(500).json({errors})
    }
}

const login_post=async(req,res)=>{
    const {email,password} = req.body
    try {   
        const user = await User.login(email,password)
        const token = createToken(user._id)
        res.status(200).json({id:user._id,email:user.email,access_token:token})
    }catch(error){
        res.status(400).json({})
    }
}

const logout_get=(req,res)=>{
    res.send("logout post")
}

module.exports = {
    signup_post,
    login_post,
    logout_get
}