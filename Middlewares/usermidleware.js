import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const secretkey = process.env.jwt_secret;
export const verifytoken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ mesaage: "token is requird" });
  }
  jwt.verify(token, secretkey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mesaage: "unotharaised token" });
    }
    req.user = decoded;

    next();
  });
};
