import logo from "../assets/logo.svg";
import logoIcon from "../assets/logo-icon.svg";
import logoName from "../assets/Handy Haven.svg";
import search from "../assets/search.svg";
import login from "../assets/login.svg";
import cart from "../assets/cart.svg";
import burger from "../assets/burger.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import CartConfirm from "./CartConfirm";

function Navbar() {
  const [isToggle, setIsToggle] = useState(false);

  const handleToggle = () => {
    if (!isToggle) {
      <CartConfirm />
    }
  }

  return (
    <div className="w-full h-full bg-[#4A4947] text-white ">
      <div className="flex items-center h-fit justify-between px-[32px] py-[16px] relative max-lg:px-[12px]">
        <Link className="flex items-center justify-center max-lg:hidden" to="/" >
          <img className="h-[48px]" src={logo} alt="logo" />
        </Link>
        <Link className="flex space-x-2 lg:hidden" to="/">
          <img className="h-[48px]" src={logoIcon} alt="logo-icon" />
          <img className="sm-hidden" src={logoName} alt="handy-heaven" />
        </Link>
        <nav className="absolute transform -translate-x-1/2 left-1/2 max-md:hidden">
          <ul className="flex items-center space-x-6 text-center">
            <Link className="hover:underline hover:decoration-solid" to="/homeallproducts">All Product</Link>
            <Link className="hover:underline hover:decoration-solid" to="/homedecor">Home Decor</Link>
            <Link className="hover:underline hover:decoration-solid" to="/bathbody">Bath & Body</Link>
            <Link className="hover:underline hover:decoration-solid" to="/apparel">Apparel</Link>
            <Link className="hover:underline hover:decoration-solid" to="/accessories">Accessories</Link>
          </ul>
        </nav>
        <div className="flex space-x-4 max-md:absolute max-md:transform max-md:-translate-x-1/2 max-md:left-1/2">
          <Link to='/login'><img className="w-[24px] h-[24px]" src={login} alt="login-icon" /></Link>
          <Link to='/cartpage'><img className="w-[24px] h-[24px]" src={cart} alt="cart-icon" /></Link>
        </div>

          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer-4" className=""><img src={burger} alt="burger-icon" /></label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="min-h-full p-4 bg-white menu text-base-content w-80">
                  {/* Sidebar content here */}
                  <li><Link className="hover:underline hover:decoration-solid" to="/homeallproducts">All Product</Link></li>
                  <li><Link className="hover:underline hover:decoration-solid" to="/homedecor">Home Decor</Link></li>
                  <li><Link className="hover:underline hover:decoration-solid" to="/bathbody">Bath & Body</Link></li>
                  <li><Link className="hover:underline hover:decoration-solid" to="/apparel">Apparel</Link></li>
                  <li><Link className="hover:underline hover:decoration-solid" to="/accessories">Accessories</Link></li>
                </ul>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar