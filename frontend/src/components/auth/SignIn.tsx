import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async(data: object) => {
    console.log(data);
    
    const response = await axios.post(`http://localhost:8080/api/v1/user/sign-in` , data);

    console.log(response);

    if(response){
      localStorage.setItem("token", response.data.token);
      console.log("you are sign in ");
      navigate("/");
    }
    
  };

  return (
    <div className="w-full flex max-auto flex-col justify-center items-center">
      <h1 className=" m-6 text-slate-500 text-2xl">Sign In </h1>
      <div className="flex  flex-col w-1/3  justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 border rounded-lg   h-full "
        >
          <div className="mb-4 p-4" >
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
          <div className="mb-4 p-4" >
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

          <button
            type="submit"
            className="bg-blue-300 text-white p-2 rounded w-full"
          >
            Submit
          </button>
        </form>
        <p className="w-full text-center">You don't have an account? Signup</p>
      </div>
    </div>
  );
};

export default SignIn;
