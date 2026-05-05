import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout';
import AdminOverview from './admin/AdminOverview';
import AdminProducts from './admin/AdminProducts';
import AdminProductForm from './admin/AdminProductForm';
import AdminCategories from './admin/AdminCategories';
import AdminInquiries from './admin/AdminInquiries';
import AdminProfile from './admin/AdminProfile';
import AdminSettings from './admin/AdminSettings';

const AdminDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* Default route for admin dashboard overview */}
        <Route index element={<AdminOverview />} />
        
        {/* Product Management */}
        <Route path="products" element={<AdminProducts />} />
        <Route path="add-product" element={<AdminProductForm />} />
        <Route path="edit-product/:id" element={<AdminProductForm />} />
        
        {/* Profile and Settings */}
        <Route path="profile" element={<AdminProfile />} />
        <Route path="settings" element={<AdminSettings />} />

        {/* Categories */}
        <Route path="categories" element={<AdminCategories />} />
        
        {/* Inquiries */}
        <Route path="inquiries" element={<AdminInquiries />} />
      </Route>
    </Routes>
  );
};

export default AdminDashboard;
