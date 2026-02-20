import React, { useEffect } from 'react'
import { blog_data } from '../../assets/assets'
import Blogtable from '../../components/admin/Blogtable.jsx'
import { useAppContext } from '../../context/appContext.jsx'
import toast from 'react-hot-toast'
const ListBlog = () => {
    const[blogs,setBlogs]=React.useState([])
   const {axios} = useAppContext();
   
  const fetchBlogs = async () => {
  try {
    const res = await axios.get(`/api/user/blogs`);
    setBlogs(res.data.blogs); 
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch blogs");
  }
};


    useEffect(()=>{
        fetchBlogs();
    },[])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1>All blogs</h1>

         <div className="relative mt-4 h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
  <table className='w-full  text-sm text-gray-500'>
    <thead className='text-xs text-gray-600 text-left uppercase'>
   <tr>
    <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
    <th scope='col' className='px-2 py-4'>Blog Title</th>
    <th scope='col' className='px-2 py-4  max-sm:hidden '>Date</th>
    <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
    <th scope='col' className='px-2 py-4'>Action</th>
   </tr>
    </thead>
    <tbody>
   {blogs.map((blog,index)=>{
   return <Blogtable key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index+1}/>
    })}
    </tbody>
  </table>
            </div>
        </div>
  )
}

export default ListBlog