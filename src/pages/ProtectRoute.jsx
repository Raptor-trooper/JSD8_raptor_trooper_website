import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../Context/ShopContext";
import Loading from "../components/Loading";

const ProtectRoute = ({ children, requiedRoles = [] }) => {
  const { Api } = useContext(ShopContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(false);

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (role !== "admin" && requiedRoles[0] !== "admin") {
    return <Navigate to="/403" replace />;
  }

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
