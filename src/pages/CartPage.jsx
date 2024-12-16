import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import CartTotal from "../components/CartTotal";
import ButtonX from "../components/ButtonX";


const CartPage = () => {
  const { cartItems, removeFromCart, setCartItems, updateQuantity, category } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const [cartData, setCartData] = useState([]);

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
    <div className="max-w-screen-xl p-8 mx-auto">
      <div className="mb-3 text-2xl ">
        <h1>Cart</h1>
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = category.find((cate) => cate._id === item._id);

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6 ">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs font-medium sm:text-lg">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{productData.price}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(item._id, Number(e.target.value))
                }
                className="px-1 py-1 border max-w-10 sm:max-w-20 sm:px-2"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />

              <ButtonX
                onClick={() => updateQuantity(item._id, 0)}
              >
              </ButtonX>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full  text-end">
            <button
              onClick={() => navigate("/checkoutpage")}
              className="mt-3 button"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
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
//         <div className="max-w-screen-xl p-8 mx-auto">

//                                 ฝาก

{
  /* <div className="p-4 bg-gray-100 rounded-md">
                        <h2 className="text-lg font-bold">Create a Account</h2>
                        <p>Sign up to track your order history and save your information for faster checkouts.</p>
                        <div className="mt-4">
                            <button className="mr-4 font-semibold text-blue-500"
                                onClick={handleSignIn}
                            >Sign In</button>
                            <button className="font-semibold text-blue-500"
                                onClick={handleSignUp}
                            >Sign Up</button>
                        </div>
                    </div> */
}
//ฝาก

//             <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
//             {cartItems.length === 0 ? (
//                 <p>Your cart is currently empty.</p>
//             ) : (
//                 <div className="space-y-4">
//                     {cartItems.map((item, index) => (
//                         <div key={index} className="flex items-center justify-between py-4 border-b">
//                             <img src={item.image} alt={item.name} className="object-cover w-16 h-16 rounded" />
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
//                             <button onClick={() => removeFromCart(index)} className="ml-4 text-red-500 hover:text-red-700">
//                                 <i className="fas fa-trash">❌</i>
//                             </button>
//                         </div>
//                     ))}
//                     <div className="p-4 bg-gray-200">
//                         <div className="flex items-center justify-between">
//                             <span className="font-semibold">SUBTOTAL</span>
//                             <span className="font-semibold">฿{totalAmount}</span>
//                         </div>
//                         <p className="mt-2 text-sm text-gray-500">Shipping & taxes calculated at checkout</p>
//                     </div>
//                     <div className="flex justify-end mt-4">
//                         <button className="px-6 py-3 font-semibold text-white bg-black" onClick={handleCheckout}>
//                             Proceed to Checkout
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CartPage;
