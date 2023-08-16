import mongoose from "mongoose";

const activiesSchema = new mongoose.Schema(
  {
    organiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    participant: { type: String },
    activity: { type: String, required: true },
    duration: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export const activitiesModel = mongoose.model(
  "sports_activities",
  activiesSchema
);
