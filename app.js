const express = require('express')
require('dotenv').config();
const connectDB = require('./db/connect');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(express.json())
app.use(authRoutes)
app.use(userRoutes)


const port=process.env.PORT || 3000

const start = async () => {
    try {
      // connectDB
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () => console.log(`Server is listening port ${port}...`));
    } catch (error) {
      console.log(error);
    }
};
start();
  
module.exports=app