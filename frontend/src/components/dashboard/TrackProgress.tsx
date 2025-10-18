// import PieChart from './PieChart';

import { useEffect, useState } from "react";
import PieChart from "../../utils/PieChart";
import axios from "axios";
import LoadingPage from "../../utils/LoadingPage";

const TrackProgress = () => {
  const labels = ['In Progress', 'Completed', 'Pending'];
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{
      try {
        
         const token = localStorage.getItem("token");
        async function fetchProgress(){
          const res =await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/task/track`,{
             headers: { Authorization: `Bearer ${token}` }
          })
  
          if(!res){
             throw new Error("could not fetch track datat")
          }

          setData(Object.values(res.data.data));
          setIsLoading(false)
        }

        
  
        fetchProgress();
      } catch (error) {
          console.log("error while fetching track data", error);
      }
    },[])
  return isLoading ?<LoadingPage/>: (
    <div className="">
      <h2 className="text-2xl font-bold font-sans text-center m-4 p-2">Task Distribution</h2>
      <div className="w-full  flex justify-center items-center">
        <PieChart labels={labels} data={data} />
      </div>
    </div>
  );
};

export default TrackProgress;

