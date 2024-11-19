import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'เตเต้',
    lastName: 'เตเต้',
  });

  // ฟังก์ชันสำหรับสลับสถานะ
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // ฟังก์ชันสำหรับอัปเดตข้อมูล
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-3/4 lg:w-1/2 bg-white shadow-lg rounded-lg p-8">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          {/* Profile Picture and Info */}
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{formData.firstName}</h2>
              <p className="text-gray-500">tete@gmail.com</p>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={toggleEdit}
              className="w-40 p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>

            {/* ปุ่ม "Change Password" จะแสดงเฉพาะเมื่อไม่อยู่ในโหมดแก้ไข */}
            {!isEditing && (
              <button className="w-40 p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
                Change Password
              </button>
            )}

            {/* ปุ่ม "Address" จะแสดงเฉพาะเมื่อไม่อยู่ในโหมดแก้ไข */}
            {!isEditing && (
              <Link to="/address">
                <button className="w-40 p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
                  Address
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-2 gap-8">
          {/* First Name */}
          <div>
            <h3 className="text-lg font-semibold">First Name</h3>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
              />
            ) : (
              <p className="text-gray-700 mt-2">{formData.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <h3 className="text-lg font-semibold">Last Name</h3>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
              />
            ) : (
              <p className="text-gray-700 mt-2">{formData.lastName}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
