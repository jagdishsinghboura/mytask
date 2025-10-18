import { Task } from "./Tasks";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoCloudDoneOutline } from "react-icons/io5";
import { IoCloudDone } from "react-icons/io5";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const TaskCard = ({id, title, description, dueDate,status}:Task) => {
  const navigate = useNavigate();

  const date = new Date(dueDate);


  const deleteTask =async (id:number)=>{
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/task/delete/${id}`,{
        headers: { Authorization: `Bearer ${token}` }
      });
      if(res.status===200){
        console.log("Task deleted successfully");
        alert("task delete sussefully")
        navigate("/all")
      }


    } catch (error) {
      console.log(error);
      
    }
  }
  const CompletedTasks =async (id:number)=>{
    try {
      const token = localStorage.getItem("token");
      
      
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/task/complete/${id}`,{},
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );
      if(res.status===200){
        console.log("Task Completed successfully");
        alert("task task sussefully")
        navigate("/all")
      }


    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    
    <div >
      <div className="max-w-sm  overflow-hidden shadow-lg cursor-pointer m-4 rounded-lg ">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 capitalize text-center w-full p-2 m-2 font-sans">{title}</div>
          <p className="text-gray-700 text-base font-serif p-2 m-2">
            {description}
          </p>
          <p className="p-2 m-2 font-serif ">
             Due Date: <span>{date.getDate()}-{date.getMonth()+1}-{date.getFullYear()} </span>
          </p>
        </div>
      
        <div className="flex flex-row justify-around">
          <button onClick={()=>deleteTask(id)} className={`  text-2xl m-2 p-2 ${status==="COMPLETED"?"hidden":" "} `}> {<MdDelete/>} </button>
          <Link to={`/update/?taskId=${id}`} className={`  text-2xl m-2 p-2 `}> {<FaRegEdit/>} </Link>
          <button onClick={()=>CompletedTasks(id)} className="  text-2xl m-2 p-2"> 
            {
              status=='COMPLETED'?<IoCloudDone/>:<IoCloudDoneOutline/>
            } 
            </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
