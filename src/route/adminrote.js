import express from 'express'
import {  adminorders, blockuser, createprdt, deleteproduct, getuser, getuserbyid, putproduct, revanue } from '../controller/AdminController.js'
import { verifyadmintoken } from '../Middlewares/Adminmidleware.js'
import { trycatchmidle } from '../Middlewares/tryCatchmiddleware.js'
import Validate from '../Middlewares/validationmiddleware.js'
import productvalidation from '../joivalidation/productValidation.js'
import uplodimage from '../Middlewares/uplod.js'
// import { verifytoken } from '../Middlewares/usermidleware.js'


const aroute=express.Router()


// aroute.post("/", trycatchmidle(adminlogin))
aroute.get("/users",verifyadmintoken, trycatchmidle(getuser) )
aroute.get('/users/:id',verifyadmintoken, trycatchmidle(getuserbyid) )

//product

aroute.delete('/products/delete/:id',verifyadmintoken, deleteproduct) 
aroute.post("/products",verifyadmintoken,uplodimage,trycatchmidle(createprdt) )
aroute.put("/products/:id",verifyadmintoken, uplodimage,trycatchmidle(putproduct) )
aroute.get("/orders",verifyadmintoken, trycatchmidle(adminorders) )
aroute.get("/revanue",verifyadmintoken, trycatchmidle(revanue) )
aroute.post("/block/:id",blockuser)
export default aroute