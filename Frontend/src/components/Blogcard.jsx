import React from "react";
 import { useNavigate } from "react-router-dom";
const BlogCard = ({ blog }) => {
    const Navigate = useNavigate();
  return (
    <div onClick={()=>{Navigate(`/blogs/${blog._id}`)}}
      className="bg-white w-full border border-gray-200 rounded-xl overflow-hidden
                 hover:shadow-lg  hover:scale-105 cursor-pointer transition-all "
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full aspect-video object-cover"
      />

      <div className="p-6">
        <span className="text-xs text-center text-white bg-black px-3 py-1 inline-block rounded-full font-semibold">
          {blog.category}
        </span>

        <h3 className="text-lg tracking-tighter  font-medium text-gray-900 mt-3">
          {blog.title}
        </h3>

        {/* Use subtitle instead of full HTML description */}
        <p className="text-xs text-gray-600 mt-4 line-clamp-3" dangerouslySetInnerHTML={
            {"__html":blog.description.slice(0, 80)}}
        >
            
          
        </p>

        <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
          <span>{new Date(blog.createdAt).toDateString()}</span>
          <span>{blog.isPublished ? "Published" : "Draft"}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
