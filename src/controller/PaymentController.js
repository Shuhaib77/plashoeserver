// src/controllers/paymentController.js
import paypal from 'paypal-rest-sdk';
import dotenv from 'dotenv';
import Users from '../model/usershema.js';

// Load environment variables
dotenv.config();

// PayPal configuration
paypal.configure({
  'mode': 'sandbox',
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

export const createPayment = async (req, res) => {
  
  

const {id} = req.params;


const user = await Users.findById(id).populate({
  path: "cart",
  populate: { path: "productid" },
});



if (!user) {
  return res.status(404).json({ message: 'User not found' });
}

// Ensure the cart exists and has items
if (!user.cart || user.cart.length === 0) {
  return res.status(404).json({ message: 'Cart is empty or not found' });
}

const products = user.cart.map(item => ({
  productName: item.productid.name,
  productPrice: item.productid.price,
  quantity: item.quantity,
  totalPrice: item.quantity * item.productid.price,
}));


// console.log(products.reduce((acc,item)=>acc+item.totalPrice,0))
// console.log(user, 'User with populated cart and products');

// Send the products as a response
// res.status(200).json({ products });

const totalAmount = products.reduce((acc, item) => acc + item.totalPrice, 0);


const create_payment_json = {
  "intent": "sale",
  "payer": {
    "payment_method": "paypal"
  },
  "redirect_urls": {
    "return_url": `http://localhost:5000/api/${totalAmount}/success`,
    "cancel_url": "http://localhost:5000/api/cancel"
  },
  "transactions": [{
    "item_list": {
      "items": products.map(product => ({
        name: product.productName,
        sku: "001", // Placeholder SKU
        price: product.productPrice,
        currency: "USD",  // Changed currency to USD
        quantity: product.quantity
      }))
    },
    "amount": {
      "currency": "USD",  // Changed currency to USD
      "total": totalAmount
    },
    "description": "Product purchase description"
  }]
};

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      console.error('Error creating payment:', error);
      return res.status(500).send('Payment creation failed');
    } else {
      for (let link of payment.links) {
        if (link.rel === 'approval_url') {
          return res.json({ approval_url: link.href });
        }
      }
      return res.status(400).send('No approval URL found');
    }
  });
};

export const executePayment = (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
    const { totalAmount } = req.params;



    
    if(!totalAmount){
      res.status(404).json({message:"total amount not found"})
    }

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": totalAmount
      }
    }]

    


  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.error('Payment execution error:', error.response);
      return res.status(500).send('Payment execution failed');
    } else {
      console.log('Payment success:', JSON.stringify(payment));

      return res.json({ message: 'Payment success', payment });

     
    }
  });

  

};



export const cancelPayment = (req, res) => {
  res.json({ message: 'Payment cancelled' });
};


export const orderdetails=()=>{


}
