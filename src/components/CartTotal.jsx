import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const CartTotal = () => {
    const { getCartAmount } = useContext(ShopContext);

    return (
        <div className="w-full">
            <div className="flex flex-col gap-2 mt-2 text-sm">
                <h1>Order Summary</h1>
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>
                        {getCartAmount()}.00
                    </p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping Fee</p>
                    <p>
                        10.00
                    </p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <b>Total</b>
                    <b>
                        {getCartAmount() === 0 ? 0 : getCartAmount() + 10}
                        .00
                    </b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;
