import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [showSupport, setShowSupport] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "AI", text: "Hello! I'm your AI assistant. How can I help you today?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const [profileRes, cartRes, ordersRes] = await Promise.all([
          axios.get("http://localhost:5000/api/auth/profile", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:5000/api/cart", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:5000/api/cart/history", { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setUser(profileRes.data);
        setCartCount(cartRes.data ? cartRes.data.products.length : 0);
        setRecentOrders(ordersRes.data.slice(0, 3)); // Last 3 orders
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    const userMessage = { sender: "User", text: chatInput };
    setChatMessages(prev => [...prev, userMessage]);

    // Simple AI responses based on keywords
    let aiResponse = "I'm sorry, I didn't understand that. Can you please rephrase?";
    const input = chatInput.toLowerCase();

    if (input.includes("order") || input.includes("track")) {
      aiResponse = "You can track your orders from the 'My Orders' section. If you need help with a specific order, please provide the order ID.";
    } else if (input.includes("product") || input.includes("buy")) {
      aiResponse = "Browse our products in the 'Products' section. Add items to your cart and checkout when ready!";
    } else if (input.includes("cart")) {
      aiResponse = "Check your cart from the sidebar. You can view and manage your items there.";
    } else if (input.includes("support") || input.includes("help")) {
      aiResponse = "I'm here to help! You can visit the Support page for a request form, or ask me about orders, cart items, or products.";
    } else if (input.includes("contact")) {
      aiResponse = "Visit the Support page for full contact options, or email us at support@gearlink.com.";
    }

    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: "AI", text: aiResponse }]);
    }, 1000);

    setChatInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-card">
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>GearLink</h2>
        <Link to="/dashboard" className="sidebar-link active">
          <i className="fas fa-tachometer-alt"></i> Dashboard
        </Link>
        <Link to="/products" className="sidebar-link">
          <i className="fas fa-box"></i> Products
        </Link>
        <Link to="/cart" className="sidebar-link">
          <i className="fas fa-shopping-cart"></i> My Cart ({cartCount})
        </Link>
        <Link to="/orders" className="sidebar-link">
          <i className="fas fa-list"></i> My Orders
        </Link>
        <button className="sidebar-link" onClick={() => { setShowSupport(true); setShowChat(false); }}>
          <i className="fas fa-robot"></i> AI Support
        </button>
        <button className="sidebar-link logout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main">
        <div className="header">
            <h1>Welcome back, {user ? user.name : "Guest"}!</h1>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-box"></i>
            </div>
            <div className="stat-content">
              <h3>120+</h3>
              <p>Products Available</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="stat-content">
              <h3>{cartCount}</h3>
              <p>Items in Cart</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-list"></i>
            </div>
            <div className="stat-content">
              <h3>{recentOrders.length}</h3>
              <p>Total Orders</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h3>5</h3>
              <p>Orders Completed</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="section">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/products" className="action-btn">
              <i className="fas fa-search"></i>
              <span>Browse Products</span>
            </Link>
            <Link to="/cart" className="action-btn">
              <i className="fas fa-shopping-cart"></i>
              <span>View Cart</span>
            </Link>
            <Link to="/orders" className="action-btn">
              <i className="fas fa-history"></i>
              <span>Order History</span>
            </Link>
            <Link to="/support" className="action-btn">
              <i className="fas fa-headset"></i>
              <span>Contact Support</span>
            </Link>
            <button className="action-btn action-btn-support" onClick={() => { setShowSupport(true); setShowChat(false); }}>
              <i className="fas fa-robot"></i>
              <span>AI Support</span>
            </button>
          </div>
        </div>

        {showSupport && (
          <div className="section support-panel">
            <div className="support-panel-header">
              <div>
                <h2>AI Support Center</h2>
                <p>Ask questions about your orders, products, cart, and account without leaving the dashboard.</p>
              </div>
              <button className="close-support" onClick={() => setShowSupport(false)}>&times;</button>
            </div>
            <div className="support-content-grid">
              <div className="support-summary">
                <h3>Fast help from AI</h3>
                <p>Use this chat panel to get instant guidance. You can also submit a support request or navigate to orders and cart directly.</p>
                <div className="support-links">
                  <Link to="/products">Browse Products</Link>
                  <Link to="/cart">View Cart</Link>
                  <Link to="/orders">Order History</Link>
                </div>
              </div>
              <div className="support-chat-box">
                <div className="chat-messages">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender.toLowerCase()}`}>
                      <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="chat-input">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                    placeholder="Type your message..."
                  />
                  <button onClick={handleChatSend}>Send</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Orders */}
        <div className="section">
          <h2>Recent Orders</h2>
          {recentOrders.length > 0 ? (
            <div className="recent-orders">
              {recentOrders.map((order) => (
                <div key={order._id} className="order-item">
                  <div className="order-info">
                    <h4>Order #{order._id.slice(-6)}</h4>
                    <p>Status: {order.status}</p>
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Link to="/orders" className="view-btn">View Details</Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No recent orders. <Link to="/products">Start shopping!</Link></p>
          )}
        </div>
      </div>

      {/* AI Support Chat Modal */}
      {showChat && (
        <div className="chat-modal">
          <div className="chat-content">
            <div className="chat-header">
              <h3>AI Support Assistant</h3>
              <button onClick={() => setShowChat(false)}>&times;</button>
            </div>
            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender.toLowerCase()}`}>
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                placeholder="Type your message..."
              />
              <button onClick={handleChatSend}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;