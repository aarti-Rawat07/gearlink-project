import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/cart/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCarts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCarts();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/cart/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCarts(carts.map(cart => cart._id === id ? { ...cart, status } : cart));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Pending Carts</h2>
      {carts.filter(cart => cart.status === 'pending').map(cart => (
        <div key={cart._id}>
          <p>User: {cart.user.name} ({cart.user.email})</p>
          <ul>
            {cart.products.map(item => (
              <li key={item.product._id}>{item.product.name} - Qty: {item.quantity}</li>
            ))}
          </ul>
          <button onClick={() => updateStatus(cart._id, 'approved')}>Approve</button>
          <button onClick={() => updateStatus(cart._id, 'rejected')}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;