import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Home.tsx/Layout";
import AllTasks from "./components/dashboard/AllTasks";
import CompletedTasks from "./components/dashboard/CompletedTasks";
import AddTask from "./components/dashboard/AddTask";
import TodayTasks from "./components/dashboard/TodayTasks";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/Signup";
import UpdateTask from "./components/dashboard/UpdateTask";
import PendingTasks from "./components/dashboard/PendingTasks";
import TrackProgress from "./components/dashboard/TrackProgress";
import LoadingPage from "./utils/LoadingPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./utils/redux/userSlice";



function App() {


  const dispatch = useDispatch();

  useEffect(()=>{
    const user = localStorage.getItem("user");
    if(user){
      dispatch(setUser(JSON.parse(user)))
    }
    
  }, [])

 
  
  
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index path="all" element={<AllTasks />} /> 
          <Route path="all" element={<AllTasks />} />
          <Route path="today" element={<TodayTasks />} />
          <Route path="completed" element={<CompletedTasks />} />
          <Route path="add" element={<AddTask />} />
          <Route path="update" element={<UpdateTask />} />
          <Route path="pending" element={< PendingTasks/>} />
          <Route path="trackprogress" element={< TrackProgress/>} />
          <Route path="loading" element={< LoadingPage/>} />
        </Route>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
