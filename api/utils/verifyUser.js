import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

//The next() function is a function in the Express router that, when invoked, executes the next middleware in the middleware stack.
//If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function.

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  //if there is no token stored in cookies, the request is unauthorized
  //use the error middleware we have created
  if (!token) return next(errorHandler(401, "You are not authorized!"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden!"));
    req.user = user;
    next();
  });
};
