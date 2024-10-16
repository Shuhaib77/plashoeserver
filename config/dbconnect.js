
import mongoose from "mongoose";


export const dbconnects=async()=>{
    mongoose.connect('mongodb://localhost:27017/')
    .then(()=>console.log("connected"))
    .catch((error)=>console.log(error))

}