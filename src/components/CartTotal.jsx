import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const CartTotal = ({className}) => {
    const { getCartAmount } = useContext(ShopContext);

    return (
        <div className={`${className} space-y-4`}>
            <div className="flex justify-between font-bold">
                <span>Subtotal:</span>
                <span>฿{getCartAmount()}</span>
            </div>
            <div className="flex justify-between font-bold">
                <span>Shipping:</span>
                <span>฿10</span>
            </div>
            <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>฿{getCartAmount() + 10}</span>
            </div>
        </div>
    );
};

export default CartTotal;
