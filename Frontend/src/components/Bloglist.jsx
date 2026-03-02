import React, { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import BlogCard from "./BlogCard";
import { blogCategories } from "../assets/assets";
import { useAppContext } from "../context/appContext";

const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === "") return blogs;

    return blogs.filter(
      blog =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-black mb-8 text-center">
        Latest Blogs
      </h2>

      {/* Categories */}
      <LayoutGroup>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {blogCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="relative px-5 cursor-pointer py-2 rounded-full text-sm font-medium"
            >
              {selectedCategory === cat && (
                <motion.span
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-full bg-black"
                  transition={{ type: "spring", stiffness: 400, damping: 100 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  selectedCategory === cat ? "text-white" : "text-black"
                }`}
              >
                {cat}
              </span>
            </button>
          ))}
        </div>
      </LayoutGroup>

      {/* Blog Cards Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs()
          .filter(
            blog =>
              selectedCategory === "All"
                ? true
                : blog.category === selectedCategory
          )
          .map(blog => (
            <motion.div layout key={blog._id} className="flex justify-center">
              <div className="w-full max-w-sm">
                <BlogCard blog={blog} />
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default BlogList;