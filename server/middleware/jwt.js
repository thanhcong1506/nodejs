import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import User from "../models/User.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.userId = payload.id;
    req.isAdmin = payload.isAdmin;
    next();
  });
};

// export const verifyAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.userId);
//     console.log(user);
//     if (!user.isAdmin) {
//       return res.status(401).send({
//         success: false,
//         message: "You are not admin!!",
//       });
//     } else {
//       next();
//     }
//   } catch (error) {
//     next(error);
//   }
// };
