// Description: This is the entry point of the server application. 
// It sets up the server, connects to the database, and defines the routes for the application.
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from'morgan'
import connectDB from '../server/db.js'
import user_routes from './routes/user_routes.js'
import course_routes from './routes/course_routes.js'
import error from './middleware/error.js'
import cloudinary from 'cloudinary'


dotenv.config() // Load environment variables from .env file
const app = express()// Initialize express app
app.use(express.json());// for parsing application/json
app.use(cors()) // for enabling CORS
app.use(cookieParser()) // for parsing cookies
app.use(morgan('dev')) // for logging requests


// Define routes
app.use('/api/v1/user', user_routes)
app.use('/api/v1/course', course_routes)
// app.use('api/v1/payment', user_payment)
app.use(error)

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await connectDB(); // Connect to MongoDB
    console.log(`Server running on port ${PORT}`)

});

