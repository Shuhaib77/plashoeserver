import mongoose from "mongoose";

const productschema = mongoose.Schema(
  {
    image: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    catogery: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
  },
);

const Products=mongoose.model("Products",productschema)

export default Products