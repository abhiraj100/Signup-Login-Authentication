import express from "express";
import {
  loginValidation,
  signupValidation,
} from "../middlewares/auth.validation.js";
import { login, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

export default router;
