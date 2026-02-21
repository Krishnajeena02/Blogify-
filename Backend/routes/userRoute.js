
import express from "express";
import { Register,Login, getAllComments, getAllBlogsAdmin, deleteCommentById, approveCommentById, getDashboard } from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
router.post("/register", Register);
router.post("/login", Login);
router.get("/comments", getAllComments);
router.get("/blogs",auth, getAllBlogsAdmin);
router.post("/deleteComment", deleteCommentById);
router.post("/approvecomment",auth, approveCommentById);
router.post("/dashboard",auth, getDashboard);

export default router;
           