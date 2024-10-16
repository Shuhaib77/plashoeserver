import express from 'express'
import { adminlogin, createprdt, deleteproduct, getuser, getuserbyid, putproduct } from '../controller/AdminController.js'
import { verifyadmintoken } from '../Middlewares/Adminmidleware.js'
import { trycatchmidle } from '../Middlewares/tryCatchmiddleware.js'
// import { verifytoken } from '../Middlewares/usermidleware.js'


const aroute=express.Router()


aroute.post("/admin", trycatchmidle(adminlogin))
aroute.get("/admin/users",verifyadmintoken, trycatchmidle(getuser) )
aroute.get('/admin/users/:id',verifyadmintoken, trycatchmidle(getuserbyid) )

//product

aroute.delete('/admin/products/delete/:id',verifyadmintoken, trycatchmidle(deleteproduct) )
aroute.post("/admin/products",verifyadmintoken, trycatchmidle(createprdt) )
aroute.put("/admin/products/:id",verifyadmintoken, trycatchmidle(putproduct) )
export default aroute