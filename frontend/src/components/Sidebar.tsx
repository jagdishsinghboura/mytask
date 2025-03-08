import { IoMdAdd } from "react-icons/io";
import { MdTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { RiTaskLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

const adminSideBarLinks = [
  {
    route: "/today",
    text: "Today Task",
    icon:<FaTasks/>
  },
  {
    route: "/all",
    text: "All tasks",
    icon:<RiTaskLine/>
  },
  {
    route: "/completed",
    text: "complete Task",
    icon:<MdTask/>
  },
  {
    route: "/add",
    text: "Add-Task",
    icon:<IoMdAdd/>
  },
  {
    route: "/pending",
    text: "Pending ",
    icon:<IoMdAdd/>
  },
  
];

function Sidebar() {
  // const location = useLocation()

  const navigate = useNavigate();
  let isSelected =false;

  const location = useLocation();
  console.log(location);
  


  const navigatePage = (path: string) => {
      navigate(`${path}`);
  };
  return (
    <div className=" sticky left-0 top-0 flex h-dvh flex-col justify-between bg-white px-5 pb-5 pt-10 ">
      <div>
        <h1>My Task</h1>
        <div className="mt-12 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            isSelected =link.route==location.pathname;
            return (
              <button
              key={link.route}
                onClick={() => navigatePage(link.route)}
                className={`flex flex-row   mt-3 w-full gap-2 rounded-lg  max-md:justify-center ${isSelected && "bg-[#25388c]"}`}
              >
                <div className={"m-3 flex flex-row gap-5  justify-center items-center"}>
                  <div className=" text-xl ">{link.icon}</div>
                  <p className={"text-black text-xl  b " }>
                    {link.text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
// 25388c 