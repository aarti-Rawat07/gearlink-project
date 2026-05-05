import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const adminName = localStorage.getItem('userName') || 'Admin';

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'New order received', time: '2 min ago' },
    { id: 2, title: 'Product stock low', time: '1 hr ago' },
    { id: 3, title: 'New inquiry from customer', time: 'Yesterday' },
  ]);
  const notifRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  const toggleNotifications = () => {
    setNotificationsOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="admin-navbar navbar navbar-expand-lg px-4 py-3 w-100">
      <div className="container-fluid d-flex justify-content-end">
        <div className="d-flex align-items-center" ref={notifRef}>
          <button
            type="button"
            className="btn btn-link p-0 position-relative me-4 text-muted"
            onClick={toggleNotifications}
            aria-label="View notifications"
          >
            <i className="bi bi-bell fs-5"></i>
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          </button>
          {notificationsOpen && (
            <div className="position-absolute end-0 mt-2 p-3 bg-white border rounded shadow" style={{ width: '320px', zIndex: 2000 }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Notifications</h6>
                <button className="btn btn-sm btn-link text-decoration-none" onClick={() => setNotificationsOpen(false)}>
                  Close
                </button>
              </div>
              {notifications.length > 0 ? (
                <ul className="list-unstyled mb-0">
                  {notifications.map(notification => (
                    <li key={notification.id} className="py-2 border-bottom">
                      <strong>{notification.title}</strong>
                      <div className="text-muted small">{notification.time}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-muted py-3">No new notifications</div>
              )}
            </div>
          )}
          
          <div className="dropdown">
            <button
              type="button"
              className="btn btn-link d-flex align-items-center text-dark text-decoration-none dropdown-toggle p-0"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(adminName)}&background=0D8ABC&color=fff`} alt="admin" width="32" height="32" className="rounded-circle me-2" />
              <strong>{adminName}</strong>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="dropdownUser1" style={{ overflow: 'visible', zIndex: 1050 }}>
              <li>
                <button className="dropdown-item" type="button" onClick={() => navigate('/admin-dashboard/profile')}>
                  Profile
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button" onClick={() => navigate('/admin-dashboard/settings')}>
                  Settings
                </button>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item" type="button" onClick={handleLogout}>Sign out</button></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
