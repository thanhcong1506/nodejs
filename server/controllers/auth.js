import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import createError from "../utils/createError.js";
import User from "../models/User.js";

import jwt from "jsonwebtoken";

//Register
export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }

    //check user
    const exisitingUser = await User.findOne({ email: req.body.email });
    //exisiting user
    if (exisitingUser) {
      return next(createError(404, "Already Register please login"));
    }

    //register user
    const hashedPassword = await hashPassword(password);
    const user = await new User({
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

//POST LOGIN
export const login = async (req, res, next) => {
  try {
    //check user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "Email is not registerd"));
    }

    const match = await comparePassword(req.body.password, user.password);
    if (!match) {
      return next(createError(400, "Wrong password or username"));
    }
    //token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const { password, isAdmin, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...info, isAdmin, token });
  } catch (error) {
    next(error);
  }
};

//LOG OUT

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
