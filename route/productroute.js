import express from "express"
import { createprdt, deleteproduct, getproduct, getproductbycatogery, getproductbyid, putproduct } from "../controller/ProductControler.js"
import { verifytoken } from "../controller/Usercontroler.js"



const proute=express.Router()

 proute.post("/products",verifytoken,createprdt)
 proute.get("/products",verifytoken,getproduct)
 proute.get('/products/:id',verifytoken,getproductbyid)
 proute.get('/product',verifytoken,getproductbycatogery)
 proute.put("/products/:id",verifytoken,putproduct)
 proute.delete('/products/:id',verifytoken,deleteproduct)

 export default proute

 