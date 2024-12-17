import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ children, requiedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (role !== "admin" && requiedRoles[0] !== "admin") {
    return <Navigate to="/403" replace />;
  }

  return children
};

export default ProtectRoute;
