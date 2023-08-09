import { response } from "express";
import { UserModel } from "../models/user.js";

const testResponse = (req, res) => {
  res.send("We have a response!!!!!!");
};

const findAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: "Nothing in the collection" });
    }
  } catch (e) {
    res.status(500).json({ error: "Something went wrong?!" });
  }
};

export { testResponse, findAllUsers };
