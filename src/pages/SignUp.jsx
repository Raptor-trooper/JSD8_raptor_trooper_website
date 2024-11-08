import React from 'react'

const SignUp = () => {
    return (
        <div className="flex flex-col items-center justify-center py-10 bg-gray-100">
          <h1 className="text-3xl font-semibold mb-8">Sign up</h1>
          <div className="w-80 space-y-4">
            {/* First Name */}
            <div>
              <label className="text-sm font-medium mb-1">First name</label>
              <input
                type="text"
                placeholder="Enter Username"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            {/* Last Name */}
            <div>
              <label className="text-sm font-medium mb-1">Last name</label>
              <input
                type="text"
                placeholder="Enter Password"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            {/* Email */}
            <div>
              <label className="text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            {/* Phone Number */}
            <div>
              <label className="text-sm font-medium mb-1">Phone number</label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            {/* Password */}
            <div>
              <label className="text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
           {/* Sign Up Button */}
        <button className="w-full p-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
          Sign up
        </button>

        {/* Log In Link */}
        <div className="flex justify-center mt-4 ">
          <p className="text-sm text-gray-600 ">
            Have an account?
            <a href="/login" className="ml-2 text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
          </div>
        </div>
      )
}

export default SignUp