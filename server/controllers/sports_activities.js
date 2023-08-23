import { activitiesModel } from "../models/sports_activities.js";

const findAllActivities = async (req, res) => {
  try {
    const result = await activitiesModel.find().populate({
      path: "organiser",
      select: ["username", "email", "participant"],
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: "Something went wrong..." });
  }

  res.send("testing...");
};

export { findAllActivities };
