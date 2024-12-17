import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import CartTotal from "../components/CartTotal";
import ButtonX from "../components/ButtonX";


const CartPage = () => {
  const { cartItems, updateQuantity, category } =
    useContext(ShopContext);
  const navigate = useNavigate();

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

  return (
    <div className="max-w-screen-xl p-8 mx-auto">
      <div className="mb-3 text-2xl ">
        <h1>Cart</h1>
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = category.find((cate) => cate._id === item._id);

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6 ">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs font-medium sm:text-lg">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{productData.price}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(item._id, Number(e.target.value))
                }
                className="px-1 py-1 border max-w-10 sm:max-w-20 sm:px-2"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />

              <ButtonX
                onClick={() => updateQuantity(item._id, 0)}
              >
              </ButtonX>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/checkoutpage")}
              className="mt-3 button"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;