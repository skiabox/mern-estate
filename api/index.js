import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

//import user router with another name since it is exported as a default
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.log(err));

const app = express();

//allow json body to be sent on the request body, for requests sent to this server
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//middleware
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//define a middleware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});
