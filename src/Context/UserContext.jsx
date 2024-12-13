import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Api } from "../App";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const token = localStorage.getItem("token");


  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${Api}/user/userprofile`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const data = response.data;
      if (data.success) {
        setUser(data.user)
      } else {
        toast.error("Failed to fetch user profile.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }
  
  useEffect(() => {
    if (token) getProfile();
  }, [token]);

  const value = {
    user,
    getProfile
  }
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;