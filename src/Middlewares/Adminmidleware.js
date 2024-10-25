import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const verifyadmintoken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(404).json(" token is not found ");
  }
  jwt.verify(token, process.env.Ajwt_secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mesaage: "token not verifyed" });
    }
    req.user = decoded;
    // return decoded;
    next();
  });

 
};
