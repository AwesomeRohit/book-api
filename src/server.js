import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import connectDB from "./db/connect-db.js";
import authRoutes from "./Routes/auth.route.js"
import cookieParser from "cookie-parser";
import bookRoutes from  "./Routes/bookRoutes.js"
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cookieParser())
const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);


app.listen(PORT,()=>{
    connectDB();
    console.log("Server started and running on ", PORT)
})
