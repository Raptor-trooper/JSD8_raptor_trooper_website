import Sidebar from '../components/Sidebar';
import { Routes, Route, Navigate } from "react-router-dom";
import Add from './Admin/Add';
import List from './Admin/List';
import Orders from './Admin/Orders';

const Admin = () => {
    return (
        <div className="flex h-full bg-gray-100">
            {/* Sidebar Section */}
            <Sidebar />

            {/* Main Admin Content Section */}
            <div className="flex-1 p-8 mb-16">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <Routes>
                        {/* Default Route to Add Page */}
                        <Route path="/" element={<Navigate to="add" replace />} />

                        {/* Protected Routes */}
                        <Route
                            path="add"
                            element={<Add />}
                        />
                        <Route
                            path="list"
                            element={<List />}
                        />
                        <Route
                            path="orders"
                            element={<Orders /> }
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Admin;