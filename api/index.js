import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

//import user router with another name since it is exported as a default
import userRouter from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.log(err));

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
