const User = require('../models/User')

const getUsers = async(req,res)=>{
    try {
        const users = await User.find({},{email:1})
        res.status(200).send({users})        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Could not fetch users"})
    }


}

module.exports={
    getUsers
}