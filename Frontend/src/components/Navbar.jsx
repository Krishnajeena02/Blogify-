import React from 'react'
import {assets} from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext.jsx'


const Navbar = () => {
    const {navigate,token} = useAppContext()
  return (
    <div className='flex cursor-pointer justify-between items-center py-5 mx-5 sm:mx-20 lg:mx-32'>
       <h1 className=' sm:text-3xl text-xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-600 to-purple-500  shadow-xl shadow-indigo-600/10 border-1 border-dashed border-black/20 rounded-l-2xl  rounded-r-4xl  py-2 items-center text-center px-4' onClick={()=>{navigate('/')}}>Blogify</h1>
     <button onClick={()=>{navigate('/admin')}} className='flex items-center rounded-full px-5 sm:px-10 py-2    cursor-pointer text-white bg-(--primary-color) gap-2 '> 
      {token?'Dashboard' :'Login'}
   <img src={assets.arrow} className='w-3' alt="arrow" />

     </button>
    </div>
      
  )
}

export default Navbar