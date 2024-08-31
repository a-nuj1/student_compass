import app from "./app.js";
import { connectDB }from "./config/database.js";
import cloudniary from "cloudinary";

const PORT = process.env.PORT;

cloudniary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});