import { FaTimes } from "react-icons/fa";

function ButtonX({ onClick }) {
    return (
        <button
            onClick={onClick} 
            className="w-4 mr-4 sm:w-5 cursor-pointer text-black hover:text-red-700 text-2xl flex items-center justify-center"
        >
            <FaTimes />
        </button>
    );
}

export default ButtonX;
