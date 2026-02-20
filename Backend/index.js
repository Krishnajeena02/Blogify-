import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import connectDb from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";
 
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // parses form data
   
 connectDb();

 app.get("/",(req,res)=>{
    res.send("route is working")
 })
 app.use("/api/user", userRoute);
 app.use("/api/blog", blogRoute);
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})  
