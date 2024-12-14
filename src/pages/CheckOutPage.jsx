import { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import CartTotal from '../components/CartTotal';
import axios from "axios";

const CheckoutPage = () => {
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
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold">Delivery Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                required
                name="firstName"
                value={formData.firstName}
                onChange={onChangeHandler}
                className="border border-gray-300 rounded py-2 px-3 w-full"
                type="text"
                placeholder="First Name"
              />
              <input
                required
                name="lastName"
                value={formData.lastName}
                onChange={onChangeHandler}
                className="border border-gray-300 rounded py-2 px-3 w-full"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <input
              required
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              className="border border-gray-300 rounded py-2 px-3 w-full"
              type="email"
              placeholder="Email Address"
            />
            <input
              required
              name="street"
              value={formData.street}
              onChange={onChangeHandler}
              className="border border-gray-300 rounded py-2 px-3 w-full"
              type="text"
              placeholder="Street Address"
            />
            <div className="grid gap-4 md:grid-cols-3">
              <input
                required
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                className="border border-gray-300 rounded py-2 px-3 w-full"
                type="text"
                placeholder="City"
              />
              <input
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                className="border border-gray-300 rounded py-2 px-3 w-full"
                type="text"
                placeholder="State"
              />
              <input
                required
                name="zipcode"
                value={formData.zipcode}
                onChange={onChangeHandler}
                className="border border-gray-300 rounded py-2 px-3 w-full"
                type="text"
                placeholder="Zipcode"
              />
            </div>
            <input
              required
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              className="border border-gray-300 rounded py-2 px-3 w-full"
              type="text"
              placeholder="Country"
            />
            <input
              required
              name="phone"
              value={formData.phone}
              onChange={onChangeHandler}
              className="border border-gray-300 rounded py-2 px-3 w-full"
              type="text"
              placeholder="Phone Number"
            />
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
            <CartTotal/>
            
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

