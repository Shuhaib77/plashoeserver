// src/controllers/paymentController.js
import paypal from "paypal-rest-sdk";
import dotenv, { populate } from "dotenv";
import Users from "../model/usershema.js";
import Orders from "../model/order.js";
import Cart from "../model/cartschema.js";
import Products from "../model/productshema.js";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

// PayPal configuration
paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

export const createPayment = async (req, res) => {
  const { id } = req.params;

  const user = await Users.findById(id).populate({
    path: "cart",
    populate: { path: "productid" },
  });
  console.log("ff",user,'dsdddddsample userrrrrrrr');
  

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Ensure the cart exists and has items
  if (!user.cart || user.cart.length === 0) {
    return res.status(404).json({ message: "Cart is empty or not found" });
  }

  const products = user.cart.map((item) => ({
    productName: item.productid.name,
    productPrice: item.productid.price,
    quantity: item.quantity,
    totalPrice: item.quantity * item.productid.price,
  }));

  const totalAmount = products.reduce((acc, item) => acc + item.totalPrice, 0);

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `https://plashoeserver.onrender.com/api/${id}/${totalAmount}/success`,
      cancel_url: "https://plashoeserver.onrender.com/api/cancel",
    },
    transactions: [
      {
        item_list: {
          items: products.map((product) => ({
            name: product.productName,
            sku: "001", // Placeholder SKU
            price: product.productPrice,
            currency: "USD", // Changed currency to USD
            quantity: product.quantity,
          })),
        },
        amount: {
          currency: "USD", // Changed currency to USD
          total: totalAmount,
        },
        description: "Product purchase description",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      console.error("Error creating payment:", error);
      return res.status(500).send("Payment creation failed");
    } else {
      for (let link of payment.links) {
        if (link.rel === "approval_url") {
          return res.json({ approval_url: link.href });
        }
      }
      return res.status(400).send("No approval URL found");
    }
  });
};

// exicute

export const executePayment = async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const { totalAmount } = req.params;
  const { id } = req.params;

  if (!totalAmount) {
    res.status(404).json({ message: "total amount not found" });
  }

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: totalAmount,
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async function (error, payment) {
      if (error) {
        console.error("Payment execution error:", error.response);
        return res.status(500).send("Payment execution failed");
      } else {
        // console.log("Payment success:", JSON.stringify(payment));

        const paymentinfo = payment.payer.payer_info;
        const transaction = payment.transactions;

        // console.log(paymentinfo);


        // const products = payment.transactions[0].item_list.items;
        // res.send(products)

        const user = await Users.findById(id).populate({
          path: "cart",
          populate: { path: "productid" },
        });
        const arr = []
        user.cart.map((e)=>{

          arr.push(e.productid._id)
        })
        console.log(arr);
        

        // const user = await Users.findById(id)
        // const productIds = user.cart;
        // console.log(productIds,'suhaib');
        
      //  const y= user.cart.map((item)=>({
      //     productid:item.productid._id
      //   }))

        // console.log(productIds,"yyyy");
        

        // const user = await Users.findById(id).populate({
        //   path:"cart",
        //   populate:"productid"
        // })
        // console.log(user.cart.userid);


        
  
        // const productIds = await user.cart.map(item => item.productid);
      
        // console.log(productIds,'sss');
        
      
       const cartItem=user.cart
        // cartItem.forEach((item) => {
        //   // item.productid.map((item)=>{
        //     console.log(item._id);
            
            

        //   // })
        //   // console.log(productid.toString(),"jhfwefhdw"); // Convert ObjectId to string if needed
        // });

        
    

  //       const user = await Users.findById(id).populate({
  //         path: "cart",
  //         populate: { path: "productid" },
  //       });
        
        
  // console.log(user,'hhh');

  

        

        const order = await Orders.create({
          userId: id,
          productId: arr,
          payerId: payerId,
          paymentId: paymentId,
          totalPrice: totalAmount,
        });

        
        

        const orderId = order._id;

        const userUpdate = await Users.findOneAndUpdate(
          { _id: user._id },
          {
            $push: { orders: orderId },
            $set: { cart: [] },
          },
          { new: true }
        );

        if (!userUpdate) {
          return res
            .status(500)
            .json({ message: "Failed to update user data" });
        }




        // Remove all items from user's cart after successful payment
        await Cart.deleteMany({ _id: { $in: cartItem.map(item => item._id) } });

        return res.redirect('https://plashoe-e.vercel.app/paymentstatus');


      }
    }
  );
};

export const cancelPayment = (req, res) => {
  res.json({ message: "Payment cancelled" });
};

// export const orderdetails=()=>{

// }





