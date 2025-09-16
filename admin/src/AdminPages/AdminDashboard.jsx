import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar className="admin-sidebar" />
      <main className="content">
        <Outlet /> {/* This is where the nested admin pages will render */}
      </main>
    </div>
  );
};

export default AdminDashboard;