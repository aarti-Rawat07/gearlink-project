import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Support.css";

const Support = () => {
  const chatRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [chatMessages, setChatMessages] = useState([
    { sender: "AI", text: "Hi! I can help with orders, products, and support requests. Ask me anything." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (chatOpen && chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [chatOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your request. Our support team will contact you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const openChat = () => {
    setChatOpen(true);
  };

  const handleChatSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { sender: "User", text: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);

    const input = chatInput.toLowerCase();
    let aiResponse = "I'm sorry, I didn't understand that. Please ask about orders, products, or support.";

    if (input.includes("order") || input.includes("status")) {
      aiResponse = "You can view your past orders on the Order History page, or type your order ID for help.";
    } else if (input.includes("product") || input.includes("buy")) {
      aiResponse = "Browse products on the Products page, then add items to your cart to purchase.";
    } else if (input.includes("cart")) {
      aiResponse = "Your cart is available at the Cart page, where you can review items and checkout.";
    } else if (input.includes("support") || input.includes("help")) {
      aiResponse = "Our support team is ready. Submit the form or ask me specific questions about your order.";
    } else if (input.includes("contact")) {
      aiResponse = "You can email us at gearlinks19@gmail.com or call +91 98765 43210.";
    }

    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: "AI", text: aiResponse }]);
    }, 600);

    setChatInput("");
  };

  return (
    <div className="support-page">
      <div className="container-fluid page-header pt-5 mb-6 support-header">
        <div className="container text-center pt-5">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="bg-white p-5">
                <h1 className="display-6 text-uppercase mb-3">Support Center</h1>
                <p>Need help? Reach out to GearLink support for product, order, and delivery assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container support-content">
        <div className="support-quick-actions">
          <div className="support-action-card support-action-order">
            <div className="action-icon">📦</div>
            <h4>Order Status</h4>
            <p>Check the latest status of your orders and delivery estimates.</p>
            <Link to="/orders">View Orders</Link>
          </div>
          <div className="support-action-card support-action-product">
            <div className="action-icon">🔎</div>
            <h4>Product Help</h4>
            <p>Find the right spare part, compare products, and get buying guidance.</p>
            <Link to="/products">Browse Products</Link>
          </div>
          <div className="support-action-card support-action-chat">
            <div className="action-icon">💬</div>
            <h4>AI Support</h4>
            <p>Ask the AI assistant for instant answers about orders, carts, and support.</p>
            <button type="button" className="support-action-button" onClick={openChat}>Open Chat</button>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-7 support-card support-form-card">
            <h2>Contact Support</h2>
            <form onSubmit={handleSubmit} className="support-form">
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} />
                </div>
                <div className="col-12">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" value={form.message} onChange={handleChange} rows="6" required></textarea>
                </div>
                <div className="col-12 text-end">
                  <button type="submit" className="submit-btn">Submit Request</button>
                </div>
              </div>
            </form>
          </div>

          {chatOpen && (
            <div className="col-lg-5 support-card support-chat-card" id="chat" ref={chatRef}>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h2>AI Chat Assistant</h2>
                  <p className="text-muted mb-0">Chat with our assistant for instant help.</p>
                </div>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setChatOpen(false)}>Close</button>
              </div>
              <div className="chat-window">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={"chat-message " + (msg.sender === "AI" ? "ai" : "user")}>
                    <strong>{msg.sender}:</strong>
                    <p>{msg.text}</p>
                  </div>
                ))}
              </div>
              <form className="chat-form" onSubmit={handleChatSend}>
                <input
                  className="chat-input"
                  type="text"
                  placeholder="Ask a question..."
                  aria-label="Chat message"
                  autoComplete="off"
                  spellCheck="false"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  style={{
                    color: "#0a1a2f",
                    background: "#ffffff",
                    caretColor: "#0a1a2f",
                  }}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
