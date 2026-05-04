import React, { useState, useEffect } from 'react';

const AdminSettings = () => {
  const storedName = localStorage.getItem('userName') || '';
  const storedEmail = localStorage.getItem('userEmail') || '';

  const [name, setName] = useState(storedName);
  const [email, setEmail] = useState(storedEmail);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setName(storedName);
    setEmail(storedEmail);
  }, [storedName, storedEmail]);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    setSuccessMessage('Settings updated successfully. Refresh the page if needed.');
    window.location.reload();
  };

  return (
    <div className="admin-page">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="mb-4">Settings</h3>
          <form onSubmit={handleSave}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" type="submit">Save Changes</button>
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
