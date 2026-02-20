import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";
const CommentTable = ({ comment, fetchComments }) => {
  const { _id, blogId, createdAt, author, comment: text, isApproved } = comment;
  const date = new Date(createdAt);

  const{axios} = useAppContext()

  const approvedComment = async()=>{
    
    try{
    
                 const res = await axios.post('/api/user/approvecomment',{id:_id} );
                if(res.data){
                    toast.success(res.data.message)
                    await fetchComments();
                }
            
    
            }catch(error){
                toast.error(error.message)
    
            }

  }
  const deleteComment = async()=>{
    
    try{
      const confirm = window.confirm('are you sure you want to deleete this comment')
      if(!confirm) return;
    
                 const res = await axios.post('/api/user/deleteComment',{id:_id} );
                if(res.data){
                    toast.success(res.data.message)
                    await fetchComments();
                }
            
    
            }catch(error){
                toast.error(error.message)
    
            }

  }
  return (
    <tr className="border-b border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b>:{" "}
        {blogId?.title || "Deleted Blog"}
        <br />
        <b className="font-medium text-gray-600">Name</b>: {author}
        <br />
        <b className="font-medium text-gray-600">Content</b>: {text}
      </td>

      <td className="px-6 py-4 max-sm:hidden">
        {date.toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <div className="flex gap-4 items-center">
          {!isApproved ? (
            <img
            onClick={approvedComment}
              src={assets.tick_icon}
              alt="approve"
              className="w-6 cursor-pointer hover:scale-110 transition-all"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}

          <img 
          onClick={deleteComment}
            src={assets.bin_icon}
            alt="delete"
            className="w-6 cursor-pointer hover:scale-110 transition-all"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTable;
