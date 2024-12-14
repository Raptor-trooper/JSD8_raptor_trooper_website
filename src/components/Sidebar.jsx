import { NavLink } from "react-router-dom"; 
import { FiPlusCircle, FiList, FiShoppingCart } from "react-icons/fi";
import { assets } from "../assets/admin/assets";


const Sidebar = () => {
  return (
      <div className="bg-gray-800 text-white w-64 h-full">
          <h2 className="text-2xl font-bold p-6 border-b border-gray-700">Admin Panel</h2>
          <ul className="mt-4">
              <li>
                  <NavLink
                      to="add"
                      className={({ isActive }) =>
                          `flex items-center gap-3 p-4 ${
                              isActive ? "bg-gray-700" : "hover:bg-gray-700"
                          }`
                      }
                  >
                      <FiPlusCircle />
                      Add Product
                  </NavLink>
              </li>
              <li>
                  <NavLink
                      to="list"
                      className={({ isActive }) =>
                          `flex items-center gap-3 p-4 ${
                              isActive ? "bg-gray-700" : "hover:bg-gray-700"
                          }`
                      }
                  >
                      <FiList />
                      Product List
                  </NavLink>
              </li>
              <li>
                  <NavLink
                      to="orders"
                      className={({ isActive }) =>
                          `flex items-center gap-3 p-4 ${
                              isActive ? "bg-gray-700" : "hover:bg-gray-700"
                          }`
                      }
                  >
                      <FiShoppingCart />
                      Orders
                  </NavLink>
              </li>
          </ul>
      </div>
  );
};

export default Sidebar;