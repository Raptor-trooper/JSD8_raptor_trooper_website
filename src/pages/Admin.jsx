import React from 'react';
import Sidebar from '../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './Admin/Add';
import List from './Admin/List';
import Orders from './Admin/Orders';

const Admin = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar Section */}
            <Sidebar />

            {/* Main Admin Content Section */}
            <div className="flex-1 p-6">
                <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
                
                {/* Add your main admin content here */}
                <Routes>
                    <Route path="add" element={<Add />} />
                    <Route path="list" element={<List />} />
                    <Route path="orders" element={<Orders />} />
                </Routes>
            </div>
        </div>
    );
};

export default Admin;