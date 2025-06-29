import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const MyCourses = () => {
  const id = localStorage.getItem("id");
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();
useEffect(() => {
  const role = localStorage.getItem("studentRole");
  if (!role) {
    alert("You must be logged in as a student to view this page.");
    navigate("/");
  }
}, []);

  // Fetch student's enrolled courses
  const fetchCourses = async () => {
    try {
      const res = await fetch(`http://localhost:8080/findstudentcourses/${id}`);
      const result = await res.json();
      setCourses(result.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Remove a course
  const deleteCourse = async (cid) => {
    try {
      const res = await fetch(`http://localhost:8080/removecourse/${id}/${cid}`, {
        method: "POST",
      });
      const result = await res.json();
      alert(result.msg || "Course removed successfully");
      setCourses(courses.filter(course => course.cid !== cid));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="https://cdn.pixabay.com/video/2020/04/18/36503-427607440_tiny.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen">
        {/* Navbar */}
        <div className='flex justify-between items-center px-8 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'>
          <NavLink to="/" className="text-3xl font-bold">StudentCourses</NavLink>
          <h1 className="text-2xl font-semibold">My Courses</h1>
        </div>

        {/* Course List */}
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.length === 0 ? (
            <p className="text-white col-span-full text-center">No courses enrolled yet.</p>
          ) : (
            courses.map(({ cid, name, cost, duration }) => (
              <div
                key={cid}
                className="bg-white bg-opacity-90 rounded-2xl shadow-md hover:shadow-2xl p-6 transition-shadow duration-300 flex flex-col justify-between"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
                <p className="text-gray-600 mb-1">Cost: ₹{cost}</p>
                <p className="text-gray-600 mb-4">Duration: {duration} months</p>
                <button
                  onClick={() => deleteCourse(cid)}
                  className="mt-auto px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition duration-300"
                >
                  Remove Course
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;