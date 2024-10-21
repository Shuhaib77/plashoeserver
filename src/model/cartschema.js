import mongoose from "mongoose";

const cartschema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.ObjectId,
    ref: 'Users', // Use the model name as a string
    required: true, // Ensure 'required' is spelled correctly
  },
  productid: {
    type: mongoose.Schema.ObjectId,
    ref: 'Products', // Use the model name as a string
    required: true,
  },
  quantity: {
    type: Number,
    required: true, // Ensure 'required' is spelled correctly
  },
});

const Cart = mongoose.model("Cart", cartschema); // Use "Cart" as the model name
export default Cart;
