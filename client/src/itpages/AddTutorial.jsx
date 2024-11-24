import React from 'react'
import {useState} from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AddTutorial = () => {
    const location = useLocation()
    const CourseID = location.pathname.split("/")[3]
    const [tutorial, setTutorials] = useState({
        TutorialNo: "",  
        CourseID: CourseID,
        semester_name: "",
        TA_name: "",
        Enrollment_Limit: null,
        Enrollment_Current_Number: null,
        Building_Name: "",
        Room_Location: "",
        Days: "",
        Start_time: null,
        End_time: null
    });

    const navigate = useNavigate()
    console.log("Tutorial object:", tutorial);

    const handleChange = (e) =>{
        setTutorials(prev=>({...prev, [e.target.name]:e.target.value}))
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
          await axios.post(`http://localhost:8800/tutorial/${CourseID}`, tutorial);
          console.log("Tutorial added successfully");
          navigate(`/itpages/tutorial/${CourseID}`); 
          console.log(`Navigating to /tutorial/${CourseID}`);
        } catch (err) {
          console.log(err);
        }
    };

    return (
        <div className='form'>
            <h1>Add Tutorial</h1>
            <input type="text" placeholder="tutorial no" onChange={handleChange} name="TutorialNo" /> 
            <input type="text" placeholder="semester name" onChange={handleChange} name="semester_name" /> 
            <input type="text" placeholder="TA name" onChange={handleChange} name="TA_name" />
            <input type="number" placeholder="enrollment limit" onChange={handleChange} name="Enrollment_Limit" />
            <input type="number" placeholder="enrollment current number" onChange={handleChange} name="Enrollment_Current_Number" />
            <input type="text" placeholder="building name" onChange={handleChange} name="Building_Name" />
            <input type="text" placeholder="room location" onChange={handleChange} name="Room_Location" />
            <input type="text" placeholder="days" onChange={handleChange} name="Days" />
            <input type="time" placeholder="start time" onChange={handleChange} name="Start_time" />
            <input type="time" placeholder="end time" onChange={handleChange} name="End_time" />
            <button onClick={handleClick}>Add</button>
        </div>
    );
};

export default AddTutorial