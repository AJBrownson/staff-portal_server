const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cronJob = require('./utils/cronJob')
const port = process.env.PORT || 5000


// Connects the applicaton to MongoDB
connectDB()

// Start the cron job
cronJob()

const app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
    cors({
    origin: ['http://localhost:3000', 'https://camscan.netlify.app'],
    })
)

app.use('/api/staff', require('./routes/staffRoutes'))
app.use('/api/archive', require('./routes/archiveRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port: ${port}`))
