import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ListofCourses = () => {
    let [courses , setCourses] = useState([])
    let [state,setState] = useState({
        name:"",
        duration:"",
        cost:""
    })

    const fetchCourse = async ()=>{

    }
    useEffect(()=>{
        fetchCourse()
    })

    const handleSubmit = async ()=>{
        try{
            let x = await axios.post("http://localhost:8080/savecourse" , state)
            console.log(x) 
        }catch(err){
            console.log(err)
        }
    }


  return (
    <div>
      <div>
      <button className=' border p-[10px] rounded-2xl'> Create a Course</button>
      </div>

    </div>
  )
}

export default ListofCourses
