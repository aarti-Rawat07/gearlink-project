import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dashboardStats, categories } from '../../data/dummyAdminData';

const AdminOverview = () => {
  return (
    <div>
      <h2 className="mb-4 fw-bold">Dashboard Overview</h2>
      
      <div className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="admin-card admin-stat-card bg-white h-100 p-4 border-top border-4 border-primary">
            <div className="d-flex align-items-center justify-content-between position-relative overflow-hidden">
              <div style={{ zIndex: 1 }}>
                <h6 className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Total Products</h6>
                <h2 className="fw-black mb-0 text-dark display-5">{dashboardStats.totalProducts}</h2>
              </div>
              <div className="text-primary icon-bg">
                <i className="bi bi-box-seam"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="admin-card admin-stat-card bg-white h-100 p-4 border-top border-4 border-success">
            <div className="d-flex align-items-center justify-content-between position-relative overflow-hidden">
              <div style={{ zIndex: 1 }}>
                <h6 className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Categories</h6>
                <h2 className="fw-black mb-0 text-dark display-5">{dashboardStats.totalCategories}</h2>
              </div>
              <div className="text-success icon-bg">
                <i className="bi bi-tags"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="admin-card admin-stat-card bg-white h-100 p-4 border-top border-4 border-warning">
            <div className="d-flex align-items-center justify-content-between position-relative overflow-hidden">
              <div style={{ zIndex: 1 }}>
                <h6 className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Low Stock</h6>
                <h2 className="fw-black mb-0 text-dark display-5">{dashboardStats.lowStockCount}</h2>
              </div>
              <div className="text-warning icon-bg">
                <i className="bi bi-exclamation-triangle"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="admin-card admin-stat-card bg-white h-100 p-4 border-top border-4 border-info">
            <div className="d-flex align-items-center justify-content-between position-relative overflow-hidden">
              <div style={{ zIndex: 1 }}>
                <h6 className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Inquiries</h6>
                <h2 className="fw-black mb-0 text-dark display-5">{dashboardStats.totalInquiries}</h2>
              </div>
              <div className="text-info icon-bg">
                <i className="bi bi-chat-dots"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="admin-card">
            <div className="border-bottom px-4 py-3">
              <h5 className="fw-bold mb-0 text-dark">Products by Category</h5>
            </div>
            <div className="p-4">
              <div style={{ height: '400px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categories}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Legend />
                    <Bar dataKey="count" name="Number of Products" fill="#0D8ABC" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
