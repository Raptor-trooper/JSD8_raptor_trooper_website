import { NavLink } from "react-router-dom";
import { FiPlusCircle, FiList, FiShoppingCart } from "react-icons/fi";

const Sidebar = () => {
  return (
      <div className="w-64 h-auto text-white bg-gray-800">
          <h2 className="p-6 text-2xl font-bold border-b border-gray-700">Admin Panel</h2>
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