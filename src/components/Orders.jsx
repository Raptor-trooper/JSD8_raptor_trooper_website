/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";

const Orders = () => {
  const { Api, token } = useContext(ShopContext);

  const [orderData, setorderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        `${Api}/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setorderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="p-6 space-y-6 overflow-y-auto" style={{ maxHeight: "60vh" }}>
      {orderData.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-3 items-center bg-white p-4 rounded-lg shadow-md gap-4 border border-gray-200"
        >
          {/* รูปภาพสินค้า */}
          <img className="w-[150px] sm:w-[150px] h-[150px] sm:h-[150px] rounded-md" src={item.image[0]} alt={item.name} />
          <div className="flex-1">
            <p className="font-semibold text-base sm:text-lg text-gray-800 my-1">{item.name}</p>
            <div className="">
              <p>฿{item.price}</p>
              <p className="my-1">Quantity: {item.quantity}</p>
            </div>
          </div>

          <div className="flex-1">
            <p className="my-1">
              Date: <span className="text-gray-500">{new Date(item.date).toDateString()}</span>
            </p>
            <div>
              <p className="mt-1 my-1">
                Payment: <span className="text-gray-500">{item.paymentMethod}</span>
              </p>
              <p>Status : <span className="text-gray-500">{item.status}</span></p>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                {/* ข้อความ open */}
                <p className="text-gray-700 flex items-center">completed</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

  );
};

export default Orders;
