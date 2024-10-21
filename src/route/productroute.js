import express from "express"
import {  getproduct, getproductbycatogery, getproductbyid, } from "../controller/ProductControler.js"
// import { verifytoken } from "../controller/Usercontroler.js"
import { addtocart, decrcart, deletecart, incrcart, viewusercart } from "../controller/Cartcontroller.js"
import { addtowishlist, deletetewishlist, wishlistview } from "../controller/wishlistcontroler.js"
import { verifytoken } from "../Middlewares/usermidleware.js"
import { trycatchmidle } from "../Middlewares/tryCatchmiddleware.js"
import { cancelPayment, createPayment, executePayment } from "../controller/PaymentController.js"




const proute=express.Router()
//products

 proute.get("/products",verifytoken, trycatchmidle(getproduct) )
 proute.get('/products/:id',verifytoken, trycatchmidle(getproductbyid) )
 proute.get('/product',verifytoken, trycatchmidle(getproductbycatogery) )

 
//cart
proute.post("/cart/:productid/:userid",verifytoken, trycatchmidle(addtocart) )
proute.get("/cart/:userid",verifytoken, trycatchmidle(viewusercart) )
proute.post("/cart/incr/:productid/:userid", trycatchmidle(incrcart) )
proute.post("/cart/decr/:productid/:userid", trycatchmidle(decrcart) )
proute.delete("/cart/delete/:productid/:userid", trycatchmidle(deletecart) )

//wishlist

proute.post("/wishlist/:productid/:userid", trycatchmidle(addtowishlist) )
proute.get("/wishlist/:userid", trycatchmidle(wishlistview) )
proute.delete("/wishlist/delete/:productid/:userid", trycatchmidle(deletetewishlist) )




proute.post('/pay/:id', trycatchmidle(createPayment));
proute.get('/:totalAmount/success', executePayment);
proute.get('/cancel', cancelPayment);


 export default proute

 