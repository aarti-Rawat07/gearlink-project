import React from 'react';

const AdminProfile = () => {
  const userName = localStorage.getItem('userName') || 'Admin';
  const userEmail = localStorage.getItem('userEmail') || 'admin@example.com';
  const userRole = localStorage.getItem('role') || 'admin';

  return (
    <div className="admin-page">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="mb-4">Profile</h3>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" value={userName} readOnly />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" value={userEmail} readOnly />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <input className="form-control" value={userRole} readOnly />
          </div>
          <p className="text-muted">This page displays your current admin profile information.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
