import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Courses = () => {
  let id = localStorage.getItem("id");
  let [courses, setCourses] = useState([]);
  const [addedCourses, setAddedCourses] = useState([]);

  const fetchCourse = async () => {
    try {
      let x = await axios.post("http://localhost:8080/allcourses");
      console.log(x);
      setCourses(x.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch already added courses for the student
  const fetchStudentCourses = async () => {
    try {
      const res = await fetch(`http://localhost:8080/findstudentcourses/${id}`);
      const result = await res.json();
      const enrolledCourseIds = result.data.map((course) => course.cid);
      setAddedCourses(enrolledCourseIds);
    } catch (error) {
      console.error("Error fetching student courses:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchStudentCourses();
  }, []);

  const addCourse = async (cid) => {
    if (!id) {
      alert("Please log-in before adding a course.");
      return;
    }

    if (addedCourses.includes(cid)) {
      alert("This course has already been added.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/addcourses/${id}/${cid}`, {
        method: "POST",
      });

      const result = await res.json();
      alert(result.msg);

      setAddedCourses((prev) => [...prev, cid]);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (


    
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="flex justify-between items-center h-[100px] px-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-3xl font-bold shadow-md">
        <NavLink to="/" className="text-3xl font-bold">
          StudentCourses
        </NavLink>
        <h1 className="text-2xl font-semibold">Available Courses</h1>
      </div>

      {/* Course Cards */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map(({ cid, name, cost, duration }) => (
          <div
            key={cid}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl p-6 transition-shadow duration-300 flex flex-col justify-between"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
            <p className="text-gray-600 mb-1">Cost: ₹{cost}</p>
            <p className="text-gray-600 mb-4">Duration: {duration} </p>
            <button
              onClick={() => addCourse(cid)}
              disabled={addedCourses.includes(cid)}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-indigo font-bold   px-4 py-2 rounded-full shadow-md"
            >
              {addedCourses.includes(cid) ? "Already Added" : "Add Course"}
            </button>
          </div>
        ))}
      </div>
      
    </div>
  );
};
export default Courses;



