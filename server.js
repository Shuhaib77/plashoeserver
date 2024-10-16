import express from "express";
import mongoose from "mongoose";
// import route from "./route/userroute.js";
import proute from "./src/route/productroute.js";
import uroute from "./src/route/userroute.js";
import aroute from "./src/route/adminrote.js";




const app=express()
const port=5000

app.use(express.json())
mongoose.connect('mongodb://localhost:27017/')
.then(()=>console.log('conected'))
.catch((err)=>console.log(err)
)

app.use("/api",uroute)
app.use("/api",proute)
app.use("/api",aroute)


app.listen(port,()=>{
    console.log(`server running http://localhost:${port}`);
    
})