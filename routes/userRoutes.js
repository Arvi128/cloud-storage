const {Router}  = require('express')
const userController = require('../controllers/userController')
const authenticateToken = require('../controllers/tokenController')
const userRouter = Router()

userRouter.get('/users',authenticateToken, userController.getUsers)


module.exports = userRouter