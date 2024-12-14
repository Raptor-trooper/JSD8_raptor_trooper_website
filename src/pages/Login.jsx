import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
          toast.error(response.data.message);
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
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-8 text-3xl font-semibold">
        {currentState === "Login" ? "Log in" : "Sign Up"}
      </h1>
      <form className=" w-80" onSubmit={onSubmitHandler}>
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
          <label className="mb-1 text-xl font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-md  mt-1 w-full p-3 border rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="text-xl font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPasword(e.target.value)}
            className="text-md mt-1 w-full p-3  border rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
          <button
            type="submit"
            className="text-xl w-full p-3  text-white transition bg-black rounded-none shadow-lg hover:bg-gradient-to-tr hover:from-black hover:to-blue-700 mt-7"
          >
            {currentState === "Login" ? "Log in" : "Sign Up"}
          </button>


        {/* Toggle Login/Sign Up */}
        <div className="flex justify-center mt-4">
          <p className="text-md text-gray-600">
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
