import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "User is already exist, you can login ",
      });
    }

    const pass = await bcrypt.hash(password, 10);
    const newUser = new userModel({name, email, password: pass})
//  newUser.password = await bcrypt.hash(password, 10)
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Signup Successfully",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(403).json({
        success: true,
        message: "Auth failed email or password is wrong",
      });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);

    if (!isPassEqual) {
      return res.status(403).json({
        success: false,
        message: "Auth failed email or password is wrong",
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
};

export { signup, login };
