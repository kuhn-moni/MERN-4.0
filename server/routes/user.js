import express from "express";

const userRouter = express.Router();

userRouter.get("/testing", (req, res) => {
  res.send("We have a response!!!");
});

export default userRouter;
