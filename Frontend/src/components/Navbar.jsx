import React from 'react'
import {assets} from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext.jsx'


const Navbar = () => {
    const {navigate,token} = useAppContext()
  return (
    <div className='flex cursor-pointer justify-between items-center py-5 mx-5 sm:mx-20 lg:mx-32'>
       
       <h1 className='text-2xl font-bold bg-black rounded-l-2xl  rounded-r-4xl text-white py-2 items-center text-center px-4' onClick={()=>{navigate('/')}}>YourBlog</h1>
     <button onClick={()=>{navigate('/admin')}} className='flex items-center rounded-full px-10 py-2 cursor-pointer text-white bg-(--primary-color) gap-2 '> 
      {token?'Dashboard' :'Login'}
   <img src={assets.arrow} className='w-3' alt="arrow" />

     </button>
    </div>
      
  )
}

export default Navbar