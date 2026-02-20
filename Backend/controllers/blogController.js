import Blog from "../model/blogSchema.js";
import Comment from "../model/commentSchema.js";  
import User from "../model/userSchema.js"
import main from "../config/gemini.js";
export const createBlog = async (req, res) => {
  try {
    console.log("Logged user id:", req.user.id);
    const { title, subTitle, description, category, isPublished } = req.body;

   if(!title || !description || !category){
    return res.status(400).json({message:"All fields are required"})
   }  

  if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    const newBlog = await Blog.create({
      title,
      subTitle,
      description,
      category,
       image:req.file!=  undefined ? req.file.path: "",
               fileType:req.file!= undefined ? req.file.mimetype.split("/")[1]:"",

      isPublished: isPublished === "true" || isPublished === true,
      author:req.user.id
    });


    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
 


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllBlogs = async (req,res)=>{
  try{
 const blogs = await Blog.find({isPublished:true}).sort({createdAt: -1});
res.status(200).json({blogs});


  }
  catch(error){
    res.status(500).json({ message: error.message });

  }
}

export const getBlogById = async (req,res)=>{

  try{
    const {blogId}= req.params;
    const blog = await Blog.findById(blogId);
    if(!blog){
      return res.status(404).json({message:"blog not found"})
    }
    res.status(200).json({blog});
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
}

export const deleteBlogById = async (req,res)=>{
  try{
    const {id} = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    //delete comment of the deleted blog
    await Comment.deleteMany({blogId:id})
    if(!blog){
      return res.status(404).json({message:"blog not found"})
    }
    res.status(200).json({message:"blog deleted successfully"});
  }  
  catch(error){

    res.status(500).json({message:error.message});
  } 


}

export const togglePublishBlog = async (req,res)=>{
  try{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog){
      return res.status(404).json({message:"blog not found"})
    }   
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.status(200).json({message:"blog publish status toggled successfully", blog});
  } 
  catch(error){
    res.status(500).json({message:error.message});
  }
}

export const addComment = async (req, res) => {
  try {
    const { blogId, comment, author } = req.body;

    if (!blogId || !comment || !author) {
      return res.status(400).json({ message: "All fields are required" });
    }

  

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const newComment = await Comment.create({
      blogId,
      comment,
      author,
      isApproved: false,
    });

    // blog.comments.push(newComment._id);
    await blog.save();

    res.status(201).json({
      message: "Comment added successfully for approval",
      comment: newComment,
    });
  } catch (error) {
    console.error("ADD COMMENT ERROR:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.params;

  

    const comments = await Comment.find({
      blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({ comments });
  } catch (error) {
    console.error("GET COMMENTS ERROR:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const generateContent = async(req,res)=>{
           try{
            const {prompt} = req.body;
            const response = await main(prompt + 'generate a blog for this topic in detail')
            res.status(200).json({response})

            
           }
           catch(error){
            res.status(500).json({message:"internal server error"})
           }
}