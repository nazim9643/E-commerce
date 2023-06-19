import mongoose from "mongoose";
const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`DATABASE CONNECT SUCCESSFULL ${conn.connection.host}`.bgMagenta)
        
    } catch (error) {
        console.log(`DATABASE CONNECTION FAILED ${error}`.bgRed)
    }
};
export default connectDB;