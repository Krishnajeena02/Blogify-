import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Loading from "../components/Loader.jsx";
import moment from "moment";
import { motion } from "framer-motion";
import { useAppContext } from "../context/appContext.jsx";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`/api/blog/${id}`);
      if (res.data?.blog) {
        setBlog(res.data.blog);
      } else {
        toast.error("Blog not found");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
           const res = await axios.get(`/api/blog/comments/${id}`);
      setComments(res.data.comments || []);
      fetchComments()
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("/api/blog/addComment", {
      blogId: id,
      author: name,
      comment: content,
    });

    toast.success(res.data.message);

    setComments((prev) => [res.data.comment, ...prev]);
    setName("");
    setContent("");
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!blog) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
      >
        Blog not found
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute inset-0 -z-10 opacity-50"
      />

      <Navbar />

      {/* HEADER */}
      <div className="text-center mt-20 text-gray-600">
        <p className="text-indigo-600 py-4 font-medium">
          Published on {moment(blog.createdAt).format("MMMM Do YYYY")}
        </p>

        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {blog.title}
        </h1>

        <h2 className="my-5 max-w-lg mx-auto truncate">{blog.subTitle}</h2>

        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-indigo-600/35 bg-black/5 font-medium text-indigo-600">
          Krishna Jeena
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-4 my-10">
        <img
          src={blog.image}
          alt=""
          className="w-full rounded-3xl mb-8 object-cover"
        />

        <div
          className="rich-text"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* COMMENTS */}
        <div className="mt-14">
          <p className="font-medium">Comments ({comments.length})</p>


          <div className="flex flex-col gap-4 mt-4">
            
            {comments.map((item, index) => (
              <div
                key={index}
                className="bg-black/5 border border-indigo-600/10 p-4 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-1">
                  <img src={assets.user_icon} alt="" className="w-6" />
                  <p className="font-medium">{item.author}</p>
                </div>

                <p className="text-sm ml-8">{item.comment}</p>

                <div className="text-xs mt-2 text-right">
                  {moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADD COMMENT */}
        <div className="mt-12">
          <p className="font-semibold mb-4">Add your comment</p>

          <form onSubmit={addComment} className="flex flex-col gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="p-2 border border-gray-300 rounded-lg outline-none"
              required
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Comment"
              className="p-2 border border-gray-300 rounded-lg outline-none h-32"
              required
            />

            <button className="bg-black text-white px-8 py-2 rounded hover:scale-105 transition w-fit">
              Submit
            </button>
          </form>
        </div>

        {/* SHARE */}
        <div className="my-20">
          <p className="font-semibold mb-4">
            Share this blog on social media
          </p>

          <div className="flex gap-4">
            <img src={assets.facebook_icon} className="w-10 cursor-pointer" />
            <img src={assets.twitter_icon} className="w-10 cursor-pointer" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
