import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.8 }}
      onClick={() => navigate(`/blogs/${blog._id}`)}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.03 }}
    >
      {/* Image container with fixed aspect ratio */}
      <div className="w-full aspect-video overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="text-xs text-white bg-black px-3 py-1 inline-block rounded-full font-semibold">
          {blog.category}
        </span>

        <h3 className="text-lg font-medium text-gray-900 mt-3">
          {blog.title}
        </h3>

        <p
          className="text-xs text-gray-600 mt-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: blog.description.slice(0, 100) }}
        />

        <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
          <span>{new Date(blog.createdAt).toDateString()}</span>
          <span>{blog.isPublished ? "Published" : "Draft"}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;