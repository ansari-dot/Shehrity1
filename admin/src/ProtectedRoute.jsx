import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole === 'admin';

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;