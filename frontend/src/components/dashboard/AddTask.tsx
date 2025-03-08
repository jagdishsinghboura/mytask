import axios from "axios";
import { useForm } from "react-hook-form";

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

const AddTask = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: Record<string, string>) => {
    try {
      console.log("Submitting Data:", data); 

      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const response = await axios.post(
        "${import.meta.env.VITE_API_URL}/api/v1/task/add",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Response Data:", response.data);
      if (response.status === 201) {
        alert("Task Added Successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex flex-col max-w-auto">
      <h1 className="text-xl">+ New Add Task In Your List</h1>
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
