import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Admin/AdminDashboard';
import HomePage from '../pages/Home/HomePage';

const AppRoutes = ({ isAuthenticated }) => {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route element={<PublicRoutes isAuthenticated={isAuthenticated} />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* Private route example */}
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />

                {/* Fallback for 404 */}
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
