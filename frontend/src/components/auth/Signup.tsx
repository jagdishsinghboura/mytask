import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: object) => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/sign-up` , data);

      console.log(response);

      if(response){
        localStorage.setItem("token", response.data.token);
        console.log("you are sign up ");
        navigate("/")
      }
      } catch (error) {
        console.log(error);
        
      }
      
  };


  return (
    <div className="w-full flex max-auto flex-col justify-center items-center">
      <h1 className=" m-6 text-slate-500 text-2xl">Sign Up</h1>
      <div className="flex  flex-col w-1/3  justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 border rounded-lg   h-full "
        >
          <div className="mb-4 p-4">
            <label
              htmlFor={"username"}
              className="block  font-medium text-gray-700 text-lg "
            >
              {"Enter your username "}
            </label>
            <input
              id={"username"}
              type="username"
              {...register("username", {
                required: `username is required`,
              })}
              className="border p-2 w-full rounded "
            />
          </div>
          <div className="mb-4 p-4">
            <label
              htmlFor={"password"}
              className="block  font-medium text-gray-700 text-lg "
            >
              {"Enter your password "}
            </label>
            <input
              id={"password"}
              type="password"
              {...register("password", {
                required: `password is required`,
              })}
              className="border p-2 w-full rounded "
            />
          </div>
          <div className="mb-4 p-4">
            <label
              htmlFor={"firstName"}
              className="block  font-medium text-gray-700 text-lg "
            >
              {"Enter your firstName "}
            </label>
            <input
              id={"firstName"}
              type="firstName"
              {...register("firstName", {
                required: `firstName is required`,
              })}
              className="border p-2 w-full rounded "
            />
          </div>
          <div className="mb-4 p-4">
            <label
              htmlFor={"lastName"}
              className="block  font-medium text-gray-700 text-lg "
            >
              {"Enter your lastName "}
            </label>
            <input
              id={"lastName"}
              type="lastName"
              {...register("lastName", {
                required: `lastName is required`,
              })}
              className="border p-2 w-full rounded "
            />
          </div>

          <button
            type="submit"
            className="bg-blue-300 text-white p-2 rounded w-full"
          >
            Submit
          </button>
        </form>
        <p className="w-full text-center">Aready have an account? <Link to={"/sing-in"}>Sign-in</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
