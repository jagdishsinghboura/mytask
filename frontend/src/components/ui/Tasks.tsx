import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import axios from "axios";

interface Props {
  taskTitleName: string;
  type: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

const getTasks = async (taskType: string): Promise<Task[]> => {
  try {
    const token = localStorage.getItem("token");
    
    const res = await axios.get(`http:localhost:8080/api/v1/task/${taskType}`,{
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log(res.data);
    
    return res.data; 
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return []; 
  }
};

const Tasks = ({ taskTitleName, type }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]); 

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await getTasks(type);
      
      console.log("slkdfngdrsklgnml" ,res);
      setTasks(res.data);
    };

    fetchTasks();
    
  }, [type]); 

  return (
    <div className="w-full flex flex-col m-5">
      <h1 className="text-3xl font-bold text-gray-900">{taskTitleName || "Task"}</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} id={task.id} title={task.title} description={task.description} dueDate={task.dueDate} />
          ))
        ) : (
          <p className="text-gray-500 m-10">No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
