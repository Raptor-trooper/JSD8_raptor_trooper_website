import React from 'react'

const ResetPassword = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-8 bg-gray-100 rounded-md shadow-lg ">
                <h2 className="text-3xl font-medium text-center md-6">Reset password</h2>

                <form className="space-y-4">
                    <div>
                        <label className="blaock text-sm font-medium text-gray-700">Email address</label>
                        <input
                        type="email"
                        placeholder='Enter email'
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                </form>
                <div className="mt-6 flex justify-center items-center">
                    <button 
                    type="submit"
                    className="w-20 py-2 bg-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-300 focus:outline-none">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword