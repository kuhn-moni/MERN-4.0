import { UserModel } from "../models/user.js";
import { imageUpload } from "../utilities/imageManagement.js";

const testResponse = (req, res) => {
  res.send("We have a response!!!!!!");
};

const middleTest = (req, res, next) => {
  {
    console.log("middleware is running");
    next();
  }
};

const findAllUsers = async (request, response) => {
  try {
    const users = await UserModel.find().populate("sports_activities");
    if (users) {
      const forFront = [];
      users.forEach((user) => {
        const userObj = {
          email: user.email,
          username: user.username,
          createdAt: user.createdAt,
          _id: user._id,
          profile_pic: user.profile_pic,
        };
        if (user.sports_activities) {
          userObj.sports_activities = user.sports_activities;
        }
        forFront.push(userObj);
      });
      response.status(200).json(forFront);
    } else {
      response.status(404).json({ error: "No users found" });
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
  console.log(req.file);
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    res.status(400).json({ error: "All fields must be filled out" });
    return;
  }
  try {
    const result = await imageUpload(req.file, "profile_pictures");
    console.log(result);
    const newUser = new UserModel({
      email,
      password,
      username,
      profile_pic: result,
    });
    const createdUser = await newUser.save();
    const forFront = {
      email: createdUser.email,
      username: createdUser.username,
      _id: createdUser._id,
      createdAt: createdUser.createdAt,
      profile_pic: createdUser.profile_pic,
    };
    res.status(200).json(forFront);
  } catch (e) {
    console.log(e);
    e.code === 11000
      ? res.status(406).json({ error: "That email is already registered" })
      : res.status(500).json({ error: "Unknown error occured" });
  }
};

const updateUser = async (req, res) => {
  console.log(req.file);

  // try {
  //   if (req.file) {
  //     const newProfilePic = await imageUpload(req.file, "profile_pictures");
  //     const result = await UserModel.findByIdAndUpdate(
  //       req.body._id,
  //       { ...req.body, profile_pic: newProfilePic },
  //       { new: true }
  //     );
  //     res.status(200).json(result);
  //   } else {
  //     const result = await UserModel.findByIdAndUpdate(req.body._id, req.body, {
  //       new: true,
  //     });
  //     res.status(200).json(result);
  //   }
  // } catch (e) {
  //   res.status(500).json({ error: "Something went wrong..." });
  // }
};

export {
  testResponse,
  middleTest,
  findAllUsers,
  findUserByEmail,
  createUser,
  updateUser,
};
