import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  //console.log(req.body);
  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    name === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "Please provide all the required fields"));
  }
  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword });
  try {
    await newUser.save();
    res.json("User created successfully");
  } catch (error) {
    next(error);
  }
};
