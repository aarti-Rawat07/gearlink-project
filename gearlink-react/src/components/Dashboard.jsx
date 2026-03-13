import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">

      {/* Sidebar */}

      <div className="sidebar">

        <h2>GearLink</h2>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">My Orders</Link>
        <Link to="/track">Track Order</Link>
        <Link to="/support">Support</Link>
        <Link to="/">Logout</Link>

      </div>

      {/* Main Content */}

      <div className="main">

        <div className="header">
          Welcome to GearLink Dashboard
        </div>

        <div className="cards">

          <div className="card">
            <h3>120+</h3>
            <p>Products Available</p>
          </div>

          <div className="card">
            <h3>15</h3>
            <p>Orders Placed</p>
          </div>

          <div className="card">
            <h3>5</h3>
            <p>Orders Delivered</p>
          </div>

          <div className="card">
            <h3>3</h3>
            <p>Orders Pending</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;