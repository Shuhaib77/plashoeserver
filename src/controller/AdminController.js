import jwt from "jsonwebtoken";
import Users from "../model/usershema.js";
import { config } from "dotenv";
import Products from "../model/productshema.js";

config();




export const adminlogin = async (req, res) => {
 
    // const admin= await new Users(req.body.email!==process.env.Admin_email)
    if (req.body.email !== process.env.Admin_email) {
      return res.status(404).json("u are not a admin");
    }
    if (req.body.password !== process.env.Admin_pass) {
      return res.status(404).json("u are not a admin");
    }
    req.body.role="admin"
    const admin = Users(req.body);

    if (!admin) {
      res.status(404).json({ message: "user not found" });
    }
    await admin.save();

    const payload = {
      email: req.body.email,
      password: req.body.password,
    };
    console.log(Users);
    const token = jwt.sign(payload, process.env.Ajwt_secret, {
      expiresIn: "1h",
    });

    console.log(token);
    res.status(200).json({ message: "admin Login success full", token: token });
  
};

//get user

export const getuser = async (req, res) => {
   
      const user = await Users.find({role:'user'});
      if(!user){
        return  res.status(404).json({message:"user not found  "})
      }
      res.status(200).json({ mesaage: "users founded", user: user });
    
  };
  //get user by id
  
  export const getuserbyid = async (req, res) => {
  
    const { id } = req.params;
  
       
      const user = await Users.findById(id);
      res.status(200).json({ mesaage: "users founded with id", user: user });
    
  };
  

  // put user
  export const putuser = async (req, res) => {
    const { id } = req.params;
 
      const upuser = await Users.findByIdAndUpdate(id, req.body, { new: true });
      if (!upuser) {
        return res.status(404).json({ mesaage: "users not founded" });
      }
      res.status(200).json({ mesaage: "users founded", upuser });
    
  };
  

  // delete user

  export const deleteuser = async (req, res) => {
    const { id } = req.params;
  
      const user = await Users.findByIdAndDelete(id);
      res.status(200).json({ mesaage: "users userdeleted success", user: user });
   
  };


  //product create


  export const createprdt = async (req, res) => {
    const product = Products(req.body);
   
      await product.save();
      res.status(200).json({ message: "product created", products: product });
   
  };

  //product delete


  export const deleteproduct = async (req, res) => {
    const { id } = req.params;
   
      const deletedproduct = await Products.findByIdAndDelete(id);
      if (!deletedproduct) {
        return  res.status(404).json({ message: "item not found" });
      }
      res.status(200).json({ message: "item deleted successfull" });
  
  };

  //put update product

  export const putproduct = async (req, res) => {
    const { id } = req.params;
 
      const upproduct = await Products.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!upproduct) {
        return res.status(404).json({ message: "product not found" });
      }
      res.status(200).json({ message: "product updated", products: upproduct });
   
  };
  
  
