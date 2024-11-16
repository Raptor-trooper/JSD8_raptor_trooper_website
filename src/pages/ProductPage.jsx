import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataCategory } from '../Context/CategoryProvider';
import CartConfirm from '../components/CartConfirm';

const ProductPage = () => {
    const { name } = useParams();
    const { category } = useContext(DataCategory);

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (category && category.length > 0) {
            const foundProduct = category.find(item => item.name === name);
            setProduct(foundProduct);
        }
    }, [name, category]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            setQuantity(quantity + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        const cartItem = { ...product, quantity };
        const existingItemIndex = cartItems.findIndex(item => item.id === cartItem.id);

        if (existingItemIndex !== -1) {
            // ถ้ามีสินค้านี้อยู่แล้ว ให้เพิ่มจำนวนสินค้า
            const updatedCartItems = cartItems.map((item, index) => {
                if (index === existingItemIndex) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity
                    };
                }
                return item;
        });
        setCartItems(updatedCartItems);
    } else {
        // ถ้าไม่มีสินค้า ให้เพิ่มเป็นสินค้าใหม่ในตะกร้า
        setCartItems([...cartItems, cartItem]);
    }
        setIsCartOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="max-w-screen-xl mx-auto p-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                </div>

                <div className="w-full md:w-1/2">
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl mb-4">฿{product.price * quantity}</p>
                    <p className="text-lg text-gray-700 mb-8">{product.description}</p>

                    <div className="mb-6">
                        <label htmlFor="quantity" className="block mb-2 text-lg font-medium">Quantity</label>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => handleQuantityChange('decrement')}
                                className="px-4 py-2 border border-gray-400 rounded-md"
                            >
                                -
                            </button>
                            <p>{quantity}</p>
                            <button
                                onClick={() => handleQuantityChange('increment')}
                                className="px-4 py-2 border border-gray-400 rounded-md"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button
                        className="w-full py-4 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            <CartConfirm
                isOpen={isCartOpen}
                onClose={handleCloseCart}
                cartItems={cartItems}
                totalAmount={totalAmount}
                setCartItems={setCartItems}
            />
        </div>
    );
};

export default ProductPage;




// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { DataCategory } from '../Context/CategoryProvider';


// const ProductPage = () => {
//     const { name } = useParams(); // รับ productId จาก URL parameter
//     const { category } = useContext(DataCategory);

//     // สร้าง state สำหรับเก็บข้อมูลสินค้า
//     const [product, setProduct] = useState(null);
//     const [quantity, setQuantity] = useState(1); // สร้าง state สำหรับจำนวนสินค้า

//     useEffect(() => {
//         // ตรวจสอบว่ามีข้อมูลใน dataCategory หรือไม่
//         if (category && category.length > 0) {
//             // ค้นหาสินค้าจาก dataCategory ที่มี id ตรงกับ name
//             const foundProduct = category.find(item => item.name === name);
//             setProduct(foundProduct);
//         }
//     }, [name, category]);

//     if (!product) {
//         return <div>Loading...</div>;
//     }

//     // ฟังก์ชันสำหรับเพิ่ม/ลดจำนวนสินค้า
//     const handleQuantityChange = (type) => {
//         if (type === 'increment') {
//             setQuantity(quantity + 1);
//         } else if (type === 'decrement' && quantity > 1) {
//             setQuantity(quantity - 1);
//         }
//     };

//     const total = product.price * quantity

//     const addToCart = () => {
//         console.log(product);
//     }

//     return (
//         <div className="max-w-screen-xl mx-auto p-8">
//             <div className="flex flex-col md:flex-row gap-8">
//                 {/* รูปภาพสินค้า */}
//                 <div className="w-full md:w-1/2">
//                     <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-full h-auto object-cover rounded-lg shadow-md"
//                     />
//                 </div>

//                 {/* รายละเอียดสินค้า */}
//                 <div className="w-full md:w-1/2">
//                     <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
//                     <p className="text-xl mb-4">฿{total}</p>
//                     <p className="text-lg text-gray-700 mb-8">{product.description}</p>

//                     {/* ปุ่มเพิ่ม/ลดจำนวนสินค้า */}
//                     <div className="mb-6">
//                         <label htmlFor="quantity" className="block mb-2 text-lg font-medium">Quantity</label>
//                         <div className="flex items-center space-x-4">
//                             <button
//                                 onClick={() => handleQuantityChange('decrement')}
//                                 className="px-4 py-2 border border-gray-400 rounded-md"
//                             >
//                                 -
//                             </button>
//                             <p>{quantity}</p>
//                             <button
//                                 onClick={() => handleQuantityChange('increment')}
//                                 className="px-4 py-2 border border-gray-400 rounded-md"
//                             >
//                                 +
//                             </button>
//                         </div>
//                     </div>

//                     <button className="w-full py-4 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition"
//                         onClick={() => addToCart()}>
//                         Add to Cart
//                     </button>
//                 </div>
//             </div>

//             {/* คำบรรยายสินค้า */}
//             <div className="mt-12">
//                 <h2 className="text-2xl font-bold mb-4">Descriptions</h2>
//                 <p className="text-gray-700 mb-6">
//                     Transform your home into a personal gallery with unique art that speaks to you. Each piece is a celebration of creativity, printed on premium paper that brings every detail to life.
//                 </p>
//             </div>

//             {/* สเปคและรายละเอียดเพิ่มเติม */}
//             <div>

//                 {/* Specs */}
//                 <div className="collapse collapse-plus border border-gray-300 rounded-3xl my-1">
//                     <input type="checkbox" />
//                     <div className="collapse-title text-xl font-medium flex justify-between">Specs</div>
//                     <div className="collapse-content">
//                         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem, in.</p>
//                     </div>
//                 </div>

//                 {/* Size & Fit */}
//                 <div className="collapse collapse-plus border border-gray-300 rounded-3xl my-1">
//                     <input type="checkbox" />
//                     <div className="collapse-title text-xl font-medium flex justify-between">Size & Fit</div>
//                     <div className="collapse-content">
//                         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem, in.</p>
//                     </div>
//                 </div>

//                 {/* Sustainability */}
//                 <div className="collapse collapse-plus border border-gray-300 rounded-3xl my-1">
//                     <input type="checkbox" />
//                     <div className="collapse-title text-xl font-medium flex justify-between">Sustainability</div>
//                     <div className="collapse-content">
//                         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem, in.</p>
//                     </div>
//                 </div>

//                 {/* Shipping */}
//                 <div className="collapse collapse-plus border border-gray-300 rounded-3xl my-1">
//                     <input type="checkbox" />
//                     <div className="collapse-title text-xl font-medium flex justify-between">Shipping</div>
//                     <div className="collapse-content">
//                         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem, in.</p>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default ProductPage;