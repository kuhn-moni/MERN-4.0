import express from "express";
import {
  testResponse,
  findAllUsers,
  findUserByEmail,
  createUser,
  updateUser,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/testing", testResponse);
userRouter.get("/all", findAllUsers);
userRouter.get("/email/:email", findUserByEmail);

userRouter.post("/new", createUser);
userRouter.post("/update", updateUser);

export default userRouter;
