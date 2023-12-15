import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({
    message: "User route works!"
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    //if there is a password in the request body, hash it
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    //set changes the data only if the data is changed
    //we also don't send a req.body because we might want to send a field that is not in the form, for example isAdmin
    //with new set to true we get the updated user as the response
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar
        }
      },
      { new: true }
    );

    //destructure the user object to remove the password field
    const { password: pass, ...rest } = updatedUser._doc;

    //send back the rest of the fields
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
