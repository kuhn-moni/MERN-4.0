import mongoose from "mongoose";

const activiesSchema = new mongoose.Schema(
  {
    organiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    participant: String,
    activity: String,
    duration: String,
    date: String,
  },
  { timestamps: true }
);

export const activitiesModel = mongoose.model(
  "sports_activities",
  activiesSchema
);
