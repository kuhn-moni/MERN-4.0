import express from "express";
import {
  testResponse,
  findAllUsers,
  findUserByEmail,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/testing", testResponse);
userRouter.get("/all", findAllUsers);
userRouter.get("/email/:email", findUserByEmail);

export default userRouter;
