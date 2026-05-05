import React, { useState, useEffect } from "react";
import axios from "axios";

const getStatusBadgeClass = (status) => {
  switch ((status || "").toLowerCase()) {
    case "completed":
      return "badge bg-success";
    case "shipped":
      return "badge bg-info text-dark";
    case "processing":
      return "badge bg-warning text-dark";
    case "cancelled":
      return "badge bg-danger";
    default:
      return "badge bg-secondary";
  }
};

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view your order history.");
          setLoading(false);
          return;
        }

        const res = await axios.get("/api/cart/history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setHistory(res.data || []);
      } catch (err) {
        setError(err.response?.data?.error || "Unable to load order history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div className="container py-5"><div className="alert alert-info">Loading your order history...</div></div>;
  if (error) return <div className="container py-5"><div className="alert alert-danger">{error}</div></div>;
  if (!history.length) return <div className="container py-5"><div className="alert alert-warning">No order history found yet. Start shopping to see your past orders here.</div></div>;

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
        <div>
          <h1 className="mb-2">Order History</h1>
          <p className="text-muted">Review your completed and past orders in one place.</p>
        </div>
        <div className="history-summary text-md-end mt-3 mt-md-0">
          <span className="badge bg-primary me-2">Total Orders: {history.length}</span>
          <span className="badge bg-secondary">Updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="row g-4">
        {history.map((order) => {
          const totalAmount = order.products.reduce((total, item) => {
            const price = item.product?.price || 0;
            return total + price * (item.quantity || 1);
          }, 0);

          return (
            <div className="col-12" key={order._id}>
              <div className="history-card p-4 rounded-4 shadow-sm">
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center mb-3">
                  <div>
                    <h5 className="mb-1">Order #{order._id.slice(-6)}</h5>
                    <p className="mb-1 text-muted">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                    <span className={getStatusBadgeClass(order.status)}>{order.status || "Pending"}</span>
                  </div>
                  <div className="text-lg-end mt-3 mt-lg-0">
                    <p className="mb-1">Items: {order.products.length}</p>
                    <p className="mb-0 fw-semibold">Total: ₹{totalAmount.toFixed(2)}</p>
                  </div>
                </div>
                <div className="row gx-3 gy-3">
                  {order.products.map((item) => (
                    <div className="col-12 col-md-6" key={item.product?._id || item._id}>
                      <div className="history-item p-3 rounded-3 border">
                        <h6 className="mb-1">{item.product?.name || "Unknown product"}</h6>
                        <p className="mb-1 text-muted">Qty: {item.quantity}</p>
                        <p className="mb-0">Price: ₹{item.product?.price ?? 0}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
