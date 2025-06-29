import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentDetails = () => {
  const navigate = useNavigate();

  const lid = localStorage.getItem("id");
  const lfname = localStorage.getItem("fname");
  const llname = localStorage.getItem("lname");
  const lemail = localStorage.getItem("email");
  const lpassword = localStorage.getItem("password");
  const laddress = localStorage.getItem("address");
  const lmobileNumber = localStorage.getItem("mobileNumber");

  const [imageUrl, setImageUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const fetchImage = () => {
    fetch(`http://localhost:8080/getimage/${lid}`)
      .then((response) => response.blob())
      .then((blob) => {
        const imageObjectUrl = URL.createObjectURL(blob);
        setImageUrl(imageObjectUrl);
      })
      .catch((err) => console.error("Error fetching image:", err));
  };

  const uploadImage = () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    fetch(`http://localhost:8080/uploadimage/${lid}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.msg || "Image uploaded successfully");
        fetchImage();
      })
      .catch((err) => {
        console.error("Upload failed:", err);
        alert("Image upload failed");
      });
  };

  const handleDelete = () => {
    fetch(`http://localhost:8080/deletestudent/${lid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result.msg);
        localStorage.clear();
        navigate("/");
      });
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200">
        <h2 className="text-4xl font-semibold text-center text-blue-800 mb-4">
          Student Profile
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center space-y-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover ring-4 ring-blue-400 shadow-lg"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
              No Image
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            className="text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
          <button
            onClick={uploadImage}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow"
          >
            Upload Image
          </button>
        </div>

        {/* Student Details */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-300">
          <table className="min-w-full">
            <tbody>
              {[
                ["ID", lid],
                ["First Name", lfname],
                ["Last Name", llname],
                ["Email", lemail],
                ["Password", lpassword],
                ["Address", laddress],
                ["Mobile Number", lmobileNumber],
              ].map(([label, value], idx) => (
                <tr
                  key={label}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <th className="px-6 py-3 text-left font-medium text-gray-700 w-1/3">
                    {label}
                  </th>
                  <td className="px-6 py-3 text-gray-800">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-6 pt-4">
          <button
            onClick={() => navigate("/Student/StudentUpdate")}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 shadow"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300 shadow"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;