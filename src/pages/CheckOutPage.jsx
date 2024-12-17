import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import CartTotal from "../components/CartTotal";
import axios from "axios";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const {
    Api,
    cartItems,
    getCartAmount,
    category,
    token,
    user,
    setUser,
    updateProfile,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

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
    if (category.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        if (cartItems[items] > 0) {
          tempData.push({
            _id: items,
            quantity: cartItems[items],
          });
        }
      }
      setCartData(tempData);
    }
  }, [user.delivery, cartItems, category]);


  // update ข้อมูลไปหลังบ้านหลังกด save
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProfile();
      console.log("Profile updated successfully!");
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to update profile.");
    }

    try {
      let orderItems = [];

      for (const items in cartItems) {
        if (cartItems[items] > 0) {
          const itemInfo = structuredClone(
            category.find((product) => product._id === items)
          );
          if (itemInfo) {
            itemInfo.quantity = cartItems[items];
            orderItems.push(itemInfo);
          }
        }
      }

      let orderData = {
        delivery: user.delivery,
        items: orderItems,
        amount: getCartAmount() + 10,
      };

      const responseStripe = await axios.post(
        `${Api}/order/stripe`,
        orderData,
        { headers: { authorization: `Bearer ${token}` } }
      );
      await axios.post(
        `${Api}/user/userprofile`,
        { delivery: user.delivery },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (responseStripe.data.success) {
        const { session_url } = responseStripe.data;
        window.location.replace(session_url);
      } else {
        toast.error(responseStripe.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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
    <form
      onSubmit={onSubmitHandler}
      className="grid max-w-screen-xl gap-8 p-4 mx-auto lg:grid-cols-3"
    >
      {/* Profile Section */}
      <div className="space-y-4 lg:col-span-2">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold">First Name</h3>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold">Last Name</h3>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Country/Region</h3>
            <input
              type="text"
              name="country"
              value={country}
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold">Address</h3>
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">City</h3>
              <input
                type="text"
                name="city"
                value={city}
                onChange={handleChange}
                className="w-full p-2 mt-2 border rounded"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">ZIP Code</h3>
              <input
                type="text"
                name="zip"
                value={zip}
                onChange={handleChange}
                className="w-full p-2 mt-2 border rounded"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Phone</h3>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded"
            />
          </div>
        </div>
      </div>
      {/* ----------- Order Summary ----------- */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Order Summary</h2>
        {cartData.map((item, index) => {
          const product = category.find((cate) => cate._id === item._id);
          return (
            <div key={index} className="flex items-center gap-4">
              <img
                src={product?.image[0]}
                alt={product?.name}
                className="object-cover w-16 h-16 rounded"
              />
              <div>
                <h3 className="font-semibold">{product?.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>฿{product?.price * item.quantity}</p>
              </div>
            </div>
          );
        })}
        <CartTotal />
        <button
          type="submit"
          className="w-full py-3 font-semibold text-white bg-black rounded"
        >
          Confirm & Pay
        </button>
      </div>
    </form>
  );
};

export default CheckoutPage;