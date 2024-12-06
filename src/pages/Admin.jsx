import React from 'react';
import Sidebar from '../components/Sidebar';

const Admin = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar Section */}
            <Sidebar />

            {/* Main Admin Content Section */}
            <div className="flex-1 p-6">
                <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
                {/* Add your main admin content here */}
                <div>
                    Welcome to the Admin Dashboard!
                </div>
            </div>
        </div>
    );
};

export default Admin;