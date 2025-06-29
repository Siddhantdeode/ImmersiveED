// import axios from 'axios';
// import React, { useState } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useNavigate} from 'react-router-dom';

// const StudentLogin = () => {
//   let navigate = useNavigate()
//   const [state, setState] = useState({
//     email: '',
//     password: ''
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setState({  
//       ...state,
//       [e.target.name]: e.target.value
//     });
//   };





//   // let handleSubmit = async (e)=>{  
//   //   e.preventDefault();
//   //   try{
//   //   let x = await axios.post("http://localhost:8080/login")
//   //     console.log(x)
//   //     x.then((response)=>{
//   //     console.log(response);
//   //     return response.json();
//   //   }).then((result=>{console.log(result)
//   //     localStorage.clear();
//   //     localStorage.setItem("id",result.data.id);
//   //     localStorage.setItem("fname",result.data.fname);
//   //     localStorage.setItem("lname",result.data.lname);
//   //     localStorage.setItem("email",result.data.email);
//   //     localStorage.setItem("password",result.data.password);
//   //     localStorage.setItem("address",result.data.address);
//   //     localStorage.setItem("mobileNumber",result.data.mobileNumber);
//   //   }))
//   //   }
//   //   catch{
//   //     console.log("err");
//   //   }
//   // }



//     let handleSubmit = (e)=>{  
//     e.preventDefault();
//     let x = fetch("http://localhost:8080/login",{
//       method:"POST", 
//       headers:{
//         "Content-Type": "application/json" 
//     },
//     body:JSON.stringify(state) // used to convert the data in JSON object
//     })
//     console.log(x)
//     x.then((response)=>{
//       console.log(response);
//       return response.json();
//     }).then((result=>{console.log(result)
//       localStorage.clear();
//       localStorage.setItem("studentRole", "true");
//       localStorage.setItem("id",result.data.id);
//       localStorage.setItem("fname",result.data.fname);
//       localStorage.setItem("lname",result.data.lname);
//       localStorage.setItem("email",result.data.email);
//       localStorage.setItem("password",result.data.password);
//       localStorage.setItem("address",result.data.address);
//       localStorage.setItem("mobileNumber",result.data.mobileNumber);
//       alert(result.msg)
//       setState({
//         email:"",
//         password:""
//       })
//       navigate("/")
//     }))
// }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Student Login</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col p-4 w-[300px]">
//         <input
//           className="border border-gray-300 rounded text-xl p-2 mb-4"
//           name="email"
//           type="email"
//           placeholder="Enter email"
//           value={state.email}
//           onChange={handleChange}
//         />
//         <div className="relative mb-4">
//           <input
//             className="w-full border border-gray-300 rounded text-xl p-2"
//             name="password"
//             type={showPassword ? 'text' : 'password'}
//             placeholder="Enter password"
//             value={state.password}
//             onChange={handleChange}
//           />
//           <span
//             className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-800 text-white text-xl p-2 rounded hover:bg-blue-600"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default StudentLogin;




import axios from 'axios';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  let navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state)
    })
      .then((response) => response.json())
      .then((result => {
        localStorage.clear();
        localStorage.setItem("studentRole", "true");
        localStorage.setItem("id", result.data.id);
        localStorage.setItem("fname", result.data.fname);
        localStorage.setItem("lname", result.data.lname);
        localStorage.setItem("email", result.data.email);
        localStorage.setItem("password", result.data.password);
        localStorage.setItem("address", result.data.address);
        localStorage.setItem("mobileNumber", result.data.mobileNumber);
        alert(result.msg);
        setState({ email: "", password: "" });
        navigate("/");
      }));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        // src="https://cdn.pixabay.com/video/2017/12/05/13232-246463976_tiny.mp4"
        src="https://cdn.pixabay.com/video/2019/10/10/27726-365890980_tiny.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Optional overlay for better readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />

      {/* Form */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-3xl font-bold mb-6 text-white">Student Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-6 w-full max-w-sm  bg-transparent rounded-xl space-y-4 text-white"
        >
          <input
            className="border border-blue-600 bg-transparent   p-3 rounded text-lg focus:outline-none focus:ring-2 focus:ring-white"
            name="email"
            type="email"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <input
              className="w-full border border-blue-600 bg-transparent p-3 rounded text-lg focus:outline-none focus:ring-2 "
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <span
              className="absolute top-4 right-4 cursor-pointer text-purple-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            type="submit"
            className= " border-blue-600 bg-transparent text-fuchsia-500 font-bold font-semibold text-lg py-2 rounded hover:bg-gray-200 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;

