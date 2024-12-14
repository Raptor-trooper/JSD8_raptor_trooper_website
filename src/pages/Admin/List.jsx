// import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { ShopContext } from "../../Context/ShopContext";
// import { FaTrash, FaBoxOpen } from "react-icons/fa"; 
// import { BsFillCartFill } from "react-icons/bs";
// import Swal from "sweetalert2";

// const List = () => {
//   const { Api } = useContext(ShopContext);
//   const [list, setList] = useState([]);

//   const fetchList = async () => {
//     try {
//       const response = await axios.get(`${Api}/product/list`);
//       if (response.data.success) {
//         setList(response.data.products.reverse());
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const removeProduct = async (id) => {
//       try {
//           const result = await Swal.fire({
//               title: "Are you sure?",
//               text: "You won't be able to revert this!",
//               icon: "warning",
//               showCancelButton: true,
//               confirmButtonColor: "#3085d6",
//               cancelButtonColor: "#d33",
//               confirmButtonText: "Yes, delete it!"
//           });
  
//           if (result.isConfirmed) {
//               const response = await axios.post(
//                   `${Api}/product/remove`,
//                   { id },
//               );
  
//               if (response.data.success) {
//                   Swal.fire("Deleted!", response.data.message, "success");
//                   await fetchList();
//               } else {
//                   toast.error(response.data.message);
//               }
//           }
//       } catch (error) {
//           console.log(error);
//           toast.error(error.message);
//       }
//   };

  

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <div className="max-w-screen-lg mx-auto">
//       {/* หัวข้อ "Product List" */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold mb-6">
//          Product List
//         </h1>
//       </div>

//       {/* Scrollable Table */}
//       <div className="overflow-y-auto max-h-[70vh] border border-gray-300 rounded-md">
//         <table className="w-full text-left border-collapse">
//           <thead className="bg-gray-100 text-sm sticky top-0">
//             <tr>
//               <th className="border border-gray-300 p-3">Image</th>
//               <th className="border border-gray-300 p-3">Name</th>
//               <th className="border border-gray-300 p-3">Category</th>
//               <th className="border border-gray-300 p-3">Price</th>
//               <th className="border border-gray-300 p-3 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {list.length > 0 ? (
//               list.map((item, index) => (
//                 <tr
//                   key={index}
//                   className={`${
//                     index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                   } hover:bg-gray-200`}
//                 >
//                   <td className="border border-gray-300 p-3">
//                     <img
//                       src={item.image[0]}
//                       alt={item.name}
//                       className="w-12 h-12 object-cover rounded"
//                     />
//                   </td>
//                   <td className="border border-gray-300 p-3 truncate">
//                     {item.name}
//                   </td>
//                   <td className="border border-gray-300 p-3 flex items-center gap-2">
//                     <FaBoxOpen className="text-blue-500" />
//                     {item.category}
//                   </td>
//                   <td className="border border-gray-300 p-3">฿{item.price}</td>
//                   <td className="border border-gray-300 p-3 text-center">
//                     <button
//                       onClick={() => removeProduct(item._id)}
//                       className="bg-red-500 text-white px-4 py-1 rounded flex items-center justify-center gap-2 hover:bg-red-600"
//                     >
//                       <FaTrash /> Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="border border-gray-300 text-center p-3"
//                 >
//                   No products available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default List;


import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../../Context/ShopContext";
import { AiOutlineDelete } from "react-icons/ai"; // ใช้ React Icon สำหรับปุ่ม Delete
import Swal from "sweetalert2";

const List = () => {
  const { Api } = useContext(ShopContext);
  const [list, setList] = useState([]);

  // ฟังก์ชันดึงข้อมูลสินค้า
  const fetchList = async () => {
    try {
      const response = await axios.get(`${Api}/product/list`);
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
            );

            if (response.data.success) {
                Swal.fire("Deleted!", response.data.message, "success");
                await fetchList();
            } else {
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
      <h1 className="text-4xl font-bold mb-6">Product List</h1>

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
            <img className="w-30 h-30 object-cover rounded" src={item.image[0]} alt={item.name} />

            {/* ชื่อสินค้า */}
            <div>
              <p className="font-semibold truncate">{item.name}</p>
              <p className="text-gray-500 text-sm">{item.category}</p>
            </div>

            {/* หมวดหมู่สินค้า (สำหรับหน้าจอใหญ่) */}
            <p className="hidden md:block">{item.category}</p>

            {/* ราคา (สำหรับหน้าจอใหญ่) */}
            <p className="hidden md:block">฿{item.price}</p>

            {/* ปุ่มลบสินค้า */}
            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-500 hover:text-red-700 flex items-center justify-center"
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