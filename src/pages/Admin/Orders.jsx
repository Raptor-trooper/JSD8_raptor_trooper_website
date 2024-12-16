import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/admin/assets";
import { ShopContext } from "../../Context/ShopContext";
import { FaTruck, FaBox, FaPhoneAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { Api, token } = useContext(ShopContext);
  const MySwal = withReactContent(Swal);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${Api}/order/list`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`, // ใส่ Token ใน Header
          },
        }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    MySwal.fire({
      title: "Confirm Status Change",
      text: `Are you sure to change status to "${newStatus}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${Api}/order/status`,
            { orderId, status: newStatus },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            toast.success("Status updated successfully");
            await fetchAllOrders();
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-4xl font-bold mb-4 ">Order Management</h3>
      {/* เพิ่ม Scroll ที่นี่ */}
      <div
        className="overflow-y-auto max-h-[500px] border border-gray-300 rounded-lg shadow-md"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#ccc #f0f0f0" }}
      >
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-center border-b border-gray-200 p-4 bg-white"
          >
            <div className="flex items-center justify-center">
              <img className="w-12" src={assets.parcel_icon} alt="Parcel" />
            </div>
            <div>
              <p className="text-lg font-semibold mb-2">Order Items</p>
              {order.items.map((item, idx) => (
                <p key={idx} className="text-sm text-gray-700">
                  <FaBox className="inline mr-2 text-gray-500" />
                  {item.name} x {item.quantity}
                </p>
              ))}
              <p className="text-sm mt-4 font-medium">
                {order?.delivery?.firstName} {order?.delivery?.lastName}
              </p>
              <p className="text-sm text-gray-600">
                <FaPhoneAlt className="inline mr-2 text-gray-500" />
                {order?.delivery?.phone}
              </p>
              <p className="text-sm font-medium">
                {order?.delivery?.address} {order?.delivery?.country}{" "}
                {order?.delivery?.city} {order?.delivery?.zip}
              </p>
            </div>
            <div>
              <p className="text-sm">Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div className="text-lg font-bold text-center text-green-600">
              ${order.amount}
            </div>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 border border-gray-300 rounded-lg bg-gray-100 font-semibold focus:outline-none"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
