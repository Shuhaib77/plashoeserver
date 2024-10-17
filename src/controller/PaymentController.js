// src/controllers/paymentController.js
import paypal from 'paypal-rest-sdk';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// PayPal configuration
paypal.configure({
  'mode': 'sandbox',
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

export const createPayment = (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:5000/api/success",
      "cancel_url": "http://localhost:5000/api/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "Red Sox Hat",
          "sku": "001",
          "price": "25.00",
          "currency": "USD",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "USD",
        "total": "25.00"
      },
      "description": "Hat for the best team ever"
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

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "25.00"
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
