import express from "express";
import { testResponse } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/testing", testResponse);

export default userRouter;
