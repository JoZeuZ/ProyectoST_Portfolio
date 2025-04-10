import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('MongoDB Atlas conectado')
  } catch (error) {
    console.error('Connection error:', error.message)
    process.exit(1)
  }
}

export default connectDB