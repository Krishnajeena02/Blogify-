import User from "../model/userSchema.js";
import Blog from "../model/blogSchema.js";
 import Comment from "../model/commentSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import  dotenv from "dotenv"
dotenv.config()

// REGISTER
const Register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "User not registered", error: error.message });
  }
};

// LOGIN
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(  
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "2day" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export { Register, Login };

       export const getAllBlogsAdmin = async (req,res)=>{  
         
         try{
    const userId = req.user.id;
 const blogs = await Blog.find({author:userId}).sort({createdAt:-1});
res.status(200).json({blogs});
  }
  catch(error){
    res.status(500).json({ message: error.message }); 
       } 
}   

export const getAllComments = async (req,res)=>{
  try{  
    const userId = req.user.id;

    const comments = await Comment.find({author:userId}).populate("blogId").sort({createdAt:-1});
    res.status(200).json({comments});
  }       
  catch(error){
    res.status(500).json({message:error.message});
  }
}

export const getDashboard = async (req,res)=>{    
  try{
    const userId = req.user.id;

    const recentBlogs = await Blog.find({ author: userId })
      .sort({ createdAt:-1 })
      .limit(5);

    const totalBlogs = await Blog.countDocuments({ author: userId });

    const totalDrafts = await Blog.countDocuments({
      author: userId,
      isPublished:false
    });

    const totalComments = await Comment.countDocuments({
      blogId: { $in: await Blog.find({ author: userId }).distinct('_id') }
    });

    const dashboardData = {
      recentBlogs,
      totalBlogs,
      totalDrafts,
      totalComments
    };

    res.status(200).json({
      message:"success",
      dashboardData
    });

  } catch(error){
    res.status(500).json({message:error.message});
  }
}

export const deleteCommentById = async(req,res)=>{
  try{
const {id} = req.body
await Comment.findByIdAndDelete(id)
    res.status(200).json({
      message: "Comment deleted successfully",
    });
  }
  catch(error){
    res.status({message:error.message})

  }
}


export const approveCommentById = async(req,res)=>{
  try{
const {id} = req.body
await Comment.findByIdAndUpdate(id,{isApproved:true})
res.status(200).json({message:"comment approved succesfully"})
  }
  catch(error){
    res.status({message:error.message})

  }
}