import mongoose from "mongoose";
const connectDB = async () =>{
    try {
         const connect = await mongoose.connect(process.env.MONGO_URI);
          console.log("Connected To DB");

    } catch (error) {
        console.error("Error connecting to database", error.message)
    }
}
export default connectDB;