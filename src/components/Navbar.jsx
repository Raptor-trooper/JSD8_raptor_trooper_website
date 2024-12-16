import logo from "../assets/logo.svg";
import logoIcon from "../assets/logo-icon.svg";
import logoName from "../assets/Handy Haven.svg";
import login from "../assets/login.svg";
import cart from "../assets/cart.svg";
import burger from "../assets/burger.svg";
import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CartConfirm from "./CartConfirm";
import { ShopContext } from "../Context/ShopContext";

function Navbar() {
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { cartItems, token, setToken, isAdmin, getCartCount } = useContext(ShopContext);

  // const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // console.log("CARTITEM = ", cartItems);

  const handleBurger = () => {
    setBurgerOpen(!isBurgerOpen);
  };
  const handleOpenCart = () => {
    setIsCartOpen(true);
  };
  const handleCloseCart = () => {
    setIsCartOpen(false);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken("");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // ซ่อน Navbar เมื่อเลื่อนลง
      } else {
        setShowNavbar(true); // แสดง Navbar เมื่อเลื่อนขึ้น
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
  <div>
      <div
      className={`w-full h-auto bg-black fixed top-0 left-0 z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* bg-[#4A4947] */}
      <div className="flex items-center h-fit justify-between px-[32px] text-white py-[16px] relative max-lg:px-[12px]">
        {/* Logo */}
        <Link className="flex items-center justify-center max-lg:hidden" to="/">
          <img className="h-[48px]" src={logo} alt="logo" />
        </Link>
        <Link className="flex space-x-2 lg:hidden" to="/">
          <img className="h-[48px]" src={logoIcon} alt="logo-icon" />
          <img className="sm-hidden" src={logoName} alt="handy-heaven" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="absolute transform -translate-x-1/2 left-1/2 max-md:hidden">
          <ul className="flex items-center space-x-6 text-center">
            <Link
              className="relative font-medium text-white transition-colors duration-300 group hover:text-gray-300"
              to="/homeallproducts"
            >
              All Product
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link
              className="relative font-medium text-white transition-colors duration-300 group hover:text-gray-300"
              to="/homedecor"
            >
              Home Decor
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link
              className="relative font-medium text-white transition-colors duration-300 group hover:text-gray-300"
              to="/bathbody"
            >
              Bath & Body
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link
              className="relative font-medium text-white transition-colors duration-300 group hover:text-gray-300"
              to="/apparel"
            >
              Apparel
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link
              className="relative font-medium text-white transition-colors duration-300 group hover:text-gray-300"
              to="/accessories"
            >
              Accessories
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0"></span>
            </Link>
          </ul>
        </nav>

        {/* Icons */}
        <div className="flex space-x-4 max-md:absolute max-md:transform max-md:-translate-x-1/2 max-md:left-1/2">
          {/* <Link to='/login'><img className="w-[24px] h-[24px]" src={login} alt="login-icon" /></Link> */}

          {/* Dropdown menu */}
          <div className="relative px-2 bg-black group dropdown">
            {token ? (
              <img
                className="w-[24px] h-[24px] cursor-pointer"
                src={login}
                alt="login-icon"
              />
            ) : (
              <Link className="block" to="/login">
                <div className="cursor-pointer">Login</div>
              </Link>
            )}

            {token && (
              <div className="absolute invisible transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:visible group-hover:translate-y-1 right-1 ">
                <ul className="top-0 flex flex-col w-32 gap-2 p-4 bg-black rounded-lg shadow">
                  <li className="transition duration-300 ease-in-out rounded cursor-pointer hover:bg-gray-800">
                    <Link className="block " to="/userprofile">
                      User Profile
                    </Link>
                  </li>
                  {isAdmin && (
                    <li className="transition duration-300 ease-in-out rounded cursor-pointer hover:bg-gray-800">
                      <Link className="block" to="/admin">
                        Admin
                      </Link>
                    </li>
                  )}
                  {token && (
                    <>
                      <li className="transition duration-300 ease-in-out rounded cursor-pointer hover:bg-gray-800">
                        <Link className="block" to="/cartpage">
                          Orders
                        </Link>
                      </li>
                      <li
                        onClick={logout}
                        className="transition duration-300 ease-in-out rounded cursor-pointer hover:bg-gray-800"
                      >
                        <Link className="block" to="/login">
                          Logout
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
          <button onClick={() => handleOpenCart()} className="relative">
            <img className="w-[24px] h-[24px]" src={cart} alt="cart-icon" />
            <p className="absolute right-[-8px] top-[-8px]  w-4 text-center leading-4 bg-red-500  text-white  aspect-square rounded-full text-sm">
              {getCartCount()}
            </p>
          </button>
        </div>

        <button className="md:hidden" onClick={handleBurger}>
          <img src={burger} alt="burger-icon" />
        </button>
      </div>

      {/* Burger Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[600px] z-50 bg-black text-white shadow-lg transform transition-all duration-300 ease-in-out ${
          isBurgerOpen
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-end p-4">
          <button onClick={handleBurger} className="text-xl font-semibold">
            CLOSE
          </button>
        </div>
        <ul className="flex flex-col w-full h-screen space-y-6 text-center bg-black items-left">
          <Link onClick={handleBurger} to="/homeallproducts">
            All Product
          </Link>
          <Link onClick={handleBurger} to="/homedecor">
            Home Decor
          </Link>
          <Link onClick={handleBurger} to="/bathbody">
            Bath & Body
          </Link>
          <Link onClick={handleBurger} to="/apparel">
            Apparel
          </Link>
          <Link onClick={handleBurger} to="/accessories">
            Accessories
          </Link>
        </ul>
      </div>

    </div>
    <CartConfirm isOpen={isCartOpen} onClose={handleCloseCart} />
  </div>
  );
}

export default Navbar;
