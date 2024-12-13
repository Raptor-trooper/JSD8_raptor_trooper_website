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
            className="w-full flex justify-center gap-16"
        >
            {/* ------------- Left Side ---------------- */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <h1>Delibery infomation</h1>
                </div>
                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="firstName"
                        value={formData.firstName}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="First name"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="lastName"
                        value={formData.lastName}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Last name"
                    />
                </div>
                <input
                    required
                    onChange={onChangeHandler}
                    name="email"
                    value={formData.email}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    required
                    onChange={onChangeHandler}
                    name="street"
                    value={formData.street}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="text"
                    placeholder="Street"
                />
                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="city"
                        value={formData.city}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="City"
                    />
                    <input
                        onChange={onChangeHandler}
                        name="state"
                        value={formData.state}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="State"
                    />
                </div>
                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="zipcode"
                        value={formData.zipcode}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="number"
                        placeholder="Zipcode"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="country"
                        value={formData.country}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Country"
                    />
                </div>
                <input
                    required
                    onChange={onChangeHandler}
                    name="phone"
                    value={formData.phone}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="number"
                    placeholder="Phone"
                />
            </div>

            {/* ------------- Right Side ------------------ */}
            <div className="">
                <div className="">

                    {cartData.map((item, index) => {
                        const productData = category.find(
                            (cate) => cate._id === item._id
                        );

                        return (
                            <div
                                key={index}
                                className="flex items-center gap-4 py-4 text-gray-700 border-t border-b"
                            >
                                <div className="flex items-start gap-6 ">
                                    <img
                                        className="w-16 sm:w-20"
                                        src={productData.image[0]}
                                        alt=""
                                    />
                                    <div>
                                        <p>{productData.name}</p>
                                        <p>{productData.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className='px-2'>{item.quantity}</p>
                                </div>
                            </div>
                        );
                    })}
                    <CartTotal />
                </div>
                <div className="mt-12">
                    <h1>Pay ment</h1>
                    {/* --------------- Payment Method Selection ------------- */}
                    <img src="/Images/Stripe_New.png" alt="Stripe_New" className='w-24 h-auto bg-black' />
                    <div className="w-full text-end mt-8">
                        <button
                            type="submit"
                            className="bg-black text-white px-16 py-3 text-sm"
                        >
                            PAY NOW
                        </button>
                    </div>
                </div>
            </div>
        </form >
    );
};

export default CheckoutPage;

