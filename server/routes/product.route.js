import express from "express";
import {ensureAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  console.log("---- logged in uses details ----", req.user);

  res.status(200).json([
    {
      name: "mobile",
      price: 10000,
    },
    {
      name: "laptop",
      price: 100000,
    },
  ]);
});

export default router;
