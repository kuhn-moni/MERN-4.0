import { activitiesModel } from "../models/sports_activities.js";
import { UserModel } from "../models/user.js";

const findAllActivities = async (req, res) => {
  try {
    const result = await activitiesModel
      .find()
      .populate({
        path: "organiser",
        select: ["username", "email", "participant"],
      })
      .populate({ path: "participants", select: ["_id", "email", "username"] });
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: "Something went wrong..." });
  }

  // res.send("testing...");
};

const createActivity = async (req, res) => {
  console.log(req.body);
  const particpantIds = req.body.participants.map((p) => p._id);
  const newActivity = {
    organiser: req.body.organiser,
    participants: particpantIds,
    activity: req.body.activity,
    duration: req.body.duration,
    date: req.body.date,
  };

  try {
    const createdActivity = await activitiesModel.create(newActivity);
    const organiser = await UserModel.findByIdAndUpdate(req.body.organiser, { $push: { sports_activities: createdActivity._id } });
    particpantIds.forEach(async (p) => {
      await UserModel.findByIdAndUpdate(p, { $push: { sports_activities: createdActivity._id } });
    });
    res.status(200).json(createdActivity);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Unknown error occured" });
  }
};

export { findAllActivities, createActivity };
