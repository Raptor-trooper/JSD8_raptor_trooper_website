import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const ShopContext = createContext();
import Swal from 'sweetalert2'

const ShopContextProvider = ({ children }) => {

    const [category, setCategory] = useState([]);
    const [cartItems, setCartItems] = useState({}); // ตัวอย่าง {6753df71ab254052ebe066f4: 3}
    const [token, setToken] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [updateUserInfo, setUpdateUserInfo] = useState(false)

    const Api = import.meta.env.VITE_BACKEND_URL;

    const userInfo = {
        name: "",
        email: "",
        delivery: {
            firstName: "",
            lastName: "",
            country: "",
            address: "",
            city: "",
            zip: "",
            phone: "",
        }
    }
    const [user, setUser] = useState(userInfo);

    // ฟังก์ชั่น ดึงข้อมูลสินค้า mongoDB
    const FetchCategory = async () => {
        try {
            const response = await axios.get(`${Api}/product/list`)
            setCategory(response.data.products)
        } catch (error) {
            console.log('Error get Api', error);
        }
    }

    // get user profile from backend
    const getProfile = async () => {
        try {
            const response = await axios.get(
                `${Api}/user/userprofile`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const data = response.data;
            if (data.success) {
                setUser(data.user)
            } else {
                console.log("Failed to fetch user profile.");
            }
        } catch (error) {
            console.log(error.message);
        }

    }

    // update user profile to backend
    const updateProfile = async (userInfo) => {
        if (token) {
            setUser((prevUser) => ({
                ...prevUser,
                delivery: { ...userInfo },
            }));
            try {
                const response = await axios.post(
                    `${Api}/user/userprofile`,
                    { delivery: userInfo },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (response.data.success) {
                    setUpdateUserInfo(!updateUserInfo)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    // Function AddToCart to Backend
    const addToCart = async (itemId) => {

        Swal.fire({
            title: "Add Product Success",
            icon: "success"
        });

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
                console.log(error.message);
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
                console.log(error.message);
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
                console.log(error.message);
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
                console.log(error.message);
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
            console.log(error.message);
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
            getProfile()
        }
    }, [updateUserInfo, token])

    const value = {
        Api,
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
        user,
        userInfo,
        setUser,
        getProfile,
        updateProfile,
        updateQuantity,
    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider