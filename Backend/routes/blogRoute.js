import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import { auth } from "../middleware/auth.js";

import {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  togglePublishBlog,
  addComment,
  getBlogComments,
  generateContent
} from "../controllers/blogController.js";

const router = express.Router();
const upload = multer({ storage });

router.post("/createBlog", auth, upload.single("image"), createBlog);

router.get("/getAllBlogs", getAllBlogs);

router.get("/comments/:blogId", getBlogComments);

router.post("/addComment", auth, addComment);

router.put("/togglePublish/:id", togglePublishBlog);

router.delete("/delete/:id", deleteBlogById);

router.post("/generate", generateContent);

// ALWAYS KEEP THIS LAST
router.get("/:blogId", getBlogById);

export default router;