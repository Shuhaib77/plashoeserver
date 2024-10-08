import express from "express";
import { getuser, getuserbyid, login, putuser, register, verifytoken } from "../controller/Usercontroler.js";



const uroute=express.Router()


uroute.post("/register",register)
uroute.post("/login",login)
uroute.get("/users",verifytoken,getuser)
uroute.get('/users/:id',verifytoken,getuserbyid)


export default uroute