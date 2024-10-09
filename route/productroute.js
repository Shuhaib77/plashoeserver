import express from "express"
import { createprdt, deleteproduct, getproduct, getproductbycatogery, getproductbyid, putproduct } from "../controller/ProductControler.js"
import { verifytoken } from "../controller/Usercontroler.js"
import { addtocart, decrcart, deletecart, incrcart, viewusercart } from "../controller/Cartcontroller.js"
import { addtowishlist, deletetewishlist, wishlistview } from "../controller/wishlistcontroler.js"




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
proute.delete("/cart/delete/:productid/:userid",deletecart)

//wishlist

proute.post("/wishlist/:productid/:userid",addtowishlist)
proute.get("/wishlist/:userid",wishlistview)
proute.delete("/wishlist/delete/:productid/:userid",deletetewishlist)



 export default proute

 