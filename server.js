import express from "express"
import connectDB from './config/db.js';
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();
app.use(express.json());

app.use(cookieParser());

connectDB();

app.use(authRoutes);
app.use(productRoutes);

app.listen(9000,()=>{
    console.log("server is running");
})