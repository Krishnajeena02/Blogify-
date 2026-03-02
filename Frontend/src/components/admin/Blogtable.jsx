import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/appContext';
import toast from 'react-hot-toast';
const Blogtable = ({blog,fetchDashboardData,index }) => {

    const{title,createdAt} = blog;
    const blogdate = new Date(createdAt);
    const{axios} = useAppContext();


    const deleteblog = async()=>{
        const confirm = window.confirm("are sure you want to delete this blog")
        if(!confirm)return;
        try{
          const res= await axios.delete(`/api/blog/delete/${blog._id}`);

            if(res.data){
                toast.success("blog deleted successfully")
                await fetchDashboardData();
            }

        }catch(error){
            toast.error(error.message)

        }
    }

    const togglePublish  = async ()=>{
        try{

             const res = await axios.put(`/api/blog/togglePublish/${blog._id}`
    );
            if(res.data){
                toast.success(res.data.message)
                await fetchDashboardData();
            }
        

        }catch(error){
            toast.error(error.message)

        }
    }
  return (
    <tr className='border-y border-gray-300'>
        <th className='px-2 py-4 '>{index}</th>
        <td className='px-2 py-4'>{title}</td>
        <td className='px-2 py-4 max-sm:hidden'>{blogdate.toLocaleDateString()}</td>
        <td className='px-2 py-4 max-sm:hidden'>
            <p className={`${blog.isPublished ? "text-green-600 " : "text-orange-700"}`}>
                {blog.isPublished ? "Published" : "Unpublished"}
            </p>
        </td>
        <td className='px-2 py-4 flex text-xs gap-3'>
            <button onClick={togglePublish} className=" border-3 border-gray-300 px-2 py-1  mt-1 cursor-pointer text-gray-700  rounded"> {blog.isPublished ? "Unpublished" : "Published"}</button>
            <img onClick={deleteblog} className='w-8 hover:scale-105 transition-all cursor-pointer ' src={assets.cross_icon} alt="" />
        </td>
    </tr>
  )
}

export default Blogtable