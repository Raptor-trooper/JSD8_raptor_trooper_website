import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../../Context/ShopContext";
import { AiOutlineDelete } from "react-icons/ai"; // ใช้ React Icon สำหรับปุ่ม Delete
import Swal from "sweetalert2";

const List = () => {
  const { Api, token } = useContext(ShopContext);
  const [list, setList] = useState([]);

  // ฟังก์ชันดึงข้อมูลสินค้า
  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${Api}/product/list`
      );
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ฟังก์ชันลบสินค้า
  const removeProduct = async (id) => {
    try {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            const response = await axios.post(
                `${Api}/product/remove`,
                { id },
                {
                  headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                Swal.fire("Deleted!", response.data.message, "success");
                await fetchList();
            } else {
                Swal.fire("You can't delete it!");
                toast.error(response.data.message);
            }
        } 
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
};

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-6">
      {/* หัวข้อของหน้า */}
      <h1 className="mb-6 text-4xl font-bold">Product List</h1>

      {/* Container สำหรับ Table */}
      <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
        {/* Table Headers */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-bold">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* รายการสินค้า */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-2 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-2 px-4 border text-sm"
          >
            {/* รูปสินค้า */}
            <img className="object-cover rounded w-30 h-30" src={item.image[0]} alt={item.name} />

            {/* ชื่อสินค้า */}
            <div>
              <p className="font-semibold truncate">{item.name}</p>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>

            {/* หมวดหมู่สินค้า (สำหรับหน้าจอใหญ่) */}
            <p className="hidden md:block">{item.category}</p>

            {/* ราคา (สำหรับหน้าจอใหญ่) */}
            <p className="hidden md:block">฿{item.price}</p>

            {/* ปุ่มลบสินค้า */}
            <button
              onClick={() => removeProduct(item._id)}
              className="flex items-center justify-center text-red-500 hover:text-red-700"
            >
              <AiOutlineDelete className="text-xl" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;