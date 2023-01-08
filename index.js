const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000


// Connects the applicaton to MongoDB
connectDB()

const app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/api/staff', require('./routes/staffRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port: ${port}`))
