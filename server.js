import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import connectDB from "./src/db/connect-db.js";
import authRoutes from "./src/Routes/auth.route.js"
import cookieParser from "cookie-parser";
import bookRoutes from "./src/Routes/bookRoutes.js"
import { limiter } from "./src/utilities/rateLimit.js";
dotenv.config();

const app = express();
app.use(limiter)
app.use(express.json());
app.use(helmet());
app.use(cookieParser())

app.get('/', (req,res)=>{
    res.redirect('/api/books')
})
const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log("Server started and running on ", PORT)
})
