import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate,Outlet } from 'react-router-dom'
import SideBar from '../../components/admin/SideBar';
import { useAppContext } from '../../context/appContext';
import toast from 'react-hot-toast';

const Layout = () => {
    const {navigate,setToken} = useAppContext()
    const logout = ()=>{
      navigate('/')
      setToken(null);
      toast.success("Log out successfully")
localStorage.removeItem("token");
delete axios.defaults.headers.common['Authorization']

    }
  return (
    <>
    <div className='flex items-center justify-between py-2 h-17.5  px-4 sm:px-12 border-b border-gray-200'>
           <h1 className='text-3xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-600 to-purple-500  shadow-xl shadow-indigo-600/10 border-1 border-dashed border-black/20 rounded-l-2xl  rounded-r-4xl  py-2 items-center text-center px-4' onClick={()=>{navigate('/')}}>Blogify</h1>


        {/* <img onClick={()=>navigate('/')} src={assets.logo} className='w-32 sm:w-40 cursor-pointer' alt="" /> */}
   <button onClick={logout} className='text-sm px-8 py-2 bg-black text-white rounded-full cursor-pointer'>Logout</button>
    </div>

    <div className="flex  h-[calc(100vh-70px)]">
      <SideBar/>
         <Outlet/>
        </div>
    </>
  )
}

export default Layout