import express from "express";
import dotenv from 'dotenv';
import color from 'colors';
import connectDB from "./config/db.js";
import cors from 'cors';
import router from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRouter from "./routes/productRoute.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();


// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, './client/build/index.html')))


// DATABASE CONNECTION
connectDB();
app.use('/api/v1/auth', router);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRouter);

// rest API
app.use('*', function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
});

// APP listeninig
const PORT = process.env.PORT
app.listen(PORT, ()=>{
console.log(`SERVER RUNNING ON PORT ${PORT}`.bgWhite)
})