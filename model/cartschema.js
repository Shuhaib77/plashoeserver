import mongoose from "mongoose";
import Users from "./usershema.js";
import Products from "./productshema.js";

const cartschema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.ObjectId,
    ref: Users,
    require: true,
  },
  productid: {
    type: mongoose.Schema.ObjectId,
    ref: Products,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
});

const Cart = mongoose.model("cart", cartschema);

export default Cart;
