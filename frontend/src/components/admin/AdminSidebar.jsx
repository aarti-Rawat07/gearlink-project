import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar d-flex flex-column flex-shrink-0 p-3" style={{ width: '280px', minHeight: '100vh' }}>
      <a href="/admin-dashboard" className="d-flex align-items-center mb-4 px-3 mt-2 text-decoration-none">
        <span className="fs-4 sidebar-brand">Gear<span>Link</span> Admin</span>
      </a>
      
      <ul className="nav flex-column mb-auto px-2">
        <li className="nav-item">
          <NavLink to="/admin-dashboard" end className={({ isActive }) => `text-decoration-none admin-nav-link ${isActive ? 'active' : ''}`}>
            <i className="bi bi-speedometer2"></i> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin-dashboard/products" className={({ isActive }) => `text-decoration-none admin-nav-link ${isActive ? 'active' : ''}`}>
            <i className="bi bi-box-seam"></i> Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin-dashboard/add-product" className={({ isActive }) => `text-decoration-none admin-nav-link ${isActive ? 'active' : ''}`}>
            <i className="bi bi-plus-circle"></i> Add Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin-dashboard/categories" className={({ isActive }) => `text-decoration-none admin-nav-link ${isActive ? 'active' : ''}`}>
            <i className="bi bi-tags"></i> Categories
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin-dashboard/inquiries" className={({ isActive }) => `text-decoration-none admin-nav-link ${isActive ? 'active' : ''}`}>
            <i className="bi bi-chat-dots"></i> Inquiries
          </NavLink>
        </li>
      </ul>
      
      <div className="px-2 mt-4 border-top border-secondary pt-4" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
        <NavLink to="/login" className="text-decoration-none admin-nav-link" onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('userName');
          localStorage.removeItem('userEmail');
        }}>
          <i className="bi bi-box-arrow-right"></i> Logout
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
