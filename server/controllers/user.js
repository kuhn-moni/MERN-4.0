import { response } from "express";
import { UserModel } from "../models/user.js";

const testResponse = (req, res) => {
  res.send("We have a response!!!!!!");
};

const findAllUsers = async (request, response) => {
  try {
    const users = await UserModel.find().populate("sports_activities");
    if (users) {
      const forFront = [];
      users.forEach((user) =>
        forFront.push({
          email: user.email,
          username: user.username,
          createdAt: user.createdAt,
          _id: user._id,
          activities: user.sports_activities,
        })
      );
      response.status(200).json(forFront);
    } else {
      response.status(404).json({ error: "nothing in collection" });
    }
  } catch (e) {
    response.status(500).json({ error: "Something went wrong..." });
  }
};

const findUserByEmail = async (req, res) => {
  const { email } = req.params;
  if (email && email.includes("@")) {
    try {
      const foundUser = await UserModel.findOne({ email: email });
      if (foundUser) {
        const forFront = {
          email: foundUser.email,
          username: foundUser.username,
          _id: foundUser._id,
          createdAt: foundUser.createdAt,
        };
        res.status(200).json(forFront);
      } else {
        res.status(404).json({ error: "No user found" });
      }
    } catch (e) {
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(400).json({ error: "valid mail must be included" });
  }
};
const createUser = async (req, res) => {
  console.log(req.body);
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    res.status(400).json({ error: "All fields must be filled out" });
    return;
  }
  const newUser = new UserModel({ email, password, username });
  try {
    const result = await newUser.save();
    const forFront = {
      email: result.email,
      username: result.username,
      _id: result._id,
      createdAt: result.createdAt, //time stamp - users been active since x date
    };
    res.status(200).json(forFront); //this is safe details that is not visible on frontend
  } catch (e) {
    console.log(e);
    if (e.code === 11000) {
      res.status(406).json({ error: "That email is already registered" });
    } else {
      res.status(500).json({ error: "Unknown error occurred" });
    }
  }
};

const updateUser = async (req, res) => {
  // const { _id } = req.body;
  // console.log(req.body)
  try {
    const result = await UserModel.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: "Something went wrong..." });
  }
};

export { testResponse, findAllUsers, findUserByEmail, createUser, updateUser };
