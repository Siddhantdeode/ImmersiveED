import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLogin = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setState({  
      ...state,
      [e.target.name]: e.target.value
    });
  };

  let handleSubmit = (e)=>{  
    e.preventDefault();
    let x = fetch("http://localhost:8080/admin/login",{
      method:"POST", 
      headers:{
        "Content-Type": "application/json" 
    },
    body:JSON.stringify(state) // used to convert the data in JSON object
    })
    console.log(x)
    x.then((response)=>{
      console.log(response);
      return response.json();
    }).then((result=>{console.log(result)
      localStorage.clear();
      localStorage.setItem("studentRole", "true");
      localStorage.setItem("id",result.data.id);
      localStorage.setItem("fname",result.data.fname);
      localStorage.setItem("lname",result.data.lname);
      localStorage.setItem("email",result.data.email);
      localStorage.setItem("password",result.data.password);
      localStorage.setItem("address",result.data.address);
      localStorage.setItem("mobileNumber",result.data.mobileNumber);
      alert(result.msg);

      setState({
        email: '',
        password: ''
      });
    }))
}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col p-4 w-[300px]">
        <input
          className="border border-gray-300 rounded text-xl p-2 mb-4"
          name="email"
          type="email"
          placeholder="Enter email"
          value={state.email}
          onChange={handleChange}
        />
        <div className="relative mb-4">
          <input
            className="w-full border border-gray-300 rounded text-xl p-2"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={state.password}
            onChange={handleChange}
          />
          <span
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button
          type="submit"
          className="bg-blue-800 text-white text-xl p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;

