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

const createActivity = async (req, res) => {
  console.log(req.body);
  const testing = {
    organiser: req.body.organiser,
    participants: req.body.participants.split(","),
    activity: req.body.activity,
    duration: req.body.duration,
    date: req.body.date,
  };
  console.log(testing);
  try {
    const newActivity = new activitiesModel(testing);
    const createdActivity = await newActivity.save();

    res.status(200).json(createdActivity);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Unknown error occured" });
  }
};

export { findAllActivities, createActivity };
