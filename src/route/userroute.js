import express from "express";
import {  login,profaile,register } from "../controller/Usercontroler.js";
// import { verifytoken } from "../Middlewares/usermidleware.js";
import uplodimage from "../Middlewares/uplod.js";
import { trycatchmidle } from "../Middlewares/tryCatchmiddleware.js";
import Validate from "../Middlewares/validationmiddleware.js";
import authvalidation from "../joivalidation/authvalidation.js";




const uroute=express.Router()



uroute.post("/register",Validate(authvalidation),uplodimage, trycatchmidle(register) )
uroute.post("/login", trycatchmidle(login) )

uroute.get('/user/:id',profaile)


// uroute.get("/users",verifytoken,getuser)
// uroute.get('/users/:id',verifytoken,getuserbyid)



export default uroute