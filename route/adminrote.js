import express from 'express'
import { adminlogin, getuser, getuserbyid } from '../controller/AdminController.js'
import { verifyadmintoken } from '../Middlewares/Adminmidleware.js'


const aroute=express.Router()


aroute.post("/admin",adminlogin)
aroute.get("/admin/users",verifyadmintoken,getuser)
aroute.get('/admin/users/:id',verifyadmintoken,getuserbyid)
export default aroute