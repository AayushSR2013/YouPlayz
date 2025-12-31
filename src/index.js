// require ("dotenv").config({path: "./env"});      // not good for Code Consistency
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./env"
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is Running at PORT : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB Connection Failed !! ", err);
})







// It is a one of the method and a good method but we have one more another good method then this to do the same thing
/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";

import express from "express";
const app = express();

;( async () => {        //standard practice to use semicolon it helps when no semicolon is written before that line
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()
*/