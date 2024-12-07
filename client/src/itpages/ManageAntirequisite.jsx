import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../stylepages/ManageReq.css";

const AddAntirequisite = () => {
  const [courses, setCourses] = useState([]);
  const [antirequisites, setAntirequisites] = useState([]);
  const { CourseID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all courses
        const coursesRes = await axios.get("http://localhost:8800/course");
        const filteredCourses = coursesRes.data.filter(
          (course) => course.CourseID !== CourseID
        );
        setCourses(filteredCourses);

        // Fetch antirequisites
        const antireqRes = await axios.get(
          `http://localhost:8800/antirequisite/${CourseID}`
        );
        setAntirequisites(antireqRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [CourseID]);

  const handleAddAntirequisite = async (conflictingCourseID) => {
    try {
      await axios.post("http://localhost:8800/antirequisite", {
        CourseID: CourseID,
        Conflicting_CourseID: conflictingCourseID,
      });
      // Refresh antirequisites list
      const antireqRes = await axios.get(
        `http://localhost:8800/antirequisite/${CourseID}`
      );
      setAntirequisites(antireqRes.data);
      alert("Antirequisite added successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to add antirequisite");
    }
  };

  const handleRemoveAntirequisite = async (conflictingCourseID) => {
    try {
      await axios.delete(
        `http://localhost:8800/antirequisite/${CourseID}/${conflictingCourseID}`
      );
      // Refresh antirequisites list
      const antireqRes = await axios.get(
        `http://localhost:8800/antirequisite/${CourseID}`
      );
      setAntirequisites(antireqRes.data);
      alert("Antirequisite removed successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to remove antirequisite");
    }
  };

  return (
    <div className="ucalgary-container">
      <div className="header">
        <img
          src="/uofc-logo.png"
          alt="University of Calgary Logo"
          className="ucalgary-logo"
        />
        <button className="back-btn">
          <Link to="/itpages/Course">Back to Course List</Link>
        </button>
      </div>

      <div style={{ padding: "20px" }}>
        <h1>Antirequisites for Course {CourseID}</h1>

        {/* Current Antirequisites Section */}
        <div style={{ marginBottom: "40px" }}>
          <h2>Current Antirequisites</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {antirequisites.map((antireq) => (
              <div
                key={antireq.Conflicting_CourseID}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "4px",
                }}
              >
                <span>
                  {antireq.Conflicting_CourseID} - {antireq.Course_Name}
                </span>
                <button
                  onClick={() =>
                    handleRemoveAntirequisite(antireq.Conflicting_CourseID)
                  }
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            {antirequisites.length === 0 && <p>No antirequisites set</p>}
          </div>
        </div>

        {/* Available Courses Section */}
        <h2>Add New Antirequisites</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {courses.map((course) => (
            <div
              key={course.CourseID}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2 style={{ margin: "0 0 10px 0" }}>{course.CourseID}</h2>
                <h3 style={{ margin: "0 0 10px 0" }}>{course.Course_Name}</h3>
                <p style={{ margin: "5px 0" }}>Level: {course.Level}</p>
                <p style={{ margin: "5px 0" }}>
                  Description: {course.Course_Description}
                </p>
                <p style={{ margin: "5px 0" }}>Credits: {course.Credits}</p>
                <p style={{ margin: "5px 0" }}>
                  Department: {course.Department_Name}
                </p>
                <p style={{ margin: "5px 0" }}>
                  Concentration: {course.Concentration_Name}
                </p>
              </div>
              <button
                onClick={() => handleAddAntirequisite(course.CourseID)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Add as Antirequisite
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddAntirequisite;
