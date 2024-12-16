import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import ButtonX from "./ButtonX";
import CartTotal from "./CartTotal";

const CartConfirm = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, category, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  const filterInvalidCartItems = (cartItems, category) => {
    const validCategoryIds = new Set(category.map((item) => item._id));
    Object.keys(cartItems).forEach((cartItemId) => {
      if (!validCategoryIds.has(cartItemId)) {
        delete cartItems[cartItemId];
      }
    });
    return cartItems;
  };

  useEffect(() => {
    filterInvalidCartItems(cartItems, category);
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
    navigate("/cartpage"); // ย้ายไปที่หน้ารถเข็นสินค้า
  };

  const handleCheckout = () => {
    onClose(); // ปิดหน้า cart confirm
    navigate("/checkoutpage"); // ย้ายไปที่หน้าcheckout
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-white shadow-lg transform 
                ${isOpen ? "translate-x-0" : "translate-x-full"} 
                transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex items-center justify-end p-4 border-b">
        <button
          onClick={onClose}
          className="text-xl font-semibold text-black hover:text-red-700"
        >
          CLOSE
        </button>
      </div>
      <div
        className="p-4 space-y-4 overflow-y-auto"
        style={{ maxHeight: "60vh" }}
      >
        {cartData.map((item, index) => {
          const productData = category.find((cate) => cate._id === item._id);
          return (
            <div
              key={index}
              className="flex items-center justify-between py-4 border-b"
            >
              <div className="flex items-start gap-5 flex-[6]">
                <img
                  className="object-cover w-16 h-16 rounded"
                  src={productData.image[0]}
                  alt={productData.name}
                />
                <div className="flex-1 mx-2">
                  <h3 className="font-semibold">{productData.name}</h3>
                  <div>
                    <p className="font-medium flex-[1]">{productData.price}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center flex-[2]  ">
                <p className="font-medium">{item.quantity}</p>
              </div>
              <ButtonX onClick={() => updateQuantity(item._id, 0)}></ButtonX>
            </div>
          );
        })}
      </div>
      <CartTotal className="p-8" />
      <div className="flex p-4 space-x-4">
        <button className="w-1/2 button " onClick={handleViewCart}>
          VIEW CART
        </button>
        <button className="w-1/2 button" onClick={handleCheckout}>
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartConfirm;
