import React, { useState } from "react";
import { addworkoutApi } from "../../services/allApi";
import '../workoutlog/workoutlog.css'
import { Link } from "react-router-dom";
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const WorkoutLog = () => {
  const [workout, setWorkout] = useState({
    exerciseType: "",
    duration: "",
    caloriesBurned: "",
    category: "",
    date: new Date(),
  });



  const handleSubmit = async (e) => {
  
      const result= await addworkoutApi( workout)
     if(result.status>=200 && result.status<300){
      toast.success("Workout logged successfully!")
      setWorkout(result);
     }
  };

  return (
    <>
    <div className="background">
    <form onSubmit={handleSubmit} className="shadow p-4 mt-4">
      <h1 className="text-center text-primary fw-bold">Log Workout</h1>
      <div className="">
        
      <label className="fs-4 text-primary">
        Exercise Type:
        <input
          type="text"
          name="exerciseType"
          className=" border-primary  form-control"
          value={workout.exerciseType}
          onChange={(e)=>setWorkout({...workout,exerciseType:e.target.value})}
          required
        />
      </label >
      
      
      <label className="fs-4 text-primary">
        Duration (mins):
        <input
          type="number"
          name="duration"
          className=" border-primary  form-control"
          value={workout.duration}
          onChange={(e)=>setWorkout({...workout,duration:e.target.value})}
          required
        />
      </label>
     
      <label className="fs-4 text-primary">
        Calories Burned:
        <input
          type="number" 
          name="caloriesBurned"
          className="border-primary  form-control"
          value={workout.caloriesBurned}
          onChange={(e)=>setWorkout({...workout,caloriesBurned:e.target.value})}
          required
        />
      </label>
     
      
      <label className="fs-4 text-primary">
      
        Category:
        <select
          name="category" 
          className=" form-control border-primary"
          value={workout.category}
          onChange={(e)=>setWorkout({...workout,category:e.target.value})}
          required
        >
          <option value="">Select</option>
          <option value="cardio">Cardio</option>
          <option value="strength">Strength</option>
          <option value="flexibility">Flexibility</option>
        </select>
      </label>
      
      
      <label className="fs-4 text-primary ">
        Date:
        <input
          type="date"
          name="date" 
          className="border-primary  form-control"
          value={workout.date}
          onChange={(e)=>setWorkout({...workout,date:e.target.value})}
        />
      </label>
     
      <div className=" justify-content-center d-flex gap-5">
      <button className="btn btn-primary mt-5" type="submit">Log Workout</button>
     <Link to={'/history'}> <button className="btn btn-primary mt-5" >Workout Log History</button></Link>
      </div>
      </div>
     
    </form>
    <ToastContainer position='top-center' theme="colored" autoClose={2000}/>
    </div>
   
    </>
  );
};

export default WorkoutLog;
