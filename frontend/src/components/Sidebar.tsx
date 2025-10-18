import { IoMdAdd } from "react-icons/io";
import { MdTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { RiTaskLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../utils/redux/store";
import { useSelector } from "react-redux";
import { MdPendingActions } from "react-icons/md";
import { MdOutlineExitToApp } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";

const adminSideBarLinks = [
   {
    route: "/trackProgress",
    text: "Track",
    icon: <FaChartPie />
  },
  {
    route: "/all",
    text: " Todos",
    icon: <RiTaskLine />
  },
  {
    route: "/today",
    text: "Today's",
    icon: <FaTasks />
  },
  {
    route: "/completed",
    text: "completed ",
    icon: <MdTask />
  },
  {
    route: "/add",
    text: "Add",
    icon: <IoMdAdd />
  },
  {
    route: "/pending",
    text: "Pending ",
    icon: <MdPendingActions />
  },


];

function Sidebar() {

  const user = useSelector((state: RootState) => state.user)

  const navigate = useNavigate();
  let isSelected = true;

  const location = useLocation();

  const handleSignOut=()=>{
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    navigate("/sign-in")
  }



  const navigatePage = (path: string) => {
    navigate(`${path}`);
  };
  return (
    <div className=" sticky left-0 top-0  flex h-screen flex-col justify-evenly items-center bg-white px-5 pb-5 ">
      <div className="">
        <div className="text-xl flex items-center gap-4 ">
          <p className="font-bold">Menu</p>
          <p  className="font-serif p-1 m-1  tracking-wide font-medium underline cursor-pointer ">{user.username} </p>
        </div>
      </div>

      <div>
        <div className="  m-2  flex flex-col justify-evenly gap-8">
          {adminSideBarLinks.map((link) => {
            isSelected = (link.route == location.pathname)
            return (
              <button
                key={link.route}
                onClick={() => navigatePage(link.route)}
                className={`flex flex-row    w-full gap-6  rounded-lg  max-md:justify-center hover:scale-105 transform duration-300 ${isSelected && "scale-105 bg-slate-700 text-white  shadow-2xl "} `}
              >
                <div className={"m-3 flex flex-row  text-start  min-w-full  gap-4 items-center"}>
                  <div className=" text-xl pl-4 ">{link.icon}</div>
                  <p className={" text-xl whitespace-nowrap text-center font-sans font-medium"}>
                    {link.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="  items-center flex justify-center p-2" >
          <button onClick={handleSignOut} className="hover:scale-105  transform duration-300 flex items-center  bg-slate-400 p-2 min-w-44 rounded-lg  pl-4 justify-start gap-6">
          <h1 className="text-xl font-sans f">Sign-out</h1>
          <MdOutlineExitToApp className="text-2xl shadow-2xl " />
        </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
// 25388c 