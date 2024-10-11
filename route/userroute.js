import express from "express";
import { getuser, getuserbyid, login, putuser, register } from "../controller/Usercontroler.js";
import { verifytoken } from "../Middlewares/usermidleware.js";
import uplodimage from "../Middlewares/uplod.js";



const uroute=express.Router()


uroute.post("/register",uplodimage,register)
uroute.post("/login",login)
uroute.get("/users",verifytoken,getuser)
uroute.get('/users/:id',verifytoken,getuserbyid)


export default uroute