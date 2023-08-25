import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const generateToken = (user) => {
  const payload = {
    sub: user._id,
    email: user.email,
    profile_pic: user.profile_pic,
  };
  const options = {
    expiresIn: "7d",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
};
