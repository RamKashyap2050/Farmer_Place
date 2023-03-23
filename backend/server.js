const express = require('express')
// console.log(express)
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const adminModal = require('./models/adminModal')
const userModel = require('./models/userModel')

PORT = process.env.PORT || 5001
connectDB()


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/Users', require('./routes/userRoutes'))
app.use('/Admin', require('./routes/AdminRoutes'))


app.use(errorHandler)
app.listen(PORT, () => console.log(`Server is running at ${PORT}`))


