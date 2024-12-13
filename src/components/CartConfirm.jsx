import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const CartConfirm = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { cartItems, category, updateQuantity, getCartCount } = useContext(ShopContext);
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

    const handleViewCart = () => {
        onClose(); // ปิดหน้า cart confirm
        navigate('/cartpage'); // ย้ายไปที่หน้ารถเข็นสินค้า
    };

    const handleCheckout = () => {
        onClose(); // ปิดหน้า cart confirm
        navigate('/checkoutpage'); // ย้ายไปที่หน้าcheckout
    };

    return (
        <div
            className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-white shadow-lg transform 
                ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
                transition-transform duration-300 ease-in-out z-50`}>

            <div className="flex items-center justify-between p-4 border-b">
                <button onClick={onClose} className="text-xl font-semibold text-gray-600">CLOSE</button>
            </div>
            <div className="p-4 space-y-4">
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
                                    <p>
                                        {productData.name}
                                    </p>
                                    <div>
                                        <p>
                                            {productData.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <p className='px-2'>{item.quantity}</p>
                            </div>
                            <button
                                onClick={() => updateQuantity(item._id, 0)}
                                className="w-4 mr-4 cursor-pointer sm:w-5"
                            >❌</button>
                        </div>
                    );
                })}
            </div>
            <div className="p-4 bg-gray-200">
                <div className="flex items-center justify-between">
                    <span className="font-semibold">SUBTOTAL</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">Shipping & taxes calculated at checkout</p>
            </div>
            <div className="flex p-4 space-x-4">
                <button className="w-1/2 py-2 font-semibold text-black border border-black"
                    onClick={handleViewCart}
                >VIEW CART</button>
                <button className="w-1/2 py-2 font-semibold text-white bg-black"
                    onClick={handleCheckout}
                >CHECKOUT</button>
            </div>
        </div>
    );
};

export default CartConfirm;





// auto

// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ShopContext } from '../Context/ShopContext';

// const CartConfirm = ({ isOpen, onClose }) => {
//     const navigate = useNavigate();
//     const { cartItems, setCartItems, category, updateQuantity } = useContext(ShopContext);
//     const [cartData, setCartData] = useState([]);

//     useEffect(() => {
//         if (category.length > 0) {
//             const tempData = [];
//             for (const items in cartItems) {
//                 if (cartItems[items] > 0) {
//                     tempData.push({
//                         _id: items,
//                         quantity: cartItems[items],
//                     });
//                 }
//             }
//             setCartData(tempData);
//         }
//     }, [cartItems, category]);

//     const handleViewCart = () => {
//         onClose(); // ปิดหน้า cart confirm
//         navigate('/cartpage'); // ย้ายไปที่หน้ารถเข็นสินค้า
//     };

//     const handleCheckout = () => {
//         onClose(); // ปิดหน้า cart confirm
//         navigate('/checkoutpage'); // ย้ายไปที่หน้าcheckout
//     };

//     // ฟังก์ชันสำหรับลบสินค้าออกจากตะกร้า
//     const handleDeleteItem = (index) => {
//         // ใช้ filter เพื่อลบสินค้าที่ตำแหน่งที่เลือกออกจากตะกร้า
//         const updatedCartItems = cartItems.filter((_, i) => i !== index);
//         // อัปเดท cartItem
//         setCartItems(updatedCartItems);
//     };

//     const handleIncrement = (id) => {
//         const updatedCartItems = { ...cartItems };
//         if (updatedCartItems[id] !== undefined) {
//             updatedCartItems[id] += 1;
//         } else {
//             updatedCartItems[id] = 1;
//         }
//         setCartItems(updatedCartItems);
//     };

//     // ฟังก์ชันสำหรับลดจำนวนสินค้า
//     const handleDecrement = (id) => {
//         const updatedCartItems = { ...cartItems };
//         if (updatedCartItems[id] !== undefined) {
//             if (updatedCartItems[id] === 1) {
//                 delete updatedCartItems[id]
//             } else {
//                 updatedCartItems[id] -= 1;
//             }
//         }
//         setCartItems(updatedCartItems);
//     };
//     // useEffect(() => {
//     //     updateQuantity()
//     // }, [cartItems])

//     return (
//         <div
//             className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
//                 } transition-transform duration-300 ease-in-out z-50`}
//         >
//             <div className="flex items-center justify-between p-4 border-b">
//                 {/* <h2 className="text-xl font-bold">Cart({cartItems.length})</h2> */}
//                 <button onClick={onClose} className="text-xl font-semibold text-gray-600">CLOSE</button>
//             </div>
//             <div className="p-4 space-y-4">
//                 {/* {cartData.map((item, index) => {
//                     const productData = category.find(
//                         (cate) => cate._id === item._id
//                     )
//                     return (
//                         <div key={index} className="flex items-center justify-between py-4 border-b">
//                             <img src={productData.image[0]} alt={productData.name} className="object-cover w-16 h-16 rounded" />
//                             <div className="flex-1 mx-4">
//                                 <h3 className="font-semibold">{productData.name}</h3>
//                                 <div className="flex items-center mt-2">
//                                     <button onClick={() => handleDecrement(item._id)} className="px-2 border">-</button>
//                                     <p className='px-2'>{cartData.quantity}</p>
//                                     <button onClick={() => handleIncrement(item._id)} className="px-2 border">+</button>
//                                 </div>
//                             </div>
//                             <p className="font-semibold">฿{productData.price}</p>
//                             <button onClick={() => handleDeleteItem(index)} className="ml-4 text-red-500 hover:text-red-700">
//                                 <i className="fas fa-trash">❌</i>
//                             </button>
//                         </div>
//                     )
//                 })} */}
//                 {Object.keys(cartItems).map((item, index) => {
//                     const productData = category.find(
//                         (cate) => cate._id === item
//                     )
//                     return (
//                         <div key={index} className="flex items-center justify-between py-4 border-b">
//                             <img src={productData?.image[0]} alt={productData?.name} className="object-cover w-16 h-16 rounded" />
//                             <div className="flex-1 mx-4">
//                                 <h3 className="font-semibold">{productData?.name}</h3>
//                                 <div className="flex items-center mt-2">
//                                     <button onClick={() => handleDecrement(item)} className="px-2 border">-</button>
//                                     <p className='px-2'>{cartItems[item]}</p>
//                                     <button onClick={() => handleIncrement(item)} className="px-2 border">+</button>
//                                 </div>
//                             </div>
//                             <p className="font-semibold">฿{productData?.price}</p>
//                             <button onClick={() => handleDeleteItem(index)} className="ml-4 text-red-500 hover:text-red-700">
//                                 <i className="fas fa-trash">❌</i>
//                             </button>
//                         </div>
//                     )
//                 })}
//             </div>
//             <div className="p-4 bg-gray-200">
//                 <div className="flex items-center justify-between">
//                     <span className="font-semibold">SUBTOTAL</span>
//                     {/* <span className="font-semibold">฿{totalAmount}</span> */}
//                 </div>
//                 <p className="mt-2 text-sm text-gray-500">Shipping & taxes calculated at checkout</p>
//             </div>
//             <div className="flex p-4 space-x-4">
//                 <button className="w-1/2 py-2 font-semibold text-black border border-black"
//                     onClick={handleViewCart}
//                 >VIEW CART</button>
//                 <button className="w-1/2 py-2 font-semibold text-white bg-black"
//                     onClick={handleCheckout}
//                 >CHECKOUT</button>
//             </div>
//         </div>
//     );
// };

// export default CartConfirm;