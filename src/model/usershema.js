import mongoose from "mongoose";

const userschema = mongoose.Schema([
  {
    email: {
      type: String,
      require: true,
      unique:true,
      lowercase:true,
      
    },
    password: {
      type: String,
      require: true,
    },
    // confirmpass: {
    //   type: String,
    //   require: true,
    // },
    image:{
      type:String,
      require:true

    },
    role:{
      type:String,
      enum:["user",'admin'],
      default:"user"



    },
    // admin: {
    //   type: Boolean,
    //   require: true,
    // },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Cart'
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Wishlist'
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Orders'
      },
    ],
    block: {
      type: Boolean,
      default:false,
      require: true,
    },
    // orders: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
]);

const Users = mongoose.model("Users", userschema);

export default Users;
