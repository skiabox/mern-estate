import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//next is used when we want to use a middleware
export const signup = async (req, res, next) => {
  // console.log("REQ BODY ON SIGNUP", req.body);
  // get the request body parameters
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();

    res.status(201).json("User created successfully!");
  } catch (error) {
    // res.status(500).json(error.message);
    //pass the error to the error handler middleware
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    console.log(validUser);
    console.log(validUser._doc);
    if (!validUser) return next(errorHandler(404, "User not found!"));
    //if user emaul exists compare the password with tha hashed password of the database user object
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    //destructuring the user object to remove the password field
    const { password: pass, ...rest } = validUser;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
