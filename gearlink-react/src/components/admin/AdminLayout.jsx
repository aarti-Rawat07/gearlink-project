import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import '../../assets/css/admin-theme.css'; // Import premium theme

const AdminLayout = () => {
  return (
    <div className="admin-layout d-flex w-100 vh-100 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="d-flex flex-column flex-grow-1 h-100">
        <AdminNavbar />
        
        {/* Page Content Container */}
        <div className="p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
