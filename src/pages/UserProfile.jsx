import { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { token } = useContext(ShopContext);
  const [firstName, setFirstName] = useState('เตเต้');
  const [lastName, setLastName] = useState('เตเต้');
  const [country, setCountry] = useState('Thailand');
  const [location, setLocation] = useState('123 Moo 4, Sukhumvit Road, Bangkok');
  const [city, setCity] = useState('Bangkok')
  const [zip, setZip] = useState('10110');
  const [phone, setPhone] = useState('+66 123 456 789');

  const Api = import.meta.env.VITE_BACKEND_URL;

  // const user = await axios.get(
  //   `${Api}/user/userprofile`,
  //   { address },
  //   {
  //     headers: { Authorization: `Bearer ${token}` }
  //   }
  // );

  // const [formData, setFormData] = useState({
  //   firstName: 'เตเต้',
  //   lastName: 'เตเต้',
  //   country: 'Thailand',
  //   address: '123 Moo 4, Sukhumvit Road, Bangkok',
  //   city: 'Bangkok',
  //   zip: '10110',
  //   phone: '+66 123 456 789',
  // });

  // ฟังก์ชันสำหรับสลับสถานะแก้ไข
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const address = {
      firstName,
      lastName,
      country,
      location,
      zip,
      phone,
    }
    
    setLoading(true);
    console.log("Form submitted");
      // const formData = new FormData();

      // formData.append("firstName", firstName);
      // formData.append("lastName", lastName);
      // formData.append("country", country);
      // formData.append("location", location);
      // formData.append("zip", zip);
      // formData.append("phone", phone);

    console.log(address);

    try {
      if (token) {
        const response = await axios.post(
          `${Api}/user/userprofile`,
            { address },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          toast.success("Profile updated successfully!");
          setIsEditing(false); // Exit edit mode
        } else {
          toast.error("Failed to update profile.");
        }
      } else {
        toast.error("Authentication failed. Please log in again.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false);
  };

  // ฟังก์ชันสำหรับอัปเดตข้อมูล
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-3/4 p-8 space-y-8 bg-white rounded-lg shadow-lg lg:w-1/2">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="object-cover w-24 h-24 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">{firstName}</h2>
              <p className="text-gray-500">tete@gmail.com</p>
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            {isEditing && (
              <button
                type="submit"
                className="w-40 p-3 text-white transition bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            )}
            {!isEditing && (
              <button
              onClick={toggleEdit}
              className="w-40 p-3 text-white transition bg-blue-500 rounded-lg shadow-md hover:bg-blue-600"
              >
                Edit
              </button>
            )}
            {!isEditing && (
              <button className="w-40 p-3 text-white transition bg-blue-500 rounded-lg shadow-md hover:bg-blue-600">
                Change Password
              </button>
            )}
          </div>
        </div>

        {/* Profile Section */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold">First Name</h3>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 mt-2 border rounded"
              />
            ) : (
              <p className="mt-2 text-gray-700">{firstName}</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold">Last Name</h3>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 mt-2 border rounded"
              />
            ) : (
              <p className="mt-2 text-gray-700">{lastName}</p>
            )}
          </div>
        </div>

        {/* Address Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Country/Region</h3>
            {isEditing ? (
              <input
                type="text"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-2 mt-2 border rounded"
              />
            ) : (
              <p className="mt-2 text-gray-700">{country}</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold">Address</h3>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 mt-2 border rounded"
              />
            ) : (
              <p className="mt-2 text-gray-700">{location}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">City</h3>
              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2 mt-2 border rounded"
                />
              ) : (
                <p className="mt-2 text-gray-700">{city}</p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">ZIP Code</h3>
              {isEditing ? (
                <input
                  type="text"
                  name="zip"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full p-2 mt-2 border rounded"
                />
              ) : (
                <p className="mt-2 text-gray-700">{zip}</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Phone</h3>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 mt-2 border rounded"
              />
            ) : (
              <p className="mt-2 text-gray-700">{phone}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserProfile;
