import axios from "axios";
import  { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

const taskDetails = [
  {
    placeholder: "Enter your task title",
    name: "title",
    type: "text",
    label: "Task Title",
    required: true,
  },
  {
    placeholder: "Enter your task description",
    name: "description", 
    type: "text",
    label: "Task Description",
    required: true,
  },
  {
    placeholder: "Enter your task due date",
    name: "dueDate", 
    type: "date",
    label: "Task Due Date",
    required: true,
  },
];

const UpdateTask = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("taskId");
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: Record<string, string>) => {
    try {
      console.log("Submitting Data:", data); 

      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/api/v1/task/update/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );

      console.log("Response Data:", response.data);
      if (response.status === 200) {
        alert("Task Updated Successfully");
        navigate("/all")

      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    async function getData(taskId: string) {
      if (!taskId) return; 

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/api/v1/task/mytask/${taskId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          const fetchedData = response.data.data; 
          console.log("Fetched Task Data:", fetchedData);

          reset({
            title: fetchedData.title,
            description: fetchedData.description,
            dueDate: fetchedData.dueDate, 
          });
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    }

    console.log("Fetching task with ID:", id);
    if (id) getData(id);
  }, [id, reset]); 

  return (
    <div className="w-full flex flex-col max-w-auto">
      <h1 className="text-xl">Here You Can Update Your Task</h1>
      <div className="flex flex-row w-full justify-around">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 border rounded-lg w-3/5 h-full"
        >
          {taskDetails.map((task) => (
            <div className="mb-4 p-4" key={task.name}>
              <label
                htmlFor={task.name}
                className="block font-medium text-gray-700 text-lg"
              >
                {task.label}
              </label>
              <input
                id={task.name}
                type={task.type}
                {...register(task.name, {
                  required: `${task.label} is required`,
                })}
                className="border p-2 w-full rounded"
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-yellow-500 text-white p-2 rounded w-full"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
