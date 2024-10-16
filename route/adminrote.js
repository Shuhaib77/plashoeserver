import express from 'express'
import { adminlogin, createprdt, deleteproduct, getuser, getuserbyid, putproduct } from '../controller/AdminController.js'
import { verifyadmintoken } from '../Middlewares/Adminmidleware.js'
// import { verifytoken } from '../Middlewares/usermidleware.js'


const aroute=express.Router()


aroute.post("/admin",adminlogin)
aroute.get("/admin/users",verifyadmintoken,getuser)
aroute.get('/admin/users/:id',verifyadmintoken,getuserbyid)

//product

aroute.delete('/admin/products/delete/:id',verifyadmintoken,deleteproduct)
aroute.post("/admin/products",verifyadmintoken,createprdt)
aroute.put("/admin/products/:id",verifyadmintoken,putproduct)
export default aroute