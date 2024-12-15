import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../workouthistory/workouthistory.css'
import moment from "moment";
import { getworkoutApi, removeWorkoutApi } from "../../services/allApi";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";

const WorkoutHistory= () => {
  const [events, setEvents] = useState([]);
  const [workEvents,setWorkEvents]=useState(null)
  const [deleteStatus,setDeleteStatus]=useState()

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 
  
    const fetchWorkouts = async () => {
     
        const response = await getworkoutApi()
        const formattedEvents = response.data.map((workout) => ({
          id: workout.id,
          title: `${workout.exerciseType} - ${workout.duration} mins`,
          exercise:workout.exerciseType,
          Duration:workout.duration,
          start: new Date(workout.date),
          end: new Date(workout.date),
          calories: workout.caloriesBurned,
          category:workout.category
        }));
        setEvents(formattedEvents);
      
    };
    useEffect(() => {
    fetchWorkouts();
  }, [deleteStatus]);

  const handleDelete=async(id)=>{
    const result=await removeWorkoutApi(id)
    if(result.status>=200 && result.status<300){
      setDeleteStatus(result)
      handleClose(true)
    }
  }

 
  const localizer = momentLocalizer(moment);

  const handleClick=(event)=>{
        setWorkEvents(event)
        handleShow(true)
  }

  return (
    <div className="back ">
    <div className="calendar-container">
        <div className="d-flex justify-evenly">
      <h2 className="calendar-header">Workout Log History</h2>
     <Link to={'/workoutlog'}> <button className="btn btn-primary m-2">Back Home</button></Link>
     
      </div>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 490, margin: "20px auto", backgroundColor: "white" }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: "#340860",
            color: "white",
            borderRadius: "5px",
            padding: "5px",
          },
        })}


        onSelectEvent={handleClick}
        
        
        
      />
      
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header  closeButton>
          <Modal.Title>Workout Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {workEvents && (
      <div>
     
      <p className="fs-3 mt-3 text-center">
        <strong>Exercise Type : </strong>{workEvents.exercise}
      </p>
      <p className="fs-3 text-center">
        <strong>Duration : </strong>{workEvents.Duration} mins
      </p >
      <p className="fs-3 text-center">
        <strong>Calories Burned : </strong>{workEvents.calories} cal
      </p>
      <p className="fs-3 text-center">
        <strong>Category : </strong>{workEvents.category}
      </p>
    
      
    </div>
     )}   
     
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(id)=>handleDelete(workEvents?.id)}>
            Delete workout
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Back to calender
          </Button>
        </Modal.Footer>
      </Modal>

      
     
    </div>
    </div>
  );
};

export default WorkoutHistory;
