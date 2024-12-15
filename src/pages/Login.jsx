import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { Api, token, setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${Api}/user/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          Swal.fire({
            title: "Register Fail",
            icon: "error"
          })
        }
      } else {
        const response = await axios.post(`${Api}/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
        } else {
          Swal.fire({
            title: "Login Fail",
            icon: "error"
          })
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      Swal.fire({
        title: "Login Success",
        icon: "success"
      }).then(() => {
        navigate("/");
      });
    }
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-8 text-3xl font-semibold">
        {currentState === "Login" ? "Log in" : "Sign Up"}
      </h1>
      <form className="space-y-4 w-80" onSubmit={onSubmitHandler}>
        {/* Name (only for Sign Up) */}
        {currentState === "Sign Up" && (
          <div>
            <label className="mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label className="mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPasword(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <a href="#" className="text-sm text-gray-600 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 text-white transition bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
        >
          {currentState === "Login" ? "Log in" : "Sign Up"}
        </button>

        {/* Toggle Login/Sign Up */}
        <div className="flex justify-center mt-4">
          <p className="text-sm text-gray-600">
            {currentState === "Login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              type="button"
              onClick={() =>
                setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
              }
              className="ml-2 text-blue-500 hover:underline"
            >
              {currentState === "Login" ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );

};

export default Login; //รอแก้หน้าตากลับ