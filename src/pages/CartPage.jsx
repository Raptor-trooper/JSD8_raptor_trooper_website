import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, removeFromCart, setCartItems } = useContext(ShopContext);
    const navigate = useNavigate();

    // ฟังก์ชันสำหรับเพิ่มจำนวนสินค้า
    const handleIncrement = (index) => {
        const updatedCartItems = cartItems.map((item, i) => {
            if (i === index) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const handleSignIn = () => {

        navigate('/login'); // ย้ายไปที่ login page
    };

    const handleSignUp = () => {

        navigate('/signup'); // ย้ายไปที่ signup page
    };


    // ฟังก์ชันสำหรับลดจำนวนสินค้า
    const handleDecrement = (index) => {
        const updatedCartItems = cartItems.map((item, i) => {
            if (i === index && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    // ฟังก์ชันสำหรับดำเนินการสั่งซื้อ
    const handleCheckout = () => {
        navigate('/checkoutpage');
    };

    // สรุปยอดรวมสินค้า
    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="max-w-screen-xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Cart ({cartItems.length})</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Section สำหรับ Create a Account */}
                <div className="md:col-span-2 space-y-8">
                    <div className="bg-gray-100 p-4 rounded-md">
                        <h2 className="text-lg font-bold">Create a Account</h2>
                        <p>Sign up to track your order history and save your information for faster checkouts.</p>
                        <div className="mt-4">
                            <button className="text-blue-500 font-semibold mr-4"
                                onClick={handleSignIn}
                            >Sign In</button>
                            <button className="text-blue-500 font-semibold"
                                onClick={handleSignUp}
                            >Sign Up</button>
                        </div>
                    </div>

                    {/* Section รายการสินค้า */}
                    {cartItems.length === 0 ? (
                        <p>Your cart is currently empty.</p>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex justify-between items-center border-b py-4">
                                    <img src={item.image[0]} alt={item.name} className="w-24 h-24 object-cover rounded" />
                                    <div className="flex-1 mx-4">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-sm text-gray-500">BY {item.brand}</p>
                                        <p className="text-sm text-gray-500">Size: {item.size}</p>
                                        <div className="flex items-center mt-2">
                                            <button onClick={() => handleDecrement(index)} className="px-2 border">-</button>
                                            <p className='px-2'>{item.quantity}</p>
                                            <button onClick={() => handleIncrement(index)} className="px-2 border">+</button>
                                        </div>
                                    </div>
                                    <p className="font-semibold">฿{item.price * item.quantity}</p>
                                    <button onClick={() => removeFromCart(index)} className="text-red-500 hover:text-red-700 ml-4">
                                        <i className="fas fa-trash">❌</i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Section Order Summary */}
                <div className="bg-gray-100 p-6 rounded-md">
                    <h2 className="text-lg font-bold mb-4">Order Summary</h2>
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
                    <button className="w-full py-3 bg-black text-white font-semibold" onClick={handleCheckout}>
                        CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;






// import React, { useContext } from 'react';
// import { CartContext } from '../Context/CartContext';
// import { useNavigate } from 'react-router-dom';

// const CartPage = () => {
//     const { cartItems, removeFromCart, setCartItems } = useContext(CartContext);
//     const navigate = useNavigate();

//     // ฟังก์ชันสำหรับเพิ่มจำนวนสินค้า
//     const handleIncrement = (index) => {
//         const updatedCartItems = cartItems.map((item, i) => {
//             if (i === index) {
//                 return { ...item, quantity: item.quantity + 1 };
//             }
//             return item;
//         });
//         setCartItems(updatedCartItems);
//     };

//     // ฟังก์ชันสำหรับลดจำนวนสินค้า
//     const handleDecrement = (index) => {
//         const updatedCartItems = cartItems.map((item, i) => {
//             if (i === index && item.quantity > 1) {
//                 return { ...item, quantity: item.quantity - 1 };
//             }
//             return item;
//         });
//         setCartItems(updatedCartItems);
//     };

//     // ฟังก์ชันสำหรับดำเนินการสั่งซื้อ
//     const handleCheckout = () => {
//         navigate('/checkoutpage');
//     };

//     // สรุปยอดรวมสินค้า
//     const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//     return (
//         <div className="max-w-screen-xl mx-auto p-8">
//             <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
//             {cartItems.length === 0 ? (
//                 <p>Your cart is currently empty.</p>
//             ) : (
//                 <div className="space-y-4">
//                     {cartItems.map((item, index) => (
//                         <div key={index} className="flex justify-between items-center border-b py-4">
//                             <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                             <div className="flex-1 mx-4">
//                                 <h3 className="font-semibold">{item.name}</h3>
//                                 <p className="text-sm text-gray-500">Size: {item.size}</p>
//                                 <div className="flex items-center mt-2">
//                                     <button onClick={() => handleDecrement(index)} className="px-2 border">-</button>
//                                     <p className='px-2'>{item.quantity}</p>
//                                     <button onClick={() => handleIncrement(index)} className="px-2 border">+</button>
//                                 </div>
//                             </div>
//                             <p className="font-semibold">฿{item.price * item.quantity}</p>
//                             <button onClick={() => removeFromCart(index)} className="text-red-500 hover:text-red-700 ml-4">
//                                 <i className="fas fa-trash">❌</i>
//                             </button>
//                         </div>
//                     ))}
//                     <div className="p-4 bg-gray-200">
//                         <div className="flex justify-between items-center">
//                             <span className="font-semibold">SUBTOTAL</span>
//                             <span className="font-semibold">฿{totalAmount}</span>
//                         </div>
//                         <p className="text-sm text-gray-500 mt-2">Shipping & taxes calculated at checkout</p>
//                     </div>
//                     <div className="flex justify-end mt-4">
//                         <button className="py-3 px-6 bg-black text-white font-semibold" onClick={handleCheckout}>
//                             Proceed to Checkout
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CartPage;

