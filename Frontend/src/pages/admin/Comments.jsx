import React, { useEffect } from 'react'
import { comments_data } from '../../assets/assets';
import CommentTable from '../../components/admin/CommentTable.jsx';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/appContext.jsx';
const Comments = () => {
    const [comments, setComments] = React.useState([]);
    const[filter , setFilter]=React.useState('Not approved');

 const {axios,token} = useAppContext()
   const fetchComments = async () => {
       try {
              const res = await axios.get("/api/user/comments"
                , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
              );
     setComments(res.data.comments);


                                   
       } catch (error) {
         toast.error(error.message);
       }
     };
    useEffect(()=>{
        fetchComments();
    },[])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12  sm:pl-16 bg-blue-50/50'>

        <div className="flex justify-between items-center max-w-3xl">
            <h1>Comments</h1>
            <div className="flex gap-4">
                <button onClick={()=>setFilter("Approved")} className={`shadow-custom-sm border rounded-full  px-4 py-1 cursor-pointer
                    text-xs ${filter==='Approved' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Approved</button>
                <button onClick={()=>setFilter("Not approved")} className={`shadow-custom-sm border rounded-full  px-4 py-1 cursor-pointer
                    text-xs ${filter==='Not approved' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Not approved</button>
            </div>

        </div>
        <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
        <table className='w-full  text-sm text-gray-500'>
    <thead className='text-xs text-gray-600 text-left uppercase'>
   <tr> 
    <th scope='col' className='px-6 py-3 '>Blog Title & Comment</th>
    <th scope='col' className='px-6 py-3 max-sm:hidden '>Date</th>
    <th scope='col' className='px-6 py-3 '>Action</th>
    </tr>
    </thead>
    <tbody>
       {comments.filter((comment)=>{
        if(filter==='Approved')
  return comment.isApproved===true;
  return comment.isApproved===false;
        
       }).map((comment,index)=><CommentTable key={comment._id} comment={comment} fetchComments={fetchComments} index={index+1}/>)}
    </tbody>
        </table>
        </div>
    </div>
  )
}

export default Comments 