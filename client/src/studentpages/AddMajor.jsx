import React from 'react'
import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";

const AddMajor = () => {    
    const { auth } = useAuth();
    const [addMajor, setAddMajors] = useState({
        StudentID: auth.UCID,
        Major: ""
    });

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setAddMajors(prev=>({...prev, [e.target.name]:e.target.value}))
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8800/studentpages/addmajor/${auth.UCID}`, addMajor);
            navigate("/studentpages/Major"); 
        } catch (err) {
          console.log(err);
        }
    };

    return (
        <div className='form'>
            <h1>Add Major</h1>
            <input type="text" placeholder="Major" onChange={handleChange} name="Major" /> 
            <button onClick={handleClick}>Add</button>
        </div>
    );
};

export default AddMajor