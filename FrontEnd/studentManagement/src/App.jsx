
import './App.css'
import Home from './Home'
import Navbar from './Navbar'
import AdminLogin from './Pages/AdminLogin'
import AdminRegister from './Pages/AdminRegister'
import StudentLogin from './Pages/StudentLogin'
import StudentRegister from './Pages/StudentRegister'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import StudentDetails from './Pages/StudentDetails'
import Courses from './Pages/Courses'
import StudentUpdate from './Student/StudentUpdate'
import MyCourses from './Pages/MyCourses'


function App() {
  return (
    <>
      <h1></h1>
      <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Navbar" element ={<Navbar/>}/>
                    <Route path="/Pages/AdminRegister" element ={<AdminRegister/>}/>
                    <Route path="/Pages/StudentRegister" element={<StudentRegister />} />
                    <Route path="/Pages/StudentLogin" element={<StudentLogin />} />
                    <Route path="/Pages/AdminLogin" element={<AdminLogin/>} />
                    <Route path='/StudentDetails' element={< StudentDetails/>} />
                    <Route path='/Pages/Courses' element={< Courses/>}></Route>
                    <Route path='/Student/StudentUpdate' element={ <StudentUpdate />}></Route>
                    <Route path='/Pages/MyCourses' element={< MyCourses/>}></Route>
                    
                  </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
