import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";

import { dbConnect } from "./utils/db.js";
dbConnect();

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/ping", (req, res) => {
  res.status(200).send("PONG");
});

app.use(bodyParser.json());
app.use(cors());

// routes
app.use("/auth", authRouter);
app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
