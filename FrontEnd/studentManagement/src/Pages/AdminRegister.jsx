import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminRegister = () => {
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
    fetch("http://localhost:8080/saveadmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result.msg);
        setState({
          fname: "",
          lname: "",
          email: "",
          password: "",
          address: "",
          mobileNumber: ""
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-red-500">
      <div className="backdrop-blur-md bg-white/30 border border-white/50 shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-950 drop-shadow-lg">Admin Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input name='fname' value={state.fname} onChange={handleChange} className='p-3 border rounded-lg text-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400' type="text" placeholder='First Name' required />
          <input name='lname' value={state.lname} onChange={handleChange} className='p-3 border rounded-lg text-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400' type="text" placeholder='Last Name' required />
          <input name='email' value={state.email} onChange={handleChange} className='p-3 border rounded-lg text-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400' type="email" placeholder='Email' required />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name='password'
              value={state.password}
              onChange={handleChange}
              className='p-3 w-full border rounded-lg text-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400'
              placeholder='Password'
              required
            />
            <span
              className="absolute top-3 right-4 cursor-pointer text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}

          <input name='address' value={state.address} onChange={handleChange} className='p-3 border rounded-lg text-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400' type="text" placeholder='Address' required />
          <input name='mobileNumber' value={state.mobileNumber} onChange={handleChange} className='p-3 border rounded-lg text-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400' type='tel' placeholder='Mobile Number' required />

          <button className='bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xl font-semibold py-3 rounded-lg hover:opacity-90 transition'>
            Submit
          </button>

          <NavLink
            to="/Pages/AdminLogin"
            className="block text-center bg-white/70 hover:bg-white/90 text-purple-700 font-medium py-3 rounded-lg transition border border-purple-200"
          >
            LOGIN
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
