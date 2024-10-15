import jwt from "jsonwebtoken";
import Users from "../model/usershema.js";
import { config } from "dotenv";

config();




export const adminlogin = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get user

export const getuser = async (req, res) => {
    try {
      const user = await Users.find({role:'user'});
      if(!user){
        return  res.status(404).json({message:"user not found  "})
      }
      res.status(200).json({ mesaage: "users founded", user: user });
    } catch (error) {
      return  res.status(500).json(error.mesaage);
    }
  };
  //get user by id
  
  export const getuserbyid = async (req, res) => {
  
    const { id } = req.params;
    try {
       
      const user = await Users.findById(id);
      res.status(200).json({ mesaage: "users founded with id", user: user });
    } catch (error) {
      return  res.status(500).json(error.mesaage);
    }
  };
  

  // put user
  export const putuser = async (req, res) => {
    const { id } = req.params;
    try {
      const upuser = await Users.findByIdAndUpdate(id, req.body, { new: true });
      if (!upuser) {
        return res.status(404).json({ mesaage: "users not founded" });
      }
      res.status(200).json({ mesaage: "users founded", upuser });
    } catch (error) {
      return  res.status(500).json(error.mesaage);
    }
  };
  

  // delete user

  export const deleteuser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await Users.findByIdAndDelete(id);
      res.status(200).json({ mesaage: "users userdeleted success", user: user });
    } catch (error) {
      return  res.status(500).json(error.mesaage);
    }
  };
  
