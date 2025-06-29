import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const StudentRegister = () => {
  const [state, setState] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    address: "",
    mobileNumber: ""
  });

  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const upper = /[A-Z]/;
  const lower = /[a-z]/;
  const special = /[!#$%&?@ "]/;
  const number = /(?=.*\d)/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });

    if (name === "password") {
      let error = "";
      if (!upper.test(value)) error += "Must include uppercase. ";
      if (!lower.test(value)) error += "Must include lowercase. ";
      if (!special.test(value)) error += "Must include special char. ";
      if (!number.test(value)) error += "Must include a number. ";
      setPasswordError(error.trim());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/savestudent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result.msg);
      });

    setState({
      fname: "",
      lname: "",
      email: "",
      password: "",
      address: "",
      mobileNumber: ""
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="https://cdn.pixabay.com/video/2023/07/13/171365-845439625_tiny.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Optional overlay for better contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>

      {/* Registration Form */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4">
        <div className="p-10 w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-fuchsia-100 mb-6">Student Register</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 text-white">
            <input name='fname' value={state.fname} onChange={handleChange} className='p-3 border border-white bg-transparent rounded-xl text-lg placeholder-white focus:outline-none focus:ring-2 focus:ring-white' type="text" placeholder='First Name' required />
            <input name='lname' value={state.lname} onChange={handleChange} className='p-3 border border-white bg-transparent rounded-xl text-lg placeholder-white focus:outline-none focus:ring-2 focus:ring-white' type="text" placeholder='Last Name' required />
            <input name='email' value={state.email} onChange={handleChange} className='p-3 border border-white bg-transparent rounded-xl text-lg placeholder-white focus:outline-none focus:ring-2 focus:ring-white' type="email" placeholder='Email' required />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                value={state.password}
                onChange={handleChange}
                className='p-3 w-full border border-white bg-transparent rounded-xl text-lg placeholder-white focus:outline-none focus:ring-2 focus:ring-white'
                placeholder='Password'
                required
              />
              <span
                className="absolute top-3 right-4 cursor-pointer text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordError && <p className="text-sm text-yellow-300">{passwordError}</p>}

            <input name='address' value={state.address} onChange={handleChange} className='p-3 border border-white bg-transparent rounded-xl text-lg placeholder-white focus:outline-none focus:ring-2 focus:ring-white' type="text" placeholder='Address' required />
            <input name='mobileNumber' value={state.mobileNumber} onChange={handleChange} className='p-3 border border-white bg-transparent rounded-xl text-lg placeholder-white focus:outline-none focus:ring-2 focus:ring-white' type='tel' placeholder='Mobile Number' required />

            <button className='bg-white text-black font-semibold text-xl py-3 rounded-xl hover:bg-gray-200 transition'>
              Submit
            </button>

            <NavLink
              to="/Pages/StudentLogin"
              className="block text-center border border-white text-white font-medium py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              LOGIN
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
