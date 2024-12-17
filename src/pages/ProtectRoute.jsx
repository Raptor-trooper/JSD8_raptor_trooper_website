import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../Context/ShopContext";
import Loading from "../components/Loading";

const ProtectRoute = ({ children }) => {
  const { Api, token } = useContext(ShopContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    checkRole();
  }, []);

  const checkRole = async () => {
    try {
      const response = await axios.post(
        `${Api}/product/checkrole`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if ( response.data && response.data.role !== "admin") {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/")
        }, 3000)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  };

  if (loading) {
    return <Loading />
  } else {
    return children
  }
};

export default ProtectRoute;
