import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
      // ตรวจสอบ Name
      if (currentState === "Sign Up") {
        if (!/^[A-Za-zก-๙\s]+$/.test(name)) {
          Swal.fire({
            title: "Invalid Name",
            text: "Name can only contain English letters, Thai letters, and spaces.",
            icon: "error",
          });
          return;
        }
        // Validate Name
        if (name.length > 50) {
          Swal.fire({
            title: "Invalid Name",
            text: "Name must not exceed 50 characters.",
            icon: "error",
          });
          return;
        }
      }

      // ตรวจสอบ Email
      if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        Swal.fire({
          title: "Invalid Email",
          text: "Please enter a valid email address.",
          icon: "error",
        });
        return;
      }
      if (email.length > 254) {
        Swal.fire({
          title: "Invalid Email",
          text: "Email must not exceed 254 characters.",
          icon: "error",
        });
        return;
      }
      // ตรวจสอบ Password
      if (password.length < 8 || password.length > 72) {
        Swal.fire({
          title: "Invalid Password",
          text: "Password must be between 8 and 72 characters.",
          icon: "error",
        });
        return;
      }
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
            icon: "error",
          });
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
            text: "Email or password is incorrect.",
            icon: "error",
          });
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
        icon: "success",
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
      <form className=" w-80" onSubmit={onSubmitHandler}>
        {/* Name (only for Sign Up) */}
        {currentState === "Sign Up" && (
          <div>
            <label className="mb-1 text-xl font-medium">Name</label>
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
        <div className="mt-4">
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
          // className="text-xl w-full p-3  text-white transition bg-gray-800 rounded-none shadow-lg hover:bg-gradient-to-tr hover:from-black hover:to-blue-700 mt-7"
          className="button w-full mt-7"
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
