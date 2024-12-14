import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
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

  // update ข้อมูลไปหลังบ้านหลังกด save
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile();
      console.log("Profile updated successfully!");
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  }

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
                <h2 className="text-xl font-semibold text-black">{name}</h2>
                <p className="text-gray-500">{email}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              {isEditing && (
                <button
                  type="submit"
                  disabled={loading}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  value={address}
                  onChange={handleChange}
                  className="w-full p-2 mt-2 border rounded"
                />
              ) : (
                <p className="mt-2 text-gray-700">{address}</p>
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                  onChange={handleChange}
                  className="w-full p-2 mt-2 border rounded"
                />
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
