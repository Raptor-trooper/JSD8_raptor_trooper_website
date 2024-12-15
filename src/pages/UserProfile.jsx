import { useContext, useEffect, useState,  } from "react";
import { ShopContext } from "../Context/ShopContext";
import Swal from "sweetalert2";
import Orders from "../components/Orders";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser, updateProfile } = useContext(ShopContext);
  const name = user.name;
  const email = user.email;
  const [firstName, setFirstName] = useState(user.delivery.firstName);
  const [lastName, setLastName] = useState(user.delivery.lastName);
  const [country, setCountry] = useState(user.delivery.country);
  const [address, setAddress] = useState(user.delivery.address);
  const [city, setCity] = useState(user.delivery.city);
  const [zip, setZip] = useState(user.delivery.zip);
  const [phone, setPhone] = useState(user.delivery.phone);

  useEffect(() => {
    if (user.delivery) {
      setFirstName(user.delivery.firstName);
      setLastName(user.delivery.lastName);
      setCountry(user.delivery.country);
      setAddress(user.delivery.address);
      setCity(user.delivery.city);
      setZip(user.delivery.zip);
      setPhone(user.delivery.phone);
    }
  }, [user.delivery]);

  // ฟังก์ชันสำหรับสลับสถานะแก้ไข
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({}); // เก็บ Error แต่ละช่อง

  const validateForm = () => {
    const newErrors = {};
    // ตรวจสอบ First Name
    if (!/^[A-Za-zก-๙\s]+$/.test(firstName) || firstName.length > 50) {
      newErrors.firstName =
        "First Name must contain only letters and spaces, max 50 characters.";
    }
  
    // ตรวจสอบ Last Name
    if (!/^[A-Za-zก-๙\s]+$/.test(lastName) || lastName.length > 50) {
      newErrors.lastName =
        "Last Name must contain only letters and spaces, max 50 characters.";
    }
  
    // ตรวจสอบ Country
    if (!/^[A-Za-zก-๙\s]+$/.test(country) || country.length > 50) {
      newErrors.country =
        "Country must contain only letters and spaces, max 50 characters.";
    }
  
    // ตรวจสอบ Address
    if (!/^[A-Za-zก-๙\d\s,./-]+$/.test(address) || address.length > 100) {
      newErrors.address =
        "Address can contain letters, numbers, and some symbols, max 100 characters.";
    }
  
    // ตรวจสอบ City
    if (!/^[A-Za-zก-๙\s]+$/.test(city) || city.length > 50) {
      newErrors.city =
        "City must contain only letters and spaces, max 50 characters.";
    }
  
    // ตรวจสอบ ZIP Code
    if (!/^\d{4,10}$/.test(zip)) {
      newErrors.zip = "ZIP Code must be 4-10 digits.";
    }
  
    // ตรวจสอบ Phone
    if (!/^\d{9,15}$/.test(phone)) {
      newErrors.phone = "Phone number must be 9-15 digits.";
    }
  
    setErrors(newErrors); // อัปเดต State Errors
  
    // หากมี Error ให้แสดง SweetAlert
    if (Object.keys(newErrors).length > 0) {
      Swal.fire({
        title: "Form Error",
        text: "Please correct the highlighted fields before saving.",
        icon: "error",
      });
      return false; // หยุดการทำงาน
    }
  
    return true; // คืนค่า true หากไม่มีข้อผิดพลาด
  };
  

  // update ข้อมูลไปหลังบ้านหลังกด save
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // เรียก Validate
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    try {
      await updateProfile();
      Swal.fire({
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        icon: "success",
      });
    }  finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  // ฟังก์ชันสำหรับอัปเดตข้อมูล
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      delivery: {
        ...prevUser.delivery,
        [name]: value,
      },
    }));
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      >
        <div className="my-10 w-3/4 p-8 space-y-8 bg-white rounded-lg shadow-lg lg:w-1/2">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="object-cover w-24 h-24 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold text-black">{name}</h2>
                <p className="text-gray-500">{email}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              {isEditing && (
                <button type="submit" disabled={loading} className="button">
                  {loading ? "Saving..." : "Save"}
                </button>
              )}
              {!isEditing && (
                <button onClick={toggleEdit} className="button">
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Profile Section */}
          <div className="grid grid-cols-2 gap-8">
            {/* Firstname*/}
            <div>
              <h3 className="text-lg font-semibold">First Name</h3>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className={`w-full p-2 mt-2 border rounded-none ${
                      errors.firstName
                        ? "border-red-500 "
                        : "border-gray-300"
                    }`}
                  />
                  {/* แสดงข้อความ Error*/}
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-2 text-gray-700">{firstName}</p>
              )}
            </div>
            {/* Last Name */}
            <div>
              <h3 className="text-lg font-semibold">Last Name</h3>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className={`w-full p-2 mt-2 border rounded-none ${
                      errors.lastName
                        ? "border-red-500 "
                        : "border-gray-300"
                    }`}
                  />
                  {/* แสดงข้อความ Error */}
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-2 text-gray-700">{lastName}</p>
              )}
            </div>
          </div>

         {/* Address Section */}
<div className="space-y-4">
  {/* Country/Region */}
  <div>
    <h3 className="text-lg font-semibold">Country/Region</h3>
    {isEditing ? (
      <>
        <input
          type="text"
          name="country"
          value={country}
          onChange={handleChange}
          placeholder="Enter your country"
          className={`w-full p-2 mt-2 border rounded ${
            errors.country ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.country && (
          <p className="mt-1 text-sm text-red-500">{errors.country}</p>
        )}
      </>
    ) : (
      <p className="mt-2 text-gray-700">{country}</p>
    )}
  </div>

  {/* Address */}
  <div>
    <h3 className="text-lg font-semibold">Address</h3>
    {isEditing ? (
      <>
        <input
          type="text"
          name="address"
          value={address}
          onChange={handleChange}
          placeholder="Enter your address"
          className={`w-full p-2 mt-2 border rounded ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-500">{errors.address}</p>
        )}
      </>
    ) : (
      <p className="mt-2 text-gray-700">{address}</p>
    )}
  </div>

  {/* City และ ZIP Code */}
  <div className="grid grid-cols-2 gap-4">
    {/* City */}
    <div>
      <h3 className="text-lg font-semibold">City</h3>
      {isEditing ? (
        <>
          <input
            type="text"
            name="city"
            value={city}
            onChange={handleChange}
            placeholder="Enter your city"
            className={`w-full p-2 mt-2 border rounded ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-500">{errors.city}</p>
          )}
        </>
      ) : (
        <p className="mt-2 text-gray-700">{city}</p>
      )}
    </div>

    {/* ZIP Code */}
    <div>
      <h3 className="text-lg font-semibold">ZIP Code</h3>
      {isEditing ? (
        <>
          <input
            type="text"
            name="zip"
            value={zip}
            onChange={handleChange}
            placeholder="Enter your ZIP code"
            className={`w-full p-2 mt-2 border rounded ${
              errors.zip ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.zip && (
            <p className="mt-1 text-sm text-red-500">{errors.zip}</p>
          )}
        </>
      ) : (
        <p className="mt-2 text-gray-700">{zip}</p>
      )}
    </div>
  </div>

  {/* Phone */}
  <div>
    <h3 className="text-lg font-semibold">Phone</h3>
    {isEditing ? (
      <>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className={`w-full p-2 mt-2 border rounded ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
        )}
      </>
    ) : (
      <p className="mt-2 text-gray-700">{phone}</p>
    )}
  </div>
</div>

          <Orders />
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
