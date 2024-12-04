import logo from "../assets/logo.svg";
import logoIcon from "../assets/logo-icon.svg";
import logoName from "../assets/Handy Haven.svg";
import login from "../assets/login.svg";
import cart from "../assets/cart.svg";
import burger from "../assets/burger.svg";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CartConfirm from "./CartConfirm";
import { CartContext } from '../Context/CartContext';


function Navbar() {
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, remove } = useContext(CartContext);

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

    // Toggle body scrolling
    useEffect(() => {
      if (isBurgerOpen) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    }, [isBurgerOpen]);

  return (
    <div className="w-full h-full bg-[#4A4947] text-white ">
      <div className="flex items-center h-fit justify-between px-[32px] py-[16px] relative max-lg:px-[12px]">
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
          <Link to='/login'><img className="w-[24px] h-[24px]" src={login} alt="login-icon" /></Link>
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
        <div className={`fixed top-0 right-0 h-full w-full md:w-[600px] z-50 bg-[#4A4947] text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isBurgerOpen ? "translate-x-0" : "translate-x-full"
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