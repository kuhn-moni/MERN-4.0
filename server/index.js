import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.listen(port, () => {
  console.log("Server is running on port..." + port);
});

app.use("*", (req, res) =>
  res.status(404).json({ error: "Endpoint not found." })
);

app.use("/api/users", userRouter);

// app.get("/hello", (req, res) => {
//   res.send("Hello World!");
// });
