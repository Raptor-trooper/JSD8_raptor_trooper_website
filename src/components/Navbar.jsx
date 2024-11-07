import logo from "../assets/logo.svg";
import search from "../assets/search.svg";
import login from "../assets/login.svg";
import cart from "../assets/cart.svg";

function Navbar() {
  return (
    <div className="w-full h-[167px] bg-[#4A4947] text-white">
      <div className="flex items-center flex-col h-full justify-between py-[16px] px-[32px]">
        <div className="flex relative justify-between items-center w-full">
           <div className="flex items-center justify-center flex-grow">
            <img src={logo} alt="logo" />
          </div>
          <div className="flex absolute right-0">
            <img className="w-[35px] h-[35px]" src={search} alt="search-icon" />
            <img className="w-[35px] h-[35px]" src={login} alt="login-icon" />
            <img className="w-[35px] h-[35px]" src={cart} alt="cart-icon" />
          </div>
        </div>

        <nav>
          <ul className="flex gap-4">
            <li>All Product</li>
            <li>Hone Decor</li>
            <li>Bath & Body</li>
            <li>Apparel</li>
            <li>Accessories</li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar