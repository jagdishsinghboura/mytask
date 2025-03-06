import React, { useEffect } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
// import AddTask from '../dashboard/AddTask'
import { Outlet, useNavigate } from 'react-router-dom'



const Layout = () => {

  const navigate  =useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/sign-in", { replace: true }); // No browser history entry
      }
    }, [navigate]);

  return (
    <main className="flex min-h-screen w-full flex-row bg-white">
      <Sidebar/>
      <div className="flex flex-col w-full  bg-slate-200 ">
        <div className="flex w-full m-4  mb-8 mt-4">
        <Header/>
        </div>

        <div>
        <Outlet />
        </div>

       
      </div>
    </main>
  )
}

export default Layout;



 {/* <AddTask/> */}
        {/* <Tasks taskTitleName="All task" type="myalltasks"/>  */}
      {/* {/* </div> */}
      {/* <SignIn/> */}
      {/* <SignIn/> */}