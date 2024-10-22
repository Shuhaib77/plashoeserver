import express from "express";
import {  login,register } from "../controller/Usercontroler.js";
// import { verifytoken } from "../Middlewares/usermidleware.js";
import uplodimage from "../Middlewares/uplod.js";
import { trycatchmidle } from "../Middlewares/tryCatchmiddleware.js";




const uroute=express.Router()



uroute.post("/register",uplodimage, trycatchmidle(register) )
uroute.post("/login", trycatchmidle(login) )


// uroute.get("/users",verifytoken,getuser)
// uroute.get('/users/:id',verifytoken,getuserbyid)



export default uroute