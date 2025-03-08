import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../utils/redux/userSlice";

const SignIn = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async(data: object) => {
    console.log(data);
    
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/sign-in` , data);

    console.log(response);

    if(response){
      localStorage.setItem("token", response.data.token);

      dispatch(setUser(response.data.user));

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
        <p className="w-full text-center">You don't have an account? <Link to={"/sign-up"} className="text-base text-blue-500 hover:cursor-pointer ">sign-up</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
