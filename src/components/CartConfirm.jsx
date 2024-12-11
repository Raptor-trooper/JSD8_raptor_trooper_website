// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ShopContext } from '../Context/ShopContext';

// const CartConfirm = ({ isOpen, onClose, totalAmount }) => {
//     const navigate = useNavigate();
//     const { cartItems, setCartItems } = useContext(ShopContext);

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

//     return (
//         <div
//             className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
//                 } transition-transform duration-300 ease-in-out z-50`}
//         >
//             <div className="p-4 flex justify-between items-center border-b">
//                 <h2 className="text-xl font-bold">Cart({cartItems.length})</h2>
//                 <button onClick={onClose} className="text-gray-600 text-xl font-semibold">CLOSE</button>
//             </div>
//             <div className="p-4 space-y-4">
//                 {cartItems.map((item, index) => (
//                     <div key={index} className="flex justify-between items-center border-b py-4">
//                         <img src={item.image[0]} alt={item.name} className="w-16 h-16 object-cover rounded" />
//                         <div className="flex-1 mx-4">
//                             <h3 className="font-semibold">{item.name}</h3>
//                             <p className="text-sm text-gray-500">Size: {item.size}</p>
//                             <div className="flex items-center mt-2">
//                                 <button onClick={() => handleDecrement(index)} className="px-2 border">-</button>
//                                 <p className='px-2'>{item.quantity}</p>
//                                 <button onClick={() => handleIncrement(index)} className="px-2 border">+</button>
//                             </div>
//                         </div>
//                         <p className="font-semibold">฿{item.price * item.quantity}</p>
//                         <button onClick={() => handleDeleteItem(index)} className="text-red-500 hover:text-red-700 ml-4">
//                             <i className="fas fa-trash">❌</i>
//                         </button>
//                     </div>
//                 ))}
//             </div>
//             <div className="p-4 bg-gray-200">
//                 <div className="flex justify-between items-center">
//                     <span className="font-semibold">SUBTOTAL</span>
//                     <span className="font-semibold">฿{totalAmount}</span>
//                 </div>
//                 <p className="text-sm text-gray-500 mt-2">Shipping & taxes calculated at checkout</p>
//             </div>
//             <div className="p-4 flex space-x-4">
//                 <button className="w-1/2 py-2 border border-black text-black font-semibold"
//                     onClick={handleViewCart}
//                 >VIEW CART</button>
//                 <button className="w-1/2 py-2 bg-black text-white font-semibold"
//                     onClick={handleCheckout}
//                 >CHECKOUT</button>
//             </div>
//         </div>
//     );
// };

// export default CartConfirm;







import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const CartConfirm = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { cartItems, setCartItems, category, token } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    console.log("cartData", cartData);

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

    // ฟังก์ชันสำหรับลบสินค้าออกจากตะกร้า
    const handleDeleteItem = (index) => {
        // ใช้ filter เพื่อลบสินค้าที่ตำแหน่งที่เลือกออกจากตะกร้า
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        // อัปเดท cartItem 
        setCartItems(updatedCartItems);
    };

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

    // const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    // console.log("CARTITEM = ", cartItems);


    return (
        <div
            className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 ease-in-out z-50`}
        >
            <div className="p-4 flex justify-between items-center border-b">
                {/* <h2 className="text-xl font-bold">Cart({cartItems.length})</h2> */}
                <button onClick={onClose} className="text-gray-600 text-xl font-semibold">CLOSE</button>
            </div>
            <div className="p-4 space-y-4">
                {cartData.map((item, index) => {
                    const productData = category.find(
                        (cate) => cate._id === item._id
                    )
                    return (
                        <div key={index} className="flex justify-between items-center border-b py-4">
                            <img src={productData.image[0]} alt={productData.name} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1 mx-4">
                                <h3 className="font-semibold">{productData.name}</h3>
                                <div className="flex items-center mt-2">
                                    <button onClick={() => handleDecrement(index)} className="px-2 border">-</button>
                                    <p className='px-2'>{cartData.quantity}</p>
                                    <button onClick={() => handleIncrement(index)} className="px-2 border">+</button>
                                </div>
                            </div>
                            <p className="font-semibold">฿{productData.price}</p>
                            <button onClick={() => handleDeleteItem(index)} className="text-red-500 hover:text-red-700 ml-4">
                                <i className="fas fa-trash">❌</i>
                            </button>
                        </div>
                    )
                })}
            </div>
            <div className="p-4 bg-gray-200">
                <div className="flex justify-between items-center">
                    <span className="font-semibold">SUBTOTAL</span>
                    {/* <span className="font-semibold">฿{totalAmount}</span> */}
                </div>
                <p className="text-sm text-gray-500 mt-2">Shipping & taxes calculated at checkout</p>
            </div>
            <div className="p-4 flex space-x-4">
                <button className="w-1/2 py-2 border border-black text-black font-semibold"
                    onClick={handleViewCart}
                >VIEW CART</button>
                <button className="w-1/2 py-2 bg-black text-white font-semibold"
                    onClick={handleCheckout}
                >CHECKOUT</button>
            </div>
        </div>
    );
};

export default CartConfirm;