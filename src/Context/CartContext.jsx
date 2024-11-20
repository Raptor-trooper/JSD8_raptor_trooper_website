// CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

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

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
