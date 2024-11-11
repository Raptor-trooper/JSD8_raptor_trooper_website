import React from 'react'

const LogIn = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 bg-gray-100 rounded-md shadow-lg">
            <h2 className="mb-6 text-3xl font-medium text-center ">Handy Haven</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <input 
                  type="email" 
                  placeholder="Enter Username" 
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
    
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="Enter Password" 
                    className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button type="button" className="absolute text-gray-500 right-3 top-3">
                    <i className="far fa-eye"></i>
                  </button>
                </div>
              </div>
    
              <div className="text-right">
                <a href="#" className="text-sm text-gray-500 hover:underline">forgot password</a>
              </div>
    
              <div className="flex space-x-2">
                <button 
                  type="submit" 
                  className="w-full py-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 focus:outline-none">
                  Login
                </button>
                <button 
                  type="button" 
                  className="w-full py-2 text-gray-700 bg-gray-200 rounded-md shadow hover:bg-gray-300 focus:outline-none">
                  sign up
                </button>
              </div>
            </form>
    
            <div className="flex items-center justify-center mt-6">
              <button 
                type="button" 
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" className="w-5 h-5 mr-2" />
                ลงชื่อเข้าใช้ด้วย Google
              </button>
            </div>
          </div>
        </div>
      );
    }

export default LogIn