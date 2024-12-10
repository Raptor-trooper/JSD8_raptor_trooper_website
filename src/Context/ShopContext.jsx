import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

    const [category, setCategory] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [token, setToken] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const Api = import.meta.env.VITE_BACKEND_URL;

    const FetchCategory = async () => {
        try {
            const response = await axios.get(`${Api}/product/list`)
            setCategory(response.data.products)
        } catch (error) {
            console.log('Error get Api', error);
        }
    }

    // ฟังก์ชันสำหรับเพิ่มสินค้าเข้า Cart
    const addToCart = (product) => {
        // ตรวจสอบว่าสินค้านี้มีอยู่ใน cartItems หรือไม่
        const existingItemIndex = cartItems.findIndex(
            (item) => item.name === product.name
        );
        if (existingItemIndex >= 0) {
            // ถ้ามีแล้วให้เพิ่มจำนวน
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += product.quantity;
            setCartItems(updatedCartItems);
        } else {
            // ถ้ายังไม่มีให้เพิ่มเข้าไปใหม่
            setCartItems([...cartItems, product]);
        }
    };

    // ฟังก์ชันสำหรับลบสินค้าออกจาก Cart
    const removeFromCart = (index) => {
        setCartItems(cartItems.filter((_, i) => i !== index));
    };

    useEffect(() => {
        FetchCategory()
    }, [])

    // เรียกใช้ token จาก localstorage
    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
          }
        if (localStorage.getItem("role") === "admin") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [token])

    const value = {
        category,
        cartItems, addToCart, removeFromCart, setCartItems,
        token, setToken,
        isAdmin, setIsAdmin,
    
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider