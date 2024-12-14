import { useState, useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import CartTotal from "../components/CartTotal";
import axios from "axios";

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
  // const [formData, setFormData] = useState({
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     street: "",
  //     city: "",
  //     state: "",
  //     zipcode: "",
  //     country: "",
  //     phone: "",
  // });

  // const onChangeHandler = (event) => {
  //     const name = event.target.name;
  //     const value = event.target.value;
  //     setFormData((data) => ({ ...data, [name]: value }));
  // };

  // const onSubmitHandler = async (event) => {
  //     event.preventDefault();

  //     try {
  //         let orderItems = [];

  //         for (const items in cartItems) {
  //             if (cartItems[items] > 0) {
  //                 const itemInfo = structuredClone(
  //                     category.find((product) => product._id === items)
  //                 );
  //                 if (itemInfo) {
  //                     itemInfo.quantity = cartItems[items];
  //                     orderItems.push(itemInfo);
  //                 }
  //             }
  //         }

  //         let orderData = {
  //             delivery: formData,
  //             items: orderItems,
  //             amount: getCartAmount() + 10,
  //         };

  //         const responseStripe = await axios.post(
  //             `${Api}/order/stripe`,
  //             orderData,
  //             { headers: { authorization: `Bearer ${token}` } }
  //         );
  //         await axios.post(
  //             `${Api}/user/userprofile`,
  //             { delivery: formData },
  //             { headers: { Authorization: `Bearer ${token}` } }
  //         );
  //         if (responseStripe.data.success) {
  //             const { session_url } = responseStripe.data;
  //             window.location.replace(session_url);
  //         } else {
  //             console.log(error);
  //             // toast.error(responseStripe.data.message);
  //         }
  //     } catch (error) {
  //         console.log(error);
  //         // toast.error(error.message);
  //     }
  // };

  // useEffect(() => {
  //     if (category.length > 0) {
  //         const tempData = [];
  //         for (const items in cartItems) {
  //             if (cartItems[items] > 0) {
  //                 tempData.push({
  //                     _id: items,
  //                     quantity: cartItems[items],
  //                 });
  //             }
  //         }
  //         setCartData(tempData);
  //     }
  // }, [cartItems, category]);
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
      {/* ----------- Delivery Information ----------- */}
      {/* <div className="space-y-4 lg:col-span-2">
            <h2 className="text-2xl font-bold">Delivery Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
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
              <input
                required
                name="lastName"
                value={lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="text"
                placeholder="Last Name"
              />
            </div> */}
      {/* <input
              required
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="email"
              placeholder="Email Address"
            /> */}
      {/* <input
              required
              name="address"
              value={address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              type="text"
              placeholder="Address"
            />
            <div className="grid gap-4 md:grid-cols-3">
              <input
                required
                name="city"
                value={city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="text"
                placeholder="City"
              /> */}
      {/* <input
                name="state"
                value={state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="text"
                placeholder="State"
              /> */}
      {/* <input
                required
                name="zip"
                value={zip}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                type="text"
                placeholder="Zipcode"
=======
  const { Api, cartItems, setCartItems, getCartAmount, category, token } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

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
        delivery: formData,
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
        { delivery: formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (responseStripe.data.success) {
        const { session_url } = responseStripe.data;
        window.location.replace(session_url);
      } else {
        console.log(error);
        // toast.error(responseStripe.data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
    }
  };

  useEffect(() => {
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
  }, [cartItems, category]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-screen-xl mx-auto p-4 grid gap-8 lg:grid-cols-3"
    >
      {/* ----------- Delivery Information ----------- */}

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
                src={product.image[0]}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>฿{product.price * item.quantity}</p>
              </div>
            </div>
          );
        })}
        <CartTotal />

        <div className="flex justify-between font-bold">
          <span>Subtotal:</span>
          <span>฿{getCartAmount()}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Shipping:</span>
          <span>฿10</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>฿{getCartAmount() + 10}</span>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-black text-white font-semibold rounded"
        >
          Confirm & Pay
        </button>
      </div>
    </form>
  );
};

export default CheckoutPage;
