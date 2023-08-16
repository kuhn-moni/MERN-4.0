import express from "express";
import { findAllActivities } from "../controllers/sports_activities.js";

const activitiesRouter = express.Router();

activitiesRouter.get("/all", findAllActivities);
export default activitiesRouter;
