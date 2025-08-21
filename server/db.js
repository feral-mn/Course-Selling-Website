import mongoose from 'mongoose'
import dotenv from 'dotenv'
 
dotenv.config() // Load environment variables from.env file

async function connectDB(){
    try{
    const {connection} = await mongoose.connect(process.env.MONGODB_URI)
    
    if(connection) console.log(`MongoDB connected: ${connection.host}`)

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
    })

    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

export default connectDB;

