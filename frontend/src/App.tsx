import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Home.tsx/Layout";
import AllTasks from "./components/dashboard/AllTasks";
import CompletedTasks from "./components/dashboard/CompletedTasks";
import AddTask from "./components/dashboard/AddTask";
import TodayTasks from "./components/dashboard/TodayTasks";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/Signup";
import UpdateTask from "./components/dashboard/UpdateTask";



function App() {

  
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<TodayTasks />} /> {/* Default page */}
          <Route path="today" element={<TodayTasks />} />
          <Route path="all" element={<AllTasks />} />
          <Route path="completed" element={<CompletedTasks />} />
          <Route path="add" element={<AddTask />} />
          <Route path="update" element={<UpdateTask />} />
        </Route>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
