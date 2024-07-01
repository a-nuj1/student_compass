import express from "express";
import { config } from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";


config({
    path: "./config/config.env"
});

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



import course from "./routes/courseRoutes.js"
import user from "./routes/usersRoutes.js"

app.use('/api/v1', course);
app.use('/api/v1', user);

export default app;

app.use(errorHandler)