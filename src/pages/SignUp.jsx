import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Validate username
    if (!formData.username) {
      newErrors.username = 'Username is required.';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      newErrors.username = 'Username must contain only letters and numbers.';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
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
      alert('Sign up successful!'); // Replace with actual API call
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-8">Sign up</h1>
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

        {/* Confirm Password */}
        <div>
          <label className="text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
        >
          Sign up
        </button>

        {/* Log In Link */}
        <div className="flex justify-center mt-4">
          <p className="text-sm text-gray-600">
            Have an account?
            <a href="/login" className="ml-2 text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
