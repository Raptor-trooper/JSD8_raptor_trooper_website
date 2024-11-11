import React from 'react'


const ChangePassword = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-gray-100 rounded-md shadow-lg">
                <h2 className="text-3xl font-medium text-center mb-6">Change password</h2>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                            />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">New password</label>
                        <div className="relative">
                        <input
                            type="email"
                            placeholder="Enter new password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                        />
                        <button type="button" className="absolute right-3 top-3 text-gray-500">
                            <i className="far fa-eye"></i>
                        </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm password</label>
                        <div className="relative">
                        <input
                            type="email"
                            placeholder="Confirm your password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                            />
                        <button type="button" className="absolute right-3 top-3 text-gray-500">
                            <i className="far fa-eye"></i>
                        </button>
                        </div>
                    </div>
                </form>

                <div className="mt-6 flex justify-center items-center">
                    <button
                        type="submit"
                        className="w-20 py-2 bg-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-300 focus:outline-none"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword