import React, { useEffect, useRef } from 'react'
import {useState} from 'react'
import { assets } from '../../assets/assets';
import quill from 'quill';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/appContext';
import {parse }from 'marked'
const AddBlog = () => {
    const editorRef = useRef(null);
    const quillRef = useRef(null);
  
    const [image,setImage]=useState(null);
    const [title,setTitle]=useState('');
    const [subtitle,setSubtitle]=useState('');
    const [category,setCategory]=useState('Startup');
    const [isPublished,setIsPublished]=useState(true);
   const [loading , setLoading] = useState(false);


const {axios,token} = useAppContext()

const genrateWithAI= async()=>{
      const description = quillRef.current.root.innerHTML;
      if(!title || !description) return toast.error('please enter a title ');


      try{
        setLoading(true);
        const res = await axios.post('/api/blog/generate', {prompt:description})
         if(res.data.response){
          quillRef.current.root.innerHTML = parse(res.data.response)
         }
         else{
          toast.error(res.message)
         }

      }catch(error){
          toast.error(error.message)

      }
      finally{
        setLoading(false)
      }
    }
   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subtitle);
    formData.append("description", quillRef.current.root.innerHTML);
    formData.append("category", category);
    formData.append("isPublished", isPublished);
    formData.append("image", image); // 👈 THIS IS IMPORTANT

    const res = await axios.post(
      "/api/blog/createBlog",
      formData,
      {
        headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
      }
    );

    toast.success(res.data.message);

    setTitle("");
    setSubtitle("");
    setImage(null);
    setCategory("Startup");
        quillRef.current.root.innerHTML='';

  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

    useEffect(()=>{
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new quill(editorRef.current, {
              theme: 'snow',
            })
        }
    },[])
  return (

    <form  onSubmit={handleSubmit}
    className='flex-1 bg-blue-50/50 text-gray-600
    h-full overflow-scroll '
    >
        <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">

<p className='font-medium '>Upload Image</p>
<label htmlFor='image'>
    <img src={!image  ?assets.upload_area:URL.createObjectURL(image)} className='mt-2 h-15 roumded cursor-pointer' alt="" />
    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />

</label>
<p className='mt-4 font-medium'>Blog Title</p>
<input type="text" placeholder='type here ' required className='w-full max-w-lg
mt-2 p-2 border border-gray-300 outline-none rounded' value={title} onChange={(e)=>setTitle(e.target.value)} />
<p className='mt-4 font-medium'>Blog Subtitle</p>
<input type="text" placeholder='type here ' required className='w-full max-w-lg
mt-2 p-2 border border-gray-300 outline-none rounded' value={subtitle} onChange={(e)=>setSubtitle(e.target.value)} />

<p className='mt-4 font-medium'>Blog Description</p>
<div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative  '>
    <div ref={editorRef}></div>
    {loading &&(
      <div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'>
        <div className='w-8 h-8 rounded-full border-2 border-t-black animate-spin'></div>
        </div>
    )}
    <button disabled={loading} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70
    px-4 py-1.5 rounded hover:underline hover:bg-black/90 transition-all cursor-pointer' type='button'      onClick={genrateWithAI}>Generate with AI</button>
 
</div>
<p className='mt-4 font-medium'>Category</p>
<select  value={category} onChange={(e)=>setCategory(e.target.value)} className='mt-2 px-3 py-2 border text-gray-600 border-gray-300 outline-none rounded'>
    <option value="">Select Category</option>
    <option value="Startup">Startup</option>
    <option value="Technology">Technology</option>
    <option value="Business">Business</option>
    <option value="Entertainment">Entertainment</option>
    <option value="Health">Health</option>
    <option value="Education">Education</option>
    <option value="Culture">Culture</option>
</select>
<div>
    <p className='mt-4'>Publish Now  </p>
    <input type="checkbox" className='scale-125 cursor-pointer' checked={isPublished} onChange={(e)=>setIsPublished(e.target.checked)} />
</div>
<button type='submit' className='mt-8 w-40 h-10  py-2 bg-black text-white rounded hover:bg-indigo-700 cursor-pointer text-sm transition-colors'>Add Blog</button>
        </div>
 
    </form>
    
  )
}

export default AddBlog