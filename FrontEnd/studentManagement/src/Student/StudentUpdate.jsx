import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const StudentUpdate = () => {
  const [state, setState] = useState({
    id: localStorage.getItem('id') || '',
    fname: localStorage.getItem('fname') || '',
    lname: localStorage.getItem('lname') || '',
    email: localStorage.getItem('email') || '',
    password: localStorage.getItem('password') || '',
    address: localStorage.getItem('address') || '',
    mobileNumber: localStorage.getItem('mobileNumber') || '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const upper = /[A-Z]/;
  const lower = /[a-z]/;
  const special = /[!#$%&?@ "]/;
  const number = /(?=.*\d)/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });

    if (name === 'password') {
      let error = '';
      if (!upper.test(value)) error += 'Must include uppercase. ';
      if (!lower.test(value)) error += 'Must include lowercase. ';
      if (!special.test(value)) error += 'Must include special char. ';
      if (!number.test(value)) error += 'Must include a number. ';
      setPasswordError(error.trim());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/updatestudent', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.msg);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">Update Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fname"
            value={state.fname}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            type="text"
            placeholder="Enter First Name"
            required
          />
          <input
            name="lname"
            value={state.lname}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            type="text"
            placeholder="Enter Last Name"
            required
          />
          <input
            name="email"
            value={state.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            type="email"
            placeholder="Enter Email"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={state.password}
              onChange={handleChange}
              className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
              placeholder="Enter Password"
              required
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
          <input
            name="address"
            value={state.address}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            type="text"
            placeholder="Enter Address"
            required
          />
          <input
            name="mobileNumber"
            value={state.mobileNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            type="number"
            placeholder="Enter Mobile No."
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold py-2 rounded-lg shadow-lg transition duration-200"
          >
            UPDATE
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentUpdate;
