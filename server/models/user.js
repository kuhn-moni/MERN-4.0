import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: String,
    password: { type: String, required: true },
    sports_activities: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sports_activities",
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", userSchema);
