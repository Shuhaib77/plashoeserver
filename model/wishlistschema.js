import mongoose from "mongoose";
import Users from "./usershema.js";
import Products from "./productshema.js";


const wislistshema=mongoose.Schema({
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:"Users",
        require:true


    },
    productid:{
        type:mongoose.Schema.ObjectId,
        ref:"Products",
        require:true
    }


})

const Wishlist=mongoose.model("wishlist",wislistshema)

export default Wishlist






