import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Course = () => {
  const [courses, setCourse] = useState([]);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8800/course");
        setCourse(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/course/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Courses</h1>
      <div className="course">
        {courses.map((course) => (
          <div className="course" key={course.CourseID}>
            <h2>{course.Course_Name}</h2>
            <p>{course.Level}</p>
            <p>{course.Course_Description}</p>
            <p>{course.Credits}</p>
            <p>{course.Department_Name}</p>
            <p>{course.Concentration_Name}</p>
            <button className="update">
              <Link to={`/update/${course.CourseID}`}>Update</Link>
            </button>
            <button
              className="delete"
              onClick={() => handleDelete(course.CourseID)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add New Course</Link>
      </button>
    </div>
  );
};

export default Course;