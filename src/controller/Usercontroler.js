import Users from "../model/usershema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secretkey = "hhh";
export const register = async (req, res) => {
  const { password } = req.body;
  const { email } = req.body;

  const match = await Users.findOne({ email });

  if (match) {
    return res.status(404).json({ mesaage: "item alredy exist" });
  }

  if (!password) {
    return res.status(404).json({ message: "Password is required" });
  }

  const hashpass = await bcrypt.hash(password, 10);
  console.log(hashpass);

  const user = new Users({
    email: req.body.email,
    password: hashpass,
    image: req.cloudinaryImageUrl,
    confirmpass: hashpass,
  });

  try {
    await user.save();
    res.status(200).json({ message: "register successfull", user: user });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ mesaage: "user not found" });
    }
    const passmatch = await bcrypt.compare(password, user.password);
    if (!passmatch) {
      return res.status(404).json({ message: "password not match" });
    }
    const payload = {
      id: req._id,
      name: req.name,
      email: req.email,
    };
    const token = jwt.sign(payload, secretkey, { expiresIn: "1h" });

    res.status(200).json({ mesaage: "login successfull", token });
  } catch (error) {
    return res.status(500).json(error.mesaage);
  }
};

// export const getuser = async (req, res) => {
//   try {
//     const user = await Users.find();
//     if(!user){
//       return  res.status(404).json({message:"user not found  "})
//     }
//     res.status(200).json({ mesaage: "users founded", user: user });
//   } catch (error) {
//     return  res.status(500).json(error.mesaage);
//   }
// };

// export const getuserbyid = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await Users.findById(id);
//     res.status(200).json({ mesaage: "users founded with id", user: user });
//   } catch (error) {
//     return  res.status(500).json(error.mesaage);
//   }
// };

// export const putuser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const upuser = await Users.findByIdAndUpdate(id, req.body, { new: true });
//     if (!upuser) {
//       return res.status(404).json({ mesaage: "users not founded" });
//     }
//     res.status(200).json({ mesaage: "users founded", upuser });
//   } catch (error) {
//     return  res.status(500).json(error.mesaage);
//   }
// };

// export const deleteuser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await Users.findByIdAndDelete(id);
//     res.status(200).json({ mesaage: "users userdeleted success", user: user });
//   } catch (error) {
//     return  res.status(500).json(error.mesaage);
//   }
// };
