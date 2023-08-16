import express from "express";

const activitiesRouter = express.Router();

activitiesRouter.get("/test", (req, res) => res.send("testing"));

export default activitiesRouter;
