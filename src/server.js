import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
// import route from "./route/userroute.js";
import proute from "./route/productroute.js";
import uroute from "./route/userroute.js";
import aroute from "./route/adminrote.js";
import { errorHndler } from "./Middlewares/Globelmiddleware.js";
// import cookieParser from 'cookie-parser'



const app=express()
const port=5000

app.use(cors())

app.use(express.json())
// app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/')
.then(()=>console.log('conected'))
.catch((err)=>console.log(err)
)

app.use("/api",uroute)
app.use("/api",proute)
app.use("/api/admin",aroute)
app.use(errorHndler)


app.listen(port,()=>{
    console.log(`server running http://localhost:${port}`);
    
})