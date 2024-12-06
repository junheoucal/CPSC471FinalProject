import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useAuth } from "../context/AuthContext";

const Course = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchAllCourse = async () => {
      try {
        const res = await axios.get("http://localhost:8800/course");
        setCourses(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCourse();
  }, []);

  const handleDelete = async (CourseID) => {
    try {
      await axios.delete("http://localhost:8800/course/" + CourseID);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1> Course List </h1>
      <div className="course">
        {courses.map((course) => (
          <div className="course" key={course.CourseID}>
            <h2>{course.CourseID}</h2>
            <h3>{course.Course_Name}</h3>
            <p>{course.Level}</p>
            <p>{course.Course_Description}</p>
            <p>{course.Credits}</p>
            <p>{course.Department_Name}</p>
            <p>{course.Concentration_Name}</p>
            <button
              className="delete"
              onClick={() => handleDelete(course.CourseID)}
            >
              Delete
            </button>
            <button className="update">
              <Link to={`/itpages/updatecourse/${course.CourseID}`}>
                Update
              </Link>
            </button>
            <button className="lecture">
              <Link to={`/itpages/lecture/${course.CourseID}`}>Lecture</Link>
            </button>
            <button className="tutorial">
              <Link to={`/itpages/Tutorial/${course.CourseID}`}>Tutorial</Link>
            </button>
            <button className="manageprerequisite">
              <Link to={`/itpages/manageprerequisite/${course.CourseID}`}>Manage Prerequisites</Link>
            </button>
            <button className="manageantirequisite">
              <Link to={`/itpages/manageantirequisite/${course.CourseID}`}>Manage Antirequisites</Link>
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/itpages/add">Add new Course</Link>
      </button>
    </div>
  );
};

export default Course;
