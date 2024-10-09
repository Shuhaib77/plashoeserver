import express from "express"
import { createprdt, deleteproduct, getproduct, getproductbycatogery, getproductbyid, putproduct } from "../controller/ProductControler.js"
import { verifytoken } from "../controller/Usercontroler.js"
import { addtocart, decrcart, incrcart, viewusercart } from "../controller/Cartcontroller.js"




const proute=express.Router()
//products
 proute.post("/products",verifytoken,createprdt)
 proute.get("/products",verifytoken,getproduct)
 proute.get('/products/:id',verifytoken,getproductbyid)
 proute.get('/product',verifytoken,getproductbycatogery)
 proute.put("/products/:id",verifytoken,putproduct)
 proute.delete('/products/:id',verifytoken,deleteproduct)
//cart
proute.post("/cart/:productid/:userid",verifytoken,addtocart)
proute.get("/cart/:userid",verifytoken,viewusercart)
proute.post("/cart/incr/:productid/:userid",incrcart)
proute.post("/cart/decr/:productid/:userid",decrcart)



 export default proute

 