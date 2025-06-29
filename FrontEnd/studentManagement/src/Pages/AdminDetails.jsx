import React from 'react'


const AdminDetails = () => {
  let aid = localStorage.getItem("id");
  let lfname = localStorage.getItem("fname");
  let llname = localStorage.getItem("lname");
  let lemail = localStorage.getItem("email");
  let lpassword = localStorage.getItem("password");
  let laddress = localStorage.getItem("address");
  let lmobileNumber = localStorage.getItem("mobileNumber");
  console.log(aid, lfname, llname, lemail, lpassword, laddress, lmobileNumber);
    return (
      <div>
        
        <h3 className='p-[12px] text-2xl'>Student Details</h3>
        
        <table className="p-[12px] border-2">
          <tbody>
            <tr className=' border-3'>
            <th>id</th>
            <th>{aid}</th>
            </tr>
            <tr>
            <th>fname</th>
            <th>{lfname}</th>
            </tr>
            <tr>
            <th>lname</th>
            <th>{llname}</th>
            </tr>
            <tr>
            <th>lemail</th>
            <th>{lemail}</th>
            </tr>
            <tr>
            <th>lpassword</th>
            <th>{lpassword}</th>
            </tr>
            <tr>
            <th>laddress</th>
            <th>{laddress}</th>
            </tr>
            <tr>
            <th>lmobileNumber</th>
            <th>{lmobileNumber}</th>
            </tr>
            
            
          </tbody>
        </table>
        
          <button onClick={()=>{}}>EDIT</button>
          <button onClick={()=>{}}>DELETE</button>
            
      </div>
    );
  };

export default AdminDetails
