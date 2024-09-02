import app from "./app.js";
import { connectDB }from "./config/database.js";
import cloudniary from "cloudinary";
import Razorpay from "razorpay";
import nodeCron from "node-cron";
import { Stats } from "./models/Stats.js";

const PORT = process.env.PORT;

connectDB();

cloudniary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

nodeCron.schedule("0 0 0 1 * *", async () => {
  try {
    await Stats.create({});
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.send(`<h1> Site is Working...! Click<a href = ${process.env.FRONTEND_URL}>here</a> to Visit Frontend.</h1>`);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});