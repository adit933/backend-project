import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({path : "./env"})
connectDB()
.then(() => {

        app.on("error" , (error) => {
            console.log("error : " , error);
            process.exit(1);
        })
        app.listen(process.env.PORT || 8000 , () => {
            console.log(`App is listening on the port : ${process.env.PORT}`);
        })
})
.catch((error) => {

    console.log(`MONGO DB connection failed try again !!!!!`);
    
})

























































/*
//use IIFFEs while trying to connect database

import express from "express";

const app = express()

( async  () => {
    try
    {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error" , (error) => {
            console.log("Error : ", error);
            throw error
        })

        app.listen(process.env.PORT , () => {
            console.log(`App is listening on the port ${process.env.PORT}`);
        })
    }
    catch(error){
        console.log("error : ",error)
        throw error
    }
})()

*/