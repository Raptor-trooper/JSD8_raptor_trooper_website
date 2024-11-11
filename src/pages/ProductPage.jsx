import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataCategory } from '../Context/CategoryProvider';

const ProductPage = () => {
    const { name } = useParams(); // รับ productId จาก URL parameter
    const dataCategory = useContext(DataCategory);

    // สร้าง state สำหรับเก็บข้อมูลสินค้า
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // สร้าง state สำหรับจำนวนสินค้า

    useEffect(() => {
        // ตรวจสอบว่ามีข้อมูลใน dataCategory หรือไม่
        if (dataCategory && dataCategory.length > 0) {
            // ค้นหาสินค้าจาก dataCategory ที่มี id ตรงกับ name
            const foundProduct = dataCategory.find(item => item.name === name);
            setProduct(foundProduct);
        }
    }, [name, dataCategory]);

    if (!product) {
        return <div>Loading...</div>;
    }

    // ฟังก์ชันสำหรับเพิ่ม/ลดจำนวนสินค้า
    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            setQuantity(quantity + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto p-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* รูปภาพสินค้า */}
                <div className="w-full md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* รายละเอียดสินค้า */}
                <div className="w-full md:w-1/2">
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl mb-4">${product.price}</p>
                    <p className="text-lg text-gray-700 mb-8">{product.description}</p>

                    {/* ปุ่มเพิ่ม/ลดจำนวนสินค้า */}
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

                    <button className="w-full py-4 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* คำบรรยายสินค้า */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Descriptions</h2>
                <p className="text-gray-700 mb-6">
                    Transform your home into a personal gallery with unique art that speaks to you. Each piece is a celebration of creativity, printed on premium paper that brings every detail to life.
                </p>
            </div>

            {/* สเปคและรายละเอียดเพิ่มเติม */}
            <div className="mt-8 border-t border-gray-300">
                {/* Specs */}
                <div className="py-6 border-b border-gray-300">
                    <h3 className="text-lg font-bold flex items-center justify-between">
                        Specs
                        <button className="text-gray-500 text-2xl">+</button>
                    </h3>
                </div>
                {/* Size & Fit */}
                <div className="py-6 border-b border-gray-300">
                    <h3 className="text-lg font-bold flex items-center justify-between">
                        Size & Fit
                        <button className="text-gray-500 text-2xl">+</button>
                    </h3>
                </div>
                {/* Sustainability */}
                <div className="py-6 border-b border-gray-300">
                    <h3 className="text-lg font-bold flex items-center justify-between">
                        Sustainability
                        <button className="text-gray-500 text-2xl">+</button>
                    </h3>
                </div>
                {/* Shipping */}
                <div className="py-6">
                    <h3 className="text-lg font-bold flex items-center justify-between">
                        Shipping
                        <button className="text-gray-500 text-2xl">+</button>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;