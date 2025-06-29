import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course;

  const handlePayment = () => {
    // Simulate payment process
    setTimeout(() => {
      alert("Payment Successful!");
      // Optionally send POST to backend or update DB here
      navigate("/mycourses"); // or wherever appropriate
    }, 1000);
  };

  if (!course) {
    return <div className="text-center mt-20 text-red-500">Invalid Access. No course found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-purple-100 to-pink-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Purchase</h2>
        <p className="text-lg text-gray-700 mb-2">Course: {course.name}</p>
        <p className="text-lg text-gray-700 mb-2">Cost: ₹{course.cost}</p>
        <p className="text-lg text-gray-700 mb-4">Duration: {course.duration} months</p>

        <button
          onClick={handlePayment}
          className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
