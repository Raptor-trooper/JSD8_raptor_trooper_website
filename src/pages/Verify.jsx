/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Verify = () => {
    const { Api, token, setCartItems } = useContext(ShopContext);
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null;
            }

            const response = await axios.post(
                `${Api}/order/verifyStripe`,
                { success, orderId },
                { headers: { authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setCartItems({});
                navigate("/userprofile");
            } else {
                console.log('Payment verification failed:', response.data.message);
                navigate("/cartpage");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [token]);

    return <div></div>;
};

export default Verify;
