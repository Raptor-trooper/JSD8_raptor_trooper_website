import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Username is required.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      alert('Login successful!'); // Replace this with your login API call
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-8">Log in</h1>
      <form className="w-80 space-y-4" onSubmit={handleSubmit}>
        {/* Username */}
        <div>
          <label className="text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="text-sm text-red-500 mt-1">{errors.username}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <a href="#" className="text-sm text-gray-600 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
        >
          Log in
        </button>

        {/* Sign Up Button */}
        <div className="flex justify-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?
            <button
              type="button"
              onClick={handleSignUpClick}
              className="ml-2 text-blue-500 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
