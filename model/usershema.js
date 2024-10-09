import mongoose from "mongoose";

const userschema = mongoose.Schema([
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    confirmpass: {
      type: String,
      require: true,
    },
    admin: {
      type: Boolean,
      require: true,
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    block: {
      type: Boolean,
      require: true,
    },
    detorder: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
]);

const Users = mongoose.model("usersplashoe", userschema);

export default Users;
