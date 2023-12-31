import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import activitiesRouter from "./routes/sports_activities.js";
import configureCloudinary from "./config/cloudinary.js";
import * as dotenv from "dotenv";
import configurePassport from "./config/passport.js";
dotenv.config();

console.log("MOGO_URI", process.env.MONGO_URI);

const app = express();
const port = process.env.PORT || 5000;

const connectMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  configureCloudinary();
  configurePassport();
};

const connectDatabase = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log("Server is running on port..." + port);
  });
};
const defineRoutes = () => {
  app.use("/api/users", userRouter);
  app.use("/api/activities", activitiesRouter);
  app.use("*", (req, res) =>
    res.status(404).json({ error: "Endpoint not found." })
  );
};

connectMiddlewares();
defineRoutes();
connectDatabase();
// app.get("/hello", (req, res) => {
//   res.send("Hello World!");
// });
