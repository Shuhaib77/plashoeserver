import Users from "../model/usermodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secretkey = "hhh";
export const register = async (req, res) => {
  const hashpass = await bcrypt.hash(req.body.password, 10);

  const user = new Users({
    email: req.body.email,
    password: hashpass,
    confirmpass: hashpass,
  });
  try {
    await user.save();
    res.status(200).json({ message: "register successfull", user: user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      res.status(404).json({ mesaage: "user not found" });
    }
    const passmatch = await bcrypt.compare(password, user.password);
    if (!passmatch) {
      res.status(404).json({ message: "password not match" });
    }
    const payload = {
      id: req._id,
      name: req.name,
      email: req.email,
    };
    const token = jwt.sign(payload, secretkey, { expiresIn: "1h" });

    res.status(200).json({ mesaage: "login successfull", token });
  } catch (error) {
    res.status(500).json(error.mesaage);
  }
};

export const getuser = async (req, res) => {
  try {
    const user = await Users.find();
    if(!user){
        res.status(404).json({message:"user not found  "})
    }
    res.status(200).json({ mesaage: "users founded", user: user });
  } catch (error) {
    res.status(500).json(error.mesaage);
  }
};

export const getuserbyid = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    res.status(200).json({ mesaage: "users founded with id", user: user });
  } catch (error) {
    res.status(500).json(error.mesaage);
  }
};

export const putuser = async (req, res) => {
  const { id } = req.params;
  try {
    const upuser = await Users.findByIdAndUpdate(id, req.body, { new: true });
    if (!upuser) {
      res.status(404).json({ mesaage: "users not founded" });
    }
    res.status(200).json({ mesaage: "users founded", upuser });
  } catch (error) {
    res.status(500).json(error.mesaage);
  }
};

export const deleteuser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByIdAndDelete(id);
    res.status(200).json({ mesaage: "users userdeleted success", user: user });
  } catch (error) {
    res.status(500).json(error.mesaage);
  }
};

export const verifytoken=(req,res,next)=>{
    const token=req.headers['authorization']
    if(!token){
        res.status(403).json({mesaage:"token is requird"})
    }
    jwt.verify(token,secretkey,(err,decoded)=>{
        if(err){
            res.status(401).json({mesaage:"unotharaised token"})
        }
        req.user=decoded

        next()

    })
    


}


