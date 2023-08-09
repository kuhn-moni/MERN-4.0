import express from "express";
import { testResponse, findAllUsers } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/testing", testResponse);
userRouter.get("/all", findAllUsers);

export default userRouter;
