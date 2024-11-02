import express from "express"
import {  getproduct, getproductbycatogery, getproductbyid, } from "../controller/ProductControler.js"
// import { verifytoken } from "../controller/Usercontroler.js"
import { addtocart, decrcart, deletecart, incrcart, viewusercart } from "../controller/Cartcontroller.js"
import { addtowishlist, deletetewishlist, wishlistview } from "../controller/wishlistcontroler.js"
import { verifytoken } from "../Middlewares/usermidleware.js"
import { trycatchmidle } from "../Middlewares/tryCatchmiddleware.js"
import { cancelPayment, createPayment, executePayment, } from "../controller/PaymentController.js"
import { orderdetails } from "../controller/Ordercontroller.js"






const proute=express.Router()
//products

 proute.get("/products", trycatchmidle(getproduct) )
 proute.get('/products/:id', trycatchmidle(getproductbyid) )
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
proute.get('/:id/:totalAmount/success', trycatchmidle(executePayment) );
proute.get('/cancel', trycatchmidle(cancelPayment) );
proute.get("/orders/:id", trycatchmidle(orderdetails) )


 export default proute

 