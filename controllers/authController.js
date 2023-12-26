const User = require('../models/User')

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

const signup_post=async(req,res)=>{
    const {email,password} = req.body
    try {   
        const user = await User.create({email,password})
        res.status(201).json(user)
    }catch(error){
        const errors = handleErrors(error)
        res.status(500).json({errors})
    }
}

const login_post=(req,res)=>{
    res.status(200).json(req.body)
}

const logout_get=(req,res)=>{
    res.send("logout post")
}

module.exports = {
    signup_post,
    login_post,
    logout_get
}