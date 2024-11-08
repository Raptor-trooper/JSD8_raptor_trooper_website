import logo from "../assets/logo.svg";
import logoIcon from "../assets/logo-icon.svg";
import logoName from "../assets/Handy Haven.svg";
import search from "../assets/search.svg";
import login from "../assets/login.svg";
import cart from "../assets/cart.svg";
import burger from "../assets/burger.svg";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full h-full bg-[#4A4947] text-white ">
      <div className="flex items-center h-fit justify-between px-[32px] py-[16px] relative max-lg:px-[12px]">
        <div className="flex items-center justify-center max-lg:hidden">
          <img className="h-[48px]" src={logo} alt="logo" />
        </div>
        <div className="flex space-x-2 lg:hidden">
          <img className="h-[48px]" src={logoIcon} alt="logo-icon" />
          <img className="sm-hidden" src={logoName} alt="handy-heaven" />
        </div>
        <nav className="absolute transform -translate-x-1/2 left-1/2 max-md:hidden">
          <ul className="flex items-center space-x-6 text-center">
            <Link className="hover:underline hover:decoration-solid" to='/homeallproducts'>All Product</Link>
            <li className="hover:underline hover:decoration-solid">Home Decor</li>
            <li className="hover:underline hover:decoration-solid">Bath & Body</li>
            <li className="hover:underline hover:decoration-solid">Apparel</li>
            <li className="hover:underline hover:decoration-solid">Accessories</li>
          </ul>
        </nav>
        <div className="flex space-x-4 max-md:absolute max-md:transform max-md:-translate-x-1/2 max-md:left-1/2">
          <img className="w-[24px] h-[24px]" src={search} alt="search-icon" />
          <img className="w-[24px] h-[24px]" src={login} alt="login-icon" />
          <img className="w-[24px] h-[24px]" src={cart} alt="cart-icon" />
        </div>
        <div className="md:hidden">
          <img src={burger} alt="burger-icon" />
        </div>
      </div>
    </div>
  )
}

export default Navbar