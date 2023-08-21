import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: String,
    password: { type: String, required: true },
    profile_pic: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dp973of9c/image/upload/v1692260366/profile_pictures/placeholder_pyjtzw.png",
    },
    sports_activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sports_activities",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", userSchema);
