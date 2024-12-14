import React from 'react';
import Sidebar from '../components/Sidebar';
import { Routes, Route, Navigate } from "react-router-dom";
import Add from './Admin/Add';
import List from './Admin/List';
import Orders from './Admin/Orders';

const Admin = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar Section */}
            <Sidebar />

            {/* Main Admin Content Section */}
            <div className="flex-1 p-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <Routes>
                        {/* Default Route to Add Page */}
                        <Route path="/" element={<Navigate to="add" replace />} />
                        <Route path="add" element={<Add />} />
                        <Route path="list" element={<List />} />
                        <Route path="orders" element={<Orders />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Admin;