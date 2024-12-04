import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Address = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    country: 'Thailand',
    address: '123 Moo 4, Sukhumvit Road, Bangkok',
    city: 'Bangkok',
    zip: '10110',
    phone: '+66 123 456 789',
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
              <h2 className="text-xl font-semibold">เตเต้</h2>
              <p className="text-gray-500">tete@gmail.com</p>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={toggleEdit}
              className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>

            {/* ปุ่ม Profile จะโผล่เฉพาะเมื่อไม่อยู่ในโหมดแก้ไข */}
            {!isEditing && (
              <Link to="/userprofile">
                <button className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
                  Profile
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Address Display Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Country/Region</h3>
            {isEditing ? (
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
              />
            ) : (
              <p className="text-gray-700 mt-2">{formData.country}</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold">Address</h3>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
              />
            ) : (
              <p className="text-gray-700 mt-2">{formData.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">City</h3>
              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              ) : (
                <p className="text-gray-700 mt-2">{formData.city}</p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">ZIP Code</h3>
              {isEditing ? (
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              ) : (
                <p className="text-gray-700 mt-2">{formData.zip}</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Phone</h3>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
              />
            ) : (
              <p className="text-gray-700 mt-2">{formData.phone}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
