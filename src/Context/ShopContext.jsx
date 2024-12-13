import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from "react-toastify";
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

    const [category, setCategory] = useState([]);
    const [cartItems, setCartItems] = useState({}); // ตัวอย่าง {6753df71ab254052ebe066f4: 3}
    const [token, setToken] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const Api = import.meta.env.VITE_BACKEND_URL;

    // ฟังก์ชั่น ดึงข้อมูลสินค้า mongoDB
    const FetchCategory = async () => {
        try {
            const response = await axios.get(`${Api}/product/list`)
            setCategory(response.data.products)
        } catch (error) {
            console.log('Error get Api', error);
        }
    }

    // Function AddToCart to Backend
    const addToCart = async (itemId) => {

        let cartData = structuredClone(cartItems); // cartData คือร่างแยกของ cartItems

        if (cartData[itemId]) {
            if (cartData[itemId]) {
                cartData[itemId] += 1;
            } else {
                cartData[itemId] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(
                    `${Api}/cart/add`,
                    { itemId }, { headers: { authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    // ฟังก์ชั่น รวมจำนวน ชิ้น สินค้า
    const getCartCount = () => {

        let totalCount = 0;

        for (const items in cartItems) {
            try {
                if (cartItems[items] > 0) {
                    totalCount += cartItems[items];
                }
            } catch (error) {
                console.log(error);
            }
        }
        return totalCount;
    };

    // ฟังก์ชั่น update จำนวนสินค้า
    const updateQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems); // cartData คือ ร่างแยกของ cartItems

        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    `${Api}/cart/update`,
                    { itemId, quantity }, { headers: { authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    // ฟังก์ชั่น คำนวณ ราคาสินค้า
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) { // items คือ จำนวนสินค้า
            let itemInfo = category.find((product) => product._id === items);
            try {
                if (cartItems[items] > 0) {
                    totalAmount += itemInfo.price * cartItems[items];
                }
            } catch (error) {
                console.log(error);
            }
        }
        return totalAmount;
    };

    // ฟังก์ชั่น เรียกดู สินค้า ในตระกร้าโดยการ ส่ง token ไป backend ละส่ง cartdata จาก mongoDB กลับมา
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(
                `${Api}/cart/get`,
                {},
                { headers: { authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // ฟังก์ชันสำหรับลบสินค้าออกจาก Cart
    const removeFromCart = (index) => {
        setCartItems(cartItems.filter((_, i) => i !== index));
    };

    // เรียก product จาก mongoDB
    useEffect(() => {
        FetchCategory()
    }, [])

    // เรียกใช้ token จาก localstorage
    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            getUserCart(localStorage.getItem("token"));
        }
        if (localStorage.getItem("role") === "admin") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
        if (token) {
            getUserCart(token);
        }
    }, [token])

    const value = {
        category,
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
        getCartCount,
        getCartAmount,
        token,
        setToken,
        isAdmin,
        setIsAdmin,
        updateQuantity,
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider