import express from "express";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();

import mongoose from "mongoose";
import userRouter from "./AllRoutes/Auth.router.js";
import crudRouter from "./AllRoutes/CRUD.router.js";

mongoose.connect(process.env.Db_Url)
    .then(()=>{
        console.log("Successfully connected to the database")
    })
    .catch((error)=>{
        console.log(error)
    })

const app=express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).json("This is landing page of this application")
})

app.use("/user",userRouter) 
app.use("/student",crudRouter)


app.listen(process.env.PORT,()=>{
    console.log(`server started at ${process.env.Base_URL}:${process.env.PORT}`)
})