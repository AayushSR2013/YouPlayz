import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))       //this .use method is use to configure the middlewares mostly

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.route.js"

// route decleration
app.use("/api/v1/users", userRouter)

// This is example http://localhost:8000/api/v1/users/register which is from user.route.js file no need to add routes here again and again

export { app };