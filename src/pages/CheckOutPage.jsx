import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ShopContext } from '../Context/ShopContext';

const CheckoutPage = () => {
    const { cartItems, setCartItems, token } = useContext(ShopContext);
    const Api = import.meta.env.VITE_BACKEND_URL;

    // สรุปยอดรวมสินค้า
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    
    axios.get("/", {})
    const stripe = async () => {
        try {
            const response = await axios.post(
                `${Api}/order/stripe`,
                {items, amount, address},
                {
                    headers: {
                        authorization: `Bearer ${token}` // ใส่ Token ใน Header
                    }
                }
                // { headers: { token } }
              );
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="max-w-screen-xl p-8 mx-auto">
            <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Section Delivery */}
                <div className="space-y-8 md:col-span-2">
                    <div className="p-4 bg-gray-100 rounded-md">
                        <h2 className="text-lg font-bold">Delivery</h2>
                        <form className="space-y-4">
                            {/* Address Form */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium">First name</label>
                                    <input type="text" id="firstName" className="block w-full p-2 mt-1 border rounded-md" />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium">Last name</label>
                                    <input type="text" id="lastName" className="block w-full p-2 mt-1 border rounded-md" />
                                </div>
                            </div>
                            {/* Address, City, ZIP, Phone */}
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium">Address</label>
                                <input type="text" id="address" className="block w-full p-2 mt-1 border rounded-md" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium">City</label>
                                    <input type="text" id="city" className="block w-full p-2 mt-1 border rounded-md" />
                                </div>
                                <div>
                                    <label htmlFor="zip" className="block text-sm font-medium">ZIP code</label>
                                    <input type="text" id="zip" className="block w-full p-2 mt-1 border rounded-md" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                                <input type="text" id="phone" className="block w-full p-2 mt-1 border rounded-md" />
                            </div>
                        </form>
                    </div>

                    {/* Section Payment */}
                    <div className="p-4 bg-gray-100 rounded-md">
                        <h2 className="text-lg font-bold">Payment</h2>
                        <form className="space-y-4">
                            {/* Payment Method */}
                            <div className="flex items-center">
                                <input type="radio" id="creditCard" name="paymentMethod" className="mr-2" />
                                <label htmlFor="creditCard" className="text-sm font-medium">Credit card</label>
                            </div>
                            {/* Credit Card Details */}
                            <div className="p-4 bg-gray-100 rounded-md">
                                <h2 className="mb-4 text-lg font-bold">Payment</h2>
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="cardName" className="block text-sm font-medium">Name on card</label>
                                        <input type="text" id="cardName" className="w-full p-2 border rounded-md" />
                                    </div>
                                    <div>
                                        <label htmlFor="cardNumber" className="block text-sm font-medium">Card number</label>
                                        <input type="text" id="cardNumber" className="w-full p-2 border rounded-md" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="expiryDate" className="block text-sm font-medium">Expiry date</label>
                                            <input type="text" id="expiryDate" className="w-full p-2 border rounded-md" placeholder="MM/YY" />
                                        </div>
                                        <div>
                                            <label htmlFor="cvv" className="block text-sm font-medium">CVV</label>
                                            <input type="text" id="cvv" className="w-full p-2 border rounded-md" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Section Order Summary */}
                <div className="p-6 bg-gray-100 rounded-md">
                    <h2 className="mb-4 text-lg font-bold">Order Summary</h2>
                    <div className="mb-4 space-y-4">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <img src={item.image[0]} alt={item.name} className="object-cover w-16 h-16 rounded" />
                                <div className="flex-1 mx-4">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                                <p className="font-semibold">฿{item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">Subtotal</span>
                        <span>฿{totalAmount}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="font-semibold">Estimated Shipping</span>
                        <span>Calculated in checkout</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">฿{totalAmount}</span>
                    </div>
                    <button
                        onClick={() => handleCheckout()}
                        className="w-full py-3 font-semibold text-white bg-black"
                    >
                        Pay now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

