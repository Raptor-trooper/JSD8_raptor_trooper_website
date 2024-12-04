import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

const CheckoutPage = () => {
    const { cartItems, setCartItems } = useContext(CartContext);

    // สรุปยอดรวมสินค้า
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="max-w-screen-xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Section Delivery */}
                <div className="md:col-span-2 space-y-8">
                    <div className="bg-gray-100 p-4 rounded-md">
                        <h2 className="text-lg font-bold">Delivery</h2>
                        <form className="space-y-4">
                            {/* Address Form */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium">First name</label>
                                    <input type="text" id="firstName" className="mt-1 p-2 block w-full border rounded-md" />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium">Last name</label>
                                    <input type="text" id="lastName" className="mt-1 p-2 block w-full border rounded-md" />
                                </div>
                            </div>
                            {/* Address, City, ZIP, Phone */}
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium">Address</label>
                                <input type="text" id="address" className="mt-1 p-2 block w-full border rounded-md" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium">City</label>
                                    <input type="text" id="city" className="mt-1 p-2 block w-full border rounded-md" />
                                </div>
                                <div>
                                    <label htmlFor="zip" className="block text-sm font-medium">ZIP code</label>
                                    <input type="text" id="zip" className="mt-1 p-2 block w-full border rounded-md" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                                <input type="text" id="phone" className="mt-1 p-2 block w-full border rounded-md" />
                            </div>
                        </form>
                    </div>

                    {/* Section Payment */}
                    <div className="bg-gray-100 p-4 rounded-md">
                        <h2 className="text-lg font-bold">Payment</h2>
                        <form className="space-y-4">
                            {/* Payment Method */}
                            <div className="flex items-center">
                                <input type="radio" id="creditCard" name="paymentMethod" className="mr-2" />
                                <label htmlFor="creditCard" className="text-sm font-medium">Credit card</label>
                            </div>
                            {/* Credit Card Details */}
                            <div className="bg-gray-100 p-4 rounded-md">
                        <h2 className="text-lg font-bold mb-4">Payment</h2>
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
                <div className="bg-gray-100 p-6 rounded-md">
                    <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                    <div className="space-y-4 mb-4">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
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
                    <button className="w-full py-3 bg-black text-white font-semibold">Pay now</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

