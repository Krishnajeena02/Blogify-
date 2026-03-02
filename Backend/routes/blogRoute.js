import { createBlog, getAllBlogs, getBlogById,deleteBlogById,togglePublishBlog, addComment,  getBlogComments, generateContent} from "../controllers/blogController.js";

import express from "express";
import { storage } from "../config/cloudinary.js";
import { auth } from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage });

router.post("/createBlog",auth, upload.single("image"),  createBlog);
router.get("/getAllBlogs", getAllBlogs);
router.put("/togglePublish/:id", togglePublishBlog);

router.delete("/delete/:id",  deleteBlogById);

router.get("/:blogId",  getBlogById);
router.post("/addComment", addComment);
router.get("/comments/:blogId",getBlogComments)
router.post("/generate", generateContent);
// router.route("/")
//   .post(upload.single("image"), createBlog)
//   .get(getAllBlogs);
  
// router.route("/:id")
//   .get(getBlogById)
//   .delete(auth, deleteBlogById);

// router.post("/:id/togglePublish", auth, togglePublishBlog);




export default router;