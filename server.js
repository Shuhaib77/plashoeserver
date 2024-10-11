import express from "express";
import mongoose from "mongoose";
// import route from "./route/userroute.js";
import proute from "./route/productroute.js";
import uroute from "./route/userroute.js";




const app=express()
const port=5000

app.use(express.json())
mongoose.connect('mongodb://localhost:27017/')
.then(()=>console.log('conected'))
.catch((err)=>console.log(err)
)

app.use("/api",uroute)
app.use("/api",proute)


app.listen(port,()=>{
    console.log(`server running http://localhost:${port}`);
    
})