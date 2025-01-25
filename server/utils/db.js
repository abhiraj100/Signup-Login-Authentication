import mongoose from "mongoose";

const dbConnect = ()=>{
  mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB Connected Successfully...");
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed..", err);
  });
}

export {
    dbConnect
}
