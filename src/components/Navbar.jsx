import logo from "../assets/logo.svg";
import logoIcon from "../assets/logo-icon.svg";
import logoName from "../assets/Handy Haven.svg";
import login from "../assets/login.svg";
import cart from "../assets/cart.svg";
import burger from "../assets/burger.svg";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import CartConfirm from "./CartConfirm";
import { ShopContext } from '../Context/ShopContext';


function Navbar() {
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, token, setToken, isAdmin } = useContext(ShopContext);

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleBurger = () => {
    setBurgerOpen(!isBurgerOpen);
  }
  const handleOpenCart = () => {
    setIsCartOpen(true);
  }
  const handleCloseCart = () => {
    setIsCartOpen(false);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  }


  return (
    <div className="w-full h-full bg-[#4A4947] ">
      <div className="flex items-center h-fit justify-between px-[32px] text-white py-[16px] relative max-lg:px-[12px]">
        {/* Logo */}
        <Link className="flex items-center justify-center max-lg:hidden" to="/" >
          <img className="h-[48px]" src={logo} alt="logo" />
        </Link>
        <Link className="flex space-x-2 lg:hidden" to="/">
          <img className="h-[48px]" src={logoIcon} alt="logo-icon" />
          <img className="sm-hidden" src={logoName} alt="handy-heaven" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="absolute transform -translate-x-1/2 left-1/2 max-md:hidden">
          <ul className="flex items-center space-x-6 text-center">
            <Link className="hover:underline hover:decoration-solid" to="/homeallproducts">All Product</Link>
            <Link className="hover:underline hover:decoration-solid" to="/homedecor">Home Decor</Link>
            <Link className="hover:underline hover:decoration-solid" to="/bathbody">Bath & Body</Link>
            <Link className="hover:underline hover:decoration-solid" to="/apparel">Apparel</Link>
            <Link className="hover:underline hover:decoration-solid" to="/accessories">Accessories</Link>
          </ul>
        </nav>

        {/* Icons */}
        <div className="flex space-x-4 max-md:absolute max-md:transform max-md:-translate-x-1/2 max-md:left-1/2">
          {/* <Link to='/login'><img className="w-[24px] h-[24px]" src={login} alt="login-icon" /></Link> */}

          {/* Dropdown menu */}
          <div className="bg-[#4A4947] group relative dropdown px-2">
            <img className="w-[24px] h-[24px] cursor-pointer" src={login} alt="login-icon" />
            
              <div className="absolute hidden h-auto p-4 group-hover:block dropdown-menu right-1">
                <ul className="bg-[#4A4947] flex flex-col gap-2 w-32 top-0 p-4 shadow">
                  {token ? (
                    <>
                      <li className="cursor-pointer"><Link className="block" to='/userprofile'>User Profile</Link></li>
                      {isAdmin && <li className="cursor-pointer"><Link className="block" to='/admin'>Admin</Link></li> }
                    </>
                  ) : (
                    <li className="cursor-pointer"><Link className="block" to='/login'>Login</Link></li>
                  )}
                  <li className="cursor-pointer"><Link className="block" to='/cartpage'>Orders</Link></li>
                  <li onClick={logout} className="cursor-pointer"><Link className="block" to='/login'>Logout</Link></li>
                </ul>
              </div>
         
          </div>
          <button onClick={() => handleOpenCart()}>
            <img className="w-[24px] h-[24px]" src={cart} alt="cart-icon" />
          </button>
        </div>

        <button className="md:hidden" onClick={handleBurger}>
          <img src={burger} alt="burger-icon" />
        </button>

      </div>

      {/* Burger Menu */}
      {isBurgerOpen && (
        <div className={`fixed top-0 right-0 h-full w-full md:w-[600px] z-50 bg-[#4A4947] text-white shadow-lg transform transition-transform duration-300 ease-in-out ${isBurgerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-end p-4">
            <button onClick={handleBurger} className="text-xl font-semibold">CLOSE</button>
          </div>
          <ul className="flex flex-col space-y-6 text-center items-left">
            <Link onClick={handleBurger} to="/homeallproducts">All Product</Link>
            <Link onClick={handleBurger} to="/homedecor">Home Decor</Link>
            <Link onClick={handleBurger} to="/bathbody">Bath & Body</Link>
            <Link onClick={handleBurger} to="/apparel">Apparel</Link>
            <Link onClick={handleBurger} to="/accessories">Accessories</Link>
          </ul>
        </div>
      )}
      <CartConfirm
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        totalAmount={totalAmount}
      />

    </div>
  )
}

export default Navbar