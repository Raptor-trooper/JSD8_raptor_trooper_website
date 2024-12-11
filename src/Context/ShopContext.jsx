import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { toast } from "react-toastify";
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

    const [category, setCategory] = useState([]);
    const [cartItems, setCartItems] = useState({});
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

    // // ฟังก์ชันสำหรับเพิ่มสินค้าเข้า Cart
    // const addToCart = (product) => {
    //     // ตรวจสอบว่าสินค้านี้มีอยู่ใน cartItems หรือไม่
    //     const existingItemIndex = cartItems.findIndex(
    //         (item) => item.name === product.name
    //     );
    //     if (existingItemIndex >= 0) {
    //         // ถ้ามีแล้วให้เพิ่มจำนวน
    //         const updatedCartItems = [...cartItems];
    //         updatedCartItems[existingItemIndex].quantity += product.quantity;
    //         setCartItems(updatedCartItems);
    //     } else {
    //         // ถ้ายังไม่มีให้เพิ่มเข้าไปใหม่
    //         setCartItems([...cartItems, product]);
    //     }
    // };

    const addToCart = async (itemId) => {

        let cartData = structuredClone(cartItems);

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
                    { itemId }, // Data ที่จะส่งไป
                    {
                        headers: {
                            authorization: `Bearer ${token}` // ใส่ Token ใน Header
                        }
                    }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };
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

    const updateQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    `${Api}/cart/update`,
                    { itemId, quantity },
                    {
                        headers: {
                            authorization: `Bearer ${token}` // ใส่ Token ใน Header
                        }
                    }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
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

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(
                `${Api}/cart/get`,
                {},
                {
                    headers: {
                        authorization: `Bearer ${token}` // ใส่ Token ใน Header
                    }
                }
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