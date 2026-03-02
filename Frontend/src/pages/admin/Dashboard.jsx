import React, { useEffect } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import Blogtable from '../../components/admin/Blogtable';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/appContext';
const Dashboard = () => {
  const{axios} = useAppContext()
    const [dashboardData, setDashboardData] = React.useState({
          totalBlogs: 0,
  totalComments: 0,
  totalDrafts: 0,
  recentBlogs: []
    });
 const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "/api/user/dashboard",
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setDashboardData(res.data.dashboardData);
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to fetch dashboard data"
    );
  }
};



    useEffect(()=>{
        fetchDashboardData();
    },[]) 
  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">

        <div className="flex flex-wrap gap-5" >
          <div className="flex items-center gap-4 bg-white p-4 rounded  shadow cursor-pointer hover:scale-105 transition-all">
            <img src={assets.dashboard_icon_1} alt="" />
            <div>         
                <p className='text-xl font-semibold text-gray-600'>{dashboardData.totalBlogs}</p>
                <p className="text-gray-400 font-light">Blogs</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow cursor-pointer hover:scale-105 transition-all">
            <img src={assets.dashboard_icon_2} alt="" />
            <div>         
                <p className='text-xl font-semibold text-gray-600'>{dashboardData.totalComments}</p>
                <p className="text-gray-400 font-light"> Comments</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow cursor-pointer hover:scale-105 transition-all">
            <img src={assets.dashboard_icon_3} alt="" />
            <div>         
                <p className='text-xl font-semibold text-gray-600'>{dashboardData.totalDrafts}</p>
                <p className="text-gray-400 font-light">Drafts</p>
            </div>
          </div>
        </div>
         
        <div>
            <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
                <img src={assets.dashboard_icon_4} alt="" />
                <p>Latest Blogs</p>
            </div>
            <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
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
   {dashboardData.recentBlogs.map((blog,index)=>{
   return <Blogtable key={blog._id} blog={blog} fetchDashboardData={fetchDashboardData} index={index+1}/>
    })}
    </tbody>
  </table>
            </div>
        </div>
    </div>
  )
}

export default Dashboard                         