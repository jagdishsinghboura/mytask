import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import axios from "axios";
import LoadingPage from "../../utils/LoadingPage";


interface Props {
  taskTitleName: string;
  type: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string,
  dueDate: string;
  createdAt: Date,
  updatedAt: Date,
}

const getTasks = async (taskType: string): Promise<Task[]> => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/task/${taskType}`, {
      headers: { Authorization: `Bearer ${token}` }
    });


    return res.data.data;
  } catch (error:any) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

const Tasks = ({ taskTitleName, type }: Props) => {

  const [isLoading, setIsLoading] = useState(true);


  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
   async function fetchTasks(type:string){
     const todos = await  getTasks(type);
     setTasks(todos);
     setIsLoading(false);
    }
    fetchTasks(type)
  }, [type]);

  return isLoading ? <LoadingPage/>: (
    <div className="w-full flex flex-col m-5">
      <h1 className="text-3xl font-bold text-gray-900">{taskTitleName || "Task"}</h1>
      <div className="flex  gap-6 justify-start flex-wrap">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id} 
              id={task.id}
              status={task.status}
              title={task.title} 
              description={task.description} 
              dueDate={task.dueDate}
              createdAt={task.createdAt}
              updatedAt={task.updatedAt}
              />
          ))
        ) : (
          <p className="text-gray-500 m-10">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
